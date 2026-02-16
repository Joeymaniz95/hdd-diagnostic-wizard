type ProgressBarProps = {
  currentStep: number;
  totalSteps: number;
};

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const safeTotal = Math.max(totalSteps, 1);
  const safeCurrent = Math.min(Math.max(currentStep, 1), safeTotal);
  const progress = Math.round((safeCurrent / safeTotal) * 100);

  return (
    <section className="rounded-2xl bg-white px-6 py-5 sm:px-8 sm:py-6" aria-label="Wizard progress">
      <div className="mb-3 grid grid-cols-1 items-end gap-2 sm:grid-cols-[1fr_auto_auto] sm:gap-4">
        <h1 className="text-left text-[24px] font-medium tracking-[-0.01em] text-[#202124]">
          HDD Recovery Tool
        </h1>

        <p className="text-left text-[12px] font-medium uppercase tracking-[0.8px] text-[#5f6368] sm:text-right">
          Step {safeCurrent} of {safeTotal}
        </p>

        <p className="text-left text-[14px] font-medium text-[#1a73e8] sm:text-right" aria-live="polite">
          {progress}%
        </p>
      </div>

      <div
        className="relative h-[6px] w-full overflow-hidden rounded-full bg-[#e8eaed]"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      >
        <div
          className="progress-fill relative h-full overflow-hidden rounded-full"
          style={{ width: `${progress}%` }}
          aria-hidden="true"
        >
          <span className="progress-sheen absolute inset-y-0 left-[-40%] w-[45%]" aria-hidden="true" />
          <span className="progress-thumb absolute right-0 top-1/2" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
