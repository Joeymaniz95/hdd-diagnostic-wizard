import StepLayout, { type StepNavigationProps } from "@/src/components/wizard/StepLayout";

const checklist = [
  {
    icon: "💻",
    label: "A working computer",
    detail: "Any Windows or Mac machine to create the boot USB and run recovery software.",
  },
  {
    icon: "🔌",
    label: "USB flash drive (8 GB or larger)",
    detail: "This will be turned into your recovery boot drive. Contents will be erased.",
  },
  {
    icon: "💾",
    label: "A new EMPTY target drive",
    detail:
      "Must be the same size or larger than the failing drive. This is where you will clone the data. Make sure it contains nothing important.",
  },
  {
    icon: "🩺",
    label: "The failing drive (patient drive)",
    detail: "The drive you are trying to recover data from. Handle it carefully.",
  },
  {
    icon: "⏳",
    label: "Time and patience",
    detail: "Cloning can take many hours or even days. Do not rush this process.",
  },
  {
    icon: "⚡",
    label: "Stable power source",
    detail:
      "Laptop: keep it plugged in the entire time. Desktop: a UPS (battery backup) is ideal to prevent power interruptions.",
  },
];

export default function StepPrerequisites({
  onBack,
  onNext,
  canGoBack,
  canGoNext,
}: StepNavigationProps) {
  return (
    <StepLayout
      stepLabel="Step 7"
      title="Things you need before starting"
      subtitle="Gather everything on this list before moving forward."
      onBack={onBack}
      onNext={onNext}
      canGoBack={canGoBack}
      canGoNext={canGoNext}
    >
      <div className="space-y-3">
        {checklist.map(({ icon, label, detail }) => (
          <div
            key={label}
            className="flex items-start gap-4 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
          >
            <span className="mt-0.5 text-2xl leading-none" aria-hidden="true">
              {icon}
            </span>
            <div>
              <p className="font-semibold text-[#e8eaed]">{label}</p>
              <p className="mt-0.5 text-sm text-[#9aa0ac]">{detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-[rgba(248,113,113,0.4)] bg-[rgba(248,113,113,0.12)] p-5">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#f87171]">
          ⚠ Critical warnings
        </p>
        <ul className="mt-3 space-y-3 text-[#fca5a5]">
          <li className="flex items-start gap-3">
            <span className="mt-0.5 shrink-0 text-[#f87171]">▸</span>
            <span>
              The target drive will be completely erased during cloning. Make absolutely sure it
              contains nothing important before you proceed.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 shrink-0 text-[#f87171]">▸</span>
            <span>
              Choosing the wrong drive as the target can permanently destroy data. You will be shown
              how to confirm which is which in a later step — do not skip it.
            </span>
          </li>
        </ul>
      </div>
    </StepLayout>
  );
}
