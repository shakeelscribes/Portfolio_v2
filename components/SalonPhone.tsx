/**
 * Salon booking case visual: a product mockup built entirely in code. A phone
 * frame containing the booking flow the client actually runs: services,
 * date chips, a slot grid, and the confirm action. Communicates the
 * product instantly without using real client screenshots.
 */
export default function AryaPhone() {
  const services = [
    { name: "Haircut and styling", price: "₹499", mins: "45 min" },
    { name: "Colour and highlight", price: "₹1,299", mins: "90 min" },
    { name: "Bridal package", price: "₹4,999", mins: "3 hrs" },
  ];
  const days = [
    { d: "Mon", n: "12" },
    { d: "Tue", n: "13" },
    { d: "Wed", n: "14" },
    { d: "Thu", n: "15" },
  ];
  const slots = ["10:00", "10:45", "11:30", "12:15", "14:00", "14:45", "15:30", "16:15"];
  const activeSlot = 4;

  return (
    <div className="animate-float-soft relative w-[270px]" aria-hidden>
      <div className="rounded-[44px] border border-[#f2f2ef]/15 bg-[#1a1a1d] p-2.5 shadow-[0_48px_90px_-24px_rgba(0,0,0,0.75)]">
        <div className="overflow-hidden rounded-[36px] bg-[#101013]">
          {/* status bar */}
          <div className="relative flex items-center justify-between px-6 pt-3 pb-1">
            <span className="font-mono text-[10px] text-[#74747c]">9:41</span>
            <span className="absolute left-1/2 top-2 h-4 w-16 -translate-x-1/2 rounded-full bg-[#0b0b0c]" />
            <span className="font-mono text-[10px] text-[#74747c]">5G</span>
          </div>

          {/* app header */}
          <div className="px-5 pt-3 pb-4">
            <p className="font-mono text-[10px] tracking-wider text-accent">
              SALON BOOKING
            </p>
            <p className="mt-1 font-display text-lg font-semibold text-[#f2f2ef]">
              Book your visit
            </p>
          </div>

          {/* services */}
          <div className="border-t border-[#26262b]">
            {services.map((s, i) => (
              <div
                key={s.name}
                className={`flex items-center justify-between px-5 py-3 ${
                  i === 0 ? "bg-[#131316]" : ""
                }`}
              >
                <div>
                  <p className="text-[12px] font-medium text-[#f2f2ef]">{s.name}</p>
                  <p className="mt-0.5 font-mono text-[9px] text-[#74747c]">{s.mins}</p>
                </div>
                <p className="font-mono text-[11px] text-[#a8a8b0]">{s.price}</p>
              </div>
            ))}
          </div>

          {/* day chips */}
          <div className="flex justify-between gap-1.5 px-5 pt-4">
            {days.map((day, i) => (
              <div
                key={day.n}
                className={`flex w-full flex-col items-center rounded-lg border py-2 ${
                  i === 2
                    ? "border-accent bg-accent/10 text-[#f2f2ef]"
                    : "border-[#26262b] text-[#74747c]"
                }`}
              >
                <span className="font-mono text-[8px]">{day.d}</span>
                <span className="mt-0.5 font-display text-[13px] font-semibold">
                  {day.n}
                </span>
              </div>
            ))}
          </div>

          {/* slot grid */}
          <div className="grid grid-cols-4 gap-1.5 px-5 pt-3">
            {slots.map((slot, i) => (
              <span
                key={slot}
                className={`rounded-lg border py-1.5 text-center font-mono text-[9px] ${
                  i === activeSlot
                    ? "border-accent bg-accent font-bold text-[#16160f]"
                    : "border-[#26262b] text-[#a8a8b0]"
                }`}
              >
                {slot}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="px-5 pt-4 pb-6">
            <div className="flex items-center justify-center rounded-full bg-accent py-2.5">
              <p className="text-[12px] font-bold text-[#16160f]">Confirm booking</p>
            </div>
            <p className="mt-3 text-center font-mono text-[8px] text-[#74747c]">
              STYLIST VIEW SYNCED IN REAL TIME
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
