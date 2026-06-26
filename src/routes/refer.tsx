import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import {
  ArrowLeft,
  Flower2,
  Copy,
  Check,
  Share2,
  Gift,
  Sparkles,
} from "lucide-react";
import { CursorTrail } from "@/components/CursorTrail";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/refer")({
  head: () => ({
    meta: [
      { title: "Refer a friend — GWY Fellowship 2.0" },
      {
        name: "description",
        content:
          "Generate your personal referral code and invite friends to the Girls Who Yap Fellowship 2.0.",
      },
      { property: "og:title", content: "Refer a friend — GWY Fellowship 2.0" },
      {
        property: "og:description",
        content:
          "Get your referral code and share the GWY Fellowship 2.0 with your people.",
      },
    ],
  }),
  component: ReferPage,
});

const FELLOWSHIP_URL = "https://luma.com/1o24ny1d";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Deterministic referral code from name + email (same person => same code). */
function makeCode(name: string, email: string): string {
  const base = `${name.trim().toLowerCase()}|${email.trim().toLowerCase()}`;
  let h = 0;
  for (let i = 0; i < base.length; i++) {
    h = (h * 31 + base.charCodeAt(i)) >>> 0;
  }
  const hash = h.toString(36).toUpperCase().slice(0, 5).padStart(5, "0");
  const slug =
    name
      .trim()
      .split(/\s+/)[0]
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 6) || "GWY";
  return `${slug}-${hash}`;
}

function buildLink(code: string): string {
  return `${FELLOWSHIP_URL}?ref=${encodeURIComponent(code)}`;
}

function SkyDecor() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute left-1/2 top-[7vh] -translate-x-1/2 h-64 w-64 rounded-full bg-[radial-gradient(circle,oklch(0.92_0.18_60/0.7),transparent_70%)] blur-2xl" />
      <div className="absolute -right-32 top-[40vh] h-96 w-96 rounded-full bg-[radial-gradient(circle,oklch(0.7_0.22_15/0.45),transparent_70%)] blur-3xl" />
      <div className="absolute -left-32 top-[70vh] h-96 w-96 rounded-full bg-[radial-gradient(circle,oklch(0.55_0.2_320/0.45),transparent_70%)] blur-3xl" />
    </div>
  );
}

type CopyKey = "code" | "link" | null;

