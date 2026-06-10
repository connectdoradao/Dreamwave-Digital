import { createFileRoute } from "@tanstack/react-router";
import { CursorTrail } from "@/components/CursorTrail";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ApplyBar } from "@/components/ApplyBar";
import { ProgramTabs } from "@/components/ProgramTabs";
import { ArrowUpRight, Rocket, Hammer, Megaphone, Cog, Users, BookOpen, FlaskConical, Palette, Calendar, Zap } from "lucide-react";

export const Route = createFileRoute("/programs/buildspace")({
  head: () => ({
    meta: [
      { title: "Buildspace — Build with Us · Programs" },
      { name: "description", content: "A 6-week rolling cohort for builders, creators and operators who want to experiment, ship, and scale real ideas." },
      { property: "og:title", content: "Build with Us — DoraDAO" },
      { property: "og:description", content: "Not a course. Not a hangout. A pressure chamber for people who still want to build." },
    ],
  }),
  component: Page,
});

const principles = [
  { n: "01", t: "Contribution > Consumption", d: "You don't 'learn' here. You do — and learning is a side-effect." },
  { n: "02", t: "Ship in public", d: "Progress is visible. Momentum compounds socially." },
  { n: "03", t: "One track. One outcome.", d: "No dabbling. No multi-track tourists." },
  { n: "04", t: "Ecosystem as a lab", d: "DoraDAO is the testing ground." },
];

const tracks = [
  { i: Rocket, t: "Products & Experiments", d: "Apps, tools, bots, utilities, side-projects, MVPs." },
  { i: Megaphone, t: "Content, Media & Storytelling", d: "Writing, podcasts, video, short films, docs, memes." },
  { i: Zap, t: "Growth, Distribution & Marketing", d: "Campaigns, growth loops, newsletters, social experiments." },
  { i: Cog, t: "Systems, Ops & Automation", d: "No-code setups, workflows, internal tools, AI automations." },
  { i: Users, t: "Community, Events & Culture", d: "Meetups, online sessions, rituals, chapters, formats." },
  { i: BookOpen, t: "Education & Knowledge Assets", d: "Guides, playbooks, explainers, learning paths, toolkits." },
  { i: FlaskConical, t: "Research & Weird Ideas", d: "AI experiments, web3 prototypes, things that don't fit." },
  { i: Palette, t: "Creative Fields", d: "Debut album, short films, advertisements, art." },
];

const timeline = [
  { w: "Week 1", t: "Onboarding & Idea", d: "Lock in the one thing you want to ship. Scope it brutally small." },
  { w: "Week 2–3", t: "Build in public", d: "Async-first. Weekly milestones. Domain channels, peer feedback." },
  { w: "Week 4–5", t: "Ship & iterate", d: "DoraDAO becomes your amplifier, connector, and test audience." },
  { w: "Week 6", t: "Demo Day", d: "Showcase what you built. Receive critique. Find collaborators." },
];

function Page() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-sunset-wash text-foreground">
      <CursorTrail />
      <div className="relative z-10">
        <SiteNav active="programs" ctaLabel="Join the cohort" ctaHref="https://luma.com/dcxnu2mu" />
        <ProgramTabs active="buildspace" />

        <section className="relative mx-auto w-[min(94%,1180px)] mt-6 md:mt-10">
          <div className="chapter-glass overflow-hidden">
            <div className="relative aspect-[16/7] md:aspect-[16/6] overflow-hidden">
              <img src="/programs/buildspace-hero.jpg" alt="Buildspace build-in-public banner" className="absolute inset-0 h-full w-full object-cover" loading="eager" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/30 to-transparent" />
              <span className="absolute top-4 left-4 pill inline-flex items-center gap-2 px-3 py-1 text-[11px] uppercase tracking-[0.25em] bg-white/70 backdrop-blur text-foreground/80">
                <Rocket className="h-3 w-3" /> build with us · rolling cohorts
              </span>
            </div>
            <div className="p-7 md:p-12 text-center">
              <h1 className="font-display text-4xl md:text-7xl font-extrabold leading-[1.02]">
                Build<span className="text-coral">space</span>
              </h1>
              <p className="mt-3 text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-foreground/60">
                6 weeks · async-first · ship in public
              </p>
              <p className="mt-6 mx-auto max-w-2xl text-base md:text-lg text-foreground/75">
                A 6-week rolling cohort for builders, creators and operators who want to <em>experiment,
                ship, and scale real ideas</em>. Whether you're a musician with a debut album, a tech-head
                with a web2/web3/AI project, or a filmmaker with a story — if you have the drive to build
                something cool, you belong here.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3 text-sm">
                <span className="pill inline-flex items-center gap-2 px-3 py-1.5 bg-white/70"><Calendar className="h-3.5 w-3.5 text-coral" /> 6 weeks</span>
                <span className="pill inline-flex items-center gap-2 px-3 py-1.5 bg-white/70">~5 hrs / week</span>
                <span className="pill inline-flex items-center gap-2 px-3 py-1.5 bg-white/70">new cohort every 8 weeks</span>
              </div>
            </div>
          </div>
        </section>

        <section className="relative mx-auto w-[min(94%,1100px)] mt-16 md:mt-24">
          <div className="text-center">
            <span className="chapter-num">core philosophy</span>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold">
              Four rules. <span className="text-coral">Non-negotiable.</span>
            </h2>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {principles.map((p) => (
              <div key={p.n} className="chapter-glass p-6 rounded-3xl">
                <div className="text-[11px] uppercase tracking-[0.25em] text-coral font-semibold">{p.n}</div>
                <h3 className="mt-3 font-display text-lg font-bold">{p.t}</h3>
                <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative mx-auto w-[min(94%,1100px)] mt-16 md:mt-24">
          <div className="chapter-glass p-8 md:p-12">
            <div className="text-center">
              <span className="chapter-num">contribution tracks</span>
              <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold">
                Pick <span className="text-coral">one</span>. Own it.
              </h2>
              <p className="mt-3 mx-auto max-w-2xl text-foreground/70">
                If it creates value, insight, or momentum — it belongs. But you commit to <em>one</em>
                primary track. No dabbling.
              </p>
            </div>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {tracks.map((p) => {
                const Icon = p.i;
                return (
                  <div key={p.t} className="rounded-2xl border border-border bg-white/65 p-5">
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-coral text-primary-foreground shadow-glow">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="mt-3 font-display text-base font-bold">{p.t}</h3>
                    <p className="mt-1 text-sm text-foreground/70 leading-relaxed">{p.d}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative mx-auto w-[min(94%,1100px)] mt-16 md:mt-24">
          <div className="text-center">
            <span className="chapter-num">how 6 weeks work</span>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold">
              From <span className="text-coral">idea</span> to <span className="text-coral">demo day</span>
            </h2>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {timeline.map((p) => (
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

        <section className="relative mx-auto w-[min(94%,1100px)] mt-16 md:mt-24 mb-16 md:mb-24">
          <div className="chapter-glass p-8 md:p-12 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Build With Us is <span className="text-coral">not a course.</span>
            </h2>
            <p className="mt-3 mx-auto max-w-xl text-foreground/70 text-lg">
              It's not a community you hang out in. It's a <strong>pressure chamber for people who still
              want to build</strong>.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a href="https://luma.com/dcxnu2mu" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-95">
                Request to join <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href="https://luma.com/1o24ny1d" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white/60 px-5 py-2.5 text-sm font-semibold hover:bg-white/80">
                Join
              </a>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
      <ApplyBar label="Build With Us · cohort open" ctaLabel="Apply" ctaHref="https://luma.com/dcxnu2mu" />
    </div>
  );
}
