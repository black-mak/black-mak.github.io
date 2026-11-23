"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sound } from "@/lib/sound";
import { MARK_D, MARK_VIEWBOX } from "./HeroMark";

// ============================================================================
// MarkDraw — Master Architectural Construction Proof & Physical Material Lab
// 1. Geometric Stages: Blueprint Grid -> Vector Drafting -> Solid Ink -> Calibrated
// 2. Physical Materials: Solid Ink -> Gold Foil Leaf -> Embossed Paper -> Bronze Facade
// 3. Dynamic Dissection: 45° Angle Bisectors, Vertex Nodes, Compass Radii
// ============================================================================

type Stage = "blueprint" | "draw" | "fill" | "done";
type Material = "solid" | "gold" | "paper" | "bronze";

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
  const [material, setMaterial] = useState<Material>("gold");
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
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

    // Stage 1 -> Stage 2 (Drafting): 1.0s
    const t1 = setTimeout(() => {
      setStage("draw");
      if (pathRef.current) {
        const len = pathRef.current.getTotalLength();
        pathRef.current.style.strokeDasharray = `${len}`;
        pathRef.current.style.strokeDashoffset = `${len}`;
        pathRef.current.style.transition =
          "stroke-dashoffset 3.2s cubic-bezier(0.25, 0.1, 0.25, 1)";
        requestAnimationFrame(() => {
          if (pathRef.current) {
            pathRef.current.style.strokeDashoffset = "0";
          }
        });
      }
    }, 900);

    // Stage 2 -> Stage 3 (Ink flood): 4.1s
    const t2 = setTimeout(() => {
      setStage("fill");
    }, 4100);

    // Stage 3 -> Stage 4 (Done + Glint): 5.1s
    const t3 = setTimeout(() => {
      setStage("done");
      setGlintActive(true);
    }, 5100);

    timerRefs.current = [t1, t2, t3];
  }, []);

  const jumpToStage = (s: Stage) => {
    clearAllTimers();
    sound.click("soft");
    setStage(s);
    if (s === "done") {
      setGlintActive(true);
      setTimeout(() => setGlintActive(false), 1200);
    }
  };

  const switchMaterial = (m: Material) => {
    sound.click("crisp");
    setMaterial(m);
    setStage("done");
    setGlintActive(true);
    setTimeout(() => setGlintActive(false), 1200);
  };

  useEffect(() => {
    runSequence();

    const interval = setInterval(() => {
      setStage((curr) => {
        if (curr === "done") {
          setGlintActive(true);
          setTimeout(() => setGlintActive(false), 1200);
        }
        return curr;
      });
    }, 9000);

    return () => {
      clearAllTimers();
      clearInterval(interval);
    };
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
      {/* 3D Tilted Container */}
      <div
        className="relative h-full w-full flex items-center justify-center transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        }}
      >
        {/* Cardinal Technical Markings */}
        <span className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-[0.56rem] tracking-widest text-faint opacity-60">
          + 00° N
        </span>
        <span className="pointer-events-none absolute top-1/2 -right-3 -translate-y-1/2 font-mono text-[0.56rem] tracking-widest text-faint opacity-60">
          + 90° E
        </span>
        <span className="pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 font-mono text-[0.56rem] tracking-widest text-seal opacity-80">
          45.0° CUT
        </span>
        <span className="pointer-events-none absolute top-1/2 -left-3 -translate-y-1/2 font-mono text-[0.56rem] tracking-widest text-faint opacity-60">
          + 270° W
        </span>

        {/* Construction Stage Indicator Tag (Top Left) */}
        <div className="pointer-events-none absolute top-1.5 left-2 flex items-center gap-1.5 font-mono text-[0.52rem] uppercase tracking-wider text-muted z-20">
          <span
            className={`inline-block h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
              stage === "done" ? "bg-seal" : "bg-white animate-ping"
            }`}
          />
          <span className="text-ink/80 font-medium">
            {stage === "blueprint" && "STAGE 01 · BLUEPRINT GRID"}
            {stage === "draw" && "STAGE 02 · VECTOR DRAFT"}
            {stage === "fill" && "STAGE 03 · INK SOLIDIFICATION"}
            {stage === "done" && `CALIBRATED · ${material.toUpperCase()}`}
          </span>
        </div>

        {/* Replay Construction Trigger (Top Right) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            sound.click("soft");
            runSequence();
          }}
          className="absolute top-1.5 right-2 z-20 flex items-center gap-1 font-mono text-[0.52rem] uppercase tracking-wider text-muted hover:text-ink transition-colors border border-line/50 hover:border-seal/60 px-2 py-0.5 rounded bg-surface/80 backdrop-blur-sm"
          title="Replay Construction Stages"
        >
          <span className="text-seal">↻</span>
          <span>REPLAY</span>
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
              {/* Gold Leaf Foil Specular Gradient */}
              <linearGradient id="goldMaterial" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff2be" />
                <stop offset="25%" stopColor="#f3d078" />
                <stop offset="50%" stopColor="#c9a227" />
                <stop offset="75%" stopColor="#9e7b16" />
                <stop offset="100%" stopColor="#ffd885" />
              </linearGradient>

              {/* Architectural Bronze Gradient */}
              <linearGradient id="bronzeMaterial" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#bfa58a" />
                <stop offset="40%" stopColor="#7a5c3e" />
                <stop offset="70%" stopColor="#4a3522" />
                <stop offset="100%" stopColor="#967554" />
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

            {/* STAGE 1: Architectural Blueprint Construction Guides */}
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
                    stroke="#c9a227"
                    strokeWidth="0.6"
                    strokeDasharray="3 3"
                    opacity="0.6"
                  />
                  <line
                    x1="-10"
                    y1="82.5"
                    x2="165"
                    y2="82.5"
                    stroke="#c9a227"
                    strokeWidth="0.6"
                    strokeDasharray="3 3"
                    opacity="0.6"
                  />
                  <line
                    x1="-5"
                    y1="-5"
                    x2="160"
                    y2="160"
                    stroke="#ffffff"
                    strokeWidth="0.5"
                    strokeDasharray="4 4"
                    opacity="0.3"
                  />
                  <line
                    x1="160"
                    y1="-5"
                    x2="-5"
                    y2="160"
                    stroke="#ffffff"
                    strokeWidth="0.5"
                    strokeDasharray="4 4"
                    opacity="0.3"
                  />
                  <line
                    x1="77.5"
                    y1="0"
                    x2="0"
                    y2="77.5"
                    stroke="#e8c76b"
                    strokeWidth="0.5"
                    opacity="0.35"
                  />
                  <line
                    x1="77.5"
                    y1="0"
                    x2="155"
                    y2="77.5"
                    stroke="#e8c76b"
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
                    stroke="#c9a227"
                    strokeWidth="0.5"
                    strokeDasharray="1 3"
                    opacity="0.3"
                  />
                </>
              )}
            </g>

            {/* STAGE 2: Geometric Node Calibration Markers */}
            <AnimatePresence>
              {showNodes && (stage === "draw" || stage === "blueprint") && (
                <g className="pointer-events-none">
                  {KEY_NODES.map((node, i) => (
                    <g key={i}>
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={2.2}
                        fill="#c9a227"
                        className="animate-pulse"
                      />
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={5}
                        fill="none"
                        stroke="#e8c76b"
                        strokeWidth="0.5"
                        opacity="0.5"
                      />
                    </g>
                  ))}
                </g>
              )}
            </AnimatePresence>

            {/* BASE VECTOR MONOGRAM PATH with Physical Material Binding */}
            <path
              ref={pathRef}
              fillRule="evenodd"
              clipRule="evenodd"
              d={MARK_D}
              fill={
                stage !== "done"
                  ? "#ffffff"
                  : material === "gold"
                  ? "url(#goldMaterial)"
                  : material === "bronze"
                  ? "url(#bronzeMaterial)"
                  : material === "paper"
                  ? "#18181b"
                  : "currentColor"
              }
              filter={stage === "done" && material === "paper" ? "url(#debossFilter)" : undefined}
              stroke={stage === "done" ? "none" : "#e8c76b"}
              strokeWidth={stage === "done" ? 0 : 1.3}
              strokeLinejoin="miter"
              strokeMiterlimit={10}
              className="text-ink transition-all duration-500"
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

            {/* Traveling Drafting Laser Spark during Stage 2 */}
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
                    stroke="#e8c76b"
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
                fill={material === "paper" ? "#ffffff" : "url(#goldMaterial)"}
                mask="url(#glintMask)"
                className="pointer-events-none opacity-80"
              />
            )}
          </svg>

          {/* Ambient Golden Under-Glow on hover / done */}
          <div
            className={`pointer-events-none absolute inset-0 -z-10 rounded-full blur-2xl transition-opacity duration-700 ${
              material === "gold"
                ? "bg-seal/30"
                : material === "bronze"
                ? "bg-[#7a5c3e]/30"
                : "bg-seal/10"
            } ${glintActive ? "opacity-70" : "opacity-0"}`}
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
                    ? "bg-ink text-bg font-bold shadow-sm"
                    : "text-muted hover:text-ink"
                }`}
              >
                Ink
              </button>
              <button
                type="button"
                onClick={() => switchMaterial("gold")}
                className={`mono text-[0.52rem] px-1.5 py-0.5 rounded transition-all ${
                  material === "gold"
                    ? "bg-seal text-bg font-bold shadow-sm"
                    : "text-muted hover:text-ink"
                }`}
              >
                Gold Foil
              </button>
              <button
                type="button"
                onClick={() => switchMaterial("paper")}
                className={`mono text-[0.52rem] px-1.5 py-0.5 rounded transition-all ${
                  material === "paper"
                    ? "bg-[#27272a] text-[#f4f4f5] font-bold shadow-sm"
                    : "text-muted hover:text-ink"
                }`}
              >
                Letterpress
              </button>
              <button
                type="button"
                onClick={() => switchMaterial("bronze")}
                className={`mono text-[0.52rem] px-1.5 py-0.5 rounded transition-all ${
                  material === "bronze"
                    ? "bg-[#7a5c3e] text-white font-bold shadow-sm"
                    : "text-muted hover:text-ink"
                }`}
              >
                Bronze
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
                    ? "bg-seal text-bg font-bold"
                    : "text-muted hover:text-ink"
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => jumpToStage("draw")}
                className={`mono text-[0.52rem] px-1.5 py-0.5 rounded transition-colors ${
                  stage === "draw"
                    ? "bg-seal text-bg font-bold"
                    : "text-muted hover:text-ink"
                }`}
              >
                Draft
              </button>
              <button
                onClick={() => jumpToStage("fill")}
                className={`mono text-[0.52rem] px-1.5 py-0.5 rounded transition-colors ${
                  stage === "fill"
                    ? "bg-seal text-bg font-bold"
                    : "text-muted hover:text-ink"
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
                  showBisectors ? "text-seal font-medium" : "text-faint/60 line-through"
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
                  showNodes ? "text-seal font-medium" : "text-faint/60 line-through"
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
                  showCircles ? "text-seal font-medium" : "text-faint/60 line-through"
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
