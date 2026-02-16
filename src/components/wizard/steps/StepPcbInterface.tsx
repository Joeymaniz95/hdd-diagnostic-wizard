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
      <div className="rounded-xl border border-slate-200 bg-white p-4 text-slate-700 shadow-sm">
        <p>Now that the drive is out of the enclosure, check the circuit board (PCB) on the bottom.</p>
      </div>

      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-700 lg:mt-3">
        <p>If your drive has a removable USB adapter board (USB-to-SATA bridge), disconnect it.</p>
        <p className="mt-2">This small board is only used inside external enclosures.</p>
        <p className="mt-2">
          If the USB connector is soldered directly onto the main PCB, do NOT attempt removal.
        </p>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:mt-3 lg:gap-3">
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4 shadow-sm">
          <Image
            src="/illustrations/25-drive-unplugged.png"
            alt="2.5-inch drive with removable USB board"
            width={900}
            height={560}
            className="h-auto w-full object-contain lg:max-h-[190px]"
          />
          <p className="mt-3 text-center text-sm font-medium text-slate-600">
            2.5-inch drive with removable USB board
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4 shadow-sm">
          <Image
            src="/illustrations/35-drive-unplugged.png"
            alt="3.5-inch drive with removable USB board"
            width={900}
            height={560}
            className="h-auto w-full object-contain lg:max-h-[190px]"
          />
          <p className="mt-3 text-center text-sm font-medium text-slate-600">
            3.5-inch drive with removable USB board
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-700 lg:mt-3">
        <p className="font-semibold text-slate-900">What is the SATA connection?</p>
        <p className="mt-2">
          The SATA connection is the standard data and power connector used by internal hard drives.
        </p>
        <p className="mt-2">
          It consists of two L-shaped connectors next to each other.
        </p>
        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
          <Image
            src="/illustrations/sata-connector-highlight.png"
            alt="SATA data and power connectors"
            width={900}
            height={560}
            className="h-auto w-full object-contain lg:max-h-[180px]"
          />
          <p className="mt-3 text-center text-sm font-medium text-slate-600">
            SATA data and power connectors (two L-shaped connectors)
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-700 lg:mt-3">
        <p className="font-semibold text-slate-900">USB Soldered Directly to the PCB</p>
        <p className="mt-2">
          If the USB connector is soldered directly onto the main PCB, it cannot be removed.
        </p>
        <p className="mt-2">
          In this case, we will attempt recovery using the USB connection.
        </p>
        <p className="mt-2 font-medium text-amber-900">
          Do NOT attempt to desolder or modify the board.
        </p>
        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
          <Image
            src="/illustrations/usb-native-highlight.png"
            alt="USB connector soldered directly to the PCB"
            width={900}
            height={560}
            className="h-auto w-full object-contain lg:max-h-[180px]"
          />
          <p className="mt-3 text-center text-sm font-medium text-slate-600">
            USB connector soldered directly to the PCB (USB-native drive)
          </p>
        </div>
      </div>
    </StepLayout>
  );
}
