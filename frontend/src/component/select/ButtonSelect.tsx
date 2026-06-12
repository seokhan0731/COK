import clsx from 'clsx';

type Option<T extends string = string> = {
  value: T;
  label: string;
  icon?: string;
};

type ButtonSelectProps<T extends string = string> = {
  options: Option<T>[];
  value?: T;
  onValueChange?: (value: T) => void;
  disabled?: boolean;
  className?: string;
};

const ButtonSelect = <T extends string = string>({
  options,
  value,
  onValueChange,
  disabled,
  className,
}: ButtonSelectProps<T>) => {
  return (
    <div className={clsx('flex gap-2', className)}>
      {options.map((opt) => {
        const isSelected = value === opt.value;

        return (
          <button
            key={opt.value}
            type="button"
            disabled={disabled}
            onClick={() => onValueChange?.(opt.value)}
            className={clsx(
              'flex-1 flex items-center justify-center gap-2 px-4 py-2',
              'border border-border rounded-xl transition-colors duration-200',
              'disabled:opacity-50 disabled:pointer-events-none',
              isSelected && 'bg-primary-blue/10 border-primary-blue text-primary-blue',
            )}
          >
            {opt.icon && <img src={opt.icon} alt="" className="size-5 shrink-0" />}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};

export default ButtonSelect;
