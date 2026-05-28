import { ButtonHTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={clsx(
        "inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
        {
          "bg-primary text-white hover:bg-primary-700 focus:ring-primary": variant === "primary",
          "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-400": variant === "secondary",
          "border border-primary text-primary hover:bg-primary-50 focus:ring-primary": variant === "outline",
          "text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-400": variant === "ghost",
          "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500": variant === "danger",
          "px-3 py-1.5 text-sm gap-1.5": size === "sm",
          "px-4 py-2.5 text-sm gap-2": size === "md",
          "px-6 py-3 text-base gap-2": size === "lg",
        },
        className
      )}
    >
      {loading && (
        <svg className="animate-spin -ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
}
