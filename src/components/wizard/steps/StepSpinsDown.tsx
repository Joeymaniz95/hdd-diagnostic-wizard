import StepLayout, { type StepNavigationProps } from "@/src/components/wizard/StepLayout";

type StepSpinsDownProps = StepNavigationProps & {
  onGetQuote: () => void;
};

export default function StepSpinsDown({
  onBack,
  onNext,
  canGoBack,
  canGoNext,
  onGetQuote,
}: StepSpinsDownProps) {
  return (
    <StepLayout
      stepLabel="Recovery Assessment"
      title="Spins Up Then Spins Down — Professional Recovery Required"
      onBack={onBack}
      onNext={onNext}
      canGoBack={canGoBack}
      canGoNext={canGoNext}
      showNext={false}
    >
      {/* ── Top warning banner ── */}
      <div className="rounded-xl border-2 border-[rgba(251,146,60,0.5)] bg-[rgba(251,146,60,0.1)] p-5">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#fb923c]">
          ⚠ Physical hardware failure — no DIY path forward
        </p>
        <p className="mt-2 text-sm text-[#fdba74]">
          This sound pattern indicates a read/write head failure. Software recovery tools cannot
          help here. Continuing DIY attempts will reduce your chances of getting files back.
        </p>
      </div>

      {/* ── Card 1: What this means ── */}
      <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-5">
        <p className="font-semibold text-[#e8eaed]">What this means</p>
        <p className="mt-2 text-sm text-[#9aa0ac]">
          When a hard drive spins up and then immediately spins back down, the drive is starting its
          startup sequence, attempting to initialize the read/write heads, failing, and then shutting
          down to protect itself. This is a built-in self-protection mechanism — the drive detected
          a problem and chose to stop rather than risk further damage.
        </p>
        <p className="mt-3 text-sm text-[#9aa0ac]">
          The most common cause is that one or more read/write heads have failed and cannot read the
          drive&apos;s internal system area. Without successfully reading that information, the drive
          cannot complete startup. This is a physical and mechanical failure — not a software or
          logical problem.
        </p>
      </div>

      {/* ── Card 2: Why DIY won't work ── */}
      <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-5">
        <p className="font-semibold text-[#e8eaed]">Why DIY won&apos;t work</p>
        <div className="mt-3 space-y-4 text-sm text-[#9aa0ac]">
          <div>
            <p className="font-medium text-[#c7d2fe]">Software tools require the drive to stay online</p>
            <p className="mt-1">
              Tools like ddrescue and R-Studio need the drive to spin up and remain stable long
              enough to read data sector by sector. A drive with failed heads cannot do this — it
              spins down before any data transfer can begin.
            </p>
          </div>
          <div>
            <p className="font-medium text-[#c7d2fe]">The head stack assembly must be replaced</p>
            <p className="mt-1">
              In most cases, the head stack assembly — the component that contains the read/write
              heads — must be replaced with a donor set from a precisely matched compatible drive.
              This is a delicate mechanical procedure that cannot be done outside a professional lab.
            </p>
          </div>
          <div>
            <p className="font-medium text-[#c7d2fe]">A cleanroom is required</p>
            <p className="mt-1">
              The drive must be opened in an ISO-certified cleanroom environment — a room with
              filtered air that is thousands of times cleaner than normal indoor air. A single dust
              particle landing on the platters during a head replacement can cause catastrophic
              damage. Opening the drive at home will permanently destroy your data.
            </p>
          </div>
          <div>
            <p className="font-medium text-[#c7d2fe]">Repeated power cycles cause more damage</p>
            <p className="mt-1">
              Every time you power the drive on, the failing heads attempt to move across the
              platters. Each attempt risks scratching the magnetic surface where your data is stored,
              reducing the amount that can be recovered.
            </p>
          </div>
        </div>
      </div>

      {/* ── Critical warnings ── */}
      <div className="rounded-xl border border-[rgba(248,113,113,0.45)] bg-[rgba(248,113,113,0.12)] p-5">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#f87171]">
          ⚠ Stop here — critical warnings
        </p>
        <ul className="mt-3 space-y-2.5 text-sm text-[#fca5a5]">
          <li className="flex items-start gap-2.5">
            <span className="mt-0.5 shrink-0 text-[#f87171]">▸</span>
            <span>
              <strong className="text-[#fca5a5]">Stop power cycling the drive.</strong> Each
              spin-up attempt with failed heads risks scratching the platters where your data is
              stored.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="mt-0.5 shrink-0 text-[#f87171]">▸</span>
            <span>
              <strong className="text-[#fca5a5]">Do not run scans or cloning attempts.</strong> The
              drive cannot stay online long enough for these tools to work, and each attempt causes
              further damage.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="mt-0.5 shrink-0 text-[#f87171]">▸</span>
            <span>
              <strong className="text-[#fca5a5]">Do not open the drive outside a cleanroom.</strong>{" "}
              Even a single dust particle on the platters can make recovery impossible.
            </span>
          </li>
        </ul>
      </div>

      {/* ── Card 3: What we can do ── */}
      <div className="rounded-xl border border-[rgba(74,222,128,0.25)] bg-[rgba(74,222,128,0.07)] p-5">
        <p className="font-semibold text-[#4ade80]">What we can do</p>
        <p className="mt-2 text-sm text-[#86efac]">
          Your data is very likely still intact on the platters — a head failure does not erase
          data. Professional recovery labs work in certified cleanrooms with the specialized
          equipment needed to replace the head stack assembly, bring the drive back online, and
          extract your files. Labs successfully recover data from drives with this exact failure
          pattern every day.
        </p>
        <p className="mt-3 text-sm text-[#86efac]">
          The sooner the drive is evaluated, the better your chances. Avoid powering it on again
          until it has been assessed by a professional.
        </p>
      </div>

      {/* ── CTAs ── */}
      <div className="space-y-3 pt-1">
        <button
          type="button"
          onClick={onGetQuote}
          className="w-full rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] px-6 py-4 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(99,102,241,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_8px_28px_rgba(99,102,241,0.55)] active:scale-[0.99]"
        >
          Get a Data Recovery Quote →
        </button>

        <a
          href="https://mdrepairs.com/mail-in-repair/"
          target="_blank"
          rel="noreferrer noopener"
          className="flex w-full items-center justify-center rounded-xl border border-[rgba(255,255,255,0.12)] bg-transparent px-6 py-4 text-sm font-medium text-[#9aa0ac] transition-all duration-200 hover:border-[#6366f1] hover:text-white"
        >
          Learn About Our Mail-In Process ↗
        </a>

        <div className="text-center">
          <button
            type="button"
            onClick={onBack}
            className="text-xs text-[#9aa0ac] underline underline-offset-2 hover:text-white"
          >
            ← Back to change my selection
          </button>
        </div>
      </div>
    </StepLayout>
  );
}
