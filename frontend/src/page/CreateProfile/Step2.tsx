import { useState } from "react";
import bgImage from "../../asset/bg-image.png";

export default function BirthModal({ onNext, onPrev } : StepProps) {
    const [inputValue, setInputValue] = useState("");

    const handleNextClick = () => {
        onNext(inputValue);
    }

    const handlePrevClick = () => {
        onPrev();
    }
    return(
        <div>
            <div className="w-full h-81 flex flex-col items-center justify-center">
                    <div className="mb-7 flex items-center justify-center">
                        <span className="text-lg text-border-strong font-medium">프로필을 생성하고 </span>
                        <span className="text-lg text-primary-blue font-medium skew-x-[-10deg]">COK</span>                    
                        <span className="text-lg text-border-strong font-medium"> 을 시작해보세요</span>    
                    </div>
                    <div className="mb-7 text-xl font-semibold">
                        사용자님의 출생연도를 알려주세요.
                    </div>
                    <img 
                    className="w-80 h-26 mb-7"
                    src={bgImage}
                />

                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="EX) 김콕콕"
                    className="h-9 w-74 rounded-lg border border-strong px-6"
                    >
                </input>
                
                </div>
                <div className="w-full flex justify-between mt-8 px-6 pb-6">
                    <button
                        onClick={handlePrevClick}   
                        className="text-border-strong text-sm font-medium">
                        이전 설문으로
                    </button>
                    <button 
                        onClick={handleNextClick}
                        className="w-31 h-12 p-3 bg-black rounded-full inline-flex justify-center items-center gap-3 overflow-hidden text-center  text-zinc-100 text-lg font-semibold hover:bg-zinc-800">
                        다음
                    </button>
                </div>
                
        </div>
    )
}

type StepProps = {
    onNext: (birth: string) => void;
    onPrev: () => void;
};