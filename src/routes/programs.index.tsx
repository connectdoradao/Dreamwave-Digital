import { createFileRoute, Link } from "@tanstack/react-router";
import { CursorTrail } from "@/components/CursorTrail";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ApplyBar } from "@/components/ApplyBar";
import { ProgramTabs } from "@/components/ProgramTabs";
import { ArrowUpRight, Sparkles, Mic, Globe, Hammer, Rocket, Code2 } from "lucide-react";

export const Route = createFileRoute("/programs/")({
  head: () => ({
    meta: [
      { title: "Programs — DoraDAO × Girls Who Yap" },
      { name: "description", content: "All DoraDAO programs: GWY conferences, W3M, Buildspace and DoraHacks." },
      { property: "og:title", content: "Programs — DoraDAO" },
      { property: "og:description", content: "Conferences, communities, and hackathons shaping the next wave of women in AI & Web3." },
    ],
  }),
  component: ProgramsPage,
});

const programs = [
  {
    key: "gwy26",
    icon: Mic,
    title: "GWY '26 Conference",
    tag: "in-person · invite-only · march 2026",
    desc: "A highly curated, women-specific gathering in New Delhi — creators, founders, and community builders shaping the creator economy.",
    to: "/programs/gwy-26",
  },
  {
    key: "gwy25",
    icon: Globe,
    title: "GWY '25 Conference",
    tag: "the origin · 2025",
    desc: "Where it all started — the first edition that turned strangers into a movement and proved the room had to exist.",
    to: "/programs/gwy-25",
  },
  {
    key: "w3m",
    icon: Sparkles,
    title: "W3M",
    tag: "Web3 for women",
    desc: "Our flagship Web3 initiative — onboarding, demystifying, and helping women ship in crypto, NFTs, and onchain communities.",
    to: "/programs/w3m",
  },
  {
    key: "buildspace",
    icon: Rocket,
    title: "Buildspace",
    tag: "build in public",
    desc: "A creator-meets-builder program — ship a project, share the journey, and graduate with a portfolio you're proud of.",
    to: "/programs/buildspace",
  },
  {
    key: "dorahacks",
    icon: Code2,
    title: "DoraHacks",
    tag: "hackathons · bounties",
    desc: "Global hackathons & bounty seasons. Build with strangers, win prizes, get funded, keep building.",
    to: "/programs/dorahacks",
  },
];

function ProgramsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-sunset-wash text-foreground">
      <CursorTrail />
      <div className="relative z-10">
        <SiteNav active="programs" ctaLabel="Join" ctaHref="https://luma.com/1o24ny1d" />
        <ProgramTabs />

        <section className="relative mx-auto w-[min(94%,1100px)] mt-6 md:mt-10">
          <div className="chapter-glass p-8 md:p-14 text-center">
            <span className="pill inline-flex items-center gap-2 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-foreground/70">
              <Hammer className="h-3 w-3" /> programs
            </span>
            <h1 className="mt-5 font-display text-4xl md:text-6xl font-extrabold leading-[1.05]">
              Five doors. <span className="text-coral">One ecosystem.</span>
            </h1>
            <p className="mt-5 mx-auto max-w-2xl text-base md:text-lg text-foreground/75">
              Conferences, hackathons, builder programs and onchain onboarding — each program is a different
              way in. Pick the one that meets you where you are.
            </p>
          </div>
        </section>

        <section className="relative mx-auto w-[min(94%,1100px)] mt-12 md:mt-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {programs.map((p) => {
              const Icon = p.icon;
              return (
                <Link
                  key={p.key}
                  to={p.to}
                  className="group chapter-glass p-6 rounded-3xl hover:-translate-y-1 transition flex flex-col"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-coral text-primary-foreground shadow-glow">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-4 text-[11px] uppercase tracking-[0.25em] text-foreground/55">{p.tag}</div>
                  <h3 className="mt-1 font-display text-xl font-bold text-foreground">{p.title}</h3>
                  <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{p.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-coral group-hover:gap-2.5 transition-all">
                    Explore <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <SiteFooter />
      </div>
      <ApplyBar label="Find your program" ctaLabel="Join the community" ctaHref="https://luma.com/1o24ny1d" />
    </div>
  );
}
