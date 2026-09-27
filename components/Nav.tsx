"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { useState } from "react";
import { DownloadSimple, List, X } from "@phosphor-icons/react";
import ThemeToggle from "@/components/ThemeToggle";
import { CONTACT } from "@/lib/data";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [inverted, setInverted] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    // Flip the nav to lime-dark while it floats over the contact block.
    const contact = document.getElementById("contact");
    if (contact) {
      const r = contact.getBoundingClientRect();
      setInverted(r.top <= 72 && r.bottom > 0);
    }
    const prev = scrollY.getPrevious() ?? 0;
    if (open) return;
    setHidden(y > prev && y > 160);
  });

  function toggle(next: boolean) {
    setOpen(next);
    document.body.style.overflow = next ? "hidden" : "";
    if (next) setHidden(false);
  }

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-colors duration-500 ${
          inverted ? "border-[#16160f]/20 bg-accent/90" : "border-line/60 bg-bg/75"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-6 md:px-10">
          <a
            href="#top"
            className={`font-display text-xl font-semibold tracking-tight ${
              inverted ? "text-[#16160f]" : "text-ink"
            }`}
          >
            Shakeel<span className={inverted ? "text-[#16160f]" : "text-accent-ink"}>.</span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`text-sm transition-colors duration-300 ${
                  inverted ? "text-[#16160f]/70 hover:text-[#16160f]" : "text-dim hover:text-ink"
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* The switch carries its own hardware palette, so it needs no
                inverted variant over the lime contact block. */}
            <ThemeToggle />
            <span
              className={`hidden items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs sm:flex ${
                inverted ? "border-[#16160f]/30 text-[#16160f]" : "border-line text-dim"
              }`}
              title="Availability"
            >
              <span
                className={`size-1.5 rounded-full ${
                  inverted ? "bg-[#16160f]" : "bg-accent"
                }`}
                aria-hidden
              />
              Open to work
            </span>
            <a
              href={CONTACT.resume}
              download="Mohamed-Shakeel-Resume.pdf"
              aria-label="Download resume"
              className={`flex size-9 items-center justify-center rounded-full border transition-colors duration-300 ${
                inverted
                  ? "border-[#16160f]/30 text-[#16160f] hover:bg-[#16160f] hover:text-accent"
                  : "border-line text-dim hover:border-faint hover:text-ink"
              }`}
            >
              <DownloadSimple size={16} weight="bold" />
            </a>
            <button
              type="button"
              onClick={() => toggle(!open)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className={`flex size-9 items-center justify-center rounded-full border transition-colors duration-300 lg:hidden ${
                inverted
                  ? "border-[#16160f]/30 text-[#16160f] hover:bg-[#16160f] hover:text-accent"
                  : "border-line text-dim hover:border-faint hover:text-ink"
              }`}
            >
              {open ? <X size={16} weight="bold" /> : <List size={16} weight="bold" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex min-h-[100dvh] flex-col justify-between bg-bg px-6 pb-10 pt-28 lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col gap-2">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => toggle(false)}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-line py-5 font-display text-4xl font-semibold tracking-tight text-ink"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="flex flex-col gap-2 font-mono text-sm text-dim"
            >
              <a href={`mailto:${CONTACT.email}`} className="hover:text-ink">
                {CONTACT.email}
              </a>
              <a href={CONTACT.resume} download="Mohamed-Shakeel-Resume.pdf" className="hover:text-ink">
                Download resume
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
