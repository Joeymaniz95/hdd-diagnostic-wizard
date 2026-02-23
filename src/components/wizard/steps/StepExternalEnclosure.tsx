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
          className={`rounded-2xl border px-4 py-4 text-left text-base font-medium transition duration-200 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7b8cde] focus-visible:outline-offset-2 ${
            value === true
              ? "border-[#6366f1] bg-[rgba(99,102,241,0.12)] text-[#c7d2fe] shadow-[0_0_12px_rgba(99,102,241,0.25)]"
              : "border-[rgba(255,255,255,0.08)] bg-[#1a1d27] text-[#e8eaed] shadow-[0_4px_24px_rgba(0,0,0,0.35)] hover:border-[#6366f1] hover:bg-[#22263a] hover:shadow-[0_0_12px_rgba(99,102,241,0.2)]"
          }`}
        >
          Yes, it is in an enclosure
        </button>

        <button
          type="button"
          onClick={() => onChange(false)}
          className={`rounded-2xl border px-4 py-4 text-left text-base font-medium transition duration-200 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7b8cde] focus-visible:outline-offset-2 ${
            value === false
              ? "border-[#6366f1] bg-[rgba(99,102,241,0.12)] text-[#c7d2fe] shadow-[0_0_12px_rgba(99,102,241,0.25)]"
              : "border-[rgba(255,255,255,0.08)] bg-[#1a1d27] text-[#e8eaed] shadow-[0_4px_24px_rgba(0,0,0,0.35)] hover:border-[#6366f1] hover:bg-[#22263a] hover:shadow-[0_0_12px_rgba(99,102,241,0.2)]"
          }`}
        >
          No, it is already out
        </button>
      </div>

      <details className="mt-4 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-4 lg:mt-3 lg:p-3">
        <summary className="cursor-pointer text-sm font-semibold text-[#7b8cde]">Why we ask this</summary>
        <p className="mt-2 text-[14px] leading-6 text-[#9aa0ac] lg:text-[13px] lg:leading-5">
          Many external drives are standard internal drives inside a shell. Removing the shell helps
          identify the safest recovery connection.
        </p>
      </details>

      {value ? (
        <>
          <div className="mt-4 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-4 text-[#e8eaed] shadow-[0_4px_24px_rgba(0,0,0,0.35)] lg:mt-3 lg:p-3">
            <p className="text-sm font-semibold">How to open the plastic enclosure (quick guide)</p>
            <p className="mt-2 text-[14px] leading-6 text-[#9aa0ac] lg:text-[13px] lg:leading-5">
              Common ways enclosures open:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[14px] leading-6 lg:text-[13px] lg:leading-5">
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

          <details className="mt-3 rounded-xl border border-[rgba(248,113,113,0.35)] bg-[rgba(248,113,113,0.12)] p-4 lg:p-3">
            <summary className="cursor-pointer text-sm font-semibold text-[#f87171]">Do NOT do this</summary>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[14px] leading-6 text-[#fecaca] lg:text-[13px] lg:leading-5">
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
            <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#22263a] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.35)] lg:p-3">
              <Image
                src="/illustrations/35-opening.png"
                alt="3.5 inch hard drive opening"
                width={640}
                height={420}
                className="h-auto w-full rounded-lg object-contain"
              />
              <p className="mt-2 text-center text-sm font-medium text-[#9aa0ac]">
                3.5-inch desktop enclosure (common style)
              </p>
            </div>

            <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#22263a] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.35)] lg:p-3">
              <Image
                src="/illustrations/25-opening.png"
                alt="2.5 inch hard drive opening"
                width={640}
                height={420}
                className="h-auto w-full rounded-lg object-contain"
              />
              <p className="mt-2 text-center text-sm font-medium text-[#9aa0ac]">
                2.5-inch portable enclosure (common style)
              </p>
            </div>
          </div>
        </>
      ) : null}
    </StepLayout>
  );
}
