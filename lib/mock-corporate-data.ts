export type InternalStatus = "APPROVED" | "PENDING" | "REJECTED";

export interface ExpatMove {
  id: string;
  employeeId: string;
  name: string;
  nameEn: string;
  department: string;
  jobTitle: string;
  jobTitleEn: string;
  origin: string;
  originCity: string;
  destination: string;          // full display: "Austin, USA"
  destinationCity: string;      // city only: "Austin"
  destinationCountry: string;   // country: "USA"
  destinationFlag: string;      // emoji: "🇺🇸"
  status: string;
  internalStatus: InternalStatus;
  vendor: string | null;
  estimatedCbm: number;
  finalCbm: number | null;
  quotePrice: number | null;
  packingDate: string | null;
  eta: string | null;
  progress: number;
  notes: string;
  familyMove: boolean;
  specialItems: string[];
}

export const MOCK_COMPANY = {
  name: "Samsung Electronics Korea",
  nameKo: "삼성전자 코리아",
  id: "corp-demo",
  contactPerson: "이지원",
  contactTitle: "HR Manager",
  annualBudget: 280000000,
  usedBudget: 112600000,
  employeeCount: 16,
};

export const MOCK_EXPAT_MOVES: ExpatMove[] = [
  /* ─── USA ─── */
  {
    id: "exp-001",
    employeeId: "EMP-2024-088",
    name: "김민준",    nameEn: "Kim Min-jun",
    department: "R&D",
    jobTitle: "수석 연구원", jobTitleEn: "Principal Engineer",
    origin: "Seoul, Korea", originCity: "Seoul",
    destination: "Austin, USA", destinationCity: "Austin",
    destinationCountry: "USA", destinationFlag: "🇺🇸",
    status: "IN_TRANSIT", internalStatus: "APPROVED",
    vendor: "Trans-Global Shipping",
    estimatedCbm: 14.2, finalCbm: 15.0, quotePrice: 3200000,
    packingDate: "2026-04-15", eta: "2026-05-20", progress: 75,
    notes: "가족 동반 이사 (배우자, 자녀 2명). 피아노 포함 — 업체에 사전 통보 완료.",
    familyMove: true, specialItems: ["Piano", "Large TV"],
  },
  {
    id: "exp-004",
    employeeId: "EMP-2022-033",
    name: "최유진",    nameEn: "Choi Yoo-jin",
    department: "재무팀",
    jobTitle: "이사", jobTitleEn: "Finance Director",
    origin: "Seoul, Korea", originCity: "Seoul",
    destination: "New York, USA", destinationCity: "New York",
    destinationCountry: "USA", destinationFlag: "🇺🇸",
    status: "DELIVERED", internalStatus: "APPROVED",
    vendor: "Trans-Global Shipping",
    estimatedCbm: 12.0, finalCbm: 11.8, quotePrice: 3100000,
    packingDate: "2026-02-20", eta: "2026-03-28", progress: 100,
    notes: "이사 완료. 정산 처리됨.",
    familyMove: false, specialItems: [],
  },
  {
    id: "exp-007",
    employeeId: "EMP-2023-078",
    name: "정태양",    nameEn: "Jung Tae-yang",
    department: "생산기술팀",
    jobTitle: "수석 엔지니어", jobTitleEn: "Senior Engineer",
    origin: "Seoul, Korea", originCity: "Seoul",
    destination: "Austin, USA", destinationCity: "Austin",
    destinationCountry: "USA", destinationFlag: "🇺🇸",
    status: "CONTRACTED", internalStatus: "APPROVED",
    vendor: "Trans-Global Shipping",
    estimatedCbm: 16.0, finalCbm: null, quotePrice: 3400000,
    packingDate: "2026-06-25", eta: "2026-07-30", progress: 30,
    notes: "동일 오피스 배치. 이전 발령자 네트워크 공유 완료.",
    familyMove: true, specialItems: ["Car Parts"],
  },
  {
    id: "exp-009",
    employeeId: "EMP-2021-055",
    name: "오지훈",    nameEn: "Oh Ji-hoon",
    department: "반도체사업부",
    jobTitle: "부장", jobTitleEn: "Department Head",
    origin: "Seoul, Korea", originCity: "Seoul",
    destination: "Phoenix, USA", destinationCity: "Phoenix",
    destinationCountry: "USA", destinationFlag: "🇺🇸",
    status: "DELIVERED", internalStatus: "APPROVED",
    vendor: "Trans-Global Shipping",
    estimatedCbm: 20.1, finalCbm: 19.8, quotePrice: 4200000,
    packingDate: "2026-01-10", eta: "2026-02-18", progress: 100,
    notes: "이사 완료. 연간 정착 지원금 별도 지급 완료.",
    familyMove: true, specialItems: ["Piano", "Artwork"],
  },
  /* ─── UK ─── */
  {
    id: "exp-002",
    employeeId: "EMP-2023-041",
    name: "박서연",    nameEn: "Park Seo-yeon",
    department: "마케팅",
    jobTitle: "팀장", jobTitleEn: "Marketing Team Lead",
    origin: "Seoul, Korea", originCity: "Seoul",
    destination: "London, UK", destinationCity: "London",
    destinationCountry: "UK", destinationFlag: "🇬🇧",
    status: "CONTRACTED", internalStatus: "APPROVED",
    vendor: "Euro Cargo Express",
    estimatedCbm: 9.8, finalCbm: null, quotePrice: 2900000,
    packingDate: "2026-06-10", eta: "2026-07-05", progress: 35,
    notes: "단독 발령. 회사 렌탈 가구 사용 예정 — 이사 물량 소량.",
    familyMove: false, specialItems: [],
  },
  /* ─── Singapore ─── */
  {
    id: "exp-003",
    employeeId: "EMP-2024-112",
    name: "이도현",    nameEn: "Lee Do-hyun",
    department: "반도체사업부",
    jobTitle: "부장", jobTitleEn: "General Manager",
    origin: "Suwon, Korea", originCity: "Suwon",
    destination: "Singapore", destinationCity: "Singapore",
    destinationCountry: "Singapore", destinationFlag: "🇸🇬",
    status: "QUOTING", internalStatus: "APPROVED",
    vendor: null,
    estimatedCbm: 18.5, finalCbm: null, quotePrice: null,
    packingDate: null, eta: null, progress: 10,
    notes: "FCL 우선 검토. 가족 동반 (자녀 3명, 반려동물 1마리).",
    familyMove: true, specialItems: ["Pet Relocation", "Artwork"],
  },
  /* ─── Germany ─── */
  {
    id: "exp-005",
    employeeId: "EMP-2025-007",
    name: "강준혁",    nameEn: "Kang Jun-hyuk",
    department: "글로벌전략팀",
    jobTitle: "책임연구원", jobTitleEn: "Senior Researcher",
    origin: "Seoul, Korea", originCity: "Seoul",
    destination: "Berlin, Germany", destinationCity: "Berlin",
    destinationCountry: "Germany", destinationFlag: "🇩🇪",
    status: "QUOTING", internalStatus: "PENDING",
    vendor: null,
    estimatedCbm: 7.5, finalCbm: null, quotePrice: null,
    packingDate: null, eta: null, progress: 5,
    notes: "승인 대기 중. 비자 발급 완료 확인 후 진행.",
    familyMove: false, specialItems: [],
  },
  /* ─── Canada ─── */
  {
    id: "exp-006",
    employeeId: "EMP-2024-059",
    name: "윤소희",    nameEn: "Yoon So-hee",
    department: "소프트웨어개발팀",
    jobTitle: "수석 개발자", jobTitleEn: "Principal Developer",
    origin: "Busan, Korea", originCity: "Busan",
    destination: "Vancouver, Canada", destinationCity: "Vancouver",
    destinationCountry: "Canada", destinationFlag: "🇨🇦",
    status: "PACKED", internalStatus: "APPROVED",
    vendor: "Pacific Relocations",
    estimatedCbm: 11.3, finalCbm: 11.3, quotePrice: 2750000,
    packingDate: "2026-05-08", eta: "2026-06-02", progress: 55,
    notes: "포장 완료. 출항 대기 중.",
    familyMove: true, specialItems: ["Musical Instruments"],
  },
  {
    id: "exp-016",
    employeeId: "EMP-2024-077",
    name: "박민서",    nameEn: "Park Min-seo",
    department: "재무팀",
    jobTitle: "차장", jobTitleEn: "Finance Senior Manager",
    origin: "Seoul, Korea", originCity: "Seoul",
    destination: "Toronto, Canada", destinationCity: "Toronto",
    destinationCountry: "Canada", destinationFlag: "🇨🇦",
    status: "DELIVERED", internalStatus: "APPROVED",
    vendor: "Pacific Relocations",
    estimatedCbm: 8.5, finalCbm: 8.2, quotePrice: 2400000,
    packingDate: "2026-02-10", eta: "2026-03-15", progress: 100,
    notes: "이사 완료. 현지 정착 완료.",
    familyMove: false, specialItems: [],
  },
  /* ─── Netherlands ─── */
  {
    id: "exp-010",
    employeeId: "EMP-2024-094",
    name: "임채원",    nameEn: "Lim Chae-won",
    department: "구매팀",
    jobTitle: "책임", jobTitleEn: "Senior Procurement Officer",
    origin: "Seoul, Korea", originCity: "Seoul",
    destination: "Amsterdam, Netherlands", destinationCity: "Amsterdam",
    destinationCountry: "Netherlands", destinationFlag: "🇳🇱",
    status: "CONTRACTED", internalStatus: "APPROVED",
    vendor: "Euro Cargo Express",
    estimatedCbm: 8.9, finalCbm: null, quotePrice: 2600000,
    packingDate: "2026-07-01", eta: "2026-07-28", progress: 30,
    notes: "EU 노선. 현지 통관 대행 서비스 포함 확인.",
    familyMove: false, specialItems: [],
  },
  /* ─── Japan ─── */
  {
    id: "exp-008",
    employeeId: "EMP-2025-021",
    name: "한지수",    nameEn: "Han Ji-su",
    department: "인사팀",
    jobTitle: "차장", jobTitleEn: "HR Senior Manager",
    origin: "Seoul, Korea", originCity: "Seoul",
    destination: "Tokyo, Japan", destinationCity: "Tokyo",
    destinationCountry: "Japan", destinationFlag: "🇯🇵",
    status: "QUOTING", internalStatus: "PENDING",
    vendor: null,
    estimatedCbm: 6.2, finalCbm: null, quotePrice: null,
    packingDate: null, eta: null, progress: 5,
    notes: "단기 발령 (1년). 최소 물량 이사 희망.",
    familyMove: false, specialItems: [],
  },
  /* ─── Australia ─── */
  {
    id: "exp-011",
    employeeId: "EMP-2024-133",
    name: "신예은",    nameEn: "Shin Ye-eun",
    department: "소프트웨어개발팀",
    jobTitle: "팀장", jobTitleEn: "Development Team Lead",
    origin: "Seoul, Korea", originCity: "Seoul",
    destination: "Sydney, Australia", destinationCity: "Sydney",
    destinationCountry: "Australia", destinationFlag: "🇦🇺",
    status: "IN_TRANSIT", internalStatus: "APPROVED",
    vendor: "Pacific Relocations",
    estimatedCbm: 13.0, finalCbm: 13.5, quotePrice: 3800000,
    packingDate: "2026-04-20", eta: "2026-06-01", progress: 65,
    notes: "가족 동반. 반려견 1마리 별도 항공 이송.",
    familyMove: true, specialItems: ["Pet Relocation"],
  },
  /* ─── France ─── */
  {
    id: "exp-012",
    employeeId: "EMP-2023-099",
    name: "오지현",    nameEn: "Oh Ji-hyun",
    department: "R&D",
    jobTitle: "선임 연구원", jobTitleEn: "Senior Researcher",
    origin: "Suwon, Korea", originCity: "Suwon",
    destination: "Paris, France", destinationCity: "Paris",
    destinationCountry: "France", destinationFlag: "🇫🇷",
    status: "CONTRACTED", internalStatus: "APPROVED",
    vendor: "Euro Cargo Express",
    estimatedCbm: 10.2, finalCbm: null, quotePrice: 3300000,
    packingDate: "2026-06-20", eta: "2026-07-18", progress: 25,
    notes: "유럽 연구소 파견. 미술품 별도 보험 가입 완료.",
    familyMove: false, specialItems: ["Artwork"],
  },
  /* ─── UAE ─── */
  {
    id: "exp-013",
    employeeId: "EMP-2025-034",
    name: "임현우",    nameEn: "Lim Hyun-woo",
    department: "글로벌전략팀",
    jobTitle: "부장", jobTitleEn: "Global Strategy Manager",
    origin: "Seoul, Korea", originCity: "Seoul",
    destination: "Dubai, UAE", destinationCity: "Dubai",
    destinationCountry: "UAE", destinationFlag: "🇦🇪",
    status: "QUOTING", internalStatus: "PENDING",
    vendor: null,
    estimatedCbm: 9.0, finalCbm: null, quotePrice: null,
    packingDate: null, eta: null, progress: 5,
    notes: "중동 사업 개발 파견. 비자 준비 중. 단독 발령.",
    familyMove: false, specialItems: [],
  },
  /* ─── China ─── */
  {
    id: "exp-014",
    employeeId: "EMP-2024-156",
    name: "김태현",    nameEn: "Kim Tae-hyun",
    department: "반도체사업부",
    jobTitle: "수석 엔지니어", jobTitleEn: "Principal Engineer",
    origin: "Suwon, Korea", originCity: "Suwon",
    destination: "Shanghai, China", destinationCity: "Shanghai",
    destinationCountry: "China", destinationFlag: "🇨🇳",
    status: "QUOTING", internalStatus: "APPROVED",
    vendor: null,
    estimatedCbm: 11.0, finalCbm: null, quotePrice: null,
    packingDate: null, eta: null, progress: 8,
    notes: "상하이 반도체 공장 지원. 가족 동반 여부 협의 중.",
    familyMove: false, specialItems: [],
  },
  /* ─── Thailand ─── */
  {
    id: "exp-015",
    employeeId: "EMP-2023-112",
    name: "이수빈",    nameEn: "Lee Su-bin",
    department: "마케팅",
    jobTitle: "책임매니저", jobTitleEn: "Senior Marketing Manager",
    origin: "Seoul, Korea", originCity: "Seoul",
    destination: "Bangkok, Thailand", destinationCity: "Bangkok",
    destinationCountry: "Thailand", destinationFlag: "🇹🇭",
    status: "CONTRACTED", internalStatus: "APPROVED",
    vendor: "Asia Pacific Movers",
    estimatedCbm: 7.8, finalCbm: null, quotePrice: 2100000,
    packingDate: "2026-07-10", eta: "2026-07-28", progress: 20,
    notes: "동남아 마케팅 허브 파견. 단독 발령.",
    familyMove: false, specialItems: [],
  },
];

