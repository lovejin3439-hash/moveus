"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import StepIndicator from "@/components/ui/StepIndicator";
import { useToast } from "@/components/ui/Toast";

type DocType = "PASSPORT" | "VISA" | "INVENTORY" | "OTHER";
type DocStatus = "pending" | "uploaded";

interface Document {
  type: DocType;
  label: string;
  required: boolean;
  status: DocStatus;
  filename?: string;
}

const INITIAL_DOCS: Document[] = [
  { type: "PASSPORT", label: "Passport Copy", required: true, status: "pending" },
  { type: "VISA", label: "Visa / Residence Permit", required: true, status: "pending" },
  { type: "INVENTORY", label: "Inventory List (auto-generated)", required: false, status: "uploaded", filename: "inventory_list.pdf" },
  { type: "OTHER", label: "Other Documents", required: false, status: "pending" },
];

const CONTRACT_TERMS = [
  "Volume variance of ±10% from estimated CBM is covered at no additional charge.",
  "Payment is automatically charged to the registered card upon packing confirmation.",
  "Platform fee of 5–10% is deducted from vendor settlement.",
  "Cancellation after contract signing incurs a penalty per the cancellation policy.",
  "All insurance and claims are valid only for platform-recorded transactions.",
  "Disputes are handled exclusively through the MoveUs platform.",
];

