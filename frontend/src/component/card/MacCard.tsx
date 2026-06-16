// frontend/src/components/cards/MacCard.tsx

import clsx from 'clsx';
import type { ReactNode } from 'react';
import { cn } from '../../util/cn';

type Props = {
  title?: string;
  className?: string;
  children: ReactNode;
};

const MacCard = ({ title, className, children }: Props) => {
  return (
    <div
      className={cn(
        'flex flex-col rounded-md border border-border shadow-md overflow-hidden',
        'hover:scale-105 transition-transform duration-300',
        className,
      )}
    >
      <div
        className={clsx(
          'flex flex-row justify-between items-center-safe w-full px-4 py-1.5 bg-zinc-200',
          'dark:bg-zinc-800',
        )}
      >
        <div className="flex gap-2 ">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>

        <div>
          <span>{title}</span>
        </div>

        <div className="flex gap-2 invisible">
          <div className="w-3 h-3" />
          <div className="w-3 h-3" />
          <div className="w-3 h-3" />
        </div>
      </div>

      <div className="flex flex-col p-6 bg-primary-blue/10">{children}</div>
    </div>
  );
};

export default MacCard;
