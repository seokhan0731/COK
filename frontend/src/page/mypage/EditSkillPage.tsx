/* src/page/mypage/EditSkillPage.tsx */

import clsx from 'clsx';
import { Computer, LucideCpu, type LucideIcon, LucideMedal } from 'lucide-react';
import SelectSingle from './_component/SelectSingle';
import SelectMulti from './_component/SelectMulti';
import {
  ALGORITHM_OPTION,
  CERTIFICATE_OPTION,
  type AlgorithmType,
  type CertificateType,
  type EditSkillFormDataType,
} from '../../type';
import { useRef, type ReactNode } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { OutlineButton, PrimaryButton } from '../../component/button/Button';
import { useProfile, useUpdateSkill } from '../../hook/useProfile';
import PendingCard from './_component/PendingCard';
import TextInput from '../../component/input/TextInput';
import { useNavigate } from 'react-router';
import LoadingSpinner from '../../component/loading/LoadingSpinner';
import AsyncDebounce from '../../util/AsyncDebounce';
import { checkGithubIDApi } from '../../api/profileApi';

// #region Component
type EditSkillCardProps = {
  icon: LucideIcon;
  title: string;
  children?: ReactNode;
};

const EditSkillCard = ({ icon: Icon, title, children }: EditSkillCardProps) => (
  <div
    className={clsx(
      'flex flex-col p-6 ',
      'bg-card-background divide-y divide-border border border-border rounded-xl shadow-md',
    )}
  >
    <div className="flex flex-row items-center-safe pb-4 gap-4">
      <Icon size={32} />
      <p className="text-h4 font-semibold">{title}</p>
    </div>

    <div className="flex flex-col pt-4">{children}</div>
  </div>
);
// #endregion

const EditSkillPage = () => {
  const navigate = useNavigate();
  const { data: profile, isPending, isError } = useProfile();
  const { mutate: updateSkill, isPending: isUpdating } = useUpdateSkill();
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { isValid, isDirty, errors, isValidating },
  } = useForm<EditSkillFormDataType>({
    mode: 'onChange',
    defaultValues: {
      algorithmLevel: 'UNRATED',
      certifications: [],
    },
    values: profile && {
      algorithmLevel: profile.algorithmLevel,
      certifications: profile.certifications,
      githubId: profile.githubId,
    },
  });
  const checkGithubRef = useRef(AsyncDebounce(checkGithubIDApi, 500));

  // #region Effect

  // #endregion

  // #region Handler
  const onSubmit = (data: EditSkillFormDataType) => {
    updateSkill(data, {
      onSuccess: () => {
        reset(data);
        alert('역량이 수정되었습니다.');
        navigate('../profile');
      },
      onError: (error) => {
        console.error(error);
        alert('수정에 실패하였습니다. 다시 시도해주세요');
      },
    });
  };
  // #endregion

  // #region Rendering
  if (isPending) return <PendingCard />;
  if (isError || !profile) return <div>에러가 발생했습니다.</div>;
  // #endregion
  return (
    <div className="flex flex-col">
      {/* 안내 문구 */}
      <div className="mb-4">
        <p className="text-h3 font-semibold">내 역량 수정</p>
        <p className="text-font-gray">
          입력된 역량을 바탕으로 AI가 로드맵과 직무를 추천해 드립니다.
        </p>
      </div>

      {/* 역량 입력 카드 레이아웃 */}
      <div className="flex flex-col">
        <div className="flex flex-col gap-4">
          {/* 알고리즘 수정 카드 */}
          <EditSkillCard title="알고리즘 (BAEKJOON)" icon={LucideCpu}>
            <Controller
              name="algorithmLevel"
              control={control}
              rules={{ required: '티어를 선택해주세요' }}
              render={({ field, fieldState }) => (
                <>
                  <SelectSingle<AlgorithmType>
                    options={ALGORITHM_OPTION}
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder="티어를 선택하세요"
                  />
                  {fieldState.error && (
                    <span className="pt-2 text-sm text-red-500">{fieldState.error.message}</span>
                  )}
                </>
              )}
            />
          </EditSkillCard>

          {/* 자격증 수정 카드 */}
          <EditSkillCard title="자격증" icon={LucideMedal}>
            <Controller
              name="certifications"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <SelectMulti<CertificateType>
                    options={CERTIFICATE_OPTION}
                    value={field.value ?? []}
                    onValueChange={field.onChange}
                    placeholder="자격증을 선택하세요"
                  />
                  {fieldState.error && (
                    <span className="pt-2 text-sm text-red-500">{fieldState.error.message}</span>
                  )}
                </>
              )}
            />
          </EditSkillCard>

          {/* GitHub ID 수정 카드 */}
          <EditSkillCard title="GitHub ID" icon={Computer}>
            <TextInput
              {...register('githubId', {
                required: 'GitHub ID는 필수입니다.',
                maxLength: { value: 39, message: '39자 이하로 입력해주세요' },
                pattern: {
                  value: /^[a-zA-Z0-9-]+$/,
                  message: '영문, 숫자, 하이픈만 사용할 수 있습니다.',
                },
                validate: async (value) => {
                  if (!value || !/^[a-zA-Z0-9-]+$/.test(value)) return true;
                  try {
                    const exists = await checkGithubRef.current({ githubID: value });
                    return exists || '존재하지 않는 GitHub ID 입니다.';
                  } catch {
                    return true;
                  }
                },
              })}
            />

            {errors.githubId && (
              <span className="pt-2 text-sm text-red-500">{errors.githubId.message}</span>
            )}
          </EditSkillCard>
        </div>

        <div className={clsx('flex flex-row justify-stretch mt-4 gap-2', 'lg:justify-end-safe')}>
          <OutlineButton
            type="button"
            onClick={() => reset()}
            disabled={isUpdating || !isDirty || isValidating}
            className={clsx('w-full', 'lg:w-auto lg:min-w-30')}
          >
            초기화
          </OutlineButton>
          <PrimaryButton
            type="button"
            disabled={isUpdating || !isValid || !isDirty || isValidating}
            onClick={handleSubmit(onSubmit)}
            className={clsx(
              'w-full flex justify-center-safe items-center-safe',
              'lg:w-auto lg:min-w-30',
            )}
          >
            {isUpdating ? (
              <LoadingSpinner className="size-5 border-[3px] border-t-primary-blue" />
            ) : (
              '저장하기'
            )}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default EditSkillPage;
