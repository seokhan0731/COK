import { createPortal } from "react-dom";
import { motion } from 'framer-motion'
import clsx from "clsx";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import type { Answer } from "../../../type/surveyType";
import { getSurveyApi, submitSurveyApi } from "../../../api/surveyApi";
import SurveyCard from "../../card/survey_card/SurveyCard";
import RepoSelectModal from "./RepoSelectModal";
import StackSelectModal from "./StackSelectModal";
import { useIsLoggedIn } from "../../../store/authStore";

type Props = {
  onClose: () => void;
}

type NextButtonProps = {
  onClick: () => void;
  label?: string;
  disabled?: boolean;
}

const SurveyModal = ({ onClose }: Props) => {
    const { data: questions, isLoading } = useQuery({
        queryKey: ["survey"],
        queryFn: ({ signal }) => getSurveyApi(signal),
    });

    const isLoggedIn = useIsLoggedIn();

    const [step, setStep] = useState<"survey" | "repo" | "stack">("survey");
    const [selectedRepos, setSelectedRepos] = useState<string[]>([]);
    const [sessionId, setSessionId] = useState<number | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [essay, setEssay] = useState("");
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [errorMsg, setErrorMsg] = useState("");

    const currentQuestion = questions?.[currentIndex];
    const isEssay = currentQuestion?.type === "ESSAY";
    const isLast = !!questions && currentIndex === questions.length - 1;

    const handleNextClick = async () => {
        if (!currentQuestion) return;

        let currentAnswer: Answer;

        if (isEssay) {
            if (essay.trim() === "") {
                setErrorMsg("답변을 입력해주세요");
                return;
            }
            if (essay.trim().length < 5) {
                setErrorMsg("답변은 5자 이상 입력해주세요.");
                return;
            }
            currentAnswer = {
                question_id: currentQuestion.question_id,
                essay_answer: essay.trim(),
            };
        } else {
            if (selected === null) {
                setErrorMsg("답변을 선택해주세요");
                return;
            }
            currentAnswer = {
                question_id: currentQuestion.question_id,
                option_id: selected,
            };
        }

        const newAnswers = [
            ...answers.filter((a) => a.question_id !== currentQuestion.question_id),
            currentAnswer,
        ];
        setAnswers(newAnswers);
        setErrorMsg("");

        if (!isLast) {
            setCurrentIndex(currentIndex + 1);
            setSelected(null);
            setEssay("");
            return;
        }
        try {
            const newSessionId = await submitSurveyApi({ answers: newAnswers });
            setSessionId(newSessionId);
            setStep("repo");
        } catch {
            setErrorMsg("제출 중 오류가 발생했어요.");
        }
    };

    const handlePrevClick = () => {
        if (currentIndex === 0 || !questions) return;
        setErrorMsg("");
        const prevIndex = currentIndex - 1;
        setCurrentIndex(prevIndex);

        const prevQuestion = questions[prevIndex];
        const prevAnswer = answers.find(a => a.question_id === prevQuestion.question_id);
        setSelected(prevAnswer?.option_id ?? null);
        setEssay(prevAnswer?.essay_answer ?? "");
    };

    const handleRepoComplete = (repos: string[]) => {
        // 레포 제출 + 스택 감지는 stack 단계의 getStacksApi(POST /survey/repos)가 함께 처리한다.
        setSelectedRepos(repos);
        setStep("stack");
    };

    if (step === "repo") {
        return (
            <RepoSelectModal
                onClose={onClose}
                onComplete={handleRepoComplete}
            />
        );
    }

    if (step === "stack" && sessionId !== null) {
        return (
            <StackSelectModal
                selectedRepos={selectedRepos}
                sessionId={sessionId}
                onClose={onClose}
                onComplete={onClose}
            />
        );
    }

    if (isLoading) return createPortal(
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
    if (!currentQuestion) {
        alert("로그인 후 이용해주세요");
        onClose();
        return null;
    }

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
                            {currentIndex + 1} / {questions.length}
                        </span>
                    </div>

                    <div className="flex flex-col items-center gap-3 py-2">
                        {/* TODO: 카테고리 뱃지 - competency_id로 프론트에서 매핑 후 복구 예정
                        <span className="text-xs lg:text-sm font-medium text-primary-blue bg-primary-blue/10 px-3 py-1 rounded-full">
                            {currentCategory}
                        </span>
                        */}
                        <span className="text-lg lg:text-2xl font-semibold text-center mb-2">
                            {currentQuestion.content}
                        </span>
                    </div>

                    {isEssay ? (
                        <textarea
                            value={essay}
                            onChange={(e) => setEssay(e.target.value)}
                            maxLength={1000}
                            rows={4}
                            placeholder="자유롭게 작성해주세요"
                            className={clsx(
                                'w-full p-4 rounded-2xl border-2 border-border resize-none',
                                'bg-background dark:bg-neutral-700/60 text-font-black',
                                'outline-none focus:border-primary-blue transition-colors ',
                            )}
                        />
                    ) : (
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
                    )}

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
                            label='다음'
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
