/* src/page/dashboard_page/DashboardPage.tsx */

/* Library */
import { NavLink } from 'react-router';

/* Type & constant */
import { type SkillDataType } from './_component/chartType';
import type { JobType } from '../../type/dashboardType';

/* Component */
import SkillRadarChart from './_component/SkillRadarChart';
import JobCard from './_component/JobCard';
import PostingCard from './_component/PostingCard';
import SkillProgressDonutChart from './_component/SkillProgressDonutChart';

/* Hook */
import { useGetUserName } from '../../hook/useProfile';

/* Util */
import clsx from 'clsx';
import LoadingSpinner from '../mypage/_component/LoadingSpinner';
import { useUserSkill } from '../../hook/useUserSkill';

/* Data */
const data: SkillDataType[] = [
  { skill: 'collaboration', value: 80 },
  { skill: 'csKnowledge', value: 65 },
  { skill: 'implementation', value: 90 },
  { skill: 'algorithm', value: 70 },
  { skill: 'trend', value: 55 },
  { skill: 'infrastructure', value: 60 },
];

const job: { jobId: JobType; match: number }[] = [
  { jobId: 1, match: 96 },
  { jobId: 8, match: 87 },
  { jobId: 3, match: 58 },
];

const posting: { companyName: string; title: string; match: number }[] = [
  { companyName: '토스', title: 'Data Engineer', match: 98 },
  { companyName: '당근', title: 'Backend Engineer', match: 98 },
  { companyName: '우아한형제들', title: 'Java Backend Developer', match: 98 },
];

// 진단 검사 완료 여부 (임의값 — 실제로는 API/상태에서 받아옴)
const hasDiagnosis = true;
const blockLoadMapProgress = true;

