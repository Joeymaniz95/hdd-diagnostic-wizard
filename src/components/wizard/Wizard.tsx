"use client";

import { useEffect, useMemo, useState } from "react";
import ProgressBar from "@/src/components/wizard/ProgressBar";
import StepConnectionGuidance from "@/src/components/wizard/steps/StepConnectionGuidance";
import StepExternalEnclosure from "@/src/components/wizard/steps/StepExternalEnclosure";
import StepHowDriveWorks from "@/src/components/wizard/steps/StepHowDriveWorks";
import StepListenTest from "@/src/components/wizard/steps/StepListenTest";
import StepPcbInterface from "@/src/components/wizard/steps/StepPcbInterface";
import StepResult from "@/src/components/wizard/steps/StepResult";
import StepSmartHealth from "@/src/components/wizard/steps/StepSmartHealth";
import StepPrerequisites from "@/src/components/wizard/steps/StepPrerequisites";
import StepCreateUsb from "@/src/components/wizard/steps/StepCreateUsb";
import StepBootUsb from "@/src/components/wizard/steps/StepBootUsb";
import StepIdentifyDrives from "@/src/components/wizard/steps/StepIdentifyDrives";
import StepCloneDrive from "@/src/components/wizard/steps/StepCloneDrive";
import StepPostClone from "@/src/components/wizard/steps/StepPostClone";
import StepScanClone from "@/src/components/wizard/steps/StepScanClone";
import StepRecoverFiles from "@/src/components/wizard/steps/StepRecoverFiles";
import StepFinish from "@/src/components/wizard/steps/StepFinish";
import StepQuoteForm from "@/src/components/wizard/steps/StepQuoteForm";
import StepSpinsDown from "@/src/components/wizard/steps/StepSpinsDown";
import StepNotSpinning from "@/src/components/wizard/steps/StepNotSpinning";
import StepClicking from "@/src/components/wizard/steps/StepClicking";
import type { WizardAnswers } from "@/src/types/wizard";
import { evaluateWizard } from "@/src/utils/rulesEngine";

const STEP_LABELS: Record<string, string> = {
  how_drive_works: "How drives work",
  external_enclosure: "External enclosure",
  pcb_interface: "PCB interface",
  connection_guidance: "Connection guidance",
  listen_test: "Listen test",
  smart_health: "Drive health",
  result: "Assessment",
  prerequisites: "Prerequisites",
  create_usb: "Create USB",
  boot_usb: "Boot USB",
  identify_drives: "Identify drives",
  clone_drive: "Clone drive",
  post_clone: "After cloning",
  scan_clone: "Scan clone",
  recover_files: "Recover files",
  finish: "Finish",
  quote_form: "Get quote",
  spins_down_stop: "Recovery required",
  not_spinning_stop: "Recovery required",
  clicking_stop: "Recovery required",
};

