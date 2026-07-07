import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import {
  ArrowRight,
  Sun,
  Flower2,
  Globe,
  Users,
  UserPlus,
  Rocket,
  Sparkles,
  Wand2,
  Trophy,
  HeartHandshake,
  Building2,
  GraduationCap,
  Gavel,
  Briefcase,
  Megaphone,
  Code2,
  Palette,
  CheckCircle2,
} from "lucide-react";
import { CursorTrail } from "@/components/CursorTrail";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ApplyBar } from "@/components/ApplyBar";
import heroImg from "@/assets/hwd-hero.jpg";
import backpackImg from "@/assets/hwd-backpack.png";

// TEMP: register button points at the GWY Fellowship LUMA form until the
// dedicated Hack With Dora registration form is ready.
const REGISTER_URL = "https://luma.com/1o24ny1d";

export const Route = createFileRoute("/hack-with-dora")({
  head: () => ({
    meta: [
      { title: "Hack With Dora 2.0 — Build. Launch. Get Recognized." },
      {
        name: "description",
        content:
          "A global, remote-first hackathon by Girls Who Yap × DoraDAO. Build real products, launch publicly, and get recognized. Hacking Aug 7–10, 2026.",
      },
      { property: "og:title", content: "Hack With Dora 2.0" },
      {
        property: "og:description",
        content:
          "Build. Launch. Get Recognized. A remote-first hackathon by Girls Who Yap × DoraDAO.",
      },
    ],
  }),
  component: HackWithDora,
});

/* ---------- countdown to hacking kickoff (Aug 7, 2026) ---------- */

const HACK_START = new Date("2026-08-07T00:00:00+05:30").getTime();

function calc() {
  const diff = Math.max(0, HACK_START - Date.now());
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff / 3600000) % 24),
    m: Math.floor((diff / 60000) % 60),
    s: Math.floor((diff / 1000) % 60),
  };
}

function HackCountdown() {
  const [t, setT] = React.useState<{
    d: number;
    h: number;
    m: number;
    s: number;
  } | null>(null);
  React.useEffect(() => {
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
    <div className="inline-flex items-center gap-2 rounded-full bg-black/25 backdrop-blur border border-white/15 px-4 py-2">
      <span className="text-[10px] uppercase tracking-[0.2em] text-white/70 font-semibold mr-1">
        Hacking starts in
      </span>
      {units.map((u, i) => (
        <span key={u.k} className="flex items-center gap-1.5">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-white font-display font-bold text-foreground text-sm leading-none tabular-nums">
            {u.v === undefined ? "--" : String(u.v).padStart(2, "0")}
          </span>
          <span className="text-[9px] uppercase tracking-wider text-white/60">
            {u.k}
          </span>
          {i < 3 && <span className="text-white/25">·</span>}
        </span>
      ))}
    </div>
  );
}

function HeroPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-black/25 border border-white/15 px-4 py-2 font-semibold text-white/90 backdrop-blur">
      {children}
    </span>
  );
}

/* ---------- chapter marker (roman numeral + label) ---------- */

function ChapterMark({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-editorial font-extrabold text-4xl md:text-5xl italic text-coral leading-none">
        {num}
      </span>
      <div className="text-[11px] uppercase tracking-[0.28em] text-foreground/55 leading-relaxed font-mono">
        Chapter {num}
        <br />
        {label}
      </div>
    </div>
  );
}

/* ---------- data ---------- */