const DashboardPage = () => {
  /* Hook */
  const { data: name, isPending: isNamePending } = useGetUserName();
  const { data: userSkillData, isPending: isSkillPending } = useUserSkill();

  /* Constant */
  const isLoading = isNamePending || isSkillPending;

  if (isLoading)
    return (
      <div className="relative flex-1 flex justify-center-safe items-center-safe">
        <LoadingSpinner />

        {/* Background Effect */}
        <div
          className={clsx(
            'absolute top-20 right-px -z-10 w-48 h-48 rounded-full opacity-20 blur-3xl bg-primary-emerald',
            'lg:w-96 lg:h-96',
          )}
        />
        <div
          className={clsx(
            'absolute bottom-20 left-px -z-10 w-48 h-48 rounded-full opacity-20 blur-3xl bg-primary-blue',
            'lg:w-96 lg:h-96',
          )}
        />
      </div>
    );

  return (
    <div className="relative flex-1 flex">
      {/* Background Effect */}
      <div
        className={clsx(
          'absolute top-20 right-px -z-10 w-48 h-48 rounded-full opacity-20 blur-3xl bg-primary-emerald',
          'lg:w-96 lg:h-96',
        )}
      />
      <div
        className={clsx(
          'absolute bottom-20 left-px -z-10 w-48 h-48 rounded-full opacity-20 blur-3xl bg-primary-blue',
          'lg:w-96 lg:h-96',
        )}
      />

      {/* 가로 제한 레이아웃 */}
      <div
        className={clsx('relative max-w-300 w-full flex flex-col p-6 gap-5 mx-auto', 'lg:px-12')}
      >
        {/* Greeting Section */}
        <section className={clsx('flex flex-col p-6 gap-1')}>
          <div className="flex flex-row">
            <span className="text-h3 font-bold">
              안녕하세요, <span className="text-h3 text-primary-blue">{name}님</span>
            </span>
            <span className="text-h3">👋</span>
          </div>
          <span>현재 분석된 조인흠님의 역량 지표 및 직무 공고입니다.</span>
        </section>

        <div className={clsx('grid grid-cols-1 gap-5 items-start', 'lg:grid-cols-[3fr_4fr]')}>
          <section
            className={clsx(
              'flex flex-col items-center-safe p-6',
              'bg-card-background border border-border rounded-xl shadow-sm',
            )}
          >
            <span className="self-start mb-6 text-h5 font-semibold">역량 분석 결과</span>
            <div
              className={clsx('w-full max-w-75 flex-1 flex items-center-safe p-4', 'lg:max-w-100')}
            >
              <SkillRadarChart data={data} />
            </div>

            <div className={clsx('p-4', 'bg-primary-blue/5 rounded-xl')}>
              <span className="text-sm text-font-gray font-semibold">
                {userSkillData?.comment}
                {/* "오주노님은 6가지 역량 중 [CS 지식]과 [구현력]이 특히 돋보입니다. 탄탄한 컴퓨터 구조
                이해도를 바탕으로 코드를 직접 설계하고 구현하는 능력이 뛰어나므로, 대용량 트래픽과
                서버 아키텍처를 다루는 [백엔드 엔지니어] 직무에 가장 완벽하게 부합합니다." */}
              </span>
            </div>
          </section>

          <div className="flex flex-col gap-5">
            <div className={clsx('grid grid-cols-1 gap-5', 'lg:grid-cols-2')}>
              <section
                className={clsx(
                  'flex-1 flex flex-col items-center-safe p-6',
                  'bg-card-background border border-border rounded-xl shadow-sm',
                )}
              >
                <span className="self-start mb-6 text-h5 font-semibold">
                  직무 추천 <span className="text-h5 text-primary-blue font-semibold">Top 3</span>
                </span>

                <div className="w-full flex flex-col gap-2">
                  {job.map((item, index) => (
                    <JobCard
                      key={item.jobId}
                      jobId={item.jobId}
                      rank={index + 1}
                      match={item.match}
                    />
                  ))}
                </div>
              </section>

              <section
                className={clsx(
                  'relative flex-1 flex flex-col items-center-safe p-6',
                  'bg-card-background border border-border rounded-xl shadow-sm',
                )}
              >
                <div className="flex self-stretch justify-between items-center-safe mb-6">
                  <span className="text-h5 font-semibold">역량 성장 진행도</span>
                  <span className="text-font-gray text-sm">전체</span>
                </div>
                <div
                  className={clsx(
                    'w-full max-w-75 flex-1 flex items-center-safe p-4',
                    'lg:max-w-100',
                  )}
                >
                  <SkillProgressDonutChart percent={70} />
                </div>

                {/* block */}
                {blockLoadMapProgress && (
                  <div
                    className={clsx(
                      'absolute inset-0 flex flex-col justify-center-safe items-center-safe',
                      'bg-linear-to-br from-blue-300/30 to-emerald-300/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg',
                    )}
                  >
                    <span className="font-semibold mb-1">아직 로드맵을 생성하지 않았어요 </span>
                    <NavLink
                      to={'/'} // TODO: 나중에 페이지 완성 되면 경로 수정
                      className="text-sm underline whitespace-nowrap"
                    >
                      로드맵 생성하러 가기
                    </NavLink>
                  </div>
                )}
              </section>
            </div>
            <section
              className={clsx(
                'flex-1 flex flex-col items-center-safe p-6',
                'bg-card-background border border-border rounded-xl shadow-sm',
              )}
            >
              <div className="flex self-stretch justify-between items-center-safe mb-6">
                <span className="text-h5 font-semibold">
                  공고 추천 <span className="text-h5 text-primary-blue font-semibold">Top 3</span>
                </span>
              </div>

              <div className={clsx('w-full grid grid-cols-1 gap-3', 'lg:grid-cols-3')}>
                {posting.map((item, index) => (
                  <PostingCard
                    key={index}
                    rank={index + 1}
                    match={item.match}
                    companyName={item.companyName}
                    title={item.title}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* 진단 검사 미완료 시: 블러 + 안내 오버레이 */}

        {!hasDiagnosis && (
          <div
            className={clsx(
              'absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 p-6',
              'bg-card-background/40 backdrop-blur-sm rounded-xl',
            )}
          >
            <span className="text-h4 font-semibold">아직 역량 진단을 진행하지 않으셨어요</span>
            <span className="text-sm text-font-gray text-center">
              진단 검사를 완료하면 맞춤형 역량 분석과 직무·공고 추천을 확인할 수 있어요.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
