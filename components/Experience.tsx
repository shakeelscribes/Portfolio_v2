import Reveal from "@/components/Reveal";

const ENTRIES = [
  {
    title: "Full Stack Developer Intern",
    org: "Phoenix Softech",
    meta: "Jul to Aug 2025, Madurai, Remote",
    body: "Shipped and deployed full-stack features through the complete development lifecycle, traced production defects to root cause, and documented API workflows for team onboarding.",
  },
  {
    title: "BE Computer Science and Engineering",
    org: "Nellai College of Engineering",
    meta: "2022 to 2026, Tirunelveli",
    body: "Graduated into the GenAI era with a bias for building: every semester ended with something deployed, not just submitted.",
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="border-t border-line px-6 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <h2 className="font-display text-5xl font-semibold tracking-tight text-ink md:text-7xl">
            Track record
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-14">
          {ENTRIES.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.08}>
              <div className="border-t border-line pt-6">
                <p className="font-mono text-[13px] text-faint">{e.meta}</p>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">
                  {e.title}
                </h3>
                <p className="mt-1.5 text-[15px] font-medium text-accent-ink">
                  {e.org}
                </p>
                <p className="mt-4 max-w-[58ch] leading-relaxed text-dim">
                  {e.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
