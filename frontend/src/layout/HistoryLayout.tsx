import { Outlet, useLocation, useNavigate } from "react-router";

const HistoryLayout = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const isHistory = pathname.startsWith("/history-list");

    return (
        <div className="flex flex-col w-full max-w-5xl mx-auto">

            <div className="flex flex-col gap-2 w-full p-4 sm:p-6">
                <span className="text-2xl lg:text-3xl font-semibold text-font-black">공고 매칭 설문</span>
                <span className="text-sm lg:text-base text-font-gray">역량 분석 및 직무, 공고 추천 결과를 확인하세요</span>
            </div>

            <div className="px-4 sm:px-6">
                <div className="relative flex w-full p-1.5 bg-black/10 dark:bg-white/10 rounded-2xl">
                    <div
                        className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-background dark:bg-neutral-700 rounded-xl shadow-sm transition-transform duration-200 ease-in-out"
                        style={{ transform: isHistory ? "translateX(100%)" : "translateX(0)" }}
                    />
                    <button
                        onClick={() => navigate("/history-result")}
                        className={`relative flex-1 h-11 rounded-xl text-sm font-medium transition-colors duration-150 ${!isHistory ? "text-font-black" : "text-font-gray"}`}
                    >
                        설문 완료
                    </button>
                    <button
                        onClick={() => navigate("/history-list")}
                        className={`relative flex-1 h-11 rounded-xl text-sm font-medium transition-colors duration-150 ${isHistory ? "text-font-black" : "text-font-gray"}`}
                    >
                        이력 조회
                    </button>
                </div>
            </div>

            <Outlet />
        </div>
    );
};

export default HistoryLayout;
