"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sound } from "@/lib/sound";
import { MARK_D, MARK_VIEWBOX } from "./HeroMark";

// ============================================================================
// MarkDraw — Master Architectural Construction Proof & Physical Material Lab
// 100% Monochrome Architectural Standard — No Gold / No Yellow Accents
// 1. Continuous Auto-Looping Construction: Grid -> Draft -> Solid -> Calibrated Proof
// 2. Timeless Physical Materials: Deep Ink -> Polished Silver -> Debossed Letterpress -> Architectural Steel
// 3. Dynamic Dissection: 45° Angle Bisectors, Coordinate Ticks, Precision Node Radials
// ============================================================================

type Stage = "blueprint" | "draw" | "fill" | "done";
type Material = "solid" | "silver" | "paper" | "steel";

const KEY_NODES = [
  { x: 77.5, y: 0, label: "APEX 00°" },
  { x: 8, y: 18.5, label: "CUT 45°L" },
  { x: 145, y: 18.5, label: "CUT 45°R" },
  { x: 57.5, y: 68, label: "CORE L" },
  { x: 95.5, y: 68, label: "CORE R" },
  { x: 0, y: 149.5, label: "AXIS L" },
  { x: 154, y: 146.5, label: "AXIS R" },
  { x: 77.5, y: 164.5, label: "BASE" },
];

