import type { ReactNode } from "react";

export type StepNavigationProps = {
  onBack: () => void;
  onNext: () => void;
  canGoBack: boolean;
  canGoNext: boolean;
};

type StepLayoutProps = StepNavigationProps & {
  stepLabel: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  showNext?: boolean;
  nextLabel?: string;
};

export default function StepLayout({
  stepLabel,
  title,
  subtitle,
  children,
  onBack,
  onNext,
  canGoBack,
  canGoNext,
  showNext = true,
  nextLabel = "Next",
}: StepLayoutProps) {
  return (
    <section className="w-full lg:flex lg:max-h-[calc(100vh-190px)] lg:flex-col lg:overflow-hidden">
      <header className="bg-transparent px-1 pt-2">
        <div className="w-fit max-w-full rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] px-7 py-5 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[2px] text-[#7b8cde]">{stepLabel}</p>
          <h2 className="m-0 text-[28px] font-semibold leading-[1.25] tracking-[-0.5px] text-white">{title}</h2>
        </div>
        {subtitle ? <p className="mt-4 text-base font-normal text-[#9aa0ac]">{subtitle}</p> : null}
      </header>

      <div className="mt-6 px-1 pb-4 lg:mt-6 lg:flex-1 lg:overflow-y-auto lg:pb-2">{children}</div>

      <div className="sticky bottom-0 z-10 mt-2 flex shrink-0 items-center justify-between gap-3 border-t border-[rgba(255,255,255,0.08)] bg-gradient-to-t from-[#0f1117] via-[#0f1117]/95 to-transparent px-1 pb-1 pt-4">
        <div>
          <button
            type="button"
            onClick={onBack}
            disabled={!canGoBack}
            className="inline-flex items-center rounded-xl border border-[rgba(255,255,255,0.15)] bg-transparent px-5 py-2.5 text-sm font-medium text-[#9aa0ac] transition-all duration-200 hover:-translate-y-px hover:border-[#6366f1] hover:text-white hover:shadow-[0_4px_12px_rgba(99,102,241,0.25)] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7b8cde] focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:hover:translate-y-0"
          >
            Back
          </button>
        </div>

        <div>
          {showNext ? (
            <button
              type="button"
              onClick={onNext}
              disabled={!canGoNext}
              className="inline-flex items-center rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] px-6 py-2.5 text-sm font-medium text-white shadow-[0_4px_15px_rgba(99,102,241,0.4)] transition-all duration-200 hover:-translate-y-px hover:brightness-110 hover:shadow-[0_6px_20px_rgba(99,102,241,0.5)] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7b8cde] focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:bg-[#2b3147] disabled:text-[#9aa0ac] disabled:shadow-none"
            >
              {nextLabel}
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
