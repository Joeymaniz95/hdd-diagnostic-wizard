import StepLayout, { type StepNavigationProps } from "@/src/components/wizard/StepLayout";
import Image from "next/image";
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
      subtitle="Power on once, listen carefully, then choose the closest sound pattern."
      onBack={onBack}
      onNext={onNext}
      canGoBack={canGoBack}
      canGoNext={canGoNext}
    >
      <div className="mx-auto mt-1 w-full rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-3 shadow-sm">
        <Image
          src="/illustrations/drive-listening.png"
          alt="Person listening to a hard drive"
          className="h-auto w-full rounded-2xl"
          width={1600}
          height={900}
          quality={85}
        />
        <p className="mt-2 text-center text-sm text-slate-500">Listen carefully to the drive</p>
      </div>

      <div className="space-y-3 lg:space-y-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`w-full rounded-xl border px-4 py-4 text-left text-lg font-medium transition ${
              value === option.value
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-300 bg-white text-slate-900 hover:border-slate-500"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 lg:mt-3">
        <p className="font-semibold text-slate-900">What each option usually means</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
          <li>Not spinning: likely power or board issue.</li>
          <li>Spins, then spins down: drive may be struggling internally.</li>
          <li>Clicking: the read heads may be failing.</li>
          <li>Spins and stays spinning: often safer to continue with software checks.</li>
        </ul>
      </div>

      <details className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 lg:mt-3">
        <summary className="cursor-pointer font-semibold text-slate-900">Why we ask this</summary>
        <p className="mt-2 text-slate-700">
          Sound behavior is one of the fastest ways to separate high-risk hardware failure from safer
          software-based recovery paths.
        </p>
      </details>

      <details className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 lg:mt-3">
        <summary className="cursor-pointer font-semibold text-amber-900">Do NOT do this</summary>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-amber-900">
          <li>Do not keep power-cycling to re-test sounds many times.</li>
          <li>Do not open the sealed drive chamber.</li>
        </ul>
      </details>
    </StepLayout>
  );
}
