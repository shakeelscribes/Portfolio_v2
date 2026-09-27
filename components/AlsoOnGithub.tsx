"use client";

import { ArrowRight } from "@phosphor-icons/react";
import GithubMark from "@/components/GithubMark";
import { ROWS } from "@/lib/data";

/**
 * "Also on GitHub" rows with the capabilities hover language: name slides,
 * arrow slides in, row lifts, and the description + stack expand via a
 * grid-rows transition (collapsed on desktop, always open on mobile).
 * Watermarked by a faint official mark bleeding off the right edge.
 * Expects its parent wrapper to be `relative overflow-hidden`.
 */
export default function AlsoOnGithub() {
  return (
    <>
      {/* watermark mark behind the rows — circle disc, half off the edge */}
      <div
        className="pointer-events-none absolute -right-44 top-1/2 hidden -translate-y-1/2 select-none lg:block"
        aria-hidden
      >
        <GithubMark
          variant="circle"
          size={560}
          tilt={false}
          className="text-ink opacity-[0.04]"
        />
      </div>

      <div className="relative mx-auto max-w-[1400px]">
        {/* header with animated mark */}
        <div className="flex items-center gap-5">
          <GithubMark variant="circle" size={72} />
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
              Open source and builds
            </p>
            <h3 className="mt-2 font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">
              Also on GitHub
            </h3>
          </div>
        </div>
        <p className="mt-5 max-w-[60ch] leading-relaxed text-dim">
          Hover a row — it expands the same way as the Capabilities index.
        </p>

        {/* rows: capabilities-style hover expansion */}
        <div className="mt-12">
          {ROWS.map((r) => (
            <a
              key={r.name}
              href={r.href}
              target="_blank"
              rel="noreferrer"
              className="group block border-t border-line transition-colors duration-300 last:border-b hover:bg-raised/40"
            >
              <div className="grid items-center gap-3 px-2 py-7 md:grid-cols-12 md:gap-6 md:px-4 md:py-8">
                <div className="flex items-center gap-4 md:col-span-6">
                  <div>
                    <h4 className="font-display text-xl font-semibold tracking-tight text-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:text-2xl md:group-hover:translate-x-2 md:group-focus-visible:translate-x-2">
                      {r.name}
                    </h4>
                    <p className="mt-0.5 font-mono text-xs text-faint">{r.year}</p>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-3 md:col-span-6">
                  <span className="font-mono text-sm text-faint transition-colors duration-300 group-hover:text-accent-ink">
                    Repo
                  </span>
                  <ArrowRight
                    size={24}
                    weight="bold"
                    className="shrink-0 -translate-x-2 text-accent-ink opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                  />
                </div>
              </div>

              <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] md:group-focus-within:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <div className="grid gap-5 px-2 pb-8 md:grid-cols-12 md:px-4">
                    <p className="max-w-[62ch] leading-relaxed text-dim md:col-span-7">
                      {r.desc}
                    </p>
                    <div className="md:col-span-4 md:col-start-9">
                      <p className="font-mono text-xs leading-relaxed text-faint">
                        {r.stack}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <p className="mt-10 font-mono text-[13px] text-faint">
          Every row links to the real repository.
        </p>
      </div>
    </>
  );
}
