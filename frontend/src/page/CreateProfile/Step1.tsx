import { useState } from "react";
import bgImage from "../../asset/bg-image.png";


export default function NameModal ({ onNext } : StepProps) {
    const [inputValue, setInputValue] = useState("");

    const handleNextClick = () => {
        onNext(inputValue);
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
                        사용자님의 이름을 알려주세요.
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
                <div className="w-full flex justify-center mt-8">
                    <button 
                        onClick={handleNextClick}
                        className="w-56 h-12 p-3 bg-black rounded-full inline-flex justify-center items-center gap-3 overflow-hidden text-center  text-zinc-100 text-lg font-semibold hover:bg-zinc-800">
                        다음으로
                    </button>
                </div>
            </div>
        
    )
}
type StepProps = {
    onPrev?: () => void;
    onNext: (name: string) => void; 
};