const features = [
  {
    icon: Globe,
    t: "Global & Remote First",
    d: "Join from anywhere in the world. We've already received applications from 18+ countries, and we're just getting started.",
  },
  {
    icon: Wand2,
    t: "Vibe Coding for Everyone",
    d: "Whether you're a developer, designer, marketer, content creator, product enthusiast, or someone completely new to tech, you belong here.",
  },
  {
    icon: UserPlus,
    t: "No Age Limits",
    d: "Whether you're 8 or 60, if you're excited to build, you're welcome.",
  },
  {
    icon: Rocket,
    t: "Build Real Products",
    d: "Take an idea from zero to MVP during the hackathon.",
  },
  {
    icon: Megaphone,
    t: "Launch Like a Startup",
    d: "Learn how to position, market, and launch your product on platforms like Product Hunt and Peerlist.",
  },
  {
    icon: HeartHandshake,
    t: "Mentorship That Matters",
    d: "Receive guidance from 50+ mentors across Product, Engineering, Marketing, Business, Consumer Tech, AI, Design, and Product Launch.",
  },
];

const timeline = [
  {
    n: "01",
    d: "5 Jul – 31 Jul",
    t: "Apply",
    desc: "Drop your application and tell us why you're excited to build.",
  },
  {
    n: "02",
    d: "27 – 31 Jul",
    t: "Get Shortlisted",
    desc: "We review, we shortlist, we email — get ready to gather your crew.",
  },
  {
    n: "03",
    d: "1 Aug – 6 Aug",
    t: "Find Your Team",
    desc: "Team formation, icebreakers and matching sessions for solo builders.",
  },
  {
    n: "04",
    d: "7 – 10 Aug",
    t: "Learn & Build",
    desc: "The hacking period — workshops, mentor chains and heads-down building.",
  },
  {
    n: "05",
    d: "7 – 10 Aug",
    t: "Launch Your Product",
    desc: "Ship it live — Product Hunt / Peerlist–style launches while you build.",
  },
  {
    n: "06",
    d: "7 – 10 Aug",
    t: "Get Real User Feedback",
    desc: "Put it in front of real users and iterate on what they tell you.",
  },
  {
    n: "07",
    d: "15 Aug",
    t: "Celebrate the Winners",
    desc: "Showcase, celebrate and get recognized on a global stage.",
  },
];

const eligibility = [
  {
    key: "builders",
    label: "Builders & Developers",
    icon: Code2,
    body: "Love building products, solving problems, or experimenting with new technologies? You're in.",
  },
  {
    key: "creators",
    label: "Designers, Marketers & Creators",
    icon: Palette,
    body: "Whether you design experiences, create content, tell stories, launch products, or grow communities — we need your superpowers too.",
  },
  {
    key: "everyone",
    label: "Open to Everyone",
    icon: HeartHandshake,
    body: "Hack With Dora is a gender-inclusive hackathon. Everyone is welcome to participate.",
    highlight:
      "The only requirement: every team must have at least 2 female members to encourage inclusive collaboration.",
  },
  {
    key: "solo",
    label: "Solo or Team",
    icon: Users,
    body: "Already have a team? Amazing. Flying solo? We'll help you find teammates through team formation and networking sessions.",
  },
  {
    key: "nontech",
    label: "Non-Tech Tracks",
    icon: Sparkles,
    body: "Interested in Marketing, Video Creation, Product Launch, Branding, or Community? No worries — we'll help match you with teams where your skills can create real impact.",
    tags: [
      "Marketing",
      "Video Creation",
      "Product Launch",
      "Branding",
      "Community",
    ],
  },
];

const ecosystem = [
  { icon: Briefcase, t: "Remote Internship Opportunities" },
  { icon: Rocket, t: "Product Launch Support" },
  { icon: Sparkles, t: "Programs under the GWY Ecosystem" },
  { icon: GraduationCap, t: "Research Opportunities" },
  { icon: HeartHandshake, t: "NGO Volunteering Opportunities" },
  { icon: Users, t: "Mentorship from Verified Industry Experts" },
  { icon: Globe, t: "Access to an Incredible Builder Network" },
];

const partnerGroups = [
  "Sponsors",
  "Colleges & Universities",
  "Communities",
  "NGOs & Ecosystem",
];

