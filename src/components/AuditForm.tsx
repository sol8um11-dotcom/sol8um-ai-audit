"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  sectors,
  businessSizes,
  techReadiness,
  budgetRanges,
  generateAuditResult,
  type AuditResult,
} from "@/lib/knowledge-base";
import { saveAuditResult } from "@/lib/supabase";
import ResultsView from "./ResultsView";
import FloatingHints, { MobileFloatingHints } from "./FloatingHints";
import Logo from "./Logo";
import {
  SelectionConfetti,
  PulseRing,
  StepCelebration,
  PainSlider,
  MetallicButton,
  ProgressBar,
  StepDots,
  ScorePreview,
  FloatingEmoji,
  Emoji3D,
} from "./Gamification";
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Check,
  Lock,
  RotateCcw,
} from "lucide-react";

const TOTAL_STEPS = 8;

// Tribe definitions
const tribes = [
  { id: "franchisor", label: "Franchisor", desc: "You own & license the brand", emoji: "\u{1F451}", gradient: "from-amber-400/20 to-orange-400/10" },
  { id: "franchisee", label: "Franchisee", desc: "You operate a franchise unit", emoji: "\u{1F3EA}", gradient: "from-blue-400/20 to-cyan-400/10" },
  { id: "investor", label: "Investor", desc: "You fund or evaluate businesses", emoji: "\u{1F4B8}", gradient: "from-emerald-400/20 to-teal-400/10" },
  { id: "distributor", label: "Distributor", desc: "You supply & deliver products", emoji: "\u{1F69A}", gradient: "from-purple-400/20 to-violet-400/10" },
];

// Sector emojis
const sectorEmojis: Record<string, string> = {
  "food-restaurant": "\u{1F354}",
  "hotel-travel-tourism": "\u{1F3E8}",
  "ecommerce-d2c": "\u{1F6D2}",
  "auto-ev": "\u{1F697}",
  "beauty-health-wellness": "\u{2728}",
  "education-edtech": "\u{1F393}",
  "specialty-services": "\u{2699}\uFE0F",
  "fashion-jewelry": "\u{1F48E}",
  "dealer-distributor": "\u{1F4E6}",
};

const sizeEmojis: Record<string, string> = {
  solo: "\u{1F9D1}\u{200D}\u{1F4BB}",
  micro: "\u{1F465}",
  small: "\u{1F3E2}",
  medium: "\u{1F3ED}",
  large: "\u{1F310}",
};

const techEmojis: Record<string, string> = {
  beginner: "\u{1F331}",
  basic: "\u{1F4F1}",
  intermediate: "\u{2699}\uFE0F",
  advanced: "\u{1F680}",
};

const budgetEmojis: Record<string, string> = {
  bootstrap: "\u{1F331}",
  growing: "\u{1F4C8}",
  scaling: "\u{1F680}",
  enterprise: "\u{1F3AF}",
};

