"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { sound } from "@/lib/sound";
import BrandMark from "./BrandMark";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const { t, lang, setLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMuted(sound.isMuted());
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the menu
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const links = [
    { href: "#work", k: "nav.work" },
    { href: "#services", k: "nav.services" },
    { href: "#estimator", labelEn: "Estimator", labelAr: "حاسبة النطاق" },
    { href: "#pricing", k: "nav.pricing" },
    { href: "#about", k: "nav.about" },
  ];

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1)).concat("start-a-project");
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [links]);

  const handleLangToggle = () => {
    sound.click("crisp");
    setLang(lang === "ar" ? "en" : "ar");
  };

  const handleMenuToggle = () => {
    sound.click("pop");
    setOpen((o) => !o);
  };

  return (
    <header
      dir="ltr"
      className={`fixed inset-x-0 top-0 z-[100] border-b transition-colors duration-500 ${
        scrolled
          ? "border-line bg-bg/85 backdrop-blur-xl"
          : "border-transparent"
      }`}
    >
      <div className="container flex min-h-[76px] items-center justify-between gap-2 md:gap-8">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            sound.click("soft");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          aria-label="BLACK-MAK home"
        >
          <BrandMark />
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => sound.click("soft")}
              className={`font-mono text-[0.68rem] uppercase tracking-[0.16em] transition-colors hover:text-ink ${
                active === l.href.slice(1) ? "text-ink font-semibold" : "text-muted"
              }`}
              aria-current={active === l.href.slice(1) ? "location" : undefined}
            >
              {l.k ? t(l.k) : (lang === "ar" ? l.labelAr : l.labelEn)}
            </a>
          ))}
          <a
            href="https://black-mak.github.io/cv/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.click("crisp")}
            className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-faint transition-colors hover:text-muted"
          >
            {t("nav.cv")}
          </a>
          <a
            href="#start-a-project"
            onClick={() => sound.click("crisp")}
            className="btn btn-light"
          >
            <span>{t("nav.cta")}</span>
            <span>↗</span>
          </a>
        </nav>

        <div className="flex items-center gap-2">
          {/* Quick Action Trigger */}
          <button
            type="button"
            onClick={() => {
              sound.click("pop");
              window.dispatchEvent(new CustomEvent("open-command-palette"));
            }}
            aria-label="Open Command Palette"
            className="hidden lg:flex items-center gap-2 border border-line-strong px-2.5 py-1.5 font-mono text-[0.66rem] text-muted hover:border-ink hover:text-ink transition-colors"
          >
            <span className="text-seal font-semibold">⌘K</span>
            <span className="uppercase tracking-wider text-[0.6rem]">
              {lang === "ar" ? "قائمة سريعة" : "Menu"}
            </span>
          </button>
          {/* Sound Toggle */}
          <button
            type="button"
            onClick={() => {
              const nextMuted = sound.toggleMute();
              setIsMuted(nextMuted);
              if (!nextMuted) sound.click("crisp");
            }}
            title={isMuted ? "Unmute tactile audio" : "Mute tactile audio"}
            aria-label={isMuted ? "Unmute tactile audio" : "Mute tactile audio"}
            className="grid h-10 w-10 place-items-center border border-line-strong text-muted transition-colors hover:border-ink hover:text-ink"
          >
            {isMuted ? (
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
          </button>
          <ThemeToggle />
          <button
            type="button"
            onClick={handleLangToggle}
            aria-label="Switch language"
            className="grid h-10 place-items-center border border-line-strong px-3 font-mono text-[0.7rem] text-muted transition-colors hover:border-ink hover:text-ink"
          >
            {t("lang.toggle")}
          </button>
          <button
            type="button"
            onClick={handleMenuToggle}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="grid h-11 w-11 place-items-center border border-line-strong md:hidden"
          >
            <span className={`block h-[2px] w-5 bg-ink transition ${open ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`mt-1 block h-[2px] w-5 bg-ink transition ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      <div
        className={`container grid overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          open ? "grid-rows-[1fr] py-8 opacity-100" : "grid-rows-[0fr] py-0 opacity-0"
        }`}
        aria-hidden={!open}
        {...(!open ? { inert: "" as unknown as boolean } : {})}
      >
        <nav ref={menuRef} className="flex min-h-0 flex-col gap-6 overflow-hidden" aria-label="Mobile navigation">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => {
                sound.click("soft");
                setOpen(false);
              }}
              className={`text-2xl font-bold transition-all duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
            >
              {l.k ? t(l.k) : (lang === "ar" ? l.labelAr : l.labelEn)}
            </a>
          ))}
          <a
            href="https://black-mak.github.io/cv/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              sound.click("crisp");
              setOpen(false);
            }}
            className={`text-2xl font-bold transition-all duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
          >
            {t("nav.cv")}
          </a>
          <a
            href="#start-a-project"
            onClick={() => {
              sound.click("crisp");
              setOpen(false);
            }}
            className="btn btn-light w-full"
          >
            {t("nav.cta")}
          </a>
        </nav>
      </div>
    </header>
  );
}
