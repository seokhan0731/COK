import { PieChart, Pie } from "recharts";
import { FaLightbulb } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useThemeStore } from "../../store/themeStore";

import type { ProgressCardProps } from "../../type/planning";

const ProgressCard = ({ completed, remaining }: ProgressCardProps) => {
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
    { name: "completed", value: completed, fill: "url(#completedGradient)" },
    { name: "remaining", value: remaining, fill: isDark ? "#3f3f46" : "#E2E8F0" },
    ];

    return (
        <div className="flex flex-col gap-3 w-full lg:w-120 ">
            <div className="flex flex-row lg:flex-col gap-7">
                <div className="flex-1 rounded-2xl p-4 lg:p-8 bg-blue-950/80 dark:bg-slate-900">
                    <h2 className="text-font-white text-base lg:text-2xl font-semibold mb-3 lg:mb-6">역량 성장 진행도</h2>

                    <div className="bg-background rounded-xl p-3 lg:p-6 flex flex-row items-center gap-2 lg:gap-6 dark:bg-gray-950">
                        <div className="relative" style={{ width: chartSize, height: chartSize }}>
                            <PieChart width={chartSize} height={chartSize} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                                <defs>
                                    <linearGradient id="completedGradient" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0%" stopColor={isDark ? "#60a5fa" : "#7BB8F0"} />
                                        <stop offset="100%" stopColor={isDark ? "#2B7FFF" : "#2B6CB0"} />
                                    </linearGradient>
                                </defs>
                                <Pie
                                    data={chartData}
                                    cx={chartCenter - 1}
                                    cy={chartCenter - 1}
                                    innerRadius={chartInnerRadius}
                                    outerRadius={chartOuterRadius}
                                    startAngle={90}
                                    endAngle={-270}
                                    dataKey="value"
                                    strokeWidth={0}
                                />
                            </PieChart>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none pb-1">
                                <span className="font-bold text-slate-600 dark:text-slate-300 " style={{ fontSize: isLg ? 18 : 13 }}>
                                    {!percent ? '0%':`${percent}%`}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 lg:gap-4">
                            <div>
                                <p className="text-sm lg:text-lg text-slate-800 font-semibold dark:text-slate-400 whitespace-nowrap">완료된 목표</p>
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
            </div>
        </div>
  );
};

export default ProgressCard;
