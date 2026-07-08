import { createFileRoute, Link } from "@tanstack/react-router";
import { CursorTrail } from "@/components/CursorTrail";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { PartnerTabs } from "@/components/PartnerTabs";
import { ApplyBar } from "@/components/ApplyBar";
import { ArrowUpRight, Briefcase, BarChart3, Calendar, Users, Sparkles } from "lucide-react";

export const Route = createFileRoute("/partner/corporate")({
  head: () => ({
    meta: [
      { title: "Corporate Partners — DoraDAO" },
      {
        name: "description",
        content:
          "Hiring built on real relationships. Year-round engagement with 40,000+ builders in AI & Web3 — employer brand, hiring analytics and white-glove partnership management.",
      },
      { property: "og:title", content: "Corporate Partners — DoraDAO" },
      {
        property: "og:description",
        content: "Turn pipeline into hires with a community that shows up year-round.",
      },
    ],
  }),
  component: Page,
});

const benefits = [
  {
    i: Users,
    t: "Year-round community access",
    d: "Show up across campus, creator and early-career stages — not just at one hackathon weekend.",
  },
  {
    i: BarChart3,
    t: "Hiring dashboard & analytics",
    d: "Dedicated partner dashboard with filters, signal on applicants, and quarterly reporting on hires & funnel.",
  },
  {
    i: Calendar,
    t: "IRL + virtual touchpoints",
    d: "Co-host studio days, talent nights, office hours, Talent Night at GWY Conf — formats that actually convert.",
  },
  {
    i: Briefcase,
    t: "Employer brand presence",
    d: "Featured slots across our content surfaces, newsletter, Discord and Notion job board.",
  },
];

const packages = [
  {
    name: "Recruiting Partner",
    price: "Starter",
    points: [
      "Job board + Discord channel placement",
      "1 virtual hiring event per quarter",
      "Quarterly hiring funnel report",
      "Logo on partner page",
    ],
  },
  {
    name: "Talent Partner",
    price: "Most loved",
    points: [
      "Everything in Recruiting Partner",
      "2 IRL touchpoints / year (Talent Night, studio day)",
      "Branded speaker slot at GWY Conf",
      "Custom talent shortlists from our pool",
      "Dedicated partnership manager",
    ],
  },
  {
    name: "Anchor Partner",
    price: "Strategic",
    points: [
      "Everything in Talent Partner",
      "Co-branded fellowship track",
      "Title sponsor of one program",
      "Founder/VP-level community fireside",
      "Year-round in-person presence",
    ],
  },
];

function Page() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-sunset-wash text-foreground">
      <CursorTrail />
      <div className="relative z-10">
        <SiteNav active="partner" ctaLabel="Become a partner" ctaHref="/partner#become-a-partner" />
        <PartnerTabs active="corporate" />

        <section className="relative mx-auto w-[min(94%,1200px)] mt-6 md:mt-10">
          <div className="chapter-glass p-8 md:p-14 grid md:grid-cols-[1.1fr_1fr] gap-8 items-center">
            <div>
              <span className="pill inline-flex items-center gap-2 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-foreground/70">
                <Sparkles className="h-3 w-3" /> corporate partners
              </span>
              <h1 className="mt-5 font-display text-4xl md:text-6xl font-extrabold leading-[1.05]">
                Recruiting built on <span className="text-coral">real relationships</span>
              </h1>
              <p className="mt-5 text-base md:text-lg text-foreground/75">
                Most channels just give you access. DoraDAO gives you year-round engagement with
                40,000+ builders in AI & Web3 — with the employer brand, hiring signal and
                relationship-building tools to turn pipeline into hires.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/partner"
                  hash="become-a-partner"
                  className="inline-flex items-center gap-2 rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-95"
                >
                  Start a conversation <ArrowUpRight className="h-4 w-4" />
                </Link>
                <a
                  href="mailto:partnerships@doradao.community"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white/60 px-5 py-2.5 text-sm font-semibold hover:bg-white/80"
                >
                  Email the team
                </a>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-soft">
              <img src="/doradao1/session1.webp" alt="" className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </div>
        </section>

        <section className="relative mx-auto w-[min(94%,1200px)] mt-16 md:mt-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { k: "12K+", v: "partner role views in 2025" },
              { k: "3,400+", v: "qualified applications" },
              { k: "82%", v: "partner renewal rate" },
              { k: "4 wks", v: "from inquiry to launch" },
            ].map((s) => (
              <div key={s.v} className="chapter-glass p-6 text-center">
                <div className="font-display text-3xl md:text-5xl font-extrabold text-coral">{s.k}</div>
                <div className="mt-2 text-xs md:text-sm text-foreground/65">{s.v}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="relative mx-auto w-[min(94%,1200px)] mt-20 md:mt-24">
          <div className="text-center max-w-2xl mx-auto">
            <span className="chapter-num">what you get</span>
            <h2 className="mt-2 font-display text-3xl md:text-5xl font-extrabold">
              Built for hiring teams who care
            </h2>
          </div>
          <div className="mt-10 grid md:grid-cols-2 gap-5">
            {benefits.map(({ i: Icon, t, d }) => (
              <div key={t} className="chapter-glass p-7 hover:-translate-y-1 transition-transform">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-coral text-primary-foreground shadow-glow">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold">{t}</h3>
                <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative mx-auto w-[min(94%,1200px)] mt-20 md:mt-24">
          <div className="text-center">
            <span className="chapter-num">packages</span>
            <h2 className="mt-2 font-display text-3xl md:text-5xl font-extrabold">Pick how you show up</h2>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {packages.map((p, i) => (
              <div
                key={p.name}
                className={`chapter-glass p-7 flex flex-col ${i === 1 ? "ring-2 ring-coral/40" : ""}`}
              >
                <div className="text-[11px] uppercase tracking-[0.25em] text-foreground/55">{p.price}</div>
                <h3 className="mt-2 font-display text-2xl font-bold">{p.name}</h3>
                <ul className="mt-5 space-y-2.5 flex-1">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-2.5 text-sm text-foreground/80">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-coral" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/partner"
                  hash="become-a-partner"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-95"
                >
                  Talk to us <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="relative mx-auto w-[min(94%,1200px)] mt-20 md:mt-24 mb-24">
          <div className="chapter-glass p-10 md:p-14 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-extrabold">
              Ready to hire from a community that shows up?
            </h2>
            <Link
              to="/partner"
              hash="become-a-partner"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-95"
            >
              Become a corporate partner <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <SiteFooter />
      </div>
      <ApplyBar label="Corporate partner · year-round talent" ctaLabel="Talk to us" ctaHref="/partner#become-a-partner" />
    </div>
  );
}
