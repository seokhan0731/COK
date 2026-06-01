import { createPortal } from "react-dom";
import { motion } from 'framer-motion'
import clsx from "clsx";
import { useEffect, useState } from "react";

import type { Survey } from "../../type/surveyType";
import SurveyCard from "../card/survey_card/SurveyCard";

//MOCK DATA
import { SURVEY_DATA } from "../card/survey_card/SurveyMock";

type Props = {
  onClose: () => void;
}

type NextButtonProps = {
  onClick: () => void;
  label?: string;
  disabled?: boolean;
}

const SurveyModal = ({ onClose }: Props) => {
    const [survey, setSurvey] = useState<Survey[]>(SURVEY_DATA);
    const [isLoading, setIsLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0)
    const [selected, setSelected] = useState<number | null>(null);
    const [answer, setAnswer] = useState<{ question_id: number; option_id: number }[]>([]);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        fetch('https://e6dc9715-49ed-46a8-b462-6adcd5d9d470.mock.pstmn.io/get/survey')
        .then(res => {
            if (!res.ok) throw new Error('mock fetch failed')
            return res.json()
        })
        .then(data => {
            console.log("Postman 응답");
            setSurvey(data.survey)})
        .catch(() => {
            console.log("임시 데이터 응답");
            setSurvey(SURVEY_DATA)})
        .finally(() => setIsLoading(false))
    }, [])

    const allQuestions = survey.flatMap(s => s.questions)
    const currentQuestion = allQuestions[currentIndex]

    const currentCategory = survey.find(s =>
        s.questions.some(q => q.question_id === currentQuestion.question_id)
    )?.category


    const handleNextClick = async() => {
        if (selected === null) {
            setErrorMsg("답변을 선택해주세요");
            return; 
        }

        const finalAnswers = [
            ...answer.filter(a => a.question_id !== currentQuestion.question_id),
            { question_id: currentQuestion.question_id, option_id: selected }
        ]
        setAnswer(finalAnswers)
        setErrorMsg("")

        if (currentIndex < allQuestions.length - 1) {
            setCurrentIndex(prev => prev + 1)
            setSelected(null)
        } else {
            try {
                await fetch('/api/survey/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ answers: finalAnswers }),
                })
                console.log('제출 완료:', finalAnswers)

                onClose()
            } catch (e) {
                console.error('제출 실패:', e)
                setErrorMsg("제출 중 오류가 발생했습니다. 다시 시도해주세요.")
            }
        }
    }

    const handlePrevClick = () => {
        if (currentIndex === 0) return
        setErrorMsg("");
        setCurrentIndex(prev => prev - 1)
        const prevQuestion = allQuestions[currentIndex - 1]
        const prevAnswer = answer.find(a => a.question_id === prevQuestion.question_id)
        setSelected(prevAnswer?.option_id ?? null)
    }



    if (isLoading || !currentQuestion) return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={onClose}
        >
            <div className="w-8 h-8 rounded-full border-4 border-sky-700/30 border-t-sky-700 animate-spin" />
        </motion.div>,
        document.getElementById('modal-root')!,
    )
    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.3 }}
                className={clsx(
                    'relative w-full max-w-md lg:max-w-2xl',
                    'flex flex-col gap-4 p-6 sm:p-8',
                    'bg-background dark:bg-neutral-900 rounded-3xl overflow-hidden',
                    'max-h-[90dvh] overflow-y-auto',
                )}
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className={clsx(
                        'absolute top-10 left-0 w-40 h-40 rounded-full opacity-20 blur-3xl bg-primary-blue',
                    )}
                    />
                <div
                    className={clsx(
                        'absolute bottom-0 right-px  w-48 h-48 rounded-full opacity-30 blur-3xl bg-primary-emerald',
                    )}
                />  

                <section className="z-10 relative flex flex-col gap-4 w-full">
                    <div className="flex items-center justify-between">
                        <span className="text-xl lg:text-2xl font-semibold text-primary-blue">COK</span>
                        <span className="text-sm text-zinc-400 font-medium">
                            {currentIndex + 1} / {allQuestions.length}
                        </span>
                    </div>

                    <div className="flex flex-col items-center gap-3 py-2">
                        <span className="text-xs lg:text-sm font-medium text-primary-blue bg-primary-blue/10 px-3 py-1 rounded-full">
                            {currentCategory}
                        </span>
                        <span className="text-lg lg:text-2xl font-semibold text-center mb-2">
                            {currentQuestion.content}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                        {currentQuestion.options.map(option => (
                            <SurveyCard
                                key={option.option_id}
                                option={option}
                                isSelected={selected === option.option_id}
                                onClick={() => setSelected(option.option_id)}
                            />
                        ))}
                    </div>

                    {errorMsg && (
                        <span className="text-red-400 text-sm font-medium text-center w-full">
                            {errorMsg}
                        </span>
                    )}

                    <div className="flex items-center justify-between pt-2">
                        <button
                            onClick={handlePrevClick}
                            className={clsx(
                                'text-xs lg:text-sm font-medium transition-colors',
                                'text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-200',
                                currentIndex === 0 && 'invisible',
                            )}
                        >
                            이전 설문으로
                        </button>

                        <NextButton
                            label={allQuestions.length > 0 && currentIndex === allQuestions.length - 1 ? '제출' : '다음'}
                            onClick={handleNextClick}
                        />
                    </div>
                </section>
            </motion.div>
        </motion.div>,
        document.getElementById('modal-root')!,
    )
}

export default SurveyModal;



const NextButton = ({ onClick, label = "다음", disabled }: NextButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="w-28 h-10 lg:w-31 lg:h-12 p-3 bg-black rounded-full 
                inline-flex justify-center items-center text-center 
                text-zinc-100 text-sm lg:text-lg font-semibold hover:bg-zinc-800
                z-50
                dark:bg-sub-blue dark:hover:bg-primary-blue" 
    >
      {label}
    </button>
  );
};