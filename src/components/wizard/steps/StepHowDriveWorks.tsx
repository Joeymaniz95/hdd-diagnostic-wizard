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
      onBack={onBack}
      onNext={onNext}
      canGoBack={canGoBack}
      canGoNext={canGoNext}
    >
      <div className="rounded-xl bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)]">
        <p className="text-[16px] leading-7 text-[#3c4043]">
          A hard drive stores data on spinning disks called platters. Tiny heads float just above
          those disks while reading data. If a drive is unstable, repeated power cycling or heavy
          scans can make damage worse.
        </p>
        <p className="mt-3 text-[16px] leading-7 text-[#5f6368]">
          Understanding these basics will help the next steps feel simple and clear.
        </p>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:mt-3 lg:gap-3">
        <div className="rounded-2xl border border-[#dadce0] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.12)] lg:p-3">
          <Image
            src="/illustrations/platters.svg"
            alt="Top view of hard drive platters"
            width={640}
            height={420}
            className="h-auto w-full rounded-lg object-contain lg:max-h-[185px]"
            priority
          />
          <p className="mt-2 text-center text-sm font-medium text-[#5f6368]">Platters (spinning)</p>
        </div>

        <div className="rounded-2xl border border-[#dadce0] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.12)] lg:p-3">
          <Image
            src="/illustrations/heads-hover.svg"
            alt="Side view of read heads hovering over platters"
            width={640}
            height={420}
            className="headHoverSlow h-auto w-full rounded-lg object-contain lg:max-h-[185px]"
            priority
          />
          <p className="mt-2 text-center text-sm font-medium text-[#5f6368]">Heads (hovering)</p>
        </div>
      </div>

      <details className="mt-3 rounded-xl border border-[#f2c8c8] bg-[#fef7f7] p-4 lg:p-3">
        <summary className="cursor-pointer text-sm font-semibold text-[#b3261e]">Do NOT do this</summary>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-[14px] leading-6 text-[#b3261e] lg:text-[13px] lg:leading-5">
          <li>Do not keep unplugging and replugging the drive repeatedly.</li>
          <li>Do not run random repair tools before this wizard is complete.</li>
        </ul>
      </details>
    </StepLayout>
  );
}
