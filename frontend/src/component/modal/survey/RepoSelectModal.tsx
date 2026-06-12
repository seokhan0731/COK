import { useState } from "react";
import { createPortal } from "react-dom";
import { useQuery } from "@tanstack/react-query";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FiGithub } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";
import { getGithubReposApi } from "../../../api/surveyApi";

const MAX_SELECT = 3;

type Props = {
  onClose: () => void;
  onComplete: (selectedRepos: string[]) => void;
};

const RepoSelectModal = ({ onClose, onComplete }: Props) => {
  const {
    data: repos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["github-repos"],
    queryFn: ({ signal }) => getGithubReposApi(signal),
  });

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const reachedMax = selected.length >= MAX_SELECT;
  const canSubmit = selected.length > 0;

  const isSelected = (name: string) => selected.includes(name);

  const toggle = (name: string) => {
    if (selected.includes(name)) {
      setSelected(selected.filter((n) => n !== name));
    } else if (selected.length < MAX_SELECT) {
      setSelected([...selected, name]);
    }
  };

  const filtered = (repos ?? []).filter((repo) =>
    repo.name.toUpperCase().includes(query.toUpperCase()),
  );

  const handleSubmit = () => {
    if (!canSubmit) return;
    onComplete(selected);
  };

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
            분석할 레포지토리를 선택해주세요
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            최대 {MAX_SELECT}개를 선택할 수 있어요.
          </p>
        </div>

        <div className="px-6 pt-5 lg:px-8">
          <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3.5 py-2.5 dark:bg-neutral-700/60 focus-within:border-primary-blue">
            <FaMagnifyingGlass className="h-4 w-4 shrink-0 text-zinc-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="레포지토리 검색"
              className="w-full bg-transparent text-sm text-font-black outline-none placeholder:text-zinc-400"
            />
          </div>
        </div>

        <div className="mt-4 flex-1 overflow-y-auto px-6 pb-2 lg:px-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 rounded-full border-4 border-primary-blue/30 border-t-primary-blue animate-spin" />
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-sm text-zinc-400">
              <FiGithub className="mb-3 h-8 w-8 opacity-40" />
              레포지토리를 불러오지 못했어요.
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-sm text-zinc-400">
              <FiGithub className="mb-3 h-8 w-8 opacity-40" />
              표시할 레포지토리가 없어요.
            </div>
          ) : (
            <ul className="flex flex-col gap-2.5">
              {filtered.map((repo) => {
                const active = isSelected(repo.name);
                const disabled = !active && reachedMax;
                return (
                  <li key={repo.name}>
                    <button
                      type="button"
                      onClick={() => toggle(repo.name)}
                      disabled={disabled}
                      className={[
                        "flex w-full items-center gap-3.5 rounded-2xl border px-4 py-3.5 text-left transition",
                        "bg-background dark:bg-neutral-700/60",
                        active
                          ? "border-primary-blue ring-1 ring-primary-blue"
                          : "border-border hover:border-primary-blue/40",
                        disabled ? "cursor-not-allowed opacity-40" : "",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition",
                          active
                            ? "bg-primary-blue text-font-white"
                            : "bg-zinc-100 text-zinc-500 dark:bg-neutral-600",
                        ].join(" ")}
                      >
                        <FiGithub className="h-5 w-5" />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span
                          className={[
                            "block truncate text-[15px] font-semibold",
                            active ? "text-primary-blue" : "text-font-black",
                          ].join(" ")}
                        >
                          {repo.name}
                        </span>
                        <span className="block truncate text-[13px] text-zinc-400">
                          {repo.description ?? "설명이 없습니다."}
                        </span>
                      </span>

                      {/* 체크 표시 */}
                      <span
                        className={[
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition",
                          active
                            ? "border-primary-blue bg-primary-blue text-font-white"
                            : "border-border bg-transparent text-transparent",
                        ].join(" ")}
                      >
                        <FaCheck className="h-4 w-4" strokeWidth={3} />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* 하단 바 */}
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
            다음
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")!,
  );
};

export default RepoSelectModal;
