import { useState } from "react";


import type { Grade, EnrollmentStatus } from "../../utils/type/profile";

export default function FinalModal ({ onNext, onPrev } : StepProps) {
    const [info, setInfo] = useState({
        Grade: "3학년" as Grade,  
        Status: "ENROLLED" as EnrollmentStatus 
    });
    const grades: Grade[] = ["1학년", "2학년", "3학년", "4학년", "기타"];

    const statusOptions: { label: string; value: EnrollmentStatus }[] = [
        { label: "재학", value: "ENROLLED" },
        { label: "휴학", value: "ON_LEAVE" },
        { label: "졸업", value: "GRADUATE" },
    ];

    const handleNextClick = () => {
        onNext(info);
    }

    const handlePrevClick = () => {
        onPrev();
    }


return (
    <div className="flex w-full flex-col items-center">
        <div className="w-full pt-4 flex flex-col items-center">
            <div className="mb-7 flex items-center justify-center">
                <span className="text-lg text-border-strong font-medium">프로필을 생성하고 </span>
                <span className="text-lg text-blue-500 font-medium skew-x-[-10deg] mx-1">COK</span>
                <span className="text-lg text-border-strong font-medium"> 을 시작해보세요</span>
            </div>
            <div className="mb-6 text-xl font-semibold text-slate-800">
                사용자님의 학년/재학 정보를 알려주세요.
            </div>
        </div>

        <div className="w-95 px-6 flex flex-col gap-3">
            <section>
                <p className="mb-4 text-lg font-bold text-slate-700">학년</p>
                <div className="grid grid-cols-5 gap-3">
                    {grades.map((g) => (
                        <button
                            key={g}
                            onClick={() => setInfo({ ...info, Grade: g })}
                            className={`h-12 rounded-xl text-sm font-semibold transition-all flex items-center justify-center ${
                                info.Grade === g
                                    ? "bg-blue-500 text-white shadow-md"
                                    : "bg-gray-100 text-slate-500 hover:bg-slate-200"
                            }`}
                        > {g}
                        </button>
                    ))}
                </div>
            </section>

                    <hr className="border-border-strong/30 border-1"/>
            <section >
                <p className="mb-4 text-lg font-bold text-slate-700">재학</p>
                <div className="grid grid-cols-3 gap-3">
                    {statusOptions.map((o) => (
                        <button
                            key={o.value}
                            onClick={() => setInfo({ ...info, Status: o.value })}
                            className={`h-12 rounded-xl text-sm font-semibold transition-all flex items-center justify-center ${
                                info.Status === o.value
                                    ? "bg-blue-500 text-white shadow-md"
                                    : "bg-gray-100 text-slate-500 hover:bg-slate-200"
                            }`}
                        > {o.label}
                        </button>
                    ))}
                </div>
            </section>
        </div>

        <div className="w-full flex justify-between items-center mt-8 px-6 pb-6">
            <button
                onClick={handlePrevClick}
                className="text-border-strong text-sm font-medium"
            >
                이전 설문으로
            </button>
            <button
                onClick={handleNextClick}
                className="w-32 h-12 bg-black rounded-full flex justify-center items-center text-zinc-100 text-lg font-semibold hover:bg-zinc-800"
            >
                시작하기
            </button>
        </div>
    </div>
);
}

export type StepProps = {
    onNext: (data: {
        Grade: Grade;
        Status: EnrollmentStatus
    }) => void;
    onPrev: () => void;
};