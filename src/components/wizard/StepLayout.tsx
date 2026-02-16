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
        <div className="w-fit max-w-full rounded-2xl bg-white px-7 py-5 shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)]">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[1px] text-[#1a73e8]">{stepLabel}</p>
          <h2 className="m-0 text-[28px] font-normal leading-[1.25] text-[#202124]">{title}</h2>
        </div>
        {subtitle ? <p className="mt-4 text-base font-normal text-[#5f6368]">{subtitle}</p> : null}
      </header>

      <div className="mt-6 px-1 pb-4 lg:mt-6 lg:flex-1 lg:overflow-y-auto lg:pb-2">{children}</div>

      <div className="sticky bottom-0 z-10 mt-2 flex shrink-0 items-center justify-between gap-3 border-t border-[#dadce0] bg-gradient-to-t from-[#f8f9fa] via-[#f8f9fa]/95 to-transparent px-1 pb-1 pt-4">
        <div>
          <button
            type="button"
            onClick={onBack}
            disabled={!canGoBack}
            className="inline-flex items-center rounded-xl border border-[#dadce0] bg-white px-5 py-2.5 text-sm font-medium text-[#3c4043] shadow-[0_1px_2px_rgba(0,0,0,0.08)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_4px_10px_rgba(0,0,0,0.10)] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1a73e8] focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:hover:translate-y-0"
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
              className="inline-flex items-center rounded-xl bg-[#1a73e8] px-6 py-2.5 text-sm font-medium text-white shadow-[0_1px_2px_rgba(26,115,232,0.25)] transition-all duration-200 hover:-translate-y-px hover:bg-[#1557b0] hover:shadow-[0_6px_14px_rgba(26,115,232,0.3)] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1a73e8] focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:bg-[#dadce0] disabled:text-[#5f6368] disabled:shadow-none"
            >
              {nextLabel}
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
