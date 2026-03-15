import Wizard from "@/src/components/wizard/Wizard";
import IframeResizer from "@/src/components/IframeResizer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f1117]">
      <IframeResizer />
      <main className="mx-auto w-full max-w-[1200px] px-6 pb-8 pt-8 sm:px-10 sm:pt-10 lg:px-12 lg:pt-12">
        <Wizard />
      </main>
    </div>
  );
}
