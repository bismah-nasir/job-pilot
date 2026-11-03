/** Vector redraw of the JobPilot mark (the source .ico is only 32px). */
export function Logo({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <defs>
        <linearGradient id="jp-logo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e04fd8" />
          <stop offset="55%" stopColor="#9b3fe0" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="24" fill="url(#jp-logo)" />
      <g fill="none" stroke="#fff" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M36 30 L18 50 L36 70" />
        <path d="M64 30 L82 50 L64 70" />
      </g>
      <path d="M50 36 L64 50 L50 64 L36 50 Z" fill="#fff" />
      <circle cx="50" cy="50" r="5" fill="#9b3fe0" />
    </svg>
  );
}
