"use client";

import {
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
  Phone,
  DownloadSimple,
} from "@phosphor-icons/react";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import LocalTime from "@/components/LocalTime";
import { CONTACT, AVAILABILITY } from "@/lib/data";

/**
 * The page's one deliberate theme flip: the whole contact block inverts to
 * the accent lime with dark type. One strong transition, not alternation.
 */
export default function Contact() {
  return (
    <section id="contact" className="bg-accent text-[#16160f]">
      <div className="px-6 pt-28 pb-10 md:px-10 md:pt-40">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <p className="font-mono text-sm text-[#16160f]/70">{AVAILABILITY}</p>
            <h2 className="mt-6 max-w-[22ch] font-display text-5xl font-semibold tracking-tight md:text-8xl">
              Your next AI hire is one email away.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <a
              href={`mailto:${CONTACT.email}`}
              className="mt-14 inline-block break-all font-display text-[clamp(1.7rem,4.8vw,4.25rem)] font-semibold tracking-tight underline decoration-[#16160f]/30 decoration-2 underline-offset-8 transition-[color,text-decoration-color,transform] duration-300 hover:-translate-y-1 hover:decoration-[#16160f]"
            >
              {CONTACT.email}
            </a>

            <div className="mt-14 flex flex-wrap items-center gap-4">
              <Magnetic>
                <a
                  href={CONTACT.resume}
                  download="Mohamed-Shakeel-Resume.pdf"
                  className="flex items-center gap-2.5 rounded-full bg-[#16160f] px-7 py-3.5 text-[15px] font-bold text-accent transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                >
                  Download resume
                  <DownloadSimple size={16} weight="bold" />
                </a>
              </Magnetic>

              <div className="flex items-center gap-3">
                <a
                  href={CONTACT.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn profile"
                  className="flex size-12 items-center justify-center rounded-full border border-[#16160f]/30 transition-colors duration-300 hover:bg-[#16160f] hover:text-accent"
                >
                  <LinkedinLogo size={20} weight="regular" />
                </a>
                <a
                  href={CONTACT.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub profile"
                  className="flex size-12 items-center justify-center rounded-full border border-[#16160f]/30 transition-colors duration-300 hover:bg-[#16160f] hover:text-accent"
                >
                  <GithubLogo size={20} weight="regular" />
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  aria-label="Send an email"
                  className="flex size-12 items-center justify-center rounded-full border border-[#16160f]/30 transition-colors duration-300 hover:bg-[#16160f] hover:text-accent"
                >
                  <EnvelopeSimple size={20} weight="regular" />
                </a>
                <a
                  href={CONTACT.phoneHref}
                  aria-label={`Call ${CONTACT.phone}`}
                  className="flex size-12 items-center justify-center rounded-full border border-[#16160f]/30 transition-colors duration-300 hover:bg-[#16160f] hover:text-accent"
                >
                  <Phone size={20} weight="regular" />
                </a>
              </div>
            </div>

            <p className="mt-8 font-mono text-sm text-[#16160f]/80">{CONTACT.phone}</p>
          </Reveal>

          <footer className="mt-28 flex flex-col gap-3 border-t border-[#16160f]/25 pt-8 text-[13px] text-[#16160f]/70 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Mohamed Shakeel</p>
            <LocalTime location={CONTACT.location} />
          </footer>
        </div>
      </div>
    </section>
  );
}
