"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

// ─── 3D Emoji Component ─────────────────────────────────────────
// Renders emojis with 3D depth effect using CSS
export function Emoji3D({ emoji, size = "md", className = "" }: { emoji: string; size?: "sm" | "md" | "lg" | "xl" | "2xl"; className?: string }) {
  const sizeMap = { sm: "text-lg", md: "text-2xl", lg: "text-3xl", xl: "text-4xl", "2xl": "text-5xl" };
  return (
    <span
      className={`inline-block ${sizeMap[size]} ${className}`}
      style={{
        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15)) drop-shadow(0 4px 8px rgba(0,0,0,0.08))",
        transform: "perspective(200px) rotateX(2deg)",
      }}
    >
      {emoji}
    </span>
  );
}

// ─── AI Readiness Gauge — Full Interactive Score Display ────────
export function AIReadinessGauge({ score, level }: { score: number; level: string }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setAnimatedScore(Math.round(eased * score));
      if (progress < 1) requestAnimationFrame(tick);
    };
    const timer = setTimeout(() => requestAnimationFrame(tick), 500);
    return () => clearTimeout(timer);
  }, [score]);

  // Score zones
  const zones = [
    { label: "Getting Started", range: "0-30", color: "#94a3b8", emoji: "\u{1F331}" },
    { label: "Building Up", range: "31-50", color: "#f59e0b", emoji: "\u{1F4A1}" },
    { label: "On Track", range: "51-70", color: "#2563eb", emoji: "\u{1F4AA}" },
    { label: "AI Ready", range: "71-85", color: "#00d4ff", emoji: "\u{1F680}" },
    { label: "AI Leader", range: "86-100", color: "#10b981", emoji: "\u{1F525}" },
  ];

  const currentZone = score <= 30 ? 0 : score <= 50 ? 1 : score <= 70 ? 2 : score <= 85 ? 3 : 4;
  const untappedPotential = 100 - score;

  return (
    <div className="w-full">
      {/* Big score number */}
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <div className="relative inline-flex items-baseline gap-1">
            <span
              className="text-6xl font-black bg-gradient-to-br from-[#0a0f2c] via-[#2563eb] to-[#00d4ff] bg-clip-text text-transparent"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              {animatedScore}
            </span>
            <span className="text-2xl font-bold text-gray-300">/100</span>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="text-sm font-bold mt-1 flex items-center justify-center gap-1.5"
            style={{ color: zones[currentZone].color }}
          >
            <span className="text-lg">{zones[currentZone].emoji}</span>
            {level}
          </motion.p>
        </motion.div>
      </div>

      {/* Visual gauge bar with zones */}
      <div className="relative mb-4">
        <div className="h-3 rounded-full bg-gray-100 overflow-hidden flex">
          {zones.map((zone, i) => (
            <div
              key={i}
              className="h-full"
              style={{
                width: i === 0 ? "30%" : i === 1 ? "20%" : i === 2 ? "20%" : i === 3 ? "15%" : "15%",
                backgroundColor: `${zone.color}20`,
                borderRight: i < 4 ? "2px solid white" : "none",
              }}
            />
          ))}
        </div>
        {/* Animated fill */}
        <motion.div
          className="absolute top-0 left-0 h-3 rounded-full"
          style={{
            background: `linear-gradient(90deg, #0a0f2c, #2563eb, ${zones[currentZone].color})`,
          }}
          initial={{ width: "0%" }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
        />
        {/* Score marker */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-3 border-white shadow-lg z-10"
          style={{ background: zones[currentZone].color }}
          initial={{ left: "0%" }}
          animate={{ left: `${Math.min(score, 97)}%` }}
          transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Zone labels */}
      <div className="flex text-[8px] font-bold text-gray-400 uppercase tracking-wider mb-6">
        <div className="w-[30%] text-center">Starter</div>
        <div className="w-[20%] text-center">Growing</div>
        <div className="w-[20%] text-center">On Track</div>
        <div className="w-[15%] text-center">Ready</div>
        <div className="w-[15%] text-center">Leader</div>
      </div>

      {/* Untapped potential callout */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5 }}
        className="rounded-2xl p-4 border-2 border-dashed"
        style={{ borderColor: `${zones[currentZone].color}40`, background: `${zones[currentZone].color}08` }}
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${zones[currentZone].color}15` }}>
            <span className="text-2xl">{"\u{1F4CA}"}</span>
          </div>
          <div>
            <p className="text-xs font-bold text-[#0a0f2c]">
              {untappedPotential}% untapped AI potential
            </p>
            <p className="text-[10px] text-gray-500 mt-0.5">
              {score <= 40
                ? "Huge room for automation \u2014 your competitors may already be ahead"
                : score <= 70
                ? "Good foundation \u2014 strategic AI can unlock significant savings"
                : "Strong position \u2014 targeted AI solutions can give you the edge"}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Brand-Themed Confetti ────────────────────────────────────────
// Bursts blue/cyan/navy particles on selection — feels celebratory but on-brand
export function SelectionConfetti({ active }: { active: boolean }) {
  if (!active) return null;

  const particles = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 120,
    y: (Math.random() - 0.5) * 80 - 20,
    rotation: Math.random() * 360,
    scale: 0.4 + Math.random() * 0.6,
    color: ["#2563eb", "#00d4ff", "#0a0f2c", "#60a5fa", "#22d3ee", "#1d4ed8"][i % 6],
    shape: i % 3, // 0=circle, 1=square, 2=diamond
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible z-20">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: "50%", y: "50%", scale: 0, opacity: 1 }}
          animate={{
            x: `calc(50% + ${p.x}px)`,
            y: `calc(50% + ${p.y}px)`,
            scale: p.scale,
            opacity: 0,
            rotate: p.rotation,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            position: "absolute",
            width: p.shape === 2 ? 6 : 5,
            height: p.shape === 2 ? 6 : 5,
            backgroundColor: p.color,
            borderRadius: p.shape === 0 ? "50%" : p.shape === 2 ? "1px" : "1px",
            transform: p.shape === 2 ? "rotate(45deg)" : undefined,
          }}
        />
      ))}
    </div>
  );
}

// ─── Pulse Ring ──────────────────────────────────────────────────
// Expanding ring on selection — brand gradient
export function PulseRing({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <>
      <motion.div
        initial={{ scale: 0.8, opacity: 0.6 }}
        animate={{ scale: 1.15, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ border: "2px solid #2563eb" }}
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0.4 }}
        animate={{ scale: 1.25, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ border: "2px solid #00d4ff" }}
      />
    </>
  );
}

// ─── Selection Pulse (subtle version) ────────────────────────────
export function SelectionPulse({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0.5 }}
      animate={{ scale: 1.05, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="absolute inset-0 rounded-2xl border-2 border-[#2563eb]/40 pointer-events-none"
    />
  );
}

// ─── Step Celebration ────────────────────────────────────────────
// Shows a brief celebration when moving to next step
export function StepCelebration({ show, step }: { show: boolean; step: number }) {
  const celebrations = [
    { emoji: "\u{1F44B}", text: "Welcome!" },
    { emoji: "\u{1F3AF}", text: "Great pick!" },
    { emoji: "\u{1F4AA}", text: "Got it!" },
    { emoji: "\u{1F525}", text: "Nice selections!" },
    { emoji: "\u{2699}\uFE0F", text: "Noted!" },
    { emoji: "\u{1F4B0}", text: "Almost done!" },
    { emoji: "\u{1F680}", text: "Let's go!" },
  ];
  const c = celebrations[step] || celebrations[0];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: -10 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl shadow-2xl"
          style={{
            background: "linear-gradient(135deg, #0a0f2c 0%, #2563eb 100%)",
            boxShadow: "0 8px 32px rgba(37, 99, 235, 0.3)",
          }}
        >
          <span className="text-xl">{c.emoji}</span>
          <span className="text-white font-bold text-sm">{c.text}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Pain Intensity Slider ──────────────────────────────────────
export function PainSlider({
  value,
  onChange,
  label,
}: {
  value: number;
  onChange: (v: number) => void;
  label?: string;
}) {
  const percentage = (value / 10) * 100;
  const intensityLabel = value <= 3 ? "Low" : value <= 6 ? "Moderate" : value <= 8 ? "High" : "Critical";
  const intensityColor = value <= 3 ? "#94a3b8" : value <= 6 ? "#2563eb" : value <= 8 ? "#1d4ed8" : "#dc2626";
  const intensityEmoji = value <= 3 ? "\u{1F7E2}" : value <= 6 ? "\u{1F7E1}" : value <= 8 ? "\u{1F7E0}" : "\u{1F534}";

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1.5">
        {label && (
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
            {label}
          </span>
        )}
        <span
          className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"
          style={{ color: intensityColor }}
        >
          <span>{intensityEmoji}</span>
          {intensityLabel}
        </span>
      </div>
      <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{
            background: value <= 3
              ? "#cbd5e1"
              : value <= 6
              ? "linear-gradient(90deg, #2563eb, #60a5fa)"
              : value <= 8
              ? "linear-gradient(90deg, #2563eb, #00d4ff)"
              : "linear-gradient(90deg, #dc2626, #ef4444)",
          }}
        />
      </div>
      <input
        type="range"
        min="0"
        max="10"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-6 -mt-4 relative z-10 appearance-none bg-transparent cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-5
          [&::-webkit-slider-thumb]:h-5
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-[#0a0f2c]
          [&::-webkit-slider-thumb]:border-2
          [&::-webkit-slider-thumb]:border-white
          [&::-webkit-slider-thumb]:shadow-lg
          [&::-webkit-slider-thumb]:cursor-pointer
          [&::-webkit-slider-thumb]:transition-transform
          [&::-webkit-slider-thumb]:hover:scale-110
          [&::-moz-range-thumb]:w-5
          [&::-moz-range-thumb]:h-5
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-[#0a0f2c]
          [&::-moz-range-thumb]:border-2
          [&::-moz-range-thumb]:border-white
          [&::-moz-range-thumb]:shadow-lg
          [&::-moz-range-thumb]:cursor-pointer
        "
      />
    </div>
  );
}

// ─── Metallic CTA Button ────────────────────────────────────────
export function MetallicButton({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  if (variant === "secondary") {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={onClick}
        disabled={disabled}
        className={`px-6 py-3 rounded-xl font-semibold text-sm border-2 border-gray-200 text-gray-500 hover:border-[#2563eb]/40 hover:text-[#0a0f2c] hover:bg-blue-50/30 transition-all disabled:opacity-30 ${className}`}
      >
        {children}
      </motion.button>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.04, y: disabled ? 0 : -1 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      onClick={onClick}
      disabled={disabled}
      className={`relative overflow-hidden px-7 py-3.5 rounded-xl font-bold text-sm text-white transition-all disabled:opacity-25 disabled:cursor-not-allowed ${className}`}
      style={{
        background: disabled
          ? "#d1d5db"
          : "linear-gradient(135deg, #0a0f2c 0%, #2563eb 50%, #00b4d8 100%)",
        boxShadow: disabled
          ? "none"
          : "0 4px 20px rgba(37, 99, 235, 0.35), 0 0 0 1px rgba(37,99,235,0.1)",
      }}
    >
      {/* Shine sweep animation */}
      {!disabled && (
        <motion.div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.15) 42%, rgba(255,255,255,0.25) 45%, rgba(255,255,255,0.15) 48%, transparent 55%)",
          }}
          animate={{ x: ["-150%", "250%"] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}

// ─── Progress Bar ───────────────────────────────────────────────
export function ProgressBar({ step, totalSteps }: { step: number; totalSteps: number }) {
  const progress = ((step + 1) / totalSteps) * 100;
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-100">
      <motion.div
        className="h-full relative"
        style={{ background: "linear-gradient(90deg, #0a0f2c, #2563eb, #00d4ff)" }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Glowing tip */}
        <motion.div
          className="absolute right-0 top-0 w-8 h-full"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.6))",
            filter: "blur(2px)",
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
}

