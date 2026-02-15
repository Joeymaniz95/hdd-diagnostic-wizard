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
    <section className="w-full rounded-2xl border border-slate-200 bg-white shadow-sm lg:flex lg:max-h-[calc(100vh-140px)] lg:flex-col lg:overflow-hidden">
      <header className="px-5 pt-5 sm:px-6 sm:pt-6 lg:px-6 lg:pt-5">
        <p className="text-sm font-medium text-slate-500">{stepLabel}</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{title}</h2>
        {subtitle ? <p className="mt-3 text-slate-600">{subtitle}</p> : null}
      </header>

      <div className="mt-4 px-5 pb-3 sm:px-6 lg:mt-3 lg:flex-1 lg:overflow-y-auto lg:px-6 lg:pb-2">
        {children}
      </div>

      <div className="sticky bottom-0 mt-2 flex items-center justify-between gap-3 border-t border-slate-200 bg-gradient-to-t from-white via-white/95 to-transparent px-5 py-3 sm:px-6 lg:mt-0 lg:px-6">
        <div>
          {canGoBack ? (
            <button
              type="button"
              onClick={onBack}
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-medium text-slate-900 transition hover:border-slate-500"
            >
              Back
            </button>
          ) : null}
        </div>
        <div>
          {showNext ? (
            <button
              type="button"
              onClick={onNext}
              disabled={!canGoNext}
              className="rounded-xl bg-slate-900 px-6 py-3 text-base font-medium text-white transition enabled:hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {nextLabel}
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
