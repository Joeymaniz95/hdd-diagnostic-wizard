type ProgressBarProps = {
  currentStep: number;
  totalSteps: number;
  onReset?: () => void;
  stepLabels?: string[];
  onStepClick?: (index: number) => void;
  isHardStop?: boolean;
  canGoNext?: boolean;
};

export default function ProgressBar({
  currentStep,
  totalSteps,
  onReset,
  stepLabels,
  onStepClick,
  isHardStop = false,
  canGoNext = false,
}: ProgressBarProps) {
  const safeTotal = Math.max(totalSteps, 1);
  const safeCurrent = Math.min(Math.max(currentStep, 1), safeTotal);
  const progress = Math.round((safeCurrent / safeTotal) * 100);
  const currentIdx = safeCurrent - 1; // 0-based index

  const showDots = stepLabels && stepLabels.length > 0;

  return (
    <section
      className="group rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] px-6 py-5 shadow-[0_4px_24px_rgba(0,0,0,0.4)] sm:px-8 sm:py-6"
      aria-label="Wizard progress"
    >
      <div className="mb-3 grid grid-cols-1 items-end gap-2 sm:grid-cols-[1fr_auto_auto] sm:gap-4">
        <button
          type="button"
          onClick={onReset}
          aria-label="Restart tool from beginning"
          className="w-fit cursor-pointer rounded text-left text-[24px] font-bold text-white transition-all duration-200 hover:text-[#a5b4fc] hover:drop-shadow-[0_0_10px_rgba(99,102,241,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b8cde]"
          style={{ textTransform: "none", letterSpacing: "-0.5px", fontWeight: 700 }}
        >
          HDD Recovery Tool
        </button>

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

      {showDots && (
        <div
          className="pointer-events-none mt-3 flex items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100"
          aria-label="Step navigation"
        >
          {stepLabels.map((label, i) => {
            const isPast = i < currentIdx;
            const isCurrent = i === currentIdx;
            const isFuture = i > currentIdx;
            const isClickableFuture = isFuture && !isHardStop;
            const isBlockedFuture = isFuture && isHardStop;
            const isClickable = (isPast || isClickableFuture) && !isCurrent;

            let tooltipText: string;
            if (isCurrent) {
              tooltipText = `Step ${i + 1} — ${label} (current)`;
            } else if (isBlockedFuture) {
              tooltipText = "Professional recovery required — cannot continue.";
            } else {
              tooltipText = `Go to Step ${i + 1} — ${label}`;
            }

            return (
              <button
                key={i}
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick?.(i)}
                title={tooltipText}
                aria-label={tooltipText}
                className={[
                  "h-2 flex-1 rounded-full transition-all duration-200",
                  isCurrent
                    ? "cursor-default bg-[#7b8cde] shadow-[0_0_6px_rgba(123,140,222,0.55)]"
                    : isPast
                    ? "cursor-pointer bg-[rgba(99,102,241,0.5)] hover:bg-[rgba(99,102,241,0.85)] hover:shadow-[0_0_6px_rgba(99,102,241,0.45)]"
                    : isClickableFuture
                    ? "cursor-pointer bg-[rgba(99,102,241,0.18)] hover:bg-[rgba(99,102,241,0.42)] hover:shadow-[0_0_4px_rgba(99,102,241,0.3)]"
                    : "cursor-not-allowed bg-[rgba(255,255,255,0.07)]",
                ].join(" ")}
                style={{ textTransform: "none" }}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
