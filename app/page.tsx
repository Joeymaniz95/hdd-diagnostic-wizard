import Wizard from "@/src/components/wizard/Wizard";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-100 p-6 sm:p-10">
      <div className="mx-auto w-full max-w-3xl">
        <h1 className="text-center text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Hard Drive Diagnostic Tool
        </h1>
        <p className="mt-3 text-center text-base text-slate-600 sm:text-lg">
          Answer a few questions to determine the safest recovery path.
        </p>
        <div className="mt-8">
          <Wizard />
        </div>
      </div>
    </div>
  );
}
