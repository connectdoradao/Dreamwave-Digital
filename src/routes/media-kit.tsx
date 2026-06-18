import { createFileRoute } from "@tanstack/react-router";
import { Download, Copy, Mail, ArrowUpRight, Quote, Sun } from "lucide-react";
import { useState } from "react";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";

function LogoMark({ size = 44, tone = "coral" }: { size?: number; tone?: "coral" | "cream" | "aubergine" }) {
  const bg = tone === "coral" ? "var(--primary)" : tone === "cream" ? "var(--background)" : "var(--aubergine)";
  const fg = tone === "coral" ? "var(--primary-foreground)" : tone === "cream" ? "var(--primary)" : "var(--background)";
  return (
    <span
      className="inline-flex items-center justify-center rounded-full shadow-glow"
      style={{ width: size, height: size, background: bg, color: fg }}
      aria-label="Doradao sun mark"
    >
      <Sun strokeWidth={2.2} style={{ width: size * 0.46, height: size * 0.46 }} />
    </span>
  );
}

function LogoLockup({ variant = "primary", className = "" }: { variant?: "primary" | "inverse" | "mono"; className?: string }) {
  const tone = variant === "primary" ? "coral" : variant === "inverse" ? "cream" : "aubergine";
  const color = variant === "inverse" ? "var(--primary-foreground)" : variant === "mono" ? "var(--background)" : undefined;
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoMark size={44} tone={tone} />
      <div className="font-display font-extrabold text-2xl leading-none" style={color ? { color } : undefined}>
        Dora<span className="text-coral">dao</span>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/media-kit")({
  head: () => ({
    meta: [
      { title: "Doradao — Media Kit & Brand Guidelines" },
      { name: "description", content: "Logos, colors, typography and downloadable press assets for Doradao." },
      { property: "og:title", content: "Doradao — Media Kit" },
      { property: "og:description", content: "Official brand guidelines and press assets for Doradao." },
    ],
  }),
  component: MediaKit,
});

const palette = [
  { name: "Sunset Coral", token: "--primary", hex: "#F26A3E", use: "Primary CTAs, emphasis, the 'apply' reflex" },
  { name: "Deep Aubergine", token: "--aubergine", hex: "#2A1530", use: "Body text, anchors, premium contrast" },
  { name: "Warm Cream", token: "--background", hex: "#FBF4E6", use: "Backgrounds, generous breathing room" },
  { name: "Hot Magenta", token: "--accent", hex: "#D63A8E", use: "Spark moments, community accents" },
  { name: "Soft Peach", token: "--secondary", hex: "#F6E1CB", use: "Subtle surfaces, secondary buttons" },
  { name: "Twilight Ocean", token: "--ocean", hex: "#B98BC9", use: "Quiet accents, tags, illustrations" },
];

const typography = [
  { label: "Display", name: "Bricolage Grotesque", weight: "700 / 800", sample: "Build the dream.", className: "font-display" },
  { label: "Body", name: "Plus Jakarta Sans", weight: "400 / 600", sample: "Clear, warm, and grounded — language that respects the reader.", className: "font-sans" },
  { label: "Accent", name: "Caveat", weight: "500 / 700", sample: "p.s. you belong here.", className: "font-hand" },
  { label: "Mono", name: "JetBrains Mono", weight: "400 / 600", sample: "const dream = ship();", className: "font-mono" },
];

function CopyChip({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
      className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-2.5 py-1 text-xs font-mono text-foreground/80 hover:bg-white transition border border-border"
    >
      <Copy className="h-3 w-3" /> {copied ? "copied" : value}
    </button>
  );
}

