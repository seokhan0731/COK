/* src/page/mypage/_component/LoadingSpinner.tsx */

import { cn } from '../../../util/cn';

type LoadingSpinnerProps = {
  className?: string;
};

const LoadingSpinner = ({ className }: LoadingSpinnerProps) => (
  <div
    className={cn(
      'size-8 animate-spin rounded-full border-4 border-border border-t-primary-blue',
      className,
    )}
  />
);

export default LoadingSpinner;
