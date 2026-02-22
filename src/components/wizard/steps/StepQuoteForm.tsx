import { useState } from "react";
import StepLayout, { type StepNavigationProps } from "@/src/components/wizard/StepLayout";

// ─── Types ───────────────────────────────────────────────────────────────────

type StepQuoteFormProps = StepNavigationProps & {
  onRestart: () => void;
};

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  driveType: string;
  brand: string;
  modelNumber: string;
  capacity: string;
  connectionType: string;
  whatHappened: string;
  whenStarted: string;
  isDetectable: string;
  unusualSounds: string;
  recoveryAttempted: string;
  recoveryDetails: string;
  dataImportance: string;
  turnaround: string;
  consentChecked: boolean;
};

// ─── Constants ───────────────────────────────────────────────────────────────

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "HI",
  "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN",
  "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH",
  "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA",
  "WV", "WI", "WY",
];

const DRIVE_TYPES = ["HDD", "SSD", "External", "USB Flash", "SD Card", "Other"];
const CAPACITIES = ["256 GB", "512 GB", "1 TB", "2 TB", "4 TB", "8 TB", "10 TB+", "Not sure"];
const CONNECTION_TYPES = ["SATA", "USB", "NVMe", "SAS", "Not sure"];
const WHEN_STARTED = ["Today", "Past week", "Past month", "Longer"];
const DETECTABLE_OPTIONS = ["Yes", "No", "Not sure"];
const SOUND_OPTIONS = ["Clicking", "Beeping", "Spinning normally", "Not sure"];
const IMPORTANCE_OPTIONS = ["Critical", "Important", "Nice to have"];
const TURNAROUND_OPTIONS = ["Standard", "Rush"];

const initialData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  driveType: "",
  brand: "",
  modelNumber: "",
  capacity: "",
  connectionType: "",
  whatHappened: "",
  whenStarted: "",
  isDetectable: "",
  unusualSounds: "",
  recoveryAttempted: "",
  recoveryDetails: "",
  dataImportance: "",
  turnaround: "",
  consentChecked: false,
};

// ─── Shared sub-components ────────────────────────────────────────────────────

function SectionHeader({ label }: { label: string }) {
  return (
    <p className="mb-4 text-[11px] font-semibold uppercase tracking-[2px] text-[#7b8cde]">
      {label}
    </p>
  );
}

