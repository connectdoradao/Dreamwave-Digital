import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { CursorTrail } from "@/components/CursorTrail";
import { ArrowRight, ArrowLeft, ArrowUpRight, Sun, Flower2 } from "lucide-react";
import { allSpeakers, speakerGrads, getInitials } from "@/lib/voices";

export const Route = createFileRoute("/voices")({
  head: () => ({
    meta: [
      { title: "Voices — GWY Fellowship 2.0" },
      {
        name: "description",
        content:
          "All speakers and mentors for the GWY Fellowship 2.0 — founders, builders, creators and industry leaders.",
      },
      { property: "og:title", content: "Voices — GWY Fellowship 2.0" },
      {
        property: "og:description",
        content:
          "Meet the full lineup of speakers and mentors for Girls Who Yap Fellowship 2.0.",
      },
    ],
  }),
  component: Voices,
});

function SkyDecor() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute left-1/2 top-[7vh] -translate-x-1/2 h-64 w-64 rounded-full bg-[radial-gradient(circle,oklch(0.92_0.18_60/0.7),transparent_70%)] blur-2xl" />
      <div className="absolute -right-32 top-[40vh] h-96 w-96 rounded-full bg-[radial-gradient(circle,oklch(0.7_0.22_15/0.45),transparent_70%)] blur-3xl" />
      <div className="absolute -left-32 top-[70vh] h-96 w-96 rounded-full bg-[radial-gradient(circle,oklch(0.55_0.2_320/0.45),transparent_70%)] blur-3xl" />
      <div className="absolute left-1/3 bottom-[8vh] h-80 w-80 rounded-full bg-[radial-gradient(circle,oklch(0.85_0.18_50/0.5),transparent_70%)] blur-3xl" />
    </div>
  );
}

function Voices() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-journey text-foreground">
      <CursorTrail />
      <SkyDecor />

      <div className="relative z-10">
        <header className="sticky top-4 z-50 mx-auto w-[min(94%,1100px)]">
          <nav className="chapter-glass flex items-center justify-between px-4 py-2.5 rounded-full">
            <a href="/" className="flex items-center gap-2.5 font-display text-base font-bold">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-coral text-primary-foreground shadow-glow">
                <Sun className="h-3.5 w-3.5" />
              </span>
              <span>GWY <span className="text-coral">2.0</span></span>
            </a>
            <div className="hidden md:flex items-center gap-6 text-sm text-foreground/70">
              <a href="/" className="hover:text-foreground transition">Home</a>
              <a href="/voices" className="text-coral font-semibold">Voices</a>
            </div>
            <a
              href="https://luma.com/1o24ny1d"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background hover:opacity-90 transition"
            >
              Apply <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </nav>
        </header>

        <section className="relative mx-auto w-[min(94%,1100px)] mt-8 pb-12">
          <div className="chapter-glass overflow-hidden px-8 md:px-14 py-12 rounded-[2rem]">
            <div className="max-w-3xl">
              <span className="font-hand text-3xl md:text-5xl text-coral drop-shadow-lg">
                all the voices <Flower2 className="inline h-8 w-8" />
              </span>
              <h1 className="mt-4 font-display font-extrabold text-4xl md:text-6xl leading-tight text-foreground drop-shadow-md">
                Speakers &amp; mentors from the full GWY lineup.
              </h1>
              <p className="mt-6 text-base md:text-lg text-foreground/75 leading-relaxed max-w-2xl">
                A curated showcase of founders, creators, investors and leaders who will bring the programme to life.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/25 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/25 transition"
              >
                <ArrowLeft className="h-4 w-4" /> Back to home
              </a>
              <a
                href="https://luma.com/1o24ny1d"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-coral text-primary-foreground shadow-glow px-5 py-2.5 text-sm font-semibold hover:scale-[1.02] transition"
              >
                Join the community <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {allSpeakers.map((speaker, i) => (
                <div
                  key={speaker.n}
                  className="group rounded-[2rem] bg-white/10 border border-white/15 p-6 shadow-soft transition-transform duration-300 hover:-translate-y-2 hover:bg-white/20"
                >
                  <div className={`aspect-square rounded-3xl bg-gradient-to-br ${speakerGrads[i % speakerGrads.length]} grid place-items-center text-white font-display text-4xl font-bold shadow-glow relative overflow-hidden`}>
                  {speaker.img ? (
                    <img
                      src={speaker.img}
                      alt={speaker.n}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 grid-lines opacity-25" />
                      <span className="relative drop-shadow-lg">{getInitials(speaker.n)}</span>
                    </>
                  )}
                </div>
                  <div className="mt-4">
                    <div className="text-base font-display font-semibold text-foreground">{speaker.n}</div>
                    <div className="mt-1 text-sm text-foreground/70 leading-snug">{speaker.r}</div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.24em] text-foreground/60 font-mono">
                    <span>Voice</span>
                    <ArrowUpRight className="h-4 w-4 transition group-hover:text-coral" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
