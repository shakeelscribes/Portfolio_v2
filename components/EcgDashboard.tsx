/**
 * CardioGuard case visual: the risk-assessment screen as a real component
 * preview inside a browser chrome, built entirely in code. Real model
 * outputs (0.18 risk, feature contributions, ROC-AUC) instead of a fake
 * screenshot. Dark device: a screen is a dark object in any room.
 */

const BEAT =
  "0,44 22,44 28,40 34,44 42,46 46,44 50,60 54,9 60,58 66,44 82,37 90,44 112,44 " +
  "130,44 136,40 142,44 150,46 154,44 158,60 162,9 168,58 174,44 190,37 198,44 224,44 " +
  "242,44 248,40 254,44 262,46 266,44 270,60 274,9 280,58 286,44 302,37 310,44 330,44";

const FEATURES = [
  { label: "Age", value: 0.31, width: "82%" },
  { label: "Cholesterol", value: 0.24, width: "62%" },
  { label: "Resting BP", value: 0.19, width: "48%" },
  { label: "Max heart rate", value: 0.13, width: "32%" },
];

export default function EcgDashboard() {
  return (
    <div
      className="animate-float-soft relative w-[400px] -rotate-1"
      aria-hidden
      style={{ animationDelay: "-2.4s" }}
    >
      <div className="overflow-hidden rounded-2xl border border-[#26262b] bg-[#0d0d0f] shadow-[0_48px_90px_-24px_rgba(0,0,0,0.75)]">
        {/* browser chrome */}
        <div className="flex items-center gap-3 border-b border-[#1f1f23] px-4 py-2.5">
          <span className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-[#3a3a40]" />
            <span className="size-2.5 rounded-full bg-[#3a3a40]" />
            <span className="size-2.5 rounded-full bg-[#3a3a40]" />
          </span>
          <span className="flex-1 rounded-md bg-[#131316] px-3 py-1 text-center font-mono text-[9px] text-[#74747c]">
            cardioguard.app/assess
          </span>
        </div>

        <div className="px-5 pt-4 pb-5">
          {/* header row */}
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-semibold text-[#e8e8e4]">
              Risk assessment
            </p>
            <p className="font-mono text-[9px] text-[#74747c]">PT-0417</p>
          </div>

          {/* score */}
          <div className="mt-3 flex items-end gap-3">
            <p className="font-display text-[44px] leading-none font-semibold tracking-tight text-[#ccf544]">
              0.18
            </p>
            <span className="mb-1.5 rounded-full border border-[#ccf544]/40 bg-[#ccf544]/10 px-2.5 py-0.5 font-mono text-[9px] font-bold tracking-wider text-[#ccf544]">
              LOW
            </span>
            <p className="mb-1 ml-auto font-mono text-[9px] leading-snug text-[#74747c]">
              30-DAY
              <br />
              MACE RISK
            </p>
          </div>

          {/* ecg strip */}
          <div className="mt-4 overflow-hidden rounded-lg border border-[#1f1f23] bg-[#101013]">
            <svg viewBox="0 0 330 64" className="h-14 w-full">
              <polyline
                points={BEAT}
                fill="none"
                stroke="#ccf544"
                strokeOpacity="0.85"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* feature contributions */}
          <div className="mt-4 space-y-2">
            {FEATURES.map((f, i) => (
              <div key={f.label} className="flex items-center gap-2.5">
                <p className="w-24 text-[10px] text-[#a8a8b0]">{f.label}</p>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#1a1a1d]">
                  <div
                    className="h-full rounded-full bg-[#ccf544]"
                    style={{ width: f.width, opacity: 0.9 - i * 0.18 }}
                  />
                </div>
                <p className="w-8 text-right font-mono text-[9px] text-[#74747c]">
                  {f.value.toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* footer */}
          <div className="mt-4 flex items-center justify-between border-t border-[#1f1f23] pt-3">
            <p className="font-mono text-[8px] tracking-wider text-[#74747c]">
              GRADIENT BOOSTING · 11 CLINICAL FEATURES
            </p>
            <p className="font-mono text-[8px] tracking-wider text-[#ccf544]">
              ROC-AUC 0.8017
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