type StepId =
  | "how_drive_works"
  | "external_enclosure"
  | "pcb_interface"
  | "connection_guidance"
  | "listen_test"
  | "smart_health"
  | "result"
  | "prerequisites"
  | "create_usb"
  | "boot_usb"
  | "identify_drives"
  | "clone_drive"
  | "post_clone"
  | "scan_clone"
  | "recover_files"
  | "finish"
  | "quote_form"
  | "spins_down_stop"
  | "not_spinning_stop"
  | "clicking_stop";

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

    if (answers.listenTest === "not_spinning") {
      ordered.push("not_spinning_stop", "quote_form");
    } else if (answers.listenTest === "spins_then_spins_down") {
      ordered.push("spins_down_stop", "quote_form");
    } else if (answers.listenTest === "clicking") {
      ordered.push("clicking_stop", "quote_form");
    } else {
      ordered.push(
        "result",
        "prerequisites",
        "create_usb",
        "boot_usb",
        "identify_drives",
        "clone_drive",
        "post_clone",
        "scan_clone",
        "recover_files",
        "finish",
        "quote_form",
      );
    }

    return ordered;
  }, [answers.externalEnclosure, answers.listenTest]);

  const boundedStepIndex = Math.min(currentStepIndex, steps.length - 1);
  const currentStep = steps[boundedStepIndex] ?? steps[0];
  const result = useMemo(() => evaluateWizard(answers), [answers]);

  const canGoBack = boundedStepIndex > 0;
  const isHardStop =
    currentStep === "not_spinning_stop" ||
    currentStep === "spins_down_stop" ||
    currentStep === "clicking_stop" ||
    (currentStep === "smart_health" && answers.smart.smartHealth === "bad");
  const stepLabels = steps.map((id) => STEP_LABELS[id] ?? id);

  const canGoNext = useMemo(() => {
    if (currentStep === "external_enclosure") return answers.externalEnclosure !== null;
    if (currentStep === "listen_test") return answers.listenTest !== null;
    if (currentStep === "smart_health") return answers.smart.smartHealth !== null && answers.smart.smartHealth !== "bad";
    if (
      currentStep === "finish" ||
      currentStep === "quote_form" ||
      currentStep === "spins_down_stop" ||
      currentStep === "not_spinning_stop" ||
      currentStep === "clicking_stop"
    ) return false;
    return true;
  }, [answers, currentStep]);

  useEffect(() => {
    console.log("[Wizard] step change", { currentStepIndex: boundedStepIndex, currentStep });
  }, [boundedStepIndex, currentStep]);

  function scrollToTop() {
    if (typeof window === "undefined") return;
    window.scrollTo(0, 0);
  }

  function goNext() {
    if (!canGoNext) return;
    scrollToTop();
    setCurrentStepIndex((previous) => {
      const safePrevious = Math.min(previous, steps.length - 1);
      return Math.min(safePrevious + 1, steps.length - 1);
    });
  }

  function goBack() {
    scrollToTop();
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

  function goToQuote() {
    scrollToTop();
    // quote_form is always the last step in the array
    setCurrentStepIndex(steps.length - 1);
  }

  function handleStepClick(targetIndex: number) {
    if (targetIndex === boundedStepIndex) return;
    if (targetIndex < boundedStepIndex) {
      scrollToTop();
      setCurrentStepIndex(targetIndex);
      return;
    }
    // Forward: only one step at a time, canGoNext must be true, no hard stop
    if (targetIndex === boundedStepIndex + 1 && canGoNext && !isHardStop) {
      scrollToTop();
      setCurrentStepIndex(targetIndex);
    }
  }

  return (
    <div className="w-full">
      <div className="mb-6 pb-4 sm:mb-7">
        <ProgressBar
          currentStep={boundedStepIndex + 1}
          totalSteps={steps.length}
          onReset={restart}
          stepLabels={stepLabels}
          onStepClick={handleStepClick}
          isHardStop={isHardStop}
          canGoNext={canGoNext}
        />
      </div>

      <div key={currentStep} className="step-enter">
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
            onGetQuote={goToQuote}
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
            onGetQuote={goToQuote}
            showQuotePlaceholder={false}
            onBack={goBack}
            onNext={goNext}
            canGoBack={canGoBack}
            canGoNext={canGoNext}
          />
        ) : null}

        {currentStep === "prerequisites" ? (
          <StepPrerequisites
            onBack={goBack}
            onNext={goNext}
            canGoBack={canGoBack}
            canGoNext={canGoNext}
          />
        ) : null}

        {currentStep === "create_usb" ? (
          <StepCreateUsb
            onBack={goBack}
            onNext={goNext}
            canGoBack={canGoBack}
            canGoNext={canGoNext}
          />
        ) : null}

        {currentStep === "boot_usb" ? (
          <StepBootUsb
            onBack={goBack}
            onNext={goNext}
            canGoBack={canGoBack}
            canGoNext={canGoNext}
          />
        ) : null}

        {currentStep === "identify_drives" ? (
          <StepIdentifyDrives
            onBack={goBack}
            onNext={goNext}
            canGoBack={canGoBack}
            canGoNext={canGoNext}
          />
        ) : null}

        {currentStep === "clone_drive" ? (
          <StepCloneDrive
            onBack={goBack}
            onNext={goNext}
            canGoBack={canGoBack}
            canGoNext={canGoNext}
          />
        ) : null}

        {currentStep === "post_clone" ? (
          <StepPostClone
            onBack={goBack}
            onNext={goNext}
            canGoBack={canGoBack}
            canGoNext={canGoNext}
          />
        ) : null}

        {currentStep === "scan_clone" ? (
          <StepScanClone
            onBack={goBack}
            onNext={goNext}
            canGoBack={canGoBack}
            canGoNext={canGoNext}
          />
        ) : null}

        {currentStep === "recover_files" ? (
          <StepRecoverFiles
            onBack={goBack}
            onNext={goNext}
            canGoBack={canGoBack}
            canGoNext={canGoNext}
          />
        ) : null}

        {currentStep === "finish" ? (
          <StepFinish
            onBack={goBack}
            onNext={goNext}
            canGoBack={canGoBack}
            canGoNext={canGoNext}
            onGetQuote={goToQuote}
          />
        ) : null}

        {currentStep === "not_spinning_stop" ? (
          <StepNotSpinning
            onBack={goBack}
            onNext={goNext}
            canGoBack={canGoBack}
            canGoNext={canGoNext}
            onGetQuote={goToQuote}
          />
        ) : null}

        {currentStep === "clicking_stop" ? (
          <StepClicking
            onBack={goBack}
            onNext={goNext}
            canGoBack={canGoBack}
            canGoNext={canGoNext}
            onGetQuote={goToQuote}
          />
        ) : null}

        {currentStep === "spins_down_stop" ? (
          <StepSpinsDown
            onBack={goBack}
            onNext={goNext}
            canGoBack={canGoBack}
            canGoNext={canGoNext}
            onGetQuote={goToQuote}
          />
        ) : null}

        {currentStep === "quote_form" ? (
          <StepQuoteForm
            onBack={goBack}
            onNext={goNext}
            canGoBack={canGoBack}
            canGoNext={canGoNext}
          />
        ) : null}
      </div>
    </div>
  );
}
