import Image from "next/image";
import StepLayout, { type StepNavigationProps } from "@/src/components/wizard/StepLayout";

type StepExternalEnclosureProps = StepNavigationProps & {
  value: boolean | null;
  onChange: (value: boolean) => void;
};

export default function StepExternalEnclosure({
  value,
  onChange,
  onBack,
  onNext,
  canGoBack,
  canGoNext,
}: StepExternalEnclosureProps) {
  return (
    <StepLayout
      stepLabel="Step 2"
      title="Is your drive inside an external enclosure?"
      onBack={onBack}
      onNext={onNext}
      canGoBack={canGoBack}
      canGoNext={canGoNext}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`rounded-2xl border px-4 py-4 text-left text-base font-medium transition duration-200 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1a73e8] focus-visible:outline-offset-2 ${
            value === true
              ? "border-[#1a73e8] bg-[#eff6ff] text-[#1d4ed8] shadow-[0_4px_12px_rgba(26,115,232,0.18)]"
              : "border-[#dadce0] bg-white text-[#202124] shadow-[0_1px_3px_rgba(0,0,0,0.10)] hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
          }`}
        >
          Yes, it is in an enclosure
        </button>

        <button
          type="button"
          onClick={() => onChange(false)}
          className={`rounded-2xl border px-4 py-4 text-left text-base font-medium transition duration-200 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1a73e8] focus-visible:outline-offset-2 ${
            value === false
              ? "border-[#1a73e8] bg-[#eff6ff] text-[#1d4ed8] shadow-[0_4px_12px_rgba(26,115,232,0.18)]"
              : "border-[#dadce0] bg-white text-[#202124] shadow-[0_1px_3px_rgba(0,0,0,0.10)] hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
          }`}
        >
          No, it is already out
        </button>
      </div>

      <details className="mt-4 rounded-xl border border-[#dadce0] bg-white p-4 lg:mt-3 lg:p-3">
        <summary className="cursor-pointer text-sm font-semibold text-[#202124]">Why we ask this</summary>
        <p className="mt-2 text-[14px] leading-6 text-[#5f6368] lg:text-[13px] lg:leading-5">
          Many external drives are standard internal drives inside a shell. Removing the shell helps
          identify the safest recovery connection.
        </p>
      </details>

      {value ? (
        <>
          <div className="mt-4 rounded-xl border border-[#dadce0] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.12)] lg:mt-3 lg:p-3">
            <p className="text-sm font-semibold text-[#202124]">How to open the plastic enclosure (quick guide)</p>
            <p className="mt-2 text-[14px] leading-6 text-[#5f6368] lg:text-[13px] lg:leading-5">
              Common ways enclosures open:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[14px] leading-6 text-[#3c4043] lg:text-[13px] lg:leading-5">
              <li>
                Some enclosures have 2 to 6 small Phillips screws, often hidden under rubber feet
                or stickers. Remove those first.
              </li>
              <li>
                Most plastic shells are held with clips. Use a small flat-head screwdriver or
                plastic spudger to gently pry along the seam.
              </li>
              <li>Go slow and work around the edges. Do not force one spot.</li>
              <li>If it will not budge easily, stop and re-check for hidden screws.</li>
            </ul>
          </div>

          <details className="mt-3 rounded-xl border border-[#f2c8c8] bg-[#fef7f7] p-4 lg:p-3">
            <summary className="cursor-pointer text-sm font-semibold text-[#b3261e]">Do NOT do this</summary>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[14px] leading-6 text-[#b3261e] lg:text-[13px] lg:leading-5">
              <li>Do NOT open the metal hard drive itself. Only open the outer plastic enclosure.</li>
              <li>
                Avoid metal tools near the circuit board (PCB). One slip can scrape or short
                components.
              </li>
              <li>
                If the drive is clicking, beeping, or spins down, stop DIY and consider professional
                recovery.
              </li>
            </ul>
          </details>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:mt-3 lg:gap-3">
            <div className="rounded-2xl border border-[#dadce0] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.12)] lg:p-3">
              <Image
                src="/illustrations/open-enclosure-35.png"
                alt="3.5-inch desktop enclosure opening example"
                width={640}
                height={420}
                className="h-auto w-full rounded-lg object-contain lg:max-h-[185px]"
              />
              <p className="mt-2 text-center text-sm font-medium text-[#5f6368]">
                3.5-inch desktop enclosure (common style)
              </p>
            </div>

            <div className="rounded-2xl border border-[#dadce0] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.12)] lg:p-3">
              <Image
                src="/illustrations/open-enclosure-25.png"
                alt="2.5-inch portable enclosure opening example"
                width={640}
                height={420}
                className="h-auto w-full rounded-lg object-contain lg:max-h-[185px]"
              />
              <p className="mt-2 text-center text-sm font-medium text-[#5f6368]">
                2.5-inch portable enclosure (common style)
              </p>
            </div>
          </div>
        </>
      ) : null}
    </StepLayout>
  );
}
