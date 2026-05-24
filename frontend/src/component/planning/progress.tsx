import { PieChart, Pie } from "recharts";
import { FaLightbulb } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useThemeStore } from "../../store/themeStore";

import type { ProgressCardProps } from "../../type/planning";

const ProgressCard = ({ completed, remaining, comment }: ProgressCardProps) => {
    const { theme } = useThemeStore();

    const [isLg, setIsLg] = useState(() => window.innerWidth >= 1024);

    const isDark = theme === 'Dark';
    const total = completed + remaining;
    const percent = Math.round((completed / total) * 100);

    useEffect(() => {
        const handleResize = () => setIsLg(window.innerWidth >= 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    //도넛차트
    const chartSize = isLg ? 180 : 110;
    const chartCenter = chartSize / 2;
    const chartInnerRadius = isLg ? 58 : 35;
    const chartOuterRadius = isLg ? 78 : 48;

    const chartData = [
    { name: "completed", value: completed, fill: isDark ? "#2B7FFF" : "#4A90D9" },
    { name: "remaining", value: remaining, fill: isDark ? "#3f3f46" : "#E2E8F0" },
    ];

    return (
        <div className="flex flex-col gap-3 w-full lg:w-120 lg:-mt-20">
            <div className="hidden lg:flex justify-end">
                <button className="text-sm text-slate-500 hover:text-slate-700 transition-colors">
                전체 진행도 보러가기 →
                </button>
            </div>

            <div className="flex flex-row lg:flex-col gap-3">
                <div className="flex-1 rounded-2xl p-4 lg:p-8 bg-blue-950/80 dark:bg-slate-900">
                    <h2 className="text-font-white text-base lg:text-2xl font-semibold mb-3 lg:mb-6">역량 성장 진행도</h2>

                    <div className="bg-background rounded-xl p-3 lg:p-6 flex flex-row items-center gap-2 lg:gap-6 dark:bg-gray-950">
                        <div className="relative flex items-center justify-center">
                            <PieChart width={chartSize} height={chartSize}>
                                <Pie
                                data={chartData}
                                cx={chartCenter}
                                cy={chartCenter}
                                innerRadius={chartInnerRadius}
                                outerRadius={chartOuterRadius}
                                startAngle={90}
                                endAngle={-270}
                                dataKey="value"
                                strokeWidth={0}
                                />
                            </PieChart>
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="text-base lg:text-xl font-bold text-slate-700">{percent}%</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 lg:gap-4">
                            <div>
                                <p className="text-sm lg:text-lg text-slate-800 font-semibold dark:text-slate-400">완료된 목표</p>
                                <p className="text-xl lg:text-3xl font-bold text-slate-500 dark:text-slate-100">{completed}개</p>
                            </div>
                            <div>
                                <p className="text-sm lg:text-lg text-slate-800 font-semibold dark:text-slate-400">남은 목표</p>
                                <p className="text-xl lg:text-3xl font-bold text-slate-500 dark:text-slate-100">{remaining}개</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end mt-3 lg:mt-4">
                        <button className="text-xs lg:text-sm text-slate-300 hover:text-white transition-colors">
                        다음달 진행도 →
                        </button>
                    </div>
                </div>

                <div className="flex-1 self-start pb-10 bg-background rounded-2xl p-4 lg:p-6 shadow-sm border border-border lg:w-full">
                    <div className="flex items-center gap-2 mb-6 ">
                        <FaLightbulb className="text-[#4A90D9] text-lg" />
                        <span className="text-slate-700 font-semibold text-sm lg:text-base dark:text-slate-300">AI 코멘트</span>
                    </div>
                    <p className="text-slate-600 text-sm lg:text-base leading-relaxed dark:text-neutral-300">
                        " {comment} "
                    </p>
                </div>
            </div>
        </div>
  );
};

export default ProgressCard;
