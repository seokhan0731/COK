import { useState } from "react"
import ProgressBar from "./Progress bar";

//Type
import type { User } from "../../util/type/profile"

//Modal
import NameModal from "./Step1";
import BirthModal from "./Step2";
import FinalModal from "./Step3";

interface Props {
    onClose: () => void;
}

export default function CreateProfilePage({ onClose } : Props){
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<User>({
        name: '',
        birth: '',
        grade: null,
        status: null,
    });

    const handleSubmit = async (data: User) => {
    try {
        console.log("최종 프로필 데이터:", data);

    } catch (error) {
        console.error("프로필 전송 실패:", error);
    }
}
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm  dark:bg-white/40">
            
                <div className=
                {`lg:w-108 lg:h-130 w-90  rounded-2xl bg-background floex-col items-center justify-center dark:bg-zinc-900
                    ${step === 3 ? "h-115" : "h-85"
                }`}>    

                <div className="w-full  mt-8 flex items-center justify-center">
                        <ProgressBar step={step} />
                    </div>

                <div className="grow flex flex-col items-center"></div>
                    {step === 1? (
                        <NameModal 
                            onNext={(name: string) => {
                                setFormData({ ...formData, name: name });
                                setStep(2);
                            }}
                            
                            /> 
                    ): null} 

                    {step === 2? (
                        <BirthModal
                            onNext={(birth: string) => {
                                setFormData({ ...formData, birth: birth});
                                setStep(3);
                            }}
                            onPrev={() => setStep(1)}
                            />
                    ): null}

                    {step === 3?(
                        <FinalModal
                            onNext={(data) => {
                                const finalData = ({ 
                                    ...formData,
                                    grade: data.Grade,
                                    status: data.Status,
                                })
                                setFormData(finalData);

                                handleSubmit(finalData);
                            }}
                            onPrev={() => setStep(2)}
                            />
                            
                    ): null}
            </div>
        </div>
    )
}