export const DEPARTMENT_BUDGET: { dept: string; deptKo: string; budget: number; used: number }[] = [
  { dept: "R&D",              deptKo: "R&D",          budget: 50000000, used: 22400000 },
  { dept: "Semiconductor",    deptKo: "반도체사업부",  budget: 60000000, used: 29800000 },
  { dept: "Software Dev",     deptKo: "소프트웨어개발", budget: 35000000, used: 16550000 },
  { dept: "Marketing",        deptKo: "마케팅",        budget: 25000000, used: 10000000 },
  { dept: "Finance",          deptKo: "재무팀",        budget: 25000000, used: 13100000 },
  { dept: "Global Strategy",  deptKo: "글로벌전략팀",  budget: 20000000, used: 5500000 },
  { dept: "HR",               deptKo: "인사팀",        budget: 12000000, used: 3100000 },
  { dept: "Procurement",      deptKo: "구매팀",        budget: 15000000, used: 6200000 },
  { dept: "Production Tech",  deptKo: "생산기술팀",    budget: 18000000, used: 6950000 },
];

export const TOP_DESTINATIONS = [
  { country: "USA 🇺🇸",         countryCode: "US", count: 4 },
  { country: "Canada 🇨🇦",      countryCode: "CA", count: 2 },
  { country: "UK 🇬🇧",          countryCode: "GB", count: 1 },
  { country: "Australia 🇦🇺",   countryCode: "AU", count: 1 },
  { country: "Germany 🇩🇪",     countryCode: "DE", count: 1 },
  { country: "Singapore 🇸🇬",   countryCode: "SG", count: 1 },
  { country: "Netherlands 🇳🇱", countryCode: "NL", count: 1 },
  { country: "Japan 🇯🇵",       countryCode: "JP", count: 1 },
  { country: "France 🇫🇷",      countryCode: "FR", count: 1 },
  { country: "UAE 🇦🇪",         countryCode: "AE", count: 1 },
  { country: "China 🇨🇳",       countryCode: "CN", count: 1 },
  { country: "Thailand 🇹🇭",    countryCode: "TH", count: 1 },
];
