import { Outlet } from "react-router";

const HistoryLayout = () => {
    return (
        <div className="flex flex-col w-full max-w-5xl mx-auto">

            <div className="flex flex-col gap-2 w-full p-4 sm:p-6">
                <span className="text-2xl lg:text-3xl font-semibold text-font-black mt-4">공고 매칭 설문</span>
                <span className="text-sm lg:text-base text-font-gray">역량 분석 및 직무, 공고 추천 결과를 확인하세요</span>
            </div>

            <Outlet />
        </div>
    );
};

export default HistoryLayout;
