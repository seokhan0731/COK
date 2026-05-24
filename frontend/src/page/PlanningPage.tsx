import HomeHeader from "../component/header/HomeHeader";
import RoadmapCard from "../component/planning/roadmap";
import ProgressCard from "../component/planning/progress";
import clsx from 'clsx'
import axios from 'axios';

import { useState, useEffect } from "react";
import type { RoadmapData } from "../type/planning";

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


    useEffect(() => {
        if (roadmap) setSelectMonth(roadmap.months[0].month_num);
    }, [roadmap]);

    useEffect(() => {
        const fetchRoadmap = async () => {
        const response = await axios.get('https://e6dc9715-49ed-46a8-b462-6adcd5d9d470.mock.pstmn.io/get');
        setRoadmap(response.data);
        };
        fetchRoadmap();
    }, []);


        
    return (
        <div className="flex flex-col">
            <HomeHeader />

            <section 
                className={clsx(
                    sectionBase,
                    'flex flex-col px-4 lg:px-15',
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
                <div className="p-5 px-2 lg:p-20 lg:px-25">
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
                    {roadmap && (
                        <>
                            {/* 왼쪽  */}
                            <RoadmapCard
                                month={currentMonthData}
                                createdAt={roadmap.created_at}
                                // onMonthChange={(month) => setSelectMonth(month)}
                                />
                            {/* 오른쪽  */}
                            <ProgressCard
                                completed={completed}
                                remaining={remaining}
                                comment={currentMonthData?.comment}
                                />
                        </>
                    )}
                    
                </div>
            </section>

        </div>
    )
}



export default PlanningPage;