export default function MarkDraw() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [stage, setStage] = useState<Stage>("blueprint");
  const [material, setMaterial] = useState<Material>("solid");
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glintActive, setGlintActive] = useState(false);
  const [showBisectors, setShowBisectors] = useState(true);
  const [showNodes, setShowNodes] = useState(true);
  const [showCircles, setShowCircles] = useState(true);
  const timerRefs = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimers = () => {
    timerRefs.current.forEach(clearTimeout);
    timerRefs.current = [];
  };

  const runSequence = useCallback(() => {
    clearAllTimers();
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setStage("done");
      return;
    }

    const path = pathRef.current;
    if (path) {
      const len = path.getTotalLength();
      path.style.transition = "none";
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = `${len}`;
    }

    setStage("blueprint");
    setGlintActive(false);

    // Stage 1 -> Stage 2 (Vector Drafting): 0.8s
    const t1 = setTimeout(() => {
      setStage("draw");
      if (pathRef.current) {
        const len = pathRef.current.getTotalLength();
        pathRef.current.style.strokeDasharray = `${len}`;
        pathRef.current.style.strokeDashoffset = `${len}`;
        pathRef.current.style.transition =
          "stroke-dashoffset 3.0s cubic-bezier(0.25, 0.1, 0.25, 1)";
        requestAnimationFrame(() => {
          if (pathRef.current) {
            pathRef.current.style.strokeDashoffset = "0";
          }
        });
      }
    }, 800);

    // Stage 2 -> Stage 3 (Solid ink flood): 3.8s
    const t2 = setTimeout(() => {
      setStage("fill");
    }, 3800);

    // Stage 3 -> Stage 4 (Calibrated Proof + Glint): 4.8s
    const t3 = setTimeout(() => {
      setStage("done");
      setGlintActive(true);
      const glintOff = setTimeout(() => setGlintActive(false), 1200);
      timerRefs.current.push(glintOff);
    }, 4800);

    // Stage 4 -> Automatic Continuous Replay Loop: hold at calibrated state for 3.2s, then restart loop
    const tLoop = setTimeout(() => {
      runSequence();
    }, 8200);

    timerRefs.current = [t1, t2, t3, tLoop];
  }, []);

  const jumpToStage = (s: Stage) => {
    clearAllTimers();
    sound.click("soft");
    setStage(s);
    if (s === "done") {
      setGlintActive(true);
      setTimeout(() => setGlintActive(false), 1200);
    }
    // Resume auto-loop after 5s of user pause
    const tResume = setTimeout(() => {
      runSequence();
    }, 5000);
    timerRefs.current.push(tResume);
  };

  const switchMaterial = (m: Material) => {
    sound.click("crisp");
    setMaterial(m);
    setStage("done");
    setGlintActive(true);
    setTimeout(() => setGlintActive(false), 1200);
    // Resume auto-loop after 5s of user pause
    clearAllTimers();
    const tResume = setTimeout(() => {
      runSequence();
    }, 5000);
    timerRefs.current.push(tResume);
  };

  useEffect(() => {
    runSequence();
    return () => clearAllTimers();
  }, [runSequence]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotate({
      x: -(y / rect.height) * 8,
      y: (x / rect.width) * 8,
    });
  };

  const handleMouseEnter = () => {
    sound.click("soft");
    if (stage === "done") {
      setGlintActive(true);
    }
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative flex h-full w-full flex-col items-center justify-center select-none transition-colors duration-500 rounded-sm ${
        material === "paper" ? "bg-[#ece9e2]/95" : "bg-transparent"
      }`}
      style={{ perspective: 900 }}
    >
      {/* 3D Tilted Architectural Container */}
      <div
        className="relative h-full w-full flex items-center justify-center transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        }}
      >
        {/* Cardinal Technical Markings (Monochrome) */}
        <span className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-[0.56rem] tracking-widest text-faint opacity-60">
          + 00° N
        </span>
        <span className="pointer-events-none absolute top-1/2 -right-3 -translate-y-1/2 font-mono text-[0.56rem] tracking-widest text-faint opacity-60">
          + 90° E
        </span>
        <span className="pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 font-mono text-[0.56rem] tracking-widest text-ink/70">
          45.0° CUT
        </span>
        <span className="pointer-events-none absolute top-1/2 -left-3 -translate-y-1/2 font-mono text-[0.56rem] tracking-widest text-faint opacity-60">
          + 270° W
        </span>

        {/* Construction Stage Indicator Tag (Top Left) */}
        <div className="pointer-events-none absolute top-1.5 left-2 flex items-center gap-1.5 font-mono text-[0.52rem] uppercase tracking-wider text-muted z-20">
          <span
            className={`inline-block h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
              stage === "done" ? "bg-white" : "bg-white animate-ping"
            }`}
          />
          <span className="text-ink/90 font-medium">
            {stage === "blueprint" && "STAGE 01 · BLUEPRINT GRID"}
            {stage === "draw" && "STAGE 02 · VECTOR DRAFT"}
            {stage === "fill" && "STAGE 03 · INK SOLIDIFICATION"}
            {stage === "done" && `STAGE 04 · CALIBRATED PROOF`}
          </span>
        </div>

        {/* Replay Construction Trigger & Continuous Loop Badge (Top Right) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            sound.click("soft");
            runSequence();
          }}
          className="absolute top-1.5 right-2 z-20 flex items-center gap-1.5 font-mono text-[0.52rem] uppercase tracking-wider text-muted hover:text-white transition-colors border border-line/60 hover:border-white px-2 py-0.5 rounded bg-surface/80 backdrop-blur-sm"
          title="Restart Construction Sequence"
        >
          <span className="text-white animate-spin" style={{ animationDuration: "6s" }}>↻</span>
          <span>LOOP</span>
        </button>

        {/* The Monogram SVG Canvas with Blueprint & Dynamic Geometry */}
        <div className="relative h-[82%] w-[82%] flex items-center justify-center">
          <svg
            viewBox={MARK_VIEWBOX}
            shapeRendering="geometricPrecision"
            aria-hidden="true"
            className="h-full w-full overflow-visible drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
          >
            <defs>
              {/* Chrome / Polished Silver Gradient (100% Monochrome) */}
              <linearGradient id="silverMaterial" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="28%" stopColor="#d4d4d8" />
                <stop offset="50%" stopColor="#71717a" />
                <stop offset="72%" stopColor="#e4e4e7" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>

              {/* Brushed Architectural Steel Gradient (100% Monochrome) */}
              <linearGradient id="steelMaterial" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e4e4e7" />
                <stop offset="50%" stopColor="#a1a1aa" />
                <stop offset="100%" stopColor="#52525b" />
              </linearGradient>

              {/* Debossed Letterpress Filter for Paper Material */}
              <filter id="debossFilter" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="1.5" stdDeviation="1" floodColor="#000000" floodOpacity="0.4" />
                <feDropShadow dx="0" dy="-1" stdDeviation="0.8" floodColor="#ffffff" floodOpacity="0.8" />
              </filter>

              {/* Sweeping Glint Mask */}
              <mask id="glintMask">
                <rect width="100%" height="100%" fill="black" />
                <motion.rect
                  width="60"
                  height="260"
                  fill="white"
                  initial={{ x: -120, y: -50 }}
                  animate={glintActive ? { x: 260, y: 150 } : { x: -120, y: -50 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transform: "rotate(35deg)" }}
                />
              </mask>
            </defs>

            {/* STAGE 1: Architectural Blueprint Construction Guides (Monochrome) */}
            <g
              className="transition-opacity duration-700 pointer-events-none"
              style={{
                opacity:
                  stage === "done"
                    ? material === "paper"
                      ? 0.12
                      : 0.22
                    : 0.65,
              }}
            >
              {/* Center Axis & Bisectors */}
              {showBisectors && (
                <>
                  <line
                    x1="77.5"
                    y1="-10"
                    x2="77.5"
                    y2="175"
                    stroke="#ffffff"
                    strokeWidth="0.6"
                    strokeDasharray="3 3"
                    opacity="0.5"
                  />
                  <line
                    x1="-10"
                    y1="82.5"
                    x2="165"
                    y2="82.5"
                    stroke="#ffffff"
                    strokeWidth="0.6"
                    strokeDasharray="3 3"
                    opacity="0.5"
                  />
                  <line
                    x1="-5"
                    y1="-5"
                    x2="160"
                    y2="160"
                    stroke="#ffffff"
                    strokeWidth="0.5"
                    strokeDasharray="4 4"
                    opacity="0.25"
                  />
                  <line
                    x1="160"
                    y1="-5"
                    x2="-5"
                    y2="160"
                    stroke="#ffffff"
                    strokeWidth="0.5"
                    strokeDasharray="4 4"
                    opacity="0.25"
                  />
                  <line
                    x1="77.5"
                    y1="0"
                    x2="0"
                    y2="77.5"
                    stroke="#ffffff"
                    strokeWidth="0.5"
                    opacity="0.35"
                  />
                  <line
                    x1="77.5"
                    y1="0"
                    x2="155"
                    y2="77.5"
                    stroke="#ffffff"
                    strokeWidth="0.5"
                    opacity="0.35"
                  />
                </>
              )}

              {/* Center Compass Calibration Rings */}
              {showCircles && (
                <>
                  <circle
                    cx="77.5"
                    cy="82.5"
                    r="65"
                    fill="none"
                    stroke={material === "paper" ? "#222" : "#ffffff"}
                    strokeWidth="0.5"
                    strokeDasharray="2 4"
                    opacity="0.25"
                  />
                  <circle
                    cx="77.5"
                    cy="82.5"
                    r="45"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="0.5"
                    strokeDasharray="1 3"
                    opacity="0.3"
                  />
                </>
              )}
            </g>

            {/* STAGE 2: Geometric Node Calibration Markers (Monochrome White) */}
            <AnimatePresence>
              {showNodes && (stage === "draw" || stage === "blueprint") && (
                <g className="pointer-events-none">
                  {KEY_NODES.map((node, i) => (
                    <g key={i}>
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={2.2}
                        fill="#ffffff"
                        className="animate-pulse"
                      />
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={5}
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="0.5"
                        opacity="0.5"
                      />
                    </g>
                  ))}
                </g>
              )}
            </AnimatePresence>

            {/* BASE VECTOR MONOGRAM PATH with Physical Material Binding (Monochrome) */}
            <path
              ref={pathRef}
              fillRule="evenodd"
              clipRule="evenodd"
              d={MARK_D}
              fill={
                stage !== "done"
                  ? "#ffffff"
                  : material === "silver"
                  ? "url(#silverMaterial)"
                  : material === "steel"
                  ? "url(#steelMaterial)"
                  : material === "paper"
                  ? "#18181b"
                  : "#ffffff"
              }
              filter={stage === "done" && material === "paper" ? "url(#debossFilter)" : undefined}
              stroke={stage === "done" ? "none" : "#ffffff"}
              strokeWidth={stage === "done" ? 0 : 1.2}
              strokeLinejoin="miter"
              strokeMiterlimit={10}
              className="transition-all duration-500"
              style={{
                fillOpacity:
                  stage === "blueprint" || stage === "draw"
                    ? 0
                    : stage === "fill"
                    ? 0.45
                    : 1,
                transition: "fill-opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />

            {/* Traveling Drafting Laser Spark during Stage 2 (White) */}
            <AnimatePresence>
              {stage === "draw" && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="pointer-events-none"
                >
                  <circle
                    cx="77.5"
                    cy="0"
                    r="3"
                    fill="#ffffff"
                    className="drop-shadow-[0_0_8px_#ffffff]"
                  />
                  <circle
                    cx="77.5"
                    cy="0"
                    r="8"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="0.8"
                    className="animate-ping"
                  />
                </motion.g>
              )}
            </AnimatePresence>

            {/* Specular Glint Reflection on Material */}
            {stage === "done" && (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d={MARK_D}
                fill={material === "paper" ? "#ffffff" : "url(#silverMaterial)"}
                mask="url(#glintMask)"
                className="pointer-events-none opacity-80"
              />
            )}
          </svg>

          {/* Ambient Specular Under-Glow on hover / done (Pure Monochrome White) */}
          <div
            className={`pointer-events-none absolute inset-0 -z-10 rounded-full blur-2xl transition-opacity duration-700 bg-white/10 ${
              glintActive ? "opacity-60" : "opacity-0"
            }`}
          />
        </div>

        {/* Master Control Deck: Stage Jumps, Material Switcher, and Layer Toggles */}
        <div className="absolute bottom-2 inset-x-2 z-20 flex flex-col gap-1.5 border-t border-line/40 bg-surface/90 px-2.5 py-1.5 backdrop-blur-md rounded-sm">
          {/* Top Row: Physical Material Selector */}
          <div className="flex items-center justify-between border-b border-line/30 pb-1">
            <span className="mono text-[0.52rem] uppercase tracking-widest text-faint">
              MATERIAL
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => switchMaterial("solid")}
                className={`mono text-[0.52rem] px-1.5 py-0.5 rounded transition-all ${
                  material === "solid"
                    ? "bg-white text-black font-bold shadow-sm"
                    : "text-muted hover:text-white"
                }`}
              >
                Ink
              </button>
              <button
                type="button"
                onClick={() => switchMaterial("silver")}
                className={`mono text-[0.52rem] px-1.5 py-0.5 rounded transition-all ${
                  material === "silver"
                    ? "bg-white text-black font-bold shadow-sm"
                    : "text-muted hover:text-white"
                }`}
              >
                Silver
              </button>
              <button
                type="button"
                onClick={() => switchMaterial("paper")}
                className={`mono text-[0.52rem] px-1.5 py-0.5 rounded transition-all ${
                  material === "paper"
                    ? "bg-[#27272a] text-[#f4f4f5] font-bold shadow-sm"
                    : "text-muted hover:text-white"
                }`}
              >
                Letterpress
              </button>
              <button
                type="button"
                onClick={() => switchMaterial("steel")}
                className={`mono text-[0.52rem] px-1.5 py-0.5 rounded transition-all ${
                  material === "steel"
                    ? "bg-white text-black font-bold shadow-sm"
                    : "text-muted hover:text-white"
                }`}
              >
                Steel
              </button>
            </div>
          </div>

          {/* Bottom Row: Stage Jumps & Layer Toggles */}
          <div className="flex flex-wrap items-center justify-between gap-1">
            {/* Stage Selector */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => jumpToStage("blueprint")}
                className={`mono text-[0.52rem] px-1.5 py-0.5 rounded transition-colors ${
                  stage === "blueprint"
                    ? "bg-white text-black font-bold"
                    : "text-muted hover:text-white"
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => jumpToStage("draw")}
                className={`mono text-[0.52rem] px-1.5 py-0.5 rounded transition-colors ${
                  stage === "draw"
                    ? "bg-white text-black font-bold"
                    : "text-muted hover:text-white"
                }`}
              >
                Draft
              </button>
              <button
                onClick={() => jumpToStage("fill")}
                className={`mono text-[0.52rem] px-1.5 py-0.5 rounded transition-colors ${
                  stage === "fill"
                    ? "bg-white text-black font-bold"
                    : "text-muted hover:text-white"
                }`}
              >
                Solid
              </button>
            </div>

            {/* Layer Toggles */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  sound.click("soft");
                  setShowBisectors((v) => !v);
                }}
                className={`mono text-[0.5rem] uppercase tracking-wider transition-colors ${
                  showBisectors ? "text-white font-medium" : "text-faint/60 line-through"
                }`}
              >
                45°
              </button>
              <span className="text-line-strong text-[0.5rem]">|</span>
              <button
                onClick={() => {
                  sound.click("soft");
                  setShowNodes((v) => !v);
                }}
                className={`mono text-[0.5rem] uppercase tracking-wider transition-colors ${
                  showNodes ? "text-white font-medium" : "text-faint/60 line-through"
                }`}
              >
                Nodes
              </button>
              <span className="text-line-strong text-[0.5rem]">|</span>
              <button
                onClick={() => {
                  sound.click("soft");
                  setShowCircles((v) => !v);
                }}
                className={`mono text-[0.5rem] uppercase tracking-wider transition-colors ${
                  showCircles ? "text-white font-medium" : "text-faint/60 line-through"
                }`}
              >
                Arcs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
