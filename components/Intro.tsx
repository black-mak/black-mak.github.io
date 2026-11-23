"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { MARK_D, MARK_VIEWBOX } from "./HeroMark";
import {
  SOULLIFE_LETTERS,
  SOULLIFE_SWASH_D,
  SOULLIFE_VIEWBOX,
} from "@/lib/signatureData";

// ============================================================================
// Cinematic Brand Intro — Architectural White Monogram & Handwritten Soullife
// All elements enclosed 100% within the master precision drafting circle:
// 1. 0–150ms: Drafting blueprint grid & circle calibration initiate
// 2. 150–450ms: Outer precision circle & coordinate marks stabilize
// 3. 450–1700ms: Smooth white monogram outline draws to apex (NO pulsing dot)
// 4. 1700–4000ms: Solid white ink flood + progressive handwritten "Muhamed Alaa"
//    in Soullife font + calligraphic underline swash + Designer credit:
//    [Muhamed Alaa Elbank / Logo & Visual Identity Designer] INSIDE CIRCLE
// 5. 4000–4800ms: Full lockup proof (+1.0s extended duration)
// 6. 4800–5300ms: Smooth curtain fade-out & unmount
// ============================================================================

export default function Intro() {
  const pathname = usePathname();
  const [show, setShow] = useState(true);
  const [gone, setGone] = useState(false);
  const [stage, setStage] = useState<0 | 1 | 2 | 3 | 4>(0);

  useEffect(() => {
    // Only run on the root homepage — never on case study pages (/work/...)
    if (pathname !== "/") {
      setShow(false);
      setGone(true);
      return;
    }

    // Skip if already seen in this session
    try {
      if (sessionStorage.getItem("bm_intro_seen")) {
        setShow(false);
        setGone(true);
        return;
      }
    } catch {}

    // Respect reduced-motion preferences
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShow(false);
      setGone(true);
      return;
    }

    const isMobile = window.innerWidth < 768;
    // On mobile, keep it fast (2.4s) so visitors immediately access the content
    const t = isMobile
      ? [
          setTimeout(() => setStage(1), 100),
          setTimeout(() => setStage(2), 300),
          setTimeout(() => setStage(3), 900),
          setTimeout(() => setStage(4), 1800),
          setTimeout(() => {
            setShow(false);
            try { sessionStorage.setItem("bm_intro_seen", "1"); } catch {}
          }, 2400),
          setTimeout(() => setGone(true), 2900),
        ]
      : [
          setTimeout(() => setStage(1), 150),
          setTimeout(() => setStage(2), 450),
          setTimeout(() => setStage(3), 1700),
          setTimeout(() => setStage(4), 3800),
          setTimeout(() => {
            setShow(false);
            try { sessionStorage.setItem("bm_intro_seen", "1"); } catch {}
          }, 4500),
          setTimeout(() => setGone(true), 5000),
        ];

    return () => t.forEach(clearTimeout);
  }, [pathname]);

  const handleSkip = () => {
    try { sessionStorage.setItem("bm_intro_seen", "1"); } catch {}
    setShow(false);
    setTimeout(() => setGone(true), 300);
  };

  if (gone || pathname !== "/") return null;

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-[250] flex flex-col items-center justify-center bg-[#070708] select-none transition-opacity duration-700 cursor-pointer ${
        show ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-label="Click or press ESC to skip intro"
    >
      {/* 1. Architectural Drafting Grid Background */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{ opacity: stage >= 1 && stage < 4 ? 0.35 : 0.15 }}
      >
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 md:h-[560px] md:w-[560px]">
          {[14, 38, 50, 62, 86].map((x) => (
            <span
              key={x}
              className="absolute top-0 h-full w-px bg-line"
              style={{ left: `${x}%` }}
            />
          ))}
          {[20, 35, 50, 65, 80].map((y) => (
            <span
              key={y}
              className="absolute left-0 w-full h-px bg-line"
              style={{ top: `${y}%` }}
            />
          ))}
          <div className="absolute left-0 top-0 h-full w-full border-t border-line/30 rotate-45 pointer-events-none" />
        </div>
      </div>

      {/* 2. Top Minimalist Precision Coordinates */}
      <div className="absolute top-8 inset-x-8 flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.25em] text-faint">
        <span className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span className="text-ink">BLACK-MAK® STUDIO</span>
        </span>
        <span className="hidden sm:inline-block text-muted">
          IDENTITY ARCHITECTURE · EST. 2014
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSkip();
          }}
          className="hover:text-ink transition-colors border border-line/60 px-2.5 py-0.5 text-[0.58rem]"
        >
          SKIP ✕
        </button>
      </div>

      {/* 3. Central Stage: Master Architectural Drafting Circle with ALL Elements Inside */}
      <div className="relative flex items-center justify-center p-4">
        {/* The Master Drafting Circle */}
        <div
          className={`relative flex flex-col items-center justify-center rounded-full border border-white/30 bg-[#070708]/75 shadow-[0_0_80px_rgba(0,0,0,0.85),inset_0_0_40px_rgba(255,255,255,0.03)] w-[340px] h-[340px] xs:w-[370px] xs:h-[370px] sm:w-[430px] sm:h-[430px] md:w-[480px] md:h-[480px] transition-all duration-700 ${
            stage >= 1 ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          {/* Inner concentric dashed drafting guide */}
          <div className="pointer-events-none absolute inset-3 sm:inset-4 rounded-full border border-dashed border-white/15" />

          {/* Cardinal Technical Markings on Circle Perimeter */}
          <span className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-[0.52rem] tracking-widest text-faint opacity-70">
            00° N
          </span>
          <span className="pointer-events-none absolute top-1/2 -right-3.5 -translate-y-1/2 font-mono text-[0.52rem] tracking-widest text-faint opacity-70">
            90° E
          </span>
          <span className="pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 font-mono text-[0.52rem] tracking-widest text-faint opacity-70">
            180° S
          </span>
          <span className="pointer-events-none absolute top-1/2 -left-3.5 -translate-y-1/2 font-mono text-[0.52rem] tracking-widest text-faint opacity-70">
            270° W
          </span>

          {/* Precision Cardinal Ticks */}
          <span className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2.5 w-px bg-white/50" />
          <span className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-2.5 w-px bg-white/50" />
          <span className="pointer-events-none absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-px bg-white/50" />
          <span className="pointer-events-none absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2.5 h-px bg-white/50" />

          {/* ============================================================= */}
          {/* INSIDE CIRCLE: Monogram + Handwritten Signature + Name & Title */}
          {/* ============================================================= */}
          <div className="flex flex-col items-center justify-center w-full px-6 select-none">
            {/* Monogram drawing container: Pure Architectural White (NO pulsing dot) */}
            <div className="relative h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 flex items-center justify-center">
              <svg
                viewBox={MARK_VIEWBOX}
                shapeRendering="geometricPrecision"
                className="h-full w-full overflow-visible drop-shadow-[0_0_24px_rgba(255,255,255,0.25)]"
              >
                {/* Stroke drafting path in pure white with ultra-smooth ease */}
                <motion.path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d={MARK_D}
                  stroke="#ffffff"
                  strokeWidth={stage >= 3 ? 0.9 : 1.5}
                  strokeLinejoin="miter"
                  strokeMiterlimit={10}
                  initial={{ pathLength: 0, fillOpacity: 0 }}
                  animate={{
                    pathLength: stage >= 2 ? 1 : 0,
                    fillOpacity: stage >= 3 ? 1 : 0,
                  }}
                  transition={{
                    pathLength: { duration: 1.15, ease: [0.22, 1, 0.36, 1] },
                    fillOpacity: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.05 },
                  }}
                  fill="#ffffff"
                />
              </svg>
            </div>

            {/* Handwritten Soullife Signature: Muhamed Alaa + Signature Swash */}
            <div className="mt-1.5 sm:mt-2.5 flex flex-col items-center justify-center min-h-[80px] sm:min-h-[95px]">
              {stage >= 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex flex-col items-center"
                >
                  {/* Authentic Vector Calligraphic Signature */}
                  <div className="relative overflow-hidden w-[210px] xs:w-[240px] sm:w-[270px] md:w-[310px] aspect-[375/105] flex items-center justify-center">
                    <svg
                      viewBox={SOULLIFE_VIEWBOX}
                      shapeRendering="geometricPrecision"
                      className="w-full h-full overflow-visible drop-shadow-[0_0_16px_rgba(255,255,255,0.3)] select-none"
                      role="img"
                      aria-label="Muhamed Alaa Signature"
                    >
                      <defs>
                        {/* Individual letter reveal masks: creates authentic progressive handwriting effect */}
                        {SOULLIFE_LETTERS.map((letter, i) => {
                          const startX = letter.bbox.x1 - 3;
                          const startY = letter.bbox.y1 - 4;
                          const w = letter.bbox.x2 - letter.bbox.x1 + 6;
                          const h = letter.bbox.y2 - letter.bbox.y1 + 8;
                          const isFirstWord = i < 7; // "Muhamed" (0..6)
                          const delay = isFirstWord
                            ? 0.05 + i * 0.08
                            : 0.70 + (i - 7) * 0.10;

                          return (
                            <clipPath id={`soullife-clip-${i}`} key={i}>
                              <motion.rect
                                x={startX}
                                y={startY}
                                height={h}
                                initial={{ width: 0 }}
                                animate={{ width: w }}
                                transition={{
                                  duration: 0.14,
                                  delay,
                                  ease: [0.25, 0.1, 0.25, 1],
                                }}
                              />
                            </clipPath>
                          );
                        })}
                      </defs>

                      {/* The 11 letters of Muhamed Alaa in Soullife font */}
                      <g id="soullife-signature-letters">
                        {SOULLIFE_LETTERS.map((letter, i) => (
                          <path
                            key={i}
                            d={letter.d}
                            fill="#ffffff"
                            clipPath={`url(#soullife-clip-${i})`}
                          />
                        ))}
                      </g>

                      {/* Professional Underline Signature Swash — Draws progressively */}
                      <motion.path
                        d={SOULLIFE_SWASH_D}
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth={2.4}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{
                          pathLength: {
                            duration: 0.55,
                            delay: 1.25,
                            ease: [0.22, 1, 0.36, 1],
                          },
                          opacity: { duration: 0.05, delay: 1.25 },
                        }}
                      />

                      {/* Subtle white calligraphic pen nib glint following the stroke */}
                      <motion.circle
                        r={2}
                        fill="#ffffff"
                        className="drop-shadow-[0_0_8px_#ffffff]"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: [0, 1, 1, 1, 0],
                          cx: [25, 230, 245, 340, 376],
                          cy: [75, 88, 75, 88, 96],
                        }}
                        transition={{
                          duration: 1.85,
                          times: [0, 0.38, 0.45, 0.72, 1],
                          ease: "easeInOut",
                        }}
                      />
                    </svg>
                  </div>

                  {/* Designer Full Name & Professional Craft Title — INSIDE CIRCLE */}
                  <div className="mt-1 sm:mt-1.5 flex flex-col items-center text-center">
                    <motion.span
                      initial={{ opacity: 0, y: 2 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: 1.6 }}
                      className="font-mono text-[0.62rem] sm:text-[0.70rem] md:text-[0.78rem] font-medium tracking-[0.24em] text-white/95 uppercase"
                    >
                      Muhamed Alaa Elbank
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, y: 2 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: 1.8 }}
                      className="mt-0.5 font-mono text-[0.48rem] sm:text-[0.54rem] md:text-[0.60rem] tracking-[0.20em] text-[#a0a09b] uppercase"
                    >
                      Logo & Visual Identity Designer
                    </motion.span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Status / Calibration Bar */}
      <div className="absolute bottom-8 inset-x-8 flex items-center justify-between font-mono text-[0.6rem] text-faint">
        <span className="tracking-widest">
          {stage < 3 ? "CALIBRATING GEOMETRIC IDENTITY..." : "AUTHORITY VERIFIED ✓"}
        </span>
        <div className="w-28 h-[1px] bg-line overflow-hidden">
          <motion.div
            className="h-full bg-white"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 4.6, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
}