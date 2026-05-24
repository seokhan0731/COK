import { FaCheck, FaCode, FaBook } from "react-icons/fa";

import type { RoadmapCardProps } from "../../type/planning";

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "알고리즘":
      return <FaCode className="text-blue-500" />;
    case "관련 지식":
      return <FaBook className="text-blue-500" />;
    default:
      return null;
  }
};

const RoadmapCard = ({ month, createdAt }: RoadmapCardProps) => {
  return (
    <div className="w-full lg:w-170 h-auto lg:h-110 bg-indigo-100/80 rounded-3xl flex flex-col dark:bg-neutral-900">
      <div className="p-7">
        <div className="w-20 h-6 lg:w-28 lg:h-8 bg-emerald-200/70 rounded-3xl flex items-center justify-center">
          <p className="text-slate-600 text-sm lg:text-lg font-medium text-center">진행중</p>
        </div>

        
        <div className="p-2.5 lg:p-5">
          <h1 className="text-blue-950 text-3xl font-semibold mb-5 dark:text-font-white/80">
            {createdAt.slice(0, 4)}년 {month?.month_num}월
          </h1>
        </div>


        <div>
          {month?.details.map((detail) => (
            <div key={detail.detail_id} className="w-full h-20 lg:w-145 lg:h-28 bg-background rounded-[30px] mb-5 flex items-center px-5">
              <div className="size-16 bg-indigo-100 rounded-full flex items-center justify-center shrink-0 dark:bg-slate-600/25 ">
                <div className="text-3xl">
                  {getCategoryIcon(detail.category)}
                </div>
              </div>

              <div className="flex flex-1 justify-between">
                <div className="ml-5 mt-1.5">
                  <h3 className="text-blue-950 text-lg lg:text-xl font-bold dark:text-sub-blue/60">{detail.category}</h3>
                  <p className="text-slate-500 text-sm lg:text-md mt-1">{detail.content}</p>
                </div>

                <div className="size-16 bg-background rounded-full flex items-center justify-center shrink-0">
                  {detail.is_completed ? (
                    <div className="size-16 bg-green-400 rounded-full flex items-center justify-center">
                      <FaCheck className="text-white text-2xl" />
                    </div>
                  ) : (
                    <div className="size-16 bg-blue-50 rounded-full flex items-center justify-center dark:bg-slate-600/25">
                      <FaCheck className="text-blue-950 text-2xl dark:text-blue-50" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoadmapCard;