/* src/compoent/modal/create_profile/CreateProfileModal.tsx */

import clsx from 'clsx';
import ProgressBar from './_component/ProgressBar';

const CreateProfileModal = () => {
  return (
    <div
      className={clsx(
        'relative min-w-80 flex flex-col items-center-safe px-6 pb-6 pt-9',
        'bg-card-background rounded-xl overflow-hidden',
        'lg:min-w-96',
      )}
    >
      <ProgressBar step={1} />

      <p>
        프로필을 생성하고 <span className="text-primary-blue italic">COK</span>을 시작해 보세요
      </p>

      <p className="mt-2 text-h5 font-semibold">사용자님의 이름을 알려주세요</p>
    </div>
  );
};

export default CreateProfileModal;
