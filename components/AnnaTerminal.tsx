/**
 * Anna University case visual: the waiting-room infrastructure as a live
 * ops terminal, built entirely in code. Real numbers from the PoC (queue
 * depth, objects served, p99) instead of a fake screenshot. Dark device.
 */

const LINES: { prompt?: boolean; text: string; accent?: boolean }[] = [
  { prompt: true, text: "docker compose up -d" },
  { text: "redis    healthy    12ms", accent: true },
  { text: "nginx    edge       8.2k rps", accent: true },
  { text: "minio    1.5M objects served", accent: true },
  { prompt: true, text: "curl -s /api/queue | head" },
  { text: '{ "position": 48213, "wait": "0s", "p99": "41ms" }' },
];

export default function AnnaTerminal() {
  return (
    <div
      className="animate-float-soft relative w-[420px] rotate-1"
      aria-hidden
      style={{ animationDelay: "-4.8s" }}
    >
      <div className="overflow-hidden rounded-xl border border-[#26262b] bg-[#0c0c0e] shadow-[0_48px_90px_-24px_rgba(0,0,0,0.75)]">
        {/* terminal chrome */}
        <div className="flex items-center gap-3 border-b border-[#1f1f23] px-4 py-2.5">
          <span className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-[#3a3a40]" />
            <span className="size-2.5 rounded-full bg-[#3a3a40]" />
            <span className="size-2.5 rounded-full bg-[#3a3a40]" />
          </span>
          <span className="font-mono text-[9px] text-[#74747c]">
            results-node-01 — queue
          </span>
        </div>

        <div className="space-y-1.5 px-5 py-4 font-mono text-[11px] leading-relaxed">
          {LINES.map((line, i) => (
            <p key={i} className="flex gap-2">
              {line.prompt ? (
                <>
                  <span className="shrink-0 text-[#ccf544]">$</span>
                  <span className="text-[#e8e8e4]">{line.text}</span>
                </>
              ) : (
                <>
                  <span
                    className={`shrink-0 ${line.accent ? "text-[#ccf544]" : "text-transparent"}`}
                  >
                    ✓
                  </span>
                  <span className={line.accent ? "text-[#a8a8b0]" : "text-[#74747c]"}>
                    {line.text}
                  </span>
                </>
              )}
            </p>
          ))}
        </div>

        {/* status strip */}
        <div className="flex items-center justify-between border-t border-[#1f1f23] px-5 py-3">
          <p className="font-mono text-[8px] tracking-wider text-[#74747c]">
            QUEUE 48,213 · 5-STATE LIFECYCLE
          </p>
          <p className="font-mono text-[8px] tracking-wider text-[#ccf544]">
            1.5M SERVED · $0 MARGINAL COST
          </p>
        </div>
      </div>
    </div>
  );
}
