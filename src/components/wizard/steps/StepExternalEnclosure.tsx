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
      subtitle="Pick the best match. We will guide you carefully from there."
      onBack={onBack}
      onNext={onNext}
      canGoBack={canGoBack}
      canGoNext={canGoNext}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`rounded-xl border px-4 py-4 text-left text-lg font-medium transition ${
            value === true
              ? "border-slate-900 bg-slate-900 text-white"
              : "border-slate-300 bg-white text-slate-900 hover:border-slate-500"
          }`}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`rounded-xl border px-4 py-4 text-left text-lg font-medium transition ${
            value === false
              ? "border-slate-900 bg-slate-900 text-white"
              : "border-slate-300 bg-white text-slate-900 hover:border-slate-500"
          }`}
        >
          No
        </button>
      </div>

      <details className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 lg:mt-3">
        <summary className="cursor-pointer font-semibold text-slate-900">Why we ask this</summary>
        <p className="mt-2 text-slate-700">
          Many external drives are normal internal drives in a plastic shell. We need direct access
          to identify the safest connection method.
        </p>
      </details>

      {value ? (
        <>
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 lg:mt-3">
            <p className="font-semibold text-slate-900">
              How to open the plastic enclosure (quick guide)
            </p>
            <p className="mt-2 text-slate-700">Common ways enclosures open:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
              <li>
                Some enclosures have 2 to 6 small Phillips screws, often hidden under rubber feet
                or stickers. Remove those first.
              </li>
              <li>
                Most plastic shells are held with clips. Use a small flat-head screwdriver or
                plastic spudger to gently pry along the seam.
              </li>
              <li>
                Go slow and work around the edges. Do not force one spot.
              </li>
              <li>If it will not budge easily, stop and re-check for hidden screws.</li>
            </ul>
          </div>

          <details className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 lg:mt-3">
            <summary className="cursor-pointer font-semibold text-amber-900">Do NOT do this</summary>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-amber-900">
              <li>
                Do NOT open the metal hard drive itself. Only open the outer plastic enclosure.
              </li>
              <li>
                Avoid metal tools near the circuit board (PCB). One slip can scrape or short
                components.
              </li>
              <li>
                If the drive is clicking, beeping, or spins down, stop DIY and consider
                professional recovery.
              </li>
            </ul>
          </details>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:mt-3 lg:gap-3">
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4 shadow-sm">
              <Image
                src="/illustrations/open-enclosure-35.png"
                alt="3.5-inch desktop enclosure opening example"
                width={640}
                height={420}
                className="h-auto w-full object-contain lg:max-h-[190px]"
              />
              <p className="mt-3 text-center text-sm font-medium text-slate-600">
                3.5-inch desktop enclosure (common style)
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4 shadow-sm">
              <Image
                src="/illustrations/open-enclosure-25.png"
                alt="2.5-inch portable enclosure opening example"
                width={640}
                height={420}
                className="h-auto w-full object-contain lg:max-h-[190px]"
              />
              <p className="mt-3 text-center text-sm font-medium text-slate-600">
                2.5-inch portable enclosure (common style)
              </p>
            </div>
          </div>
        </>
      ) : null}
    </StepLayout>
  );
}
