/* src/page/mypage/_component/PendingCard.tsx */

import LoadingSpinner from '../../../component/loading/LoadingSpinner';

const PendingCard = () => {
  return (
    <div className="absolute inset-0 z-10 flex flex-col justify-center-safe items-center-safe gap-4">
      <LoadingSpinner />
    </div>
  );
};

export default PendingCard;
