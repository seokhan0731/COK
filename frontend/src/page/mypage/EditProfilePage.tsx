/* src/page/mypage/EditProfilePageV2.tsx */

/* Util */
import clsx from 'clsx';
import { useNavigate } from 'react-router';
import { useProfile, useUpdateProfile } from '../../hook/useProfile';
import { Controller, useForm, useWatch } from 'react-hook-form';
import {
  ATTEND_STATUS_OPTION,
  GRADE_OPTION,
  type AttendStatusType,
  type EditProfileFormDataType,
  type GradeType,
} from '../../type';
import PendingCard from './_component/PendingCard';
import ProfileIcon from '../../component/header/_component/ProfileIcon';
import { OutlineButton, PrimaryButton } from '../../component/button/Button';
import {
  LucideCake,
  LucideGraduationCap,
  LucideLayers,
  LucidePen,
  LucideUser2,
  type LucideIcon,
} from 'lucide-react';
import TextInput from '../../component/input/TextInput';
import ButtonSelect from '../../component/select/ButtonSelect';
import SingleSelect from '../../component/select/SingleSelect';
import LoadingSpinner from '../../component/loading/LoadingSpinner';
import { useEffect, useRef, useState, type ChangeEvent } from 'react';

/* Constant */
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const EditProfilePageV2 = () => {
  const navigate = useNavigate();
  const { data: profile, isPending, isError } = useProfile();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
  const {
    register,
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { isValid, isDirty, errors },
  } = useForm<EditProfileFormDataType>({
    mode: 'onChange',
    values: profile && {
      name: profile.name,
      birthYear: profile.birthYear,
      attendStatus: profile.attendStatus,
      currentGrade: profile.currentGrade,
      imageState: 'KEEP',
    },
  });
  const isGraduation = useWatch({ control, name: 'attendStatus' }) === 'GRADUATION';
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const imageState = useWatch({ control, name: 'imageState' });

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  if (isPending) return <PendingCard />;
  if (!profile || isError) return <span>에러 발생</span>;

  const onSubmit = (data: EditProfileFormDataType) => {
    updateProfile(data, {
      onSuccess: () => {
        alert('프로필이 수정되었습니다.');
        navigate('../profile');
      },
      onError: (error) => {
        console.error(error);
        alert('수정에 실패하였습니다. 다시 시도해주세요.');
      },
    });
  };

  const handleReset = () => {
    reset({
      name: profile.name,
      birthYear: profile.birthYear,
      attendStatus: profile.attendStatus,
      currentGrade: profile.currentGrade,
      imageState: 'KEEP',
    });
    setPreviewUrl(undefined);
  };

  const handleUseDefaultProfileImage = () => {
    setValue('imageFile', undefined, { shouldDirty: true });
    setValue('imageState', 'INIT', { shouldDirty: true });
    setPreviewUrl(undefined);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      alert('JPG, PNG, Webp 이미지만 업로드될 수 있습니다.');
      e.target.value = '';
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      alert('이미지는 5MB 이하만 업로드될 수 있습니다.');
      e.target.value = '';
      return;
    }

    setValue('imageFile', file, { shouldDirty: true });
    setValue('imageState', 'CHANGE', { shouldDirty: true });
    setPreviewUrl(URL.createObjectURL(file));
    e.target.value = '';
  };

  return (
    <>
      <div className="mb-4">
        <p className="text-h3 font-semibold">기본 정보 수정</p>
        <p className="text-font-gray">
          대시보드 및 AI 맞춤 추천의 기준이 되는 기본 인적사항입니다.
        </p>
      </div>

      <div
        className={clsx(
          'flex flex-col p-6',
          'bg-card-background border border-border rounded-xl shadow-md',
          'lg:flex-row lg:p-18',
          'lg:divide-x lg:divide-border',
        )}
      >
        <section
          className={clsx(
            'flex-1 flex flex-col justify-center-safe items-center-safe gap-8 mb-12',
            'lg:pr-12 lg:mb-0',
          )}
        >
          <div className={clsx('relative p-2', ' bg-primary-blue/10 rounded-full')}>
            <ProfileIcon
              className="size-45"
              iconSize={80}
              imageUrl={imageState === 'INIT' ? undefined : (previewUrl ?? profile.imageUrl)}
            />
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />

            <PrimaryButton
              className={clsx('absolute right-3 bottom-3', 'aspect-square p-2.5 rounded-full')}
              onClick={() => inputRef.current?.click()}
            >
              <LucidePen className="text-font-white" size={20} />
            </PrimaryButton>
          </div>

          <OutlineButton onClick={handleUseDefaultProfileImage}>기본 프로필</OutlineButton>
        </section>

        <section className={clsx('flex-1 flex flex-col gap-4', 'lg:pl-12')}>
          <div className={clsx('grid grid-cols-1 gap-4', 'lg:grid-cols-2')}>
            <Labeling label="이름" icon={LucideUser2} error={errors.name?.message}>
              <TextInput
                type="text"
                className={clsx('w-full', 'text-font-black')}
                placeholder="EX) 홍길동"
                {...register('name', { required: '이름은 필수입니다.' })}
              />
            </Labeling>

            <Labeling label="출생연도" icon={LucideCake} error={errors.birthYear?.message}>
              <TextInput
                type="number"
                className={clsx(
                  'w-full',
                  'text-font-black',
                  '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
                )}
                placeholder="EX) 2000"
                {...register('birthYear', {
                  required: '출생연도는 필수입니다.',
                  min: { value: 1900, message: '1900년도 이후로 입력해주세요' },
                  max: { value: new Date().getFullYear(), message: '올해보다 클 수 없습니다.' },
                  valueAsNumber: true,
                })}
              />
            </Labeling>
          </div>

          <Labeling
            label="재학 여부"
            icon={LucideGraduationCap}
            error={errors.attendStatus?.message}
          >
            <Controller
              control={control}
              name="attendStatus"
              rules={{ required: true }}
              render={({ field }) => (
                <ButtonSelect<AttendStatusType>
                  options={ATTEND_STATUS_OPTION}
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);

                    if (value === 'GRADUATION')
                      setValue('currentGrade', 'OTHER', { shouldDirty: true });
                  }}
                />
              )}
            />
          </Labeling>

          <Labeling label="학년" icon={LucideLayers} error={errors.currentGrade?.message}>
            <Controller
              control={control}
              name="currentGrade"
              render={({ field }) => (
                <SingleSelect<GradeType>
                  options={GRADE_OPTION}
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isGraduation}
                />
              )}
            />
          </Labeling>

          <div className="flex gap-2 mt-4">
            <OutlineButton
              className="w-full"
              disabled={!isDirty || isUpdating}
              onClick={handleReset}
            >
              기본값
            </OutlineButton>
            <PrimaryButton
              className="w-full flex justify-center-safe"
              disabled={!isValid || !isDirty || isUpdating}
              onClick={handleSubmit(onSubmit)}
            >
              {isUpdating ? (
                <LoadingSpinner className="size-5 border-[3px] border-t-primary-blue" />
              ) : (
                '저장하기'
              )}
            </PrimaryButton>
          </div>
        </section>
      </div>
    </>
  );
};

export default EditProfilePageV2;

/* Helper Component */
type LabelingProps = {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
  error?: string;
};

const Labeling = ({ icon: Icon, label, children, error }: LabelingProps) => (
  <>
    <div className="flex flex-col gap-2">
      <div className="flex items-center-safe gap-1">
        <Icon size={16} className="text-primary-blue" />
        <span className="text-sm">{label}</span>
      </div>
      {children}
      {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
    </div>
  </>
);
