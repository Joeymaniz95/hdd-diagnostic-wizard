import StepLayout, { type StepNavigationProps } from "@/src/components/wizard/StepLayout";

const steps = [
  { n: 1, text: "Download the SystemRescue ISO file using the button below." },
  { n: 2, text: "Download Rufus (Windows only) — link below." },
  { n: 3, text: "Insert your USB flash drive into the computer." },
  {
    n: 4,
    text: 'Open Rufus. Click "Select" and choose the SystemRescue ISO you downloaded.',
  },
  {
    n: 5,
    text: 'Click "Start". If a warning appears about erasing the USB, click OK.',
  },
  {
    n: 6,
    text: "Wait until the process says it is finished. Do not remove the USB early.",
  },
];

export default function StepCreateUsb({
  onBack,
  onNext,
  canGoBack,
  canGoNext,
}: StepNavigationProps) {
  return (
    <StepLayout
      stepLabel="Step 8"
      title="Create a bootable SystemRescue USB"
      subtitle="SystemRescue is a free tool that lets you run recovery software outside of Windows."
      onBack={onBack}
      onNext={onNext}
      canGoBack={canGoBack}
      canGoNext={canGoNext}
    >
      <div className="rounded-xl border border-[rgba(251,191,36,0.30)] bg-[rgba(251,191,36,0.07)] px-4 py-3">
        <p className="text-sm font-semibold text-[#fcd34d]">Windows PC Required</p>
        <p className="mt-1 text-sm text-[#fde68a]">
          You must use a Windows computer to create the SystemRescue USB. Creating the USB on Mac is
          not supported in this guide.
        </p>
        <p className="mt-2 text-sm text-[#fde68a]">
          If you only have a Mac, we recommend borrowing a Windows PC for this step.
        </p>
      </div>

      <div className="space-y-3">
        {steps.map(({ n, text }) => (
          <div
            key={n}
            className="flex items-start gap-4 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-4"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[rgba(99,102,241,0.2)] text-sm font-bold text-[#7b8cde]">
              {n}
            </span>
            <p className="pt-0.5 text-[15px] text-[#e8eaed]">{text}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <a
          href="https://www.system-rescue.org/Download/"
          target="_blank"
          rel="noreferrer noopener"
          className="flex items-center justify-center rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] px-5 py-3.5 text-center text-sm font-medium text-white shadow-[0_4px_15px_rgba(99,102,241,0.4)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_8px_24px_rgba(99,102,241,0.5)]"
        >
          Download SystemRescue ISO
        </a>
        <a
          href="https://rufus.ie/"
          target="_blank"
          rel="noreferrer noopener"
          className="flex items-center justify-center rounded-xl border border-[rgba(255,255,255,0.15)] bg-[#1a1d27] px-5 py-3.5 text-center text-sm font-medium text-[#e8eaed] transition-all duration-200 hover:border-[#6366f1] hover:bg-[#22263a]"
        >
          Download Rufus (Windows only)
        </a>
      </div>

      <details className="mt-3 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-4">
        <summary className="cursor-pointer text-sm font-semibold text-[#7b8cde]">
          Pro tip — what if the flash fails or errors out?
        </summary>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-[#9aa0ac]">
          <li>Try a different USB port — use a USB 2.0 port if available.</li>
          <li>Try a different USB flash drive.</li>
          <li>
            Make sure the ISO download finished completely. If interrupted, delete it and
            re-download.
          </li>
          <li>Close and reopen the flashing tool, then try again.</li>
        </ul>
      </details>
    </StepLayout>
  );
}
