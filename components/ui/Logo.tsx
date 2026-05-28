"use client";

interface LogoProps {
  /** px size of the icon emblem */
  size?: number;
  /** show the wordmark text next to the icon */
  showText?: boolean;
  /** "light" = white text (for dark backgrounds), "dark" = dark text */
  variant?: "light" | "dark";
  className?: string;
}

/**
 * MoveUs / 무브어스 brand mark
 *
 * Icon: royal-blue circle → simplified globe (latitude arcs) → bold
 * diagonal arrow cutting bottom-left → top-right (movement across the globe)
 */
export default function Logo({
  size = 36,
  showText = true,
  variant = "dark",
  className = "",
}: LogoProps) {
  const textColor = variant === "light" ? "#FFFFFF" : "#0F172A";
  const subColor  = variant === "light" ? "rgba(255,255,255,0.55)" : "#64748B";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* ── Icon emblem ── */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Outer glow / shadow ring */}
        <circle cx="20" cy="20" r="19" fill="url(#logoGradient)" />

        {/* Globe latitude arcs */}
        <path
          d="M6 20 Q20 13 34 20"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M6 20 Q20 27 34 20"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
        />
        {/* Globe longitude arc (central meridian) */}
        <path
          d="M20 5 Q13 20 20 35"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Diagonal movement arrow — origin dot → arrowhead */}
        {/* Arrow shaft */}
        <line
          x1="11" y1="29"
          x2="27" y2="13"
          stroke="white"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        {/* Arrowhead */}
        <polyline
          points="18,11 27,13 25,22"
          stroke="white"
          strokeWidth="2.8"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
        />
        {/* Origin dot */}
        <circle cx="11" cy="29" r="2.2" fill="white" opacity="0.9" />

        {/* Gradient definition */}
        <defs>
          <radialGradient id="logoGradient" cx="38%" cy="32%" r="70%">
            <stop offset="0%"   stopColor="#3B6FFF" />
            <stop offset="55%"  stopColor="#1553F0" />
            <stop offset="100%" stopColor="#0A32A8" />
          </radialGradient>
        </defs>
      </svg>

      {/* ── Wordmark ── */}
      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className="font-black tracking-tight"
            style={{
              fontSize: size * 0.55,
              color: textColor,
              letterSpacing: "-0.03em",
            }}
          >
            Move
            <span style={{ color: "#1553F0", filter: variant === "light" ? "brightness(1.6)" : "none" }}>
              Us
            </span>
          </span>
          <span
            className="font-semibold"
            style={{
              fontSize: size * 0.285,
              color: subColor,
              letterSpacing: "0.04em",
              marginTop: 1,
            }}
          >
            무브어스
          </span>
        </div>
      )}
    </div>
  );
}
