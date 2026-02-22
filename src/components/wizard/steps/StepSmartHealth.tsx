import StepLayout, { type StepNavigationProps } from "@/src/components/wizard/StepLayout";
import type { SmartHealth } from "@/src/types/wizard";

type StepSmartHealthProps = StepNavigationProps & {
  value: SmartHealth | null;
  onChange: (value: SmartHealth) => void;
  onGetQuote: () => void;
};

const options: Array<{
  value: SmartHealth;
  label: string;
  subtext: string;
  border: string;
  background: string;
  backgroundSelected: string;
  text: string;
}> = [
  {
    value: "good",
    label: "Good",
    subtext: "Drive reports healthy SMART status.",
    border: "#4ade80",
    background: "rgba(74,222,128,0.08)",
    backgroundSelected: "rgba(74,222,128,0.20)",
    text: "#86efac",
  },
  {
    value: "caution",
    label: "Caution",
    subtext: "Early warning signs detected.",
    border: "#fbbf24",
    background: "rgba(251,191,36,0.08)",
    backgroundSelected: "rgba(251,191,36,0.18)",
    text: "#fcd34d",
  },
  {
    value: "bad",
    label: "Bad",
    subtext: "Drive is actively failing.",
    border: "#f87171",
    background: "rgba(248,113,113,0.08)",
    backgroundSelected: "rgba(248,113,113,0.22)",
    text: "#fca5a5",
  },
];

function selectedGlow(status: SmartHealth): string {
  if (status === "good")
    return "0 0 0 2px rgba(74,222,128,0.55), 0 0 20px rgba(74,222,128,0.22), 0 6px 20px rgba(0,0,0,0.4)";
  if (status === "caution")
    return "0 0 0 2px rgba(251,191,36,0.55), 0 0 20px rgba(251,191,36,0.22), 0 6px 20px rgba(0,0,0,0.4)";
  return "0 0 0 2px rgba(248,113,113,0.55), 0 0 20px rgba(248,113,113,0.22), 0 6px 20px rgba(0,0,0,0.4)";
}

export default function StepSmartHealth({
  value,
  onChange,
  onGetQuote,
  onBack,
  onNext,
  canGoBack,
  canGoNext,
}: StepSmartHealthProps) {
  const showBadWarning = value === "bad";
  const hasSelection = value !== null;

  return (
    <StepLayout
      stepLabel="Step 6"
      title="Step 6 — Check drive health (CrystalDiskInfo)"
      onBack={onBack}
      onNext={onNext}
      canGoBack={canGoBack}
      canGoNext={canGoNext}
      showNext={!showBadWarning}
      nextLabel="Next"
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
        {options.map((option) => {
          const isSelected = value === option.value;
          const isDimmed = hasSelection && !isSelected;

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onChange(option.value)}
              className="relative rounded-2xl p-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b8cde]"
              style={{
                borderStyle: "solid",
                borderWidth: isSelected ? "2px" : "1.5px",
                borderColor: isSelected ? option.border : `${option.border}60`,
                backgroundColor: isSelected ? option.backgroundSelected : option.background,
                color: option.text,
                boxShadow: isSelected
                  ? selectedGlow(option.value)
                  : "0 4px 24px rgba(0,0,0,0.28)",
                transform: isSelected ? "scale(1.02)" : "scale(1)",
                opacity: isDimmed ? 0.45 : 1,
                transition: "all 250ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                textTransform: "none",
                letterSpacing: "normal",
              }}
            >
              {isSelected && (
                <span
                  className="absolute right-3 top-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                  aria-hidden="true"
                  style={{ backgroundColor: option.border }}
                >
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                    <path
                      d="M1 4 L3.5 6.5 L9 1"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}

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
          );
        })}
      </div>

      {showBadWarning ? (
        <div className="mt-3 rounded-xl border border-[rgba(248,113,113,0.35)] bg-[rgba(248,113,113,0.12)] p-4 text-[#fca5a5]">
          <p className="font-semibold">High risk of failure</p>
          <p className="mt-2">
            If CrystalDiskInfo shows &lsquo;Bad&rsquo;, the drive is actively failing. Continuing
            DIY recovery can permanently destroy recoverable data. Professional recovery is strongly
            recommended.
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <button
              type="button"
              onClick={onGetQuote}
              className="rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] px-5 py-3 text-sm font-medium text-white shadow-[0_4px_15px_rgba(99,102,241,0.4)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_8px_24px_rgba(99,102,241,0.5)]"
            >
              Get Professional Recovery Quote
            </button>
            <a
              href="https://mdrepairs.com/mail-in-repair/"
              target="_blank"
              rel="noreferrer noopener"
              className="text-center text-sm text-[#9aa0ac] underline underline-offset-2 transition-colors hover:text-[#a5b4fc]"
            >
              Learn about our mail-in process ↗
            </a>
          </div>
        </div>
      ) : null}
    </StepLayout>
  );
}
