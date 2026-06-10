import { createFileRoute } from "@tanstack/react-router";
import { CursorTrail } from "@/components/CursorTrail";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { PartnerTabs } from "@/components/PartnerTabs";

export const Route = createFileRoute("/partner/volunteer")({
  head: () => ({
    meta: [
      { title: "Volunteer with DoraDAO" },
      { name: "description", content: "Coming soon." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-sunset-wash text-foreground">
      <CursorTrail />
      <div className="relative z-10">
        <SiteNav active="partner" ctaLabel="Partner" ctaHref="/partner#become-a-partner" />
        <PartnerTabs active="volunteer" />

        <section className="relative mx-auto w-[min(94%,1100px)] mt-10 md:mt-16">
          <div className="chapter-glass px-8 md:px-16 py-24 md:py-36 flex flex-col items-center justify-center text-center relative overflow-hidden">

            {/* background decoration */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute left-1/2 top-0 -translate-x-1/2 h-72 w-72 rounded-full bg-[radial-gradient(circle,oklch(0.92_0.18_60/0.5),transparent_70%)] blur-3xl" />
              <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,oklch(0.7_0.22_15/0.3),transparent_70%)] blur-3xl" />
              <div className="absolute -left-20 bottom-10 h-64 w-64 rounded-full bg-[radial-gradient(circle,oklch(0.55_0.2_320/0.3),transparent_70%)] blur-3xl" />
              {[...Array(12)].map((_, i) => (
                <span
                  key={i}
                  className="absolute rounded-full bg-foreground/20 animate-twinkle"
                  style={{
                    left: `${(i * 137) % 100}%`,
                    top: `${(i * 53) % 100}%`,
                    width: 2 + (i % 3),
                    height: 2 + (i % 3),
                    animationDelay: `${(i % 7) * 0.4}s`,
                  }}
                />
              ))}
            </div>

            <span className="relative chapter-num mb-6">✿ volunteer & mentor ✿</span>

            <h1 className="relative font-display font-extrabold text-4xl md:text-6xl leading-[1.05] max-w-2xl">
              The best things are{" "}
              <span className="bg-coral text-primary-foreground px-4 rounded-[1.2rem] shadow-glow inline-block rotate-[-1deg]">
                worth waiting
              </span>{" "}
              for.
            </h1>

            <p className="relative mt-6 text-foreground/60 text-base md:text-lg max-w-md leading-relaxed font-display">
              Will be revealed soon ✿
            </p>

            <div className="relative mt-10 flex flex-wrap items-center justify-center gap-3">
              {/* <a
                href="https://discord.gg/CRaEtrtZ2v"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background hover:opacity-90 transition"
              >
                Join Discord to stay updated
              </a> */}
              <a
                href="mailto:partnerships@doradao.community?subject=Volunteer%20Inquiry"
                className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-white/80 px-6 py-3 text-sm font-semibold text-foreground hover:bg-white/90 transition"
              >
                Email us
              </a>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </div>
  );
}