const recruitment = [
  {
    icon: GraduationCap,
    emoji: "🎓",
    role: "Mentors",
    d: "We're inviting mentors across four key segments: Business & Marketing · Product Managers & Product Marketers · Creators & Community · Developers. A diverse panel of 4–5 mentors guides each set of teams so participants leave with well-rounded outcomes.",
    cta: "Apply as mentor",
    href: "mailto:partnerships@doradao.community?subject=Hack%20With%20Dora%202.0%20—%20Mentor",
  },
  {
    icon: Gavel,
    emoji: "⚖️",
    role: "Judges",
    d: "We're welcoming judges from all backgrounds. A panel with diverse perspectives ensures a fair, holistic evaluation across innovation, usability, impact, and execution.",
    cta: "Apply as judge",
    href: "mailto:partnerships@doradao.community?subject=Hack%20With%20Dora%202.0%20—%20Judge",
  },
  {
    icon: HeartHandshake,
    emoji: "🤝",
    role: "Community, NGO & Media Partners",
    d: "Open to partnerships across all domains, tech and non-tech alike — mental health, psychology, social impact. Partners amplify our impact with real-world perspectives, user insights and authentic problem statements.",
    cta: "Partner with us",
    href: "mailto:partnerships@doradao.community?subject=Hack%20With%20Dora%202.0%20—%20Community%2FNGO%2FMedia%20Partner",
  },
  {
    icon: Building2,
    emoji: "🏢",
    role: "Sponsors",
    d: "If this initiative resonates with your organization or aligns with your product vision, we'd love to collaborate. Fill out the interest form and our team will reach out within a few hours.",
    cta: "Become a sponsor",
    href: "mailto:partnerships@doradao.community?subject=Hack%20With%20Dora%202.0%20—%20Sponsor",
  },
];

const faqs = [
  {
    q: "Is it free to participate? 💸",
    a: "Absolutely! It's completely free. We do, however, happily accept good vibes, enthusiasm, and cool ideas.",
  },
  {
    q: "Is the hackathon virtual? 🌍",
    a: "100%! Join from anywhere in the world — your setup, your timezone, your comfort zone.",
  },
  {
    q: "How are teams formed? 🤝",
    a: "Already have a team? Awesome. Coming solo? No worries! We'll host team formation and icebreaker sessions to help you find your perfect teammates.",
  },
  {
    q: "Can beginners participate? 🌱",
    a: "A big YES! Whether you're shipping your 10th product or writing your first line of code, everyone is welcome. Curiosity > Experience.",
  },
  {
    q: "What happens after I register? ✨",
    a: "Once registrations close, applications will be reviewed and shortlisted. From there, you'll move into team formation, learning sessions, and finally, the hackathon itself.",
  },
  {
    q: "When will the shortlisted participants be announced? 😉",
    a: "Soon enough. Register first, and we'll make sure you're the first to know when the shortlist drops!",
  },
];

/* ---------- decorative ---------- */

function SkyDecor() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute left-1/2 top-[6vh] -translate-x-1/2 h-64 w-64 rounded-full bg-[radial-gradient(circle,oklch(0.92_0.18_60/0.6),transparent_70%)] blur-2xl" />
      <div className="absolute -right-32 top-[38vh] h-96 w-96 rounded-full bg-[radial-gradient(circle,oklch(0.7_0.22_15/0.4),transparent_70%)] blur-3xl" />
      <div className="absolute -left-32 top-[72vh] h-96 w-96 rounded-full bg-[radial-gradient(circle,oklch(0.55_0.2_320/0.4),transparent_70%)] blur-3xl" />
    </div>
  );
}

/* ---------- page ---------- */

