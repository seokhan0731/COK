import * as PopoverPrimitive from '@radix-ui/react-popover';
import clsx from 'clsx';
import { LucideCheck, LucideChevronDown, LucideX } from 'lucide-react';

type Option<T extends string | number = string> = {
  value: T;
  label: string;
  description?: string;
};

type SelectMultiProps<T extends string | number = string> = {
  options: Option<T>[];
  value: T[];
  onValueChange: (values: T[]) => void;
  max?: number;
  placeholder?: string;
};

const SelectMulti = <T extends string | number = string>({
  options,
  value,
  onValueChange,
  max,
  placeholder,
}: SelectMultiProps<T>) => {
  const isMaxReached = max !== undefined && value.length >= max;
  const selectedOptions = options.filter((opt) => value.includes(opt.value));

  const toggle = (v: T) => {
    if (value.includes(v)) {
      onValueChange(value.filter((x) => x !== v));
    } else if (!isMaxReached) {
      onValueChange([...value, v]);
    }
  };

  const remove = (v: T) => {
    onValueChange(value.filter((x) => x !== v));
  };

  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>
        <div
          role="button"
          tabIndex={0}
          className={clsx(
            'flex flex-wrap items-center gap-2 w-full min-h-10 px-4 py-2',
            'bg-background border border-border rounded-md text-sm cursor-pointer',
            'focus:outline-none',
          )}
        >
          {selectedOptions.length === 0 ? (
            <span className="text-muted-foreground">{placeholder ?? '선택해주세요'}</span>
          ) : (
            selectedOptions.map((opt) => (
              <span
                key={opt.value}
                className={clsx(
                  'flex items-center gap-1 px-2 py-0.5',
                  'bg-primary-blue/10 text-primary-blue text-xs rounded',
                )}
              >
                {opt.label}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(opt.value);
                  }}
                  className="cursor-pointer hover:opacity-70"
                >
                  <LucideX size={12} />
                </button>
              </span>
            ))
          )}
          {max !== undefined && (
            <span className="ml-auto text-xs text-muted-foreground">
              {value.length}/{max}
            </span>
          )}
          <LucideChevronDown size={16} className="opacity-50" />
        </div>
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={4}
          className={clsx(
            'z-50 w-(--radix-popover-trigger-width) max-h-72 overflow-y-auto',
            'bg-card-background border border-border rounded-md shadow-md',
          )}
        >
          {options.map((opt) => {
            const checked = value.includes(opt.value);
            const disabled = !checked && isMaxReached;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => toggle(opt.value)}
                disabled={disabled}
                className={clsx(
                  'flex items-center justify-between gap-2 w-full px-4 py-2',
                  'text-sm text-left',
                  'hover:bg-primary-blue/10 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent cursor-pointer focus:outline-none',
                  checked && 'text-primary-blue',
                )}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={clsx(
                      'flex items-center justify-center w-4 h-4 border border-border rounded',
                      checked && 'bg-primary-blue border-primary-blue',
                    )}
                  >
                    {checked && <LucideCheck size={12} className="text-white" />}
                  </span>
                  {opt.label}
                </span>
                {opt.description && (
                  <span className="text-xs text-muted-foreground">{opt.description}</span>
                )}
              </button>
            );
          })}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
};

export default SelectMulti;
