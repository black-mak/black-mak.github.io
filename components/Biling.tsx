"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { sound } from "@/lib/sound";
import Reveal from "./Reveal";
import HeadlineReveal from "./HeadlineReveal";

// ============================================================================
// Biling — Bilingual Identity Architecture & Interactive Typographic Lab
// Demonstrates the studio's definitive core craft: Arabic calligraphy paired
// with Latin modern letterforms in mathematical harmony.
// Includes interactive client playground to test real brand names live.
// ============================================================================

const PRESETS = [
  { en: "MAKEEN", ar: "مَـكِـيـنْ", tag: "Luxury Calligraphy" },
  { en: "BLACK-MAK", ar: "بلاك ماك", tag: "Architectural Wordmark" },
  { en: "ONE POINT ONE", ar: "١.١ ون بوينت ون", tag: "Apparel Identity" },
  { en: "SECURITY EYE", ar: "عين الأمان", tag: "Corporate Identity" },
];

function BilingLab() {
  const { lang } = useI18n();
  const [latinText, setLatinText] = useState("BLACK-MAK");
  const [arabicText, setArabicText] = useState("بلاك ماك");
  const [fontSize, setFontSize] = useState(54);
  const [tracking, setTracking] = useState(0.04);
  const [showGuides, setShowGuides] = useState(true);
  const [surface, setSurface] = useState<"dark" | "light">("dark");

  const applyPreset = (preset: typeof PRESETS[0]) => {
    sound.click("soft");
    setLatinText(preset.en);
    setArabicText(preset.ar);
  };

  return (
    <div className="mt-16 border border-line bg-surface/70 p-6 sm:p-10 rounded-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-line pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="mono text-xs uppercase tracking-widest text-seal font-semibold">
              {lang === "ar" ? "مختبر التناغم الطباعي التفاعلي" : "BILINGUAL HARMONY LAB"}
            </span>
            <span className="mono text-[0.62rem] px-2 py-0.5 border border-seal/40 bg-seal/10 text-seal rounded-full">
              LIVE TESTER
            </span>
          </div>
          <p className="text-sm text-muted mt-1 max-w-xl">
            {lang === "ar"
              ? "جرّب اسم علامتك التجارية وشاهد كيف يتوازن الحرف العربي الأصيل مع اللاتيني المعاصر في كتلة بصرية واحدة."
              : "Type your brand name to experience how Arabic calligraphy and Latin letterforms achieve optical density parity."}
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-1.5">
          {PRESETS.map((p) => (
            <button
              key={p.en}
              type="button"
              onClick={() => applyPreset(p)}
              className="mono text-[0.65rem] border border-line px-2.5 py-1 text-muted hover:border-ink hover:text-ink transition-colors rounded-sm"
            >
              {p.en}
            </button>
          ))}
        </div>
      </div>

      {/* Input Controls Bar */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-b border-line pb-6">
        {/* Latin Input */}
        <div>
          <label className="mono text-[0.62rem] uppercase tracking-wider text-faint block mb-1">
            {lang === "ar" ? "الاسم بالإنجليزية (Latin)" : "Latin Brand Name"}
          </label>
          <input
            type="text"
            value={latinText}
            onChange={(e) => setLatinText(e.target.value)}
            className="w-full border border-line bg-bg px-3 py-2 text-sm text-ink focus:border-seal focus:outline-none rounded-sm"
            placeholder="e.g. LUXURY BRAND"
          />
        </div>

        {/* Arabic Input */}
        <div>
          <label className="mono text-[0.62rem] uppercase tracking-wider text-faint block mb-1">
            {lang === "ar" ? "الاسم بالعربية (Arabic)" : "Arabic Brand Name"}
          </label>
          <input
            type="text"
            dir="rtl"
            value={arabicText}
            onChange={(e) => setArabicText(e.target.value)}
            className="w-full border border-line bg-bg px-3 py-2 text-sm text-ink focus:border-seal focus:outline-none rounded-sm font-sans"
            placeholder="مثال: علامة فاخرة"
          />
        </div>

        {/* Font Size Slider */}
        <div>
          <div className="flex justify-between mono text-[0.62rem] uppercase tracking-wider text-faint mb-1">
            <span>{lang === "ar" ? "مقياس الخط" : "Scale"}</span>
            <span className="text-seal">{fontSize}px</span>
          </div>
          <input
            type="range"
            min={24}
            max={100}
            step={2}
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full h-1 bg-line-strong accent-seal cursor-pointer appearance-none rounded-none"
          />
        </div>

        {/* Surface & Guides Toggle */}
        <div className="flex items-end justify-between sm:justify-end gap-3">
          <button
            type="button"
            onClick={() => {
              sound.click("soft");
              setShowGuides((v) => !v);
            }}
            className={`mono text-xs px-3 py-2 border transition-colors rounded-sm ${
              showGuides
                ? "border-seal text-seal bg-seal/10"
                : "border-line text-muted hover:border-ink"
            }`}
          >
            {lang === "ar" ? "خطوط المحاذاة" : "Alignment Rays"}
          </button>
          <button
            type="button"
            onClick={() => {
              sound.click("crisp");
              setSurface((s) => (s === "dark" ? "light" : "dark"));
            }}
            className={`mono text-xs px-3 py-2 border transition-colors rounded-sm ${
              surface === "light"
                ? "border-ink bg-white text-black"
                : "border-line bg-bg text-ink hover:border-ink"
            }`}
          >
            {surface === "dark" ? "Paper Light" : "Screen Dark"}
          </button>
        </div>
      </div>

      {/* Interactive Typographic Stage */}
      <div
        className={`relative mt-8 min-h-[260px] flex items-center justify-center p-8 overflow-hidden transition-colors duration-500 rounded-sm border ${
          surface === "light"
            ? "bg-[#faf9f5] text-[#0a0a0c] border-[#e2dfd5]"
            : "bg-[#050506] text-[#f5f5f1] border-line/50"
        }`}
      >
        {/* Optical Alignment Guide Lines */}
        {showGuides && (
          <div className="pointer-events-none absolute inset-x-0 inset-y-0 flex flex-col justify-center gap-6 opacity-40">
            <div className="w-full border-t border-dashed border-seal/60 relative">
              <span className="mono text-[0.55rem] text-seal absolute -top-4 left-4">
                CAP HEIGHT / علو الحرف
              </span>
            </div>
            <div className="w-full border-t border-dashed border-white/50 relative">
              <span className="mono text-[0.55rem] text-faint absolute -top-4 left-4">
                OPTICAL CENTER AXIS / المحور البصري
              </span>
            </div>
            <div className="w-full border-t border-dashed border-seal/60 relative">
              <span className="mono text-[0.55rem] text-seal absolute -top-4 left-4">
                BASELINE / خط الارتكاز الموحد
              </span>
            </div>
          </div>
        )}

        {/* Live Typographic Lockup */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-center">
          {/* Latin Wordmark */}
          <div
            className="font-bold tracking-tight uppercase transition-all duration-150"
            style={{
              fontSize: `${fontSize}px`,
              letterSpacing: `${tracking}em`,
              lineHeight: 1,
            }}
          >
            {latinText || "BRAND"}
          </div>

          {/* Golden Harmonic Divider */}
          <span className="text-seal text-xl md:text-2xl font-mono select-none">
            ◆
          </span>

          {/* Arabic Wordmark */}
          <div
            dir="rtl"
            className="font-bold tracking-normal transition-all duration-150"
            style={{
              fontSize: `${Math.round(fontSize * 1.08)}px`,
              lineHeight: 1.15,
            }}
          >
            {arabicText || "علامة"}
          </div>
        </div>

        {/* Watermark Branding */}
        <div className="pointer-events-none absolute bottom-3 right-4 mono text-[0.55rem] uppercase tracking-widest text-faint opacity-50">
          BLACK-MAK® BILINGUAL ENGINE
        </div>
      </div>
    </div>
  );
}

export default function Biling() {
  const { t, lang } = useI18n();

  const PILLARS = [
    {
      num: "01",
      numAr: "٠١",
      titleEn: "Optical Weight Balance",
      titleAr: "التوازن البصري والكتلي",
      descEn:
        "Arabic and Latin wordmarks calibrated to share identical optical density, stroke contrast, and visual gravity.",
      descAr:
        "موازنة دقيقة لكتلة الحرف العربي مع اللاتيني ليتشاركا نفس الكثافة البصرية وسماكة الخطوط دون أن يطغى أحدهما على الآخر.",
    },
    {
      num: "02",
      numAr: "٠٢",
      titleEn: "Shared Typographic Geometry",
      titleAr: "التناغم الهندسي والتشريحي",
      descEn:
        "Synchronized baselines, matching x-height ratios, and aligned angles creating a unified identity system.",
      descAr:
        "محاذاة هندسية لخط الارتكاز وزوايا الانحناء ونسب الارتفاع لبناء نظام بصري متجانس في كافة التطبيقات.",
    },
    {
      num: "03",
      numAr: "٠٣",
      titleEn: "Calligraphic Heritage & Modern Form",
      titleAr: "أصالة الكاليجرافي مع حداثة البنية",
      descEn:
        "Rooted in genuine Arabic script mastery, paired seamlessly with clean, architectural modern typography.",
      descAr:
        "انطلاق من قواعد الخط العربي الأصيلة مع صقلها في قوالب حديثة تمنح علامتك هيبة معاصرة وفريدة.",
    },
  ];

  return (
    <section className="section border-t border-line bg-surface py-[var(--section)]">
      <div className="container">
        {/* Bilingual Philosophy Header */}
        <Reveal>
          <div className="grid grid-cols-1 gap-[clamp(2rem,6vw,5rem)] lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <span className="eyebrow mb-4 block text-seal font-mono tracking-widest">
                {t("biling.index")}
              </span>
              <HeadlineReveal
                className="display text-[clamp(2.4rem,5.5vw,5.5rem)] leading-tight"
                html={t("biling.title")}
              />
            </div>
            <p className="lede max-w-[46ch]">{t("biling.text")}</p>
          </div>
        </Reveal>

        {/* Dual Language Badges */}
        <Reveal delay={0.15}>
          <div className="biling-row mt-12 flex flex-wrap items-center justify-between gap-8 border-t border-line pt-8 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-faint">
            <span className="biling-chip" dir="ltr">عربي — AR</span>
            <span className="biling-diamond text-seal">◆</span>
            <span className="biling-chip" dir="ltr">LATIN — EN</span>
            <span className="biling-diamond text-seal">◆</span>
            <span className="biling-chip" dir="ltr">ONE SYSTEM</span>
          </div>
        </Reveal>

        {/* The 3 Bilingual Core Pillars */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map((p, idx) => (
            <Reveal key={p.num} delay={idx * 0.08}>
              <div className="group border border-line/80 bg-[#0a0a0c] p-7 md:p-8 transition-all duration-300 hover:border-seal/60 hover:bg-[#0f0f13] h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-seal mb-5 border-b border-line/50 pb-3">
                    <span className="font-bold tracking-widest">
                      {lang === "ar" ? `ركيزة ${p.numAr}` : `PILLAR ${p.num}`}
                    </span>
                    <span className="text-faint uppercase text-[0.65rem] tracking-wider">
                      {lang === "ar" ? "هندسة الهوية" : "IDENTITY DNA"}
                    </span>
                  </div>
                  <h4 className="display text-lg md:text-xl font-bold text-ink mb-3 leading-snug group-hover:text-seal transition-colors">
                    {lang === "ar" ? p.titleAr : p.titleEn}
                  </h4>
                  <p className="text-sm leading-relaxed text-muted">
                    {lang === "ar" ? p.descAr : p.descEn}
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-line/40 flex items-center justify-between font-mono text-[0.62rem] text-faint">
                  <span>BLACK-MAK® CRAFT</span>
                  <span className="text-seal font-semibold">
                    {lang === "ar" ? "نظام موحد" : "HARMONIC"}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Interactive Bilingual Typography Lab */}
        <Reveal delay={0.2}>
          <BilingLab />
        </Reveal>
      </div>
    </section>
  );
}
