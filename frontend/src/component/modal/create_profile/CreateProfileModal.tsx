/* src/compoent/modal/create_profile/CreateProfileModal.tsx */

/* React */
import { useRef, useState } from 'react';

/* Library */
import { Controller, useForm } from 'react-hook-form';

/* API */
import { checkGithubIDApi } from '../../../api/profileApi';

/* Type */
import {
  ALGORITHM_OPTION,
  ATTEND_STATUS_META,
  ATTEND_STATUS_TYPE,
  CERTIFICATE_OPTION,
  GRADE_OPTION,
  type AlgorithmType,
  type CertificateType,
  type CreateProfileFormDataType,
  type GradeType,
} from '../../../type/profileType';

/* Component */
import ProgressBar from './_component/ProgressBar';
import SelectSingle from '../../../page/mypage/_component/SelectSingle';
import SelectMulti from '../../../page/mypage/_component/SelectMulti';

/* Util */
import { cn } from '../../../util/cn';
import { router } from '../../../util/router';
import AsyncDebounce from '../../../util/AsyncDebounce';
import CreateProfileFrame from './_component/CreateProfileFrame';
import clsx from 'clsx';
import { useCreateProfile } from '../../../hook/useProfile';
import { useModal } from '../../provider/ModalProvider';
import { useAuthStore } from '../../../store/authStore';

const STEP_FIELDS: Record<number, (keyof CreateProfileFormDataType)[]> = {
  1: ['name'],
  2: ['birthYear'],
  3: ['attendStatus', 'currentGrade'],
  4: ['algorithmLevel'], // certifications는 선택 항목이라 검증에서 제외
  5: ['githubId'],
};

const TOTAL_STEPS = Object.keys(STEP_FIELDS).length;

