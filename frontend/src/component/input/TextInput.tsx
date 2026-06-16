/* src/page/mypage/_component/TextInput.tsx */

import { type ComponentProps } from 'react';
import { cn } from '../../util/cn';

const TextInput = ({ className, ...props }: ComponentProps<'input'>) => (
  <input
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
