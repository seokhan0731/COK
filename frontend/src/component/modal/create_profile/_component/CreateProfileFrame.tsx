/* src/component/modal/create_profile/_component/CreateProfileFrame.tsx */

/* library */
import { AnimatePresence, motion } from 'framer-motion';

/* asset */
import background from '../../../../asset/create_profile/icons.svg';
import { OutlineButton, PrimaryButton } from '../../../../page/mypage/_component/Button';

type CreateProfileFrameProps = {
  title: string;
  inputNode: React.ReactNode;
  step: number;
  direction: number;
  isFirst?: boolean;
  isLast?: boolean;
  displayImage?: boolean;
  disableNext?: boolean;
  onNext?: () => void;
  onPrev?: () => void;
  onSubmit?: () => void;
};

const slideVariants = {
  enter: (direction: number) => ({ x: direction >= 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction >= 0 ? -80 : 80, opacity: 0 }),
};

const CreateProfileFrame = ({
  title,
  inputNode,
  step,
  direction,
  isFirst,
  isLast,
  displayImage,
  disableNext,
  onNext,
  onPrev,
  onSubmit,
}: CreateProfileFrameProps) => {
  return (
    <div className="flex-1 flex flex-col items-center-safe w-full">
      <p>
        프로필을 생성하고 <span className="text-primary-blue italic">COK</span>을 시작해 보세요
      </p>

      <div className="relative w-full overflow-hidden">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="flex flex-col items-center-safe w-full"
          >
            <p className="mt-4 text-h4 font-semibold">{title}</p>
            {displayImage && <img src={background} alt="이미지" className="w-60 my-4" />}
            {inputNode}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="w-full flex mt-4 justify-between">
        <OutlineButton type="button" className={`${isFirst ? 'invisible' : ''}`} onClick={onPrev}>
          이전
        </OutlineButton>

        <PrimaryButton type="button" onClick={isLast ? onSubmit : onNext} disabled={disableNext}>
          다음
        </PrimaryButton>
      </div>
    </div>
  );
};

export default CreateProfileFrame;
