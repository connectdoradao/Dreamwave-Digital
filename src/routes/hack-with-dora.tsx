import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Compass,
  Trophy,
  Users,
  Lightbulb,
  Rocket,
  Sparkles,
  Target,
  Heart,
  Scale,
  Zap,
  Eye,
} from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ApplyBar } from "@/components/ApplyBar";
import heroImg from "@/assets/hwd-hero.webp";
import backpackImg from "@/assets/hwd-backpack.webp";

const APPLY_URL = "https://dora-hack.devfolio.co";

export const Route = createFileRoute("/hack-with-dora")({
  head: () => ({
    meta: [
      { title: "Hack With Dora 2.0 — Build. Launch. Get Recognized." },
      {
        name: "description",
        content:
          "Global, remote-first hackathon by DoraDAO. Apply 5–31 Jul, hack 7–10 Aug. Ship real consumer products, launch Product Hunt–style, get recognized on a global stage.",
      },
      { property: "og:title", content: "Hack With Dora 2.0" },
      {
        property: "og:description",
        content:
          "Global · Remote-first · Cohort 2.0. Build, launch and get recognized alongside 18+ countries of builders.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:image",
        content:
          "https://hack-with-dora-quest.lovable.app/assets/hero-sunset-DkM_CkKY.jpg",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

/* ---------------- Scroll utilities ---------------- */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setSeen(true), io.disconnect()),
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, seen };
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(window.scrollY));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => {
      window.removeEventListener("scroll", on);
      cancelAnimationFrame(raf);
    };
  }, []);
  return y;
}

function Page() {
  return (
    <>
      <div
        className="hwd-theme relative min-h-screen font-sans antialiased overflow-x-hidden"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.20 0.06 20) 0%, oklch(0.26 0.08 18) 12%, oklch(0.32 0.10 20) 28%, oklch(0.40 0.13 22) 46%, oklch(0.46 0.14 24) 66%, oklch(0.5 0.15 26) 84%, oklch(0.54 0.15 28) 100%)",
          color: "oklch(0.98 0.015 70)",
        }}
      >
        {/* subtle drifting star/embers layer for cinematic depth */}
        <StarLayer />
        <div className="relative z-10">
          <SiteNav active="programs" ctaLabel="Register" ctaHref={APPLY_URL} />
          <Hero />
          <Marquee />
          <Narrator quote="The story begins where the map ends. Grab a chair." />
          <ChapterOne />
          <ChapterTwo />
          <Narrator quote="No traveller enters the forest alone. The next chapter is where you find your crew." />
          <ChapterThree />
          <ChapterFour />
          <Narrator quote="Every great product answers a question the world was already whispering." />
          <ChapterFive />
          <ChapterSix />
          <ChapterSeven />
          <JudgingCriteria />
          <FAQ />
          <FinalCTA />
        </div>
      </div>
      {/* footer + apply bar outside the dark theme → normal light theme */}
      <SiteFooter />
      <ApplyBar
        label="Applications open · Hack With Dora 2.0"
        ctaLabel="Register now"
        ctaHref={APPLY_URL}
      />
    </>
  );
}

/* ---------------- Star / ember layer (cinematic) ---------------- */
function StarLayer() {
  const y = useScrollY();
  const stars = Array.from({ length: 50 });
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {stars.map((_, i) => {
        const left = (i * 97) % 100;
        const top = (i * 53) % 100;
        const size = 1 + (i % 3);
        const speed = 0.05 + (i % 5) * 0.04;
        return (
          <span
            key={i}
            className="absolute rounded-full bg-white/70 animate-twinkle"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              transform: `translateY(${-y * speed}px)`,
              animationDelay: `${(i % 7) * 0.4}s`,
              opacity: 0.4 + (i % 5) * 0.1,
            }}
          />
        );
      })}
    </div>
  );
}

