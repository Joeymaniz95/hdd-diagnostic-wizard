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
    border: "#4ade80",
    background: "rgba(74,222,128,0.10)",
    text: "#86efac",
  },
  {
    value: "caution",
    label: "Caution",
    subtext: "Early warning signs detected.",
    border: "#fbbf24",
    background: "rgba(251,191,36,0.10)",
    text: "#fcd34d",
  },
  {
    value: "bad",
    label: "Bad",
    subtext: "Drive is actively failing.",
    border: "#f87171",
    background: "rgba(248,113,113,0.12)",
    text: "#fca5a5",
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
    if (status === "good") return "0 0 0 2px rgba(74,222,128,0.25), 0 6px 14px rgba(0,0,0,0.35)";
    if (status === "caution") return "0 0 0 2px rgba(251,191,36,0.25), 0 6px 14px rgba(0,0,0,0.35)";
    return "0 0 0 2px rgba(248,113,113,0.25), 0 6px 14px rgba(0,0,0,0.35)";
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
      <ul className="list-disc space-y-1 pl-5 text-[15px] text-[#e8eaed] lg:text-[14px]">
        <li>Download and install CrystalDiskInfo (Windows).</li>
        <li>Open CrystalDiskInfo.</li>
        <li>Look for your problem drive in the list.</li>
        <li>Then choose what you see below.</li>
      </ul>

      <div className="mt-3 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.35)]">
        <a
          href="https://crystalmark.info/en/software/crystaldiskinfo/"
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex rounded-[24px] bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] px-6 py-3 text-sm font-medium text-white shadow-[0_4px_15px_rgba(99,102,241,0.4)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_8px_24px_rgba(99,102,241,0.5)]"
        >
          Download CrystalDiskInfo
        </a>
        <p className="mt-2 text-sm text-[#9aa0ac]">Windows only.</p>
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
              boxShadow: value === option.value ? selectedGlow(option.value) : "0 4px 24px rgba(0,0,0,0.28)",
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
            <p className="mt-2 text-sm text-[#9aa0ac]">{option.subtext}</p>
          </button>
        ))}
      </div>

      {showBadWarning ? (
        <div className="mt-3 rounded-xl border border-[rgba(248,113,113,0.35)] bg-[rgba(248,113,113,0.12)] p-4 text-[#fca5a5]">
          <p className="font-semibold">High risk of failure</p>
          <p className="mt-2">
            If CrystalDiskInfo shows &lsquo;Bad&rsquo;, the drive is actively failing. Continuing DIY
            recovery can permanently destroy your data. Professional recovery is strongly
            recommended.
          </p>
          <div className="mt-4">
            <button
              type="button"
              className="rounded-xl border border-[rgba(255,255,255,0.15)] bg-transparent px-4 py-2 text-sm font-medium text-[#e8eaed] transition hover:border-[#6366f1]"
            >
              Get Professional Recovery Quote
            </button>
          </div>
        </div>
      ) : null}
    </StepLayout>
  );
}
