import StepLayout, { type StepNavigationProps } from "@/src/components/wizard/StepLayout";
import type { UsbNativeBoardAnswer } from "@/src/types/wizard";

type StepUsbNativeBoardProps = StepNavigationProps & {
  value: UsbNativeBoardAnswer | null;
  onChange: (value: UsbNativeBoardAnswer) => void;
};

const options: Array<{ value: UsbNativeBoardAnswer; label: string }> = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "not_sure", label: "Not sure" },
];

export default function StepUsbNativeBoard({
  value,
  onChange,
  onBack,
  onNext,
  canGoBack,
  canGoNext,
}: StepUsbNativeBoardProps) {
  return (
    <StepLayout
      stepLabel="Step 4"
      title="Does the drive board have USB built in?"
      onBack={onBack}
      onNext={onNext}
      canGoBack={canGoBack}
      canGoNext={canGoNext}
    >
      <div className="rounded-xl border border-dashed border-[rgba(255,255,255,0.2)] bg-[#22263a] p-6 text-center text-[#9aa0ac]">
        Placeholder image: spyglass board
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`rounded-xl border px-4 py-4 text-left text-lg font-medium transition ${
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
          A USB-native board means the USB port is part of the drive board itself. This can limit DIY
          connection choices.
        </p>
      </div>

      {value === "yes" ? (
        <div className="mt-4 rounded-xl border border-[rgba(251,191,36,0.35)] bg-[rgba(251,191,36,0.12)] p-4 text-[#fcd34d]">
          USB-native boards can be harder for home recovery because there is no standard SATA port.
        </div>
      ) : null}

      <div className="mt-4 rounded-xl border border-[rgba(251,191,36,0.35)] bg-[rgba(251,191,36,0.12)] p-4">
        <p className="font-semibold text-[#fcd34d]">Do NOT do this</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-[#fef3c7]">
          <li>Do not try board-level soldering unless you have electronics experience.</li>
          <li>Do not keep retrying unstable connections over and over.</li>
        </ul>
      </div>
    </StepLayout>
  );
}
