import { useEffect, useState } from "react";

const TARGET = new Date("2026-07-15T23:59:59Z").getTime();

function calc() {
  const diff = Math.max(0, TARGET - Date.now());
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s };
}

export function Countdown() {
  const [t, setT] = useState<{ d: number; h: number; m: number; s: number } | null>(null);
  useEffect(() => {
    setT(calc());
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { k: "days", v: t?.d },
    { k: "hrs", v: t?.h },
    { k: "min", v: t?.m },
    { k: "sec", v: t?.s },
  ];

  return (
    <div className="inline-flex items-center gap-2 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 px-3 py-2.5">
      <span className="text-[10px] uppercase tracking-[0.2em] text-white/90 font-semibold mr-1">
        Application close in
      </span>
      {units.map((u) => (
        <div key={u.k} className="flex flex-col items-center min-w-[42px]">
          <span className="font-display font-bold text-white text-xl md:text-2xl leading-none tabular-nums">
            {u.v === undefined ? "--" : String(u.v).padStart(2, "0")}
          </span>
          <span className="text-[9px] uppercase tracking-wider text-white/75 mt-0.5">{u.k}</span>
        </div>
      ))}
    </div>
  );
}
