import HomeHeader from "../component/header/Header";
import RoadmapCard from "../component/planning/roadmap";
import ProgressCard from "../component/planning/progress";
import clsx from 'clsx'

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import LockOverlay from "../component/div/LockOverlay ";
import CommentCard from "../component/planning/aiComment";
import { getPlanningApi } from "../api/planningApi";
import { useIsLoggedIn } from "../store/authStore";


const sectionBase = clsx(
  'relative snap-start h-[calc(100dvh-75px)]',
  '[@media(max-height:700px)]:h-auto [@media(max-height:700px)]:min-h-[calc(100dvh-75px)]',
)


const PlanningPage = () => {
    const isLoggedIn = useIsLoggedIn();

    const { data: roadmap, isLoading } = useQuery({
        queryKey: ["planning"],
        queryFn: ({ signal }) => getPlanningApi(signal),
        enabled: isLoggedIn,
    });

    const months = roadmap?.months ?? [];

    const thisMonth = new Date().getMonth() + 1;
    const [selectMonth, setSelectMonth] = useState<number | null>(null);

    const currentIndex = Math.max(
        0,
        months.findIndex(m => m.month_num === (selectMonth ?? thisMonth)),
    );
    const currentMonthData = months[currentIndex];
    const completed = currentMonthData?.details.filter(d => d.is_completed).length ?? 0;
    const remaining = (currentMonthData?.details.length ?? 0) - completed;

    const isFirst = currentIndex <= 0;
    const isLast = currentIndex >= months.length - 1;
    const goPrev = () => {
        if (!isFirst) setSelectMonth(months[currentIndex - 1].month_num);
    };
    const goNext = () => {
        if (!isLast) setSelectMonth(months[currentIndex + 1].month_num);
    };

    // 추후 설문 모달이랑 연결 예정
    const [isSurveyModalOpen, setIsSurveyModalOpen] = useState(false);

    if (!isLoggedIn) {
        return (
            <div className="flex flex-col">
                <HomeHeader />
                <div
                    className={clsx(
                        'absolute bottom-10 left-px -z-10 w-48 h-48 rounded-full opacity-10 blur-3xl bg-primary-blue',
                        'lg:w-96 lg:h-96',
                    )}
                />
                <div
                    className={clsx(
                        'absolute top-5 right-px w-48 h-48  -z-10 lg:w-100 lg:h-100 rounded-full opacity-15 blur-3xl bg-primary-emerald',
                        'lg:w-96 lg:h-96',
                    )}
                />
                    
                <div className="flex items-center justify-center h-[80dvh]">
                    <p className="text-lg font-bold text-slate-500">
                        로그인 후 이용해주세요.
                    </p>
                </div>
            </div>
        );
    }

    if(isLoading) {
        return(

            <div className="flex flex-col">
                <HomeHeader />
                <div
                    className={clsx(
                        'absolute bottom-10 left-px -z-10 w-48 h-48 rounded-full opacity-10 blur-3xl bg-primary-blue',
                        'lg:w-96 lg:h-96',
                    )}
                    />
                <div
                    className={clsx(
                        'absolute top-5 right-px w-48 h-48  -z-10 lg:w-100 lg:h-100 rounded-full opacity-15 blur-3xl bg-primary-emerald',
                        'lg:w-96 lg:h-96',
                    )}
                    />
                <div className="flex items-center justify-center h-[80dvh]">
                    <div className="w-8 h-8 rounded-full border-4 border-sky-700/30 border-t-sky-700 animate-spin mt-25" />
                </div>
            </div>
        )
    }


    
    return (
        <div className="flex flex-col">
            <HomeHeader />

            <section 
                className={clsx(
                    sectionBase,
                    'flex flex-col px-4 lg:px-10',
                )}
            >
                {/* background effect */}
                <div
                className={clsx(
                    'absolute top-20 left-px -z-10 w-48 h-48 rounded-full opacity-20 blur-3xl bg-primary-blue',
                    'lg:w-96 lg:h-96',
                )}
                />
                <div
                className={clsx(
                    'absolute bottom-20 right-px -z-10 w-48 h-48 rounded-full opacity-20 blur-3xl bg-primary-emerald',
                    'lg:w-96 lg:h-96',
                )}
                />

                {/* 제목 */}
                <div className="py-8 lg:py-18 lg:px-25">
                    <h1 className="text-blue-950 text-3xl lg:text-5xl font-semibold mb-5 dark:text-primary-blue">
                        성장을 향한 여정
                    </h1>
                    <p className="text-slate-600 text-base lg:text-2xl font-medium dark:text-neutral-400 whitespace-nowrap">
                        AI멘토가 분석한 이번 학기의 핵심 목표들입니다.
                        <br />
                        하나씩 실천하며 역량을 키워보세요
                    </p>
                </div>


                <div className="flex flex-col lg:flex-row justify-between px-0 lg:px-25 lg:mr-15 gap-10 lg:gap-10">
                    {/* 왼쪽 */}
                    <div className="relative w-full lg:w-fit h-fit">
                        <RoadmapCard
                            month={currentMonthData}
                            createdAt={roadmap?.created_at ?? ''}
                            onPrev={goPrev}
                            onNext={goNext}
                            isFirst={isFirst}
                            isLast={isLast}
                        />
                        {!roadmap && <LockOverlay onClickSurvey={() => setIsSurveyModalOpen(true)} />}
                    </div>


                    
                    {/* 오른쪽 */}
                    <div className="flex flex-row lg:flex-col gap-3 lg:gap-6 lg:-mt-25 w-full lg:w-auto">
                        <div className={clsx(

                            `${!roadmap ? `hidden `: `hidden lg:flex justify-end`}`
                        )}>
                            <button className="text-sm text-slate-500 hover:text-slate-700 transition-colors">
                                전체 진행도 보러가기 →
                            </button>
                        </div>

                        <div className={clsx(
                            'relative flex-1 min-w-0 lg:w-fit h-fit',
                            !roadmap && 'lg:mt-10',
                        )}>
                            <ProgressCard
                                completed={completed}
                                remaining={remaining}
                            />
                            {!roadmap && <LockOverlay onClickSurvey={() => setIsSurveyModalOpen(true)} />}
                        </div>

                        <div className="relative flex-1 min-w-0 lg:w-fit h-fit">
                            <CommentCard
                                comment={currentMonthData?.comment}
                            />
                            {!roadmap && <LockOverlay onClickSurvey={() => setIsSurveyModalOpen(true)} />}
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}



export default PlanningPage;
