import StepLayout, { type StepNavigationProps } from "@/src/components/wizard/StepLayout";
import ListenTestIcon from "@/src/components/wizard/illustrations/ListenTestIcon";
import type { ListenTestResult } from "@/src/types/wizard";

type StepListenTestProps = StepNavigationProps & {
  value: ListenTestResult | null;
  onChange: (value: ListenTestResult) => void;
};

const options: Array<{ value: ListenTestResult; label: string }> = [
  { value: "not_spinning", label: "Not spinning" },
  { value: "spins_and_stays_spinning", label: "Spins and stays spinning" },
  { value: "spins_then_spins_down", label: "Spins, then spins down" },
  { value: "clicking", label: "Clicking" },
];

export default function StepListenTest({
  value,
  onChange,
  onBack,
  onNext,
  canGoBack,
  canGoNext,
}: StepListenTestProps) {
  return (
    <StepLayout
      stepLabel="Step 5"
      title="Listen test"
      subtitle="Power on the drive, put your ear close to it, listen carefully, then choose the closest sound pattern."
      onBack={onBack}
      onNext={onNext}
      canGoBack={canGoBack}
      canGoNext={canGoNext}
    >
      <section className="group relative overflow-hidden rounded-[20px] border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] px-6 py-8 shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.45)] lg:px-8 lg:py-9">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(123,140,222,0.14),transparent_56%)]" />

        <div className="relative mx-auto flex w-fit items-center justify-center rounded-full bg-[#22263a] p-5 shadow-[0_10px_24px_rgba(0,0,0,0.35)] ring-1 ring-[rgba(255,255,255,0.08)] transition-shadow duration-300 group-hover:shadow-[0_14px_30px_rgba(0,0,0,0.45)]">
          <ListenTestIcon />
        </div>

        <p className="relative mt-6 text-center text-base font-semibold tracking-[0.01em] text-[#e8eaed] lg:text-[17px]">
          Listen carefully to the drive
        </p>
      </section>

      <div className="mx-1 mt-7 space-y-3 overflow-visible lg:mt-8 lg:space-y-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`w-full rounded-xl border px-6 py-5 text-left text-lg font-medium transition-all duration-200 ease-out hover:scale-[1.01] ${
              value === option.value
                ? "border-2 border-[#6366f1] bg-[rgba(99,102,241,0.10)] text-[#c7d2fe] shadow-[0_0_12px_rgba(99,102,241,0.2)]"
                : "border border-[rgba(255,255,255,0.08)] bg-[#1a1d27] text-[#e8eaed] hover:-translate-y-0.5 hover:border-[#6366f1] hover:bg-[#22263a] hover:shadow-[0_0_12px_rgba(99,102,241,0.2)]"
            }`}
          >
            <span className="flex items-center justify-between gap-3">
              <span>{option.label}</span>
              <span
                className={`inline-flex h-6 w-6 items-center justify-center rounded-full border text-sm ${
                  value === option.value
                    ? "border-[#6366f1] bg-[rgba(99,102,241,0.2)] text-[#6366f1]"
                    : "border-[rgba(255,255,255,0.2)] bg-[#22263a] text-transparent"
                }`}
                aria-hidden="true"
              >
                ✓
              </span>
            </span>
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-4 lg:mt-3">
        <p className="font-semibold text-white">What each option usually means</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-[#e8eaed]">
          <li>Not spinning: likely power or board issue.</li>
          <li>
            Spins, then spins down: the heads have most likely failed and will not initialize, so
            the drive powers down.
          </li>
          <li>Clicking: one or more of the read/write heads have failed.</li>
          <li>
            Spins and stays spinning: this is a good sign that the drive may not have mechanical
            failures.
          </li>
        </ul>
      </div>

      <details className="mt-4 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-4 lg:mt-3">
        <summary className="cursor-pointer font-semibold text-[#7b8cde]">Why we ask this</summary>
        <p className="mt-2 text-[#9aa0ac]">
          Sound behavior is one of the fastest ways to separate high-risk hardware failure from safer
          software-based recovery paths.
        </p>
      </details>

      <details className="mt-4 rounded-xl border border-[rgba(248,113,113,0.35)] bg-[rgba(248,113,113,0.12)] p-4 lg:mt-3">
        <summary className="cursor-pointer font-semibold text-[#f87171]">Do NOT do this</summary>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-[#fecaca]">
          <li>Do not keep power-cycling to re-test sounds many times.</li>
          <li>Do not open the sealed drive chamber.</li>
        </ul>
      </details>
    </StepLayout>
  );
}
