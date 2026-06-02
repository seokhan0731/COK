import { useEffect, useState } from "react";

import client from "../../util/client";
import type { SessionResultResponse } from "../../type/historyType";

import { FaCheck } from "react-icons/fa";

type TabType = "result" | "history";

const HistoryPageResult = () => {
    const [activeTab, setActiveTab] = useState<TabType>("result");
    const [data, setData] = useState<SessionResultResponse | null>(null);

    useEffect(() => {
        client
            .get("https://e6dc9715-49ed-46a8-b462-6adcd5d9d470.mock.pstmn.io/get/result")
            .then((res) => setData(res.data));
    }, []);

    return (
        <div className="flex flex-col px-80">

            <div className="flex flex-col gap-2 w-full p-6">
                <span className="text-3xl font-semibold">공고 매칭 설문</span>
                <span className="text-base text-black/75">역량 분석 및 직무, 공고 추천 결과를 확인하세요</span>
            </div>

            <div className="px-6">
                <div className="relative flex w-full p-1.5 bg-black/10 rounded-2xl">
                    <div
                        className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-xl shadow-sm transition-transform duration-200 ease-in-out"
                        style={{ transform: activeTab === "history" ? "translateX(calc(100% + 0px))" : "translateX(0)" }}
                    />
                    <button
                        onClick={() => setActiveTab("result")}
                        className={`relative z-10 flex-1 h-11 rounded-xl text-sm font-medium transition-colors duration-150 ${activeTab === "result" ? "text-black" : "text-black/50"}`}
                    >
                        설문 결과
                    </button>
                    <button
                        onClick={() => setActiveTab("history")}
                        className={`relative z-10 flex-1 h-11 rounded-xl text-sm font-medium transition-colors duration-150 ${activeTab === "history" ? "text-black" : "text-black/50"}`}
                    >
                        이력 조회
                    </button>
                </div>
            </div>

            {activeTab === "result" && data && (
                <div className="flex flex-col gap-4 px-6 mt-6">

                    <div className="flex flex-col items-center gap-2 py-8 bg-white rounded-2xl border border-black/10">
                        <div className="w-16 h-16 bg-linear-100 from-sky-300 to-green-400 rounded-full flex justify-center items-center">
                            <FaCheck  className="w-10 h-10 text-white" />
                        </div>
                        <span className="text-lg font-semibold mt-1">설문이 완료되었습니다.</span>
                        <span className="text-sm text-black/50">객관식 주관식 응답을 기반으로 역량과 추천 결과를 분석했습니다.</span>
                    </div>

                    <div className="bg-white rounded-2xl border border-black/10 p-5 flex flex-col gap-4">
                        <span className="text-sm text-black/60">카테고리별 역량</span>
                        <div className="flex flex-col gap-4">
                            {data.competency_results.map((c) => (
                                <div key={c.competency_result_id} className="flex items-center gap-4">
                                    <span className="w-16 text-sm font-medium text-right shrink-0">{c.name}</span>
                                    <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-linear-90 from-primary-blue to-sky-400 rounded-full"
                                            style={{ width: `${c.total_score}%` }}
                                        />
                                    </div>
                                    <span className="w-8 text-sm font-semibold text-right shrink-0">{c.total_score}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-black/10 p-5 flex flex-col gap-3">
                        <span className="text-sm text-black/60">추천 직무</span>
                        <div className="flex flex-wrap gap-2">
                            {data.job_results.map((j) => (
                                <div key={j.job_result_id} className="flex items-center gap-1.5 bg-blue-100 rounded-full px-4 py-2">
                                    <span className="text-sm font-medium text-blue-700">{j.name}</span>
                                    <span className="text-xs font-bold text-white bg-blue-500 rounded-full px-2 py-0.5">{j.total_score}%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-black/10 p-5 flex flex-col gap-3">
                        <span className="text-sm text-black/60">매칭 공고</span>
                        <div className="flex flex-col gap-3">
                            {data.posting_results.map((p) => (
                                <div key={p.posting_result_id} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                                    <div className="w-10 h-10 rounded-xl bg-gray-300 flex items-center justify-center shrink-0">
                                        <span className="text-sm font-bold text-gray-600">{p.company_name[0]}</span>
                                    </div>
                                    <div className="flex flex-col flex-1 min-w-0">
                                        <span className="text-sm font-semibold truncate">{p.title}</span>
                                        <span className="text-xs text-black/50">{p.company_name} {p.description}</span>
                                    </div>
                                    <div className="w-12 h-12 rounded-full bg-teal-400 flex items-center justify-center shrink-0">
                                        <span className="text-xs font-bold text-white">{p.similarity}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center gap-3 py-6">
                        <button
                            onClick={() => setActiveTab("history")}
                            className="px-6 py-3 rounded-xl border border-black/20 text-sm font-medium"
                        >
                            이력 조회
                        </button>
                        <button className="px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-medium">
                            로드맵 확인
                        </button>
                    </div>
                </div>
            )}
            {activeTab === "history" && (
                <div className="px-6 mt-6 text-center text-black/40 py-20">
                    이력 조회 페이지
                </div>
            )}
        </div>
    );
};

export default HistoryPageResult;
