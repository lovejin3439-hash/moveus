"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import { POPULAR_DESTINATIONS } from "@/lib/cbm-data";
import { useToast } from "@/components/ui/Toast";

const ALL_SPECIALTIES = [
  "Piano Moving", "Art & Antiques", "Corporate Relocation",
  "Pet Relocation", "LCL Specialist", "FCL Specialist",
  "EU Customs Expert", "US Customs", "Temperature-Controlled",
  "Door-to-Door", "Port-to-Door", "Warehousing", "Insurance Included",
];

export default function VendorProfilePage() {
  const toast = useToast();
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "routes" | "billing" | "boost">("profile");
  const [selectedRoutes, setSelectedRoutes] = useState(["Australia", "USA", "Canada", "UK", "Germany"]);
  const [selectedSpecialties, setSelectedSpecialties] = useState(["Piano Moving", "Corporate Relocation", "FCL Specialist"]);
  const [profile, setProfile] = useState({
    companyName: "GlobalMove Korea",
    licenseNo: "KR-2009-INT-0042",
    description: "15년 경력의 국제이사 전문 업체. FCL/LCL 모두 운영. 전담 매니저 배정 및 전 구간 보험 포함.",
    phone: "+82-2-1234-5678",
    email: "contact@globalmove.kr",
    website: "https://globalmove.kr",
    address: "서울특별시 강남구 테헤란로 123",
    employees: "45",
    founded: "2009",
  });

  const handleSave = async (section = "Profile") => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    toast.success(`${section} saved!`, "Your changes have been updated successfully.");
  };

  const toggleRoute = (route: string) =>
    setSelectedRoutes((prev) => prev.includes(route) ? prev.filter((r) => r !== route) : [...prev, route]);

  const toggleSpecialty = (s: string) =>
    setSelectedSpecialties((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pb-16 md:pb-0">
      <Header />

      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center text-primary font-black text-2xl border border-primary-100 shadow-sm">
            G
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">GlobalMove Korea</h1>
              <Badge variant="teal">Premium</Badge>
              <Badge variant="success">Verified</Badge>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span>⭐ 4.8 (142 reviews)</span>
              <span>·</span>
              <span>520 moves</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit mb-6">
          {(["profile", "routes", "billing", "boost"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-sm font-medium rounded-lg capitalize transition-all ${
                activeTab === tab ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab === "boost" ? "🚀 Boost" : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="space-y-5">
            <Card>
              <h3 className="font-semibold mb-5">Company Information</h3>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Company Name"
                    value={profile.companyName}
                    onChange={(e) => setProfile({ ...profile, companyName: e.target.value })}
                  />
                  <Input
                    label="Business License No."
                    value={profile.licenseNo}
                    onChange={(e) => setProfile({ ...profile, licenseNo: e.target.value })}
                  />
                </div>
                <Textarea
                  label="Company Description"
                  rows={4}
                  value={profile.description}
                  onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                  placeholder="Describe your company, specialties, and what makes you stand out..."
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Phone" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
                  <Input label="Email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                  <Input label="Website" value={profile.website} onChange={(e) => setProfile({ ...profile, website: e.target.value })} />
                  <Input label="Office Address" value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} />
                  <Input label="Number of Employees" value={profile.employees} onChange={(e) => setProfile({ ...profile, employees: e.target.value })} />
                  <Input label="Year Founded" value={profile.founded} onChange={(e) => setProfile({ ...profile, founded: e.target.value })} />
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold mb-4">Specialties</h3>
              <p className="text-sm text-gray-500 mb-3">Select all that apply — these appear on your public profile.</p>
              <div className="flex flex-wrap gap-2">
                {ALL_SPECIALTIES.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggleSpecialty(s)}
                    className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                      selectedSpecialties.includes(s)
                        ? "bg-primary text-white border-primary"
                        : "border-gray-300 text-gray-600 hover:border-primary"
                    }`}
                  >
                    {selectedSpecialties.includes(s) && "✓ "}{s}
                  </button>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold mb-4">License & Certifications</h3>
              <div className="space-y-3">
                {[
                  { label: "Business License", status: "verified", filename: "business_license.pdf" },
                  { label: "Moving Company License", status: "verified", filename: "moving_license.pdf" },
                  { label: "FIDI FAIM Certificate", status: "pending", filename: null },
                ].map((doc) => (
                  <div key={doc.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-3">
                      <span className={`w-2 h-2 rounded-full ${doc.status === "verified" ? "bg-green-500" : "bg-yellow-400"}`} />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{doc.label}</p>
                        {doc.filename && <p className="text-xs text-gray-400">{doc.filename}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        doc.status === "verified" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"
                      }`}>
                        {doc.status}
                      </span>
                      <label className="text-xs text-primary hover:underline cursor-pointer">
                        {doc.filename ? "Replace" : "Upload"}
                        <input type="file" className="hidden" />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <div className="flex justify-end">
              <Button onClick={() => handleSave("Profile")} loading={saving} size="lg">Save Changes</Button>
            </div>
          </div>
        )}

        {/* Routes Tab */}
        {activeTab === "routes" && (
          <div className="space-y-5">
            <Card>
              <h3 className="font-semibold mb-2">Service Routes</h3>
              <p className="text-sm text-gray-500 mb-5">Select the destination countries you serve. You'll only receive quote requests for selected routes.</p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_DESTINATIONS.map((dest) => (
                  <button
                    key={dest}
                    onClick={() => toggleRoute(dest)}
                    className={`text-sm px-3 py-2 rounded-lg border transition-colors ${
                      selectedRoutes.includes(dest)
                        ? "bg-primary text-white border-primary"
                        : "border-gray-200 text-gray-600 hover:border-primary bg-white"
                    }`}
                  >
                    {selectedRoutes.includes(dest) ? "✓ " : ""}{dest}
                  </button>
                ))}
              </div>
              <div className="mt-5 p-4 bg-primary-50 rounded-xl">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Active Routes ({selectedRoutes.length})
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedRoutes.map((r) => (
                    <span key={r} className="text-xs bg-white border border-primary-200 text-primary px-2.5 py-1 rounded-full">
                      Korea → {r}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button onClick={() => handleSave("Routes")} loading={saving}>Save Routes</Button>
              </div>
            </Card>
          </div>
        )}

        {/* Billing Tab */}
        {activeTab === "billing" && (
          <div className="space-y-5">
            <Card>
              <h3 className="font-semibold mb-5">Bank Account for Settlement</h3>
              <div className="space-y-4">
                <Input label="Bank Name" placeholder="KB국민은행" />
                <Input label="Account Number" placeholder="123-456-789012" />
                <Input label="Account Holder Name" placeholder="글로벌무브코리아" />
                <Input label="Business Registration No." placeholder="123-45-67890" />
              </div>
              <div className="mt-5">
                <Button onClick={() => handleSave("Bank details")} loading={saving}>Save Bank Details</Button>
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold mb-4">Settlement Summary</h3>
              <div className="space-y-3">
                {[
                  { label: "Platform fee rate", value: "10%" },
                  { label: "Settlement cycle", value: "Within 3 business days after packing" },
                  { label: "Minimum settlement", value: "₩50,000" },
                  { label: "Tax invoice", value: "Auto-issued per transaction" },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between text-sm py-2 border-b border-gray-50 last:border-0">
                    <span className="text-gray-500">{item.label}</span>
                    <span className="font-medium text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Boost Tab */}
        {activeTab === "boost" && (
          <div className="space-y-5">
            <Card className="border-primary-200 bg-primary-50">
              <div className="flex items-start gap-4">
                <span className="text-3xl">👑</span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Premium Badge — Active</h3>
                  <p className="text-sm text-gray-600">Your company appears with a Premium badge in search results and vendor lists. Next renewal: 2026-09-01.</p>
                </div>
              </div>
            </Card>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Featured Listing", price: "₩89,000/month", icon: "⭐",
                  desc: "Appear at the top of vendor search results for your active routes.",
                  active: false,
                },
                {
                  title: "Route Boost", price: "₩49,000/route/month", icon: "🎯",
                  desc: "Prioritize your listing for specific country routes of your choice.",
                  active: true,
                },
                {
                  title: "Profile Analytics", price: "₩29,000/month", icon: "📊",
                  desc: "See how many customers viewed your profile, click-through rates, and conversion data.",
                  active: false,
                },
                {
                  title: "Priority Support", price: "₩59,000/month", icon: "🎧",
                  desc: "Dedicated account manager and same-day dispute resolution.",
                  active: false,
                },
              ].map((plan) => (
                <Card key={plan.title} className={plan.active ? "border-primary-300 bg-primary-50" : ""}>
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">{plan.icon}</span>
                    {plan.active && <Badge variant="teal">Active</Badge>}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{plan.title}</h4>
                  <p className="text-primary font-bold text-sm mb-2">{plan.price}</p>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4">{plan.desc}</p>
                  <Button
                    variant={plan.active ? "secondary" : "outline"}
                    size="sm"
                    className="w-full"
                  >
                    {plan.active ? "Manage" : "Add"}
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
