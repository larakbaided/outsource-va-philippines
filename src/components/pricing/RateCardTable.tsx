import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ConsultationButton } from "@/components/ConsultationButton";
import { monthHours, rateCard } from "@/content/pricing";

/**
 * Qualitative rate overview. Shared by the /pricing page and the pricing blog
 * post (via the `<!-- rate-card -->` token in Markdown.tsx).
 *
 * Specific dollar figures are intentionally not published here — every role
 * is available part-time, full-time, or as a scoped project, and the exact
 * rate is confirmed during a consultation. Role names and hour definitions
 * still come from @/content/pricing, the single source of truth.
 */
export function RateCardTable() {
  return (
    <Card className="overflow-hidden">
      <div className="grid divide-y divide-border">
        {rateCard.map((row) => (
          <div
            key={row.role}
            className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7"
          >
            <div>
              <p className="font-medium">{row.role}</p>
              <ul className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <li className="inline-flex items-center gap-1.5">
                  <Check className="size-3.5 shrink-0 text-accent-strong" aria-hidden="true" />
                  Part-time ({monthHours.partTime} hrs/mo)
                </li>
                <li className="inline-flex items-center gap-1.5">
                  <Check className="size-3.5 shrink-0 text-accent-strong" aria-hidden="true" />
                  Full-time ({monthHours.fullTime} hrs/mo)
                </li>
                <li className="inline-flex items-center gap-1.5">
                  <Check className="size-3.5 shrink-0 text-accent-strong" aria-hidden="true" />
                  Scoped project
                </li>
              </ul>
            </div>
            <ConsultationButton
              source="rate-card"
              variant="outline"
              size="sm"
              className="shrink-0"
            >
              Get a custom quote
            </ConsultationButton>
          </div>
        ))}
      </div>
    </Card>
  );
}
