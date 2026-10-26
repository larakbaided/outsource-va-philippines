import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import { RateCardTable } from "@/components/pricing/RateCardTable";
import {
  activationFeeUsd,
  monthHours,
  projectFloorUsd,
  usd,
} from "@/content/pricing";

/**
 * Token a post can place on its own line to embed the live rate card. Prices
 * live only in @/content/pricing, and Markdown can't import — so a post that
 * needs the card uses this instead of retyping the figures.
 */
const RATE_CARD_TOKEN = "<!-- rate-card -->";

/**
 * Inline placeholders for figures that also live in @/content/pricing. A post
 * writes `{{activationFee}}` rather than the number, so a rate change in one
 * file updates the prose too.
 */
const PLACEHOLDERS: Record<string, string> = {
  "{{activationFee}}": usd(activationFeeUsd),
  "{{projectFloor}}": usd(projectFloorUsd),
  "{{partTimeHours}}": String(monthHours.partTime),
  "{{fullTimeHours}}": String(monthHours.fullTime),
};

function substitute(content: string): string {
  return Object.entries(PLACEHOLDERS).reduce(
    (text, [token, value]) => text.split(token).join(value),
    content,
  );
}

/**
 * Renders Markdown post content into styled HTML. Server component (no client
 * JS). Styling comes from the `.prose` classes (Tailwind Typography), tuned to
 * the brand palette in globals.css.
 */
export function Markdown({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  const segments = substitute(content).split(RATE_CARD_TOKEN);

  return (
    <div
      className={cn(
        "prose prose-lg max-w-none prose-ovap",
        className,
      )}
    >
      {segments.map((segment, i) => (
        <div key={i} className="contents">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{segment}</ReactMarkdown>
          {i < segments.length - 1 && (
            <div className="not-prose my-8">
              <RateCardTable />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
