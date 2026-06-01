import { useState } from "react";
import bgImage from "../../asset/bg-image.png";

//icons
import { GoArrowRight } from "react-icons/go";
import { LuCake } from "react-icons/lu";
import NextButton from "../../component/button/NextButton";

export default function BirthModal({ onNext, onPrev } : StepProps) {
    const [inputValue, setInputValue] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleNextClick = () => {
        if (inputValue.length == 4 && Number(inputValue) <= 2026 && Number(inputValue) >= 1900){
            setErrorMsg(""); 
            onNext(inputValue);
        } else {
            setErrorMsg("유효한 출생연도를 작성해주세요. (1900~2026)");
        }
    }

    const handlePrevClick = () => {
        onPrev();
    }
    return(
        <div>
            <div className="w-full lg:h-81 h-45 flex flex-col items-center justify-center">
                    <div className="mb-5 lg:mb-7 flex items-center justify-center">
                        <span className="text-base lg:text-lg text-gray-500 font-medium">프로필을 생성하고&nbsp; </span>
                        <span className="text-base lg:text-lg text-primary-blue font-medium skew-x-[-10deg]">COK</span>                    
                        <span className="text-base lg:text-lg text-gray-500 font-medium">을 시작해보세요</span>    
                    </div>
                    <div className="mb-10 text-xl font-semibold text-font-black">    
                        사용자님의 출생연도를 알려주세요.
                    </div>
                    <img 
                    className="w-80 h-26 mb-7 hidden lg:block"
                    src={bgImage}
                />

                <div className="w-74 relative">
                    <LuCake 
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-border-dark/50 text-xl z-10 hover:text-border-dark-blue hover:font-semibold dark:text-font-white/60" 
                    />
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            if (errorMsg) setErrorMsg(""); 
                        }}
                        placeholder="EX) 2001 "
                        className="h-9 w-74 rounded-lg border border-border-dark/70 placeholder:text-background-dark/50 px-6 font-medium pl-10 pr-10 focus:outline-border-dark
                            dark:bg-zinc-800 dark:border-black dark:placeholder:text-font-white/60  dark:focus:outline-border-dark dark:text-white
                            "
                        >
                        
                    </input>
                    
                    <button>
                        <GoArrowRight 
                            onClick={handleNextClick}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-border-dark/70 text-xl z-10 hover:text-border-dark-blue hover:font-semibold dark:text-font-white/60 hover:text-font-black/80 dark:hover:text-font-white" 
                        />
                    </button>
                </div>
                    {errorMsg && (
                        <span className="text-red-400 text-sm font-medium w-74 mt-3 pl-2 -mb-5">
                            {errorMsg}
                        </span>
                        )}
                
                </div>

                

                <div className="w-full flex justify-between mt-8 px-6 pb-6">
                    <button
                        onClick={handlePrevClick}   
                        className="text-background-dark/40 text-xs lg:text-sm font-medium dark:text-font-white/70  hover:font-bold hover:text-font-black/60 dark:hover:text-font-white">
                        이전 설문으로
                    </button>
                    <NextButton 
                        label="다음"
                        onClick={handleNextClick}/>
                </div>
                
        </div>
    )
}

type StepProps = {
    onNext: (birth: string) => void;
    onPrev: () => void;
};