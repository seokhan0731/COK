/* src/page/mypage/EditProfilePage.tsx */

import {
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ChangeEvent,
  type ReactNode,
} from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { OutlineButton, PrimaryButton } from './_component/Button';
import TextInput from './_component/TextInput';
import {
  LucideCake,
  LucideGraduationCap,
  LucideLayers,
  LucidePen,
  LucideUser2,
  type LucideIcon,
} from 'lucide-react';
import clsx from 'clsx';
import {
  GRADE_META,
  GRADE_TYPE,
  ATTEND_STATUS_META,
  ATTEND_STATUS_TYPE,
  type EditProfileFormDataType,
} from '../../type';
import { cn } from '../../util/cn';
import { useProfile, useUpdateProfile } from '../../hook/useProfile';
import PendingCard from './_component/PendingCard';
import FetchingCard from './_component/FetchingCard';

// #region Constant
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
// #endregion

// #region Helpers
const InputFieldBase = ({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
}) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center-safe gap-1">
      <Icon size={16} className="text-primary-blue" />
      <span className="text-sm">{label}</span>
    </div>
    {children}
  </div>
);

const InputButton = ({
  isSelected,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { isSelected: boolean }) => (
  <button
    type="button"
    className={cn(
      'flex-1 px-4 py-2 border border-border rounded-xl transition-colors duration-200',
      'disabled:opacity-50 disabled:pointer-events-none',
      className,
      isSelected && 'bg-primary-blue/10 border-primary-blue text-primary-blue',
    )}
    {...props}
  />
);
// #endregion

const EditProfilePage = () => {
  // #region hook

  const navigate = useNavigate();
  const { data: profile, isPending, isError } = useProfile();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
  const {
    register,
    trigger,
    handleSubmit,
    watch,
    getValues,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<EditProfileFormDataType>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      birthYear: 2000,
      attendStatus: undefined,
      currentGrade: 1,
      imageFile: undefined,
    },
  });

  // #endregion

  // #region state & Ref & etc.
  const [imageUrl, setImageUrl] = useState('');
  const [isImageValid, setIsImageValid] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentGrade = watch('currentGrade');
  const attendStatus = watch('attendStatus');

  const isGradeDisabled = attendStatus === 'GRADUATED';

  // #endregion

  // #region effect
  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name,
        birthYear: profile.birthYear,
        attendStatus: profile.attendStatus,
        currentGrade: profile.currentGrade,
      });
      setImageUrl(profile.imageUrl ?? '');
    }
  }, [profile, reset]);

  useEffect(() => {
    if (!imageUrl) {
      setIsImageValid(false);
      return;
    }

    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (!cancelled) setIsImageValid(true);
    };
    img.onerror = () => {
      if (!cancelled) setIsImageValid(false);
    };
    img.src = imageUrl;

    return () => {
      cancelled = true;
      img.onload = null;
      img.onerror = null;
      img.src = '';

      if (imageUrl.startsWith('blob:')) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  useEffect(() => {
    register('attendStatus', { required: '재학 여부는 필수입니다.' });
    register('currentGrade', {
      validate: (value) => {
        const currentAttendStatus = getValues('attendStatus');
        return currentAttendStatus === 'GRADUATED' || !!value || '학년은 필수입니다.';
      },
    });
  }, [register]);

  // #endregion

  // #region handler
  const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      alert('JPG, PNG, WebP 이미지만 업로드할 수 있습니다.');
      e.target.value = '';
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      alert('이미지는 5MB 이하만 업로드할 수 있습니다.');
      e.target.value = '';
      return;
    }

    setValue('imageFile', file, { shouldDirty: true });
    setImageUrl(URL.createObjectURL(file));
    e.target.value = '';
  };

  const onSubmit = (data: EditProfileFormDataType) => {
    updateProfile(data, {
      onSuccess: () => {
        reset(data);
        alert('프로필이 수정되었습니다.');
        navigate('../profile');
      },
      onError: (error) => {
        console.error(error);
        alert('수정에 실패하였습니다. 다시 시도해주세요');
      },
    });
  };
  //#endregion

  // #region rendering
  if (isPending) return <PendingCard />;
  if (isError || !profile) return <div>에러 발생</div>;
  // #endregion

  return (
    <>
      {/* 기본 레이아웃 */}
      <div className="flex-1 flex flex-col justify-center-safe">
        {isUpdating && <FetchingCard />}

        {/* 안내 문구 레이아웃 */}
        <div className="flex flex-col mb-4">
          <p className="text-h3 font-semibold">기본 정보 수정</p>
          <p className="text-font-gray">
            대시보드 및 AI 맞춤 추천의 기준이 되는 기본 인적사항입니다.
          </p>
        </div>

        {/* 메인 카드 */}
        <div
          className={clsx(
            'flex flex-col p-6',
            'lg:p-18',
            'bg-card-background border border-border rounded-xl shadow-md',
          )}
        >
          {/* 데이터 폼 */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={clsx(
              'flex flex-col gap-12',
              'lg:flex-row lg:gap-0 lg:divide-x lg:divide-border',
            )}
          >
            {/* 프로필 이미지 영역 */}
            <section
              className={clsx(
                'flex-1 flex flex-col items-center-safe gap-8',
                'lg:justify-center-safe lg:pr-12',
              )}
            >
              {/* 프로필 카드 */}
              <div className="relative flex size-48 p-2 bg-primary-blue/20 border border-border rounded-full">
                <button
                  type="button"
                  disabled={isUpdating}
                  className={clsx(
                    'absolute right-3 bottom-3 p-2 bg-primary-blue border border-border rounded-full',
                    'disabled:opacity-50 disabled:pointer-events-none',
                  )}
                  onClick={() => inputRef.current?.click()}
                >
                  <LucidePen className="text-font-white" size={20} />
                </button>
                {isImageValid ? (
                  <div className="size-full rounded-full overflow-hidden">
                    <img src={imageUrl} className="size-full object-cover" />
                  </div>
                ) : (
                  <div className="size-full flex justify-center-safe items-center-safe p-12 bg-background rounded-full">
                    <LucideUser2 size={80} />
                  </div>
                )}
              </div>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfileImageChange}
              />
            </section>

            {/* 필드 영역 */}
            <fieldset
              className={clsx('flex-1 flex flex-col gap-4', 'lg:pl-12')}
              disabled={isUpdating}
            >
              {/* 이름 & 나이 반응형 wrapper */}
              <div className={clsx('grid grid-cols-1 gap-4', 'lg:grid-cols-2')}>
                {/* 이름 필드 */}
                <InputFieldBase icon={LucideUser2} label="이름">
                  <TextInput
                    type="text"
                    placeholder="이름을 입력해주세요"
                    {...register('name', { required: '이름은 필수입니다.' })}
                  />
                  {errors.name && (
                    <span className="text-sm text-red-500">{errors.name.message}</span>
                  )}
                </InputFieldBase>

                {/* 출생연도 필드 */}
                <InputFieldBase icon={LucideCake} label="나이">
                  <TextInput
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    placeholder="출생연도를 입력해주세요"
                    {...register('birthYear', {
                      required: '출생연도는 필수입니다.',
                      valueAsNumber: true,
                      min: { value: 1900, message: '올바른 연도를 입력해주세요.' },
                      max: {
                        value: new Date().getFullYear(),
                        message: '미래 연도는 입력할 수 없습니다.',
                      },
                    })}
                  />
                  {errors.birthYear && (
                    <span className="text-sm text-red-500">{errors.birthYear.message}</span>
                  )}
                </InputFieldBase>
              </div>

              {/* 재학 여부 필드 */}
              <InputFieldBase icon={LucideGraduationCap} label="재학 여부">
                <div className="flex gap-2">
                  {ATTEND_STATUS_TYPE.map((item) => (
                    <InputButton
                      key={item}
                      isSelected={attendStatus === item}
                      onClick={() => {
                        if (item === 'GRADUATED') {
                          setValue('currentGrade', undefined, {
                            shouldValidate: true,
                            shouldDirty: true,
                          });
                        } else {
                          setValue('currentGrade', profile.currentGrade ?? 1, {
                            shouldValidate: true,
                            shouldDirty: true,
                          });
                        }
                        setValue('attendStatus', item, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                        trigger('currentGrade');
                      }}
                    >
                      {ATTEND_STATUS_META[item].label}
                    </InputButton>
                  ))}
                </div>
              </InputFieldBase>

              {/* 학년 필드 */}
              <InputFieldBase icon={LucideLayers} label="학년">
                <div className="flex gap-2">
                  {GRADE_TYPE.map((item) => (
                    <InputButton
                      key={item}
                      isSelected={currentGrade === item}
                      onClick={() => setValue('currentGrade', item, { shouldDirty: true })}
                      disabled={isGradeDisabled}
                    >
                      {GRADE_META[item].label}
                    </InputButton>
                  ))}
                </div>
                {errors.currentGrade && (
                  <span className="text-sm text-red-500">{errors.currentGrade.message}</span>
                )}
              </InputFieldBase>

              {/* 저장 및 초기화 버튼 레이아웃 */}
              <div className={clsx('flex flex-row gap-2 mt-12', 'lg:mt-4')}>
                <OutlineButton
                  type="button"
                  className="flex-1"
                  onClick={() => {
                    setImageUrl(profile.imageUrl ?? '');

                    if (inputRef.current) inputRef.current.value = '';
                    reset({
                      name: profile.name,
                      birthYear: profile.birthYear,
                      attendStatus: profile.attendStatus,
                      currentGrade: profile.currentGrade,
                      imageFile: undefined,
                    });
                  }}
                >
                  초기화
                </OutlineButton>
                <PrimaryButton type="submit" disabled={!isValid || isUpdating} className="flex-1">
                  {isUpdating ? '저장 중...' : '수정하기'}
                </PrimaryButton>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfilePage;
