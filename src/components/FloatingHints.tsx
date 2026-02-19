"use client";

import { motion, AnimatePresence } from "framer-motion";

interface FloatingHint {
  text: string;
  emoji?: string;
}

// Context-aware hints with tasteful emojis that match brand theme
const stepHints: Record<number, FloatingHint[]> = {
  0: [
    { text: "60-second audit", emoji: "\u{26A1}" },
    { text: "Instant AI insights", emoji: "\u{1F52E}" },
    { text: "No signup required", emoji: "\u{2705}" },
    { text: "Actionable results", emoji: "\u{1F3AF}" },
    { text: "Industry-specific", emoji: "\u{1F4CA}" },
    { text: "Free forever", emoji: "\u{1F381}" },
  ],
  1: [
    { text: "QSR & cloud kitchens", emoji: "\u{1F354}" },
    { text: "EdTech platforms", emoji: "\u{1F393}" },
    { text: "D2C brands", emoji: "\u{1F6D2}" },
    { text: "EV networks", emoji: "\u{1F697}" },
    { text: "Salon & spa chains", emoji: "\u{2728}" },
    { text: "Hotel groups", emoji: "\u{1F3E8}" },
    { text: "Franchise networks", emoji: "\u{1F3E2}" },
    { text: "Jewelry retail", emoji: "\u{1F48E}" },
  ],
  2: [
    { text: "Scales with your team", emoji: "\u{1F4C8}" },
    { text: "Right-sized solutions", emoji: "\u{1F3AF}" },
    { text: "Start small, grow fast", emoji: "\u{1F680}" },
    { text: "Per-employee impact", emoji: "\u{1F4AA}" },
  ],
  3: [
    { text: "30-60% cost reduction", emoji: "\u{1F4B0}" },
    { text: "24/7 automation", emoji: "\u{1F916}" },
    { text: "Data-driven decisions", emoji: "\u{1F4CA}" },
    { text: "Faster than competitors", emoji: "\u{26A1}" },
    { text: "Scale without hiring", emoji: "\u{1F4C8}" },
    { text: "Reduce manual work", emoji: "\u{2699}\uFE0F" },
  ],
  4: [
    { text: "No coding needed", emoji: "\u{1F44D}" },
    { text: "Works with your tools", emoji: "\u{1F517}" },
    { text: "Simple integrations", emoji: "\u{1F9E9}" },
    { text: "We handle the tech", emoji: "\u{1F6E0}\uFE0F" },
  ],
  5: [
    { text: "ROI in 30 days", emoji: "\u{1F4B0}" },
    { text: "Pay as you grow", emoji: "\u{1F331}" },
    { text: "10x return typical", emoji: "\u{1F4C8}" },
    { text: "Free pilot available", emoji: "\u{1F381}" },
  ],
  6: [
    { text: "Results via WhatsApp", emoji: "\u{1F4F1}" },
    { text: "Detailed PDF report", emoji: "\u{1F4C4}" },
    { text: "Custom action plan", emoji: "\u{1F3AF}" },
    { text: "Expert consultation", emoji: "\u{1F4AC}" },
  ],
};

