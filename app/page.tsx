import Wizard from "@/src/components/wizard/Wizard";
import IframeResizer from "@/src/components/IframeResizer";
import EmbedBackground from "@/src/components/EmbedBackground";

export default function Home() {
  return (
    <EmbedBackground>
      <IframeResizer />
      <main className="mx-auto w-full max-w-[1200px] px-6 pb-8 pt-8 sm:px-10 sm:pt-10 lg:px-12 lg:pt-12">
        <Wizard />
      </main>
    </EmbedBackground>
  );
}
