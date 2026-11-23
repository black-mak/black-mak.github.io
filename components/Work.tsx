"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import Reveal from "./Reveal";
import ScaleTest from "./ScaleTest";
import HeadlineReveal from "./HeadlineReveal";
import { sound } from "@/lib/sound";

type Category = "all" | "identity" | "calligraphy" | "logos" | "outdoor";

type WorkItem = {
  n: string;
  category: "identity" | "calligraphy" | "logos" | "outdoor";
  href: string;
  behance: string;
  img: string;
  titleKey: string;
  tagsKey: string;
  outKey?: string;
  cls?: string;
  feature?: boolean;
};

// All 8 Curated Projects mapped with Behance gallery links and internal case study routes
const ALL_PROJECTS: WorkItem[] = [
  {
    n: "01",
    category: "logos",
    href: "/work/logos-vol-1",
    behance: "https://www.behance.net/gallery/60219345/LOGOS-VOL-1",
    img: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/c03acd60219345.6ad021bd2ee14.jpg",
    titleKey: "work.p1title",
    tagsKey: "work.p1tags",
    outKey: "work.p1out",
    cls: "lg:row-span-2",
    feature: true,
  },
  {
    n: "02",
    category: "identity",
    href: "/work/black-mak-identity",
    behance: "https://www.behance.net/gallery/70417691/BLACK-MAK-IDENTITY",
    img: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/9ebb8e70417691.6aca88cd861fc.jpg",
    titleKey: "work.p2title",
    tagsKey: "work.p2tags",
    outKey: "work.p2out",
  },
  {
    n: "03",
    category: "calligraphy",
    href: "/work/calligraphi-works",
    behance: "https://www.behance.net/gallery/67494575/Calligraphy-Work",
    img: "/images/work/calligraphi-cover.jpg",
    titleKey: "work.p3title",
    tagsKey: "work.p3tags",
    outKey: "work.p3out",
  },
  {
    n: "04",
    category: "identity",
    href: "/work/one-point-one",
    behance: "https://www.behance.net/gallery/37676919/11-ONE-POINT-ONE-Visual-identity",
    img: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/357a5837676919.6acf2ed499614.png",
    titleKey: "work.p4title",
    tagsKey: "work.p4tags",
    outKey: "work.p4out",
  },
  {
    n: "05",
    category: "logos",
    href: "/work/logos-vol-2",
    behance: "https://www.behance.net/gallery/181721153/LOGOS-VOLI",
    img: "https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/310ff4181721153.6a69232816c9e.jpg",
    titleKey: "work.p5title",
    tagsKey: "work.p5tags",
    outKey: "work.p5out",
  },
  {
    n: "06",
    category: "identity",
    href: "/work/security-eye",
    behance: "https://www.behance.net/gallery/38153367/SECURITY-EYE-VISUAL-IDENTITY",
    img: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/804ef038153367.6acf55ae0abb4.jpg",
    titleKey: "work.p6title",
    tagsKey: "work.p6tags",
    outKey: "work.p6out",
  },
  {
    n: "07",
    category: "calligraphy",
    href: "/work/makeen",
    behance: "https://www.behance.net/gallery/224445345/MAKEEN",
    img: "/images/work/makeen/makeen-calligraphy.jpg",
    titleKey: "work.p7title",
    tagsKey: "work.p7tags",
    outKey: "work.p7out",
  },
  {
    n: "08",
    category: "outdoor",
    href: "/work/outdoor-advertising",
    behance: "https://www.behance.net/gallery/37676905/OUTDOOR-ADVERTISING-WORKS-BANNERS",
    img: "/images/work/banners/ban-06.jpg",
    titleKey: "work.p8title",
    tagsKey: "work.p8tags",
    outKey: "work.p8out",
    cls: "md:col-span-2",
  },
];

const FEATURED = ALL_PROJECTS.slice(0, 3);
const MORE = ALL_PROJECTS.slice(3);