function FieldLabel({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-semibold text-[#9aa0ac]">
      {children}
      {required ? <span className="ml-0.5 text-[#f87171]"> *</span> : null}
    </label>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1 text-xs text-[#f87171]">{msg}</p>;
}

function inputCls(hasError: boolean) {
  const base =
    "mt-1.5 w-full rounded-xl border bg-[#0d0f18] px-4 py-3 text-sm text-[#e8eaed] placeholder-[#3d4557] outline-none transition duration-150 focus:border-[#6366f1] focus:ring-1 focus:ring-[rgba(99,102,241,0.35)]";
  return hasError
    ? `${base} border-[rgba(248,113,113,0.55)]`
    : `${base} border-[rgba(255,255,255,0.1)]`;
}

function RadioGroup({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  const colClass =
    options.length === 2
      ? "grid-cols-2"
      : options.length === 3
        ? "grid-cols-3"
        : options.length === 4
          ? "grid-cols-2 sm:grid-cols-4"
          : "grid-cols-2 sm:grid-cols-3";

  return (
    <div className={`grid gap-2 ${colClass}`}>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-150 active:scale-[0.98] ${
            value === opt
              ? "border-[#6366f1] bg-[rgba(99,102,241,0.12)] text-[#c7d2fe] shadow-[0_0_10px_rgba(99,102,241,0.2)]"
              : "border-[rgba(255,255,255,0.08)] bg-[#0d0f18] text-[#9aa0ac] hover:border-[#6366f1] hover:text-[#e8eaed]"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function StepQuoteForm({
  onBack,
  onNext,
  canGoBack,
  canGoNext,
  onRestart,
}: StepQuoteFormProps) {
  const [data, setData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [attachments, setAttachments] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(field: keyof FormData, value: string | boolean) {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as string];
        return next;
      });
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files));
    }
  }

  function validate(): boolean {
    const e: Record<string, string> = {};

    if (!data.fullName.trim()) e.fullName = "Full name is required.";
    if (!data.email.trim()) {
      e.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      e.email = "Enter a valid email address.";
    }
    if (!data.phone.trim()) e.phone = "Phone number is required.";
    if (!data.address1.trim()) e.address1 = "Address is required.";
    if (!data.city.trim()) e.city = "City is required.";
    if (!data.state) e.state = "State is required.";
    if (!data.zip.trim()) e.zip = "ZIP code is required.";
    if (!data.driveType) e.driveType = "Please select a drive type.";
    if (!data.modelNumber.trim()) e.modelNumber = "Model number is required.";
    if (!data.whatHappened.trim()) e.whatHappened = "Please describe what happened.";
    if (!data.isDetectable) e.isDetectable = "Please select an option.";
    if (!data.unusualSounds) e.unusualSounds = "Please select an option.";
    if (!data.recoveryAttempted) e.recoveryAttempted = "Please select an option.";
    if (!data.dataImportance) e.dataImportance = "Please select an option.";
    if (!data.consentChecked) e.consentChecked = "You must agree to continue.";

    setErrors(e);

    if (Object.keys(e).length > 0) {
      const firstKey = Object.keys(e)[0];
      const el = document.getElementById(firstKey);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...data,
      attachments: attachments.map((f) => ({ name: f.name, size: f.size })),
    };
    console.log("[QuoteForm] Submission payload:", payload);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ── Success screen ──────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <StepLayout
        stepLabel="Quote"
        title="Request received"
        onBack={onBack}
        onNext={onNext}
        canGoBack={canGoBack}
        canGoNext={canGoNext}
        showNext={false}
      >
        <div className="space-y-4">
          <div className="rounded-xl border border-[rgba(74,222,128,0.35)] bg-[rgba(74,222,128,0.1)] p-6 text-center">
            <p className="text-4xl" aria-hidden="true">
              ✅
            </p>
            <p className="mt-3 text-xl font-semibold text-[#4ade80]">
              Thanks — we received your request
            </p>
            <p className="mt-2 text-sm text-[#86efac]">
              Our team will review your submission and contact you shortly.
            </p>
          </div>

          <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-5">
            <p className="text-sm font-semibold text-[#e8eaed]">What happens next</p>
            <ul className="mt-3 space-y-2.5 text-sm text-[#9aa0ac]">
              <li className="flex items-start gap-2.5">
                <span className="shrink-0 text-[#7b8cde]">①</span>
                <span>
                  Our recovery team will review your case and reach out via email or phone.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="shrink-0 text-[#7b8cde]">②</span>
                <span>
                  You will receive shipping instructions to safely send your drive to our lab.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="shrink-0 text-[#7b8cde]">③</span>
                <span>
                  A free evaluation is performed. No data recovered means no charge.
                </span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-[rgba(248,113,113,0.35)] bg-[rgba(248,113,113,0.1)] p-4">
            <p className="text-sm font-semibold text-[#f87171]">Important — while you wait</p>
            <p className="mt-1.5 text-sm text-[#fca5a5]">
              Do not power on the drive again. Set it aside safely and wait for our team to
              contact you with shipping instructions.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href="https://mdrepairs.com/mail-in-repair/"
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center justify-center rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] px-5 py-3.5 text-center text-sm font-medium text-white shadow-[0_4px_15px_rgba(99,102,241,0.4)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_8px_24px_rgba(99,102,241,0.5)]"
            >
              View Mail-In Instructions
            </a>
            <button
              type="button"
              onClick={onRestart}
              className="flex items-center justify-center rounded-xl border border-[rgba(255,255,255,0.12)] bg-transparent px-5 py-3.5 text-sm font-medium text-[#9aa0ac] transition hover:border-[#6366f1] hover:text-white"
            >
              Back to Tool
            </button>
          </div>
        </div>
      </StepLayout>
    );
  }

  // ── Form ────────────────────────────────────────────────────────────────────

  return (
    <StepLayout
      stepLabel="Quote"
      title="Get a professional recovery quote"
      subtitle="Fill out the form below. Our team will review your case and contact you."
      onBack={onBack}
      onNext={onNext}
      canGoBack={canGoBack}
      canGoNext={canGoNext}
      showNext={false}
    >
      {/* Secondary CTA */}
      <div className="mb-5 rounded-xl border border-[rgba(99,102,241,0.25)] bg-[rgba(99,102,241,0.08)] p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#c7d2fe]">
              Free evaluation · No data, no charge
            </p>
            <p className="mt-0.5 text-xs text-[#9aa0ac]">
              You only pay if we successfully recover your data.
            </p>
          </div>
          <a
            href="https://mdrepairs.com/mail-in-repair/"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex shrink-0 items-center justify-center rounded-xl border border-[rgba(99,102,241,0.4)] bg-[rgba(99,102,241,0.15)] px-4 py-2.5 text-sm font-medium text-[#c7d2fe] transition hover:bg-[rgba(99,102,241,0.25)] hover:text-white"
          >
            Learn more about our data recovery services →
          </a>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* ── Section: Contact Info ─────────────────────────────────────────── */}
        <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-5">
          <SectionHeader label="Contact Info" />
          <div className="space-y-4">

            <div id="fullName">
              <FieldLabel htmlFor="fullName" required>Full Name</FieldLabel>
              <input
                id="fullName"
                type="text"
                autoComplete="name"
                value={data.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                placeholder="Jane Smith"
                className={inputCls(!!errors.fullName)}
              />
              <FieldError msg={errors.fullName} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div id="email">
                <FieldLabel htmlFor="email" required>Email</FieldLabel>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={data.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="jane@example.com"
                  className={inputCls(!!errors.email)}
                />
                <FieldError msg={errors.email} />
              </div>
              <div id="phone">
                <FieldLabel htmlFor="phone" required>Phone Number</FieldLabel>
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  value={data.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="(555) 555-5555"
                  className={inputCls(!!errors.phone)}
                />
                <FieldError msg={errors.phone} />
              </div>
            </div>

            <div id="address1">
              <FieldLabel htmlFor="address1" required>Address Line 1</FieldLabel>
              <input
                id="address1"
                type="text"
                autoComplete="address-line1"
                value={data.address1}
                onChange={(e) => handleChange("address1", e.target.value)}
                placeholder="123 Main St"
                className={inputCls(!!errors.address1)}
              />
              <FieldError msg={errors.address1} />
            </div>

            <div>
              <FieldLabel htmlFor="address2">Address Line 2</FieldLabel>
              <input
                id="address2"
                type="text"
                autoComplete="address-line2"
                value={data.address2}
                onChange={(e) => handleChange("address2", e.target.value)}
                placeholder="Apt, suite, unit (optional)"
                className={inputCls(false)}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div id="city" className="sm:col-span-1">
                <FieldLabel htmlFor="city" required>City</FieldLabel>
                <input
                  id="city"
                  type="text"
                  autoComplete="address-level2"
                  value={data.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  placeholder="New York"
                  className={inputCls(!!errors.city)}
                />
                <FieldError msg={errors.city} />
              </div>
              <div id="state">
                <FieldLabel htmlFor="state" required>State</FieldLabel>
                <select
                  id="state"
                  value={data.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                  className={`${inputCls(!!errors.state)} cursor-pointer`}
                >
                  <option value="">— Select —</option>
                  {US_STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <FieldError msg={errors.state} />
              </div>
              <div id="zip">
                <FieldLabel htmlFor="zip" required>ZIP Code</FieldLabel>
                <input
                  id="zip"
                  type="text"
                  autoComplete="postal-code"
                  value={data.zip}
                  onChange={(e) => handleChange("zip", e.target.value)}
                  placeholder="10001"
                  maxLength={10}
                  className={inputCls(!!errors.zip)}
                />
                <FieldError msg={errors.zip} />
              </div>
            </div>

          </div>
        </div>

        {/* ── Section: Device Info ──────────────────────────────────────────── */}
        <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-5">
          <SectionHeader label="Device Info" />
          <div className="space-y-4">

            <div id="driveType">
              <FieldLabel htmlFor="driveType" required>Drive Type</FieldLabel>
              <div className="mt-2">
                <RadioGroup
                  options={DRIVE_TYPES}
                  value={data.driveType}
                  onChange={(v) => handleChange("driveType", v)}
                />
              </div>
              <FieldError msg={errors.driveType} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <FieldLabel htmlFor="brand">Brand</FieldLabel>
                <input
                  id="brand"
                  type="text"
                  value={data.brand}
                  onChange={(e) => handleChange("brand", e.target.value)}
                  placeholder="e.g. Western Digital, Seagate"
                  className={inputCls(false)}
                />
              </div>
              <div id="modelNumber">
                <FieldLabel htmlFor="modelNumber" required>Model Number</FieldLabel>
                <input
                  id="modelNumber"
                  type="text"
                  value={data.modelNumber}
                  onChange={(e) => handleChange("modelNumber", e.target.value)}
                  placeholder="e.g. WD10EZEX, ST2000DM008"
                  className={inputCls(!!errors.modelNumber)}
                />
                <p className="mt-1 text-xs text-[#4a5568]">
                  Usually printed on the drive label.
                </p>
                <FieldError msg={errors.modelNumber} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <FieldLabel htmlFor="capacity">Capacity</FieldLabel>
                <select
                  id="capacity"
                  value={data.capacity}
                  onChange={(e) => handleChange("capacity", e.target.value)}
                  className={`${inputCls(false)} cursor-pointer`}
                >
                  <option value="">— Select —</option>
                  {CAPACITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <FieldLabel htmlFor="connectionType">Connection Type</FieldLabel>
                <select
                  id="connectionType"
                  value={data.connectionType}
                  onChange={(e) => handleChange("connectionType", e.target.value)}
                  className={`${inputCls(false)} cursor-pointer`}
                >
                  <option value="">— Select —</option>
                  {CONNECTION_TYPES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* ── Section: Problem Details ──────────────────────────────────────── */}
        <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-5">
          <SectionHeader label="Problem Details" />
          <div className="space-y-4">

            <div id="whatHappened">
              <FieldLabel htmlFor="whatHappened" required>What happened?</FieldLabel>
              <textarea
                id="whatHappened"
                value={data.whatHappened}
                onChange={(e) => handleChange("whatHappened", e.target.value)}
                rows={4}
                placeholder="Describe what happened — e.g. dropped drive, clicking noises, not detected, deleted files, accidentally formatted, water damage, power surge..."
                className={`${inputCls(!!errors.whatHappened)} resize-y`}
              />
              <FieldError msg={errors.whatHappened} />
            </div>

            <div>
              <FieldLabel htmlFor="whenStarted">When did the issue start?</FieldLabel>
              <select
                id="whenStarted"
                value={data.whenStarted}
                onChange={(e) => handleChange("whenStarted", e.target.value)}
                className={`${inputCls(false)} cursor-pointer`}
              >
                <option value="">— Select —</option>
                {WHEN_STARTED.map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </select>
            </div>

            <div id="isDetectable">
              <FieldLabel htmlFor="isDetectable" required>
                Is the drive detectable anywhere?
              </FieldLabel>
              <div className="mt-2">
                <RadioGroup
                  options={DETECTABLE_OPTIONS}
                  value={data.isDetectable}
                  onChange={(v) => handleChange("isDetectable", v)}
                />
              </div>
              <FieldError msg={errors.isDetectable} />
            </div>

            <div id="unusualSounds">
              <FieldLabel htmlFor="unusualSounds" required>Any unusual sounds?</FieldLabel>
              <div className="mt-2">
                <RadioGroup
                  options={SOUND_OPTIONS}
                  value={data.unusualSounds}
                  onChange={(v) => handleChange("unusualSounds", v)}
                />
              </div>
              <FieldError msg={errors.unusualSounds} />
            </div>

            <div id="recoveryAttempted">
              <FieldLabel htmlFor="recoveryAttempted" required>
                Has anyone attempted recovery already?
              </FieldLabel>
              <div className="mt-2">
                <RadioGroup
                  options={["Yes", "No"]}
                  value={data.recoveryAttempted}
                  onChange={(v) => handleChange("recoveryAttempted", v)}
                />
              </div>
              <FieldError msg={errors.recoveryAttempted} />
            </div>

            {data.recoveryAttempted === "Yes" ? (
              <div>
                <FieldLabel htmlFor="recoveryDetails">What was tried?</FieldLabel>
                <textarea
                  id="recoveryDetails"
                  value={data.recoveryDetails}
                  onChange={(e) => handleChange("recoveryDetails", e.target.value)}
                  rows={3}
                  placeholder="e.g. ran chkdsk, tried ddrescue, used R-Studio, connected to another computer..."
                  className={`${inputCls(false)} resize-y`}
                />
              </div>
            ) : null}

          </div>
        </div>

        {/* ── Section: File Priority ────────────────────────────────────────── */}
        <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-5">
          <SectionHeader label="File Priority" />
          <div className="space-y-4">

            <div id="dataImportance">
              <FieldLabel htmlFor="dataImportance" required>
                How important is the data?
              </FieldLabel>
              <div className="mt-2">
                <RadioGroup
                  options={IMPORTANCE_OPTIONS}
                  value={data.dataImportance}
                  onChange={(v) => handleChange("dataImportance", v)}
                />
              </div>
              <FieldError msg={errors.dataImportance} />
            </div>

            <div>
              <FieldLabel htmlFor="turnaround">Desired turnaround</FieldLabel>
              <select
                id="turnaround"
                value={data.turnaround}
                onChange={(e) => handleChange("turnaround", e.target.value)}
                className={`${inputCls(false)} cursor-pointer`}
              >
                <option value="">— Select —</option>
                {TURNAROUND_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* ── Section: Attachments ─────────────────────────────────────────── */}
        <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-5">
          <SectionHeader label="Attachments (optional)" />
          <p className="mb-3 text-xs text-[#9aa0ac]">
            Attach screenshots, photos, or logs that may help our team — e.g. CrystalDiskInfo
            screenshot, R-Studio scan results, ddrescue log output.
          </p>
          <label
            htmlFor="attachments"
            className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[rgba(255,255,255,0.12)] bg-[#0d0f18] px-4 py-6 text-center transition hover:border-[#6366f1]"
          >
            <span className="text-2xl" aria-hidden="true">
              📎
            </span>
            <span className="text-sm font-medium text-[#9aa0ac]">
              Click to select files
            </span>
            <span className="text-xs text-[#4a5568]">PNG, JPG, PDF, TXT, LOG accepted</span>
            <input
              id="attachments"
              type="file"
              multiple
              accept=".png,.jpg,.jpeg,.pdf,.txt,.log"
              onChange={handleFileChange}
              className="sr-only"
            />
          </label>
          {attachments.length > 0 ? (
            <ul className="mt-3 space-y-1.5">
              {attachments.map((file, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2.5 rounded-lg bg-[#22263a] px-3 py-2 text-xs text-[#9aa0ac]"
                >
                  <span aria-hidden="true">📄</span>
                  <span className="truncate">{file.name}</span>
                  <span className="ml-auto shrink-0 text-[#4a5568]">
                    {(file.size / 1024).toFixed(0)} KB
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {/* ── Why we ask — collapsible ──────────────────────────────────────── */}
        <details className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#1a1d27] p-4">
          <summary className="cursor-pointer text-sm font-semibold text-[#7b8cde]">
            Why we ask for this information
          </summary>
          <div className="mt-3 space-y-2 text-sm text-[#9aa0ac]">
            <p>
              Drive model and symptoms help our engineers prepare the right tools before your drive
              arrives, reducing the time your data is at risk.
            </p>
            <p>
              If your drive is clicking or beeping,{" "}
              <strong className="text-[#fca5a5]">do not keep powering it on.</strong> Every power
              cycle on a mechanically damaged drive reduces how much data is recoverable.
            </p>
            <p>
              Your contact details are used solely to follow up on your recovery case — never for
              marketing.
            </p>
          </div>
        </details>

        {/* ── Consent ──────────────────────────────────────────────────────── */}
        <div
          id="consentChecked"
          className={`rounded-xl border p-4 ${
            errors.consentChecked
              ? "border-[rgba(248,113,113,0.5)] bg-[rgba(248,113,113,0.05)]"
              : "border-[rgba(255,255,255,0.06)] bg-[#1a1d27]"
          }`}
        >
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={data.consentChecked}
              onChange={(e) => handleChange("consentChecked", e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#6366f1]"
            />
            <span className="text-sm text-[#9aa0ac]">
              I understand that the quote is based on evaluation and final pricing depends on
              diagnosis.{" "}
              <span className="text-[#6a7080]">You only pay if data is successfully recovered.</span>
            </span>
          </label>
          <FieldError msg={errors.consentChecked} />
          <p className="mt-3 text-xs text-[#4a5568]">
            ⚠ Do not keep powering on a clicking or damaged drive. Each power cycle can cause
            additional mechanical damage.
          </p>
        </div>

        {/* ── Submit ───────────────────────────────────────────────────────── */}
        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] px-6 py-4 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(99,102,241,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_8px_28px_rgba(99,102,241,0.55)] active:scale-[0.99]"
        >
          Submit Recovery Quote Request →
        </button>
      </form>
    </StepLayout>
  );
}
