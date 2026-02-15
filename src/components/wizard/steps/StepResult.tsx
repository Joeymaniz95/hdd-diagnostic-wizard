import type { WizardAnswers, WizardResult } from "@/src/types/wizard";
import StepLayout, { type StepNavigationProps } from "@/src/components/wizard/StepLayout";

type StepResultProps = StepNavigationProps & {
  answers: WizardAnswers;
  result: WizardResult;
  onContinueDiy: () => void;
  onGetQuote: () => void;
  onRestart: () => void;
  showQuotePlaceholder: boolean;
};

export default function StepResult({
  answers,
  result,
  onContinueDiy,
  onGetQuote,
  onRestart,
  showQuotePlaceholder,
  onBack,
  onNext,
  canGoBack,
  canGoNext,
}: StepResultProps) {
  const listenTest = answers.listenTest;
  const isNotSpinning = listenTest === "not_spinning";
  const isHeadRisk = listenTest === "spins_then_spins_down" || listenTest === "clicking";
  const isSmartPath = listenTest === "spins_and_stays_spinning";

  return (
    <StepLayout
      stepLabel="Result"
      title="Your recommended next step"
      subtitle={`Path: ${result.route} | Risk level: ${result.risk}`}
      onBack={onBack}
      onNext={onNext}
      canGoBack={canGoBack}
      canGoNext={canGoNext}
      showNext={false}
    >
      <p className="text-slate-700">
        You are not expected to know all recovery terms. We will keep this practical and simple.
      </p>

      {isNotSpinning ? (
        <div className="mt-4 space-y-4">
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-900">
            The drive is not spinning. This often points to an electronics issue.
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
            <p>
              PCB means the drive control board (the main electronics board).
            </p>
            <p className="mt-2">
              ROM is a tiny memory chip that stores unique drive information.
            </p>
            <p className="mt-2">
              If a donor board is used, the board number must match and a ROM transfer may be needed.
            </p>
          </div>
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 font-medium text-rose-900">
            Strong warning: if the ROM chip is physically damaged, recovery can become impossible.
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={onContinueDiy}
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 font-medium text-slate-900 hover:border-slate-500"
            >
              Continue DIY
            </button>
            <button
              type="button"
              onClick={onGetQuote}
              className="rounded-xl bg-slate-900 px-4 py-3 font-medium text-white hover:bg-slate-800"
            >
              Get a Quote
            </button>
          </div>
          {showQuotePlaceholder ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-slate-700">
              Quote form placeholder
            </div>
          ) : null}
        </div>
      ) : null}

      {isHeadRisk ? (
        <div className="mt-4 space-y-3">
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-900">
            The sound pattern suggests internal head failure.
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
            Heads are tiny parts that read data from the platters. When they fail, extra DIY attempts
            can quickly reduce recoverable data.
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
            Do NOT keep trying scans or repeated power cycles. Request a professional quote first.
          </div>
        </div>
      ) : null}

      {isSmartPath && result.route === "IMAGE_FIRST" ? (
        <div className="mt-4 space-y-3">
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
            Start with ddrescue first.
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
            ddrescue copies as much data as possible to another disk, including unstable areas, while
            reducing repeated stress on the original drive.
          </div>
        </div>
      ) : null}

      {isSmartPath && result.route === "SCAN_OK" ? (
        <div className="mt-4 space-y-3">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
            You can move to software recovery with R-Studio.
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
            R-Studio is a recovery app that helps find and copy lost files from a readable drive.
          </div>
        </div>
      ) : null}

      <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Why we chose this path</p>
        <ul className="mt-2 space-y-2 text-slate-700">
          {result.reasons.map((reason) => (
            <li key={reason} className="rounded-lg bg-white p-3">
              {reason}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Next steps</p>
        <ul className="mt-2 space-y-2 text-slate-700">
          {result.nextSteps.map((step) => (
            <li key={step} className="rounded-lg bg-white p-3">
              {step}
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="mt-6 w-full rounded-xl bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-slate-800"
      >
        Restart
      </button>
    </StepLayout>
  );
}
