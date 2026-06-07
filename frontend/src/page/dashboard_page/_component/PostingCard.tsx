/* src/page/dashboard_page/_component/PostingCard.tsx */

import clsx from 'clsx';

type PostingCardProps = {
  rank: number;
  match: number;
  companyName: string;
  title: string;
};

const PostingCard = ({ rank, match, companyName, title }: PostingCardProps) => {
  return (
    <div
      className={clsx(
        'w-full flex flex-col gap-3 px-4 py-3',
        'bg-card-background border border-border rounded-xl',
      )}
    >
      {/* 상단: 순위 배지 + 적합도 */}
      <div className="flex justify-between items-center-safe">
        <div
          className={clsx(
            'size-7 aspect-square flex justify-center-safe items-center-safe',
            'bg-primary-blue/10 rounded-lg',
          )}
        >
          <span className="text-sm font-extrabold text-primary-blue">{rank}</span>
        </div>
        <span
          className={clsx(
            'px-2 py-0.5 text-xs font-bold',
            'bg-primary-blue/10 text-primary-blue rounded-full',
          )}
        >
          {match}%
        </span>
      </div>

      {/* 하단: 회사명 + 공고 제목 */}
      <div className="flex flex-col gap-0.5">
        <span className="text-xs font-medium text-primary-blue">{companyName}</span>
        <span className="font-bold">{title}</span>
      </div>
    </div>
  );
};

export default PostingCard;
