"use client";

import { useEffect, useState } from "react";

/**
 * Live local time in the footer: a small signal that the person behind
 * the site is real and in a specific place. Renders a placeholder until
 * mounted so server and client HTML match.
 */
export default function LocalTime({ location }: { location: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Kolkata",
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <span suppressHydrationWarning>
      {location} · {time ?? "--:--"} IST
    </span>
  );
}
