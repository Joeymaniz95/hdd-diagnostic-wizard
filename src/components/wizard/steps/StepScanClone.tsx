import StepLayout, { type StepNavigationProps } from "@/src/components/wizard/StepLayout";

const steps = [
  {
    n: 1,
    label: "Download and install R-Studio.",
    detail: "Get it from r-studio.com. Install it on your Windows machine. A free trial lets you see what is recoverable before buying.",
  },
  {
    n: 2,
    label: "Open R-Studio.",
    detail: "Launch it from the Start menu or desktop.",
  },
  {
    n: 3,
    label: "Select the cloned drive.",
    detail:
      'In the left panel, find your cloned drive. It may appear as a drive letter (D:, E:, etc.) or by its size. Do NOT select your Windows system drive (usually C:).',
  },
  {
    n: 4,
    label: 'Click "Scan" and leave all settings at default.',
    detail:
      "R-Studio automatically chooses the best settings. You do not need to change anything. Just click Scan.",
  },
  {
    n: 5,
    label: "Wait for the scan to finish.",
    detail:
      "This can take anywhere from 30 minutes to several hours depending on drive size. Do not interrupt it. Let it complete fully.",
  },
];

export default function StepScanClone({
  onBack,
  onNext,
  canGoBack,
  canGoNext,
}: StepNavigationProps) {
  return (
    <StepLayout
      stepLabel="Step 13"
      title="Scan the clone with R-Studio"
      subtitle="You are now working with the cloned drive — the original failing drive is safely disconnected."
      onBack={onBack}
      onNext={onNext}
      canGoBack={canGoBack}
      canGoNext={canGoNext}
    >
      <div className="space-y-3">
        <div className="rounded-xl border border-[rgba(99,102,241,0.25)] bg-[rgba(99,102,241,0.08)] p-4">
          <p className="text-sm text-[#c7d2fe]">
            R-Studio is a professional file recovery application. It will scan the cloned drive,
            find deleted or lost files, and show you what can be recovered — without touching the
            original patient drive.
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

        <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-4">
          <a
            href="https://www.r-studio.com/"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] px-5 py-3 text-sm font-medium text-white shadow-[0_4px_15px_rgba(99,102,241,0.4)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_8px_24px_rgba(99,102,241,0.5)]"
          >
            Download R-Studio
          </a>
          <p className="mt-2 text-xs text-[#9aa0ac]">
            Windows only. Free trial available.
          </p>
        </div>

        <details className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-4">
          <summary className="cursor-pointer text-sm font-semibold text-[#7b8cde]">
            Pro tip — R-Studio shows no files or a blank result?
          </summary>
          <p className="mt-2 text-sm text-[#9aa0ac]">
            If the scan comes back empty, the partition table may be corrupted. In R-Studio, look
            for a &quot;Find Previous File System&quot; option or try switching the scan type to
            &quot;Extra Found Files.&quot; If the drive still shows nothing, the damage may be more
            severe — see the finish step for professional recovery options.
          </p>
        </details>

        <details className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-4">
          <summary className="cursor-pointer text-sm font-semibold text-[#7b8cde]">
            Pro tip — R-Studio shows files but they have strange names?
          </summary>
          <p className="mt-2 text-sm text-[#9aa0ac]">
            Files without proper names (like &quot;$Recf0001&quot; or numbered folders) are files
            whose directory entries were lost but whose content survived. Browse inside them — your
            files may be intact even if the names are gone. Images can often be identified by
            thumbnail previews.
          </p>
        </details>
      </div>
    </StepLayout>
  );
}
