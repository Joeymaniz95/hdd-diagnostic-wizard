type ProgressBarProps = {
  currentStep: number;
  totalSteps: number;
};

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const safeTotal = Math.max(totalSteps, 1);
  const safeCurrent = Math.min(Math.max(currentStep, 1), safeTotal);
  const progress = Math.round((safeCurrent / safeTotal) * 100);

  return (
    <section className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] px-6 py-5 shadow-[0_4px_24px_rgba(0,0,0,0.4)] sm:px-8 sm:py-6" aria-label="Wizard progress">
      <div className="mb-3 grid grid-cols-1 items-end gap-2 sm:grid-cols-[1fr_auto_auto] sm:gap-4">
        <h1 className="text-left text-[24px] font-bold tracking-[-0.5px] text-white">HDD Recovery Tool</h1>

        <p className="text-left text-[12px] font-semibold uppercase tracking-[2px] text-[#9aa0ac] sm:text-right">
          Step {safeCurrent} of {safeTotal}
        </p>

        <p className="text-left text-[14px] font-medium text-[#7b8cde] sm:text-right" aria-live="polite">
          {progress}%
        </p>
      </div>

      <div
        className="relative h-[6px] w-full overflow-visible rounded-full bg-[rgba(255,255,255,0.08)]"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      >
        <div className="progress-fill relative h-full overflow-hidden rounded-full" style={{ width: `${progress}%` }} aria-hidden="true">
          <span className="progress-sheen absolute inset-y-0 left-[-40%] w-[45%]" aria-hidden="true" />
        </div>
        <span className="progress-thumb absolute top-1/2 z-10" style={{ left: `${progress}%` }} aria-hidden="true" />
      </div>
    </section>
  );
}
