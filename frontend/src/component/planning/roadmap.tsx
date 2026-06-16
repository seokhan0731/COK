import { FaCheck, FaCode, FaBook, FaLayerGroup, FaCertificate } from 'react-icons/fa';
import { GrPrevious, GrNext } from 'react-icons/gr';
import { IoBookSharp } from 'react-icons/io5';
import { X } from 'lucide-react';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';

import type { RoadmapCardProps, MonthlyDetail, RoadmapData } from '../../type/planningType';

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'TECH_STACK':
      return <FaLayerGroup className="text-blue-500" />;
    case 'ALGORITHM':
      return <FaCode className="text-blue-500" />;
    case 'CERTIFICATE':
      return <FaCertificate className="text-blue-500" />;
    case 'KNOWLEDGE':
      return <FaBook className="text-blue-500" />;
    default:
      return null;
  }
};
const categoryLabel: Record<string, string> = {
  TECH_STACK: '기술스택',
  ALGORITHM: '알고리즘',
  KNOWLEDGE: '관련 지식',
  CERTIFICATE: '자격증',
};

const RoadmapCard = ({ month, createdAt, onPrev, onNext, isFirst, isLast }: RoadmapCardProps) => {
  const [selectedDetail, setSelectedDetail] = useState<MonthlyDetail | null>(null);

  const handleDetailClick = (detail: MonthlyDetail) => {
    if (window.innerWidth < 1024) setSelectedDetail(detail);
  };

  const onClose = () => setSelectedDetail(null);

  const queryClient = useQueryClient();

  const handleToggle = (target: MonthlyDetail) => {
    queryClient.setQueryData<RoadmapData>(['planning'], (prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        months: prev.months.map((m) => ({
          ...m,
          details: m.details.map((d) =>
            d.detail_id === target.detail_id ? { ...d, is_completed: !d.is_completed } : d,
          ),
        })),
      };
    });
  };

  return (
    <div className="relative w-full h-60 lg:w-170 lg:h-120 bg-indigo-100/80 rounded-3xl flex flex-col dark:bg-neutral-900">
      <div className="p-4 lg:p-7">
        <div className="w-14 h-5 lg:w-28 lg:h-8 bg-linear-to-r from-emerald-100/90 to-emerald-300/70 rounded-3xl flex items-center justify-center">
          <p className="text-slate-600 text-xs lg:text-lg font-medium text-center">진행중</p>
        </div>

        <IoBookSharp className="absolute right-10 top-2 lg:right-20 lg:top-3 text-slate-400/30 w-20 h-20 lg:w-30 lg:h-30 " />

        <div className="p-2.5 lg:p-5">
          <div className="flex items-center gap-4 mb-2 lg:mb-5">
            <button
              onClick={onPrev}
              disabled={isFirst}
              className={clsx(
                'text-xl font-semibold transition-colors',
                isFirst
                  ? 'text-slate-300 cursor-not-allowed dark:text-slate-950'
                  : 'text-slate-500 dark:text-primary-blue/70 hover:text-slate-950 dark:hover:text-slate-300',
              )}
            >
              <GrPrevious />
            </button>

            <h1 className="text-blue-950 text-xl lg:text-3xl font-semibold dark:text-font-white/80">
              {!createdAt ? '2026년 06월 01일' : `${createdAt.slice(0, 4)}년 ${month?.month_num}월`}
            </h1>

            <button
              onClick={onNext}
              disabled={isLast}
              className={clsx(
                'text-xl font-semibold transition-colors',
                isLast
                  ? 'text-slate-300 cursor-not-allowed dark:text-slate-950'
                  : 'text-slate-500 dark:text-primary-blue/70 hover:text-slate-950 dark:hover:text-slate-300',
              )}
            >
              <GrNext />
            </button>
          </div>
        </div>

        <div>
          {month?.details.map((detail) => (
            <div
              key={detail.detail_id}
              onClick={() => handleDetailClick(detail)}
              className="w-full h-16 lg:h-28 bg-background rounded-2xl mb-3 lg:mb-5 flex items-center px-5 cursor-pointer"
            >
              <div className="size-10 lg:size-16 bg-indigo-100 rounded-full flex items-center justify-center shrink-0 dark:bg-slate-600/25 ">
                <div className="text-sm lg:text-3xl">{getCategoryIcon(detail.category)}</div>
              </div>

              <div className="flex flex-1 justify-between">
                <div className="px-2 lg:px-5">
                  <h3 className="text-blue-950 text-sm lg:text-xl font-bold dark:text-sub-blue/60 py-3 lg:py-0 text-left">
                    {categoryLabel[detail.category]}
                  </h3>
                  <p className="text-slate-500 text-xs lg:text-base mt-1 whitespace-nowrap lg:py-1 hidden lg:flex">
                    {detail.content}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggle(detail);
                  }}
                  className="size-10 lg:size-16 bg-background rounded-full flex items-center justify-center shrink-0 transition-transform hover:scale-105"
                >
                  {detail.is_completed ? (
                    <div className="size-10 lg:size-16 bg-linear-to-br from-primary-blue/40 to-primary-emerald rounded-full flex items-center justify-center">
                      <FaCheck className="text-white text-base lg:text-2xl" />
                    </div>
                  ) : (
                    <div className="size-10 lg:size-16 bg-blue-100 rounded-full flex items-center justify-center dark:bg-slate-600/25">
                      <FaCheck className="text-blue-950 text-base lg:text-2xl dark:text-blue-50" />
                    </div>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedDetail &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={onClose}
          >
            <div
              className="bg-background dark:bg-zinc-900 rounded-2xl p-6 w-full max-w-xs shadow-xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-700 transition-colors absolute right-5 top-5 "
              >
                <X size={22} strokeWidth={2} />
              </button>
              <div className="flex items-center gap-3 mb-5 mt-1.5 ">
                <div className="text-xl">{getCategoryIcon(selectedDetail.category)}</div>
                <h3 className="text-blue-950 dark:text-white text-lg font-bold ">
                  {categoryLabel[selectedDetail.category]}
                </h3>
              </div>
              <p className="text-slate-600 dark:text-neutral-400 text-sm mb-5 px-2">
                {selectedDetail.content}
              </p>
            </div>
          </div>,
          document.getElementById('modal-root')!,
        )}
    </div>
  );
};

export default RoadmapCard;
