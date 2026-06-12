import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';

import { getSessionResultApi } from '../../api/historyApi';

import {
  FaCheck,
  FaUsers,
  FaCode,
  FaDesktop,
  FaSitemap,
  FaChartLine,
  FaServer,
  FaStar,
} from 'react-icons/fa';

import type { SkillType } from '../../type/DashboardType';

export const getCompetencyIcon = (competency: SkillType) => {
  switch (competency) {
    case 'COLLABORATION':
      return <FaUsers />;
    case 'IMPLEMENTATION':
      return <FaCode />;
    case 'CS_KNOWLEDGE':
      return <FaDesktop />;
    case 'ALGORITHM':
      return <FaSitemap />;
    case 'TREND':
      return <FaChartLine />;
    case 'INFRA_STRUCTURE':
      return <FaServer />;
    default:
      return <FaStar />;
  }
};

const HistoryPageResult = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ['session-result'],
    queryFn: ({ signal }) => getSessionResultApi(signal),
  });

  if (isLoading) {
    return (
      <div className="flex w-full h-full items-center justify-center py-80">
        <div className="w-8 h-8 rounded-full border-4 border-sky-700/30 border-t-sky-700 animate-spin" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="flex flex-col gap-4 px-4 sm:px-6 mt-6">
      <div className="flex flex-col items-center gap-2 py-8 bg-card-background rounded-2xl border border-border">
        <div className="w-16 h-16 bg-linear-100 from-sky-300 to-green-400 rounded-full flex justify-center items-center">
          <FaCheck className="w-10 h-10 text-white" />
        </div>
        <span className="text-lg font-semibold mt-1 text-font-black">설문이 완료되었습니다.</span>
        <span className="text-sm text-font-gray text-center px-4">
          객관식 주관식 응답을 기반으로 역량과 추천 결과를 분석했습니다.
        </span>
      </div>

      <div className="bg-card-background rounded-2xl border border-border p-5 flex flex-col gap-4">
        <span className="text-sm text-font-gray">카테고리별 역량</span>
        <div className="flex flex-col gap-4">
          {data.competencyResults.map((c) => (
            <div key={c.competencyResultId} className="flex items-center gap-4">
              <span className="w-16 text-sm font-medium text-right shrink-0 text-font-black">
                {c.name}
              </span>
              <div className="flex-1 h-3 bg-gray-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-90 from-primary-blue to-sky-400 rounded-full"
                  style={{ width: `${c.value}%` }}
                />
              </div>
              <span className="w-8 text-sm font-semibold text-right shrink-0 text-font-black">
                {c.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card-background rounded-2xl border border-border p-5 flex flex-col gap-3">
        <span className="text-sm text-font-gray">추천 직무</span>
        <div className="flex flex-wrap gap-2">
          {data.jobResults.map((j) => (
            <div
              key={j.jobResultId}
              className="flex items-center gap-1.5 bg-blue-100 dark:bg-blue-900/40 rounded-full px-4 py-2"
            >
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">{j.name}</span>
              <span className="text-xs font-bold text-white bg-blue-500 rounded-full px-2 py-0.5">
                {j.match}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card-background rounded-2xl border border-border p-5 flex flex-col gap-3">
        <span className="text-sm text-font-gray">매칭 공고</span>
        <div className="flex flex-col gap-3">
          {data.postingResults.map((p) => (
            <div
              key={p.postingResultId}
              className="flex items-center gap-3 bg-background dark:bg-neutral-800 rounded-xl px-4 py-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gray-300 dark:bg-neutral-700 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-gray-600 dark:text-gray-300">
                  {p.companyName[0]}
                </span>
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-sm font-semibold truncate text-font-black">{p.title}</span>
                <span className="text-xs text-font-gray truncate">
                  {p.companyName} {p.description}
                </span>
              </div>
              <div className="w-12 h-12 rounded-full bg-teal-400 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-white">{p.match}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-3 py-6">
        <button
          onClick={() => navigate('/history-list')}
          className="px-6 py-3 rounded-xl border border-border text-sm font-medium text-font-black"
        >
          이력 조회
        </button>
        <button className="px-6 py-3 rounded-xl bg-primary-blue text-white text-sm font-medium hover:bg-sub-blue transition-colors">
          로드맵 확인
        </button>
      </div>
    </div>
  );
};

export default HistoryPageResult;
