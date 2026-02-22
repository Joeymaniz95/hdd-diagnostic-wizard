import StepLayout, { type StepNavigationProps } from "@/src/components/wizard/StepLayout";

const bootKeys = [
  { brand: "Dell", keys: "F12" },
  { brand: "HP", keys: "F9 or Esc" },
  { brand: "Lenovo", keys: "F12 or Fn+F12" },
  { brand: "ASUS", keys: "F8 or Esc" },
  { brand: "Acer", keys: "F12" },
  { brand: "MSI", keys: "F11" },
  { brand: "Gigabyte", keys: "F12" },
  { brand: "Surface / Others", keys: "Try F2, F10, DEL, or ESC" },
];

export default function StepBootUsb({
  onBack,
  onNext,
  canGoBack,
  canGoNext,
}: StepNavigationProps) {
  return (
    <StepLayout
      stepLabel="Step 9"
      title="Boot from the USB"
      subtitle="You need to start the computer from the USB drive instead of Windows."
      onBack={onBack}
      onNext={onNext}
      canGoBack={canGoBack}
      canGoNext={canGoNext}
    >
      <div className="space-y-3">
        <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-5">
          <p className="font-semibold text-[#e8eaed]">Step by step</p>
          <ol className="mt-3 space-y-3 text-[15px]">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgba(99,102,241,0.2)] text-xs font-bold text-[#7b8cde]">
                1
              </span>
              <span className="text-[#9aa0ac]">
                Make sure your USB is plugged in, then{" "}
                <strong className="text-[#e8eaed]">restart your computer.</strong>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgba(99,102,241,0.2)] text-xs font-bold text-[#7b8cde]">
                2
              </span>
              <span className="text-[#9aa0ac]">
                As the screen turns on — right as the manufacturer logo appears —{" "}
                <strong className="text-[#e8eaed]">immediately press your boot menu key.</strong>{" "}
                Find your brand in the table below.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgba(99,102,241,0.2)] text-xs font-bold text-[#7b8cde]">
                3
              </span>
              <span className="text-[#9aa0ac]">
                A boot menu will appear. Use the arrow keys to{" "}
                <strong className="text-[#e8eaed]">
                  select your USB drive
                </strong>{" "}
                (it will say something like &quot;USB Storage Device&quot; or the USB brand name),
                then press Enter.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgba(99,102,241,0.2)] text-xs font-bold text-[#7b8cde]">
                4
              </span>
              <span className="text-[#9aa0ac]">
                You will see a text-based menu on a dark background. This is normal.{" "}
                <strong className="text-[#e8eaed]">
                  Select the first / default option
                </strong>{" "}
                (usually &quot;Boot SystemRescue&quot;) and press Enter.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgba(99,102,241,0.2)] text-xs font-bold text-[#7b8cde]">
                5
              </span>
              <span className="text-[#9aa0ac]">
                SystemRescue will load and land you at a{" "}
                <strong className="text-[#e8eaed]">command line prompt.</strong> You are ready for
                the next step.
              </span>
            </li>
          </ol>
        </div>

        <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-4">
          <p className="mb-3 text-sm font-semibold text-[#7b8cde]">Boot menu keys by brand</p>
          <div className="divide-y divide-[rgba(255,255,255,0.04)]">
            {bootKeys.map(({ brand, keys }) => (
              <div key={brand} className="flex items-center justify-between py-2.5 text-sm">
                <span className="text-[#9aa0ac]">{brand}</span>
                <span className="font-mono font-semibold text-[#e8eaed]">{keys}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-[rgba(99,102,241,0.25)] bg-[rgba(99,102,241,0.08)] p-4">
          <p className="text-sm font-semibold text-[#c7d2fe]">What you will see</p>
          <p className="mt-2 text-sm text-[#9aa0ac]">
            SystemRescue shows a plain text menu on a black background with white or colored text.
            This is not an error — it is intentional. The tool is working correctly. Use arrow keys
            and Enter to navigate.
          </p>
        </div>

        <details className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-4">
          <summary className="cursor-pointer text-sm font-semibold text-[#7b8cde]">
            Pro tip — boot menu not appearing?
          </summary>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-[#9aa0ac]">
            <li>
              Press the key faster — right as the logo first appears. Timing is everything. Try
              tapping the key repeatedly as the screen comes on.
            </li>
            <li>
              If the computer boots into Windows instead, restart and try again with a different key
              from the table.
            </li>
            <li>
              Some computers require you to enter BIOS settings (usually by pressing DEL or F2 on
              startup) and change the boot order. Search your computer brand + &quot;change boot
              order&quot; for instructions specific to your machine.
            </li>
            <li>
              Secure Boot may block loading. In BIOS settings, try disabling Secure Boot
              temporarily.
            </li>
          </ul>
        </details>
      </div>
    </StepLayout>
  );
}