function Card({ w, i, eager }: { w: WorkItem; i: number; eager?: boolean }) {
  const { t } = useI18n();
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`work-card group block ${w.cls ?? ""}`}
    >
      {/* Work Image Container */}
      <div className="work-img-mask relative overflow-hidden border border-line bg-surface">
        {/* Subtle bottom gradient to ensure buttons have optimal contrast */}
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-500 opacity-90 sm:opacity-70 group-hover:opacity-95" />

        {/* Clickable Image leading to Case Study */}
        <a
          href={w.href}
          onClick={() => sound.click("pop")}
          className="block w-full h-full cursor-pointer"
          aria-label={t(w.titleKey)}
        >
          <Image
            src={w.img}
            alt={t(w.titleKey)}
            width={1280}
            height={800}
            priority={eager}
            referrerPolicy="no-referrer"
            sizes={w.feature ? "(max-width: 1024px) 100vw, 58vw" : "(max-width: 768px) 100vw, 45vw"}
            className="w-full object-cover transition duration-700 group-hover:scale-[1.045] aspect-[16/10]"
          />
        </a>

        {/* High-Contrast Interactive Buttons Bar */}
        <div className="absolute bottom-3 inset-x-3 sm:bottom-4 sm:inset-x-4 z-[5] flex items-center justify-between gap-2.5">
          {/* View on Behance */}
          <a
            href={w.behance}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
              sound.click("crisp");
            }}
            className="group/behance inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 font-mono text-[0.6rem] sm:text-[0.66rem] uppercase tracking-wider font-semibold text-white bg-[#0057ff] hover:bg-[#0047d4] border border-[#0057ff] shadow-[0_4px_16px_rgba(0,87,255,0.4)] hover:shadow-[0_4px_24px_rgba(0,87,255,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 rounded-sm"
            title="View on Behance"
          >
            <span className="font-extrabold text-[0.72rem] leading-none tracking-tight">Bē</span>
            <span>{t("work.viewBehance")}</span>
            <span className="transition-transform duration-300 group-hover/behance:translate-x-0.5 group-hover/behance:-translate-y-0.5 rtl:group-hover/behance:-translate-x-0.5">
              ↗
            </span>
          </a>

          {/* View Case Study */}
          <a
            href={w.href}
            onClick={() => sound.click("pop")}
            className="group/case inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 font-mono text-[0.6rem] sm:text-[0.66rem] uppercase tracking-wider font-semibold text-black bg-white hover:bg-[#f0f0eb] border border-white shadow-[0_4px_16px_rgba(0,0,0,0.6)] hover:shadow-[0_0_24px_rgba(255,255,255,0.55)] hover:scale-105 active:scale-95 transition-all duration-300 rounded-sm"
            title="View Case Study"
          >
            <span>{t("work.viewCaseStudy")}</span>
            <span className="font-bold transition-transform duration-300 group-hover/case:translate-x-0.5 group-hover/case:-translate-y-0.5 rtl:group-hover/case:-translate-x-0.5">
              ↗
            </span>
          </a>
        </div>
      </div>

      {/* Project Meta Information */}
      <a
        href={w.href}
        onClick={() => sound.click("pop")}
        className="block group/link"
      >
        <div className="flex items-start justify-between gap-4 border-b border-line py-5 transition-transform duration-300 group-hover:-translate-y-0.5">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-[0.6rem] text-faint">{w.n}</span>
            <h3 className="text-[clamp(1.15rem,2vw,1.75rem)] font-bold leading-[1.05] tracking-tight group-hover/link:text-seal transition-colors">
              {t(w.titleKey)}
            </h3>
          </div>
          <span className="text-end font-mono text-[0.6rem] text-muted opacity-70 transition-opacity duration-300 group-hover:opacity-100">
            {t(w.tagsKey)}
          </span>
        </div>
        {w.outKey && (
          <p className="mt-3 max-w-[52ch] font-mono text-[0.62rem] leading-relaxed tracking-[0.04em] text-faint">
            {t(w.outKey)}
          </p>
        )}
        <span className="work-title-line mt-2 block" aria-hidden="true" />
      </a>
    </motion.div>
  );
}

