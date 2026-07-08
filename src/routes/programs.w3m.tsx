import { createFileRoute } from "@tanstack/react-router";
import { CursorTrail } from "@/components/CursorTrail";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ApplyBar } from "@/components/ApplyBar";
import { ProgramTabs } from "@/components/ProgramTabs";
import { ArrowUpRight, Sparkles, Code2, Briefcase, Users, Clock, Gift, MapPin } from "lucide-react";

export const Route = createFileRoute("/programs/w3m")({
  head: () => ({
    meta: [
      { title: "W3M — Programs" },
      { name: "description", content: "W3M is a hands-on meetup series equipping students & enthusiasts with vibe-coding, AI tools and the path from idea to MVP." },
      { property: "og:title", content: "W3M Meetup Series" },
      { property: "og:description", content: "Skill, market, career, community — in 3 hours." },
    ],
  }),
  component: Page,
});

const agenda = [
  { i: Code2, t: "Skill empowerment", d: "Rapid prototyping & real-world solution-building. Vibe-coding with Gemini, Copilot, ChatGPT, DeepSeek." },
  { i: Briefcase, t: "Market awareness", d: "How students can actually thrive in today's evolving tech landscape." },
  { i: Sparkles, t: "Career prep", d: "Portfolios that get noticed. Soft skills that land the role." },
  { i: Users, t: "Community building", d: "Plug into a thriving local tech room — pros included." },
];

const structure = [
  { k: "3 hrs", v: "meetup duration" },
  { k: "3+ yrs", v: "speaker experience floor" },
  { k: "open", v: "networking finale" },
  { k: "swag", v: "for challenge winners" },
];

const stats = [
  { k: "1000+", v: "registrations" },
  { k: "10+", v: "institution & community partners" },
  { k: "200+", v: "pieces of UGC created" },
  { k: "80%", v: "satisfaction rate" },
];

const editions = [
  { city: "St. John's College, Agra", href: "https://luma.com/5x3xjjvm" },
  { city: "Eshan Group of Institutions", href: "https://luma.com/a4hnqnja" },
  { city: "GLA University", href: "https://luma.com/rwf4pywh" },
  { city: "W3M Global", href: "https://luma.com/1xj2rvbn" },
];

function Page() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-sunset-wash text-foreground">
      <CursorTrail />
      <div className="relative z-10">
        <SiteNav active="programs" ctaLabel="RSVP next meetup" ctaHref="https://lu.ma/Doradao" />
        <ProgramTabs active="w3m" />

        <section className="relative mx-auto w-[min(94%,1180px)] mt-6 md:mt-10">
          <div className="chapter-glass overflow-hidden">
            <div className="relative aspect-[16/7] md:aspect-[16/6] overflow-hidden">
              <img src="/programs/w3m-hero.webp" alt="W3M meetup community banner" className="absolute inset-0 h-full w-full object-cover" loading="eager" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/30 to-transparent" />
              <span className="absolute top-4 left-4 pill inline-flex items-center gap-2 px-3 py-1 text-[11px] uppercase tracking-[0.25em] bg-white/70 backdrop-blur text-foreground/80">
                <Sparkles className="h-3 w-3" /> meetup series · campus-first
              </span>
            </div>
            <div className="p-7 md:p-12 text-center">
              <h1 className="font-display text-4xl md:text-7xl font-extrabold leading-[1.02]">
                W<span className="text-coral">3</span>M
              </h1>
              <p className="mt-3 text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-foreground/60">
                You made it in — now let's make it count
              </p>
              <p className="mt-6 mx-auto max-w-2xl text-base md:text-lg text-foreground/75">
                The W3M meetup series equips students and enthusiasts with the latest skills, tools and
                industry insight to actually build. Hands-on, vibe-coded, AI-native — from idea to MVP in
                a single afternoon.
              </p>
            </div>
          </div>
        </section>

        <section className="relative mx-auto w-[min(94%,1100px)] mt-16 md:mt-24">
          <div className="text-center">
            <span className="chapter-num">agenda</span>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold">
              Four pillars, <span className="text-coral">one afternoon</span>
            </h2>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {agenda.map((p) => {
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
              <span className="chapter-num">meetup structure</span>
              <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold">
                Tight, useful, <span className="text-coral">never dull</span>
              </h2>
            </div>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {structure.map((r) => (
                <div key={r.v} className="rounded-2xl border border-border bg-white/65 p-5 text-center">
                  <div className="font-display text-2xl md:text-3xl font-extrabold text-coral">{r.k}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.2em] text-foreground/60">{r.v}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-border bg-white/65 p-5 flex items-start gap-3">
              <Gift className="h-5 w-5 text-coral shrink-0 mt-0.5" />
              <p className="text-sm text-foreground/75">
                <span className="font-semibold">#SeeYouAtW3M challenge:</span> share your RSVP, tag us, and
                branded swag — tees, bottles, stickers, diaries — heads your way. The louder the buzz, the
                better the shot.
              </p>
            </div>
          </div>
        </section>

        <section className="relative mx-auto w-[min(94%,1100px)] mt-16 md:mt-24">
          <div className="text-center">
            <span className="chapter-num">success story</span>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold">
              The series so far <span className="text-coral">🎟️</span>
            </h2>
          </div>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((r) => (
              <div key={r.v} className="chapter-glass p-6 text-center">
                <div className="font-display text-3xl md:text-4xl font-extrabold text-coral">{r.k}</div>
                <div className="mt-2 text-xs uppercase tracking-[0.2em] text-foreground/60">{r.v}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="relative mx-auto w-[min(94%,1100px)] mt-16 md:mt-24">
          <div className="chapter-glass p-8 md:p-12">
            <div className="text-center">
              <span className="chapter-num">kickoff editions</span>
              <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold">
                Where it's <span className="text-coral">happening</span>
              </h2>
            </div>
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {editions.map((e) => (
                <a key={e.city} href={e.href} target="_blank" rel="noreferrer"
                  className="group rounded-2xl border border-border bg-white/65 p-5 flex items-center justify-between hover:bg-white/85 transition">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-coral" />
                    <div className="font-display text-base font-bold">{e.city}</div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-foreground/50 group-hover:text-coral transition" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="relative mx-auto w-[min(94%,1100px)] mt-16 md:mt-24 mb-16 md:mb-24">
          <div className="chapter-glass p-8 md:p-12 text-center">
            <Clock className="mx-auto h-8 w-8 text-coral" />
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold">
              Where all roads lead to <span className="text-coral">the big event</span>
            </h2>
            <p className="mt-3 mx-auto max-w-xl text-foreground/70">
              Every W3M city builds toward GWYCONF. Show up at one — find your people, ship your first thing.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a href="https://lu.ma/Doradao" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-95">
                RSVP next meetup <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href="https://luma.com/1o24ny1d" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white/60 px-5 py-2.5 text-sm font-semibold hover:bg-white/80">
                Join Luma
              </a>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
      <ApplyBar label="W3M · next meetup open" ctaLabel="RSVP" ctaHref="https://lu.ma/Doradao" />
    </div>
  );
}
