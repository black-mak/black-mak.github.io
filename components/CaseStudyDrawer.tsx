"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { CASES, type CaseStudy } from "@/lib/cases";
import { sound } from "@/lib/sound";

interface CaseStudyDrawerProps {
  slug: string | null;
  onClose: () => void;
  onSelectSlug: (slug: string) => void;
}

// Curated brand color palettes for each case study
const BRAND_PALETTES: Record<string, { name: string; hex: string }[]> = {
  "logos-vol-1": [
    { name: "Obsidian", hex: "#0b0b0d" },
    { name: "Titanium", hex: "#f0f0eb" },
    { name: "Gold Seal", hex: "#c9a227" },
    { name: "Graphite", hex: "#2a2b2e" },
  ],
  "black-mak-identity": [
    { name: "Pure Basalt", hex: "#070708" },
    { name: "Architectural Gold", hex: "#c9a227" },
    { name: "Bone White", hex: "#f5f5f1" },
    { name: "Warm Slate", hex: "#17181b" },
  ],
  "calligraphi-works": [
    { name: "Sumi Ink", hex: "#111113" },
    { name: "Parchment", hex: "#e8e5dc" },
    { name: "Cinnabar", hex: "#9b2c2c" },
    { name: "Amber", hex: "#d97706" },
  ],
  "one-point-one": [
    { name: "Industrial Steel", hex: "#1e1e24" },
    { name: "Signal White", hex: "#ffffff" },
    { name: "Hazard Orange", hex: "#f97316" },
    { name: "Concrete Grey", hex: "#4b5563" },
  ],
  "logos-vol-2": [
    { name: "Onyx Black", hex: "#09090b" },
    { name: "Chalk White", hex: "#f4f4f5" },
    { name: "Acid Lime", hex: "#84cc16" },
    { name: "Charcoal", hex: "#27272a" },
  ],
  "security-eye": [
    { name: "Deep Cobalt", hex: "#0f172a" },
    { name: "Electric Cyan", hex: "#06b6d4" },
    { name: "Clean White", hex: "#f8fafc" },
    { name: "Dark Navy", hex: "#1e293b" },
  ],
  "makeen": [
    { name: "Royal Sable", hex: "#141416" },
    { name: "Gilded Sand", hex: "#d4af37" },
    { name: "Silk Cream", hex: "#faf8f5" },
    { name: "Bronze Dust", hex: "#785923" },
  ],
  "outdoor-advertising": [
    { name: "Midnight City", hex: "#030712" },
    { name: "Banner Yellow", hex: "#eab308" },
    { name: "Pure White", hex: "#ffffff" },
    { name: "Steel Structure", hex: "#374151" },
  ],
};

