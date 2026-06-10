import { createFileRoute, Link } from "@tanstack/react-router";
import { CursorTrail } from "@/components/CursorTrail";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ApplyBar } from "@/components/ApplyBar";
import { ProgramTabs } from "@/components/ProgramTabs";
import {
  ArrowUpRight,
  Calendar,
  MapPin,
  Mic,
  Sparkles,
  Trophy,
  Users,
  Globe,
} from "lucide-react";

export const Route = createFileRoute("/programs/gwy-26")({
  head: () => ({
    meta: [
      { title: "GWYCONF '26 — Girls Who Yap Conference" },
      {
        name: "description",
        content:
          "A look back at GWYCONF'26, GWY Pre-Conf and the moments that turned strangers into community.",
      },
      { property: "og:title", content: "GWYCONF '26 — DoraDAO" },
      {
        property: "og:description",
        content: "GWYCONF'26 recap, Pre-Conf highlights, community awards & numbers.",
      },
    ],
  }),
  component: Page,
});

const confStats = [
  { k: "600+", v: "posts in 48 hrs" },
  { k: "12 hrs", v: "global pre-conf" },
  { k: "10+", v: "interactive activities" },
  { k: "100s", v: "creators on-ground" },
];

const whyNow = [
  { k: "$250B+", v: "creator economy" },
  { k: "75%", v: "women feel tech-excluded" },
  { k: "90%", v: "creators lack ownership" },
  { k: "2×", v: "growth via communities" },
];

const preconfBits = [
  "Speaker sessions with founders & operators",
  "Talent Night",
  "Creator challenges",
  "Gaming rooms",
  "Community spotlights",
  "Live collaborations",
];

const awards = [
  { cat: "Fastest Growing Regional Community", winner: "GoalMate Community" },
  { cat: "Top Chapter-Led Community", winner: "GDG On Campus — Sharda University Agra" },
  { cat: "Top Student-Led Community", winner: "AI4Tomorrow" },
];

const recapImages = [
  "https://florentine-kite-61a.notion.site/image/attachment%3A21cb3675-cd3f-4cbb-9f14-853da68ffbd3%3AGWY_CONF-2.png?table=block&id=2d9d8cf9-6e75-8058-97a2-c8c36e829bcb&spaceId=ed3c5042-1ff5-40df-936f-6a222ed4453a&width=770",
  "https://florentine-kite-61a.notion.site/image/attachment%3A76fe98b3-55ae-4a51-b4f8-dfd2553b5578%3AGWY_CONF_INDIA-5.png?table=block&id=2f1d8cf9-6e75-8097-abea-fce2a3c4e837&spaceId=ed3c5042-1ff5-40df-936f-6a222ed4453a&width=910",
  "https://florentine-kite-61a.notion.site/image/attachment%3A274e9b38-ac8d-4b78-8448-77ba4482df3a%3Aconnectdoradao-20.png?table=block&id=31ad8cf9-6e75-80f2-85b7-db104c544eb1&spaceId=ed3c5042-1ff5-40df-936f-6a222ed4453a&width=1260",
  "https://florentine-kite-61a.notion.site/image/attachment%3Ab1a8aa93-bba9-49db-b819-f2edb6e8cb33%3AGWYpreconf.png?table=block&id=30bd8cf9-6e75-80cf-a3f5-d2c3437b6c07&spaceId=ed3c5042-1ff5-40df-936f-6a222ed4453a&width=760",
  "https://florentine-kite-61a.notion.site/image/attachment%3A3c0d2a7c-445b-4036-a594-18bfa354aa71%3Aconnectdoradao-16.png?table=block&id=31ad8cf9-6e75-8046-90b9-d73583c23d95&spaceId=ed3c5042-1ff5-40df-936f-6a222ed4453a&width=480",
  "https://florentine-kite-61a.notion.site/image/attachment%3Aefb7df78-544e-4499-ae90-9f7bdae2c906%3Aconnectdoradao-8.png?table=block&id=31ad8cf9-6e75-80a3-bba7-e127a5942e41&spaceId=ed3c5042-1ff5-40df-936f-6a222ed4453a&width=1200",
];

