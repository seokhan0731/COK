/* src/page/dashboard_page/_component/JobCard.tsx */

import clsx from 'clsx';
import { JOB_META, type JobType } from '../../../type/DashboardType';

type JobCardProps = {
  jobId: JobType;
  rank: number;
  match: number;
};

const JobCard = ({ jobId, rank, match }: JobCardProps) => {
  return (
    <div
      className={clsx(
        'w-full flex justify-between px-3 py-4',
        'bg-primary-blue/5 border border-border rounded-xl',
      )}
    >
      <div className="flex items-center-safe gap-2">
        <div
          className={clsx(
            'size-8 aspect-square flex justify-center-safe items-center-safe',
            'bg-blue-500 rounded-lg',
          )}
        >
          <span className="font-extrabold text-font-white">{rank}</span>
        </div>
        <span className="text-sm font-bold">{JOB_META[jobId].label}</span>
      </div>

      <div className="flex flex-col items-center-safe">
        <span className="text-primary-blue font-bold">{match}%</span>
        <span className="text-[12px]">적합도</span>
      </div>
    </div>
  );
};

export default JobCard;