export const sectorHints: Record<string, FloatingHint[]> = {
  "food-restaurant": [
    { text: "AI demand prediction", emoji: "\u{1F4CA}" },
    { text: "Aggregator automation", emoji: "\u{1F916}" },
    { text: "WhatsApp ordering", emoji: "\u{1F4F1}" },
    { text: "Kitchen optimization", emoji: "\u{2699}\uFE0F" },
    { text: "Zero waste systems", emoji: "\u{267B}\uFE0F" },
    { text: "Menu intelligence", emoji: "\u{1F4CB}" },
  ],
  "hotel-travel-tourism": [
    { text: "Dynamic room pricing", emoji: "\u{1F4B0}" },
    { text: "Guest AI concierge", emoji: "\u{1F916}" },
    { text: "Review automation", emoji: "\u{2B50}" },
    { text: "Smart housekeeping", emoji: "\u{2705}" },
    { text: "Booking assistant", emoji: "\u{1F4C5}" },
    { text: "Revenue optimization", emoji: "\u{1F4C8}" },
  ],
  "ecommerce-d2c": [
    { text: "Product recommendations", emoji: "\u{1F3AF}" },
    { text: "AI chatbot support", emoji: "\u{1F4AC}" },
    { text: "Ad creative generation", emoji: "\u{1F3A8}" },
    { text: "Return reduction", emoji: "\u{1F4C9}" },
    { text: "Dynamic pricing", emoji: "\u{1F4B0}" },
    { text: "Inventory forecasting", emoji: "\u{1F4CA}" },
  ],
  "auto-ev": [
    { text: "Predictive maintenance", emoji: "\u{1F527}" },
    { text: "Fleet intelligence", emoji: "\u{1F697}" },
    { text: "Smart charging", emoji: "\u{26A1}" },
    { text: "Lead automation", emoji: "\u{1F916}" },
    { text: "Service scheduling", emoji: "\u{1F4C5}" },
    { text: "Parts forecasting", emoji: "\u{1F4CA}" },
  ],
  "beauty-health-wellness": [
    { text: "Smart scheduling", emoji: "\u{1F4C5}" },
    { text: "Skin/hair analysis", emoji: "\u{1F52C}" },
    { text: "Client retention AI", emoji: "\u{1F4AA}" },
    { text: "Social automation", emoji: "\u{1F4F1}" },
    { text: "Auto reordering", emoji: "\u{267B}\uFE0F" },
    { text: "Review collection", emoji: "\u{2B50}" },
  ],
  "education-edtech": [
    { text: "Adaptive learning", emoji: "\u{1F4DA}" },
    { text: "Auto grading", emoji: "\u{2705}" },
    { text: "Student engagement", emoji: "\u{1F3AF}" },
    { text: "Parent automation", emoji: "\u{1F4AC}" },
    { text: "Content generation", emoji: "\u{1F4DD}" },
    { text: "Admission chatbot", emoji: "\u{1F916}" },
  ],
  "specialty-services": [
    { text: "Lead qualification", emoji: "\u{1F3AF}" },
    { text: "Client onboarding", emoji: "\u{1F44B}" },
    { text: "Compliance tracking", emoji: "\u{2705}" },
    { text: "Multi-channel support", emoji: "\u{1F4AC}" },
    { text: "Document processing", emoji: "\u{1F4C4}" },
    { text: "Workflow automation", emoji: "\u{2699}\uFE0F" },
  ],
  "fashion-jewelry": [
    { text: "Trend forecasting", emoji: "\u{1F4CA}" },
    { text: "Virtual try-on", emoji: "\u{1F48E}" },
    { text: "AI photography", emoji: "\u{1F4F8}" },
    { text: "Dynamic pricing", emoji: "\u{1F4B0}" },
    { text: "Influencer matching", emoji: "\u{2B50}" },
    { text: "Catalog automation", emoji: "\u{1F4CB}" },
  ],
  "dealer-distributor": [
    { text: "Order processing AI", emoji: "\u{1F4E6}" },
    { text: "Route optimization", emoji: "\u{1F6E3}\uFE0F" },
    { text: "Territory intelligence", emoji: "\u{1F4CA}" },
    { text: "Collection prediction", emoji: "\u{1F4B0}" },
    { text: "Warehouse AI", emoji: "\u{1F3ED}" },
    { text: "Retailer engagement", emoji: "\u{1F91D}" },
  ],
};

interface Props {
  step: number;
  sectorId?: string;
  side: "left" | "right";
}

export default function FloatingHints({ step, sectorId, side }: Props) {
  let hints = stepHints[step] || stepHints[0];
  if (step === 3 && sectorId && sectorHints[sectorId]) {
    hints = sectorHints[sectorId];
  }

  const sideHints = side === "left"
    ? hints.filter((_, i) => i % 2 === 0)
    : hints.filter((_, i) => i % 2 === 1);

  return (
    <div className={`hidden lg:flex flex-col gap-4 w-48 ${side === "left" ? "items-end" : "items-start"} pt-16`}>
      <AnimatePresence mode="sync">
        {sideHints.map((hint, i) => (
          <motion.div
            key={`${step}-${side}-${i}`}
            initial={{ opacity: 0, x: side === "left" ? -10 : 10 }}
            animate={{
              opacity: 0.5,
              x: 0,
              y: [0, -3, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              delay: i * 0.15,
              duration: 0.4,
              y: {
                delay: i * 0.15 + 1,
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
            className="flex items-center gap-1.5"
          >
            {hint.emoji && (
              <span className="text-[11px] opacity-70">{hint.emoji}</span>
            )}
            <span className="text-[11px] font-medium text-gray-400 tracking-wide">
              {hint.text}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Mobile: thin strip of hints
export function MobileFloatingHints({ step, sectorId }: { step: number; sectorId?: string }) {
  let hints = stepHints[step] || stepHints[0];
  if (step === 3 && sectorId && sectorHints[sectorId]) {
    hints = sectorHints[sectorId];
  }
  const mobileHints = hints.slice(0, 4);

  return (
    <div className="lg:hidden flex gap-3 overflow-x-auto pb-2 px-1 mb-3 scrollbar-hide">
      <AnimatePresence mode="sync">
        {mobileHints.map((hint, i) => (
          <motion.div
            key={`m-${step}-${i}`}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 0.6, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: i * 0.08, duration: 0.3 }}
            className="flex-shrink-0 flex items-center gap-1"
          >
            {hint.emoji && (
              <span className="text-[10px]">{hint.emoji}</span>
            )}
            <span className="text-[10px] font-medium text-gray-400 whitespace-nowrap tracking-wide">
              {hint.text}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
