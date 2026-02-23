export type DriveType = "3.5_desktop" | "2.5_laptop" | "portable_usb";

export type UsbNativeBoardAnswer = "yes" | "no" | "not_sure";

export type ConnectionMethod = "sata" | "usb_only";

export type ListenTestResult =
  | "not_spinning"
  | "spins_and_stays_spinning"
  | "spins_then_spins_down"
  | "clicking";

export type SmartHealth = "good" | "caution" | "bad" | "not_detected";

export type WizardAnswers = {
  externalEnclosure: boolean | null;
  connectionMethod: ConnectionMethod | null;
  listenTest: ListenTestResult | null;
  screenshot: {
    uploadUrl: string | null;
    filename: string | null;
  };
  smart: {
    smartHealth: SmartHealth | null;
  };
};

export type WizardResult = {
  route: "STOP_SHIP" | "IMAGE_FIRST" | "SCAN_OK";
  risk: "HIGH" | "MED" | "LOW";
  reasons: string[];
  nextSteps: string[];
};
