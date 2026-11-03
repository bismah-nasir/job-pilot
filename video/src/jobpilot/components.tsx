import type { ReactNode } from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fontFamily } from "./theme";

/** Dark navy backdrop with soft purple glows and a faint dot grid. */
export function Background({ children }: { children?: ReactNode }) {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 60) * 40;
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, fontFamily, color: colors.text }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(900px 600px at ${15 + drift / 40}% 10%, rgba(147,51,234,0.30), transparent 70%),
            radial-gradient(800px 600px at 90% ${95 - drift / 40}%, rgba(192,38,211,0.20), transparent 70%)`,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1.5px, transparent 1.5px)",
          backgroundSize: "36px 36px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />
      {children}
    </AbsoluteFill>
  );
}

/** 0 → 1 entrance spring, starting `delay` frames into the scene. */
export function useEntrance(delay = 0) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping: 200 } });
}

export function Chip({ children, accent = colors.lilac }: { children: ReactNode; accent?: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 22px",
        borderRadius: 999,
        border: `1.5px solid ${accent}55`,
        background: `${accent}1f`,
        color: accent,
        fontSize: 24,
        fontWeight: 600,
        letterSpacing: 0.5,
      }}
    >
      {children}
    </span>
  );
}

/** Kicker chip + headline shown above each screen. */
export function Caption({ kicker, title }: { kicker: string; title: ReactNode }) {
  const enter = useEntrance(4);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 18,
        opacity: enter,
        transform: `translateY(${interpolate(enter, [0, 1], [24, 0])}px)`,
      }}
    >
      <Chip>{kicker}</Chip>
      <div style={{ fontSize: 54, fontWeight: 800, letterSpacing: -1.2, textAlign: "center" }}>{title}</div>
    </div>
  );
}

export function Highlight({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        backgroundImage: `linear-gradient(90deg, ${colors.lilac}, ${colors.magenta})`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}
    >
      {children}
    </span>
  );
}

/** Minimal browser window chrome around a screen. */
export function BrowserFrame({
  url,
  width,
  height,
  children,
}: {
  url: string;
  width: number;
  height: number;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 22,
        overflow: "hidden",
        background: colors.card,
        border: `1.5px solid ${colors.border}`,
        boxShadow: "0 40px 120px rgba(0,0,0,0.55), 0 0 0 1px rgba(168,85,247,0.15)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ height: 52, display: "flex", alignItems: "center", gap: 10, padding: "0 22px", flexShrink: 0 }}>
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <span key={c} style={{ width: 14, height: 14, borderRadius: 7, background: c }} />
        ))}
        <div
          style={{
            marginLeft: 18,
            flex: 1,
            maxWidth: 620,
            height: 32,
            borderRadius: 8,
            background: "rgba(255,255,255,0.06)",
            color: colors.muted,
            fontSize: 17,
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
          }}
        >
          {url}
        </div>
      </div>
      <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>{children}</div>
    </div>
  );
}
