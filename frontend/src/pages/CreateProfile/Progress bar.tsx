interface ProgressBarProps {
  step: number;
}

export default function ProgressBar({ step }: ProgressBarProps) {

  const progress = (step / 3) * 100;

  return (
    <div className="flex items-center gap-3 w-90">
        
        <div className="flex-1 h-2 bg-border-strong/30 rounded-full overflow-hidden">
            <div
                className="h-full bg-blue-500 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
            />
        </div>

        <div className="text-lg font-semibold flex items-center">
            <span className="text-blue-500">{step}</span>
            <span className="text-gray-300 mx-0.5">/</span>
            <span className="text-border-strong/60">3</span>
        </div>
    </div>
  );
}