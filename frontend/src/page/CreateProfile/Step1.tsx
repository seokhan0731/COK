import { useState } from "react";
import bgImage from "../../asset/bg-image.png";


//icons
import { FiUser } from "react-icons/fi";
import { GoArrowRight } from "react-icons/go";
import NextButton from "../../component/buttons";



export default function NameModal ({ onNext } : StepProps) {
    const [inputValue, setInputValue] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleNextClick = () => {
        if (inputValue.length >= 2) {
            setErrorMsg(""); 
            onNext(inputValue);
        } else {
            setErrorMsg("이름은 2글자 이상 입력해주세요.");
        }
    }
    return(
        <div>
             
                <div className="w-full lg:h-81 h-45 flex flex-col items-center justify-center">
                    <div className="mb-5 flex items-center justify-center">
                        <span className="text-base lg:text-lg text-gray-500 font-medium">프로필을 생성하고&nbsp; </span>
                        <span className="text-base lg:text-lg text-primary-blue font-medium skew-x-[-10deg]">COK</span>                    
                        <span className="text-base lg:text-lg text-gray-500 font-medium">을 시작해보세요</span>    
                    </div>
                    <div className="mb-10 text-xl font-semibold text-font-black">
                        사용자님의 이름을 알려주세요.
                    </div>
                    <img 
                    className="w-80 h-26 mb-7 hidden lg:block "
                    src={bgImage}
                    />

                    <div className="w-74 relative">
                        <FiUser
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-border-dark/50 text-xl z-10 hover:text-border-dark-blue hover:font-semibold dark:text-font-white/60" 
                        />
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => {
                                setInputValue(e.target.value);
                                if (errorMsg) setErrorMsg(""); 
                            }}
                            placeholder="EX) 김콕콕 "
                            className="h-9 w-74 rounded-lg border border-border-dark/70 placeholder:text-background-dark/50 px-6 font-medium pl-10 pr-10 focus:outline-border-dark
                            dark:bg-zinc-800 dark:border-black dark:placeholder:text-font-white/60  dark:focus:outline-border-dark dark:text-white
                            "
                            >
                            
                        </input>
                        
                        <button>
                            <GoArrowRight 
                                onClick={handleNextClick}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-border-dark/70 text-xl z-10 hover:text-font-black/80 hover:font-semibold dark:text-font-white/60 dark:hover:text-font-white" 
                            />
                        </button>
                    </div>

                    {errorMsg && (
                            <span className="text-red-400 text-sm font-medium w-74 mt-3 pl-2 -mb-5 ">
                                {errorMsg}
                            </span>
                        )}
                </div>
                <div className="w-full flex justify-center mt-8">
                    <NextButton 
                        label="다음"
                        onClick={handleNextClick}/>
                </div>
            </div>
        
    )
}
type StepProps = {
    onPrev?: () => void;
    onNext: (name: string) => void; 
};