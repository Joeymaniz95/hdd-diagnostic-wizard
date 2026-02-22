import StepLayout, { type StepNavigationProps } from "@/src/components/wizard/StepLayout";

const actions = [
  {
    n: 1,
    label: "Fully power off the computer.",
    detail:
      "Shut down completely — do not just restart. A full power-off ensures all drives stop spinning before you touch any cables.",
  },
  {
    n: 2,
    label: "Disconnect the original failing drive (the patient drive).",
    detail:
      "Unplug the patient drive — the one you were recovering from. Set it aside somewhere safe. Do not reconnect it.",
  },
  {
    n: 3,
    label: "Leave your normal internal system drive connected.",
    detail:
      "The drive your computer usually boots from (your everyday Windows or macOS drive) stays exactly where it is. Do not touch it.",
  },
  {
    n: 4,
    label: "Remove the SystemRescue USB.",
    detail:
      "Take out the USB flash drive you booted from. You no longer need it for this step.",
  },
  {
    n: 5,
    label: "Power on and boot into Windows or macOS normally.",
    detail:
      "Turn the computer on. It should start from your regular internal drive as usual. Wait until you reach your normal desktop.",
  },
  {
    n: 6,
    label: "Connect the CLONED drive as a secondary drive.",
    detail:
      "Once you are at your desktop, plug in the cloned drive using a USB hard drive docking station or external enclosure. Do not install it internally.",
  },
];

export default function StepPostClone({
  onBack,
  onNext,
  canGoBack,
  canGoNext,
}: StepNavigationProps) {
  return (
    <StepLayout
      stepLabel="Step 12"
      title="Cloning is done — prepare for file recovery"
      subtitle="Follow these steps before doing anything else."
      onBack={onBack}
      onNext={onNext}
      canGoBack={canGoBack}
      canGoNext={canGoNext}
    >
      <div className="space-y-3">
        <div className="rounded-xl border border-[rgba(74,222,128,0.3)] bg-[rgba(74,222,128,0.08)] p-4">
          <p className="font-semibold text-[#4ade80]">Cloning complete</p>
          <p className="mt-1 text-sm text-[#86efac]">
            ddrescue has finished. Your data has been copied to the target drive. Now set everything
            up safely so you can recover your files without risking further damage.
          </p>
        </div>

        {actions.map(({ n, label, detail }) => (
          <div
            key={n}
            className="flex items-start gap-4 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-4"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[rgba(99,102,241,0.2)] text-sm font-bold text-[#7b8cde]">
              {n}
            </span>
            <div>
              <p className="font-semibold text-[#e8eaed]">{label}</p>
              <p className="mt-0.5 text-sm text-[#9aa0ac]">{detail}</p>
            </div>
          </div>
        ))}

        <div className="rounded-xl border border-[rgba(248,113,113,0.45)] bg-[rgba(248,113,113,0.12)] p-5">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#f87171]">
            ⚠ Critical warnings
          </p>
          <ul className="mt-3 space-y-2.5 text-sm text-[#fca5a5]">
            <li className="flex items-start gap-2.5">
              <span className="mt-0.5 shrink-0 text-[#f87171]">▸</span>
              <span>
                <strong className="text-[#fca5a5]">Do NOT boot from the cloned drive.</strong> It
                must be connected as an external secondary drive only.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-0.5 shrink-0 text-[#f87171]">▸</span>
              <span>
                <strong className="text-[#fca5a5]">
                  Do NOT let Windows or macOS &quot;scan and fix&quot; or &quot;repair&quot; the
                  cloned drive.
                </strong>{" "}
                If a prompt appears asking to repair or check the drive, click{" "}
                <strong className="text-white">Cancel</strong> immediately.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-0.5 shrink-0 text-[#f87171]">▸</span>
              <span>
                <strong className="text-[#fca5a5]">
                  Do NOT reconnect the original patient drive.
                </strong>{" "}
                Every time a damaged drive spins up, it risks further mechanical damage. Leave it
                disconnected.
              </span>
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-[rgba(99,102,241,0.25)] bg-[rgba(99,102,241,0.08)] p-4">
          <p className="text-sm font-semibold text-[#c7d2fe]">Why this matters</p>
          <p className="mt-2 text-sm text-[#9aa0ac]">
            We treat the cloned drive as a read-only recovery source. Booting from it or allowing
            automatic repairs can write data to the drive and permanently reduce how much you can
            recover. Connecting it externally and keeping your normal system drive as the boot drive
            keeps everything safe.
          </p>
        </div>
      </div>
    </StepLayout>
  );
}