function HackWithDora() {
  const [eligTab, setEligTab] = React.useState(eligibility[0].key);
  const elig = eligibility.find((e) => e.key === eligTab)!;

  return (
    <div className="relative min-h-screen overflow-hidden bg-sunset-wash text-foreground">
      <CursorTrail />
      <SkyDecor />

      <div className="relative z-10">
        <SiteNav active="programs" ctaLabel="Register" ctaHref={REGISTER_URL} />

        {/* HERO */}
        <section className="relative mx-auto w-[min(94%,1100px)] mt-6 md:mt-10">
          <div className="relative overflow-hidden rounded-[2.5rem]">
            <img
              src={heroImg}
              alt="Sunset beach with palm silhouettes"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* dark → transparent overlay so light text stays readable up top */}
            <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.26_0.08_20/0.88)] via-[oklch(0.4_0.1_22/0.45)] to-transparent" />
            <div className="relative grid md:grid-cols-[1.35fr_1fr] gap-8 p-8 md:p-14 min-h-[540px]">
              <div className="relative z-10 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 self-start rounded-full bg-black/30 border border-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-coral" />
                  Global · Remote-first · Cohort 2.0
                </div>
                <p className="mt-6 font-hand text-3xl md:text-4xl text-[oklch(0.9_0.07_45)]">
                  hey builder <Flower2 className="inline h-7 w-7" />
                </p>
                <h1 className="mt-1 font-editorial text-5xl md:text-7xl leading-[0.95] font-bold text-white">
                  Hack With <span className="italic text-coral">Dora</span> 2.0
                </h1>
                <p className="mt-5 max-w-xl text-base md:text-lg text-white/85 leading-relaxed">
                  Build. Launch. Get Recognized. Connect with like-minded
                  builders, ship a real product, launch Product Hunt–style, and
                  get recognized on a global stage.
                </p>

                <div className="mt-6 flex flex-wrap gap-2 text-xs md:text-sm">
                  <HeroPill>🗓 Hack · 7–10 Aug</HeroPill>
                  <HeroPill>📮 Apply · 5–31 Jul</HeroPill>
                  <HeroPill>🌍 18+ countries</HeroPill>
                </div>

                <div className="mt-6">
                  <HackCountdown />
                </div>

                <a
                  href={REGISTER_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-coral px-6 py-3 text-sm font-bold text-primary-foreground shadow-glow hover:scale-[1.03] active:scale-95 transition"
                >
                  Register now <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="relative hidden md:flex items-end justify-center">
                <img
                  src={backpackImg}
                  alt="Explorer backpack with map"
                  className="h-[360px] w-auto object-contain drop-shadow-2xl animate-float-slow"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CH I — THE INVITATION */}
        <section className="relative mx-auto w-[min(94%,1100px)] mt-20 md:mt-28">
          <ChapterMark num="I" label="The Invitation" />
          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            {/* left: heading + intro + callout */}
            <div>
              <div className="chapter-num">about hack with dora 2.0</div>
              <h2 className="mt-3 font-editorial font-extrabold text-4xl md:text-6xl leading-[1.02]">
                More than <span className="italic text-coral">just</span> a
                hackathon.
              </h2>
              <p className="mt-6 text-base md:text-lg text-foreground/75 leading-relaxed max-w-xl">
                Hack With Dora isn't just about coding — it's about building
                products that solve real problems, launching them to real users,
                and learning what it takes to turn an idea into something people
                genuinely want.
              </p>

              <div className="mt-8 chapter-glass rounded-[2rem] p-6 md:p-8">
                <div className="chapter-num">support beyond the hackathon</div>
                <p className="mt-3 font-editorial font-bold text-xl md:text-2xl leading-snug">
                  Great products shouldn't stop after Demo Day. Outstanding
                  teams may continue receiving{" "}
                  <span className="italic text-coral">ecosystem support</span>{" "}
                  to transform their hackathon project into a startup or SaaS.
                </p>
              </div>
            </div>

            {/* right: 6 feature cards */}
            <div>
              <div className="chapter-num">what makes it different?</div>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                {features.map((f) => {
                  const Icon = f.icon;
                  return (
                    <div
                      key={f.t}
                      className="chapter-glass rounded-[1.75rem] p-6 hover:-translate-y-1 transition"
                    >
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-coral text-primary-foreground shadow-glow">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 font-editorial font-bold text-lg text-foreground">
                        {f.t}
                      </h3>
                      <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
                        {f.d}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* CH II — YOUR JOURNEY (serpentine timeline) */}
        <section className="relative mx-auto w-[min(94%,1100px)] mt-20 md:mt-28">
          <ChapterMark num="II" label="Your Journey" />
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <h2 className="font-editorial font-extrabold text-4xl md:text-6xl leading-[1.02]">
              From <span className="italic text-coral">apply</span> to launch
              day.
            </h2>
            <p className="text-foreground/70 max-w-sm lg:text-right">
              A single trail from the first form to the final celebration —
              every checkpoint plotted, every date public.
            </p>
          </div>

          <div className="relative mt-12">
            {/* center line (md+) */}
            <div className="pointer-events-none absolute left-1/2 top-0 bottom-0 hidden w-[2px] -translate-x-1/2 bg-coral md:block" />
            <div className="flex flex-col gap-8 md:gap-2">
              {timeline.map((step, i) => {
                const left = i % 2 === 0;
                return (
                  <div
                    key={step.n}
                    className="relative md:grid md:grid-cols-2 md:items-center md:gap-8"
                  >
                    {/* dot */}
                    <span className="absolute left-1/2 top-6 hidden h-5 w-5 -translate-x-1/2 rounded-full bg-coral shadow-glow ring-2 ring-white/80 md:block" />
                    <div
                      className={
                        left
                          ? "md:col-start-1 md:text-right md:pr-10"
                          : "md:col-start-2 md:pl-10"
                      }
                    >
                      <span className="inline-block rounded-full bg-white/70 border border-white/80 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-coral">
                        {step.n} · {step.d}
                      </span>
                      <h3 className="mt-3 font-editorial font-extrabold text-2xl md:text-3xl text-foreground">
                        {step.t}
                      </h3>
                      <p
                        className={
                          left
                            ? "mt-2 text-sm text-foreground/70 leading-relaxed md:ml-auto md:max-w-xs"
                            : "mt-2 text-sm text-foreground/70 leading-relaxed md:max-w-xs"
                        }
                      >
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CH III — ELIGIBILITY (tabs) */}
        <section className="relative mx-auto w-[min(94%,1100px)] mt-20 md:mt-28">
          <ChapterMark num="III" label="Eligibility" />
          <h2 className="mt-6 font-editorial font-extrabold text-4xl md:text-6xl leading-[1.02]">
            Who can <span className="italic text-coral">apply</span>?
          </h2>
          <div className="mt-8 chapter-glass rounded-[2rem] p-6 md:p-10">
            <div className="flex flex-wrap gap-2">
              {eligibility.map((tab) => {
                const Icon = tab.icon;
                const active = tab.key === eligTab;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setEligTab(tab.key)}
                    className={
                      active
                        ? "inline-flex items-center gap-2 rounded-full bg-coral px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition"
                        : "inline-flex items-center gap-2 rounded-full bg-white/50 border border-white/70 px-4 py-2 text-sm font-semibold text-foreground/75 hover:bg-white/80 transition"
                    }
                  >
                    <Icon className="h-4 w-4" /> {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-8">
              <h3 className="font-editorial font-bold text-2xl text-foreground">
                {elig.label}
              </h3>
              <p className="mt-3 text-base md:text-lg text-foreground/75 leading-relaxed max-w-2xl">
                {elig.body}
              </p>
              {"highlight" in elig && elig.highlight ? (
                <div className="mt-4 flex items-start gap-3 rounded-2xl bg-coral/15 border border-coral/40 px-4 py-3 max-w-2xl">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-coral shrink-0" />
                  <span className="text-sm font-semibold text-foreground">
                    {elig.highlight}
                  </span>
                </div>
              ) : null}
              {"tags" in elig && elig.tags ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {elig.tags.map((tag) => (
                    <span
                      key={tag}
                      className="pill px-3 py-1.5 text-xs font-semibold text-foreground/75"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <p className="mt-6 text-center font-hand text-2xl md:text-3xl text-coral">
            If you love building cool stuff, solving real problems, shipping
            products, designing experiences, growing ideas, or simply learning
            by doing — you belong here. 🚀
          </p>
        </section>

        {/* CH IV — BIG REVEALS (coming soon) */}
        <section className="relative mx-auto w-[min(94%,1100px)] mt-20 md:mt-28">
          <div className="chapter-glass relative overflow-hidden rounded-[2rem] px-8 md:px-14 py-16 text-center">
            <Trophy className="mx-auto h-10 w-10 text-coral" />
            <div className="mt-4 chapter-num">chapter iv · coming soon</div>
            <h2 className="mt-3 font-editorial font-extrabold text-4xl md:text-5xl">
              Big reveals <span className="italic text-coral">coming soon</span>
              .
            </h2>
            <p className="mt-4 mx-auto max-w-md text-foreground/70">
              We're cooking up something exciting. Stay tuned as we unveil:
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {["Prize Pool", "Ecosystem Benefits", "Additional Perks"].map(
                (x) => (
                  <span
                    key={x}
                    className="pill px-4 py-2 text-sm font-semibold text-foreground/80"
                  >
                    {x}
                  </span>
                ),
              )}
            </div>
            <p className="mt-6 text-foreground/60">
              Trust us — you'll want to stick around. 😉
            </p>
          </div>
        </section>

        {/* CH V — ECOSYSTEM */}
        <section className="relative mx-auto w-[min(94%,1100px)] mt-20 md:mt-28">
          <ChapterMark num="V" label="Ecosystem Support Pipeline" />
          <h2 className="mt-6 font-editorial font-extrabold text-4xl md:text-6xl leading-[1.02]">
            It doesn't end at{" "}
            <span className="italic text-coral">demo day</span>.
          </h2>
          <p className="mt-4 max-w-2xl text-foreground/70">
            Your journey doesn't end when the hackathon does. Selected
            participants unlock access to exciting opportunities, including:
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ecosystem.map((e) => {
              const Icon = e.icon;
              return (
                <div
                  key={e.t}
                  className="chapter-glass rounded-3xl p-6 flex items-center gap-4"
                >
                  <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-coral text-primary-foreground shadow-glow">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-editorial font-bold text-base text-foreground leading-snug">
                    {e.t}
                  </h3>
                </div>
              );
            })}
          </div>
        </section>

        {/* CH VI — PARTNERS */}
        <section className="relative mx-auto w-[min(94%,1100px)] mt-20 md:mt-28">
          <ChapterMark num="VI" label="Partners" />
          <h2 className="mt-6 font-editorial font-extrabold text-4xl md:text-6xl leading-[1.02]">
            Backed by an amazing{" "}
            <span className="italic text-coral">community</span>.
          </h2>
          <p className="mt-4 max-w-2xl text-foreground/70">
            Hack With Dora is being built alongside an ecosystem of sponsors,
            colleges, communities, NGOs and partners — announced as the rain
            clears.
          </p>
          <div className="mt-8 space-y-6">
            {partnerGroups.map((g) => (
              <div key={g} className="chapter-glass rounded-[2rem] p-6">
                <div className="flex items-center justify-between">
                  <h3 className="chapter-num text-coral">{g}</h3>
                  <span className="chapter-num text-coral/80">
                    Revealing soon
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-3 md:grid-cols-6 gap-3">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="aspect-[4/3] rounded-2xl border border-dashed border-foreground/20 bg-white/40 flex items-center justify-center text-[11px] uppercase tracking-widest text-foreground/50"
                    >
                      Coming soon
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CH VII — RECRUITMENT */}
        <section className="relative mx-auto w-[min(94%,1100px)] mt-20 md:mt-28">
          <ChapterMark num="VII" label="Join The Journey" />
          <h2 className="mt-6 font-editorial font-extrabold text-4xl md:text-6xl leading-[1.02]">
            Want to be part of the{" "}
            <span className="italic text-coral">journey</span>?
          </h2>
          <p className="mt-4 max-w-2xl text-foreground/70">
            Applications opening soon for mentors, judges, partners and
            sponsors.
          </p>

          {/* mentors/judges banner */}
          <div className="mt-8 chapter-glass rounded-[2rem] p-8 md:p-10 relative overflow-hidden">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,oklch(0.8_0.2_40/0.35),transparent_70%)] blur-2xl" />
            <span className="font-hand text-2xl md:text-3xl text-coral">
              calling all builders, launchers & growth experts ✿
            </span>
            <h3 className="mt-2 font-editorial font-extrabold text-2xl md:text-3xl">
              Think you've got what it takes to guide the next big idea?
            </h3>
            <p className="mt-3 text-foreground/70">
              We're inviting mentors and judges from:
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "Tech & AI",
                "Marketing & Growth",
                "Product Strategy & Launch",
              ].map((x) => (
                <span
                  key={x}
                  className="pill px-4 py-2 text-sm font-semibold text-foreground/80"
                >
                  {x}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {recruitment.map((r) => (
              <div
                key={r.role}
                className="chapter-glass rounded-3xl p-6 flex flex-col"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl leading-none">{r.emoji}</span>
                  <h3 className="font-editorial font-bold text-lg text-foreground">
                    {r.role}
                  </h3>
                </div>
                <p className="mt-3 flex-1 text-sm text-foreground/70 leading-relaxed">
                  {r.d}
                </p>
                <a
                  href={r.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-coral hover:gap-2.5 transition-all"
                >
                  {r.cta} <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* CH VIII — FAQ */}
        <section className="relative mx-auto w-[min(94%,1100px)] mt-20 md:mt-28">
          <ChapterMark num="VIII" label="The Small Print" />
          <h2 className="mt-6 font-editorial font-extrabold text-4xl md:text-6xl leading-[1.02]">
            Got questions? We've got{" "}
            <span className="italic text-coral">answers</span>.
          </h2>
          <div className="mt-8 divide-y divide-foreground/10 rounded-3xl bg-white/55 border border-white/70 px-6 md:px-8">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
                  <span className="font-editorial font-semibold text-base md:text-lg text-foreground">
                    {f.q}
                  </span>
                  <span className="h-7 w-7 shrink-0 rounded-full bg-coral text-primary-foreground grid place-items-center text-lg leading-none transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-foreground/75 leading-relaxed">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative mx-auto w-[min(94%,1100px)] mt-20 md:mt-28">
          <div className="chapter-glass relative overflow-hidden rounded-[2rem] px-8 md:px-16 py-14 md:py-20 text-center">
            <Sun
              className="absolute left-8 bottom-8 h-10 w-10 text-coral animate-spin-slow"
              strokeWidth={1.5}
            />
            <span className="font-hand text-3xl md:text-4xl text-coral">
              ready? ✿
            </span>
            <h2 className="mt-2 font-editorial font-bold text-4xl md:text-6xl leading-[1.05]">
              Ready to build something{" "}
              <span className="bg-coral text-primary-foreground rounded-2xl px-3 inline-block -rotate-1 shadow-glow">
                awesome
              </span>
              ?
            </h2>
            <p className="mt-4 max-w-lg mx-auto text-foreground/75">
              The next big product could be yours. 🚀 Register now and become
              part of a global community of builders, creators, designers,
              marketers and innovators.
            </p>
            <div className="mt-6 flex justify-center">
              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-coral px-7 py-3.5 text-sm md:text-base font-bold text-primary-foreground shadow-glow hover:scale-[1.03] active:scale-95 transition"
              >
                Register now <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>

      <ApplyBar
        label="Hack With Dora 2.0 · applications open"
        ctaLabel="Register"
        ctaHref={REGISTER_URL}
      />
    </div>
  );
}
