import type { WizardAnswers, WizardResult } from "@/src/types/wizard";
import StepLayout, { type StepNavigationProps } from "@/src/components/wizard/StepLayout";

type StepResultProps = StepNavigationProps & {
  answers: WizardAnswers;
  result: WizardResult;
  onContinueDiy: () => void;
  onGetQuote: () => void;
  showQuotePlaceholder: boolean;
};

export default function StepResult({
  answers,
  result,
  onContinueDiy,
  onGetQuote,
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
      onBack={onBack}
      onNext={onNext}
      canGoBack={canGoBack}
      canGoNext={canGoNext}
      nextLabel="Continue to Recovery Guide →"
    >
      <p className="text-[#e8eaed]">
        You are not expected to know all recovery terms. We will keep this practical and simple.
      </p>

      {isNotSpinning ? (
        <div className="mt-4 space-y-4">
          <div className="rounded-xl border border-[rgba(248,113,113,0.35)] bg-[rgba(248,113,113,0.12)] p-4 text-[#fca5a5]">
            The drive is not spinning. This often points to an electronics issue.
          </div>
          <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-4 text-[#e8eaed]">
            <p>PCB means the drive control board (the main electronics board).</p>
            <p className="mt-2">ROM is a tiny memory chip that stores unique drive information.</p>
            <p className="mt-2">
              If a donor board is used, the board number must match and a ROM transfer may be needed.
            </p>
          </div>
          <div className="rounded-xl border border-[rgba(248,113,113,0.35)] bg-[rgba(248,113,113,0.12)] p-4 font-medium text-[#fca5a5]">
            Strong warning: if the ROM chip is physically damaged, recovery can become impossible.
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={onContinueDiy}
              className="rounded-xl border border-[rgba(255,255,255,0.15)] bg-transparent px-4 py-3 font-medium text-[#e8eaed] hover:border-[#6366f1]"
            >
              Continue DIY
            </button>
            <button
              type="button"
              onClick={onGetQuote}
              className="rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] px-4 py-3 font-medium text-white shadow-[0_4px_15px_rgba(99,102,241,0.4)] hover:brightness-110"
            >
              Get a Quote
            </button>
          </div>
          {showQuotePlaceholder ? (
            <div className="rounded-xl border border-dashed border-[rgba(255,255,255,0.2)] bg-[#22263a] p-4 text-[#9aa0ac]">
              Quote form placeholder
            </div>
          ) : null}
        </div>
      ) : null}

      {isHeadRisk ? (
        <div className="mt-4 space-y-3">
          <div className="rounded-xl border border-[rgba(248,113,113,0.35)] bg-[rgba(248,113,113,0.12)] p-4 text-[#fca5a5]">
            The sound pattern suggests internal head failure.
          </div>
          <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-4 text-[#e8eaed]">
            Heads are tiny parts that read data from the platters. When they fail, extra DIY attempts
            can quickly reduce recoverable data.
          </div>
          <div className="rounded-xl border border-[rgba(251,191,36,0.35)] bg-[rgba(251,191,36,0.12)] p-4 text-[#fcd34d]">
            Do NOT keep trying scans or repeated power cycles. Request a professional quote first.
          </div>
        </div>
      ) : null}

      {isSmartPath && result.route === "IMAGE_FIRST" ? (
        <div className="mt-4 space-y-3">
          <div className="rounded-xl border border-[rgba(251,191,36,0.35)] bg-[rgba(251,191,36,0.12)] p-4 text-[#fcd34d]">
            Start with ddrescue first.
          </div>
          <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-4 text-[#e8eaed]">
            ddrescue copies as much data as possible to another disk, including unstable areas, while
            reducing repeated stress on the original drive.
          </div>
        </div>
      ) : null}

      {isSmartPath && result.route === "SCAN_OK" ? (
        <div className="mt-4 space-y-3">
          <div className="rounded-xl border border-[rgba(74,222,128,0.35)] bg-[rgba(74,222,128,0.12)] p-4 text-[#86efac]">
            You can move to software recovery with R-Studio.
          </div>
          <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-4 text-[#e8eaed]">
            R-Studio is a recovery app that helps find and copy lost files from a readable drive.
          </div>
        </div>
      ) : null}

      <div className="mt-5 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#7b8cde]">Why we chose this path</p>
        <ul className="mt-2 space-y-2 text-[#e8eaed]">
          {result.reasons.map((reason) => (
            <li key={reason} className="rounded-lg bg-[#22263a] p-3">
              {reason}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#7b8cde]">Next steps</p>
        <ul className="mt-2 space-y-2 text-[#e8eaed]">
          {result.nextSteps.map((step) => (
            <li key={step} className="rounded-lg bg-[#22263a] p-3">
              {step}
            </li>
          ))}
        </ul>
      </div>

    </StepLayout>
  );
}
