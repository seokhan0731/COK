/* src/page/mypage/_component/TextInput.tsx */

import type { InputHTMLAttributes, Ref } from 'react';
import { cn } from '../../../util/cn';

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  ref?: Ref<HTMLInputElement>;
};

const TextInput = ({ ref, className, ...props }: TextInputProps) => (
  <input
    ref={ref}
    className={cn(
      'px-4 py-2',
      'bg-background border border-border rounded-md outline-none',
      'transition duration-200 focus:border-primary-blue disabled:opacity-50 disabled:pointer-events-none',
      className,
    )}
    {...props}
  />
);

export default TextInput;
