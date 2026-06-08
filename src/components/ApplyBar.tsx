import { ArrowRight, Sparkles } from "lucide-react";

/**
 * Sticky bottom conversion bar — always-on apply CTA.
 * Color psych: bold sunset coral = energy + courage, paired with deep aubergine = trust + depth.
 */
export function ApplyBar({
  label = "Applications open · Cohort 2.0",
  ctaLabel = "Apply now",
  ctaHref = "https://luma.com/1o24ny1d",
}: {
  label?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <div className="fixed inset-x-0 bottom-3 z-40 px-3 pointer-events-none">
      <div className="mx-auto w-[min(96%,720px)] pointer-events-auto">
        <div className="chapter-glass flex items-center justify-between gap-3 pl-4 pr-1.5 py-1.5 rounded-full shadow-glow">
          <div className="flex items-center gap-2 text-xs md:text-sm text-foreground/80">
            <Sparkles className="h-3.5 w-3.5 text-coral shrink-0" />
            <span className="font-semibold truncate">{label}</span>
          </div>
          <a
            href={ctaHref}
            target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-coral px-4 py-2 text-xs md:text-sm font-bold text-primary-foreground shadow-glow hover:scale-[1.04] active:scale-95 transition whitespace-nowrap"
          >
            {ctaLabel} <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
