import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useQuery } from '@tanstack/react-query';
import { FaCheck } from 'react-icons/fa';
import { getStacksApi, submitStacksApi } from '../../../api/surveyApi';
import { techSkillLabel } from '../../../util/techSkillLabel';
import { useModal } from '../../provider/ModalProvider';

type Props = {
  selectedRepos: string[];
  sessionId: number;
  onClose: () => void;
  onComplete: () => void;
};

const StackSelectModal = ({ selectedRepos, sessionId, onClose, onComplete }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ['github-stacks', selectedRepos],
    queryFn: ({ signal }) => getStacksApi(selectedRepos, signal),
  });

  const { close } = useModal();
  const [selected, setSelected] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const isSelected = (skill: string) => selected.includes(skill);

  const toggle = (skill: string) => {
    if (selected.includes(skill)) {
      setSelected(selected.filter((k) => k !== skill));
    } else {
      setSelected([...selected, skill]);
    }
  };

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    setError(false);

    console.log('호출됨');
    try {
      await submitStacksApi({ selected_stacks: selected, session_id: sessionId });
      onComplete();
      close();
      window.location.href = `/history-result/${sessionId}`;
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const detected = data?.detected ?? [];
  const additional = data?.additional ?? [];

  const renderSkill = (skill: string, variant: 'detected' | 'manual') => {
    const active = isSelected(skill);
    const isManual = variant === 'manual';
    return (
      <li key={skill} className="w-full lg:w-auto">
        <button
          type="button"
          onClick={() => toggle(skill)}
          className={[
            'flex w-full h-17 items-center justify-start gap-3 rounded-2xl border px-6 py-3.5 text-left transition lg:w-70',
            'bg-background dark:bg-neutral-700/60',

            isManual ? 'border-dashed' : 'border-black',
            active
              ? 'border-primary-blue ring-1 ring-primary-blue'
              : 'border-border hover:border-primary-blue/40',
          ].join(' ')}
        >
          <span
            className={[
              'flex h-5 w-5 shrink-0 items-center-safe justify-center-safe rounded-md border transition',
              active
                ? 'border-primary-blue bg-primary-blue text-font-white'
                : 'border-border bg-transparent text-transparent  dark:border-2',
            ].join(' ')}
          >
            <FaCheck className="h-3 w-3" strokeWidth={3} />
          </span>

          <span
            className={[
              'min-w-0 flex-1 truncate text-[15px] font-semibold',
              active ? 'text-primary-blue' : 'text-font-black',
            ].join(' ')}
          >
            {techSkillLabel(skill)}
          </span>
        </button>
      </li>
    );
  };

  return (
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
          선택한 레포에서 추적한 스택이에요. 실제로 사용한 것만 골라주세요.
        </p>
      </div>

      <div
        className="mt-5 overflow-y-auto px-6 pb-2 lg:px-8"
        style={{ height: 280, scrollbarGutter: 'stable both-edges' }}
      >
        <div className="flex flex-col gap-5 mt-1">
          <section className="flex flex-col gap-2.5">
            <h3 className="text-sm font-semibold text-zinc-400">레포에서 추적한 스택</h3>
            <ul className="flex flex-wrap justify-start gap-3 lg:gap-2.5">
              {detected.map((skill) => renderSkill(skill, 'detected'))}
            </ul>

            {detected.length === 0 && (
              <span className="flex items-center justify-center py-10 text-zinc-400">
                추적된 스택이 없어요
              </span>
            )}
          </section>

          {additional.length > 0 && (
            <section className="flex flex-col gap-2.5">
              <span className="text-sm font-semibold text-zinc-400">
                추적이 불가능한 기술스택 직접 선택해주세요
              </span>
              <ul className="flex flex-wrap justify-center gap-3 lg:gap-2.5">
                {additional.map((skill) => renderSkill(skill, 'manual'))}
              </ul>
            </section>
          )}
        </div>
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
          disabled={isLoading || submitting}
          className={[
            'rounded-full px-9 py-3 text-sm font-bold transition',
            'bg-black text-font-white hover:bg-zinc-800 dark:bg-sub-blue dark:hover:bg-primary-blue',
            'disabled:cursor-not-allowed disabled:opacity-50',
          ].join(' ')}
        >
          제출
        </button>
      </div>
    </div>
  );
};

export default StackSelectModal;
