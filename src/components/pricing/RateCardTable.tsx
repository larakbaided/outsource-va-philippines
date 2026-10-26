import { Card } from "@/components/ui/card";
import { monthHours, rateCard, usd } from "@/content/pricing";

/**
 * The published rate card. Shared by the /pricing page and the pricing blog
 * post (via the `<!-- rate-card -->` token in Markdown.tsx) so the figures
 * live in one place — @/content/pricing.
 */
export function RateCardTable() {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[36rem] border-collapse text-left">
          <caption className="sr-only">
            Monthly and hourly rates by role, in US dollars
          </caption>
          <thead>
            <tr className="border-b border-border bg-surface-muted">
              <th scope="col" className="px-5 py-4 text-sm font-medium sm:px-7">
                Role
              </th>
              <th scope="col" className="px-5 py-4 text-sm font-medium sm:px-7">
                Part-time
                <span className="block text-xs font-normal text-muted-foreground">
                  {monthHours.partTime} hrs / month
                </span>
              </th>
              <th scope="col" className="px-5 py-4 text-sm font-medium sm:px-7">
                Full-time
                <span className="block text-xs font-normal text-muted-foreground">
                  {monthHours.fullTime} hrs / month
                </span>
              </th>
              <th scope="col" className="px-5 py-4 text-sm font-medium sm:px-7">
                Project
                <span className="block text-xs font-normal text-muted-foreground">
                  per hour
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rateCard.map((row) => (
              <tr key={row.role} className="border-b border-border last:border-0">
                <th scope="row" className="px-5 py-4 text-left font-medium sm:px-7">
                  {row.role}
                </th>
                <td className="px-5 py-4 tabular-nums sm:px-7">
                  {usd(row.partTime)}
                </td>
                <td className="px-5 py-4 tabular-nums sm:px-7">
                  {usd(row.fullTime)}
                </td>
                <td className="px-5 py-4 tabular-nums sm:px-7">
                  {usd(row.projectHourly)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