function Page() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-sunset-wash text-foreground">
      <CursorTrail />
      <div className="relative z-10">
        <SiteNav active="programs" ctaLabel="Join" ctaHref="https://luma.com/1o24ny1d" />
        <ProgramTabs active="gwy26" />

        {/* HERO */}
        <section className="relative mx-auto w-[min(94%,1100px)] mt-6 md:mt-10">
          <div className="chapter-glass p-8 md:p-14 text-center">
            <span className="pill inline-flex items-center gap-2 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-foreground/70">
              <Sparkles className="h-3 w-3" /> past initiatives
            </span>
            <h1 className="mt-5 font-display text-4xl md:text-6xl font-extrabold leading-[1.05]">
              Girls Who Yap <span className="text-coral">Conference</span>
            </h1>
            <p className="mt-5 mx-auto max-w-2xl text-base md:text-lg text-foreground/75">
              A highly curated, invite-only, one-day in-person women-specific gathering —
              dev-creators, professionals & community builders across India coming together
              for meaningful conversations and the future of the creator economy.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-foreground/70">
              <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4 text-coral" /> 28 March 2026 (IRL)</span>
              <span className="inline-flex items-center gap-1.5"><Globe className="h-4 w-4 text-coral" /> 28 Feb 2026 (Pre-Conf)</span>
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-coral" /> New Delhi, India</span>
            </div>
          </div>
        </section>

        {/* VISION */}
        <section className="relative mx-auto w-[min(94%,1100px)] mt-16 md:mt-24">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="chapter-glass p-8 md:p-10">
              <span className="chapter-num">the vision</span>
              <h2 className="mt-2 font-display text-2xl md:text-3xl font-bold">A creator-first room</h2>
              <p className="mt-4 text-foreground/75 leading-relaxed">
                AI and Web3 are shaping culture, creativity, and opportunity at lightning
                speed. Yet for many women, it still feels over-technical or like something
                that wasn't built with them in mind. GWYCONF exists to shift that.
              </p>
              <p className="mt-3 text-foreground/75 leading-relaxed">
                A space for creators, storytellers, founders, professionals, artists &
                community builders intentionally shaping a personal brand — focused on how
                emerging tech can be <em>used</em>, not just understood.
              </p>
              <p className="mt-4 font-hand text-2xl text-coral">
                Conversations turn into clarity. Creativity into confidence.
              </p>
            </div>
            <div className="chapter-glass p-8 md:p-10">
              <span className="chapter-num">why now?</span>
              <h2 className="mt-2 font-display text-2xl md:text-3xl font-bold">The gap we're filling</h2>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {whyNow.map((s) => (
                  <div key={s.v} className="rounded-2xl border border-border bg-white/55 p-4 text-center">
                    <div className="font-display text-2xl md:text-3xl font-extrabold text-coral">{s.k}</div>
                    <div className="mt-1 text-xs text-foreground/65">{s.v}</div>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-foreground/75 leading-relaxed">
                Girls Who Yap fills that gap — with community, tools & vibe.
              </p>
            </div>
          </div>
        </section>

        {/* PRECONF */}
        <section className="relative mx-auto w-[min(94%,1100px)] mt-16 md:mt-24">
          <div className="chapter-glass p-8 md:p-12">
            <div className="text-center max-w-3xl mx-auto">
              <span className="chapter-num">GWY pre-conf · virtual</span>
              <h2 className="mt-2 font-display text-3xl md:text-5xl font-extrabold">
                A <span className="text-coral">12-hour</span> global online experience
              </h2>
              <p className="mt-4 text-foreground/75">
                Designed to give people across borders, professions & genders a real glimpse
                into what the IRL conference feels like. Open to all. Free to attend.
              </p>
            </div>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {preconfBits.map((b) => (
                <div key={b} className="rounded-2xl border border-border bg-white/65 p-4 flex items-start gap-3">
                  <Mic className="h-4 w-4 text-coral mt-0.5 shrink-0" />
                  <span className="text-sm text-foreground/80">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RECAP GALLERY */}
        <section className="relative mx-auto w-[min(94%,1100px)] mt-16 md:mt-24">
          <div className="text-center">
            <span className="chapter-num">how the day unfolded</span>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold">
              Moments from the <span className="text-coral">conference</span>
            </h2>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recapImages.map((src, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-border bg-white/65 shadow-soft">
                <div className="relative aspect-[16/10] overflow-hidden bg-[oklch(0.95_0.04_60)]">
                  <img
                    src={src}
                    alt={`GWYCONF recap ${i + 1}`}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 h-full w-full object-cover hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SUCCESS STATS */}
        <section className="relative mx-auto w-[min(94%,1100px)] mt-16 md:mt-24">
          <div className="text-center">
            <span className="chapter-num">our past success</span>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold">
              Proof that when people <span className="text-coral">come together</span>, things move
            </h2>
          </div>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {confStats.map((r) => (
              <div key={r.v} className="chapter-glass p-6 text-center">
                <div className="font-display text-3xl md:text-4xl font-extrabold text-coral">{r.k}</div>
                <div className="mt-2 text-xs uppercase tracking-[0.2em] text-foreground/60">{r.v}</div>
              </div>
            ))}
          </div>
        </section>

        {/* COMMUNITY AWARDS */}
        <section className="relative mx-auto w-[min(94%,1100px)] mt-16 md:mt-24">
          <div className="chapter-glass p-8 md:p-12">
            <div className="text-center">
              <span className="chapter-num">community awards</span>
              <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold">
                Earned, not given <Trophy className="inline h-7 w-7 text-coral align-middle" />
              </h2>
              <p className="mt-3 mx-auto max-w-xl text-foreground/70">
                Recognising consistency, impact and the communities built along the way.
              </p>
            </div>
            <div className="mt-8 grid md:grid-cols-3 gap-5">
              {awards.map((a) => (
                <div key={a.cat} className="rounded-2xl border border-border bg-white/65 p-6">
                  <div className="text-xs uppercase tracking-[0.2em] text-foreground/55">{a.cat}</div>
                  <div className="mt-2 font-display text-lg font-bold text-foreground">{a.winner}</div>
                  <Users className="mt-3 h-5 w-5 text-coral" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative mx-auto w-[min(94%,1100px)] mt-16 md:mt-24 mb-16 md:mb-24">
          <div className="chapter-glass p-8 md:p-12 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Want to be in the next room?
            </h2>
            <p className="mt-3 mx-auto max-w-xl text-foreground/70">
              GWYCONF'26 is invite-only — join the community now to stay in the loop.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://lu.ma/Doradao"
                target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-95"
              >
                Catch upcoming events <ArrowUpRight className="h-4 w-4" />
              </a>
              <Link
                to="/chapters"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white/60 px-5 py-2.5 text-sm font-semibold hover:bg-white/80"
              >
                Bring it to your city
              </Link>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
      <ApplyBar label="GWYCONF'26 · invite-only" ctaLabel="Get on the list" ctaHref="https://lu.ma/Doradao" />
    </div>
  );
}