"use client";

import { useEffect, useMemo, useState } from "react";
import StepConnectionGuidance from "@/src/components/wizard/steps/StepConnectionGuidance";
import StepExternalEnclosure from "@/src/components/wizard/steps/StepExternalEnclosure";
import StepHowDriveWorks from "@/src/components/wizard/steps/StepHowDriveWorks";
import StepListenTest from "@/src/components/wizard/steps/StepListenTest";
import StepPcbInterface from "@/src/components/wizard/steps/StepPcbInterface";
import StepResult from "@/src/components/wizard/steps/StepResult";
import StepSmartHealth from "@/src/components/wizard/steps/StepSmartHealth";
import type { WizardAnswers } from "@/src/types/wizard";
import { evaluateWizard } from "@/src/utils/rulesEngine";

type StepId =
  | "how_drive_works"
  | "external_enclosure"
  | "pcb_interface"
  | "connection_guidance"
  | "listen_test"
  | "smart_health"
  | "result";

const initialAnswers: WizardAnswers = {
  externalEnclosure: null,
  connectionMethod: null,
  listenTest: null,
  screenshot: {
    uploadUrl: null,
    filename: null,
  },
  smart: {
    smartHealth: null,
  },
};

export default function Wizard() {
  const [answers, setAnswers] = useState<WizardAnswers>(initialAnswers);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showQuotePlaceholder, setShowQuotePlaceholder] = useState(false);

  const steps = useMemo<StepId[]>(() => {
    const ordered: StepId[] = ["how_drive_works", "external_enclosure"];

    if (answers.externalEnclosure !== false) {
      ordered.push("pcb_interface");
    }

    ordered.push("connection_guidance", "listen_test");

    if (answers.listenTest === "spins_and_stays_spinning") {
      ordered.push("smart_health");
    }

    ordered.push("result");
    return ordered;
  }, [answers.externalEnclosure, answers.listenTest]);

  const boundedStepIndex = Math.min(currentStepIndex, steps.length - 1);
  const currentStep = steps[boundedStepIndex] ?? steps[0];
  const result = useMemo(() => evaluateWizard(answers), [answers]);

  const canGoBack = boundedStepIndex > 0;

  const canGoNext = useMemo(() => {
    if (currentStep === "external_enclosure") return answers.externalEnclosure !== null;
    if (currentStep === "listen_test") return answers.listenTest !== null;
    if (currentStep === "smart_health") return answers.smart.smartHealth !== null;
    if (currentStep === "result") return false;
    return true;
  }, [answers, currentStep]);

  useEffect(() => {
    console.log("[Wizard] step change", { currentStepIndex: boundedStepIndex, currentStep });
  }, [boundedStepIndex, currentStep]);

  function goNext() {
    setCurrentStepIndex((previous) => {
      const safePrevious = Math.min(previous, steps.length - 1);
      return Math.min(safePrevious + 1, steps.length - 1);
    });
  }

  function goBack() {
    setCurrentStepIndex((previous) => {
      const safePrevious = Math.min(previous, steps.length - 1);
      return Math.max(safePrevious - 1, 0);
    });
  }

  function restart() {
    setAnswers(initialAnswers);
    setShowQuotePlaceholder(false);
    setCurrentStepIndex(0);
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      {currentStep === "how_drive_works" ? (
        <StepHowDriveWorks
          onBack={goBack}
          onNext={goNext}
          canGoBack={canGoBack}
          canGoNext={canGoNext}
        />
      ) : null}

      {currentStep === "external_enclosure" ? (
        <StepExternalEnclosure
          value={answers.externalEnclosure}
          onChange={(value) => setAnswers((prev) => ({ ...prev, externalEnclosure: value }))}
          onBack={goBack}
          onNext={goNext}
          canGoBack={canGoBack}
          canGoNext={canGoNext}
        />
      ) : null}

      {currentStep === "pcb_interface" ? (
        <StepPcbInterface
          onBack={goBack}
          onNext={goNext}
          canGoBack={canGoBack}
          canGoNext={canGoNext}
        />
      ) : null}

      {currentStep === "connection_guidance" ? (
        <StepConnectionGuidance
          onBack={goBack}
          onNext={goNext}
          canGoBack={canGoBack}
          canGoNext={canGoNext}
        />
      ) : null}

      {currentStep === "listen_test" ? (
        <StepListenTest
          value={answers.listenTest}
          onChange={(value) => setAnswers((prev) => ({ ...prev, listenTest: value }))}
          onBack={goBack}
          onNext={goNext}
          canGoBack={canGoBack}
          canGoNext={canGoNext}
        />
      ) : null}

      {currentStep === "smart_health" ? (
        <StepSmartHealth
          value={answers.smart.smartHealth}
          onChange={(value) =>
            setAnswers((prev) => ({
              ...prev,
              smart: {
                ...prev.smart,
                smartHealth: value,
              },
            }))
          }
          onBack={goBack}
          onNext={goNext}
          canGoBack={canGoBack}
          canGoNext={canGoNext}
        />
      ) : null}

      {currentStep === "result" ? (
        <StepResult
          answers={answers}
          result={result}
          onContinueDiy={() => setShowQuotePlaceholder(false)}
          onGetQuote={() => setShowQuotePlaceholder(true)}
          onRestart={restart}
          showQuotePlaceholder={showQuotePlaceholder}
          onBack={goBack}
          onNext={goNext}
          canGoBack={canGoBack}
          canGoNext={canGoNext}
        />
      ) : null}
    </div>
  );
}
