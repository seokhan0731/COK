import { useQuery } from '@tanstack/react-query';

import { getSessionHistoryApi } from '../../api/historyApi';

import { getCompetencyIcon } from './HIstoryResultPage';
import { SKILL_META } from '../../type';
import LoadingSpinner from '../../component/loading/LoadingSpinner';
import { getCompetencyIcon } from "./HIstoryResultPage";
import { SKILL_META } from "../../type/dashboardType";

const formatDate = (isoUtc: string) =>
    new Date(isoUtc).toLocaleDateString("ko-KR");

const HistoryListPage = () => {
  const { data: historyList, isPending } = useQuery({
    queryKey: ['session-history'],
    queryFn: ({ signal }) => getSessionHistoryApi(signal),
  });

  if (isPending) {
    return (
      <div className="absolute inset-0 z-10 flex flex-col justify-center-safe items-center-safe gap-4">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center-safe mb-4">
        <span className="text-h3 font-semibold">설문 이력</span>
        <span className="text-sm text-font-gray">총 {historyList?.length ?? 0}건</span>
      </div>

      <div className="flex flex-col gap-4">
        {historyList?.map((item, index) => {
          const isGreen = index % 2 === 1;

          return (
            <div
              key={item.sessionId}
              className="flex items-center gap-3 lg:gap-4 bg-card-background rounded-2xl border border-border px-4 py-4 lg:px-6 lg:py-5"
            >
              <div
                className={`w-11 h-11 lg:w-13 lg:h-13 rounded-xl text-xl lg:text-2xl flex items-center justify-center shrink-0 ${isGreen ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-blue-50 dark:bg-blue-900/30 text-primary-blue'}`}
              >
                {getCompetencyIcon(item.topCompetency)}
              </div>

              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-sm lg:text-base font-semibold text-font-black">
                  공고 매칭 설문
                </span>
                <span className="text-xs lg:text-sm text-font-gray truncate">
                  {item.createdAt.slice(0, 10).replace(/-/g, '.')} · 추천 직무 :{' '}
                  {item.recommendedJob}
                </span>
              </div>

              <div className="flex flex-col items-center shrink-0 w-14 lg:w-16">
                <span className="text-base lg:text-xl font-bold text-primary-blue">
                  {item.topScore}
                </span>
                <span className="text-xs lg:text-sm text-font-gray">
                  {SKILL_META[item.topCompetency].label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
            {historyList?.map((item, index) => {
                const isGreen = index % 2 === 1;

                return (
                    <div
                        key={item.sessionId}
                        className="flex items-center gap-3 lg:gap-4 bg-card-background rounded-2xl border border-border px-4 py-4 lg:px-6 lg:py-5"
                    >
                        <div className={`w-11 h-11 lg:w-13 lg:h-13 rounded-xl text-xl lg:text-2xl flex items-center justify-center shrink-0 ${isGreen ? "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400" : "bg-blue-50 dark:bg-blue-900/30 text-primary-blue"}`}>
                            {getCompetencyIcon(item.topCompetency)}
                        </div>

                        <div className="flex flex-col flex-1 min-w-0">
                            <span className="text-sm lg:text-base font-semibold text-font-black">공고 매칭 설문</span>
                            <span className="text-xs lg:text-sm text-font-gray truncate">
                                {formatDate(item.createdAt)} · 추천 직무 : {item.recommendedJob}
                            </span>
                        </div>

                        <div className="flex flex-col items-center shrink-0 w-14 lg:w-16">
                            <span className="text-base lg:text-xl font-bold text-primary-blue">{item.topScore}</span>
                            <span className="text-xs lg:text-sm text-font-gray">{SKILL_META[item.topCompetency].label}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default HistoryListPage;
