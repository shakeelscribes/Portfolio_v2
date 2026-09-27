"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import EcgCanvas from "@/components/EcgCanvas";
import SlotCanvas from "@/components/SlotCanvas";
import RingsCanvas from "@/components/RingsCanvas";
import EcgDashboard from "@/components/EcgDashboard";
import AnnaTerminal from "@/components/AnnaTerminal";
import CountUp from "@/components/CountUp";
import SalonPhone from "@/components/SalonPhone";
import { FEATURED } from "@/lib/data";
import AlsoOnGithub from "@/components/AlsoOnGithub";
import type { FeatureProject } from "@/lib/data";

/**
 * Sticky-stack work section. Each case pins near the top of the viewport;
 * the next case slides over it while the pinned one scales back and dims.
 * Positioning is pure CSS sticky (no scroll hijack). Motion only maps the
 * shared container progress to per-card scale and opacity, and everything
 * collapses to plain stacked sections under reduced motion or below lg.
 */

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

function Visual({ project }: { project: FeatureProject }) {
  // Every case pairs a dim generative canvas with a coded product mockup.
  if (project.visual === "ecg") return <EcgCanvas className="absolute inset-0 size-full opacity-60" />;
  if (project.visual === "slots") return <SlotCanvas className="absolute inset-0 size-full opacity-60" />;
  return <RingsCanvas className="absolute inset-0 size-full opacity-60" />;
}

function Mockup({ project }: { project: FeatureProject }) {
  if (project.visual === "slots") return <SalonPhone />;
  if (project.visual === "ecg") return <EcgDashboard />;
  return <AnnaTerminal />;
}

