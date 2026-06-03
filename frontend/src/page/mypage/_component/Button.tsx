import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../../util/cn';

const BASE_STYLES = [
  'px-4 py-2 border border-border rounded-xl font-bold transition duration-200',
  'disabled:opacity-50 disabled:cursor-not-allowed',
].join(' ');

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const BaseButton = ({ className, ...props }: ButtonProps) => (
  <button className={cn(BASE_STYLES, className)} {...props} />
);

export const OutlineButton = ({ className, ...props }: ButtonProps) => (
  <BaseButton
    className={cn(
      'hover:border-primary-blue hover:text-primary-blue active:scale-95',
      'disabled:opacity-50 disabled:pointer-events-none',
      className,
    )}
    {...props}
  />
);

export const PrimaryButton = ({ className, ...props }: ButtonProps) => (
  <BaseButton
    className={cn(
      'bg-primary-blue text-font-white hover:bg-blue-700 active:bg-blue-800',
      'disabled:opacity-50 disabled:pointer-events-none ',
      className,
    )}
    {...props}
  />
);
