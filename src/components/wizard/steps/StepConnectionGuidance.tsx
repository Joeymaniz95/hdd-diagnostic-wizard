import StepLayout, { type StepNavigationProps } from "@/src/components/wizard/StepLayout";
import Image from "next/image";

export default function StepConnectionGuidance({
  onBack,
  onNext,
  canGoBack,
  canGoNext,
}: StepNavigationProps) {
  return (
    <StepLayout
      stepLabel="Step 4"
      title="How to connect the drive safely"
      onBack={onBack}
      onNext={onNext}
      canGoBack={canGoBack}
      canGoNext={canGoNext}
    >
      <p className="text-[16px] leading-7 text-[#e8eaed]">Choose the matching connection method below.</p>

      <div className="mt-4 grid grid-cols-1 items-stretch gap-6 lg:mt-3 lg:grid-cols-3">
        <div className="h-full flex flex-col rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_12px_rgba(99,102,241,0.2)] lg:p-4">
          <div className="flex flex-col flex-grow gap-3">
            <Image
              src="/illustrations/35-plugged.png"
              alt="3.5-inch desktop drive connected to docking station"
              width={900}
              height={560}
              className="h-auto w-full rounded-lg object-contain saturate-90"
            />
            <h3 className="text-base font-semibold text-white">3.5-inch desktop drive → SATA docking station</h3>
            <p className="text-sm leading-6 text-[#9aa0ac]">
              Use a powered docking station for 3.5-inch drives (they require external power).
            </p>
          </div>
          <div className="mt-auto flex justify-center pt-4">
            <a
              href="https://www.amazon.com/Sabrent-External-Lay-Flat-Docking-EC-DFLT/dp/B00LS5NFQ2/ref=sr_1_3?crid=2IEGUO3VGWWX9&dib=eyJ2IjoiMSJ9.BfFbrzCstJxW_G6XrER7TyvWepvnamyUA4HDsS2H2pLJn5BFjeqyOcQIa3jH3aupni7Ph0_3irxeD_0qiyx4prYd07qj3o4eu16gqI4lt8FdTb8Cz28sxOXpCiLTuRQP_B-WBZOcwkm7x_a8ZMsLBSnpXsQeLvKZwlgGGcrnM-Ok3b2bm-C1lDqlWvikk5E0v0R_GpVmkFzm6BiUHKYGw23c1L869qsCPeG0po8yHSg.n0CTkbSFQjDb90gj6XCQOA_N093tR-af2fFx3heyaDU&dib_tag=se&keywords=3.5%2Binch%2Bdrive%2Benclosure&qid=1771190838&sprefix=3.5%2Binch%2Bdrive%2Benclosur%2Caps%2C118&sr=8-3&th=1"
              target="_blank"
              rel="noreferrer noopener sponsored"
              className="inline-flex rounded-[24px] bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] px-8 py-3 text-sm font-medium text-white shadow-[0_4px_15px_rgba(99,102,241,0.4)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_8px_24px_rgba(99,102,241,0.5)]"
            >
              Buy
            </a>
          </div>
        </div>

        <div className="h-full flex flex-col rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_12px_rgba(99,102,241,0.2)] lg:p-4">
          <div className="flex flex-col flex-grow gap-3">
            <Image
              src="/illustrations/25-plugged.png"
              alt="2.5-inch SATA drive connected with SATA-to-USB adapter cable"
              width={900}
              height={560}
              className="h-auto w-full rounded-lg object-contain saturate-90"
            />
            <h3 className="text-base font-semibold text-white">2.5-inch SATA drive → SATA-to-USB adapter cable</h3>
            <p className="text-sm leading-6 text-[#9aa0ac]">
              A SATA-to-USB adapter works for 2.5-inch drives (usually no extra power needed).
            </p>
          </div>
          <div className="mt-auto flex justify-center pt-4">
            <a
              href="https://www.amazon.com/StarTech-External-Converter-Transfer-OS-Independent/dp/B00HJZJI84/ref=sr_1_5?crid=2TQDIOXVI02EY&dib=eyJ2IjoiMSJ9.SoZnjDP9dDMRNdUm5cikp8ftTLi5_Mx4lsuHNbWSmf5DDaT4RFYY3RDzuxFy6iq-Yf_C6ZkWidOTVkKbk5li0agwkRBa2cjyDDfuNpZzyvykHbG-85vHC2Lahy34edupVkgCzKhNqJYkfylgtZlWqba7pGY1Xwj_S4wXu0oqHtbLYAsAE4iXoTuN0cNZvCN4qpLAS0Mz2Cd9x_hgp4REaP-PY8sUIQVlbZJ5srpF8aM.MFAmyV0gNHs4AjqQ2fK9D-b2ZHc3Ch3tWyRrJ3PZTYs&dib_tag=se&keywords=2.5%2Bsata%2Badapter&qid=1771191200&sprefix=2.5%2Bsata%2Badapt%2Caps%2C125&sr=8-5&th=1"
              target="_blank"
              rel="noreferrer noopener sponsored"
              className="inline-flex rounded-[24px] bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] px-8 py-3 text-sm font-medium text-white shadow-[0_4px_15px_rgba(99,102,241,0.4)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_8px_24px_rgba(99,102,241,0.5)]"
            >
              Buy
            </a>
          </div>
        </div>

        <div className="h-full flex flex-col rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_12px_rgba(99,102,241,0.2)] lg:p-4">
          <div className="flex flex-col flex-grow gap-3">
            <Image
              src="/illustrations/USB-plugged.png"
              alt="USB-native drive connected via USB cable"
              width={900}
              height={560}
              className="h-auto w-full rounded-lg object-contain saturate-90"
            />
            <h3 className="text-base font-semibold text-white">USB-native drive → USB cable</h3>
            <p className="text-sm leading-6 text-[#9aa0ac]">If the USB port is soldered to the drive’s PCB, keep using USB.</p>
          </div>
          <div className="mt-auto" />
        </div>
      </div>

      <details className="mt-4 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-4 lg:mt-3">
        <summary className="cursor-pointer font-semibold text-[#7b8cde]">Why we ask this</summary>
        <p className="mt-2 text-[#9aa0ac]">
          A safe and stable connection lowers the chance of freezes, disconnects, and extra stress on
          a weak drive.
        </p>
      </details>

      <details className="mt-4 rounded-xl border border-[rgba(248,113,113,0.35)] bg-[rgba(248,113,113,0.12)] p-4 lg:mt-3">
        <summary className="cursor-pointer font-semibold text-[#f87171]">Do NOT do this</summary>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-[#fecaca]">
          <li>Do not run chkdsk on the original drive.</li>
          <li>Do not click Format, Initialize Disk, or Repair prompts.</li>
        </ul>
      </details>
    </StepLayout>
  );
}
