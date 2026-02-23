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
  {
    value: "not_detected",
    label: "I don't see my drive in CrystalDiskInfo",
    subtext: "Drive does not appear in the list.",
    border: "#60a5fa",
    background: "rgba(96,165,250,0.08)",
    backgroundSelected: "rgba(96,165,250,0.20)",
    text: "#93c5fd",
  },
];

function selectedGlow(status: SmartHealth): string {
  if (status === "good")
    return "0 0 0 2px rgba(74,222,128,0.55), 0 0 20px rgba(74,222,128,0.22), 0 6px 20px rgba(0,0,0,0.4)";
  if (status === "caution")
    return "0 0 0 2px rgba(251,191,36,0.55), 0 0 20px rgba(251,191,36,0.22), 0 6px 20px rgba(0,0,0,0.4)";
  if (status === "not_detected")
    return "0 0 0 2px rgba(96,165,250,0.55), 0 0 20px rgba(96,165,250,0.22), 0 6px 20px rgba(0,0,0,0.4)";
  // "bad"
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
  const isHardStopSelection = value === "bad" || value === "not_detected";
  const showBadWarning = value === "bad";
  const showNotDetected = value === "not_detected";
  const hasSelection = value !== null;

  return (
    <StepLayout
      stepLabel="Step 6"
      title="Step 6 — Check drive health (CrystalDiskInfo)"
      onBack={onBack}
      onNext={onNext}
      canGoBack={canGoBack}
      canGoNext={canGoNext}
      showNext={!isHardStopSelection}
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

      {/* Reassurance note — relevant because this path is reached only when the drive spins */}
      <div className="mt-3 rounded-xl border border-[rgba(99,102,241,0.22)] bg-[rgba(99,102,241,0.07)] px-4 py-3">
        <p className="text-sm text-[#a5b4fc]">
          Since your drive is spinning and stays spinning, there&apos;s a good chance your data can
          be recovered. The safest approach is to clone the drive first with ddrescue, then recover
          files from the clone — not the original drive.
        </p>
      </div>

      {/* 2×2 grid for four options */}
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
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
                  className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: option.border }}
                  aria-hidden="true"
                />
                <p className="text-base font-semibold leading-snug">{option.label}</p>
              </div>
              <p className="mt-2 text-sm text-[#9aa0ac]">{option.subtext}</p>
            </button>
          );
        })}
      </div>

      {/* Hard stop — Bad */}
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

      {/* Hard stop — Not Detected */}
      {showNotDetected ? (
        <div className="mt-3 rounded-xl border border-[rgba(96,165,250,0.35)] bg-[rgba(96,165,250,0.08)] p-4 text-[#93c5fd]">
          <p className="font-semibold">Drive Not Detected — Professional Recovery Recommended</p>
          <p className="mt-2 text-sm text-[#bfdbfe]">
            If your drive doesn&apos;t appear in CrystalDiskInfo, the computer isn&apos;t
            communicating with it properly. Two common causes:
          </p>
          <ul className="mt-3 space-y-3 text-sm text-[#bfdbfe]">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 shrink-0 text-[#60a5fa]">①</span>
              <span>
                <span className="font-semibold text-[#93c5fd]">USB bridge / enclosure issue</span>
                {" — "}If it&apos;s a USB external drive, the USB-to-SATA bridge inside the
                enclosure may be failing. Recovery often requires bypassing the enclosure entirely
                and connecting the drive via direct SATA.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 shrink-0 text-[#60a5fa]">②</span>
              <span>
                <span className="font-semibold text-[#93c5fd]">Firmware or translation issue</span>
                {" — "}The drive may have internal firmware problems that prevent it from
                identifying correctly, even when connected directly.
              </span>
            </li>
          </ul>
          <div className="mt-4 space-y-2 rounded-lg border border-[rgba(96,165,250,0.18)] bg-[rgba(0,0,0,0.2)] px-3 py-2.5 text-sm text-[#93c5fd]">
            <p>⚠ Do not keep unplugging, replugging, or power cycling the drive repeatedly.</p>
            <p>⚠ Avoid running scans or DIY cloning attempts if the drive is not detected.</p>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <button
              type="button"
              onClick={onGetQuote}
              className="rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] px-5 py-3 text-sm font-medium text-white shadow-[0_4px_15px_rgba(99,102,241,0.4)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_8px_24px_rgba(99,102,241,0.5)]"
            >
              Get a Data Recovery Quote
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
