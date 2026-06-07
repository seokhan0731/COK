/* src/page/create_profile_page/CreateProfileModal.tsx */

/* asset */
import createProfileBackground from '../../asset/create_profile/icons.svg';

/* Component */
import { OutlineButton, PrimaryButton } from '../../component/button/Button';
import NameStep from './_component/NameStep';

/* Library */
import { FormProvider, useForm, type Path } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';

/* React */
import { useState } from 'react';
import { useNavigate } from 'react-router';

/* Type */
import { type CreateProfileFormDataType } from '../../type/profileType';

/* Hook & Store */
import { useCreateProfile } from '../../hook/useProfile';
import { useModal } from '../../component/provider/ModalProvider';
import { useAuthStore } from '../../store/authStore';

/* Util */
import clsx from 'clsx';
import BirthYearStep from './_component/BirthYearStep';
import AttendStatusAndGradeStep from './_component/AttendStatusAndGradeStep';
import SkillStep from './_component/SkillStep';
import ProfileImageStep from './_component/ProfileImageStep';

/* Constant */
const STEPS: { Component: React.ComponentType; fields: Path<CreateProfileFormDataType>[] }[] = [
  { Component: NameStep, fields: ['name'] },
  { Component: BirthYearStep, fields: ['birthYear'] },
  { Component: AttendStatusAndGradeStep, fields: ['attendStatus', 'currentGrade'] },
  { Component: SkillStep, fields: ['algorithmLevel', 'githubId'] },
  { Component: ProfileImageStep, fields: [] },
];

const CreateProfileModal = () => {
  // Constant & State
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const variants = {
    enter: (dir: number) => ({ x: dir * 80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir * -80, opacity: 0 }),
  };
  const StepComponent = STEPS[step].Component;
  const isLastStep = step === STEPS.length - 1;

  // Hook
  const navigate = useNavigate();
  const { close } = useModal();
  const setAuth = useAuthStore((s) => s.setAuth);
  const { mutate: createProfile, isPending } = useCreateProfile();
  const methods = useForm<CreateProfileFormDataType>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      certifications: [],
    },
  });
  const currentFields = STEPS[step].fields;
  const watched = methods.watch(currentFields);
  const isStepInvalid =
    watched.some((v) => v === '' || v == null) ||
    currentFields.some((f) => methods.getFieldState(f, methods.formState).invalid);

  // Handler
  const handleSubmit = (data: CreateProfileFormDataType) => {
    createProfile(data, {
      onSuccess: (response) => {
        setAuth(response.accessToken, response.currentRole);
        close();
        navigate('/my/profile', { replace: true });
      },
      onError: () => {
        alert('프로필 생성에 실패했습니다. 다시 시도해 주세요');
      },
    });
  };

  const handleNext = async () => {
    const valid = await methods.trigger(STEPS[step].fields);
    if (!valid) return;

    if (isLastStep) {
      methods.handleSubmit(handleSubmit)();
    } else {
      setDirection(1);
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (step === 0) return;
    setDirection(-1);
    setStep((prev) => prev - 1);
  };

  return (
    <div
      className={clsx(
        'min-w-75 w-full max-w-120 flex flex-col overflow-hidden',
        'bg-card-background border border-border rounded-2xl',
      )}
    >
      <div className={clsx('relative w-full', 'overflow-hidden')}>
        <img src={createProfileBackground} alt="이미지" className="relative min-w-75" />

        <div
          className={clsx(
            'absolute -top-25 -left-25 rounded-full opacity-20 blur-2xl bg-primary-blue',
            'w-75 h-50',
          )}
        />
        <div
          className={clsx(
            'absolute -bottom-25 -right-25 rounded-full opacity-20 blur-2xl bg-primary-emerald',
            'w-75 h-50',
          )}
        />

        <div className="absolute top-0 w-full flex justify-between items-center-safe p-2">
          <div className="h-2 w-50 bg-card-background/40 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-linear-to-r from-primary-blue to-primary-emerald rounded-full"
              initial={false}
              animate={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            />
          </div>

          <div
            className={clsx(
              'px-3 py-1',
              'bg-card-background border border-border rounded-full shadow-md',
            )}
          >
            <span className="text-sm font-semibold">
              <span className="text-sm text-primary-blue">{step}</span> / {STEPS.length - 1}
            </span>
          </div>
        </div>
      </div>

      <div className={clsx('flex flex-col p-8')}>
        <p className={clsx('mb-6', 'font-semibold')}>
          프로필을 생성하고 <span className="text-primary-blue font-semibold">COK</span>을 시작해
          보세요.
        </p>

        <FormProvider {...methods}>
          <motion.div
            layout
            className="relative overflow-hidden"
            transition={{ duration: 0.3, ease: 'easeInOut', type: 'spring' }}
          >
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                <StepComponent />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </FormProvider>

        <div className="flex justify-between mt-6">
          <OutlineButton
            onClick={handlePrev}
            className={clsx(
              'py-2 rounded-full lg:text-base',
              step > 0 ? 'inline-block' : 'invisible',
            )}
          >
            이전으로
          </OutlineButton>

          <PrimaryButton
            onClick={handleNext}
            disabled={isStepInvalid || isPending}
            className="py-2 rounded-full lg:text-base"
          >
            {isLastStep ? (isPending ? '생성 중...' : '시작하기') : '다음으로'}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default CreateProfileModal;