export default function ContractPage() {
  const router = useRouter();
  const toast = useToast();
  const [docs, setDocs] = useState<Document[]>(INITIAL_DOCS);
  const [signed, setSigned] = useState(false);
  const [signName, setSignName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [step, setStep] = useState<"contract" | "docs" | "payment" | "done">("contract");
  const [draggingType, setDraggingType] = useState<DocType | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDocUpload = (type: DocType, filename: string) => {
    setDocs(docs.map((d) => d.type === type ? { ...d, status: "uploaded", filename } : d));
  };

  const handleFileDrop = (e: React.DragEvent, type: DocType) => {
    e.preventDefault();
    setDraggingType(null);
    const file = e.dataTransfer.files[0];
    if (file) handleDocUpload(type, file.name);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>, type: DocType) => {
    const file = e.target.files?.[0];
    if (file) handleDocUpload(type, file.name);
  };

  const allRequiredUploaded = docs.filter((d) => d.required).every((d) => d.status === "uploaded");

  const handleFinish = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    toast.success("Setup complete! 🎉", "Your move is confirmed. Tracking begins on packing day.");
    router.push("/shipments/demo-shipment-id");
  };

  const handleSign = () => {
    toast.info("Contract signed", "Proceeding to document upload.");
    setStep("docs");
  };

  const handleDocsContinue = () => {
    toast.info("Documents saved", "Almost done — register your payment card.");
    setStep("payment");
  };

  const move = {
    origin: "Seoul, Korea",
    destination: "Sydney, Australia",
    estimatedCbm: 12.4,
    vendor: "GlobalMove Korea",
    fclPrice: 3200000,
    packingDate: "2026-06-05",
  };

  const fmt = (n: number) =>
    new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(n);

  const STEPS = [
    { label: "Contract",  description: "Review & sign" },
    { label: "Documents", description: "Upload files" },
    { label: "Payment",   description: "Register card" },
  ];
  const stepIdx: Record<string, number> = { contract: 0, docs: 1, payment: 2, done: 2 };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pb-16 md:pb-0">
      <Header />

      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Step Indicator */}
        <StepIndicator steps={STEPS} current={stepIdx[step]} className="mb-8" />

        {/* Contract Step */}
        {step === "contract" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Review & Sign Contract</h1>
              <p className="text-gray-500">Review the terms and e-sign to confirm your move.</p>
            </div>

            <Card>
              <h3 className="font-semibold mb-4">Move Summary</h3>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                {[
                  ["Route", `${move.origin} → ${move.destination}`],
                  ["Vendor", move.vendor],
                  ["Est. Volume", `${move.estimatedCbm} CBM`],
                  ["Price", fmt(move.fclPrice)],
                  ["Packing Date", move.packingDate],
                  ["Payment", "Auto-charged on packing day"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-gray-500">{k}</span>
                    <span className="font-medium text-right">{v}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold mb-4">Terms & Conditions</h3>
              <ul className="space-y-3">
                {CONTRACT_TERMS.map((term, i) => (
                  <li key={i} className="flex gap-3 text-sm text-gray-600">
                    <span className="w-5 h-5 rounded-full bg-primary-50 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                    {term}
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <h3 className="font-semibold mb-4">Digital Signature</h3>
              <p className="text-sm text-gray-500 mb-4">Type your full name to sign this contract electronically.</p>
              <Input
                label="Full Name (as digital signature)"
                placeholder="Kim Min-jun"
                value={signName}
                onChange={(e) => setSignName(e.target.value)}
              />
              {signName && (
                <div className="mt-4 border border-primary-200 rounded-lg p-4 bg-primary-50">
                  <p className="text-xs text-gray-500 mb-1">Signature Preview</p>
                  <p className="font-serif text-2xl text-primary italic">{signName}</p>
                  <p className="text-xs text-gray-400 mt-2">Signed on {new Date().toLocaleDateString()}</p>
                </div>
              )}
              <label className="flex items-start gap-3 mt-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={signed}
                  onChange={(e) => setSigned(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-primary"
                />
                <span className="text-sm text-gray-600">
                  I have read and agree to all terms above. I understand that this constitutes a legally binding contract.
                </span>
              </label>
            </Card>

            <div className="flex justify-end">
              <Button
                size="lg"
                disabled={!signed || !signName}
                onClick={handleSign}
              >
                Sign & Continue →
              </Button>
            </div>
          </div>
        )}

        {/* Documents Step */}
        {step === "docs" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Upload Documents</h1>
              <p className="text-gray-500">Upload required documents for customs clearance.</p>
            </div>

            <div className="space-y-4">
              {docs.map((doc) => (
                <Card key={doc.type}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${doc.status === "uploaded" ? "bg-green-500" : "bg-gray-300"}`} />
                      <h4 className="text-sm font-semibold text-gray-900">{doc.label}</h4>
                      {doc.required && <span className="text-xs text-red-500">*Required</span>}
                    </div>
                    {doc.status === "uploaded" && (
                      <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                        ✓ Uploaded
                      </span>
                    )}
                  </div>

                  {doc.status === "uploaded" ? (
                    <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                      <span className="text-sm">📄</span>
                      <span className="text-sm text-gray-700 flex-1 truncate">{doc.filename}</span>
                      <button
                        onClick={() => setDocs(docs.map((d) => d.type === doc.type ? { ...d, status: "pending", filename: undefined } : d))}
                        className="text-xs text-gray-400 hover:text-red-500"
                      >Remove</button>
                    </div>
                  ) : (
                    <div
                      onDrop={(e) => handleFileDrop(e, doc.type)}
                      onDragOver={(e) => { e.preventDefault(); setDraggingType(doc.type); }}
                      onDragLeave={() => setDraggingType(null)}
                      className={`border-2 border-dashed rounded-lg p-4 text-center transition-all ${
                        draggingType === doc.type ? "border-primary bg-primary-50" : "border-gray-200 hover:border-primary"
                      }`}
                    >
                      <p className="text-xs text-gray-500 mb-2">Drag & drop or</p>
                      <label className="cursor-pointer text-xs text-primary font-medium hover:underline">
                        Browse file
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileInput(e, doc.type)}
                        />
                      </label>
                    </div>
                  )}
                </Card>
              ))}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep("contract")}>← Back</Button>
              <Button
                size="lg"
                disabled={!allRequiredUploaded}
                onClick={handleDocsContinue}
              >
                Next: Payment →
              </Button>
            </div>
          </div>
        )}

        {/* Payment Step */}
        {step === "payment" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Register Payment Card</h1>
              <p className="text-gray-500">Your card will be charged automatically on packing day.</p>
            </div>

            <Card className="bg-amber-50 border-amber-200">
              <div className="flex gap-3">
                <span className="text-xl">💳</span>
                <div className="text-sm">
                  <p className="font-semibold text-amber-800 mb-1">Secure Authorization</p>
                  <p className="text-amber-700">We&apos;re registering your card now (no charge yet). Payment of {fmt(move.fclPrice)} will be automatically processed when the vendor confirms packing is complete.</p>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold mb-5">Card Details</h3>
              <div className="space-y-4">
                <Input
                  label="Card Number"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "").slice(0, 16);
                    setCardNumber(v.replace(/(.{4})/g, "$1 ").trim());
                  }}
                  maxLength={19}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Expiry (MM/YY)"
                    placeholder="06/28"
                    value={cardExpiry}
                    onChange={(e) => {
                      let v = e.target.value.replace(/\D/g, "").slice(0, 4);
                      if (v.length >= 2) v = v.slice(0, 2) + "/" + v.slice(2);
                      setCardExpiry(v);
                    }}
                    maxLength={5}
                  />
                  <Input label="CVC" placeholder="123" maxLength={4} type="password" />
                </div>
                <Input label="Name on Card" placeholder="KIM MIN JUN" />
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold mb-4">Installment Options</h3>
              <div className="space-y-2">
                {[
                  { label: "One-time payment", amount: fmt(move.fclPrice) },
                  { label: "3 installments", amount: fmt(move.fclPrice / 3) + " × 3" },
                  { label: "6 installments", amount: fmt(move.fclPrice / 6) + " × 6" },
                ].map((opt, i) => (
                  <label key={i} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
                    <input type="radio" name="installment" defaultChecked={i === 0} className="accent-primary" />
                    <span className="text-sm flex-1">{opt.label}</span>
                    <span className="text-sm font-medium text-primary">{opt.amount}</span>
                  </label>
                ))}
              </div>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep("docs")}>← Back</Button>
              <Button
                size="lg"
                loading={loading}
                disabled={cardNumber.length < 19}
                onClick={handleFinish}
              >
                Confirm & Complete Setup
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
