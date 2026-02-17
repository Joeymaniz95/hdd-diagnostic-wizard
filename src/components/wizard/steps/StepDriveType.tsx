import StepLayout, { type StepNavigationProps } from "@/src/components/wizard/StepLayout";
import type { DriveType } from "@/src/types/wizard";

type StepDriveTypeProps = StepNavigationProps & {
  value: DriveType | null;
  onChange: (value: DriveType) => void;
};

const options: Array<{ value: DriveType; label: string }> = [
  { value: "3.5_desktop", label: "3.5-inch desktop drive" },
  { value: "2.5_laptop", label: "2.5-inch laptop drive" },
  { value: "portable_usb", label: "Portable USB drive" },
];

export default function StepDriveType({
  value,
  onChange,
  onBack,
  onNext,
  canGoBack,
  canGoNext,
}: StepDriveTypeProps) {
  return (
    <StepLayout
      stepLabel="Step 3"
      title="What kind of drive do you have?"
      onBack={onBack}
      onNext={onNext}
      canGoBack={canGoBack}
      canGoNext={canGoNext}
    >
      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`w-full rounded-xl border px-4 py-4 text-left text-lg font-medium transition ${
              value === option.value
                ? "border-[#6366f1] bg-[rgba(99,102,241,0.10)] text-[#c7d2fe]"
                : "border-[rgba(255,255,255,0.08)] bg-[#1a1d27] text-[#e8eaed] hover:border-[#6366f1] hover:bg-[#22263a]"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-4">
        <p className="font-semibold text-white">Why we ask this</p>
        <p className="mt-1 text-[#9aa0ac]">
          Different drive sizes need different power and connection tools. Picking the right type
          helps prevent connection mistakes.
        </p>
      </div>

      <div className="mt-4 rounded-xl border border-[rgba(251,191,36,0.35)] bg-[rgba(251,191,36,0.12)] p-4">
        <p className="font-semibold text-[#fcd34d]">Do NOT do this</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-[#fef3c7]">
          <li>Do not guess and force cables into the wrong connector.</li>
          <li>Do not initialize or format the disk if your computer asks.</li>
        </ul>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-dashed border-[rgba(255,255,255,0.2)] bg-[#22263a] p-6 text-center text-[#9aa0ac]">
          Placeholder image: 3.5 inch drive
        </div>
        <div className="rounded-xl border border-dashed border-[rgba(255,255,255,0.2)] bg-[#22263a] p-6 text-center text-[#9aa0ac]">
          Placeholder image: 2.5 inch drive
        </div>
      </div>
    </StepLayout>
  );
}