const CreateProfileModal = () => {
  /* Hook */
  const {
    control,
    register,
    trigger,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isValidating },
  } = useForm<CreateProfileFormDataType>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      birthYear: undefined,
      attendStatus: undefined,
      currentGrade: undefined,
      algorithmLevel: 'UNRATED',
      certifications: [],
      githubId: '',
      imageFile: undefined,
    },
  });
  const { mutate: createProfile } = useCreateProfile();
  const { close } = useModal();
  const setAuth = useAuthStore((s) => s.setAuth);

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0); // 1: 다음, -1: 이전

  const watchedValues = watch();
  const isGradeDisabled = watchedValues.attendStatus === 'GRADUATION';

  const currentFields = STEP_FIELDS[step] ?? [];
  const isStepValid = currentFields.every((field) => {
    const value = watchedValues[field];
    const filled = Array.isArray(value)
      ? value.length > 0
      : value !== undefined && value !== null && value !== '';
    return filled && !errors[field];
  });

  /* Handler */
  const handleNext = async () => {
    const valid = await trigger(currentFields);
    if (!valid) return;
    setDirection(1);
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setDirection(-1);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = handleSubmit((data) => {
    createProfile(data, {
      onSuccess: (response) => {
        setAuth(response.accessToken, response.currentRole);
        close();
        router.navigate('/my/profile');
      },
      onError: () => {
        alert('프로필 생성에 실패했습니다. 다시 시도해 주세요');
      },
    });
  });

  // GitHub ID 존재 확인: 디바운스 후 GitHub API로 실제 존재 여부 검사
  const checkGithubRef = useRef(AsyncDebounce(checkGithubIDApi, 500));

  const renderStepContent = () => {
    const inputClass = cn(
      'w-full px-4 py-2',
      'bg-background border border-border rounded-md outline-none',
      'transition duration-200 focus:border-primary-blue disabled:opacity-50 disabled:pointer-events-none',
    );

    switch (step) {
      case 1:
        return {
          title: '사용자님의 이름을 알려주세요',
          displayImage: true,
          input: (
            <input
              key={step}
              type="text"
              placeholder="이름을 입력해주세요"
              className={inputClass}
              {...register('name', { required: true })}
            />
          ),
        };

      case 2:
        return {
          title: '출생연도를 알려주세요',
          displayImage: true,
          input: (
            <>
              <input
                key={step}
                type="text"
                inputMode="numeric"
                maxLength={4}
                placeholder="출생연도를 입력해주세요"
                className={inputClass}
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
                <span className="self-start mt-2 text-sm text-red-500">
                  {errors.birthYear?.message}
                </span>
              )}
            </>
          ),
        };

      case 3:
        return {
          title: '사용자님의 학년/재학 정보를 알려주세요',
          displayImage: false,
          input: (
            <div className="w-full flex flex-col gap-4">
              {/* 재학 */}
              <div className="flex flex-col gap-2">
                <p className="text-sm">재학</p>
                <Controller
                  name="attendStatus"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <div className="flex gap-2">
                      {ATTEND_STATUS_TYPE.map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => {
                            field.onChange(status);
                            if (status === 'GRADUATION') setValue('currentGrade', 'OTHER');
                          }}
                          className={cn(
                            'flex-1 px-3 py-2 border border-border rounded-xl transition-colors',
                            field.value === status &&
                              'bg-primary-blue/10 border-primary-blue text-primary-blue',
                          )}
                        >
                          {ATTEND_STATUS_META[status].label}
                        </button>
                      ))}
                    </div>
                  )}
                />
              </div>

              {/* 학년 */}
              <div className="flex flex-col gap-2">
                <p className="text-sm">학년</p>
                <Controller
                  name="currentGrade"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <SelectSingle<GradeType>
                      options={GRADE_OPTION}
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isGradeDisabled}
                    />
                  )}
                />
              </div>
            </div>
          ),
        };

      case 4:
        return {
          title: '사용자님의 역량을 알려주세요',
          displayImage: false,
          input: (
            <div className="w-full flex flex-col gap-4">
              {/* 알고리즘 */}
              <div className="flex flex-col gap-2">
                <p className="text-sm">알고리즘 (BAEKJOON)</p>
                <Controller
                  name="algorithmLevel"
                  control={control}
                  rules={{ required: '티어를 선택해주세요' }}
                  render={({ field }) => (
                    <SelectSingle<AlgorithmType>
                      options={ALGORITHM_OPTION}
                      value={field.value}
                      onValueChange={field.onChange}
                      placeholder="티어를 선택하세요"
                    />
                  )}
                />
              </div>

              {/* 자격증 */}
              <div className="flex flex-col gap-2">
                <p className="text-sm">자격증</p>
                <Controller
                  name="certifications"
                  control={control}
                  render={({ field }) => (
                    <SelectMulti<CertificateType>
                      options={CERTIFICATE_OPTION}
                      value={field.value ?? []}
                      onValueChange={field.onChange}
                      placeholder="자격증을 선택하세요"
                    />
                  )}
                />
              </div>
            </div>
          ),
        };

      case 5:
        return {
          title: '사용자님의 GitHub ID를 알려주세요',
          displayImage: false,
          input: (
            <>
              <input
                type="text"
                placeholder="GitHub ID를 입력해주세요"
                className={clsx(inputClass, 'mt-4')}
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
                <span className="self-start mt-2 text-sm text-red-500">
                  {errors.githubId.message}
                </span>
              )}
            </>
          ),
        };

      default:
        return { title: '', displayImage: false, input: null };
    }
  };

  const { title, displayImage, input } = renderStepContent();

  return (
    <div
      className={cn(
        'relative w-80 flex flex-col p-6 pt-7',
        'bg-card-background rounded-xl overflow-hidden',
        'lg:w-100 lg:p-12',
      )}
    >
      <ProgressBar step={step} totalSteps={TOTAL_STEPS} />

      <CreateProfileFrame
        title={title}
        inputNode={input}
        step={step}
        direction={direction}
        isFirst={step === 1}
        isLast={step === TOTAL_STEPS}
        displayImage={displayImage}
        disableNext={!isStepValid || isValidating}
        onNext={handleNext}
        onPrev={handlePrev}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default CreateProfileModal;
