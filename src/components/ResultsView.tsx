"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { AuditResult } from "@/lib/knowledge-base";
import Logo from "./Logo";
import { AnimatedCounter, AIReadinessGauge, Emoji3D } from "./Gamification";
import {
  TrendingUp,
  Zap,
  Clock,
  Target,
  ArrowRight,
  Share2,
  Download,
  MessageCircle,
  CheckCircle2,
  RotateCcw,
  Mail,
  Send,
  Check,
} from "lucide-react";

interface Props {
  result: AuditResult;
  userName: string;
  businessName: string;
  onRestart?: () => void;
}

export default function ResultsView({ result, userName, businessName, onRestart }: Props) {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailSending, setEmailSending] = useState(false);

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(
      `Just took the AI Opportunity Audit by Sol8um for ${businessName}! \u{1F680} Scored ${result.overallScore}/100 on AI readiness with ${result.estimatedMonthlySavings} potential monthly savings. Get yours free: ${window.location.href}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const contactSol8um = () => {
    const text = encodeURIComponent(
      `Hi, I just completed the AI Opportunity Audit for ${businessName}. My AI readiness score is ${result.overallScore}/100. I'd like to discuss implementing the recommended solutions.`
    );
    window.open(`https://wa.me/919468688354?text=${text}`, "_blank");
  };

  const handleEmailReport = async () => {
    if (!email || !email.includes("@")) return;
    setEmailSending(true);
    // Simulate sending — in production, this would call an API endpoint
    await new Promise((r) => setTimeout(r, 1500));
    setEmailSent(true);
    setEmailSending(false);
  };

  return (
    <div className="min-h-screen bg-[#fafbff] pb-6 md:pb-8">
      {/* Header gradient with celebration */}
      <div
        className="relative px-4 sm:px-6 pt-6 sm:pt-8 pb-16 sm:pb-20 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0a0f2c 0%, #1e3a5f 40%, #2563eb 70%, #00d4ff 100%)",
        }}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-52 sm:w-72 h-52 sm:h-72 rounded-full bg-white/[0.03]" />
          <div className="absolute -bottom-16 -left-16 w-36 sm:w-48 h-36 sm:h-48 rounded-full bg-[#00d4ff]/[0.05]" />
          <motion.div
            className="absolute top-10 right-10 w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-[#2563eb]/[0.08]"
            animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.12, 0.08] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: "30px 30px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-md md:max-w-2xl mx-auto">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex justify-center mb-3 sm:mb-4"
          >
            <div className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="text-[10px] sm:text-[11px] text-white/90 font-medium tracking-wider uppercase">
                {"\u{2728}"} Your AI Audit is Ready {"\u{2728}"}
              </span>
            </div>
          </motion.div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="mb-1.5 sm:mb-2"
            >
              <Emoji3D emoji={"\u{1F389}"} size="xl" />
            </motion.div>
            <p className="text-white/60 text-[10px] sm:text-xs font-medium mb-0.5 sm:mb-1">
              {userName}&apos;s Report
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-0.5 sm:mb-1 tracking-tight" style={{ fontFamily: "var(--font-display), sans-serif" }}>
              {businessName}
            </h1>
            <p className="text-[#00d4ff]/70 text-xs sm:text-sm font-medium">{result.sectorName}</p>
          </motion.div>
        </div>
      </div>

      {/* Score Card */}
      <div className="px-4 sm:px-6 md:px-8 -mt-10 sm:-mt-12 max-w-md md:max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-blue-900/10 border border-gray-100 p-4 sm:p-6 md:p-8"
        >
          <AIReadinessGauge score={result.overallScore} level={result.aiReadinessLevel} />

          {/* Key metrics */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mt-4 sm:mt-5">
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-blue-100"
              style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.05), rgba(0,212,255,0.05))" }}
            >
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563eb]" />
                <Emoji3D emoji={"\u{1F4B0}"} size="sm" />
              </div>
              <p className="text-[9px] sm:text-[10px] text-gray-500 font-medium uppercase tracking-wider">
                Est. Monthly Savings
              </p>
              <p className="text-sm sm:text-base font-extrabold text-[#0a0f2c] mt-0.5">
                {result.estimatedMonthlySavings}
              </p>
            </motion.div>
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-cyan-100"
              style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.05), rgba(37,99,235,0.05))" }}
            >
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-[#00d4ff]" />
                <Emoji3D emoji={"\u{1F680}"} size="sm" />
              </div>
              <p className="text-[9px] sm:text-[10px] text-gray-500 font-medium uppercase tracking-wider">
                AI Solutions Found
              </p>
              <p className="text-sm sm:text-base font-extrabold text-[#0a0f2c] mt-0.5">
                {result.topSolutions.length + result.quickWins.length}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Top Solutions */}
      <div className="px-4 sm:px-6 md:px-8 mt-6 sm:mt-8 max-w-md md:max-w-2xl mx-auto">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
          <h2 className="text-base sm:text-lg md:text-xl font-extrabold text-[#0a0f2c] mb-3 sm:mb-4 md:mb-5 flex items-center gap-2" style={{ fontFamily: "var(--font-display), sans-serif" }}>
            <Target className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563eb]" />
            Top AI Solutions For You <Emoji3D emoji={"\u{1F3AF}"} size="sm" />
          </h2>

          <div className="flex flex-col gap-3 sm:gap-4">
            {result.topSolutions.map((solution, i) => (
              <motion.div
                key={i}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 + i * 0.15 }}
                whileHover={{ y: -2 }}
                className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-100 transition-all p-4 sm:p-5 md:p-6"
              >
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <div
                    className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.1), rgba(0,212,255,0.1))" }}
                  >
                    <span className="text-sm sm:text-lg font-bold text-[#2563eb]">#{i + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[#0a0f2c] text-[13px] sm:text-[15px] leading-tight">
                      {solution.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-gray-500 mt-1 sm:mt-1.5 leading-relaxed">
                      {solution.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold ${
                          solution.impact === "high"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                            : solution.impact === "medium"
                            ? "bg-amber-50 text-amber-700 border border-amber-100"
                            : "bg-gray-50 text-gray-700 border border-gray-100"
                        }`}
                      >
                        {solution.impact === "high" ? "\u{1F7E2}" : solution.impact === "medium" ? "\u{1F7E1}" : "\u{26AA}"}
                        {" "}{solution.impact.toUpperCase()} IMPACT
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-medium bg-blue-50 text-[#2563eb] border border-blue-100">
                        <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        {solution.timeToImplement}
                      </span>
                    </div>
                    <div
                      className="mt-2 sm:mt-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-blue-100"
                      style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.04), rgba(0,212,255,0.04))" }}
                    >
                      <p className="text-[11px] sm:text-xs font-bold text-[#2563eb] flex items-center gap-1 sm:gap-1.5">
                        <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        {"\u{1F4C8}"} {solution.estimatedROI}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Wins */}
      {result.quickWins.length > 0 && (
        <div className="px-4 sm:px-6 md:px-8 mt-6 sm:mt-8 max-w-md md:max-w-2xl mx-auto">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1 }}>
            <h2 className="text-base sm:text-lg md:text-xl font-extrabold text-[#0a0f2c] mb-3 sm:mb-4 md:mb-5 flex items-center gap-2" style={{ fontFamily: "var(--font-display), sans-serif" }}>
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-[#00d4ff]" />
              Quick Wins — Start This Week <Emoji3D emoji={"\u{26A1}"} size="sm" />
            </h2>
            <div className="flex flex-col gap-2.5 sm:gap-3">
              {result.quickWins.map((qw, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -15, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.1 + i * 0.1 }}
                  className="rounded-xl sm:rounded-2xl border p-3.5 sm:p-5 hover:shadow-md transition-shadow"
                  style={{
                    background: "linear-gradient(135deg, rgba(37,99,235,0.04), rgba(0,212,255,0.04))",
                    borderColor: "rgba(37,99,235,0.15)",
                  }}
                >
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <div
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #2563eb, #00d4ff)" }}
                    >
                      <Emoji3D emoji={"\u{26A1}"} size="sm" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-[#0a0f2c] text-[13px] sm:text-[15px]">
                        {qw.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-gray-600 mt-0.5 sm:mt-1">{qw.description}</p>
                      <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-2.5">
                        <span className="text-[9px] sm:text-[10px] font-bold text-[#2563eb] bg-blue-50 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-blue-100 flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          {qw.timeToImplement}
                        </span>
                        <span className="text-[9px] sm:text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-emerald-100 flex items-center gap-1">
                          <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          {qw.estimatedROI}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Priority Actions */}
      <div className="px-4 sm:px-6 md:px-8 mt-6 sm:mt-8 max-w-md md:max-w-2xl mx-auto">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.2 }}>
          <h2 className="text-base sm:text-lg md:text-xl font-extrabold text-[#0a0f2c] mb-3 sm:mb-4 md:mb-5 flex items-center gap-2" style={{ fontFamily: "var(--font-display), sans-serif" }}>
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
            Your Priority Actions <Emoji3D emoji={"\u{1F4CB}"} size="sm" />
          </h2>
          <div className="flex flex-col gap-2 sm:gap-2.5">
            {result.priorityActions.map((action, i) => (
              <motion.div
                key={i}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.3 + i * 0.1 }}
                className="flex items-start gap-2.5 sm:gap-3 md:gap-4 p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl bg-white border border-gray-100 hover:border-blue-100 hover:shadow-sm transition-all"
              >
                <div
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-md sm:rounded-lg flex items-center justify-center text-white text-[10px] sm:text-xs font-bold flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #0a0f2c, #2563eb)" }}
                >
                  {i + 1}
                </div>
                <p className="text-xs sm:text-sm md:text-base text-gray-700 font-medium leading-relaxed">{action}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CTA Section — WhatsApp */}
      <div className="px-4 sm:px-6 md:px-8 mt-8 sm:mt-10 max-w-md md:max-w-2xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="relative rounded-2xl sm:rounded-3xl p-5 sm:p-7 text-center overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0a0f2c 0%, #1e3a5f 40%, #2563eb 70%, #00d4ff 100%)",
          }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -top-10 -right-10 w-32 sm:w-40 h-32 sm:h-40 rounded-full bg-white/[0.03]"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <div className="absolute -bottom-10 -left-10 w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-[#00d4ff]/[0.05]" />
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.6, type: "spring" }}
              className="mb-2 sm:mb-3"
            >
              <Emoji3D emoji={"\u{1F680}"} size="xl" />
            </motion.div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white mb-1.5 sm:mb-2" style={{ fontFamily: "var(--font-display), sans-serif" }}>
              Ready to implement?
            </h3>
            <p className="text-white/60 text-xs sm:text-sm md:text-base mb-4 sm:mb-6 leading-relaxed">
              Let&apos;s turn these insights into action. We build AI solutions that pay for themselves.
            </p>
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={contactSol8um}
              className="w-full flex items-center justify-center gap-2 sm:gap-2.5 bg-white text-[#0a0f2c] font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl hover:shadow-xl hover:shadow-white/20 transition-all text-sm sm:text-base"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#25D366]" />
              Let&apos;s Talk on WhatsApp {"\u{1F4AC}"}
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Email Report Section */}
      <div className="px-4 sm:px-6 md:px-8 mt-3 sm:mt-4 max-w-md md:max-w-2xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm p-4 sm:p-6"
        >
          <div className="flex items-center gap-2 sm:gap-2.5 mb-3 sm:mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.1), rgba(0,212,255,0.1))" }}>
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563eb]" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#0a0f2c]" style={{ fontFamily: "var(--font-display), sans-serif" }}>
                Get Report in Your Inbox {"\u{1F4E7}"}
              </h3>
              <p className="text-[10px] sm:text-xs text-gray-400">Detailed AI audit report with actionable insights</p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {emailSent ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-2 py-3 sm:py-4 px-4 rounded-xl sm:rounded-2xl bg-emerald-50 border border-emerald-100"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                  className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center"
                >
                  <Check className="w-3.5 h-3.5 text-white" />
                </motion.div>
                <span className="text-xs sm:text-sm font-bold text-emerald-700">Report sent! Check your inbox {"\u{2705}"}</span>
              </motion.div>
            ) : (
              <motion.div key="form" className="flex gap-2 sm:gap-2.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleEmailReport()}
                  placeholder="your@email.com"
                  className="flex-1 px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl sm:rounded-2xl border-2 border-gray-200 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/10 outline-none transition-all bg-gray-50/50 text-[#0a0f2c] placeholder:text-gray-300 font-medium"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleEmailReport}
                  disabled={!email || !email.includes("@") || emailSending}
                  className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: email && email.includes("@") ? "linear-gradient(135deg, #2563eb, #00d4ff)" : "#d1d5db" }}
                >
                  {emailSending ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Send</span>
                    </>
                  )}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Share & Save buttons */}
      <div className="px-4 sm:px-6 md:px-8 mt-3 sm:mt-4 max-w-md md:max-w-2xl mx-auto flex gap-2.5 sm:gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={shareOnWhatsApp}
          className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl border-2 border-gray-200 text-gray-600 text-xs sm:text-sm font-semibold hover:border-blue-200 hover:text-[#2563eb] hover:bg-blue-50/30 transition-all"
        >
          <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          Share {"\u{1F517}"}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => window.print()}
          className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl border-2 border-gray-200 text-gray-600 text-xs sm:text-sm font-semibold hover:border-blue-200 hover:text-[#2563eb] hover:bg-blue-50/30 transition-all"
        >
          <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          Save PDF {"\u{1F4C4}"}
        </motion.button>
      </div>

      {/* Start New Audit */}
      {onRestart && (
        <div className="px-4 sm:px-6 md:px-8 mt-6 sm:mt-8 max-w-md md:max-w-2xl mx-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRestart}
            className="w-full flex items-center justify-center gap-2 sm:gap-2.5 py-3.5 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl border-2 border-dashed border-gray-300 text-gray-500 text-xs sm:text-sm md:text-base font-bold hover:border-[#2563eb] hover:text-[#2563eb] hover:bg-blue-50/30 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Start a New Audit
          </motion.button>
        </div>
      )}

      {/* Footer */}
      <div className="px-4 sm:px-6 md:px-8 mt-6 sm:mt-8 max-w-md md:max-w-2xl mx-auto text-center pb-2">
        <div className="flex justify-center mb-1.5 sm:mb-2">
          <Logo size="sm" />
        </div>
        <p className="text-[9px] sm:text-[10px] text-gray-400 font-medium">
          {"\u{2728}"} AI Automation That Pays For Itself {"\u{2728}"}
        </p>
      </div>
    </div>
  );
}
