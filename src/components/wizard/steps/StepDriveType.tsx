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
      subtitle="Choose the size or type that looks closest to your drive."
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
          Different drive sizes need different power and connection tools. Picking the right type
          helps prevent connection mistakes.
        </p>
      </div>

      <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <p className="font-semibold text-amber-900">Do NOT do this</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-amber-900">
          <li>Do not guess and force cables into the wrong connector.</li>
          <li>Do not initialize or format the disk if your computer asks.</li>
        </ul>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-slate-600">
          Placeholder image: 3.5 inch drive
        </div>
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-slate-600">
          Placeholder image: 2.5 inch drive
        </div>
      </div>
    </StepLayout>
  );
}
