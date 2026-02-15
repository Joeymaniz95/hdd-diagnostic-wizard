import Image from "next/image";
import StepLayout, { type StepNavigationProps } from "@/src/components/wizard/StepLayout";

export default function StepHowDriveWorks({
  onBack,
  onNext,
  canGoBack,
  canGoNext,
}: StepNavigationProps) {
  return (
    <StepLayout
      stepLabel="Step 1"
      title="How a hard drive works"
      subtitle="Quick basics so the next questions feel clear and simple."
      onBack={onBack}
      onNext={onNext}
      canGoBack={canGoBack}
      canGoNext={canGoNext}
    >
      <div className="grid gap-4 lg:gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4 shadow-sm">
          <Image
            src="/illustrations/platters.svg"
            alt="Top view of hard drive platters"
            width={640}
            height={420}
            className="h-auto w-full object-contain lg:max-h-[190px]"
            priority
          />
          <p className="mt-3 text-center text-sm font-medium text-slate-600">Platters (spinning)</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4 shadow-sm">
          <Image
            src="/illustrations/heads-hover.svg"
            alt="Side view of read heads hovering over platters"
            width={640}
            height={420}
            className="headHoverSlow h-auto w-full object-contain lg:max-h-[190px]"
            priority
          />
          <p className="mt-3 text-center text-sm font-medium text-slate-600">Heads (hovering)</p>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-slate-700 lg:mt-3">
        <p>
          A hard drive stores data on spinning disks called platters.
        </p>
        <p>
          Tiny readers called heads float just above those disks while reading data.
        </p>
        <p>
          When a drive is failing, extra power cycles or heavy scanning can make things worse.
        </p>
      </div>

      <details className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 lg:mt-3">
        <summary className="cursor-pointer font-semibold text-slate-900">Why we ask this</summary>
        <p className="mt-2 text-slate-700">
          These basics help explain why we move slowly and choose the safest next step first.
        </p>
      </details>

      <details className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 lg:mt-3">
        <summary className="cursor-pointer font-semibold text-amber-900">Do NOT do this</summary>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-amber-900">
          <li>Do not keep unplugging and replugging the drive repeatedly.</li>
          <li>Do not run random repair tools before this wizard is complete.</li>
        </ul>
      </details>
    </StepLayout>
  );
}
