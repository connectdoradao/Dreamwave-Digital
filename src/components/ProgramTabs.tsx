import { Link } from "@tanstack/react-router";

export const programTabs = [
  { key: "gwy26", label: "GWYCONF '26", to: "/programs/gwy-26" },
  { key: "gwy25", label: "GWY Fellowship '25", to: "/programs/gwy-25" },
  { key: "w3m", label: "W3M", to: "/programs/w3m" },
  { key: "buildspace", label: "Buildspace", to: "/programs/buildspace" },
  { key: "dorahacks", label: "DoraHacks", to: "/hack-with-dora" },
] as const;

export type ProgramKey = (typeof programTabs)[number]["key"];

export function ProgramTabs({ active }: { active?: ProgramKey }) {
  return (
    <div className="relative mx-auto w-[min(94%,1100px)] mt-6 md:mt-10">
      <div className="chapter-glass inline-flex flex-wrap gap-1 p-1 rounded-full max-w-full overflow-x-auto">
        <Link
          to="/programs"
          className={
            !active
              ? "rounded-full bg-coral px-4 py-2 text-xs md:text-sm font-semibold text-primary-foreground shadow-glow whitespace-nowrap"
              : "rounded-full px-4 py-2 text-xs md:text-sm font-semibold text-foreground/70 hover:text-foreground hover:bg-white/60 transition whitespace-nowrap"
          }
        >
          All Programs
        </Link>
        {programTabs.map((t) => (
          <Link
            key={t.key}
            to={t.to}
            className={
              active === t.key
                ? "rounded-full bg-coral px-4 py-2 text-xs md:text-sm font-semibold text-primary-foreground shadow-glow whitespace-nowrap"
                : "rounded-full px-4 py-2 text-xs md:text-sm font-semibold text-foreground/70 hover:text-foreground hover:bg-white/60 transition whitespace-nowrap"
            }
          >
            {t.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
