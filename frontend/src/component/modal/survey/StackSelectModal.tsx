import { useState } from "react";
import { createPortal } from "react-dom";
import { useQuery } from "@tanstack/react-query";
import { FaCheck } from "react-icons/fa";
import { FiLayers } from "react-icons/fi";
import { getStacksApi, submitStacksApi } from "../../../api/surveyApi";

type Props = {
  selectedRepos: string[];
  onClose: () => void;
  onComplete: () => void;
};

const StackSelectModal = ({ selectedRepos, onClose, onComplete }: Props) => {
  const {
    data: stacks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["github-stacks", selectedRepos],
    queryFn: ({ signal }) => getStacksApi(selectedRepos, signal),
  });

  const [selected, setSelected] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const isSelected = (keyword: string) => selected.includes(keyword);

  const toggle = (keyword: string) => {
    if (selected.includes(keyword)) {
      setSelected(selected.filter((k) => k !== keyword));
    } else {
      setSelected([...selected, keyword]);
    }
  };

  const handleSubmit = async () => {
    if (selected.length === 0) return;
    setSubmitting(true);
    setError(false);
    try {
      await submitStacksApi({ selected_stacks: selected });
      onComplete();
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const stackList = stacks ?? [];
  const hasStacks = stackList.length > 0;
  const canSubmit = selected.length > 0 && !submitting;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex w-full max-w-2xl max-h-[90dvh] flex-col overflow-hidden rounded-3xl shadow-2xl bg-background dark:bg-neutral-900"
      >
        <div className="flex items-center justify-start px-6 pt-8 lg:px-8">
          <span className="text-xl font-extrabold tracking-tight text-primary-blue">COK</span>
        </div>

        <div className="px-6 pt-5 text-center lg:px-8">
          <h2 className="text-xl font-bold leading-snug text-font-black lg:text-2xl">
            사용한 기술 스택을 선택해주세요
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            선택한 레포에서 감지된 스택이에요. 실제로 사용한 것만 골라주세요.
          </p>
        </div>

        <div
          className="mt-5 overflow-y-auto px-6 pb-2 lg:px-8"
          style={{ height: 280, scrollbarGutter: "stable both-edges" }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 rounded-full border-4 border-sky-700/30 border-t-sky-700 animate-spin mt-25" />
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-sm text-zinc-400">
              <FiLayers className="mb-3 h-8 w-8 opacity-40" />
              기술 스택을 불러오지 못했어요.
            </div>
          ) : !hasStacks ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-sm text-zinc-400">
              <FiLayers className="mb-3 h-8 w-8 opacity-40" />
              감지된 기술 스택이 없어요.
            </div>
          ) : (
            <ul className="flex flex-wrap justify-center gap-3 lg:gap-2.5 mt-1">
              {stackList.map((stack) => {
                const active = isSelected(stack.keyword);
                return (
                  <li key={stack.keyword} className="w-full lg:w-auto">
                    <button
                      type="button"
                      onClick={() => toggle(stack.keyword)}
                      className={[
                        "flex w-full h-17 items-center justify-center gap-3 rounded-2xl border px-6 py-3.5 text-left transition lg:w-70",
                        "bg-background dark:bg-neutral-700/60 border-black",
                        active
                          ? "border-primary-blue ring-1 ring-primary-blue"
                          : "border-border hover:border-primary-blue/40",
                      ].join(" ")}
                    >
                      {/* 체크박스 */}
                      <span
                        className={[
                          "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition",
                          active
                            ? "border-primary-blue bg-primary-blue text-font-white"
                            : "border-border bg-transparent text-transparent  dark:border-2",
                        ].join(" ")}
                      >
                        <FaCheck className="h-3 w-3" strokeWidth={3} />
                      </span>

                      {/* 스택 이름 */}
                      <span
                        className={[
                          "min-w-0 flex-1 truncate text-[15px] font-semibold",
                          active ? "text-primary-blue" : "text-font-black",
                        ].join(" ")}
                      >
                        {stack.name}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {error && (
          <p className="px-6 pt-3 text-center text-sm font-medium text-red-400 lg:px-8">
            제출 중 오류가 발생했어요.
          </p>
        )}

        <div className="flex items-center justify-end px-6 pb-8 pt-4 lg:px-8">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={[
              "rounded-full px-9 py-3 text-sm font-bold transition",
              canSubmit
                ? "bg-black text-font-white hover:bg-zinc-800 dark:bg-sub-blue dark:hover:bg-primary-blue"
                : "cursor-not-allowed bg-zinc-200 text-zinc-400 dark:bg-neutral-700 dark:text-neutral-500",
            ].join(" ")}
          >
            {submitting ? "제출 중…" : "제출"}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")!,
  );
};

export default StackSelectModal;
