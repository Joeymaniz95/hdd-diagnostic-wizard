import StepLayout, { type StepNavigationProps } from "@/src/components/wizard/StepLayout";

type StepClickingProps = StepNavigationProps & {
  onGetQuote: () => void;
};

export default function StepClicking({
  onBack,
  onNext,
  canGoBack,
  canGoNext,
  onGetQuote,
}: StepClickingProps) {
  return (
    <StepLayout
      stepLabel="Recovery Assessment"
      title="Clicking Detected — Professional Recovery Required"
      onBack={onBack}
      onNext={onNext}
      canGoBack={canGoBack}
      canGoNext={canGoNext}
      showNext={false}
    >
      {/* ── Top warning banner ── */}
      <div className="rounded-xl border-2 border-[rgba(248,113,113,0.5)] bg-[rgba(248,113,113,0.1)] p-5">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#f87171]">
          ⚠ Mechanical failure — no DIY path forward
        </p>
        <p className="mt-2 text-sm text-[#fca5a5]">
          Clicking is one of the clearest signs of a read/write head failure. Software recovery
          tools cannot help here. Continuing to power the drive on will worsen the damage and reduce
          recovery chances.
        </p>
      </div>

      {/* ── Card 1: What clicking usually means ── */}
      <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-5">
        <p className="font-semibold text-[#e8eaed]">What clicking usually means</p>
        <p className="mt-2 text-sm text-[#9aa0ac]">
          Inside every hard drive are read/write heads — tiny components that float nanometers above
          the spinning platters and read or write data. When one or more heads fail, the drive
          cannot complete its startup process or find the data it is looking for.
        </p>
        <p className="mt-3 text-sm text-[#9aa0ac]">
          The clicking sound is the head actuator arm repeatedly attempting to position the heads,
          failing, resetting to the home position, and trying again. Each click is one failed
          attempt. The drive is stuck in a loop it cannot break out of on its own.
        </p>
        <p className="mt-3 text-sm text-[#9aa0ac]">
          This is a physical and mechanical failure — not a software or file system problem. No
          operating system command, recovery utility, or scan can fix a failed head.
        </p>
      </div>

      {/* ── Card 2: Why DIY can make it worse ── */}
      <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-5">
        <p className="font-semibold text-[#e8eaed]">Why DIY can make it worse</p>
        <div className="mt-3 space-y-4 text-sm text-[#9aa0ac]">
          <div>
            <p className="font-medium text-[#c7d2fe]">Each power cycle risks platter damage</p>
            <p className="mt-1">
              When a drive with a failed head spins up, the head can drag across the platter surface
              instead of floating above it. This physically scratches the magnetic coating where
              your data is stored. Even a single power cycle can reduce the amount of recoverable
              data. Multiple power cycles can make full recovery impossible.
            </p>
          </div>
          <div>
            <p className="font-medium text-[#c7d2fe]">Software tools cannot see past the failure</p>
            <p className="mt-1">
              Tools like ddrescue and R-Studio communicate with the drive through the operating
              system. If the drive&apos;s heads cannot read the system area, the drive is either
              invisible to the operating system or goes offline almost immediately. These tools have
              no way to work around a hardware-level head failure.
            </p>
          </div>
          <div>
            <p className="font-medium text-[#c7d2fe]">Cloning attempts add stress without benefit</p>
            <p className="mt-1">
              Running a cloning tool forces the drive to spin up, seek across the platters, and
              retry reads thousands of times per minute. With a failed head, each of those seek
              operations is another opportunity for the head to contact the platter surface. The
              drive deteriorates with each session.
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
              <strong className="text-[#fca5a5]">Stop powering the drive on and off.</strong> Every
              spin-up risks the failed head contacting the platters and scratching away data.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="mt-0.5 shrink-0 text-[#f87171]">▸</span>
            <span>
              <strong className="text-[#fca5a5]">Do not run scans or cloning attempts.</strong>{" "}
              These tools cannot work with a clicking drive and the repeated seek attempts cause
              further damage.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="mt-0.5 shrink-0 text-[#f87171]">▸</span>
            <span>
              <strong className="text-[#fca5a5]">Do not open the drive outside a cleanroom.</strong>{" "}
              Dust contamination during a head replacement permanently destroys the platters. The
              drive must only be opened in an ISO-certified cleanroom environment.
            </span>
          </li>
        </ul>
      </div>

      {/* ── Card 3: What professional recovery involves ── */}
      <div className="rounded-xl border border-[rgba(74,222,128,0.25)] bg-[rgba(74,222,128,0.07)] p-5">
        <p className="font-semibold text-[#4ade80]">What professional recovery involves</p>
        <p className="mt-2 text-sm text-[#86efac]">
          Your data is very likely still on the platters — a clicking head failure does not erase
          data. In most cases, professional recovery requires opening the drive in a certified
          cleanroom and replacing the head stack assembly with a carefully matched set from a
          compatible donor drive. Once new heads are installed, technicians image the drive
          sector-by-sector and extract your files.
        </p>
        <p className="mt-3 text-sm text-[#86efac]">
          Professional labs successfully recover data from clicking drives every day. The sooner
          the drive is evaluated — and the fewer power cycles it has experienced — the better
          your chances.
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
