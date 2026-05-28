// Mock data for prototype UI — replace with real DB queries in production

export const MOCK_VENDORS = [
  {
    id: "v1",
    companyName: "GlobalMove Korea",
    rating: 4.8,
    reviewCount: 142,
    description: "15년 경력의 국제이사 전문 업체. FCL/LCL 모두 운영.",
    serviceRoutes: ["USA", "Canada", "Australia", "UK"],
    verified: true,
    badgeTier: "Premium",
  },
  {
    id: "v2",
    companyName: "Pacific Relocations",
    rating: 4.6,
    reviewCount: 89,
    description: "태평양 노선 특화. 호주/뉴질랜드/아시아 전문.",
    serviceRoutes: ["Australia", "New Zealand", "Singapore", "Japan"],
    verified: true,
    badgeTier: "Standard",
  },
  {
    id: "v3",
    companyName: "Euro Cargo Express",
    rating: 4.5,
    reviewCount: 61,
    description: "유럽 전 지역 Door-to-Door 서비스.",
    serviceRoutes: ["Germany", "France", "Netherlands", "UK"],
    verified: true,
    badgeTier: null,
  },
];

export const MOCK_QUOTES = [
  {
    id: "q1",
    vendorId: "v1",
    vendor: MOCK_VENDORS[0],
    fclPrice: 3200000,
    lclPrice: 1800000,
    availableDates: ["2026-06-05", "2026-06-10", "2026-06-15"],
    appealPoints: "전담 매니저 배정, 전 구간 보험 포함, 무료 포장재 제공",
    selected: false,
  },
  {
    id: "q2",
    vendorId: "v2",
    vendor: MOCK_VENDORS[1],
    fclPrice: 2900000,
    lclPrice: 1600000,
    availableDates: ["2026-06-08", "2026-06-12"],
    appealPoints: "최저가 보장, 픽업 무료, 도착지 창고보관 2주 무료",
    selected: false,
  },
];

export const MOCK_MOVES = [
  {
    id: "m1",
    customerId: "u1",
    vendorId: "v1",
    status: "IN_TRANSIT",
    origin: "Seoul, Korea",
    destination: "Sydney, Australia",
    estimatedCbm: 12.4,
    finalCbm: 13.1,
    quotePrice: 3200000,
    packingDate: "2026-05-20",
    customer: { name: "Kim Min-jun", email: "minjun@example.com" },
    vendor: MOCK_VENDORS[0],
  },
  {
    id: "m2",
    customerId: "u2",
    vendorId: "v1",
    status: "CONTRACTED",
    origin: "Busan, Korea",
    destination: "Los Angeles, USA",
    estimatedCbm: 8.2,
    finalCbm: null,
    quotePrice: 2800000,
    packingDate: "2026-06-05",
    customer: { name: "Park Soo-yeon", email: "sooyeon@example.com" },
    vendor: MOCK_VENDORS[0],
  },
];

export const MOCK_TRACKING_EVENTS = [
  { id: "t1", status: "BOOKED", location: "Seoul", note: "이사 예약 완료", timestamp: "2026-05-01T09:00:00Z" },
  { id: "t2", status: "PACKED", location: "Seoul", note: "포장 완료 및 픽업", timestamp: "2026-05-20T14:00:00Z" },
  { id: "t3", status: "DEPARTED", location: "Busan Port", note: "선박 출항 (COSCO SHIPPING)", timestamp: "2026-05-22T08:00:00Z" },
  { id: "t4", status: "IN_TRANSIT", location: "Pacific Ocean", note: "항해 중", timestamp: "2026-05-25T00:00:00Z" },
];

export const SHIPMENT_STAGES = [
  { key: "QUOTING", label: "견적 요청", icon: "📋" },
  { key: "CONTRACTED", label: "계약 완료", icon: "✍️" },
  { key: "PACKED", label: "포장 완료", icon: "📦" },
  { key: "IN_TRANSIT", label: "운송 중", icon: "🚢" },
  { key: "ARRIVED", label: "도착", icon: "🏳" },
  { key: "DELIVERED", label: "배달 완료", icon: "🏠" },
];