export default function Work() {
  const { t, lang } = useI18n();
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const categories: { id: Category; labelEn: string; labelAr: string; count: number }[] = [
    { id: "all", labelEn: "All Work", labelAr: "كل الأعمال", count: ALL_PROJECTS.length },
    {
      id: "identity",
      labelEn: "Brand Identity",
      labelAr: "الهوية البصرية",
      count: ALL_PROJECTS.filter((p) => p.category === "identity").length,
    },
    {
      id: "calligraphy",
      labelEn: "Arabic Calligraphy",
      labelAr: "الخط العربي",
      count: ALL_PROJECTS.filter((p) => p.category === "calligraphy").length,
    },
    {
      id: "logos",
      labelEn: "Logotypes & Marks",
      labelAr: "الشعارات والرموز",
      count: ALL_PROJECTS.filter((p) => p.category === "logos").length,
    },
    {
      id: "outdoor",
      labelEn: "Large Format & OOH",
      labelAr: "اللوحات والواجهات",
      count: ALL_PROJECTS.filter((p) => p.category === "outdoor").length,
    },
  ];

  const filteredProjects =
    activeCategory === "all"
      ? ALL_PROJECTS
      : ALL_PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="work" className="section border-t border-line py-[var(--section)]">
      <div className="container">
        <Reveal>
          <div className="mb-[clamp(2.5rem,6vw,5.2rem)] flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="eyebrow mb-4 block text-faint">{t("work.index")}</span>
              <HeadlineReveal className="display text-[clamp(3rem,7vw,7rem)]" html={t("work.title")} />
            </div>
            <p className="lede max-w-[42ch]">{t("work.note")}</p>
          </div>
        </Reveal>

        {/* Category Filter Tabs */}
        <div className="mb-12 flex flex-wrap items-center gap-2 border-b border-line pb-4">
          {categories.map((c) => {
            const isActive = activeCategory === c.id;
            return (
              <button
                key={c.id}
                onClick={() => {
                  sound.click("soft");
                  setActiveCategory(c.id);
                }}
                className={`mono relative flex items-center gap-2 px-3.5 py-1.5 text-[0.68rem] uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? "bg-ink text-bg font-semibold shadow-sm"
                    : "border border-line text-muted hover:border-ink hover:text-ink"
                }`}
              >
                <span>{lang === "ar" ? c.labelAr : c.labelEn}</span>
                <span
                  className={`mono text-[0.58rem] ${
                    isActive ? "text-seal font-bold" : "text-faint"
                  }`}
                >
                  {c.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Gallery Rendering: Dual layout when 'all', unified responsive grid when filtered */}
        {activeCategory === "all" ? (
          <>
            <div className="grid grid-cols-1 gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-[clamp(2.5rem,6vw,6rem)] lg:grid-cols-[1.45fr_1fr]">
              {FEATURED.map((w, i) => (
                <Card key={w.n} w={w} i={i} eager={i < 1} />
              ))}
            </div>

            {/* The promise, made tangible — favicon to facade */}
            <ScaleTest />

            <Reveal delay={0.1}>
              <div className="mt-[clamp(3rem,7vw,6rem)] mb-[clamp(1.5rem,4vw,3rem)] flex items-center gap-4">
                <span className="eyebrow text-faint">{t("work.moreIndex")}</span>
                <span className="hairline-draw h-px flex-1 bg-line" />
              </div>
            </Reveal>

            <div className="grid grid-cols-1 gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-[clamp(2.5rem,6vw,6rem)] md:grid-cols-2">
              {MORE.map((w, i) => (
                <Card key={w.n} w={w} i={i} />
              ))}
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-[clamp(2.5rem,6vw,6rem)] md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((w, i) => (
                <Card key={w.n} w={{ ...w, cls: "" }} i={i} />
              ))}
            </AnimatePresence>
          </div>
        )}

        <Reveal>
          <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line/60 pt-6 md:flex-row md:items-end">
            <p className="max-w-[46ch] text-muted">{t("work.footer")}</p>
            <a
              href="https://www.behance.net/Muhmed-alaa-el-bank"
              target="_blank"
              rel="noopener"
              onClick={() => sound.click("crisp")}
              className="text-link"
            >
              <span>{t("work.archive")}</span>
              <span>↗</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
