"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowDown, DownloadSimple } from "@phosphor-icons/react";
import Magnetic from "@/components/Magnetic";
import Scramble from "@/components/Scramble";
import FlowField from "@/components/FlowField";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } },
};

const rise = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 1, ease: EASE } },
};

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const state = reduce ? ("show" as const) : ("hidden" as const);

  // Content drifts up and fades as the flow field holds its ground.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100dvh] flex-col overflow-hidden"
    >
      <FlowField className="absolute inset-0 size-full" />

      <motion.div
        style={reduce ? undefined : { y, opacity }}
        className="relative z-10 mx-auto mt-auto w-full max-w-[1400px] px-6 pb-[9vh] pt-32 md:px-10"
      >
        <motion.div
          variants={container}
          initial={state}
          animate="show"
        >
          <div className="overflow-hidden">
            <motion.p variants={rise} className="font-mono text-sm text-faint">
              Mohamed Shakeel
            </motion.p>
          </div>

          <h1 className="mt-7 font-display text-[clamp(3rem,7.9vw,7.5rem)] leading-[1.04] font-semibold tracking-[-0.02em]">
            <span className="block overflow-hidden pb-1">
              <motion.span variants={rise} className="block text-ink">
                GenAI engineer building
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span variants={rise} className="block text-ink">
                LLM systems <span className="text-accent-ink">that ship.</span>
              </motion.span>
            </span>
          </h1>

          <motion.div variants={fade} className="mt-9">
            <Scramble
              phrases={[
                "RAG PIPELINES",
                "AGENT WORKFLOWS",
                "MODEL SERVING",
                "MCP INTEGRATIONS",
              ]}
              className="font-mono text-[13px] text-accent-ink"
            />
          </motion.div>

          <motion.div
            variants={fade}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="#work"
                className="flex items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-[15px] font-bold text-bg transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
              >
                View work
                <ArrowDown size={16} weight="bold" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="/resume.pdf"
                download="Mohamed-Shakeel-Resume.pdf"
                className="flex items-center gap-2.5 rounded-full border border-line px-7 py-3.5 text-[15px] font-medium text-ink transition-colors duration-300 hover:border-faint active:scale-[0.98]"
              >
                Download resume
                <DownloadSimple size={16} weight="bold" />
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
