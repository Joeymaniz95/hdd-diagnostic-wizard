import { useState } from "react";
import StepLayout, { type StepNavigationProps } from "@/src/components/wizard/StepLayout";

type StepFinishProps = StepNavigationProps & {
  onGetQuote: () => void;
};

export default function StepFinish({
  onBack,
  onNext,
  canGoBack,
  canGoNext,
  onGetQuote,
}: StepFinishProps) {
  const [outcome, setOutcome] = useState<"success" | "need_help" | null>(null);

  return (
    <StepLayout
      stepLabel="Step 15"
      title="Recovery complete"
      onBack={onBack}
      onNext={onNext}
      canGoBack={canGoBack}
      canGoNext={canGoNext}
      showNext={false}
    >
      {outcome === null ? (
        <div className="space-y-4">
          <p className="text-[15px] text-[#9aa0ac]">How did the recovery go?</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setOutcome("success")}
              className="flex flex-col items-start rounded-2xl border border-[rgba(74,222,128,0.35)] bg-[rgba(74,222,128,0.08)] p-6 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[#4ade80] hover:bg-[rgba(74,222,128,0.14)] hover:shadow-[0_8px_24px_rgba(74,222,128,0.15)] active:scale-[0.99]"
            >
              <span className="text-3xl" aria-hidden="true">
                ✅
              </span>
              <span className="mt-3 text-lg font-semibold text-[#4ade80]">
                My files are recovered
              </span>
              <span className="mt-1 text-sm text-[#86efac]">
                I can open my files on the third drive.
              </span>
            </button>

            <button
              type="button"
              onClick={() => setOutcome("need_help")}
              className="flex flex-col items-start rounded-2xl border border-[rgba(248,113,113,0.35)] bg-[rgba(248,113,113,0.08)] p-6 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[#f87171] hover:bg-[rgba(248,113,113,0.14)] hover:shadow-[0_8px_24px_rgba(248,113,113,0.15)] active:scale-[0.99]"
            >
              <span className="text-3xl" aria-hidden="true">
                🆘
              </span>
              <span className="mt-3 text-lg font-semibold text-[#f87171]">
                Recovery didn&apos;t work
              </span>
              <span className="mt-1 text-sm text-[#fca5a5]">I need more help.</span>
            </button>
          </div>
        </div>
      ) : null}

      {outcome === "success" ? (
        <div className="space-y-4">
          <div className="rounded-xl border border-[rgba(74,222,128,0.35)] bg-[rgba(74,222,128,0.1)] p-6 text-center">
            <p className="text-4xl" aria-hidden="true">
              🎉
            </p>
            <p className="mt-3 text-xl font-semibold text-[#4ade80]">Recovery successful</p>
            <p className="mt-2 text-sm text-[#86efac]">
              Your files are safe on your third drive. You followed this process carefully — that
              made all the difference.
            </p>
          </div>

          <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-4">
            <p className="text-sm font-semibold text-[#e8eaed]">Recommended next steps</p>
            <ul className="mt-2.5 space-y-2 text-sm text-[#9aa0ac]">
              <li className="flex items-start gap-2">
                <span className="shrink-0 text-[#4ade80]">✓</span>
                <span>Verify that all important files can be opened correctly.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0 text-[#4ade80]">✓</span>
                <span>
                  Back up your recovered files to a second location — cloud storage or another drive
                  — as soon as possible.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0 text-[#4ade80]">✓</span>
                <span>
                  Keep the cloned drive stored safely until you are certain everything has been
                  recovered.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0 text-[#4ade80]">✓</span>
                <span>
                  Set up regular automatic backups going forward so you are never in this situation
                  again.
                </span>
              </li>
            </ul>
          </div>

        </div>
      ) : null}

      {outcome === "need_help" ? (
        <div className="space-y-4">
          <div className="rounded-xl border border-[rgba(251,191,36,0.35)] bg-[rgba(251,191,36,0.1)] p-5">
            <p className="font-semibold text-[#fbbf24]">
              That is okay — some drives require professional help
            </p>
            <p className="mt-2 text-sm text-[#fcd34d]">
              If the R-Studio scan showed heavy corruption, missing partitions, or ddrescue could
              not read much of the drive, the drive likely has physical damage that DIY tools cannot
              address.
            </p>
          </div>

          <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-5">
            <p className="text-sm font-semibold text-[#e8eaed]">Signs that professional recovery is needed</p>
            <ul className="mt-2.5 space-y-2 text-sm text-[#9aa0ac]">
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 shrink-0 text-[#fbbf24]">▸</span>
                <span>ddrescue recovered very little — under 50% — after both passes.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 shrink-0 text-[#fbbf24]">▸</span>
                <span>R-Studio shows a blank, empty, or heavily corrupted file structure.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 shrink-0 text-[#fbbf24]">▸</span>
                <span>
                  The drive was clicking, beeping, grinding, or making unusual sounds at any point.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 shrink-0 text-[#fbbf24]">▸</span>
                <span>The drive is not recognized by the computer at all.</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-[rgba(99,102,241,0.25)] bg-[rgba(99,102,241,0.08)] p-5">
            <p className="text-sm font-semibold text-[#c7d2fe]">What professional recovery looks like</p>
            <p className="mt-2 text-sm text-[#9aa0ac]">
              Professional data recovery labs work in controlled clean-room environments using
              specialized equipment to work with drives at the hardware level — replacing read heads,
              reading platters directly, and rebuilding file structures. Look for a lab that offers a
              free evaluation and a no-data, no-charge policy so you only pay if they succeed.
            </p>
          </div>

          <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-4">
            <p className="text-sm font-semibold text-[#e8eaed]">Before sending a drive for professional recovery</p>
            <ul className="mt-2.5 space-y-2 text-sm text-[#9aa0ac]">
              <li className="flex items-start gap-2.5">
                <span className="shrink-0 text-[#7b8cde]">▸</span>
                <span>
                  Stop all further DIY attempts. Additional power cycles can worsen physical damage.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="shrink-0 text-[#7b8cde]">▸</span>
                <span>
                  Send the original patient drive — not the clone. The lab needs the original.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="shrink-0 text-[#7b8cde]">▸</span>
                <span>
                  Describe exactly what happened: any sounds, when it stopped working, and what
                  recovery steps you already tried.
                </span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={onGetQuote}
            className="w-full rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] px-6 py-4 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(99,102,241,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_8px_28px_rgba(99,102,241,0.55)] active:scale-[0.99]"
          >
            Get a Professional Recovery Quote →
          </button>
        </div>
      ) : null}

      {outcome !== null ? (
        <button
          type="button"
          onClick={() => setOutcome(null)}
          className="mt-2 text-xs text-[#9aa0ac] underline underline-offset-2 hover:text-white"
        >
          ← Back to choices
        </button>
      ) : null}
    </StepLayout>
  );
}
