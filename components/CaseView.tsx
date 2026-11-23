"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { getCase, CASES } from "@/lib/cases";
import Reveal from "@/components/Reveal";

export default function CaseView({ slug }: { slug: string }) {
  const c = getCase(slug);
  const { lang, t } = useI18n();
  const coverRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [activeImg, setActiveImg] = useState<string | null>(null);

  useEffect(() => {
    if (!activeImg) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveImg(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeImg]);

  // cover parallax — the hero image drifts slower than the page (depth cue)
  const { scrollYProgress } = useScroll({
    target: coverRef,
    offset: ["start end", "end start"],
  });
  const coverY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const parallaxY = reduce ? 0 : coverY;

  if (!c) {
    return (
      <section className="container flex min-h-[70vh] flex-col items-center justify-center gap-6 pt-40 text-center">
        <h1 className="display text-[clamp(2.5rem,7vw,6rem)]">404</h1>
        <a href="/#work" className="text-link">
          <span>{t("case.back")}</span>
          <span>↗</span>
        </a>
      </section>
    );
  }

  const d = lang === "ar" ? c.ar : c.en;

  const idx = CASES.findIndex((x) => x.slug === c.slug);
  const prev = idx >= 0 ? CASES[(idx - 1 + CASES.length) % CASES.length] : CASES[0];
  const next = idx >= 0 ? CASES[(idx + 1) % CASES.length] : CASES[0];
  const prevTitle = lang === "ar" ? prev.ar.title : prev.en.title;
  const nextTitle = lang === "ar" ? next.ar.title : next.en.title;

  return (
    <article className="pt-[clamp(7rem,14vh,10rem)]">
      <div className="container">
        <Reveal>
          <div className="mb-10 flex items-center justify-between flex-wrap gap-4">
            <a href="/#work" className="text-link inline-flex">
              <span>← {t("case.back")}</span>
            </a>
            {c.behance && (
              <a
                href={c.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-wider font-semibold text-white bg-[#0057ff] hover:bg-[#0047d4] border border-[#0057ff] shadow-[0_4px_14px_rgba(0,87,255,0.35)] hover:shadow-[0_4px_20px_rgba(0,87,255,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 rounded-sm"
              >
                <span className="font-extrabold text-[0.7rem] leading-none">Bē</span>
                <span>{t("work.viewBehance")}</span>
                <span>↗</span>
              </a>
            )}
          </div>
        </Reveal>

        <Reveal>
          <span className="eyebrow mb-4 block text-faint">{d.tags}</span>
          <h1 className="display text-[clamp(2.8rem,8vw,8rem)]">{d.title}</h1>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-8 grid grid-cols-2 gap-6 border-y border-line py-6 font-mono text-[0.62rem] uppercase tracking-[0.13em] text-muted sm:grid-cols-3">
            <div>
              <span className="block text-faint">{t("case.roleLabel")}</span>
              {d.role}
            </div>
            <div>
              <span className="block text-faint">{t("case.yearLabel")}</span>
              {d.year}
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="block text-faint">BLACK-MAK</span>
              {t("hero.role")}
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div className="container mt-10">
          <div ref={coverRef} className="relative aspect-[16/9] overflow-hidden border border-line">
            <motion.div style={{ y: parallaxY }} className="absolute inset-[-8%]">
              <Image
                src={c.cover}
                alt={d.title}
                width={1600}
                height={1000}
                priority
                referrerPolicy="no-referrer"
                sizes="(max-width: 1380px) 92vw, 1380px"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </Reveal>

      <section className="section border-t border-line py-[var(--section)]">
        <div className="container">
          <Reveal>
            <p className="lede text-[clamp(1.2rem,2.2vw,1.8rem)] text-ink">{d.summary}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mt-10 max-w-[64ch] space-y-5 text-muted">
              {d.body.map((p, i) => (
                <p key={i} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section border-t border-line py-[var(--section)]">
        <div className="container">
          <Reveal>
            <span className="eyebrow mb-8 block text-faint">{t("work.index")}</span>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {c.gallery.map((src, i) => (
              <Reveal key={`${src}-${i}`} delay={Math.min(i * 0.03, 0.3)}>
                <figure
                  onClick={() => setActiveImg(src)}
                  className="group cursor-zoom-in overflow-hidden border border-line bg-[#0a0a0c] transition-all duration-300 hover:border-seal/60 flex items-center justify-center"
                >
                  <Image
                    src={src}
                    alt={`${d.title} — ${lang === "ar" ? "لوحة" : "work"} ${i + 1}`}
                    width={1400}
                    height={950}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="w-full h-auto object-contain transition duration-700 group-hover:scale-[1.02]"
                  />
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-line bg-surface py-[var(--section)]">
        <div className="container flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <span className="eyebrow mb-4 block text-faint">{t("case.startTitle")}</span>
            <h2 className="display">{t("case.startHeading")}</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {c.behance && (
              <a href={c.behance} target="_blank" rel="noopener" className="btn btn-ghost">
                <span>{t("case.behance")}</span>
                <span aria-hidden="true">↗</span>
              </a>
            )}
            <a href="/#start-a-project" className="btn btn-light">
              <span>{t("case.startCta")}</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className="section border-t border-line py-[var(--section)]">
        <div className="container">
          <Reveal>
            <span className="eyebrow mb-8 block text-faint">{t("case.more")}</span>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Reveal>
              <a
                href={`/work/${prev.slug}`}
                className="group block border border-line p-6 transition-colors hover:border-ink rtl:text-right"
              >
                <span className="block font-mono text-[0.62rem] uppercase tracking-[0.13em] text-faint">
                  ← {t("case.prev")}
                </span>
                <span className="mt-3 block text-xl font-bold text-ink transition-colors group-hover:underline">
                  {prevTitle}
                </span>
              </a>
            </Reveal>
            <Reveal delay={0.05}>
              <a
                href={`/work/${next.slug}`}
                className="group block border border-line p-6 transition-colors hover:border-ink rtl:text-right"
              >
                <span className="block font-mono text-[0.62rem] uppercase tracking-[0.13em] text-faint">
                  {t("case.next")} →
                </span>
                <span className="mt-3 block text-xl font-bold text-ink transition-colors group-hover:underline">
                  {nextTitle}
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* High-Resolution Lightbox Modal */}
      {activeImg && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveImg(null)}
          className="fixed inset-0 z-[250] flex items-center justify-center bg-black/92 p-4 sm:p-8 backdrop-blur-md cursor-zoom-out"
        >
          <button
            type="button"
            onClick={() => setActiveImg(null)}
            className="absolute top-6 right-6 z-[260] grid h-11 w-11 place-items-center border border-white/20 bg-black/60 text-white hover:border-white hover:bg-black transition-colors rounded-sm"
            aria-label="Close"
          >
            ✕
          </button>
          <div
            className="relative max-h-[92vh] max-w-[95vw] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activeImg}
              alt={d.title}
              width={2400}
              height={1600}
              priority
              referrerPolicy="no-referrer"
              sizes="95vw"
              className="max-h-[90vh] w-auto max-w-full object-contain border border-line"
            />
          </div>
        </div>
      )}
    </article>
  );
}
