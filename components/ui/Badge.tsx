import { clsx } from "clsx";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info" | "primary" | "teal";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export default function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold",
        {
          "bg-gray-100 text-gray-700":        variant === "default",
          "bg-green-100 text-green-700":      variant === "success",
          "bg-yellow-100 text-yellow-800":    variant === "warning",
          "bg-red-100 text-red-700":          variant === "danger",
          "bg-blue-100 text-blue-700":        variant === "info",
          "bg-primary-50 text-primary-700":   variant === "primary" || variant === "teal",
        },
        className
      )}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ status, lang = "en" }: { status: string; lang?: string }) {
  const map: Record<string, { en: string; ko: string; variant: BadgeVariant }> = {
    QUOTING:    { en: "Quoting",     ko: "견적 중",   variant: "default"  },
    CONTRACTED: { en: "Contracted",  ko: "계약 완료", variant: "warning"  },
    PACKED:     { en: "Packed",      ko: "포장 완료", variant: "info"     },
    IN_TRANSIT: { en: "In Transit",  ko: "운송 중",   variant: "primary"  },
    ARRIVED:    { en: "Arrived",     ko: "도착",      variant: "success"  },
    DELIVERED:  { en: "Delivered",   ko: "완료",      variant: "success"  },
    CANCELLED:  { en: "Cancelled",   ko: "취소",      variant: "danger"   },
  };
  const entry = map[status] ?? { en: status, ko: status, variant: "default" as BadgeVariant };
  return <Badge variant={entry.variant}>{lang === "ko" ? entry.ko : entry.en}</Badge>;
}
