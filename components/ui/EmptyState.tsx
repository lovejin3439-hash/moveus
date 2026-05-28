import { clsx } from "clsx";
import Link from "next/link";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function EmptyState({
  icon = "📭",
  title,
  description,
  action,
  secondaryAction,
  className,
  size = "md",
}: EmptyStateProps) {
  const sizes = {
    sm: { icon: "text-3xl", title: "text-base", desc: "text-xs", pad: "py-8 px-6" },
    md: { icon: "text-4xl", title: "text-lg",   desc: "text-sm", pad: "py-12 px-8" },
    lg: { icon: "text-6xl", title: "text-2xl",  desc: "text-base", pad: "py-20 px-8" },
  };
  const s = sizes[size];

  const ActionButton = ({ label, href, onClick, primary }: { label: string; href?: string; onClick?: () => void; primary?: boolean }) => {
    const cls = clsx(
      "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all",
      primary
        ? "bg-primary text-white hover:bg-primary-700 shadow-sm hover:shadow-md"
        : "border border-gray-200 text-gray-600 hover:border-primary hover:text-primary bg-white"
    );
    if (href) return <Link href={href} className={cls}>{label}</Link>;
    if (onClick) return <button onClick={onClick} className={cls}>{label}</button>;
    return null;
  };

  return (
    <div className={clsx(
      "flex flex-col items-center justify-center text-center",
      s.pad,
      className
    )}>
      <div className={clsx(
        "mb-4 opacity-60",
        s.icon
      )}>
        {icon}
      </div>
      <p className={clsx("font-semibold text-gray-700 mb-2", s.title)}>{title}</p>
      {description && (
        <p className={clsx("text-gray-400 max-w-xs leading-relaxed mb-6", s.desc)}>
          {description}
        </p>
      )}
      {!description && (action || secondaryAction) && <div className="mb-6" />}
      {(action || secondaryAction) && (
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {action && <ActionButton {...action} primary />}
          {secondaryAction && <ActionButton {...secondaryAction} />}
        </div>
      )}
    </div>
  );
}
