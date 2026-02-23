import Image from "next/image";
import StepLayout, { type StepNavigationProps } from "@/src/components/wizard/StepLayout";

export default function StepPcbInterface({
  onBack,
  onNext,
  canGoBack,
  canGoNext,
}: StepNavigationProps) {
  return (
    <StepLayout
      stepLabel="Step 3"
      title="Remove the USB Adapter (If Present)"
      onBack={onBack}
      onNext={onNext}
      canGoBack={canGoBack}
      canGoNext={canGoNext}
    >
      <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-4 text-[#e8eaed] shadow-[0_4px_24px_rgba(0,0,0,0.35)]">
        <p>Now that the drive is out of the enclosure, check the circuit board (PCB) on the bottom.</p>
      </div>

      <div className="mt-4 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#22263a] p-4 text-[#e8eaed] lg:mt-3">
        <p>If your drive has a removable USB adapter board (USB-to-SATA bridge), disconnect it.</p>
        <p className="mt-2">This small board is only used inside external enclosures.</p>
        <p className="mt-2">
          If the USB connector is soldered directly onto the main PCB, do NOT attempt removal.
        </p>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:mt-3 lg:gap-3">
        <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#22263a] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.35)]">
          <div className="h-[300px] w-full overflow-hidden rounded-xl">
            <Image
              src="/illustrations/25-drive-unplugged.png"
              alt="2.5-inch drive with removable USB board"
              width={900}
              height={560}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <p className="mt-3 text-center text-sm font-medium text-[#9aa0ac]">
            2.5-inch drive with removable USB board
          </p>
        </div>
        <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#22263a] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.35)]">
          <div className="h-[300px] w-full overflow-hidden rounded-xl">
            <Image
              src="/illustrations/35-drive-unplugged.png"
              alt="3.5-inch drive with removable USB board"
              width={900}
              height={560}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <p className="mt-3 text-center text-sm font-medium text-[#9aa0ac]">
            3.5-inch drive with removable USB board
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#22263a] p-4 text-[#e8eaed] lg:mt-3">
        <p className="font-semibold text-white">What is the SATA connection?</p>
        <p className="mt-2">The SATA connection is the standard data and power connector used by internal hard drives.</p>
        <p className="mt-2">It consists of two L-shaped connectors next to each other.</p>
        <div className="mt-4 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-3 shadow-[0_4px_24px_rgba(0,0,0,0.35)]">
          <Image
            src="/illustrations/sata-connector-highlight.png"
            alt="SATA data and power connectors"
            width={900}
            height={560}
            className="max-h-[350px] w-full rounded-xl object-cover object-center"
          />
          <p className="mt-3 text-center text-sm font-medium text-[#9aa0ac]">
            SATA data and power connectors (two L-shaped connectors)
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#22263a] p-4 text-[#e8eaed] lg:mt-3">
        <p className="font-semibold text-white">USB Soldered Directly to the PCB</p>
        <p className="mt-2">If the USB connector is soldered directly onto the main PCB, it cannot be removed.</p>
        <p className="mt-2">In this case, we will attempt recovery using the USB connection.</p>
        <p className="mt-2 font-medium text-[#fbbf24]">Do NOT attempt to desolder or modify the board.</p>
        <div className="mt-4 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-3 shadow-[0_4px_24px_rgba(0,0,0,0.35)]">
          <Image
            src="/illustrations/hdd-usb.png"
            alt="Hard drive with USB connector soldered directly to the PCB"
            width={900}
            height={560}
            className="max-h-[350px] w-full rounded-xl object-cover object-center"
          />
          <p className="mt-3 text-center text-sm font-medium text-[#9aa0ac]">
            USB connector soldered directly to the PCB (USB-native drive)
          </p>
        </div>
      </div>
    </StepLayout>
  );
}
