/* src/component/modal/create_profile/_component/ProgressBar.tsx */

type ProgressBarType = {
  step: number;
  totalSteps?: number;
};

const ProgressBar = ({ step, totalSteps = 3 }: ProgressBarType) => (
  <div className="absolute inset-x-0 top-0 flex h-1">
    {Array.from({ length: totalSteps }).map((_, i) => (
      <div
        key={i}
        className={`flex-1 transition-colors duration-300 ${i < step ? 'bg-primary-blue' : 'bg-border'}`}
      />
    ))}
  </div>
);

export default ProgressBar;
