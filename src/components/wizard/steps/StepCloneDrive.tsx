import StepLayout, { type StepNavigationProps } from "@/src/components/wizard/StepLayout";

export default function StepCloneDrive({
  onBack,
  onNext,
  canGoBack,
  canGoNext,
}: StepNavigationProps) {
  return (
    <StepLayout
      stepLabel="Step 11"
      title="Clone the drive using ddrescue"
      subtitle="ddrescue copies as much data as possible from the failing drive to the target — safely and in the right order."
      onBack={onBack}
      onNext={onNext}
      canGoBack={canGoBack}
      canGoNext={canGoNext}
    >
      <div className="space-y-4">
        {/* Pass 1 */}
        <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-5">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#7b8cde]">
            Pass 1 — Fast copy (no retries)
          </p>
          <p className="mt-2 text-sm text-[#9aa0ac]">
            Type this command. Replace{" "}
            <code className="rounded bg-[#22263a] px-1 py-0.5 font-mono text-xs text-[#c7d2fe]">
              sdX
            </code>{" "}
            with your patient drive name and{" "}
            <code className="rounded bg-[#22263a] px-1 py-0.5 font-mono text-xs text-[#c7d2fe]">
              sdY
            </code>{" "}
            with your target drive name from the previous step.
          </p>
          <div className="mt-3 overflow-x-auto rounded-lg border border-[rgba(99,102,241,0.3)] bg-[#0d0f18] px-5 py-4">
            <code className="font-mono text-sm font-semibold text-[#7b8cde]">
              ddrescue -f -n /dev/sdX /dev/sdY rescue.log
            </code>
          </div>
          <div className="mt-3 space-y-2 text-sm text-[#9aa0ac]">
            <p>
              <code className="rounded bg-[#22263a] px-1.5 font-mono text-xs text-[#c7d2fe]">
                /dev/sdX
              </code>{" "}
              = patient drive — your failing drive (the source)
            </p>
            <p>
              <code className="rounded bg-[#22263a] px-1.5 font-mono text-xs text-[#c7d2fe]">
                /dev/sdY
              </code>{" "}
              = target drive — your new empty drive (the destination)
            </p>
            <p>
              <code className="rounded bg-[#22263a] px-1.5 font-mono text-xs text-[#c7d2fe]">
                rescue.log
              </code>{" "}
              = progress file that tracks what was copied so you can resume if needed
            </p>
          </div>
          <p className="mt-3 text-xs text-[#9aa0ac]">
            Pass 1 skips difficult sectors and copies what it can quickly. Let it run until it
            finishes on its own.
          </p>
        </div>

        {/* Pass 2 */}
        <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-5">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#7b8cde]">
            Pass 2 — Retry difficult sectors
          </p>
          <p className="mt-2 text-sm text-[#9aa0ac]">
            After Pass 1 finishes, run this second command. It retries the sectors that could not be
            read in Pass 1. This can take many hours or even days on a heavily damaged drive.
          </p>
          <div className="mt-3 overflow-x-auto rounded-lg border border-[rgba(99,102,241,0.3)] bg-[#0d0f18] px-5 py-4">
            <code className="font-mono text-sm font-semibold text-[#7b8cde]">
              ddrescue -d -f -r3 /dev/sdX /dev/sdY rescue.log
            </code>
          </div>
          <p className="mt-3 text-xs text-[#9aa0ac]">
            The{" "}
            <code className="rounded bg-[#22263a] px-1 font-mono text-xs text-[#c7d2fe]">-r3</code>{" "}
            flag tells ddrescue to retry bad areas up to 3 times before giving up on them. The same{" "}
            <code className="rounded bg-[#22263a] px-1 font-mono text-xs text-[#c7d2fe]">
              rescue.log
            </code>{" "}
            file is reused — ddrescue picks up exactly where it left off.
          </p>
        </div>

        {/* Critical rules */}
        <div className="rounded-xl border border-[rgba(248,113,113,0.4)] bg-[rgba(248,113,113,0.12)] p-5">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#f87171]">
            ⚠ Critical rules — read before you run the command
          </p>
          <ul className="mt-3 space-y-2.5 text-sm text-[#fca5a5]">
            <li className="flex items-start gap-2.5">
              <span className="mt-0.5 shrink-0 text-[#f87171]">▸</span>
              <span>
                The target drive (
                <code className="rounded bg-[rgba(255,255,255,0.07)] px-1 font-mono text-xs">
                  sdY
                </code>
                ) will be completely overwritten. Double-check the drive names before pressing Enter.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-0.5 shrink-0 text-[#f87171]">▸</span>
              <span>
                Do NOT reverse{" "}
                <code className="rounded bg-[rgba(255,255,255,0.07)] px-1 font-mono text-xs">
                  sdX
                </code>{" "}
                and{" "}
                <code className="rounded bg-[rgba(255,255,255,0.07)] px-1 font-mono text-xs">
                  sdY
                </code>
                . Patient = source. Target = destination. Reversing them will erase your patient
                drive.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-0.5 shrink-0 text-[#f87171]">▸</span>
              <span>
                Keep your laptop plugged in the entire time. A power loss mid-clone may require
                restarting from the beginning.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-0.5 shrink-0 text-[#f87171]">▸</span>
              <span>
                Use a SATA docking station or enclosure when possible. Loose USB cables can
                disconnect mid-clone and corrupt the log file.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-0.5 shrink-0 text-[#f87171]">▸</span>
              <span>
                If the patient drive starts clicking loudly during cloning, stop immediately —
                disconnect it and contact a professional recovery lab.
              </span>
            </li>
          </ul>
        </div>

        {/* Safety recap */}
        <div className="rounded-xl border border-[rgba(99,102,241,0.25)] bg-[rgba(99,102,241,0.08)] p-4">
          <p className="text-sm font-semibold text-[#c7d2fe]">Safety recap</p>
          <p className="mt-2 text-sm text-[#9aa0ac]">
            ddrescue reads the failing drive as few times as possible and writes everything it can
            to the target. The log file means you can pause and resume safely. After cloning, all
            further work happens on the clone — never on the original patient drive.
          </p>
        </div>

        <details className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-4">
          <summary className="cursor-pointer text-sm font-semibold text-[#7b8cde]">
            Pro tip — ddrescue seems frozen or stuck on one sector?
          </summary>
          <p className="mt-2 text-sm text-[#9aa0ac]">
            If the counter has not moved for 30 or more minutes on the same position, the drive may
            be severely damaged in that area. You can safely press{" "}
            <kbd className="rounded border border-[rgba(255,255,255,0.15)] bg-[#22263a] px-1.5 py-0.5 font-mono text-xs text-[#c7d2fe]">
              Ctrl+C
            </kbd>{" "}
            to stop and then run Pass 2 directly — it will retry the stuck areas. If it keeps
            freezing, professional recovery may be necessary.
          </p>
        </details>

        <details className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-4">
          <summary className="cursor-pointer text-sm font-semibold text-[#7b8cde]">
            Pro tip — what if the drive disconnects mid-clone?
          </summary>
          <p className="mt-2 text-sm text-[#9aa0ac]">
            If the patient drive disconnects, stop ddrescue (
            <kbd className="rounded border border-[rgba(255,255,255,0.15)] bg-[#22263a] px-1.5 py-0.5 font-mono text-xs text-[#c7d2fe]">
              Ctrl+C
            </kbd>
            ), reconnect it firmly, and run the same command again. The{" "}
            <code className="rounded bg-[#22263a] px-1 font-mono text-xs text-[#c7d2fe]">
              rescue.log
            </code>{" "}
            file will let ddrescue resume without re-copying everything.
          </p>
        </details>

        <details className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-4">
          <summary className="cursor-pointer text-sm font-semibold text-[#7b8cde]">
            Pro tip — target drive is slightly smaller than patient drive?
          </summary>
          <p className="mt-2 text-sm text-[#9aa0ac]">
            The target drive must be the same size or larger. Even a drive advertised as the same
            size from a different manufacturer may be a few gigabytes smaller. If ddrescue stops
            with an error about size, you need a larger drive before proceeding.
          </p>
        </details>
      </div>
    </StepLayout>
  );
}
