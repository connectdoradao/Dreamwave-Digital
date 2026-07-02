import { createFileRoute } from "@tanstack/react-router";
import { CursorTrail } from "@/components/CursorTrail";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { PartnerTabs } from "@/components/PartnerTabs";
import { SponsorsSection } from "@/components/SponsorsCarousel";

import apyx from "@/assets/community-partners/apyx.jpeg";
import assetmerkleIgdtuw from "@/assets/community-partners/assetmerkle-igdtuw.jpeg";
import colabnation from "@/assets/community-partners/colabnation.jpeg";
import devpath from "@/assets/community-partners/devpath.jpeg";
import elevate from "@/assets/community-partners/elevate.png";
import eventdevx from "@/assets/community-partners/eventdevx.jpg";
import everhack from "@/assets/community-partners/everhack.jpeg";
import gdgIiitKalyani from "@/assets/community-partners/gdg-iiit-kalyani.jpeg";
import globalAiAmravati from "@/assets/community-partners/global-ai-amravati.png";
import mscGgits from "@/assets/community-partners/msc-ggits.jpeg";
import mscPrpcem from "@/assets/community-partners/msc-prpcem.png";
import nodezer0 from "@/assets/community-partners/nodezer0.png";
import unicraze from "@/assets/community-partners/unicraze.png";
import womenxcode from "@/assets/community-partners/womenxcode.png";
import gdgBanner from "@/assets/community-partners/gdg-banner.jpg";
import partnerExtra from "@/assets/community-partners/partner-extra.jpeg";
import eventsInfo from "@/assets/community-partners/events-info.png";

const communityPartners: Array<{ n: string; cat: string; img: string }> = [
  { n: "APYX", cat: "Community", img: apyx },
  { n: "Asset Merkle × IGDTUW", cat: "Campus Chapter", img: assetmerkleIgdtuw },
  { n: "ColabNation", cat: "Community", img: colabnation },
  { n: "DevPath", cat: "Community", img: devpath },
  { n: "Elevate", cat: "Community", img: elevate },
  { n: "EventDevX", cat: "Events", img: eventdevx },
  { n: "Everhack", cat: "Hackathon", img: everhack },
  { n: "GDG on Campus, IIIT Kalyani", cat: "Campus Chapter", img: gdgIiitKalyani },
  { n: "Global AI Amravati", cat: "AI Community", img: globalAiAmravati },
  { n: "Microsoft Campus Club, GGITS", cat: "Campus Club", img: mscGgits },
  { n: "MSC PRPCEM", cat: "Campus Club", img: mscPrpcem },
  { n: "NodeZer0", cat: "Community", img: nodezer0 },
  { n: "Unicraze", cat: "Community", img: unicraze },
  { n: "WomenXCode", cat: "Community", img: womenxcode },
  { n: "GDG", cat: "Developer Group", img: gdgBanner },
  { n: "Community Partner", cat: "Community", img: partnerExtra },
  { n: "Events Info", cat: "Events", img: eventsInfo },
];

export const Route = createFileRoute("/partner/csr")({
  head: () => ({
    meta: [
      { title: "CSR Partners — DoraDAO" },
      {
        name: "description",
        content:
          "The communities and campus chapters powering DoraDAO's cohorts and social impact.",
      },
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
        <PartnerTabs active="csr" />

        <section className="relative mx-auto w-[min(94%,1100px)] mt-10 md:mt-16">
          <div className="chapter-glass px-6 sm:px-10 md:px-14 py-12 md:py-16 relative overflow-hidden">
            {/* background decoration */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute left-1/2 top-0 -translate-x-1/2 h-72 w-72 rounded-full bg-[radial-gradient(circle,oklch(0.92_0.18_60/0.5),transparent_70%)] blur-3xl" />
              <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,oklch(0.7_0.22_15/0.3),transparent_70%)] blur-3xl" />
              <div className="absolute -left-20 bottom-10 h-64 w-64 rounded-full bg-[radial-gradient(circle,oklch(0.55_0.2_320/0.3),transparent_70%)] blur-3xl" />
            </div>

            <div className="relative max-w-2xl">
              <span className="chapter-num">✿ csr & social impact ✿</span>
              <h1 className="mt-5 font-display font-extrabold text-4xl md:text-6xl leading-[1.05]">
                Our <span className="text-coral">community partners</span>.
              </h1>
              <p className="mt-6 text-foreground/70 text-base md:text-lg leading-relaxed">
                The incredible organizations, communities and campus chapters
                that powered our earlier cohorts and are shaping the future of
                creators and builders.
              </p>
            </div>

            <div className="relative mt-10 md:mt-12">
              <SponsorsSection sponsors={communityPartners} />
            </div>

            <div className="relative mt-12 flex flex-wrap items-center gap-3">
              <a
                href="/partner#become-a-partner"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background hover:opacity-90 transition"
              >
                Register interest
              </a>
              <a
                href="mailto:partnerships@doradao.community?subject=CSR%20Partnership%20Inquiry"
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
