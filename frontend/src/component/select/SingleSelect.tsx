import * as SelectPrimitive from '@radix-ui/react-select';
import clsx from 'clsx';
import { LucideCheck, LucideChevronDown } from 'lucide-react';

type Option<T extends string = string> = {
  value: T;
  label: string;
  icon?: string;
};

type SingleSelectProps<T extends string = string> = {
  options: Option<T>[];
  value?: T;
  onValueChange?: (value: T) => void;
  defaultValue?: T;
  placeholder?: string;
  disabled?: boolean;
};

const SingleSelect = <T extends string = string>({
  options,
  value,
  onValueChange,
  defaultValue,
  placeholder,
  disabled,
}: SingleSelectProps<T>) => {
  return (
    <SelectPrimitive.Root
      value={value ?? ''}
      onValueChange={onValueChange as ((value: string) => void) | undefined}
      defaultValue={defaultValue}
      disabled={disabled}
    >
      <SelectPrimitive.Trigger
        className={clsx(
          'flex items-center justify-between w-full px-4 py-2',
          'bg-background border border-border rounded-md text-sm',
          'focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed data-placeholder:text-muted-foreground',
        )}
      >
        <SelectPrimitive.Value placeholder={placeholder ?? '선택해주세요'} />
        <SelectPrimitive.Icon>
          <LucideChevronDown size={16} className="opacity-50" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          className={clsx(
            'z-50 w-(--radix-select-trigger-width) mt-1 overflow-hidden',
            'bg-card-background border border-border rounded-md shadow-md',
          )}
        >
          <SelectPrimitive.Viewport className="max-h-72 overflow-y-auto!">
            {options.map((opt) => (
              <SelectPrimitive.Item
                key={opt.value}
                value={opt.value}
                className={clsx(
                  'flex justify-between items-center gap-2 px-4 py-2',
                  'text-sm',
                  'select-none cursor-pointer hover:bg-primary-blue/10 data-[state=checked]:**:text-primary-blue focus:outline-none',
                )}
              >
                <SelectPrimitive.ItemText>
                  <span className="flex items-center gap-2">
                    {opt.icon && <img src={opt.icon} alt="" className="size-5 shrink-0" />}
                    {opt.label}
                  </span>
                </SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator>
                  <LucideCheck size={14} />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};

export default SingleSelect;