// ─── Step Dots ──────────────────────────────────────────────────
export function StepDots({ step, totalSteps }: { step: number; totalSteps: number }) {
  return (
    <div className="flex justify-center gap-2 items-center">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            width: i === step ? 28 : i < step ? 16 : 8,
            opacity: i <= step ? 1 : 0.3,
          }}
          className="h-1.5 rounded-full relative overflow-hidden"
          style={{
            background: i <= step
              ? i === step
                ? "linear-gradient(90deg, #0a0f2c, #2563eb, #00d4ff)"
                : "#2563eb"
              : "#d1d5db",
          }}
        >
          {i === step && (
            <motion.div
              className="absolute inset-0"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }}
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}

// ─── Score Preview Gauge ────────────────────────────────────────
// Live score preview while selecting pain points
export function ScorePreview({ painPointCount }: { painPointCount: number }) {
  if (painPointCount === 0) return null;

  const opportunityLevel = painPointCount <= 2 ? "Good start" : painPointCount <= 4 ? "Strong potential" : "Huge opportunity";
  const fillPercent = Math.min(painPointCount * 12, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 px-4 py-2.5 rounded-2xl border border-blue-100"
      style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.05), rgba(0,212,255,0.05))" }}
    >
      {/* Mini gauge */}
      <div className="relative w-10 h-10">
        <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="3" />
          <motion.circle
            cx="18" cy="18" r="14"
            fill="none"
            stroke="url(#miniGauge)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 14}`}
            animate={{ strokeDashoffset: 2 * Math.PI * 14 * (1 - fillPercent / 100) }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="miniGauge" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#00d4ff" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] font-extrabold text-[#2563eb]">{painPointCount}</span>
        </div>
      </div>
      <div>
        <p className="text-xs font-bold text-[#0a0f2c]">{opportunityLevel} {"\u{2728}"}</p>
        <p className="text-[10px] text-gray-500">
          {painPointCount} area{painPointCount > 1 ? "s" : ""} to automate
        </p>
      </div>
    </motion.div>
  );
}

// ─── Floating Emoji Badge ───────────────────────────────────────
// Small emoji badge that appears on selection
export function FloatingEmoji({ emoji, show }: { emoji: string; show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.span
          initial={{ scale: 0, y: 0, opacity: 1 }}
          animate={{ scale: 1.5, y: -30, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute -top-2 right-2 text-lg pointer-events-none z-30"
        >
          {emoji}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

// ─── Streak Counter ─────────────────────────────────────────────
// Shows streak when selecting multiple pain points quickly
export function StreakCounter({ count, show }: { count: number; show: boolean }) {
  if (!show || count < 2) return null;

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.5, opacity: 0 }}
      className="fixed bottom-24 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full shadow-xl"
      style={{
        background: "linear-gradient(135deg, #0a0f2c, #2563eb)",
        boxShadow: "0 4px 20px rgba(37, 99, 235, 0.4)",
      }}
    >
      <span className="text-base">{"\u{1F525}"}</span>
      <span className="text-white font-bold text-sm">{count}x Streak!</span>
    </motion.div>
  );
}

// ─── Animated Number Counter ────────────────────────────────────
export function AnimatedCounter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [value]);

  return (
    <span>
      {prefix}{display}{suffix}
    </span>
  );
}
