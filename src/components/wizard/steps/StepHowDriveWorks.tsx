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
      <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-6 text-[#e8eaed] shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
        <p className="text-[16px] leading-7">
          A hard drive stores data on spinning disks called platters. Tiny heads float just above
          those disks while reading data. If a drive is unstable, repeated power cycling or heavy
          scans can make damage worse.
        </p>
        <p className="mt-3 text-[16px] leading-7 text-[#9aa0ac]">
          Understanding these basics will help the next steps feel simple and clear.
        </p>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:mt-3 lg:gap-3">
        <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#22263a] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.35)] lg:p-3">
          <Image
            src="/illustrations/platters.svg"
            alt="Top view of hard drive platters"
            width={640}
            height={420}
            className="h-auto w-full rounded-lg object-contain"
            priority
          />
          <p className="mt-2 text-center text-sm font-medium text-[#9aa0ac]">Platters (spinning)</p>
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#22263a] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.35)] lg:p-3">
          <Image
            src="/illustrations/heads-hover.svg"
            alt="Side view of read heads hovering over platters"
            width={640}
            height={420}
            className="headHoverSlow h-auto w-full rounded-lg object-contain"
            priority
          />
          <p className="mt-2 text-center text-sm font-medium text-[#9aa0ac]">Heads (hovering)</p>
        </div>
      </div>

      <details className="mt-3 rounded-xl border border-[rgba(248,113,113,0.35)] bg-[rgba(248,113,113,0.12)] p-4 lg:p-3">
        <summary className="cursor-pointer text-sm font-semibold text-[#f87171]">Do NOT do this</summary>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-[14px] leading-6 text-[#fecaca] lg:text-[13px] lg:leading-5">
          <li>Do not keep unplugging and replugging the drive repeatedly.</li>
          <li>Do not run random repair tools before this wizard is complete.</li>
        </ul>
      </details>
    </StepLayout>
  );
}