function CaseText({ project }: { project: FeatureProject }) {
  return (
    <div className="max-w-[600px]">
      <h3 className="case-title font-display text-5xl font-semibold leading-[1.02] tracking-tight text-ink [word-spacing:0.12em] min-[768px]:text-6xl min-[1024px]:text-5xl min-[1280px]:text-6xl min-[1440px]:text-7xl">
        {project.name}
      </h3>
      <p className="case-lede mt-6 text-lg font-medium leading-snug text-ink">
        {project.headline}
      </p>
      <p className="case-body mt-4 max-w-[58ch] leading-relaxed text-dim">{project.body}</p>

      <div className="case-metrics mt-9 grid grid-cols-3 gap-5">
        {project.metrics.map((m) => (
          <div key={m.label}>
            <p className="font-display text-2xl font-semibold text-ink md:text-[1.7rem]">
              <CountUp value={m.value} />
            </p>
            <p className="mt-1.5 text-xs leading-snug text-faint">{m.label}</p>
          </div>
        ))}
      </div>

      <div className="case-chips mt-8 flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <span
            key={s}
            className="rounded-lg border border-line bg-bg/60 px-3 py-1.5 text-[13px] text-dim backdrop-blur-sm"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function CaseCard({
  project,
  index,
  total,
  progress,
  reduce,
  isDesktop,
}: {
  project: FeatureProject;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduce: boolean;
  isDesktop: boolean;
}) {
  // Card i is covered while card i+1 travels one full segment of the stack.
  // The outgoing card keeps an opaque surface — only a bg-colored scrim fades
  // in over its content. Fading the card itself lets the covered card ghost
  // through the incoming one mid-scroll.
  const isLast = index === total - 1;
  const seg = 1 / (total - 1);
  const scale = useTransform(
    progress,
    [index * seg, Math.min(1, (index + 1) * seg)],
    [1, 0.94],
  );
  const dim = useTransform(
    progress,
    [index * seg, Math.min(1, (index + 1) * seg)],
    [0, 0.6],
  );

  const animate = isDesktop && !reduce && !isLast;

  return (
    <div
      style={{ zIndex: index + 1 }}
      className="lg:sticky lg:top-6 lg:h-[calc(100dvh-3rem)]"
    >
      <motion.div
        style={animate ? { scale } : undefined}
        className="relative h-full min-h-[86dvh] overflow-hidden rounded-[28px] border border-line bg-raised lg:min-h-0"
      >
        <Visual project={project} />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/85 to-bg/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/85 via-transparent to-bg/40 lg:to-transparent" />

        {/* card chrome: one quiet header row — meta left, links right.
            Links live near the top (below the fixed nav) so the incoming
            card covers them last — clickable through the whole stack. */}
        <div className="absolute inset-x-0 top-20 z-20 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 md:px-10">
          <p className="font-mono text-[13px] text-accent-ink">{project.meta}</p>
          <div className="flex flex-wrap items-center gap-2.5">
            {project.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noreferrer" : undefined}
                className="group/link inline-flex items-center gap-1.5 rounded-lg border border-line bg-bg/70 px-3.5 py-2 font-mono text-sm text-dim backdrop-blur-sm transition-colors duration-300 hover:border-accent-ink/40 hover:text-accent-ink"
              >
                {l.label}
                <span className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="relative z-10 grid min-h-[86dvh] items-center gap-10 px-6 py-16 md:px-12 lg:h-full lg:min-h-0 lg:grid-cols-2 lg:py-0">
          {/* Anchored under the chrome strip, never vertically centred: centring
              let a tall title or a short viewport slide the copy into the strip. */}
          <div className="case-text mt-20 self-start lg:mt-[134px] [@media(max-height:760px)]:[&_.case-title]:text-[2.75rem] [@media(max-height:760px)]:[&_.case-lede]:mt-3 [@media(max-height:760px)]:[&_.case-lede]:text-[1.0625rem] [@media(max-height:760px)]:[&_.case-body]:mt-2.5 [@media(max-height:760px)]:[&_.case-body]:text-[0.9375rem] [@media(max-height:760px)]:[&_.case-metrics]:mt-6 [@media(max-height:760px)]:[&_.case-metrics]:gap-3 [@media(max-height:760px)]:[&_.case-chips]:mt-5 [@media(max-height:700px)_and_(max-width:1100px)]:[&_.case-title]:text-[2.5rem] [@media(max-height:700px)_and_(max-width:1100px)]:[&_.case-body]:line-clamp-4 [@media(max-height:700px)_and_(max-width:1100px)]:[&_.case-body]:text-[0.875rem] [@media(max-height:700px)_and_(max-width:1100px)]:[&_.case-metrics>p]:text-xl [@media(max-height:700px)_and_(max-width:1100px)]:[&_.case-chips>span]:px-2.5 [@media(max-height:700px)_and_(max-width:1100px)]:[&_.case-chips>span]:py-1 [@media(max-height:700px)_and_(max-width:1100px)]:[&_.case-chips>span]:text-xs">
            <CaseText project={project} />
          </div>
          <div className="hidden justify-center lg:flex">
            <Mockup project={project} />
          </div>
        </div>

        {animate && (
          <motion.div
            style={{ opacity: dim }}
            className="pointer-events-none absolute inset-0 z-30 bg-bg"
          />
        )}
      </motion.div>
    </div>
  );
}

export default function Work() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const isDesktop = useIsDesktop();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="work" className="relative">
      <div className="px-6 pb-20 pt-32 md:px-10 md:pt-44">
        <div className="mx-auto max-w-[1400px]">
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-6xl font-semibold tracking-tight text-ink md:text-8xl"
          >
            Selected work
          </motion.h2>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-[65ch] text-lg leading-relaxed text-dim"
          >
            Deployed systems, a production client build, and an infrastructure
            bet sized for results day.
          </motion.p>
        </div>
      </div>

      <div
        ref={containerRef}
        className="space-y-6 px-4 pb-10 md:px-8 lg:space-y-0"
      >
        {FEATURED.map((p, i) => (
          <CaseCard
            key={p.id}
            project={p}
            index={i}
            total={FEATURED.length}
            progress={scrollYProgress}
            reduce={!!reduce}
            isDesktop={isDesktop}
          />
        ))}
      </div>

      <div className="relative overflow-hidden px-6 py-28 md:px-10 md:py-40">
        <AlsoOnGithub />
      </div>
    </section>
  );
}
