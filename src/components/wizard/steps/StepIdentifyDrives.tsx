import StepLayout, { type StepNavigationProps } from "@/src/components/wizard/StepLayout";

const exampleOutput = `NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
sda      8:0    0   1.0T  0 disk            ← Patient drive (failing 1 TB drive)
sdb      8:16   0   2.0T  0 disk            ← Target drive (empty 2 TB drive)
sdc      8:32   1   7.5G  0 disk            ← Your USB boot drive
└─sdc1   8:33   1   7.5G  0 part /run/media`;

export default function StepIdentifyDrives({
  onBack,
  onNext,
  canGoBack,
  canGoNext,
}: StepNavigationProps) {
  return (
    <StepLayout
      stepLabel="Step 10"
      title="Identify your drives"
      subtitle="This is the most critical safety step. Do not skip or rush it."
      onBack={onBack}
      onNext={onNext}
      canGoBack={canGoBack}
      canGoNext={canGoNext}
    >
      <div className="space-y-4">
        <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-5">
          <p className="text-[15px] text-[#e8eaed]">
            At the SystemRescue command line, type the command below and press{" "}
            <kbd className="rounded-md border border-[rgba(255,255,255,0.15)] bg-[#22263a] px-2 py-0.5 font-mono text-xs text-[#c7d2fe]">
              Enter
            </kbd>
            :
          </p>
          <div className="mt-4 overflow-x-auto rounded-lg border border-[rgba(99,102,241,0.3)] bg-[#0d0f18] px-5 py-4">
            <code className="font-mono text-[16px] font-semibold text-[#7b8cde]">lsblk</code>
          </div>
          <p className="mt-3 text-sm text-[#9aa0ac]">
            This lists every drive connected to the computer. Drive names look like{" "}
            <code className="rounded bg-[#22263a] px-1.5 py-0.5 font-mono text-xs text-[#c7d2fe]">
              /dev/sda
            </code>
            ,{" "}
            <code className="rounded bg-[#22263a] px-1.5 py-0.5 font-mono text-xs text-[#c7d2fe]">
              /dev/sdb
            </code>
            ,{" "}
            <code className="rounded bg-[#22263a] px-1.5 py-0.5 font-mono text-xs text-[#c7d2fe]">
              /dev/sdc
            </code>
            , and so on.
          </p>
        </div>

        <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-5">
          <p className="mb-3 text-sm font-semibold text-[#7b8cde]">
            Example output — match your drives by SIZE
          </p>
          <div className="overflow-x-auto rounded-lg border border-[rgba(99,102,241,0.2)] bg-[#0d0f18] px-4 py-4">
            <pre className="font-mono text-xs leading-7 text-[#9aa0ac] sm:text-sm whitespace-pre">
              {exampleOutput}
            </pre>
          </div>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-start gap-3 rounded-lg bg-[#22263a] p-3">
              <span className="mt-0.5 shrink-0 font-mono text-xs font-bold text-[#7b8cde]">
                sda
              </span>
              <span className="text-[#9aa0ac]">
                <strong className="text-[#e8eaed]">Patient drive</strong> — your failing drive, the
                one you are recovering from. Match it by its known size (in this example, 1 TB).
              </span>
            </div>
            <div className="flex items-start gap-3 rounded-lg bg-[#22263a] p-3">
              <span className="mt-0.5 shrink-0 font-mono text-xs font-bold text-[#7b8cde]">
                sdb
              </span>
              <span className="text-[#9aa0ac]">
                <strong className="text-[#e8eaed]">Target drive</strong> — your new empty drive.
                Same size or larger. This will be overwritten completely.
              </span>
            </div>
            <div className="flex items-start gap-3 rounded-lg bg-[#22263a] p-3">
              <span className="mt-0.5 shrink-0 font-mono text-xs font-bold text-[#7b8cde]">
                sdc
              </span>
              <span className="text-[#9aa0ac]">
                <strong className="text-[#e8eaed]">USB boot drive</strong> — the SystemRescue USB
                you booted from. Leave it alone.
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border-2 border-[rgba(248,113,113,0.55)] bg-[rgba(248,113,113,0.12)] p-5">
          <p className="text-lg font-bold text-[#f87171]">⛔ NEVER GUESS</p>
          <p className="mt-2 text-[15px] leading-7 text-[#fca5a5]">
            If you are not 100% certain which drive is which —{" "}
            <strong>STOP immediately.</strong> Power off the computer and connect only ONE drive at a
            time to confirm which is which before proceeding.
          </p>
          <p className="mt-3 text-sm text-[#fca5a5]">
            Cloning to the wrong drive permanently destroys the data on it. There is no undo.
          </p>
        </div>

        <details className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-4">
          <summary className="cursor-pointer text-sm font-semibold text-[#7b8cde]">
            Pro tip — both drives show the same size?
          </summary>
          <p className="mt-2 text-sm text-[#9aa0ac]">
            Power off the computer. Disconnect one drive. Boot back into SystemRescue and run{" "}
            <code className="rounded bg-[#22263a] px-1.5 py-0.5 font-mono text-xs text-[#c7d2fe]">
              lsblk
            </code>{" "}
            again to see which name disappeared — that is the drive you disconnected. Write down its
            name (sda, sdb, etc.) before reconnecting it. Label both drives physically with tape so
            you do not mix them up.
          </p>
        </details>

        <details className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-4">
          <summary className="cursor-pointer text-sm font-semibold text-[#7b8cde]">
            Pro tip — what if a drive does not appear in lsblk?
          </summary>
          <p className="mt-2 text-sm text-[#9aa0ac]">
            If a drive is not listed, check that the cable is firmly connected. Try a different
            cable or port. If the patient drive does not appear, it may have an electronics failure
            that prevents it from being detected — in that case, professional recovery is likely
            needed.
          </p>
        </details>
      </div>
    </StepLayout>
  );
}
