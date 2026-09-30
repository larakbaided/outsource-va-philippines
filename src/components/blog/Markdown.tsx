import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import { RateCardTable } from "@/components/pricing/RateCardTable";
import { monthHours } from "@/content/pricing";

/**
 * Token a post can place on its own line to embed the live rate overview.
 * Figures live only in @/content/pricing, and Markdown can't import — so a
 * post that needs it uses this instead of retyping the figures.
 */
const RATE_CARD_TOKEN = "<!-- rate-card -->";

/**
 * Inline placeholders for non-dollar figures that also live in
 * @/content/pricing. A post writes `{{partTimeHours}}` rather than the
 * number, so a change in one file updates the prose too. Dollar figures are
 * intentionally not offered as placeholders — pricing is discussed as a
 * custom quote, not published inline.
 */
const PLACEHOLDERS: Record<string, string> = {
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
