"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { sound } from "@/lib/sound";

interface CommandItem {
  id: string;
  category: "navigation" | "actions" | "contact";
  titleEn: string;
  titleAr: string;
  hintEn?: string;
  hintAr?: string;
  badge?: string;
  action: () => void;
}

export default function CommandPalette() {
  const { lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        sound.click("pop");
        setOpen((v) => !v);
      } else if (e.key === "Escape" && open) {
        e.preventDefault();
        sound.click("soft");
        setOpen(false);
      }
    };
    const onCustomOpen = () => {
      sound.click("pop");
      setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onCustomOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onCustomOpen);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setSelectedIdx(0);
    }
  }, [open]);

  const copyToClipboard = (text: string, label: string) => {
    sound.click("crisp");
    navigator.clipboard.writeText(text).then(() => {
      showToast(lang === "ar" ? `تم نسخ ${label}` : `Copied ${label} to clipboard`);
    });
    setOpen(false);
  };

  const jumpTo = (id: string) => {
    sound.click("soft");
    setOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const commands: CommandItem[] = [
    // Navigation
    {
      id: "nav-work",
      category: "navigation",
      titleEn: "Featured Case Studies & Work",
      titleAr: "أعمال الاستوديو ودراسات الحالة",
      hintEn: "8 curated brand projects",
      hintAr: "٨ مشاريع هوية مختارة",
      badge: "01",
      action: () => jumpTo("work"),
    },
    {
      id: "nav-services",
      category: "navigation",
      titleEn: "Services & Capabilities",
      titleAr: "الخدمات والقدرات التصميمية",
      hintEn: "Logos, systems, calligraphy",
      hintAr: "شعارات، أنظمة، خط عربي",
      badge: "02",
      action: () => jumpTo("services"),
    },
    {
      id: "nav-estimator",
      category: "navigation",
      titleEn: "Project Scope & Budget Estimator",
      titleAr: "حاسبة نطاق وميزانية المشروع",
      hintEn: "Interactive pricing calculator",
      hintAr: "حاسبة تسعير تفاعلية فورية",
      badge: "PRO",
      action: () => jumpTo("estimator"),
    },
    {
      id: "nav-pricing",
      category: "navigation",
      titleEn: "Studio Investment & Packages",
      titleAr: "باقات الاستثمار والأسعار",
      hintEn: "Essential, Professional, Enterprise",
      hintAr: "الأساسية، الاحترافية، المؤسسية",
      badge: "03",
      action: () => jumpTo("pricing"),
    },
    {
      id: "nav-about",
      category: "navigation",
      titleEn: "About BLACK-MAK Studio",
      titleAr: "عن استوديو بلاك ماك",
      hintEn: "Design philosophy & background",
      hintAr: "فلسفة التصميم والنشأة",
      badge: "04",
      action: () => jumpTo("about"),
    },
    {
      id: "nav-start",
      category: "navigation",
      titleEn: "Start a Project Brief",
      titleAr: "بدء مشروع جديد واستمارة البريف",
      hintEn: "Send direct project brief",
      hintAr: "إرسال تفاصيل المشروع مباشرة",
      badge: "CTA",
      action: () => jumpTo("start-a-project"),
    },
    // Actions
    {
      id: "act-whatsapp",
      category: "actions",
      titleEn: "Fast Track via WhatsApp",
      titleAr: "تواصل مباشر وفوري عبر واتساب",
      hintEn: "+20 101 779 9516",
      hintAr: "٢٠١٠١٧٧٩٩٥١٦+",
      badge: "LIVE",
      action: () => {
        sound.click("crisp");
        window.open(
          "https://wa.me/201017799516?text=" +
            encodeURIComponent("Hello BLACK-MAK Studio, I would like to discuss a brand identity project."),
          "_blank"
        );
        setOpen(false);
      },
    },
    {
      id: "act-behance",
      category: "actions",
      titleEn: "Official Behance Portfolio",
      titleAr: "معرض الأعمال الرسمي على بيهانس",
      hintEn: "Full case studies & archive",
      hintAr: "دراسات الحالة الكاملة والأرشيف",
      badge: "↗",
      action: () => {
        sound.click("crisp");
        window.open("https://www.behance.net/Muhmed-alaa-el-bank", "_blank");
        setOpen(false);
      },
    },
    {
      id: "act-cv",
      category: "actions",
      titleEn: "Designer Dossier & Personal CV",
      titleAr: "السيرة الذاتية وملف المصمم الشخصي",
      hintEn: "Interactive Swiss portfolio",
      hintAr: "الملف التفاعلي الموثق",
      badge: "CV",
      action: () => {
        sound.click("crisp");
        window.open("https://black-mak.github.io/cv/", "_blank");
        setOpen(false);
      },
    },
    {
      id: "act-lang",
      category: "actions",
      titleEn: lang === "ar" ? "Switch to English" : "التبديل إلى العربية",
      titleAr: lang === "ar" ? "Switch to English" : "التبديل إلى العربية",
      hintEn: lang === "ar" ? "English interface" : "واجهة باللغة العربية",
      hintAr: lang === "ar" ? "English interface" : "واجهة باللغة العربية",
      badge: "LANG",
      action: () => {
        sound.click("crisp");
        setLang(lang === "ar" ? "en" : "ar");
        setOpen(false);
      },
    },
    {
      id: "act-sound",
      category: "actions",
      titleEn: sound.isMuted() ? "Unmute Studio Sound" : "Mute Studio Sound",
      titleAr: sound.isMuted() ? "تفعيل المؤثرات الصوتية" : "كتم المؤثرات الصوتية",
      hintEn: "Subtle mechanical haptics",
      hintAr: "نقرات لمسية ميكانيكية خفيفة",
      badge: "AUDIO",
      action: () => {
        const isM = sound.toggleMute();
        if (!isM) sound.click("crisp");
        showToast(
          isM
            ? lang === "ar"
              ? "تم كتم الصوت"
              : "Sound Muted"
            : lang === "ar"
            ? "تم تفعيل الصوت"
            : "Sound Enabled"
        );
        setOpen(false);
      },
    },
    // Contact
    {
      id: "copy-email",
      category: "contact",
      titleEn: "Copy Direct Email Address",
      titleAr: "نسخ البريد الإلكتروني المباشر",
      hintEn: "makeenmuhamed31@gmail.com",
      hintAr: "makeenmuhamed31@gmail.com",
      badge: "COPY",
      action: () => copyToClipboard("makeenmuhamed31@gmail.com", "Email"),
    },
    {
      id: "copy-phone",
      category: "contact",
      titleEn: "Copy WhatsApp / Direct Phone",
      titleAr: "نسخ رقم الواتساب والهاتف",
      hintEn: "+20 101 779 9516",
      hintAr: "+20 101 779 9516",
      badge: "COPY",
      action: () => copyToClipboard("+201017799516", "Phone"),
    },
  ];

  const filtered = commands.filter((cmd) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      cmd.titleEn.toLowerCase().includes(q) ||
      cmd.titleAr.toLowerCase().includes(q) ||
      cmd.hintEn?.toLowerCase().includes(q) ||
      cmd.hintAr?.toLowerCase().includes(q)
    );
  });

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      sound.click("soft");
      setSelectedIdx((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      sound.click("soft");
      setSelectedIdx((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === "Enter" && filtered[selectedIdx]) {
      e.preventDefault();
      filtered[selectedIdx].action();
    }
  };

  return (
    <>
      {/* Floating Trigger Pill */}
      <aside aria-label="Quick navigation helper" className="fixed bottom-6 left-6 z-[90] hidden sm:block">
        <button
          type="button"
          onClick={() => {
            sound.click("pop");
            setOpen(true);
          }}
          className="group flex items-center gap-2.5 rounded-full border border-line bg-surface/90 px-3.5 py-2 text-xs backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-seal hover:bg-surface"
          aria-label="Open Studio Command Palette"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-seal opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-seal" />
          </span>
          <span className="mono text-[0.68rem] text-muted group-hover:text-ink">
            {lang === "ar" ? "قائمة سريعة" : "Quick Actions"}
          </span>
          <kbd className="mono rounded border border-line bg-bg/80 px-1.5 py-0.5 text-[0.6rem] font-semibold text-seal">
            ⌘K
          </kbd>
        </button>
      </aside>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[220] mono border border-seal/50 bg-[#0f1012] px-4 py-2 text-xs text-seal shadow-2xl rounded-sm"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Dialog */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[200] flex items-start justify-center p-4 pt-[12vh] sm:pt-[15vh]"
            role="dialog"
            aria-modal="true"
            aria-label="Command Palette"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => {
                sound.click("soft");
                setOpen(false);
              }}
            />

            {/* Panel */}
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: -8 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex max-h-[75vh] w-full max-w-xl flex-col border border-line-strong bg-bg shadow-2xl"
              onKeyDown={onKeyDown}
            >
              {/* Search Bar */}
              <div className="flex items-center gap-3 border-b border-line px-4 py-3.5 sm:px-5">
                <span className="mono text-seal font-semibold text-sm">⌘</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIdx(0);
                  }}
                  placeholder={
                    lang === "ar"
                      ? "ابحث عن قسم، خدمة، أو إجراء سريع..."
                      : "Type a command, section, or action..."
                  }
                  className="w-full bg-transparent text-sm text-ink placeholder:text-faint focus:outline-none"
                  aria-label="Search commands"
                />
                {query && (
                  <button
                    onClick={() => {
                      sound.click("crisp");
                      setQuery("");
                    }}
                    className="mono text-xs text-faint hover:text-ink"
                  >
                    ×
                  </button>
                )}
                <kbd className="mono hidden sm:inline-block border border-line px-1.5 py-0.5 text-[0.6rem] text-faint rounded">
                  ESC
                </kbd>
              </div>

              {/* Command List */}
              <div className="overflow-y-auto p-2">
                {filtered.length === 0 ? (
                  <div className="py-8 text-center mono text-xs text-faint">
                    {lang === "ar" ? "لا توجد نتائج مطابقة" : "No matching commands"}
                  </div>
                ) : (
                  <ul className="space-y-1">
                    {filtered.map((item, idx) => {
                      const isSelected = idx === selectedIdx;
                      return (
                        <li key={item.id}>
                          <button
                            type="button"
                            onClick={() => item.action()}
                            onMouseEnter={() => setSelectedIdx(idx)}
                            className={`flex w-full items-center justify-between px-3.5 py-2.5 text-start transition-colors ${
                              isSelected
                                ? "bg-surface-2 border border-line-strong text-ink"
                                : "text-muted hover:text-ink border border-transparent"
                            }`}
                          >
                            <div className="min-w-0 pr-3">
                              <p className="text-xs font-semibold sm:text-sm text-ink truncate">
                                {lang === "ar" ? item.titleAr : item.titleEn}
                              </p>
                              {(item.hintEn || item.hintAr) && (
                                <p className="mono text-[0.65rem] text-faint truncate mt-0.5">
                                  {lang === "ar" ? item.hintAr : item.hintEn}
                                </p>
                              )}
                            </div>
                            {item.badge && (
                              <span
                                className={`mono text-[0.6rem] px-2 py-0.5 shrink-0 ${
                                  isSelected
                                    ? "bg-seal text-bg font-bold"
                                    : "border border-line text-faint"
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {/* Panel Footer */}
              <div className="flex items-center justify-between border-t border-line px-4 py-2 text-[0.64rem] mono text-faint">
                <div className="flex items-center gap-3">
                  <span>↑↓ Navigate</span>
                  <span>↵ Select</span>
                  <span>ESC Close</span>
                </div>
                <span className="text-seal font-medium">BLACK-MAK Studio</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