// Glass card wrapper for the main content area
function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative rounded-3xl border border-white/20 ${className}`}
      style={{
        background: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 8px 40px rgba(10, 15, 44, 0.12), 0 0 0 1px rgba(255,255,255,0.1) inset",
      }}
    >
      {children}
    </div>
  );
}

export default function AuditForm() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [lastSelected, setLastSelected] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationStep, setCelebrationStep] = useState(0);
  const autoAdvanceTimer = useRef<NodeJS.Timeout | null>(null);

  // Form data
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [selectedTribe, setSelectedTribe] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedTech, setSelectedTech] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedPainPoints, setSelectedPainPoints] = useState<string[]>([]);
  const [painIntensities, setPainIntensities] = useState<Record<string, number>>({});

  const currentSector = sectors.find((s) => s.id === selectedSector);

  useEffect(() => {
    if (lastSelected) {
      const timer = setTimeout(() => setLastSelected(null), 700);
      return () => clearTimeout(timer);
    }
  }, [lastSelected]);

  useEffect(() => {
    if (showCelebration) {
      const timer = setTimeout(() => setShowCelebration(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [showCelebration]);

  const scheduleAutoAdvance = useCallback(() => {
    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    autoAdvanceTimer.current = setTimeout(() => {
      setDirection(1);
      setCelebrationStep(step);
      setShowCelebration(true);
      setStep((s) => s + 1);
    }, 600);
  }, [step]);

  useEffect(() => {
    return () => {
      if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    };
  }, []);

  const canProceed = useCallback(() => {
    switch (step) {
      case 0: return name.trim().length >= 2;
      case 1: return selectedTribe !== "";
      case 2: return selectedSector !== "";
      case 3: return selectedSize !== "";
      case 4: return selectedPainPoints.length >= 1;
      case 5: return selectedTech !== "";
      case 6: return selectedBudget !== "";
      case 7: return phone.trim().length >= 10 && businessName.trim().length >= 1;
      default: return false;
    }
  }, [step, name, selectedTribe, selectedSector, selectedSize, selectedPainPoints, selectedTech, selectedBudget, phone, businessName]);

  const goNext = useCallback(() => {
    if (!canProceed()) return;
    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    setDirection(1);
    setCelebrationStep(step);
    setShowCelebration(true);
    if (step < TOTAL_STEPS - 1) {
      setStep((s) => s + 1);
    } else {
      handleSubmit();
    }
  }, [step, canProceed]);

  const goBack = useCallback(() => {
    if (step > 0) {
      if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
      setDirection(-1);
      setStep((s) => s - 1);
    }
  }, [step]);

  const togglePainPoint = (id: string) => {
    setSelectedPainPoints((prev) => {
      if (prev.includes(id)) {
        const newIntensities = { ...painIntensities };
        delete newIntensities[id];
        setPainIntensities(newIntensities);
        return prev.filter((p) => p !== id);
      }
      setPainIntensities((prev) => ({ ...prev, [id]: 5 }));
      return [...prev, id];
    });
    setLastSelected(id);
  };

  const updatePainIntensity = (id: string, value: number) => {
    setPainIntensities((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 3000));
    const auditResult = generateAuditResult(
      selectedSector,
      selectedPainPoints,
      selectedSize,
      selectedTech,
      selectedBudget,
      painIntensities
    );
    saveAuditResult({
      name,
      phone,
      business_name: businessName,
      tribe: selectedTribe,
      sector: selectedSector,
      business_size: selectedSize,
      tech_level: selectedTech,
      budget: selectedBudget,
      pain_points: selectedPainPoints,
      overall_score: auditResult.overallScore,
      estimated_savings: auditResult.estimatedMonthlySavings,
      top_solutions: auditResult.topSolutions.map((s) => s.title),
      source: "fro-jaipur-2026",
    });
    setResult(auditResult);
    setIsGenerating(false);
  };

  const handleRestart = () => {
    setStep(0);
    setDirection(1);
    setResult(null);
    setIsGenerating(false);
    setName("");
    setPhone("");
    setBusinessName("");
    setSelectedTribe("");
    setSelectedSector("");
    setSelectedSize("");
    setSelectedTech("");
    setSelectedBudget("");
    setSelectedPainPoints([]);
    setPainIntensities({});
    setLastSelected(null);
  };

  if (isGenerating) return <LoadingScreen name={name} />;
  if (result) return <ResultsView result={result} userName={name} businessName={businessName} onRestart={handleRestart} />;

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a0f2c 0%, #0d1b3e 25%, #122550 50%, #0a1628 100%)" }}>
      {/* Animated background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.15), transparent 70%)", top: "-10%", left: "-15%" }}
          animate={{ x: [0, 80, 0], y: [0, -60, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,212,255,0.12), transparent 70%)", bottom: "-10%", right: "-10%" }}
          animate={{ x: [0, -60, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.08), transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      <ProgressBar step={step} totalSteps={TOTAL_STEPS} />
      <StepCelebration show={showCelebration} step={celebrationStep} />

      {/* Header */}
      <header className="relative z-10 pt-5 md:pt-6 pb-2 px-6">
        <div className="flex items-center justify-between max-w-xl md:max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <Logo size="sm" variant="light" />
          </div>
          {step > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={handleRestart}
              className="flex items-center gap-1.5 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-semibold text-white/50 hover:text-white/80 border border-white/10 hover:border-white/25 transition-all hover:bg-white/5"
            >
              <RotateCcw className="w-3 h-3" />
              Start New
            </motion.button>
          )}
        </div>
      </header>

      {/* Step dots */}
      <div className="relative z-10 px-6 mb-3 md:mb-4">
        <StepDots step={step} totalSteps={TOTAL_STEPS} />
      </div>

      {/* Mobile floating hints */}
      <div className="relative z-10 px-4">
        <MobileFloatingHints step={step} sectorId={selectedSector} />
      </div>

      {/* Main layout */}
      <div className="relative z-10 flex-1 flex items-start justify-center gap-6 px-4 md:px-8 pb-6 max-w-6xl mx-auto w-full">
        <FloatingHints step={step} sectorId={selectedSector} side="left" />

        <div className="flex-1 max-w-xl md:max-w-2xl flex flex-col min-h-0">
          <GlassCard className="p-6 sm:p-8 md:p-10 flex-1 flex flex-col">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                initial={{ x: direction * 80, opacity: 0, scale: 0.96 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ x: -direction * 80, opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                className="flex-1 flex flex-col"
              >
                {step === 0 && <StepName name={name} setName={setName} onNext={goNext} />}
                {step === 1 && (
                  <StepTribe selected={selectedTribe} onSelect={(id) => {
                    setSelectedTribe(id);
                    setLastSelected(id);
                    scheduleAutoAdvance();
                  }} lastSelected={lastSelected} />
                )}
                {step === 2 && (
                  <StepSector selected={selectedSector} onSelect={(id) => {
                    setSelectedSector(id);
                    setSelectedPainPoints([]);
                    setPainIntensities({});
                    setLastSelected(id);
                    scheduleAutoAdvance();
                  }} lastSelected={lastSelected} />
                )}
                {step === 3 && (
                  <StepSize selected={selectedSize} onSelect={(id) => {
                    setSelectedSize(id);
                    setLastSelected(id);
                    scheduleAutoAdvance();
                  }} lastSelected={lastSelected} />
                )}
                {step === 4 && currentSector && (
                  <StepPainPoints sector={currentSector} selected={selectedPainPoints} onToggle={togglePainPoint} painIntensities={painIntensities} onIntensityChange={updatePainIntensity} lastSelected={lastSelected} />
                )}
                {step === 5 && (
                  <StepTech selected={selectedTech} onSelect={(id) => {
                    setSelectedTech(id);
                    setLastSelected(id);
                    scheduleAutoAdvance();
                  }} lastSelected={lastSelected} />
                )}
                {step === 6 && (
                  <StepBudget selected={selectedBudget} onSelect={(id) => {
                    setSelectedBudget(id);
                    setLastSelected(id);
                    scheduleAutoAdvance();
                  }} lastSelected={lastSelected} />
                )}
                {step === 7 && (
                  <StepContact phone={phone} setPhone={setPhone} businessName={businessName} setBusinessName={setBusinessName} onSubmit={goNext} />
                )}
              </motion.div>
            </AnimatePresence>

            {step === 4 && selectedPainPoints.length > 0 && (
              <div className="flex justify-center mt-4">
                <ScorePreview painPointCount={selectedPainPoints.length} />
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-5 md:mt-7 pt-5 md:pt-6 border-t border-gray-200/40">
              <button onClick={goBack} className={`flex items-center gap-1.5 text-sm md:text-base font-medium transition-all ${step === 0 ? "opacity-0 pointer-events-none" : "text-gray-400 hover:text-[#0a0f2c] hover:gap-2.5"}`}>
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <MetallicButton onClick={goNext} disabled={!canProceed()}>
                {step === TOTAL_STEPS - 1 ? (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate My Audit {"\u{1F680}"}
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </MetallicButton>
            </div>
          </GlassCard>
        </div>

        <FloatingHints step={step} sectorId={selectedSector} side="right" />
      </div>
    </div>
  );
}

// ─── Step: Name ───────────────────────────────────────────────────
function StepName({ name, setName, onNext }: { name: string; setName: (v: string) => void; onNext: () => void }) {
  return (
    <div className="flex-1 flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6"
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0a0f2c] mb-3 md:mb-4 leading-[1.1] tracking-tight" style={{ fontFamily: "var(--font-display), sans-serif" }}>
          <span className="bg-gradient-to-r from-[#0a0f2c] via-[#2563eb] to-[#00d4ff] bg-clip-text text-transparent">AI Opportunity</span>
          <br />
          <span className="text-[#0a0f2c]">Audit</span>
        </h2>
        <div className="flex items-center justify-center gap-3 md:gap-4 mt-4 mb-2">
          <div className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-blue-50 border border-blue-100">
            <span className="text-sm md:text-base">{"\u{26A1}"}</span>
            <span className="text-[11px] md:text-sm font-bold text-[#2563eb]">60 seconds</span>
          </div>
          <div className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-cyan-50 border border-cyan-100">
            <span className="text-sm md:text-base">{"\u{1F3AF}"}</span>
            <span className="text-[11px] md:text-sm font-bold text-cyan-700">Instant results</span>
          </div>
          <div className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-emerald-50 border border-emerald-100">
            <span className="text-sm md:text-base">{"\u{2705}"}</span>
            <span className="text-[11px] md:text-sm font-bold text-emerald-700">Free forever</span>
          </div>
        </div>
      </motion.div>
      <div className="relative group">
        <div className="absolute -inset-1 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 blur-md" style={{ background: "linear-gradient(135deg, #2563eb, #00d4ff)" }} />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onNext()}
          placeholder="Your first name"
          autoFocus
          className="relative w-full px-8 md:px-10 py-6 md:py-7 text-xl md:text-2xl rounded-2xl border-2 border-gray-200 focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 outline-none transition-all bg-white text-[#0a0f2c] placeholder:text-gray-300 font-semibold"
          style={{ fontFamily: "var(--font-display), sans-serif" }}
        />
      </div>
      {name.trim().length >= 2 ? (
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-[#2563eb] text-center mt-4 font-semibold">
          {"\u{2728}"} Nice to meet you, {name}! Press Enter to continue
        </motion.p>
      ) : (
        <p className="text-xs text-gray-400 text-center mt-4">Press Enter or tap Continue</p>
      )}
    </div>
  );
}

// ─── Step: Tribe ──────────────────────────────────────────────────
function StepTribe({ selected, onSelect, lastSelected }: { selected: string; onSelect: (id: string) => void; lastSelected: string | null }) {
  return (
    <div className="flex-1 flex flex-col justify-center">
      <div className="text-center mb-3 md:mb-4">
        <span className="text-5xl md:text-6xl" style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))", display: "inline-block", transform: "perspective(200px) rotateX(5deg)" }}>{"\u{1F30D}"}</span>
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0a0f2c] text-center mb-2 tracking-tight" style={{ fontFamily: "var(--font-display), sans-serif" }}>
        What tribe do you belong to?
      </h2>
      <p className="text-gray-500 text-sm md:text-base mb-7 md:mb-8 text-center font-medium">This helps us personalize your AI audit</p>
      <div className="grid grid-cols-2 gap-4 md:gap-5">
        {tribes.map((tribe) => {
          const isSelected = selected === tribe.id;
          return (
            <motion.button
              key={tribe.id}
              whileTap={{ scale: 0.93 }}
              whileHover={{ y: -6, scale: 1.03 }}
              onClick={() => onSelect(tribe.id)}
              className={`relative flex flex-col items-center gap-3 md:gap-4 p-7 md:p-8 rounded-3xl border-2 transition-all duration-300 cursor-pointer ${
                isSelected
                  ? "border-[#2563eb] shadow-2xl shadow-blue-500/25"
                  : "border-gray-100 hover:border-blue-200 hover:shadow-xl"
              }`}
              style={{
                background: isSelected
                  ? "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(0,212,255,0.05))"
                  : "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,250,255,0.9))",
              }}
            >
              <SelectionConfetti active={lastSelected === tribe.id} />
              <PulseRing active={lastSelected === tribe.id} />
              <span className="text-5xl md:text-6xl" style={{ filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.12))", display: "inline-block", transform: "perspective(200px) rotateX(3deg)" }}>{tribe.emoji}</span>
              <div className="text-center">
                <span className={`block text-base md:text-lg font-bold ${isSelected ? "text-[#2563eb]" : "text-[#0a0f2c]"}`} style={{ fontFamily: "var(--font-display), sans-serif" }}>{tribe.label}</span>
                <span className="text-[11px] md:text-sm text-gray-500 mt-1 block leading-snug">{tribe.desc}</span>
              </div>
              {isSelected && (
                <motion.div layoutId="tribe-check" initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg" style={{ background: "linear-gradient(135deg, #2563eb, #00d4ff)" }}>
                  <Check className="w-4.5 h-4.5" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step: Sector ─────────────────────────────────────────────────
function StepSector({ selected, onSelect, lastSelected }: { selected: string; onSelect: (id: string) => void; lastSelected: string | null }) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="text-center mb-3 md:mb-4">
        <span className="text-5xl md:text-6xl" style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))", display: "inline-block", transform: "perspective(200px) rotateX(5deg)" }}>{"\u{1F3AF}"}</span>
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0a0f2c] text-center mb-2 tracking-tight" style={{ fontFamily: "var(--font-display), sans-serif" }}>
        What&apos;s your arena?
      </h2>
      <p className="text-gray-500 text-sm md:text-base mb-6 md:mb-7 text-center font-medium">Pick the closest match to your business</p>
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        {sectors.map((sector) => {
          const isSelected = selected === sector.id;
          const emoji = sectorEmojis[sector.id] || "\u{1F4BC}";
          return (
            <motion.button
              key={sector.id}
              whileTap={{ scale: 0.9 }}
              whileHover={{ y: -5, scale: 1.05 }}
              onClick={() => onSelect(sector.id)}
              className={`relative flex flex-col items-center gap-2.5 md:gap-3 p-4 sm:p-5 md:p-6 rounded-2xl border-2 transition-all duration-300 ${
                isSelected
                  ? "border-[#2563eb] shadow-xl shadow-blue-500/20"
                  : "border-gray-100 hover:border-blue-200 hover:shadow-lg"
              }`}
              style={{
                background: isSelected
                  ? "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(0,212,255,0.05))"
                  : "rgba(255,255,255,0.7)",
              }}
            >
              <SelectionConfetti active={lastSelected === sector.id} />
              <PulseRing active={lastSelected === sector.id} />
              <span className="text-3xl sm:text-4xl md:text-5xl" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))", display: "inline-block", transform: "perspective(200px) rotateX(3deg)" }}>{emoji}</span>
              <span className={`text-[11px] sm:text-xs md:text-sm font-bold text-center leading-tight ${isSelected ? "text-[#2563eb]" : "text-gray-700"}`}>{sector.shortName}</span>
              {isSelected && (
                <motion.div layoutId="sector-check" initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full flex items-center justify-center text-white shadow-md" style={{ background: "linear-gradient(135deg, #2563eb, #00d4ff)" }}>
                  <Check className="w-3.5 h-3.5" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step: Size ───────────────────────────────────────────────────
function StepSize({ selected, onSelect, lastSelected }: { selected: string; onSelect: (id: string) => void; lastSelected: string | null }) {
  return (
    <div className="flex-1 flex flex-col justify-center">
      <div className="text-center mb-3 md:mb-4">
        <span className="text-5xl md:text-6xl" style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))", display: "inline-block", transform: "perspective(200px) rotateX(5deg)" }}>{"\u{1F4AA}"}</span>
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0a0f2c] text-center mb-2 tracking-tight" style={{ fontFamily: "var(--font-display), sans-serif" }}>How big is your team?</h2>
      <p className="text-gray-500 text-sm md:text-base mb-6 md:mb-7 text-center font-medium">Helps us calibrate the right solutions</p>
      <div className="flex flex-col gap-3 md:gap-4">
        {businessSizes.map((size) => {
          const isSelected = selected === size.id;
          const emoji = sizeEmojis[size.id] || "\u{1F465}";
          return (
            <motion.button
              key={size.id}
              whileTap={{ scale: 0.97 }}
              whileHover={{ x: 6, scale: 1.02 }}
              onClick={() => onSelect(size.id)}
              className={`relative flex items-center gap-5 md:gap-6 p-5 sm:p-6 md:p-7 rounded-2xl border-2 transition-all duration-300 text-left ${
                isSelected
                  ? "border-[#2563eb] shadow-xl shadow-blue-500/15"
                  : "border-gray-100 hover:border-blue-200 hover:shadow-lg"
              }`}
              style={{
                background: isSelected
                  ? "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(0,212,255,0.05))"
                  : "rgba(255,255,255,0.7)",
              }}
            >
              <PulseRing active={lastSelected === size.id} />
              <FloatingEmoji emoji={emoji} show={lastSelected === size.id} />
              <span className="text-3xl md:text-4xl" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))", display: "inline-block" }}>{emoji}</span>
              <div className="flex-1">
                <div className={`font-bold text-base md:text-lg ${isSelected ? "text-[#0a0f2c]" : "text-gray-900"}`} style={{ fontFamily: "var(--font-display), sans-serif" }}>{size.label}</div>
                <div className="text-xs md:text-sm text-gray-500 mt-0.5">{size.description}</div>
              </div>
              <motion.div animate={{ scale: isSelected ? 1 : 0 }} className="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-md" style={{ background: "linear-gradient(135deg, #2563eb, #00d4ff)" }}>
                <Check className="w-4 h-4" />
              </motion.div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step: Pain Points ────────────────────────────────────────────
function StepPainPoints({ sector, selected, onToggle, painIntensities, onIntensityChange, lastSelected }: {
  sector: (typeof sectors)[0]; selected: string[]; onToggle: (id: string) => void;
  painIntensities: Record<string, number>; onIntensityChange: (id: string, value: number) => void; lastSelected: string | null;
}) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="text-center mb-3 md:mb-4">
        <span className="text-5xl md:text-6xl" style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))", display: "inline-block", transform: "perspective(200px) rotateX(5deg)" }}>{"\u{1F525}"}</span>
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0a0f2c] mb-2 text-center tracking-tight" style={{ fontFamily: "var(--font-display), sans-serif" }}>What&apos;s bleeding your time?</h2>
      <p className="text-gray-500 text-sm md:text-base mb-5 md:mb-6 text-center font-medium">Select all that apply {"\u{1F447}"} then rate the impact</p>
      <div className="flex flex-col gap-3 md:gap-4 max-h-[50vh] md:max-h-[55vh] overflow-y-auto pr-1 scrollbar-hide">
        {sector.painPoints.map((pp) => {
          const isSelected = selected.includes(pp.id);
          return (
            <div key={pp.id}>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => onToggle(pp.id)}
                className={`relative w-full flex items-center gap-4 md:gap-5 p-5 md:p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                  isSelected
                    ? "border-[#2563eb] shadow-lg shadow-blue-500/10"
                    : "border-gray-100 hover:border-blue-200 hover:shadow-md"
                }`}
                style={{
                  background: isSelected
                    ? "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(0,212,255,0.04))"
                    : "rgba(255,255,255,0.7)",
                }}
              >
                <SelectionConfetti active={lastSelected === pp.id && isSelected} />
                <div className="flex-1">
                  <span className={`font-semibold text-[15px] md:text-base block ${isSelected ? "text-[#0a0f2c]" : "text-gray-700"}`}>{pp.label}</span>
                  {pp.description && (
                    <span className="text-[11px] md:text-xs text-gray-400 mt-0.5 block leading-snug">{pp.description}</span>
                  )}
                </div>
                <motion.div animate={{ scale: isSelected ? 1 : 0.85, backgroundColor: isSelected ? "#2563eb" : "#e5e7eb" }} className="w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center flex-shrink-0">
                  {isSelected && <motion.span initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring" }}><Check className="w-4 h-4 text-white" /></motion.span>}
                </motion.div>
              </motion.button>
              <AnimatePresence>
                {isSelected && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                    <div className="px-5 pt-2 pb-3"><PainSlider value={painIntensities[pp.id] || 5} onChange={(v) => onIntensityChange(pp.id, v)} label="Impact level" /></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
      {selected.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-3 mt-5 py-3 px-5 rounded-2xl mx-auto" style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.06), rgba(0,212,255,0.06))" }}>
          <div className="flex -space-x-1.5">
            {selected.map((_, i) => (<motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.05, type: "spring" }} className="w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm" style={{ background: "linear-gradient(135deg, #2563eb, #00d4ff)" }} />))}
          </div>
          <span className="text-sm font-bold text-[#0a0f2c]">{"\u{1F525}"} {selected.length} challenge{selected.length > 1 ? "s" : ""} selected</span>
        </motion.div>
      )}
    </div>
  );
}

// ─── Step: Tech Level ─────────────────────────────────────────────
function StepTech({ selected, onSelect, lastSelected }: { selected: string; onSelect: (id: string) => void; lastSelected: string | null }) {
  return (
    <div className="flex-1 flex flex-col justify-center">
      <div className="text-center mb-3 md:mb-4">
        <span className="text-5xl md:text-6xl" style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))", display: "inline-block", transform: "perspective(200px) rotateX(5deg)" }}>{"\u{2699}\uFE0F"}</span>
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0a0f2c] text-center mb-2 tracking-tight" style={{ fontFamily: "var(--font-display), sans-serif" }}>Current tech level?</h2>
      <p className="text-gray-500 text-sm md:text-base mb-6 md:mb-7 text-center font-medium">Helps us recommend the right starting point</p>
      <div className="flex flex-col gap-3 md:gap-4">
        {techReadiness.map((level) => {
          const isSelected = selected === level.id;
          const emoji = techEmojis[level.id] || "\u{1F4BB}";
          return (
            <motion.button
              key={level.id}
              whileTap={{ scale: 0.97 }}
              whileHover={{ x: 6, scale: 1.02 }}
              onClick={() => onSelect(level.id)}
              className={`relative flex items-center gap-5 md:gap-6 p-5 sm:p-6 md:p-7 rounded-2xl border-2 transition-all duration-300 text-left ${
                isSelected
                  ? "border-[#2563eb] shadow-xl shadow-blue-500/15"
                  : "border-gray-100 hover:border-blue-200 hover:shadow-lg"
              }`}
              style={{
                background: isSelected
                  ? "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(0,212,255,0.05))"
                  : "rgba(255,255,255,0.7)",
              }}
            >
              <PulseRing active={lastSelected === level.id} />
              <FloatingEmoji emoji={emoji} show={lastSelected === level.id} />
              <span className="text-3xl md:text-4xl" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))", display: "inline-block" }}>{emoji}</span>
              <div className="flex-1">
                <div className={`font-bold text-base md:text-lg ${isSelected ? "text-[#0a0f2c]" : "text-gray-900"}`} style={{ fontFamily: "var(--font-display), sans-serif" }}>{level.label}</div>
                <div className="text-xs md:text-sm text-gray-500 mt-0.5">{level.description}</div>
              </div>
              <motion.div animate={{ scale: isSelected ? 1 : 0 }} className="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-md" style={{ background: "linear-gradient(135deg, #2563eb, #00d4ff)" }}>
                <Check className="w-4 h-4" />
              </motion.div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step: Budget ─────────────────────────────────────────────────
function StepBudget({ selected, onSelect, lastSelected }: { selected: string; onSelect: (id: string) => void; lastSelected: string | null }) {
  return (
    <div className="flex-1 flex flex-col justify-center">
      <div className="text-center mb-3 md:mb-4">
        <span className="text-5xl md:text-6xl" style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))", display: "inline-block", transform: "perspective(200px) rotateX(5deg)" }}>{"\u{1F4B0}"}</span>
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0a0f2c] text-center mb-2 tracking-tight" style={{ fontFamily: "var(--font-display), sans-serif" }}>Monthly tech budget?</h2>
      <p className="text-gray-500 text-sm md:text-base mb-6 md:mb-7 text-center font-medium">We&apos;ll match solutions to your investment capacity</p>
      <div className="grid grid-cols-2 gap-4 md:gap-5">
        {budgetRanges.map((range) => {
          const isSelected = selected === range.id;
          const emoji = budgetEmojis[range.id] || "\u{1F4B5}";
          return (
            <motion.button
              key={range.id}
              whileTap={{ scale: 0.93 }}
              whileHover={{ y: -6, scale: 1.03 }}
              onClick={() => onSelect(range.id)}
              className={`relative flex flex-col items-center gap-3 md:gap-4 p-7 md:p-8 rounded-2xl border-2 transition-all duration-300 ${
                isSelected
                  ? "border-[#2563eb] shadow-xl shadow-blue-500/20"
                  : "border-gray-100 hover:border-blue-200 hover:shadow-lg"
              }`}
              style={{
                background: isSelected
                  ? "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(0,212,255,0.05))"
                  : "rgba(255,255,255,0.7)",
              }}
            >
              <PulseRing active={lastSelected === range.id} />
              <span className="text-4xl md:text-5xl" style={{ filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.12))", display: "inline-block", transform: "perspective(200px) rotateX(3deg)" }}>{emoji}</span>
              <span className={`font-bold text-base md:text-lg ${isSelected ? "text-[#0a0f2c]" : "text-gray-900"}`} style={{ fontFamily: "var(--font-display), sans-serif" }}>{range.label}</span>
              <span className="text-xs md:text-sm text-gray-500 leading-snug text-center">{range.description}</span>
              {isSelected && (
                <motion.div layoutId="budget-check" initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-white shadow-lg" style={{ background: "linear-gradient(135deg, #2563eb, #00d4ff)" }}>
                  <Check className="w-4 h-4" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step: Contact ────────────────────────────────────────────────
function StepContact({ phone, setPhone, businessName, setBusinessName, onSubmit }: { phone: string; setPhone: (v: string) => void; businessName: string; setBusinessName: (v: string) => void; onSubmit: () => void; }) {
  return (
    <div className="flex-1 flex flex-col justify-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.6 }} className="text-center mb-4 md:mb-5">
        <span className="text-6xl md:text-7xl" style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))", display: "inline-block", transform: "perspective(200px) rotateX(5deg)" }}>{"\u{1F389}"}</span>
      </motion.div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0a0f2c] mb-2 text-center tracking-tight" style={{ fontFamily: "var(--font-display), sans-serif" }}>Almost there! {"\u{1F680}"}</h2>
      <p className="text-gray-500 text-sm md:text-base mb-8 md:mb-9 text-center font-medium">We&apos;ll send your detailed report here</p>
      <div className="flex flex-col gap-5 md:gap-6">
        <div>
          <label className="block text-xs md:text-sm font-bold text-gray-500 mb-2 md:mb-3 ml-1 uppercase tracking-wider" style={{ fontFamily: "var(--font-display), sans-serif" }}>{"\u{1F3E2}"} Business Name</label>
          <div className="relative group">
            <div className="absolute -inset-1 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 blur-md" style={{ background: "linear-gradient(135deg, #2563eb, #00d4ff)" }} />
            <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="Your company / brand name" className="relative w-full px-6 md:px-8 py-5 md:py-6 text-lg md:text-xl rounded-2xl border-2 border-gray-200 focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 outline-none transition-all bg-white text-[#0a0f2c] placeholder:text-gray-300 font-semibold" style={{ fontFamily: "var(--font-display), sans-serif" }} />
          </div>
        </div>
        <div>
          <label className="block text-xs md:text-sm font-bold text-gray-500 mb-2 md:mb-3 ml-1 uppercase tracking-wider" style={{ fontFamily: "var(--font-display), sans-serif" }}>{"\u{1F4F1}"} WhatsApp Number</label>
          <div className="relative group">
            <div className="absolute -inset-1 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 blur-md" style={{ background: "linear-gradient(135deg, #2563eb, #00d4ff)" }} />
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} onKeyDown={(e) => e.key === "Enter" && onSubmit()} placeholder="+91 98765 43210" className="relative w-full px-6 md:px-8 py-5 md:py-6 text-lg md:text-xl rounded-2xl border-2 border-gray-200 focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 outline-none transition-all bg-white text-[#0a0f2c] placeholder:text-gray-300 font-semibold" style={{ fontFamily: "var(--font-display), sans-serif" }} />
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-400 text-center mt-5 flex items-center justify-center gap-1.5">
        <Lock className="w-3.5 h-3.5" />
        Your info stays private. Only used to share your audit results.
      </p>
    </div>
  );
}

// ─── Loading Screen ───────────────────────────────────────────────
function LoadingScreen({ name }: { name: string }) {
  const messages = [
    { text: "Analyzing your industry landscape", emoji: "\u{1F50D}" },
    { text: "Mapping AI opportunities to your pain points", emoji: "\u{1F9E9}" },
    { text: "Calculating potential ROI & savings", emoji: "\u{1F4B0}" },
    { text: "Crafting your personalized action plan", emoji: "\u{1F3AF}" },
    { text: "Generating your AI audit report", emoji: "\u{2728}" },
  ];
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => Math.min(i + 1, messages.length - 1));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative" style={{ background: "linear-gradient(135deg, #0a0f2c 0%, #0d1b3e 25%, #122550 50%, #0a1628 100%)" }}>
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div className="absolute w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(37,99,235,0.15), transparent 70%)", top: "20%", left: "10%" }} animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }} transition={{ duration: 6, repeat: Infinity }} />
        <motion.div className="absolute w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(0,212,255,0.12), transparent 70%)", top: "30%", right: "10%" }} animate={{ x: [0, -50, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }} transition={{ duration: 5, repeat: Infinity }} />
      </div>

      <div className="relative z-10 text-center">
        <motion.div className="mb-8 inline-block" animate={{ rotateY: [0, 360] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
          <div className="w-24 h-24 rounded-3xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #2563eb, #00d4ff)", boxShadow: "0 16px 60px rgba(37, 99, 235, 0.4)" }}>
            <span className="text-5xl">{"\u{1F52E}"}</span>
          </div>
        </motion.div>

        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight" style={{ fontFamily: "var(--font-display), sans-serif" }}>
          Crafting your audit, {name} {"\u{2728}"}
        </h2>
        <p className="text-white/40 text-base md:text-lg mb-10 font-medium">Our AI is analyzing your business...</p>

        <div className="flex flex-col items-start gap-4 md:gap-5 max-w-sm md:max-w-lg mx-auto">
          {messages.map((msg, i) => (
            <motion.div key={msg.text} initial={{ opacity: 0, x: -20 }} animate={{ opacity: i <= messageIndex ? 1 : 0.2, x: 0 }} transition={{ delay: i * 0.4, duration: 0.4 }} className="flex items-center gap-4 md:gap-5">
              {i < messageIndex ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg" style={{ background: "linear-gradient(135deg, #2563eb, #00d4ff)" }}>
                  <Check className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </motion.div>
              ) : i === messageIndex ? (
                <motion.div animate={{ scale: [1, 1.2, 1], borderColor: ["#2563eb", "#00d4ff", "#2563eb"] }} transition={{ duration: 1, repeat: Infinity }} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0" style={{ borderColor: "#2563eb" }}>
                  <span className="text-sm md:text-base">{msg.emoji}</span>
                </motion.div>
              ) : (
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 flex-shrink-0" />
              )}
              <span className={`text-base md:text-lg ${i <= messageIndex ? "text-white font-medium" : "text-white/30"}`}>{msg.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
