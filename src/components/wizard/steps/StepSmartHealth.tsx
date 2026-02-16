import StepLayout, { type StepNavigationProps } from "@/src/components/wizard/StepLayout";
import type { SmartHealth } from "@/src/types/wizard";

type StepSmartHealthProps = StepNavigationProps & {
  value: SmartHealth | null;
  onChange: (value: SmartHealth) => void;
};

const options: Array<{
  value: SmartHealth;
  label: string;
  subtext: string;
  border: string;
  background: string;
  text: string;
}> = [
  {
    value: "good",
    label: "Good",
    subtext: "Drive reports healthy SMART status.",
    border: "#2563EB",
    background: "#EFF6FF",
    text: "#1D4ED8",
  },
  {
    value: "caution",
    label: "Caution",
    subtext: "Early warning signs detected.",
    border: "#F59E0B",
    background: "#FFFBEB",
    text: "#B45309",
  },
  {
    value: "bad",
    label: "Bad",
    subtext: "Drive is actively failing.",
    border: "#DC2626",
    background: "#FEF2F2",
    text: "#B91C1C",
  },
];

export default function StepSmartHealth({
  value,
  onChange,
  onBack,
  onNext,
  canGoBack,
  canGoNext,
}: StepSmartHealthProps) {
  const showBadWarning = value === "bad";
  const nextLabel = showBadWarning ? "Continue Anyway" : "Next";

  function selectedGlow(status: SmartHealth): string {
    if (status === "good") return "0 0 0 3px rgba(37,99,235,0.2), 0 6px 14px rgba(15,23,42,0.08)";
    if (status === "caution") return "0 0 0 3px rgba(245,158,11,0.2), 0 6px 14px rgba(15,23,42,0.08)";
    return "0 0 0 3px rgba(220,38,38,0.2), 0 6px 14px rgba(15,23,42,0.08)";
  }

  return (
    <StepLayout
      stepLabel="Step 6"
      title="Step 6 — Check drive health (CrystalDiskInfo)"
      onBack={onBack}
      onNext={onNext}
      canGoBack={canGoBack}
      canGoNext={canGoNext}
      nextLabel={nextLabel}
    >
      <ul className="list-disc space-y-1 pl-5 text-[15px] text-[#3c4043] lg:text-[14px]">
        <li>Download and install CrystalDiskInfo (Windows).</li>
        <li>Open CrystalDiskInfo.</li>
        <li>Look for your problem drive in the list.</li>
        <li>Then choose what you see below.</li>
      </ul>

      <div className="mt-3 rounded-2xl border border-[#dadce0] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
        <a
          href="https://crystalmark.info/en/software/crystaldiskinfo/"
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex rounded-[24px] bg-[#1a73e8] px-6 py-3 text-sm font-medium text-white shadow-[0_1px_2px_rgba(26,115,232,0.25)] transition-all duration-200 hover:-translate-y-px hover:bg-[#1557b0] hover:shadow-[0_6px_14px_rgba(26,115,232,0.3)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1a73e8] focus-visible:outline-offset-2"
        >
          Download CrystalDiskInfo
        </a>
        <p className="mt-2 text-sm text-[#5f6368]">Windows only.</p>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className="rounded-2xl border p-4 text-left transition-all duration-200 hover:-translate-y-0.5"
            style={{
              borderColor: option.border,
              backgroundColor: option.background,
              color: option.text,
              borderWidth: value === option.value ? "2px" : "1px",
              boxShadow:
                value === option.value
                  ? selectedGlow(option.value)
                  : "0 1px 3px rgba(0,0,0,0.10)",
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: option.border }}
                aria-hidden="true"
              />
              <p className="text-lg font-semibold">{option.label}</p>
            </div>
            <p className="mt-2 text-sm text-[#5f6368]">{option.subtext}</p>
          </button>
        ))}
      </div>

      {showBadWarning ? (
        <div className="mt-3 rounded-xl border border-[#FCA5A5] bg-[#FEF2F2] p-4 text-[#B91C1C]">
          <p className="font-semibold">High risk of failure</p>
          <p className="mt-2">
            If CrystalDiskInfo shows &lsquo;Bad&rsquo;, the drive is actively failing. Continuing DIY
            recovery can permanently destroy your data. Professional recovery is strongly
            recommended.
          </p>
          <div className="mt-4">
            <button
              type="button"
              className="rounded-xl border border-[#dadce0] bg-white px-4 py-2 text-sm font-medium text-[#3c4043] transition hover:bg-[#f8f9fa]"
            >
              Get Professional Recovery Quote
            </button>
          </div>
        </div>
      ) : null}
    </StepLayout>
  );
}