export default function CaseStudyDrawer({ slug, onClose, onSelectSlug }: CaseStudyDrawerProps) {
  const { lang, t } = useI18n();
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const currentCase = CASES.find((c) => c.slug === slug);
  const caseIdx = CASES.findIndex((c) => c.slug === slug);
  const prevCase = caseIdx > 0 ? CASES[caseIdx - 1] : CASES[CASES.length - 1];
  const nextCase = caseIdx < CASES.length - 1 ? CASES[caseIdx + 1] : CASES[0];

  useEffect(() => {
    setActiveImageIdx(0);
  }, [slug]);

  useEffect(() => {
    if (!slug) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        sound.click("soft");
        onClose();
      } else if (e.key === "ArrowRight") {
        if (currentCase && activeImageIdx < currentCase.gallery.length - 1) {
          sound.click("soft");
          setActiveImageIdx((prev) => prev + 1);
        }
      } else if (e.key === "ArrowLeft") {
        if (activeImageIdx > 0) {
          sound.click("soft");
          setActiveImageIdx((prev) => prev - 1);
        }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [slug, activeImageIdx, currentCase, onClose]);

  const copyHex = (hex: string) => {
    sound.click("crisp");
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  if (!currentCase) return null;

  const content = lang === "ar" ? currentCase.ar : currentCase.en;
  const palette = BRAND_PALETTES[currentCase.slug] || BRAND_PALETTES["black-mak-identity"];
  const galleryImages = currentCase.gallery.length > 0 ? currentCase.gallery : [currentCase.cover];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[250] flex justify-end bg-black/85 backdrop-blur-xl"
        role="dialog"
        aria-modal="true"
        aria-label={content.title}
      >
        {/* Backdrop click to close */}
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={() => {
            sound.click("soft");
            onClose();
          }}
        />

        {/* Cinematic Slide-Over Sheet */}
        <motion.div
          ref={drawerRef}
          initial={{ x: "100%" }}
          animate={{ x: "0%" }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex h-full w-full max-w-5xl flex-col border-s border-line-strong bg-bg shadow-2xl overflow-y-auto"
        >
          {/* Top Sticky Header */}
          <div className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-bg/95 px-6 py-4 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="mono text-xs uppercase tracking-widest text-seal font-semibold">
                CASE STUDY
              </span>
              <span className="text-line-strong">/</span>
              <span className="mono text-xs text-muted">{content.year}</span>
              <span className="text-line-strong">/</span>
              <span className="mono text-xs text-faint hidden sm:inline-block">
                {content.role}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {currentCase.behance && (
                <a
                  href={currentCase.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.click("crisp")}
                  className="mono hidden sm:inline-flex items-center gap-1.5 border border-[#0057ff] bg-[#0057ff]/10 hover:bg-[#0057ff] text-[#0057ff] hover:text-white px-3 py-1.5 text-xs transition-colors rounded-sm"
                >
                  <span className="font-extrabold text-[0.7rem]">Bē</span>
                  <span>{lang === "ar" ? "فتح في بيهانس" : "Behance"}</span>
                  <span>↗</span>
                </a>
              )}
              <button
                type="button"
                onClick={() => {
                  sound.click("soft");
                  onClose();
                }}
                className="grid h-10 w-10 place-items-center border border-line text-lg text-muted hover:border-ink hover:text-ink transition-colors"
                aria-label="Close Case Study"
              >
                ×
              </button>
            </div>
          </div>

          {/* Main Case Content */}
          <div className="p-6 sm:p-10 space-y-10">
            {/* Project Title & Summary */}
            <div className="border-b border-line pb-8">
              <div className="flex flex-col gap-3">
                <span className="mono text-xs uppercase tracking-widest text-muted">
                  {content.tags}
                </span>
                <h2 className="display text-3xl sm:text-5xl lg:text-6xl text-ink leading-tight">
                  {content.title}
                </h2>
                <p className="text-base sm:text-lg text-muted/90 max-w-3xl leading-relaxed mt-2">
                  {content.summary}
                </p>
              </div>
            </div>

            {/* High-Resolution Interactive Stage */}
            <div className="space-y-4">
              <div className="relative aspect-[16/10] w-full overflow-hidden border border-line bg-surface shadow-2xl">
                <Image
                  src={galleryImages[activeImageIdx]}
                  alt={`${content.title} - View ${activeImageIdx + 1}`}
                  fill
                  priority
                  referrerPolicy="no-referrer"
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  className="object-cover"
                />
                {/* Image Counter Badge */}
                <div className="absolute bottom-4 left-4 mono text-xs bg-black/75 backdrop-blur-md px-3 py-1 text-white border border-line rounded">
                  {activeImageIdx + 1} / {galleryImages.length}
                </div>

                {/* Left/Right Click Nav */}
                {galleryImages.length > 1 && (
                  <>
                    <button
                      onClick={() => {
                        sound.click("soft");
                        setActiveImageIdx((prev) =>
                          prev > 0 ? prev - 1 : galleryImages.length - 1
                        );
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center bg-black/60 hover:bg-black/90 text-white border border-line/60 rounded-full transition-colors"
                      aria-label="Previous Image"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => {
                        sound.click("soft");
                        setActiveImageIdx((prev) =>
                          prev < galleryImages.length - 1 ? prev + 1 : 0
                        );
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center bg-black/60 hover:bg-black/90 text-white border border-line/60 rounded-full transition-colors"
                      aria-label="Next Image"
                    >
                      →
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Strip */}
              {galleryImages.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                  {galleryImages.slice(0, 10).map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        sound.click("soft");
                        setActiveImageIdx(idx);
                      }}
                      className={`relative h-16 w-24 shrink-0 overflow-hidden border transition-all ${
                        activeImageIdx === idx
                          ? "border-seal scale-105 shadow-md"
                          : "border-line opacity-50 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt="Thumbnail"
                        fill
                        referrerPolicy="no-referrer"
                        className="object-cover"
                      />
                    </button>
                  ))}
                  {galleryImages.length > 10 && (
                    <span className="mono text-xs text-faint px-2 shrink-0">
                      +{galleryImages.length - 10} more
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Extracted Brand Color Palette */}
            <div className="border border-line bg-surface/50 p-6 rounded-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="mono text-xs uppercase tracking-widest text-seal font-semibold">
                  {lang === "ar" ? "لوحة ألوان الهوية المستخرجة" : "BRAND COLOR HARMONY"}
                </span>
                <span className="mono text-[0.65rem] text-faint">
                  {lang === "ar" ? "انقر لنسخ كود HEX" : "Click swatch to copy HEX"}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {palette.map((swatch) => (
                  <button
                    key={swatch.hex}
                    type="button"
                    onClick={() => copyHex(swatch.hex)}
                    className="group flex flex-col items-start p-3 border border-line hover:border-seal bg-bg transition-colors text-start"
                  >
                    <div
                      className="w-full h-10 rounded-sm mb-2.5 border border-line/30 shadow-inner"
                      style={{ backgroundColor: swatch.hex }}
                    />
                    <span className="text-xs font-bold text-ink">{swatch.name}</span>
                    <span className="mono text-[0.68rem] text-muted group-hover:text-seal">
                      {copiedHex === swatch.hex ? "COPIED ✓" : swatch.hex}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* In-Depth Architectural Project Narrative */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 border-t border-line pt-8">
              <div className="lg:col-span-1 space-y-4">
                <span className="mono text-xs uppercase tracking-widest text-muted block">
                  {lang === "ar" ? "تفاصيل التكليف والمخرجات" : "PROJECT SCOPE & DISCIPLINE"}
                </span>
                <ul className="space-y-2.5 mono text-xs text-muted">
                  <li className="flex items-center gap-2">
                    <span className="text-seal">✓</span>
                    <span>{content.role}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-seal">✓</span>
                    <span>Bilingual Calibration (AR/EN)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-seal">✓</span>
                    <span>Vector Master Guidelines</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-seal">✓</span>
                    <span>Real-World Scalability Audit</span>
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-2 space-y-4">
                <span className="mono text-xs uppercase tracking-widest text-muted block">
                  {lang === "ar" ? "فلسفة المعالجة والتصميم" : "STRATEGIC RATIONALE"}
                </span>
                {content.body.map((paragraph, i) => (
                  <p key={i} className="text-sm sm:text-base text-muted/90 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Next / Previous Project Footer Navigation */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-line pt-8">
              <button
                type="button"
                onClick={() => {
                  sound.click("soft");
                  onSelectSlug(prevCase.slug);
                }}
                className="group flex items-center gap-3 text-start w-full sm:w-auto p-3 border border-line hover:border-ink transition-colors"
              >
                <span className="mono text-xs text-faint group-hover:text-ink">← PREV</span>
                <div>
                  <p className="text-xs font-bold text-ink">
                    {lang === "ar" ? prevCase.ar.title : prevCase.en.title}
                  </p>
                  <span className="mono text-[0.62rem] text-muted">{prevCase.en.year}</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.click("soft");
                  onSelectSlug(nextCase.slug);
                }}
                className="group flex items-center gap-3 text-end w-full sm:w-auto p-3 border border-line hover:border-ink transition-colors justify-end"
              >
                <div>
                  <p className="text-xs font-bold text-ink">
                    {lang === "ar" ? nextCase.ar.title : nextCase.en.title}
                  </p>
                  <span className="mono text-[0.62rem] text-muted">{nextCase.en.year}</span>
                </div>
                <span className="mono text-xs text-faint group-hover:text-ink">NEXT →</span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
