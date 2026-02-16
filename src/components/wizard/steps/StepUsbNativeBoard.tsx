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
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-slate-600">
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
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-300 bg-white text-slate-900 hover:border-slate-500"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="font-semibold text-slate-900">Why we ask this</p>
        <p className="mt-1 text-slate-700">
          A USB-native board means the USB port is part of the drive board itself. This can limit DIY
          connection choices.
        </p>
      </div>

      {value === "yes" ? (
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
          USB-native boards can be harder for home recovery because there is no standard SATA port.
        </div>
      ) : null}

      <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <p className="font-semibold text-amber-900">Do NOT do this</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-amber-900">
          <li>Do not try board-level soldering unless you have electronics experience.</li>
          <li>Do not keep retrying unstable connections over and over.</li>
        </ul>
      </div>
    </StepLayout>
  );
}
