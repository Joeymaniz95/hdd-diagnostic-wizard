import StepLayout, { type StepNavigationProps } from "@/src/components/wizard/StepLayout";

type StepNotSpinningProps = StepNavigationProps & {
  onGetQuote: () => void;
};

export default function StepNotSpinning({
  onBack,
  onNext,
  canGoBack,
  canGoNext,
  onGetQuote,
}: StepNotSpinningProps) {
  return (
    <StepLayout
      stepLabel="Recovery Assessment"
      title="Drive Is Not Spinning — Professional Recovery Required"
      onBack={onBack}
      onNext={onNext}
      canGoBack={canGoBack}
      canGoNext={canGoNext}
      showNext={false}
    >
      {/* ── Top warning banner ── */}
      <div className="rounded-xl border-2 border-[rgba(248,113,113,0.5)] bg-[rgba(248,113,113,0.1)] p-5">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#f87171]">
          ⚠ Hardware failure — no DIY path forward
        </p>
        <p className="mt-2 text-sm text-[#fca5a5]">
          If a hard drive does not spin at all, DIY software recovery will not work. This is almost
          always a hardware-level problem that requires professional equipment and techniques.
        </p>
      </div>

      {/* ── What this means ── */}
      <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-5">
        <p className="font-semibold text-[#e8eaed]">What this means</p>
        <p className="mt-2 text-sm text-[#9aa0ac]">
          A non-spinning drive has one of two common causes — both require professional intervention:
        </p>
        <div className="mt-4 space-y-3">
          <div className="rounded-lg border border-[rgba(251,146,60,0.25)] bg-[rgba(251,146,60,0.07)] p-4">
            <p className="text-sm font-semibold text-[#fb923c]">Cause 1 — PCB / electronics failure</p>
            <p className="mt-1.5 text-sm text-[#9aa0ac]">
              The PCB (Printed Circuit Board) is the drive&apos;s main control board — the green
              electronics board attached to the underside of the drive. If it has failed, the motor
              never receives the signal to start spinning.
            </p>
          </div>
          <div className="rounded-lg border border-[rgba(251,146,60,0.25)] bg-[rgba(251,146,60,0.07)] p-4">
            <p className="text-sm font-semibold text-[#fb923c]">Cause 2 — Motor seized or stuck</p>
            <p className="mt-1.5 text-sm text-[#9aa0ac]">
              In some cases the spindle motor inside the drive has seized — it physically cannot
              rotate the platters. This requires opening the drive in a certified cleanroom
              environment to address the mechanical failure.
            </p>
          </div>
        </div>
      </div>

      {/* ── Why DIY won't work ── */}
      <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-5">
        <p className="font-semibold text-[#e8eaed]">Why DIY board swaps do not work</p>

        <div className="mt-3 space-y-4 text-sm text-[#9aa0ac]">
          <div>
            <p className="font-medium text-[#c7d2fe]">The ROM chip — unique to every drive</p>
            <p className="mt-1">
              Every hard drive PCB contains a tiny ROM chip (Read-Only Memory) that stores adaptive
              firmware data unique to that specific drive — including calibration values written at
              the factory for the exact platters and head assembly inside your drive. Swapping a PCB
              from another drive — even an identical model — will not work unless this ROM chip is
              transferred from the original board to the donor board.
            </p>
            <p className="mt-2">
              ROM transfer requires professional microsoldering equipment and experience. Done
              incorrectly, the chip is damaged and those unique values are permanently lost — making
              recovery impossible.
            </p>
          </div>

          <div>
            <p className="font-medium text-[#c7d2fe]">MCU encryption — common in modern drives</p>
            <p className="mt-1">
              Many drives manufactured after 2013 store adaptive data and hardware-level encryption
              keys inside the MCU (Microcontroller Unit) rather than on a separate ROM chip. In
              these cases, the MCU itself must be transferred — not just the ROM. MCU transfers
              require BGA rework stations (advanced hot-air rework equipment) and are far beyond any
              DIY capability. An incorrect transfer destroys the chip and the data with it.
            </p>
          </div>

          <div>
            <p className="font-medium text-[#c7d2fe]">Motor failure requires a cleanroom</p>
            <p className="mt-1">
              If the spindle motor has seized, the drive enclosure must be opened to address it.
              Hard drive platters are manufactured and sealed in ultra-clean environments. A single
              dust particle landing on a platter can cause catastrophic read/write head crashes and
              destroy data permanently. Opening a drive outside a certified ISO-5 cleanroom (10,000×
              cleaner than typical indoor air) makes data recovery impossible.
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
              <strong className="text-[#fca5a5]">Stop powering the drive on and off.</strong> Each
              power cycle applies stress to an already-failed component and can worsen the damage.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="mt-0.5 shrink-0 text-[#f87171]">▸</span>
            <span>
              <strong className="text-[#fca5a5]">Do not attempt a DIY PCB swap.</strong> Without a
              proper ROM or MCU transfer, a donor board will not work and you risk destroying the
              only copy of your drive&apos;s adaptive data.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="mt-0.5 shrink-0 text-[#f87171]">▸</span>
            <span>
              <strong className="text-[#fca5a5]">There is no safe DIY path forward.</strong> No
              software tool — not ddrescue, not R-Studio, not any free utility — can help a drive
              that will not spin. The hardware must be repaired first.
            </span>
          </li>
        </ul>
      </div>

      {/* ── What we can do ── */}
      <div className="rounded-xl border border-[rgba(74,222,128,0.25)] bg-[rgba(74,222,128,0.07)] p-5">
        <p className="font-semibold text-[#4ade80]">What professional recovery can do</p>
        <p className="mt-2 text-sm text-[#86efac]">
          Your data is very likely still intact on the platters. Professional recovery labs work in
          certified cleanroom environments with specialized PCB repair stations, microsoldering
          equipment, BGA rework tools, and donor drive libraries. Technicians can repair or replace
          the failed component, bring the drive online, and extract your files — even in cases where
          DIY attempts have already been made.
        </p>
        <p className="mt-3 text-sm text-[#86efac]">
          Look for a lab that offers a free evaluation and a no-data, no-charge policy — you only
          pay if recovery succeeds.
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
          Learn About Our Recovery Process ↗
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
