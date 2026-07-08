import { createFileRoute } from "@tanstack/react-router";
import { CursorTrail } from "@/components/CursorTrail";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ApplyBar } from "@/components/ApplyBar";
import { ProgramTabs } from "@/components/ProgramTabs";
import { ArrowUpRight, Code2, Trophy, Coins, Zap, Users, Calendar, Sparkles, Hammer } from "lucide-react";

export const Route = createFileRoute("/programs/dorahacks")({
  head: () => ({
    meta: [
      { title: "DoraHacks — Programs" },
      { name: "description", content: "Global hackathons & rolling bounty seasons. Build, win, get funded — keep building." },
      { property: "og:title", content: "DoraHacks — DoraDAO" },
      { property: "og:description", content: "Hack with strangers. Ship with friends." },
    ],
  }),
  component: Page,
});

const beats = [
  { i: Zap, t: "Weekend sprints", d: "48–72 hour hackathons across AI, Web3, creator tools, and consumer crypto." },
  { i: Coins, t: "Bounties year-round", d: "Rolling, paid quests from real partners. Earn while you learn." },
  { i: Trophy, t: "Prizes & demo day", d: "Live judging, community voting, intros to investors & operators." },
  { i: Code2, t: "Built in public", d: "Every project gets a page. Every builder gets a portfolio." },
];

const tracks = [
  { t: "AI Tools & Agents", d: "Practical agents, workflows, and creator-first AI." },
  { t: "Web3 Consumer", d: "Onchain apps, GameFi, social — built for humans, not whitepapers." },
  { t: "Creator Economy", d: "Tools that help creators earn, own, and grow." },
  { t: "Wild Card", d: "Anything weird, beautiful, or useful that doesn't fit the others." },
];

const past = [
  { name: "Svastrix", note: "3rd place · DoraDAO 1.0" },
  { name: "ExitScript", note: "2nd place · DoraDAO 1.0" },
  { name: "LegalVault", note: "Weekly winner · DoraDAO 1.0" },
];

const flow = [
  { w: "Day -7", t: "Form your squad", d: "Solo or up to 4. Match through Discord if you're flying alone." },
  { w: "Day 0", t: "Kickoff", d: "Themes drop. Sponsors talk. Build clock starts." },
  { w: "Day 1–2", t: "Build", d: "Sleep is optional. Snacks are not. Mentors on-call." },
  { w: "Day 3", t: "Demo & judge", d: "Live demos, community vote, prizes, hugs." },
];