function ReferPage() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [code, setCode] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState<CopyKey>(null);

  const link = code ? buildLink(code) : "";

  function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    const n = name.trim();
    const em = email.trim();
    if (n.length < 2) {
      setError("Please enter your name.");
      return;
    }
    if (!EMAIL_RE.test(em)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    setCode(makeCode(n, em));
    setCopied(null);
  }

  async function copy(value: string, key: Exclude<CopyKey, null>) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      window.setTimeout(() => setCopied((c) => (c === key ? null : c)), 1800);
    } catch {
      setError("Couldn't copy — please copy manually.");
    }
  }

  async function share() {
    const text = `Join me at the GWY Fellowship 2.0 — use my referral code ${code}`;
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title: "GWY Fellowship 2.0", text, url: link });
        return;
      } catch {
        /* user cancelled — fall through to copy */
      }
    }
    void copy(link, "link");
  }

  const waHref = `https://wa.me/?text=${encodeURIComponent(
    `Join me at the GWY Fellowship 2.0 — use my referral code ${code}: ${link}`,
  )}`;
  const xHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `Join me at the GWY Fellowship 2.0 ✨ use my referral code ${code}`,
  )}&url=${encodeURIComponent(link)}`;

  return (
    <div className="relative min-h-screen overflow-hidden bg-sunset-wash text-foreground">
      <CursorTrail />
      <SkyDecor />

      <div className="relative z-10">
        <SiteNav active="refer" ctaLabel="Apply" ctaHref={FELLOWSHIP_URL} />

        {/* hero + form */}
        <section className="relative mx-auto w-[min(94%,1100px)] mt-8 pb-12">
          <div className="chapter-glass overflow-hidden px-6 sm:px-10 md:px-14 py-12 rounded-[2rem]">
            <div className="max-w-3xl">
              <span className="font-hand text-3xl md:text-5xl text-coral drop-shadow-lg">
                bring your people <Flower2 className="inline h-8 w-8" />
              </span>
              <h1 className="mt-4 font-display font-extrabold text-4xl md:text-6xl leading-tight text-foreground drop-shadow-md">
                Refer a friend to GWY Fellowship 2.0.
              </h1>
              <p className="mt-6 text-base md:text-lg text-foreground/75 leading-relaxed max-w-2xl">
                Drop your name and email — we'll spin up your personal referral
                code and a shareable link. Send it to the women who belong in
                this room.
              </p>
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              {/* form card */}
              <form
                onSubmit={handleGenerate}
                className="rounded-[2rem] bg-white/10 border border-white/20 p-6 sm:p-8 shadow-soft"
              >
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-foreground/60 font-mono">
                  <Gift className="h-3.5 w-3.5 text-coral" /> your details
                </div>

                <label className="mt-5 block">
                  <span className="text-sm font-semibold text-foreground/80">
                    Name
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ada Lovelace"
                    autoComplete="name"
                    className="mt-2 w-full rounded-2xl border border-white/30 bg-white/70 px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 outline-none transition focus:border-coral focus:ring-2 focus:ring-coral/30"
                  />
                </label>

                <label className="mt-4 block">
                  <span className="text-sm font-semibold text-foreground/80">
                    Email
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ada@example.com"
                    autoComplete="email"
                    className="mt-2 w-full rounded-2xl border border-white/30 bg-white/70 px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 outline-none transition focus:border-coral focus:ring-2 focus:ring-coral/30"
                  />
                </label>

                {error && (
                  <p className="mt-3 text-sm font-medium text-coral">{error}</p>
                )}

                <button
                  type="submit"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-coral px-5 py-3 text-sm font-bold text-primary-foreground shadow-glow hover:scale-[1.02] active:scale-95 transition"
                >
                  <Sparkles className="h-4 w-4" />
                  {code ? "Regenerate my code" : "Generate my referral code"}
                </button>
              </form>

              {/* result card */}
              <div className="rounded-[2rem] bg-white/10 border border-white/20 p-6 sm:p-8 shadow-soft flex flex-col">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-foreground/60 font-mono">
                  <Share2 className="h-3.5 w-3.5 text-coral" /> your referral
                </div>

                {!code ? (
                  <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
                    <div className="grid h-16 w-16 place-items-center rounded-full bg-white/15 border border-white/20">
                      <Gift className="h-7 w-7 text-coral" />
                    </div>
                    <p className="mt-4 max-w-xs text-sm text-foreground/65">
                      Fill in your details and your code + shareable link will
                      appear right here.
                    </p>
                  </div>
                ) : (
                  <div className="mt-5">
                    <span className="text-sm font-semibold text-foreground/80">
                      Your code
                    </span>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 rounded-2xl border border-coral/40 bg-white/70 px-4 py-3 font-mono text-lg font-bold tracking-wider text-foreground">
                        {code}
                      </div>
                      <button
                        type="button"
                        onClick={() => copy(code, "code")}
                        aria-label="Copy code"
                        className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-coral text-primary-foreground shadow-glow hover:scale-[1.04] transition"
                      >
                        {copied === "code" ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <Copy className="h-5 w-5" />
                        )}
                      </button>
                    </div>

                    <span className="mt-5 block text-sm font-semibold text-foreground/80">
                      Shareable link
                    </span>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 truncate rounded-2xl border border-white/30 bg-white/70 px-4 py-3 text-sm text-foreground/80">
                        {link}
                      </div>
                      <button
                        type="button"
                        onClick={() => copy(link, "link")}
                        aria-label="Copy link"
                        className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-foreground text-background hover:opacity-90 transition"
                      >
                        {copied === "link" ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <Copy className="h-5 w-5" />
                        )}
                      </button>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={share}
                        className="inline-flex items-center gap-2 rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow hover:scale-[1.02] transition"
                      >
                        <Share2 className="h-4 w-4" /> Share
                      </button>
                      <a
                        href={waHref}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/25 px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-white/25 transition"
                      >
                        WhatsApp
                      </a>
                      <a
                        href={xHref}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/25 px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-white/25 transition"
                      >
                        Twitter / X
                      </a>
                    </div>

                    <p className="mt-4 text-xs text-foreground/55">
                      Same name + email always generates the same code.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/25 px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-white/25 transition"
              >
                <ArrowLeft className="h-4 w-4" /> Back to home
              </a>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </div>
  );
}
