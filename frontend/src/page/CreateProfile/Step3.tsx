import { useState } from "react";

import type { Grade, EnrollmentStatus } from "../../util/type/profile";
import NextButton from "../../component/button/NextButton";

export default function FinalModal ({ onNext, onPrev } : StepProps) {
    const [info, setInfo] = useState({
        Grade: "1학년" as Grade,  
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
            <div className="mb-5 lg:mb-7 flex items-center justify-center">
                <span className="text-base lg:text-lg text-gray-500 font-medium">프로필을 생성하고&nbsp; </span>
                <span className="text-base lg:text-lg text-primary-blue font-medium skew-x-[-10deg]">COK</span>                    
                <span className="text-base lg:text-lg text-gray-500 font-medium">을 시작해보세요</span>    
            </div>
            <div className="mb-6 lg:text-xl text-lg font-semibold text-font-black">
                사용자님의 학년/재학 정보를 알려주세요.
            </div>
        </div>

        <div className="w-95 px-6 flex flex-col gap-3">
            <section>
                <p className="mb-4 ml-2 lg:ml-1 text-base lg:text-lg font-base text-slate-700 dark:text-font-white/90">학년</p>
                <div className="grid grid-cols-5 lg:gap-3 gap-2 mb-2">
                    {grades.map((g) => (
                        <button
                            key={g}
                            onClick={() => setInfo({ ...info, Grade: g })}
                            className={`w-14 h-10  rounded-lg text-xs font-medium transition-all flex items-center justify-center ${
                                info.Grade === g
                                    ? "bg-blue-400 text-white shadow-md "
                                    : "bg-gray-100 text-black hover:bg-slate-200 hover:text-black/80"
                            }`}
                        > {g}
                        </button>
                    ))}
                </div>
            </section>

                    <hr className="border-border border"/>

            <section >
                <p className="mb-4  ml-2 lg:ml-1  text-base lg:text-lg  font-base text-slate-700 dark:text-font-white/90">재학</p>
                <div className="grid grid-cols-3 gap-5 justify-items-center ">
                    {statusOptions.map((o) => (
                        <button
                            key={o.value}
                            onClick={() => setInfo({ ...info, Status: o.value })}
                            className={`w-20 h-11 rounded-lg text-sm font-medium transition-all flex items-center justify-center ${
                                info.Status === o.value
                                    ? "bg-blue-400 text-white shadow-md "
                                    : "bg-gray-100 text-black hover:bg-slate-200 hover:text-black/80"
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
                className="text-background-dark/40 text-xs lg:text-sm font-medium dark:text-font-white/70  hover:font-bold hover:text-font-black/60 dark:hover:text-font-white">
                이전 설문으로
            </button>
            <NextButton 
                        label="시작하기"
                        onClick={handleNextClick}/>
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