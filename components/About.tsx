import Reveal from "@/components/Reveal";
import { CERTS } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="border-t border-line px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <h2 className="font-display text-5xl font-semibold tracking-tight text-ink md:text-6xl">
            The parts most people skip
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="flex max-w-[62ch] flex-col gap-6 text-lg leading-relaxed text-dim">
            <p>
              I am Mohamed Shakeel, a Computer Science engineer from
              Tirunelveli, India. I work across the whole AI product surface:
              data and model work in Python, LLM orchestration with LangChain
              and LangGraph, the FastAPI services behind them, and the React
              or Flutter interfaces on top.
            </p>
            <p>
              The time-zone math, the race-safe slot engines, the
              deduplication hashes, the waiting room that holds under load.
              That is usually where AI products go to die, and it is where I
              am most at home.
            </p>
          </div>

          <div className="mt-12">
            <h3 className="text-base font-bold text-ink">Certifications</h3>
            <ul className="mt-5 flex flex-col">
              {CERTS.map((c) => (
                <li
                  key={c.name}
                  className="flex items-baseline justify-between gap-6 border-t border-line py-4 last:border-b"
                >
                  <p className="text-[15px] text-ink">
                    {c.name}
                    <span className="text-faint">,{c.issuer}</span>
                  </p>
                  <p className="shrink-0 font-mono text-xs text-faint">{c.year}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