function Section({
  eyebrow, title, children, id,
}: { eyebrow: string; title: string; children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="py-16 md:py-24">
      <div className="mb-10">
        <div className="text-xs uppercase tracking-[0.18em] text-coral font-semibold">{eyebrow}</div>
        <h2 className="mt-2 text-3xl md:text-5xl font-extrabold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function MediaKit() {
  return (
    <div className="min-h-screen">
      <SiteNav active="media-kit" />

      <main className="mx-auto w-[min(94%,1100px)]">
        <section className="pt-16 md:pt-24 pb-12">
          <div className="text-xs uppercase tracking-[0.18em] text-coral font-semibold">Media Kit · v1.0 · June 2026</div>
          <h1 className="mt-3 text-5xl md:text-7xl font-extrabold leading-[0.95]">
            The <span className="text-coral">Doradao</span><br/>
            brand, in one place.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-foreground/70">
            Everything press, partners and collaborators need to talk about Doradao — logos,
            colors, typography, voice, and ready-to-use assets.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#downloads" className="inline-flex items-center gap-2 rounded-full bg-coral px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:scale-[1.03] transition">
              <Download className="h-4 w-4" /> Download full kit (.zip)
            </a>
            <a href="mailto:press@doradao.xyz" className="inline-flex items-center gap-2 rounded-full chapter-glass px-5 py-3 text-sm font-semibold">
              <Mail className="h-4 w-4" /> press@doradao.xyz
            </a>
          </div>

          <div className="mt-14 rounded-[2rem] p-10 md:p-16 shadow-glow bg-sunset text-primary-foreground relative overflow-hidden">
            <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
            <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-black/20 blur-3xl" />
            <div className="relative">
              <LogoMark size={72} tone="cream" />
              <div className="mt-6 font-display font-extrabold text-4xl md:text-6xl leading-[0.95]">
                Doradao
              </div>
              <div className="mt-3 font-hand text-2xl md:text-3xl opacity-90">a warm collective for makers</div>
            </div>
          </div>
        </section>

        <Section id="logo" eyebrow="01 — Logo" title="A sun, a wordmark, one warm circle.">
          <div className="grid md:grid-cols-3 gap-5">
            <LogoCard label="Primary · on cream" bg="var(--background)">
              <LogoLockup variant="primary" />
            </LogoCard>
            <LogoCard label="Inverse · on coral" bg="var(--primary)" textLight>
              <LogoLockup variant="inverse" />
            </LogoCard>
            <LogoCard label="Mono · on aubergine" bg="var(--aubergine)" textLight>
              <LogoLockup variant="mono" />
            </LogoCard>
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-5">
            <div className="chapter-glass rounded-3xl p-7">
              <div className="font-display font-bold text-xl">Clear space</div>
              <p className="mt-2 text-sm text-foreground/70">
                Always leave clear space around the lockup equal to the height of the sun mark.
                Never crop the mark, recolor outside the palette, or stretch the wordmark.
              </p>
              <div className="mt-5 rounded-2xl border-2 border-dashed border-coral/50 p-6">
                <LogoLockup />
              </div>
            </div>
            <div className="chapter-glass rounded-3xl p-7">
              <div className="font-display font-bold text-xl">Don't</div>
              <ul className="mt-3 space-y-2 text-sm text-foreground/70">
                <li>· Don't change the sun-mark color outside palette tokens.</li>
                <li>· Don't add drop shadows beyond the supplied glow.</li>
                <li>· Don't outline or stroke the wordmark.</li>
                <li>· Don't place the coral lockup on warm-orange photography.</li>
              </ul>
            </div>
          </div>
        </Section>

        <Section id="color" eyebrow="02 — Color" title="Warm by default. Bold on cue.">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {palette.map((c) => (
              <div key={c.name} className="rounded-3xl overflow-hidden shadow-card border border-border">
                <div className="h-32" style={{ background: `var(${c.token})` }} />
                <div className="bg-card p-5">
                  <div className="flex items-center justify-between">
                    <div className="font-display font-bold text-lg">{c.name}</div>
                    <CopyChip value={c.hex} />
                  </div>
                  <div className="mt-1 text-xs font-mono text-foreground/55">{c.token}</div>
                  <p className="mt-3 text-sm text-foreground/70">{c.use}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-foreground/60">
            Colors are defined in <span className="font-mono">oklch</span> for perceptual consistency. Hex values are approximate sRGB fallbacks.
          </p>
        </Section>

        <Section id="type" eyebrow="03 — Typography" title="Display speaks, body listens.">
          <div className="grid md:grid-cols-2 gap-5">
            {typography.map((t) => (
              <div key={t.name} className="chapter-glass rounded-3xl p-7">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-coral font-semibold">
                  <span>{t.label}</span><span>{t.weight}</span>
                </div>
                <div className="mt-2 font-display font-bold text-xl">{t.name}</div>
                <div className={`mt-5 text-3xl md:text-4xl leading-tight ${t.className}`}>{t.sample}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="voice" eyebrow="04 — Voice & tone" title="Warm, honest, slightly mischievous.">
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { k: "We are", v: "Warm. Specific. A little playful. Always respectful of the reader's time." },
              { k: "We're not", v: "Corporate, hype-y, jargon-heavy, or self-important. No exclamation spam." },
              { k: "We sound like", v: "A senior friend who's done the work and is rooting for you." },
            ].map((b) => (
              <div key={b.k} className="rounded-3xl bg-card p-7 shadow-card border border-border">
                <div className="font-display font-bold text-xl">{b.k}</div>
                <p className="mt-2 text-foreground/70">{b.v}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-3xl p-8 bg-coral text-primary-foreground shadow-glow">
            <Quote className="h-6 w-6 opacity-80" />
            <p className="mt-3 font-display text-2xl md:text-3xl font-bold leading-snug max-w-3xl">
              "Doradao is a warm collective for people who'd rather ship a small real thing
              than pitch a big imaginary one."
            </p>
            <p className="mt-3 text-sm opacity-80">— Official one-liner. Use as written.</p>
          </div>
        </Section>

        <Section id="downloads" eyebrow="05 — Downloads" title="Grab what you need.">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: "Logo pack", desc: "SVG + PNG · primary, inverse, mono · sun mark only.", size: "1.2 MB" },
              { name: "Brand guidelines PDF", desc: "Full system: logo rules, palette, type, voice.", size: "3.8 MB" },
              { name: "Founder photos", desc: "High-res portraits, web + print, free to use with credit.", size: "12 MB" },
              { name: "Press release", desc: "Latest announcement, boilerplate included.", size: "180 KB" },
              { name: "Social templates", desc: "Figma-ready stories, posts and banner sizes.", size: "Figma" },
              { name: "Boilerplate copy", desc: "About, short bio, long bio — copy-paste ready.", size: ".txt" },
            ].map((d) => (
              <a
                key={d.name}
                href="#"
                className="group rounded-3xl bg-card p-6 shadow-card border border-border hover:-translate-y-1 hover:shadow-glow transition"
              >
                <div className="flex items-start justify-between">
                  <div className="font-display font-bold text-lg">{d.name}</div>
                  <ArrowUpRight className="h-4 w-4 text-coral group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                </div>
                <p className="mt-2 text-sm text-foreground/70">{d.desc}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono text-foreground/55">
                  <Download className="h-3 w-3" /> {d.size}
                </div>
              </a>
            ))}
          </div>
        </Section>

        <footer className="py-16 border-t border-border">
          <div className="flex flex-col md:flex-row gap-6 md:items-end md:justify-between">
            <div>
              <LogoLockup />
              <p className="mt-3 text-sm text-foreground/60 max-w-md">
                For interviews, partnerships or anything not covered here, write us — we usually reply within a day.
              </p>
            </div>
            <div className="text-sm text-foreground/60">
              <div>press@doradao.xyz</div>
              <div className="mt-1 font-hand text-xl text-foreground/80">— team doradao 🌅</div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

function LogoCard({
  label, bg, textLight = false, children,
}: { label: string; bg: string; textLight?: boolean; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl overflow-hidden shadow-card border border-border">
      <div className="h-44 flex items-center justify-center" style={{ background: bg }}>
        {children}
      </div>
      <div className={`px-5 py-3 text-xs font-mono ${textLight ? "" : ""}`}>{label}</div>
    </div>
  );
}
