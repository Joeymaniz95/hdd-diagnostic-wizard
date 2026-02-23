import StepLayout, { type StepNavigationProps } from "@/src/components/wizard/StepLayout";

const steps = [
  {
    n: 1,
    label: "Browse the scan results.",
    detail:
      'R-Studio shows a folder tree of what it found. Look for folders that match your data: Documents, Desktop, Photos, etc. Click through to find what you need.',
  },
  {
    n: 2,
    label: "Select the files and folders you want to recover.",
    detail:
      "Check the boxes next to each folder or file you want. You can select multiple items at once. Prioritize the most important data first.",
  },
  {
    n: 3,
    label: 'Click "Recover."',
    detail: "A dialog will appear asking where to save the recovered files.",
  },
  {
    n: 4,
    label: "Choose your destination drive.",
    detail:
      "Select a separate external drive (recommended) or your computer's internal drive if it has enough free space — not the cloned drive and not the patient drive. Navigate to it in the dialog and click OK.",
  },
  {
    n: 5,
    label: "Wait for recovery to finish.",
    detail:
      "Do not interrupt this process. When it completes, open the destination folder and verify that your files are there and can be opened.",
  },
];

export default function StepRecoverFiles({
  onBack,
  onNext,
  canGoBack,
  canGoNext,
}: StepNavigationProps) {
  return (
    <StepLayout
      stepLabel="Step 14"
      title="Recover your files"
      subtitle="Save recovered files to a separate third drive — or to your computer's internal drive if it has enough free space. Never save files back onto the clone."
      onBack={onBack}
      onNext={onNext}
      canGoBack={canGoBack}
      canGoNext={canGoNext}
    >
      <div className="space-y-3">
        <div className="rounded-xl border-2 border-[rgba(248,113,113,0.5)] bg-[rgba(248,113,113,0.12)] p-5">
          <p className="font-bold text-[#f87171]">⚠ Never save recovered files back onto the clone or the patient drive</p>
          <p className="mt-2 text-sm text-[#fca5a5]">
            You may save recovered files to:
          </p>
          <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm text-[#fca5a5]">
            <li>A separate external drive (recommended), OR</li>
            <li>Your computer&apos;s internal drive, as long as it has enough available space.</li>
          </ul>
          <p className="mt-2 text-sm font-semibold text-[#f87171]">
            Never save to the cloned drive. Never save to the original patient drive.
          </p>
        </div>

        {steps.map(({ n, label, detail }) => (
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

        <div className="rounded-xl border border-[rgba(248,113,113,0.4)] bg-[rgba(248,113,113,0.12)] p-4">
          <p className="font-semibold text-[#f87171]">
            ⚠ Never recover files back onto the cloned drive
          </p>
          <p className="mt-1.5 text-sm text-[#fca5a5]">
            Saving recovered files onto the clone can overwrite sectors that contain data you have
            not yet recovered. Once overwritten, that data is gone permanently. Always use a
            different destination — a separate external drive or your computer&apos;s internal drive.
          </p>
        </div>

        <div className="rounded-xl border border-[rgba(99,102,241,0.25)] bg-[rgba(99,102,241,0.08)] p-4">
          <p className="text-sm font-semibold text-[#c7d2fe]">Safety recap — three drives, three roles</p>
          <div className="mt-3 space-y-2 text-sm text-[#9aa0ac]">
            <div className="flex items-start gap-2.5">
              <span className="shrink-0 text-[#7b8cde]">①</span>
              <span>
                <strong className="text-[#e8eaed]">Patient drive</strong> — disconnected and stored
                safely. Do not touch it.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="shrink-0 text-[#7b8cde]">②</span>
              <span>
                <strong className="text-[#e8eaed]">Cloned drive</strong> — connected and scanned by
                R-Studio. Read only — do not save anything to it.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="shrink-0 text-[#7b8cde]">③</span>
              <span>
                <strong className="text-[#e8eaed]">Destination drive</strong> — where your recovered
                files land. This can be a separate external drive (recommended), or your
                computer&apos;s internal drive if it has enough free space.
              </span>
            </div>
          </div>
        </div>

        <details className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-4">
          <summary className="cursor-pointer text-sm font-semibold text-[#7b8cde]">
            Pro tip — recovered files do not open or look corrupted?
          </summary>
          <p className="mt-2 text-sm text-[#9aa0ac]">
            Some files may not open if their sectors were unreadable. Try recovering them anyway —
            many images and documents survive partial reads and can still be opened. For critical
            files that are corrupted, professional labs have specialized tools that can sometimes
            reconstruct them from partial data.
          </p>
        </details>
      </div>
    </StepLayout>
  );
}