function Page() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-sunset-wash text-foreground">
      <CursorTrail />
      <div className="relative z-10">
        <SiteNav active="programs" ctaLabel="Join the next hack" ctaHref="https://luma.com/1o24ny1d" />
        <ProgramTabs active="dorahacks" />

        <section className="relative mx-auto w-[min(94%,1180px)] mt-6 md:mt-10">
          <div className="chapter-glass overflow-hidden">
            <div className="relative aspect-[16/7] md:aspect-[16/6] overflow-hidden">
              <img src="/programs/dorahacks-hero.webp" alt="DoraHacks hackathon banner" className="absolute inset-0 h-full w-full object-cover" loading="eager" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/30 to-transparent" />
              <span className="absolute top-4 left-4 pill inline-flex items-center gap-2 px-3 py-1 text-[11px] uppercase tracking-[0.25em] bg-white/70 backdrop-blur text-foreground/80">
                <Code2 className="h-3 w-3" /> hackathons · bounty seasons
              </span>
            </div>
            <div className="p-7 md:p-12 text-center">
              <h1 className="font-display text-4xl md:text-7xl font-extrabold leading-[1.02]">
                Dora<span className="text-coral">Hacks</span>
              </h1>
              <p className="mt-3 text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-foreground/60">
                Hack with strangers. Ship with friends.
              </p>
              <p className="mt-6 mx-auto max-w-2xl text-base md:text-lg text-foreground/75">
                Global weekend hackathons and rolling bounty seasons that turn ideas into shipped products —
                and shipped products into income. Every hack is built around real prizes from real partners.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3 text-sm">
                <span className="pill inline-flex items-center gap-2 px-3 py-1.5 bg-white/70"><Calendar className="h-3.5 w-3.5 text-coral" /> 48–72 hrs</span>
                <span className="pill inline-flex items-center gap-2 px-3 py-1.5 bg-white/70"><Users className="h-3.5 w-3.5 text-coral" /> teams of 1–4</span>
                <span className="pill inline-flex items-center gap-2 px-3 py-1.5 bg-white/70"><Coins className="h-3.5 w-3.5 text-coral" /> cash · swag · grants</span>
              </div>
            </div>
          </div>
        </section>

        <section className="relative mx-auto w-[min(94%,1100px)] mt-16 md:mt-24">
          <div className="text-center">
            <span className="chapter-num">how it works</span>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold">
              Four beats. <span className="text-coral">Real outcomes.</span>
            </h2>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {beats.map((p) => {
              const Icon = p.i;
              return (
                <div key={p.t} className="chapter-glass p-6 rounded-3xl">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-coral text-primary-foreground shadow-glow">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold">{p.t}</h3>
                  <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{p.d}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="relative mx-auto w-[min(94%,1100px)] mt-16 md:mt-24">
          <div className="chapter-glass p-8 md:p-12">
            <div className="text-center">
              <span className="chapter-num">tracks</span>
              <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold">
                Pick a <span className="text-coral">lane</span>
              </h2>
            </div>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {tracks.map((t) => (
                <div key={t.t} className="rounded-2xl border border-border bg-white/65 p-5">
                  <Sparkles className="h-5 w-5 text-coral" />
                  <h3 className="mt-3 font-display text-base font-bold">{t.t}</h3>
                  <p className="mt-1 text-sm text-foreground/70 leading-relaxed">{t.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative mx-auto w-[min(94%,1100px)] mt-16 md:mt-24">
          <div className="text-center">
            <span className="chapter-num">weekend flow</span>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold">
              From kickoff to <span className="text-coral">demo</span>
            </h2>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {flow.map((p) => (
              <div key={p.w} className="chapter-glass p-6 rounded-3xl">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-coral text-primary-foreground shadow-glow">
                  <Hammer className="h-5 w-5" />
                </div>
                <div className="mt-4 text-[11px] uppercase tracking-[0.25em] text-coral font-semibold">{p.w}</div>
                <h3 className="mt-1 font-display text-lg font-bold">{p.t}</h3>
                <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative mx-auto w-[min(94%,1100px)] mt-16 md:mt-24">
          <div className="chapter-glass p-8 md:p-12">
            <div className="text-center">
              <span className="chapter-num">past winners</span>
              <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold">
                Shipped <span className="text-coral">in 72 hours</span>
              </h2>
            </div>
            <div className="mt-8 grid md:grid-cols-3 gap-5">
              {past.map((a) => (
                <div key={a.name} className="rounded-2xl border border-border bg-white/65 p-6">
                  <div className="font-display text-lg font-bold text-foreground">{a.name}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.2em] text-foreground/55">{a.note}</div>
                  <Trophy className="mt-3 h-5 w-5 text-coral" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative mx-auto w-[min(94%,1100px)] mt-16 md:mt-24 mb-16 md:mb-24">
          <div className="chapter-glass p-8 md:p-12 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              The next one starts <span className="text-coral">soon</span>
            </h2>
            <p className="mt-3 mx-auto max-w-xl text-foreground/70">
              Join — that's where every hack drops first, with sponsor briefs and matchmaking.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a href="https://luma.com/1o24ny1d" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-95">
                Join the next hack <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
      <ApplyBar label="DoraHacks · season open" ctaLabel="Join" ctaHref="https://luma.com/1o24ny1d" />
    </div>
  );
}
