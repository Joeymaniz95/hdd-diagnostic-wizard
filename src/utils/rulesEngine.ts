import type { WizardAnswers, WizardResult } from "@/src/types/wizard";

export function evaluateWizard(answers: WizardAnswers): WizardResult {
  if (answers.listenTest === "not_spinning") {
    return {
      route: "STOP_SHIP",
      risk: "HIGH",
      reasons: [
        "The drive is not spinning, which often points to a power or board-level hardware issue.",
      ],
      nextSteps: [
        "Stop repeated power cycles to avoid additional stress.",
        "If considering a donor board, the board number must match exactly.",
        "ROM is a small chip with unique drive data; if transfer is needed, use expert micro-soldering help.",
      ],
    };
  }

  if (answers.listenTest === "spins_then_spins_down" || answers.listenTest === "clicking") {
    return {
      route: "STOP_SHIP",
      risk: "HIGH",
      reasons: ["Spin-down or clicking sounds suggest possible internal mechanical failure."],
      nextSteps: [
        "Pause DIY read attempts for now.",
        "Request a professional recovery quote before further testing.",
      ],
    };
  }

  if (answers.listenTest === "spins_and_stays_spinning") {
    const smartHealth = answers.smart.smartHealth;

    if (smartHealth === "good") {
      return {
        route: "SCAN_OK",
        risk: "LOW",
        reasons: ["CrystalDiskInfo reports Good health."],
        nextSteps: [
          "Continue with software recovery using R-Studio.",
          "Copy important files first, before deeper scans.",
        ],
      };
    }

    if (smartHealth === "caution") {
      return {
        route: "IMAGE_FIRST",
        risk: "MED",
        reasons: ["CrystalDiskInfo reports Caution health."],
        nextSteps: [
          "Use ddrescue first to create a full image or clone.",
          "Do file recovery from that copy, not from the original drive.",
        ],
      };
    }

    if (smartHealth === "bad") {
      return {
        route: "IMAGE_FIRST",
        risk: "HIGH",
        reasons: ["CrystalDiskInfo reports Bad health."],
        nextSteps: [
          "Create a full image with ddrescue as soon as possible.",
          "Avoid heavy scans and avoid writing anything to the original disk.",
        ],
      };
    }

    return {
      route: "IMAGE_FIRST",
      risk: "MED",
      reasons: ["Health status is not confirmed, so image-first is the safer path."],
      nextSteps: [
        "Create a full image with ddrescue before deeper analysis.",
        "After imaging, continue recovery from the copy.",
      ],
    };
  }

  return {
    route: "STOP_SHIP",
    risk: "HIGH",
    reasons: ["The listen test is required before choosing a safe recovery path."],
    nextSteps: ["Complete the listen test and then continue."],
  };
}
