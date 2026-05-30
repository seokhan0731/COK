/* src/page/mypage/_component/PendingCard.tsx */

const PendingCard = () => {
  return (
    <div className="absolute inset-0 z-10 flex flex-col justify-center-safe items-center-safe gap-4">
      <div className="size-8 animate-spin rounded-full border-4 border-border border-t-primary-blue" />
    </div>
  );
};

export default PendingCard;