/* ---------------- Hero (parallax) ---------------- */
function Hero() {
  const y = useScrollY();
  return (
    <section className="relative mx-auto w-[min(94%,1100px)] mt-6 md:mt-10">
      <div className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] chapter-glass">
        <img
          src={heroImg}
          alt="Sunset beach with palm silhouettes"
          className="absolute inset-0 h-[130%] w-full object-cover opacity-80"
          style={{ transform: `translateY(${y * 0.25}px) scale(1.05)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50" />
        <div className="relative grid md:grid-cols-[1.35fr_1fr] gap-6 md:gap-8 p-6 sm:p-8 md:p-14 min-h-[520px] md:min-h-[560px]">
          <div className="relative z-10 flex flex-col justify-center min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 text-[11px] sm:text-xs font-semibold text-[oklch(0.25_0.08_20)] self-start">
              <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.65_0.24_30)]" />
              Global · Remote-first · Cohort 2.0
            </div>
            <p className="mt-5 font-hand text-3xl md:text-4xl text-[oklch(0.92_0.15_50)]">
              hey builder ✿
            </p>
            <h1 className="mt-1 font-display text-4xl sm:text-5xl md:text-7xl leading-[0.95] font-bold text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)]">
              Hack With{" "}
              <span className="italic text-[oklch(0.86_0.18_50)]">Dora</span>{" "}
              2.0
            </h1>
            <p className="mt-5 max-w-xl text-sm sm:text-base md:text-lg text-white/90 leading-relaxed">
              Build. Launch. Get Recognized. Ship a real consumer product in 4
              days, launch Product Hunt–style, and be seen by a global stage of
              builders.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-[11px] sm:text-xs md:text-sm">
              <Pill>🗓 Hack · 7–10 Aug</Pill>
              <Pill>📮 Apply · 5–31 Jul</Pill>
              <Pill>🌏 18+ countries</Pill>
            </div>
            <Countdown />
            <a
              href={APPLY_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[oklch(0.72_0.22_35)] px-6 py-3 text-sm font-bold text-white shadow-glow hover:scale-[1.03] active:scale-95 transition"
            >
              Register now <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <div className="relative hidden md:flex items-end justify-center">
            <img
              src={backpackImg}
              alt="Explorer backpack with map"
              className="h-[380px] w-auto object-contain drop-shadow-2xl animate-float-slow"
              style={{ transform: `translateY(${-y * 0.15}px)` }}
            />
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/60">
        <span className="h-px w-8 bg-white/40" /> scroll into the story{" "}
        <span className="h-px w-8 bg-white/40" />
      </div>
    </section>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-white/85 border border-white/50 px-3 py-1.5 font-semibold text-[oklch(0.25_0.08_20)] backdrop-blur">
      {children}
    </span>
  );
}

function Countdown() {
  const target = new Date("2026-08-07T00:00:00Z").getTime();
  const [t, setT] = useState(() => diff(target));
  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);
  return (
    <div className="mt-6 inline-flex flex-wrap items-center gap-2 rounded-2xl md:rounded-full bg-white/85 backdrop-blur border border-white/70 px-4 py-2 self-start">
      <span className="chapter-num !text-black">hacking starts in</span>
      {(["days", "hrs", "min", "sec"] as const).map((k, i) => (
        <span key={k} className="flex items-center gap-1">
          <span className="inline-flex min-w-[38px] justify-center rounded-full bg-[oklch(0.25_0.08_20)] px-2 py-1 text-sm font-bold text-white shadow-sm">
            {String((t as Record<string, number>)[k]).padStart(2, "0")}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-black/70">
            {k}
          </span>
          {i < 3 && <span className="text-black/40">·</span>}
        </span>
      ))}
    </div>
  );
}
function diff(target: number) {
  const s = Math.max(0, Math.floor((target - Date.now()) / 1000));
  return {
    days: Math.floor(s / 86400),
    hrs: Math.floor((s % 86400) / 3600),
    min: Math.floor((s % 3600) / 60),
    sec: s % 60,
  };
}

/* ---------------- Marquee ---------------- */
function Marquee() {
  const items = [
    "Real products",
    "18+ countries",
    "50+ mentors",
    "Product Hunt launches",
    "Ecosystem support",
    "Global · Remote-first",
    "For builders & non-tech",
    "No age limits",
  ];
  const row = [...items, ...items];
  return (
    <section className="mt-8 border-y border-white/15 bg-white/10 backdrop-blur overflow-hidden">
      <div className="flex gap-10 py-4 animate-marquee whitespace-nowrap">
        {row.map((t, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-4 chapter-num text-white/85"
          >
            {t} <span className="text-[oklch(0.86_0.18_50)]">✿</span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Narrator sticky line ---------------- */
function Narrator({ quote }: { quote: string }) {
  const { ref, seen } = useReveal<HTMLDivElement>();
  return (
    <section ref={ref} className="mx-auto w-[min(94%,900px)] mt-24 md:mt-32">
      <div
        className={`text-center transition-all duration-1000 ${seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <p className="font-hand text-2xl sm:text-3xl md:text-4xl leading-snug text-white/90 italic">
          "{quote}"
        </p>
        <p className="mt-3 chapter-num text-white/50">— the narrator</p>
      </div>
    </section>
  );
}

/* ---------------- Chapter shell ---------------- */
function Chapter({
  num,
  kicker,
  title,
  subtitle,
  children,
}: {
  num: string;
  kicker: string;
  title: React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
}) {
  const { ref, seen } = useReveal<HTMLDivElement>();
  return (
    <section
      ref={ref}
      className={`mx-auto w-[min(94%,1100px)] mt-20 md:mt-28 transition-all duration-700 ${seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-3 sm:gap-4">
        <span className="font-display text-5xl sm:text-6xl md:text-7xl italic text-[oklch(0.86_0.18_50)] opacity-50 shrink-0">
          {num}
        </span>
        <div className="min-w-0">
          <div className="chapter-num text-white/60">Chapter {num}</div>
          <div className="font-hand text-xl sm:text-2xl text-white/75 truncate">
            {kicker}
          </div>
        </div>
      </div>
      <h2 className="mt-4 font-display text-2xl sm:text-3xl md:text-5xl font-bold leading-tight max-w-3xl text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-white/80 text-sm sm:text-base leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="horizon-line mt-6" />
      <div className="mt-8">{children}</div>
    </section>
  );
}

/* ---------------- Chapter I: What is it (simple language) ---------------- */
function ChapterOne() {
  const items = [
    {
      icon: Lightbulb,
      t: "You have an idea",
      d: "Anything consumer-focused — an app, a tool, a website. Big or tiny. Doesn't matter.",
    },
    {
      icon: Users,
      t: "You find a team",
      d: "Solo? We match you with 2–3 others. Coder, designer, marketer, storyteller.",
    },
    {
      icon: Rocket,
      t: "You build & launch",
      d: "4 days. AI tools + no-code allowed. Ship it publicly on Product Hunt / Peerlist.",
    },
    {
      icon: Trophy,
      t: "You get recognized",
      d: "Judges, users, and the ecosystem see your work. Winners join the pipeline.",
    },
  ];
  return (
    <Chapter
      num="I"
      kicker="the simple version"
      title={
        <>
          So what <span className="italic text-[oklch(0.86_0.18_50)]">is</span>{" "}
          this, really?
        </>
      }
      subtitle="Hack With Dora 2.0 is a 4-day global hackathon where people from anywhere build a real consumer product and launch it to the world. No jargon, no gatekeeping — bring curiosity, we'll bring the rest."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((it) => (
          <div key={it.t} className="chapter-glass p-5 sm:p-6">
            <it.icon className="h-6 w-6 text-[oklch(0.86_0.18_50)]" />
            <h3 className="mt-3 font-display text-lg sm:text-xl font-bold text-white">
              {it.t}
            </h3>
            <p className="mt-2 text-sm text-white/75 leading-relaxed">{it.d}</p>
          </div>
        ))}
      </div>
      <div className="chapter-glass mt-6 p-5 sm:p-6 flex flex-wrap items-center gap-3 sm:gap-6">
        <span className="chapter-num text-[oklch(0.86_0.18_50)]">
          In one line
        </span>
        <p className="min-w-0 flex-1 font-hand text-xl sm:text-2xl md:text-3xl text-white leading-snug">
          Build something people would actually use — and launch it before the
          weekend ends.
        </p>
      </div>
    </Chapter>
  );
}

/* ---------------- Chapter II: Eligibility ---------------- */
function ChapterTwo() {
  const who = [
    {
      n: "01",
      t: "Builders & developers",
      d: "Love building products, solving problems, or experimenting with new tech? You're in.",
    },
    {
      n: "02",
      t: "Designers, marketers & creators",
      d: "Design experiences, create content, tell stories, launch products, grow communities — bring your superpower.",
    },
    {
      n: "03",
      t: "Open to everyone",
      d: "Gender-inclusive hackathon. Every team must have at least 2 female members to encourage inclusive collaboration.",
    },
    {
      n: "04",
      t: "Solo or team",
      d: "Already have a team? Amazing. Flying solo? We'll help you find teammates through matching sessions.",
    },
    {
      n: "05",
      t: "Non-tech tracks",
      d: "Marketing, video creation, product launch, branding, community — we'll match you with teams that need you.",
    },
    {
      n: "06",
      t: "Students & pros",
      d: "From first-year students to industry veterans — curiosity beats CV every time.",
    },
  ];
  return (
    <Chapter
      num="II"
      kicker="who can apply"
      title={
        <>
          If you love making stuff —{" "}
          <span className="italic text-[oklch(0.86_0.18_50)]">
            you belong here
          </span>
          .
        </>
      }
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {who.map((w) => (
          <div key={w.n} className="chapter-glass p-5 sm:p-6">
            <div className="chapter-num text-[oklch(0.86_0.18_50)]">{w.n}</div>
            <h3 className="mt-2 font-display text-lg sm:text-xl font-bold text-white">
              {w.t}
            </h3>
            <p className="mt-2 text-sm text-white/75 leading-relaxed">{w.d}</p>
          </div>
        ))}
      </div>
    </Chapter>
  );
}

/* ---------------- Chapter III: Prize money (blurred numbers) ---------------- */
function ChapterThree() {
  const tiers = [
    {
      tag: "Grand prize",
      label: "1st place",
      amount: "₹XX,XXX",
      sub: "Cash + ecosystem perks + launch runway",
    },
    {
      tag: "Runner-up",
      label: "2nd & 3rd",
      amount: "₹XX,XXX",
      sub: "Cash + mentor time + partner credits",
    },
    {
      tag: "Track winners",
      label: "Category best",
      amount: "₹XX,XXX",
      sub: "Per track: Consumer AI · Creator tools · Wellness",
    },
    {
      tag: "Wildcard",
      label: "Special picks",
      amount: "₹X,XXX",
      sub: "Judge's choice · community favourite · best storytelling",
    },
  ];
  const perks = [
    {
      t: "Ecosystem credits",
      d: "Partner credits from AI, cloud, launch and design tooling sponsors.",
    },
    {
      t: "Launch runway",
      d: "GTM support to take your MVP from demo to Product Hunt front page.",
    },
    {
      t: "Mentorship",
      d: "1:1 sessions with verified operators, founders and designers.",
    },
    {
      t: "Career pipeline",
      d: "Fast-track interviews with corporate & startup partners.",
    },
    {
      t: "Recognition",
      d: "Certificates, features and permanent spot on the DoraDAO wall.",
    },
  ];
  return (
    <Chapter
      num="III"
      kicker="what's at stake"
      title={
        <>
          A prize pool worth{" "}
          <span className="italic text-[oklch(0.86_0.18_50)]">chasing</span>.
        </>
      }
      subtitle="Full numbers reveal when the rain clears. Here's how the pool splits — enough to say 'oh damn' when you see it."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tiers.map((p) => (
          <div
            key={p.tag}
            className="chapter-glass p-5 sm:p-6 relative overflow-hidden"
          >
            <div className="chapter-num text-[oklch(0.86_0.18_50)]">
              {p.tag}
            </div>
            <div className="mt-1 text-xs text-white/60">{p.label}</div>
            <div
              className="mt-3 font-display text-3xl sm:text-4xl font-black text-white select-none"
              style={{
                filter: "blur(8px)",
                textShadow: "0 0 20px rgba(255,220,180,0.4)",
              }}
              aria-label="Amount hidden until reveal"
            >
              {p.amount}
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-widest text-white/50">
              reveal soon
            </div>
            <p className="mt-3 text-sm text-white/75 leading-relaxed">
              {p.sub}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 chapter-glass p-5 sm:p-6">
        <div className="grid grid-cols-[auto_minmax(0,1fr)] sm:grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4">
          <Trophy className="h-8 w-8 text-[oklch(0.86_0.18_50)] shrink-0" />
          <div className="min-w-0">
            <div className="chapter-num text-white/60">Total pool</div>
            <div className="font-display text-2xl sm:text-3xl font-bold text-white">
              <span style={{ filter: "blur(9px)" }} className="select-none">
                ₹XX,XX,XXX+
              </span>
            </div>
            <p className="mt-1 text-xs text-white/60">
              Cash + credits + ecosystem value combined
            </p>
          </div>
          <span className="hidden sm:inline-flex chapter-num text-[oklch(0.86_0.18_50)]">
            to be revealed
          </span>
        </div>
      </div>

      <h3 className="mt-10 font-display text-xl sm:text-2xl font-bold text-white">
        Every participant also gets
      </h3>
      <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {perks.map((p) => (
          <div key={p.t} className="chapter-glass p-5">
            <h4 className="font-display text-lg font-bold text-white">{p.t}</h4>
            <p className="mt-1.5 text-sm text-white/75 leading-relaxed">
              {p.d}
            </p>
          </div>
        ))}
      </div>
    </Chapter>
  );
}

/* ---------------- Chapter IV: Problem statements (dynamic categories) ---------------- */
const PH_CATEGORIES = [
  { t: "Productivity", d: "Focus, notes, calendars, task automation." },
  { t: "AI Assistants", d: "Chat, agents, copilots, workflows." },
  { t: "AI Notetakers", d: "Meeting capture, summaries, action items." },
  { t: "Design Tools", d: "Prototyping, mockups, brand systems." },
  { t: "Developer Tools", d: "APIs, CLIs, SDKs, dev experience." },
  { t: "Marketing", d: "SEO, content, growth, analytics." },
  { t: "Social Media", d: "Creator tools, scheduling, community." },
  { t: "Video & Podcasting", d: "Editing, publishing, monetisation." },
  { t: "Photo & Design", d: "Generation, editing, asset libraries." },
  { t: "Writing & Content", d: "Drafting, editing, publishing, translation." },
  { t: "E-commerce", d: "Storefronts, checkout, retention." },
  { t: "Fintech", d: "Payments, budgeting, investing." },
  { t: "Health & Fitness", d: "Wellness, tracking, nutrition." },
  { t: "Mental Health", d: "Journaling, therapy, mindfulness." },
  { t: "Education", d: "Learning, tutoring, language, kids." },
  { t: "Travel", d: "Planning, booking, itinerary, local." },
  { t: "Food & Drink", d: "Cooking, recipes, delivery, dining." },
  { t: "Home & Lifestyle", d: "Habits, home, family, pets." },
  { t: "Music & Audio", d: "Discovery, generation, learning." },
  { t: "Reading & Books", d: "Discovery, notes, quotes, summaries." },
  { t: "Dating & Relationships", d: "Meeting, connecting, growing together." },
  { t: "Gaming", d: "Casual, indie, creator, community." },
  { t: "Sustainability", d: "Climate, mindful consumption, circular." },
  { t: "Web3 Consumer", d: "Wallets, identity, on-chain social." },
];

function ChapterFour() {
  const [q, setQ] = useState("");
  const [rotate, setRotate] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setRotate((r) => (r + 1) % PH_CATEGORIES.length),
      3500,
    );
    return () => clearInterval(id);
  }, []);
  const filtered = q
    ? PH_CATEGORIES.filter((c) =>
        (c.t + " " + c.d).toLowerCase().includes(q.toLowerCase()),
      )
    : PH_CATEGORIES;
  const spotlight = PH_CATEGORIES[rotate];

  return (
    <Chapter
      num="IV"
      kicker="the problem statements"
      title={
        <>
          Build for{" "}
          <span className="italic text-[oklch(0.86_0.18_50)]">real people</span>
          , in real categories.
        </>
      }
      subtitle="Theme is wide open — but consumer-focused. Pick any category below (mirrored from Product Hunt's consumer surface) and solve a problem you'd actually use. Live examples rotate in the spotlight."
    >
      {/* spotlight */}
      <div className="chapter-glass p-6 sm:p-8 relative overflow-hidden">
        <div className="chapter-num text-[oklch(0.86_0.18_50)]">
          now in the spotlight
        </div>
        <div className="mt-2 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <div className="min-w-0">
            <h3
              key={spotlight.t}
              className="font-display text-3xl sm:text-5xl font-black text-white animate-fade-in truncate"
            >
              {spotlight.t}
            </h3>
            <p
              key={spotlight.d}
              className="mt-2 text-white/80 text-sm sm:text-base animate-fade-in"
            >
              {spotlight.d}
            </p>
          </div>
          <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 text-[oklch(0.86_0.18_50)] shrink-0 animate-pulse-glow" />
        </div>
        <div className="mt-4 h-1 rounded-full bg-white/10 overflow-hidden">
          <div
            key={rotate}
            className="h-full bg-[oklch(0.86_0.18_50)] animate-fade-in"
            style={{ width: `${((rotate + 1) / PH_CATEGORIES.length) * 100}%` }}
          />
        </div>
      </div>

      {/* search */}
      <div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto] gap-3 items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Filter categories — e.g. AI, wellness, fintech…"
          className="w-full min-w-0 rounded-full bg-white/10 border border-white/20 px-5 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[oklch(0.86_0.18_50)]"
        />
        <span className="chapter-num text-white/60 shrink-0">
          {filtered.length} / {PH_CATEGORIES.length}
        </span>
      </div>

      {/* grid */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {filtered.map((c, i) => (
          <div
            key={c.t}
            className="chapter-glass p-4 sm:p-5 hover:-translate-y-1 hover:border-[oklch(0.86_0.18_50)]/60 transition-all cursor-default"
            style={{ animationDelay: `${(i % 8) * 40}ms` }}
          >
            <div className="chapter-num text-[oklch(0.86_0.18_50)]">
              {String(i + 1).padStart(2, "0")}
            </div>
            <h4 className="mt-2 font-display text-base sm:text-lg font-bold text-white">
              {c.t}
            </h4>
            <p className="mt-1 text-xs sm:text-[13px] text-white/70 leading-relaxed">
              {c.d}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-xs sm:text-sm text-white/60">
        Categories mirrored from{" "}
        <span className="text-white/80">Product Hunt's</span> consumer surface.
        You're free to combine, remix or invent — as long as a real human would
        use it.
      </p>
    </Chapter>
  );
}

/* ---------------- Chapter V: Journey ---------------- */
function ChapterFive() {
  const steps = [
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
      desc: "The hacking period — workshops, mentor chains, and 4 days of shipping.",
    },
    {
      n: "05",
      d: "7 – 10 Aug",
      t: "Launch Your Product",
      desc: "Ship on Product Hunt, Peerlist and beyond — full launch playbook.",
    },
    {
      n: "06",
      d: "7 – 10 Aug",
      t: "Get Real User Feedback",
      desc: "Put your product in front of real users, judges and the ecosystem.",
    },
    {
      n: "07",
      d: "15 Aug",
      t: "Celebrate the Winners",
      desc: "Awards, ecosystem drops, and the beginning of what happens next.",
    },
  ];
  return (
    <Chapter
      num="V"
      kicker="your journey"
      title={
        <>
          From apply to{" "}
          <span className="italic text-[oklch(0.86_0.18_50)]">launch day</span>.
        </>
      }
      subtitle="A single trail from the first form to the final celebration — every checkpoint plotted, every date public."
    >
      <ol className="relative border-l-2 border-dashed border-[oklch(0.86_0.18_50)]/50 ml-2 space-y-6">
        {steps.map((s) => (
          <li key={s.n} className="pl-5 sm:pl-6 relative">
            <span className="absolute -left-[9px] top-2 h-4 w-4 rounded-full bg-[oklch(0.86_0.18_50)] shadow-glow" />
            <div className="chapter-glass p-4 sm:p-5">
              <div className="chapter-num text-[oklch(0.86_0.18_50)]">
                {s.n} · {s.d}
              </div>
              <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold text-white">
                {s.t}
              </h3>
              <p className="mt-1 text-sm text-white/75">{s.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </Chapter>
  );
}

/* ---------------- Chapter VI: Mentors, judges, allies ---------------- */
function ChapterSix() {
  const roles = [
    {
      tag: "Mentors",
      t: "Guide the next generation of builders.",
      d: "We're inviting mentors across four segments: Business & Marketing · Product & PMM · Creators & Community · Developers. Diverse panels of 4–5 mentors guide each team across the full product journey.",
      cta: "Apply as mentor",
    },
    {
      tag: "Judges",
      t: "Judge products from every angle.",
      d: "We welcome judges from all backgrounds. Diverse perspectives ensure fair, holistic evaluation across innovation, usability, impact and execution.",
      cta: "Apply as judge",
    },
    {
      tag: "Community, NGO & Media",
      t: "Bring real problems to real builders.",
      d: "Open to partnerships across tech and non-tech alike — including mental health, psychology and social impact. Help us build for people, not just with technology.",
      cta: "Partner with us",
    },
    {
      tag: "Sponsors",
      t: "Sponsor the next wave of products.",
      d: "If this initiative resonates with your organization, we'd love to collaborate. Fill the interest form and our team will reach out within a few hours.",
      cta: "Become a sponsor",
    },
  ];
  return (
    <Chapter
      num="VI"
      kicker="calling all allies"
      title={
        <>
          Mentors, judges &{" "}
          <span className="italic text-[oklch(0.86_0.18_50)]">
            growth experts
          </span>
          .
        </>
      }
      subtitle="Think you've got what it takes to guide the next big idea? We're inviting mentors and judges from Tech & AI, Marketing & Growth, and Product Strategy & Launch."
    >
      <div className="grid md:grid-cols-2 gap-4">
        {roles.map((r) => (
          <div key={r.tag} className="chapter-glass p-5 sm:p-7 flex flex-col">
            <span className="chapter-num text-[oklch(0.86_0.18_50)]">
              {r.tag}
            </span>
            <h3 className="mt-3 font-display text-xl sm:text-2xl font-bold text-white">
              {r.t}
            </h3>
            <p className="mt-2 text-sm text-white/75 flex-1">{r.d}</p>
            <a
              href={APPLY_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-white text-[oklch(0.22_0.06_20)] px-5 py-2.5 text-sm font-semibold hover:bg-[oklch(0.86_0.18_50)] hover:text-white transition"
            >
              {r.cta} <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        ))}
      </div>
    </Chapter>
  );
}

/* ---------------- Chapter VII: Partners ---------------- */
function ChapterSeven() {
  const groups = [
    "Sponsors",
    "Colleges & Universities",
    "Communities",
    "NGOs & Ecosystem",
  ];
  return (
    <Chapter
      num="VII"
      kicker="backed by"
      title={
        <>
          Backed by an amazing{" "}
          <span className="italic text-[oklch(0.86_0.18_50)]">community</span>.
        </>
      }
      subtitle="Hack With Dora is being built alongside an ecosystem of sponsors, colleges, communities, NGOs and partners — announced as the rain clears."
    >
      <div className="space-y-6">
        {groups.map((g) => (
          <div key={g} className="chapter-glass p-5 sm:p-6">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <h3 className="font-display text-lg sm:text-xl font-bold text-white truncate">
                {g}
              </h3>
              <span className="chapter-num text-[oklch(0.86_0.18_50)] shrink-0">
                Revealing soon
              </span>
            </div>
            <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[4/3] rounded-2xl border border-dashed border-white/20 bg-white/5 flex items-center justify-center text-[10px] sm:text-[11px] text-white/50 text-center px-2"
                >
                  Coming soon
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Chapter>
  );
}

/* ---------------- Judging criteria ---------------- */
function JudgingCriteria() {
  const criteria = [
    {
      icon: Lightbulb,
      w: "25%",
      t: "Innovation & originality",
      d: "Is the idea fresh, unexpected, or a genuinely better take on a known problem?",
    },
    {
      icon: Target,
      w: "20%",
      t: "Problem–solution fit",
      d: "Does it clearly solve a real consumer problem for a real, describable person?",
    },
    {
      icon: Eye,
      w: "20%",
      t: "Usability & design",
      d: "Is it intuitive, delightful, and something a human would open twice?",
    },
    {
      icon: Zap,
      w: "15%",
      t: "Execution & craft",
      d: "How complete is the working product? Speed, polish, edge cases, launch quality.",
    },
    {
      icon: Heart,
      w: "10%",
      t: "Impact & storytelling",
      d: "Does the pitch move the room? Is the 'why' as strong as the 'what'?",
    },
    {
      icon: Scale,
      w: "10%",
      t: "Feasibility & scale",
      d: "Could this live past demo day — technically and as a real product?",
    },
  ];
  return (
    <Chapter
      num="VIII"
      kicker="how you're judged"
      title={
        <>
          The{" "}
          <span className="italic text-[oklch(0.86_0.18_50)]">
            judging criteria
          </span>
          , in the open.
        </>
      }
      subtitle="Panels of builders, creators and marketers score every submission on these six dimensions. No secret rubric — you know exactly what to optimise for."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {criteria.map((c) => (
          <div key={c.t} className="chapter-glass p-5 sm:p-6">
            <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
              <c.icon className="h-6 w-6 text-[oklch(0.86_0.18_50)] shrink-0" />
              <h3 className="font-display text-base sm:text-lg font-bold text-white truncate">
                {c.t}
              </h3>
              <span className="chapter-num text-[oklch(0.86_0.18_50)] shrink-0">
                {c.w}
              </span>
            </div>
            <div className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-[oklch(0.86_0.18_50)]"
                style={{ width: c.w }}
              />
            </div>
            <p className="mt-3 text-sm text-white/75 leading-relaxed">{c.d}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 chapter-glass p-5 sm:p-6 flex flex-wrap items-center gap-3">
        <Compass className="h-5 w-5 text-[oklch(0.86_0.18_50)]" />
        <p className="min-w-0 flex-1 text-sm text-white/80">
          Tie-breakers: launch quality (Product Hunt / Peerlist), real user
          signal in the first 48 hours, and how well the team can articulate the
          next step.
        </p>
      </div>
    </Chapter>
  );
}

/* ---------------- FAQ ---------------- */
function FAQ() {
  const faqs = [
    {
      q: "Is it free to participate?",
      a: "Absolutely! It's completely free. We do, however, happily accept good vibes, enthusiasm, and cool ideas.",
    },
    {
      q: "Is the hackathon virtual?",
      a: "Yes — 100% remote-first. Join from anywhere in the world with a laptop and a bit of internet.",
    },
    {
      q: "How are teams formed?",
      a: "You can apply solo or with a team of up to 4. Solo builders get matched during team formation sessions.",
    },
    {
      q: "Can beginners participate?",
      a: "Yes! We welcome first-time builders. Mentors, workshops and non-tech tracks make sure everyone has a lane.",
    },
    {
      q: "What happens after I register?",
      a: "You'll receive a confirmation, and then updates on shortlisting, team formation, and event kickoff.",
    },
    {
      q: "When are shortlisted participants announced?",
      a: "Between 27–31 July via email. Keep an eye on your inbox (and spam folder).",
    },
    {
      q: "Do I have to build in a specific category?",
      a: "No — pick any consumer category from Chapter IV, or invent your own. As long as a real human would use it.",
    },
    {
      q: "When are the exact prize numbers revealed?",
      a: "Full prize breakdown reveals closer to hack week. The pool is real, and worth chasing.",
    },
  ];
  return (
    <Chapter
      num="IX"
      kicker="questions, answered"
      title={
        <>
          Got questions? We've got{" "}
          <span className="italic text-[oklch(0.86_0.18_50)]">answers</span>.
        </>
      }
    >
      <div className="chapter-glass divide-y divide-white/10">
        {faqs.map((f, i) => (
          <FAQItem key={i} {...f} />
        ))}
      </div>
    </Chapter>
  );
}
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen((o) => !o)}
      className="w-full text-left p-5 md:p-6 group"
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
        <span className="font-display text-base sm:text-lg md:text-xl font-semibold text-white group-hover:text-[oklch(0.86_0.18_50)] transition">
          {q}
        </span>
        <span
          className={`h-6 w-6 shrink-0 rounded-full bg-[oklch(0.86_0.18_50)] text-white inline-flex items-center justify-center text-sm transition ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </div>
      {open && (
        <p className="mt-3 text-sm text-white/80 leading-relaxed">{a}</p>
      )}
    </button>
  );
}

/* ---------------- Final CTA ---------------- */
function FinalCTA() {
  return (
    <section className="mx-auto w-[min(94%,1100px)] mt-24 md:mt-32">
      <div className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] chapter-glass p-8 sm:p-10 md:p-16 text-center">
        <img
          src={heroImg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
        <div className="relative">
          <p className="font-hand text-2xl sm:text-3xl text-[oklch(0.92_0.15_50)]">
            the next chapter ✿
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl md:text-6xl font-bold leading-tight text-white">
            Ready to build something{" "}
            <span className="italic text-[oklch(0.86_0.18_50)]">awesome</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-white/85">
            The next big consumer product could be yours. Register now and join
            a global community of builders, creators, designers, marketers and
            innovators.
          </p>
          <a
            href={APPLY_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[oklch(0.72_0.22_35)] px-7 py-3.5 text-sm font-bold text-white shadow-glow hover:scale-[1.03] transition"
          >
            Register now <ArrowUpRight className="h-4 w-4" />
          </a>
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-[11px] sm:text-xs">
            <Pill>
              <Check className="inline h-3 w-3 mr-1" /> Free to apply
            </Pill>
            <Pill>🌏 Remote-first</Pill>
            <Pill>🗓 7–10 Aug 2026</Pill>
          </div>
        </div>
      </div>
    </section>
  );
}
