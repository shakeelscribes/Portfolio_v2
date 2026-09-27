"use client";

import { ArrowRight } from "@phosphor-icons/react";
import Reveal from "@/components/Reveal";
import { STACK_GROUPS } from "@/lib/data";

/**
 * Capabilities index: giant rows that expand their tooling list on hover
 * (desktop) via a pure-CSS grid-rows transition. Lists stay visible and
 * scannable on mobile, and remain in the DOM for SEO at every breakpoint.
 */
export default function Capabilities() {
  return (
    <section id="stack" className="px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <h2 className="font-display text-5xl font-semibold tracking-tight text-ink md:text-7xl">
            Capabilities
          </h2>
          <p className="mt-5 max-w-[65ch] text-lg leading-relaxed text-dim">
            Hover a line to see the tooling behind it.
          </p>
        </Reveal>

        <div className="mt-16">
          {STACK_GROUPS.map((g) => (
            <Reveal key={g.title}>
              <div className="group border-t border-line last:border-b">
                <div className="flex items-center justify-between gap-6 py-7 md:py-9">
                  <h3 className="font-display text-3xl font-semibold tracking-tight text-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 md:text-5xl">
                    {g.title}
                  </h3>
                  <ArrowRight
                    size={28}
                    weight="bold"
                    className="shrink-0 -translate-x-2 text-accent-ink opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:opacity-100"
                  />
                </div>
                <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="max-w-[75ch] pb-8 leading-[1.9] text-dim">
                      {g.items.map((item, j) => (
                        <span key={item}>
                          {item}
                          {j < g.items.length - 1 && (
                            <span className="px-2.5 text-faint" aria-hidden>
                              /
                            </span>
                          )}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
