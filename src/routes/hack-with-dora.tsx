import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ApplyBar } from "@/components/ApplyBar";
import heroImg from "@/assets/hwd-hero.jpg";
import backpackImg from "@/assets/hwd-backpack.png";

const APPLY_URL = "https://dora-hack.devfolio.co";

export const Route = createFileRoute("/hack-with-dora")({
  head: () => ({
    meta: [
      { title: "Hack With Dora 2.0 — Build. Launch. Get Recognized." },
      {
        name: "description",
        content:
          "Global, remote-first hackathon by DoraDAO. Apply 5–31 Jul, hack 7–10 Aug. Ship real products, launch Product Hunt–style, get recognized on a global stage.",
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

function Page() {
  return (
    <>
      <div
        className="hwd-theme relative min-h-screen font-sans antialiased overflow-x-hidden"
        style={{
          // deep burgundy → dusk rose (kept dark enough for light text end-to-end)
          background:
            "linear-gradient(180deg, oklch(0.22 0.06 20) 0%, oklch(0.28 0.09 20) 16%, oklch(0.36 0.11 22) 38%, oklch(0.44 0.13 24) 62%, oklch(0.5 0.14 26) 82%, oklch(0.54 0.15 28) 100%)",
          color: "oklch(0.97 0.02 70)",
        }}
      >
        <div className="relative z-10">
          <SiteNav active="programs" ctaLabel="Register" ctaHref={APPLY_URL} />
          <Hero />
          <Marquee />
          <ChapterOne />
          <ChapterTwo />
          <ChapterThree />
          <ChapterFour />
          <ChapterFive />
          <ChapterSix />
          <ChapterSeven />
          <ChapterEight />
          <FinalCTA />
        </div>
      </div>
      {/* footer + apply bar outside the dark theme so they use the normal
          light theme (dark, readable text) */}
      <SiteFooter />
      <ApplyBar
        label="Applications open · Hack With Dora 2.0"
        ctaLabel="Register now"
        ctaHref={APPLY_URL}
      />
    </>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section className="relative mx-auto w-[min(94%,1100px)] mt-6 md:mt-10">
      <div className="relative overflow-hidden rounded-[2.5rem] chapter-glass">
        <img
          src={heroImg}
          alt="Sunset beach with palm silhouettes"
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background/60" />
        <div className="relative grid md:grid-cols-[1.35fr_1fr] gap-8 p-8 md:p-14 min-h-[540px]">
          <div className="relative z-10 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-xs font-semibold text-foreground/80 self-start">
              <span className="h-1.5 w-1.5 rounded-full bg-coral" />
              Global · Remote-first · Cohort 2.0
            </div>
            <p className="mt-6 font-hand text-3xl md:text-4xl text-coral">
              hey builder ✿
            </p>
            <h1 className="mt-1 font-display text-5xl md:text-7xl leading-[0.95] font-bold">
              Hack With <span className="italic text-coral">Dora</span> 2.0
            </h1>
            <p className="mt-5 max-w-xl text-base md:text-lg text-foreground/80 leading-relaxed">
              Build. Launch. Get Recognized. Connect with like-minded builders,
              ship a real product, launch Product Hunt–style, and get recognized
              on a global stage.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs md:text-sm">
              <Pill>🗓 Hack · 7–10 Aug</Pill>
              <Pill>📮 Apply · 5–31 Jul</Pill>
              <Pill>🌏 18+ countries</Pill>
            </div>
            <Countdown />
            <a
              href={APPLY_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-coral px-6 py-3 text-sm font-bold text-primary-foreground shadow-glow hover:scale-[1.03] active:scale-95 transition"
            >
              Register now <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <div className="relative hidden md:flex items-end justify-center">
            <img
              src={backpackImg}
              alt="Explorer backpack with map"
              className="h-[380px] w-auto object-contain drop-shadow-2xl animate-float-slow"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-white/70 border border-white/60 px-3 py-1.5 font-semibold on-light-soft backdrop-blur">
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
    <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur border border-white/70 px-4 py-2 self-start">
      <span className="chapter-num on-light-soft">hacking starts in</span>
      {(["days", "hrs", "min", "sec"] as const).map((k, i) => (
        <span key={k} className="flex items-center gap-1">
          <span className="inline-flex min-w-[38px] justify-center rounded-full bg-white px-2 py-1 text-sm font-bold on-light shadow-sm">
            {String((t as any)[k]).padStart(2, "0")}
          </span>
          <span className="text-[10px] uppercase tracking-widest on-light-soft">
            {k}
          </span>
          {i < 3 && <span className="on-light-soft opacity-50">·</span>}
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
    <section className="mt-8 border-y border-foreground/10 bg-white/40 backdrop-blur overflow-hidden">
      <div className="flex gap-10 py-4 animate-marquee whitespace-nowrap">
        {row.map((t, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-4 chapter-num text-foreground/80"
          >
            {t} <span className="text-coral">✿</span>
          </span>
        ))}
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
  return (
    <section className="mx-auto w-[min(94%,1100px)] mt-20 md:mt-28">
      <div className="flex items-baseline gap-4">
        <span className="font-display text-6xl md:text-7xl italic text-coral opacity-40">
          {num}
        </span>
        <div>
          <div className="chapter-num text-foreground/60">Chapter {num}</div>
          <div className="font-hand text-2xl text-foreground/70">{kicker}</div>
        </div>
      </div>
      <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold leading-tight max-w-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-foreground/70 leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="horizon-line mt-6" />
      <div className="mt-8">{children}</div>
    </section>
  );
}

/* ---------------- Chapter I: The invitation ---------------- */
function ChapterOne() {
  const cards = [
    {
      t: "Global & remote-first",
      d: "Join from anywhere. Applications already in from 18+ countries — and we're just getting started.",
    },
    {
      t: "Vibe coding for everyone",
      d: "Developer, designer, marketer, creator, product person, or completely new to tech — you belong here.",
    },
    {
      t: "No age limits",
      d: "Whether you're 8 or 60, if you're excited to build, you're welcome at the table.",
    },
    {
      t: "Build real products",
      d: "Take an idea from zero to MVP during the hackathon — not slideware, real software.",
    },
    {
      t: "Launch like a startup",
      d: "Learn how to position, market and launch on Product Hunt, Peerlist and beyond.",
    },
    {
      t: "Mentorship that matters",
      d: "50+ mentors across Product, Engineering, Marketing, Business, AI, Design and Launch.",
    },
  ];
  return (
    <Chapter
      num="I"
      kicker="the invitation"
      title={
        <>
          More than just a <span className="italic text-coral">hackathon</span>.
        </>
      }
      subtitle="Hack With Dora isn't just about coding — it's about building products that solve real problems, launching them to real users, and learning what it takes to turn an idea into something people genuinely want."
    >
      <div className="chapter-glass p-6 md:p-8 mb-8">
        <div className="chapter-num text-coral">
          Support beyond the hackathon
        </div>
        <p className="mt-2 text-foreground/80">
          Great products shouldn't stop after Demo Day. Outstanding teams may
          continue receiving ecosystem support to turn projects into startups.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {cards.map((c) => (
          <div key={c.t} className="chapter-glass p-6">
            <h3 className="font-display text-xl font-bold">{c.t}</h3>
            <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
              {c.d}
            </p>
          </div>
        ))}
      </div>
    </Chapter>
  );
}

/* ---------------- Chapter II: Journey timeline ---------------- */
function ChapterTwo() {
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
      num="II"
      kicker="your journey"
      title={
        <>
          From apply to <span className="italic text-coral">launch day</span>.
        </>
      }
      subtitle="A single trail from the first form to the final celebration — every checkpoint plotted, every date public."
    >
      <ol className="relative border-l-2 border-dashed border-coral/40 ml-2 space-y-6">
        {steps.map((s) => (
          <li key={s.n} className="pl-6 relative">
            <span className="absolute -left-[9px] top-2 h-4 w-4 rounded-full bg-coral shadow-glow" />
            <div className="chapter-glass p-5">
              <div className="chapter-num text-coral">
                {s.n} · {s.d}
              </div>
              <h3 className="mt-1 font-display text-2xl font-bold">{s.t}</h3>
              <p className="mt-1 text-sm text-foreground/70">{s.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </Chapter>
  );
}

/* ---------------- Chapter III: Who can apply ---------------- */
function ChapterThree() {
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
      num="III"
      kicker="who can apply"
      title={
        <>
          If you love making stuff —{" "}
          <span className="italic text-coral">you belong here</span>.
        </>
      }
    >
      <div className="grid md:grid-cols-3 gap-4">
        {who.map((w) => (
          <div key={w.n} className="chapter-glass p-6">
            <div className="chapter-num text-coral">{w.n}</div>
            <h3 className="mt-2 font-display text-xl font-bold">{w.t}</h3>
            <p className="mt-2 text-sm text-foreground/70">{w.d}</p>
          </div>
        ))}
      </div>
      <div className="chapter-glass mt-8 p-6 md:p-8">
        <p className="font-hand text-2xl md:text-3xl text-foreground/85 leading-snug">
          "If you love building cool stuff, solving real problems, shipping
          products, designing experiences, growing ideas, or simply learning by
          doing — you belong here." 🚀
        </p>
      </div>
    </Chapter>
  );
}

/* ---------------- Chapter IV: Coming soon ---------------- */
function ChapterFour() {
  const boxes = ["Prize pool", "Ecosystem benefits", "Additional perks"];
  return (
    <Chapter
      num="IV"
      kicker="coming soon"
      title={
        <>
          Big <span className="italic text-coral">reveals</span>, brewing.
        </>
      }
      subtitle="We're cooking up something exciting. Stay tuned as we unveil the full lineup — trust us, you'll want to stick around. 😉"
    >
      <div className="grid md:grid-cols-3 gap-4">
        {boxes.map((b) => (
          <div key={b} className="chapter-glass p-8 text-center">
            <div className="chapter-num text-coral">TBA</div>
            <div className="mt-3 font-display text-2xl font-bold">{b}</div>
            <div className="mt-4 h-1 w-16 mx-auto rounded-full bg-coral opacity-60" />
          </div>
        ))}
      </div>
    </Chapter>
  );
}

/* ---------------- Chapter V: Ecosystem pipeline ---------------- */
function ChapterFive() {
  const items = [
    {
      tag: "Career",
      n: "01",
      t: "Remote internships",
      d: "Direct internship opportunities with corporate partners, remote and offline.",
    },
    {
      tag: "Go-to-Market",
      n: "02",
      t: "Product launch support",
      d: "Take your prototype to launch with hands-on GTM guidance from the Dora ecosystem.",
    },
    {
      tag: "Ecosystem",
      n: "03",
      t: "GWY ecosystem programs",
      d: "Exclusive access to flagship programs under the Girls Who Yap ecosystem.",
    },
    {
      tag: "Research",
      n: "04",
      t: "Research opportunities",
      d: "Publish and present at international conferences alongside senior researchers.",
    },
    {
      tag: "Social Impact",
      n: "05",
      t: "NGO volunteering",
      d: "Roll up your sleeves with vetted NGO partners on real ground-level tech problems.",
    },
    {
      tag: "Mentorship",
      n: "06",
      t: "Verified industry mentors",
      d: "One-on-one mentorship from verified experts across engineering, design and product.",
    },
    {
      tag: "Network",
      n: "07",
      t: "Builder network",
      d: "Lifetime access to a curated network of builders, founders and operators shipping every day.",
    },
  ];
  return (
    <Chapter
      num="V"
      kicker="ecosystem pipeline"
      title={
        <>
          Your journey doesn't end at{" "}
          <span className="italic text-coral">demo day</span>.
        </>
      }
      subtitle="Selected participants unlock a pipeline of opportunities that outlive the hackathon — from mentorship to internships to real launches."
    >
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((i) => (
          <div key={i.n} className="chapter-glass p-6">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest text-foreground/60">
                {i.tag}
              </span>
              <span className="chapter-num text-coral">{i.n}</span>
            </div>
            <h3 className="mt-3 font-display text-lg font-bold">{i.t}</h3>
            <p className="mt-2 text-sm text-foreground/70">{i.d}</p>
          </div>
        ))}
      </div>
    </Chapter>
  );
}

/* ---------------- Chapter VI: Backed by ---------------- */
function ChapterSix() {
  const groups = [
    "Sponsors",
    "Colleges & Universities",
    "Communities",
    "NGOs & Ecosystem",
  ];
  return (
    <Chapter
      num="VI"
      kicker="backed by"
      title={
        <>
          Backed by an amazing{" "}
          <span className="italic text-coral">community</span>.
        </>
      }
      subtitle="Hack With Dora is being built alongside an ecosystem of sponsors, colleges, communities, NGOs and partners — announced as the rain clears."
    >
      <div className="space-y-6">
        {groups.map((g) => (
          <div key={g} className="chapter-glass p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-bold">{g}</h3>
              <span className="chapter-num text-coral">Revealing soon</span>
            </div>
            <div className="mt-4 grid grid-cols-3 md:grid-cols-6 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[4/3] rounded-2xl border border-dashed border-white/25 bg-white/10 flex items-center justify-center text-[11px] uppercase tracking-widest text-white/70"
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

/* ---------------- Chapter VII: Join the journey ---------------- */
function ChapterSeven() {
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
      num="VII"
      kicker="join the journey"
      title={
        <>
          Calling all builders, launchers &{" "}
          <span className="italic text-coral">growth experts</span>.
        </>
      }
      subtitle="Think you've got what it takes to guide the next big idea? We're inviting mentors and judges from Tech & AI, Marketing & Growth, and Product Strategy & Launch."
    >
      <div className="grid md:grid-cols-2 gap-4">
        {roles.map((r) => (
          <div key={r.tag} className="chapter-glass p-7 flex flex-col">
            <span className="chapter-num text-coral">{r.tag}</span>
            <h3 className="mt-3 font-display text-2xl font-bold">{r.t}</h3>
            <p className="mt-2 text-sm text-foreground/70 flex-1">{r.d}</p>
            <a
              href={APPLY_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-coral text-primary-foreground px-5 py-2.5 text-sm font-semibold shadow-glow hover:scale-[1.03] transition"
            >
              {r.cta} <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        ))}
      </div>
    </Chapter>
  );
}

/* ---------------- Chapter VIII: FAQ ---------------- */
function ChapterEight() {
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
  ];
  return (
    <Chapter
      num="VIII"
      kicker="questions, answered"
      title={
        <>
          Got questions? We've got{" "}
          <span className="italic text-coral">answers</span>.
        </>
      }
    >
      <div className="chapter-glass divide-y divide-foreground/10">
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
      <div className="flex items-start justify-between gap-4">
        <span className="font-display text-lg md:text-xl font-semibold group-hover:text-coral transition">
          {q}
        </span>
        <span
          className={`h-6 w-6 shrink-0 rounded-full bg-coral text-primary-foreground inline-flex items-center justify-center text-sm transition ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </div>
      {open && (
        <p className="mt-3 text-sm text-foreground/75 leading-relaxed">{a}</p>
      )}
    </button>
  );
}

/* ---------------- Final CTA ---------------- */
function FinalCTA() {
  return (
    <section className="mx-auto w-[min(94%,1100px)] mt-24 md:mt-32">
      <div className="relative overflow-hidden rounded-[2.5rem] chapter-glass p-10 md:p-16 text-center">
        <img
          src={heroImg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="relative">
          <p className="font-hand text-3xl text-coral">the next chapter ✿</p>
          <h2 className="mt-2 font-display text-4xl md:text-6xl font-bold leading-tight">
            Ready to build something{" "}
            <span className="italic text-coral">awesome</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-foreground/80">
            The next big product could be yours. Register now and become part of
            a global community of builders, creators, designers, marketers and
            innovators.
          </p>
          <a
            href={APPLY_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-coral px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-glow hover:scale-[1.03] transition"
          >
            Register now <ArrowUpRight className="h-4 w-4" />
          </a>
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs">
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
