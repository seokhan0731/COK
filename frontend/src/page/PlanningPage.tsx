import HomeHeader from "../component/header/HomeHeader";
import RoadmapCard from "../component/planning/roadmap";
import ProgressCard from "../component/planning/progress";
import clsx from 'clsx'
import axios from 'axios';

import { useState, useEffect } from "react";
import type { RoadmapData } from "../type/planning";
import LockOverlay from "../component/div/LockOverlay ";
import CommentCard from "../component/planning/aiComment";

// dummy data (postman mock 없을 때 사용)
// import { ROADMAP_DATA } from "../component/planning/planningMock";

const sectionBase = clsx(
  'relative snap-start h-[calc(100dvh-75px)]',
  '[@media(max-height:700px)]:h-auto [@media(max-height:700px)]:min-h-[calc(100dvh-75px)]',
)


const PlanningPage = () => {
    const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
    const [selectMonth, setSelectMonth] = useState<number>(roadmap?.months[0].month_num ?? 1);
    const currentMonthData = roadmap?.months.find(m => m.month_num === selectMonth);
    const completed = currentMonthData?.details.filter(d => d.is_completed).length ?? 0;
    const remaining = (currentMonthData?.details.length ?? 0) - completed;

    // 추후 설문 모달이랑 연결 예정
    const [isSurveyModalOpen, setIsSurveyModalOpen] = useState(false)

    // 로드맵 존재여부로 설문 참여 여부 판별 예정
    // const [hasSurvey, setHasSurvey] = useState(false);

    
    // useEffect(() => {
    //     const { data } = await axios.get('/user/me')
    //     setHasSurvey(data.has_survey)
    // }, [])


    useEffect(() => {
        if (roadmap) setSelectMonth(roadmap.months[0].month_num);
    }, [roadmap]);

    useEffect(() => {
        const fetchRoadmap = async () => {
            try {
                const response = await axios.get('https://e6dc9715-49ed-46a8-b462-6adcd5d9d470.mock.pstmn.io/get/planning');
                setRoadmap(response.data);
            } 
            catch {
                console.log('Postman 연결 실패 - 임시 데이터 사용');
                // setRoadmap(ROADMAP_DATA);
            }
        };
        fetchRoadmap();
    }, []);


        
    return (
        <div className="flex flex-col">
            <HomeHeader />

            <section 
                className={clsx(
                    sectionBase,
                    'flex flex-col px-8 lg:px-10',
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
                <div className="p-5 px-2 lg:py-18 lg:px-25">
                    <h1 className="text-blue-950 text-3xl lg:text-5xl font-semibold mb-5 dark:text-primary-blue">
                        성장을 향한 여정
                    </h1>
                    <p className="text-slate-600 text-base lg:text-2xl font-medium dark:text-neutral-400">
                        AI멘토가 분석한 이번 학기의 핵심 목표들입니다.
                        <br />
                        하나씩 실천하며 역량을 키워보세요
                    </p>
                </div>


                <div className="flex lg:flex-row justify-between px-0 lg:px-25 lg:mr-20 flex-col gap-10 lg:gap-0">
                    {/* 왼쪽 */}
                    <div className="relative w-fit h-fit">
                        <RoadmapCard
                            month={currentMonthData}
                            createdAt={roadmap?.created_at ?? ''}
                        />
                        {!roadmap && <LockOverlay onClickSurvey={() => setIsSurveyModalOpen(true)} />}
                    </div>


                    
                    {/* 오른쪽 */}
                    <div className="flex flex-row lg:flex-col gap-6 lg:-mt-25">
                        <div className={clsx(

                            `${!roadmap ? `hidden `: `hidden lg:flex justify-end`}`
                        )}>
                            <button className="text-sm text-slate-500 hover:text-slate-700 transition-colors">
                                전체 진행도 보러가기 →
                            </button>
                        </div>

                        <div className={clsx(
                            `${!roadmap ? `relative w-fit h-fit lg:mt-10`: `relative w-fit h-fit`}`
                        )}>
                            <ProgressCard
                                completed={completed}
                                remaining={remaining}
                            />
                            {!roadmap && <LockOverlay onClickSurvey={() => setIsSurveyModalOpen(true)} />}
                        </div>

                        <div className="relative w-fit h-fit">
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
