/* src/page/mypage/_component/FetchingCard.tsx */

const FetchingCard = () => {
  return (
    <div className="fixed bottom-5 right-5 z-10 flex flex-col justify-center-safe items-center-safe gap-4">
      <div className="size-8 animate-spin rounded-full border-4 border-border border-t-primary-blue" />
    </div>
  );
};

export default FetchingCard;
