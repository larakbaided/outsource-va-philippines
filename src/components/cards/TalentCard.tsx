"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TalentAvatar } from "@/components/talent/TalentAvatar";
import type { TeamMember } from "@/content/team";
import { trackEvent } from "@/lib/analytics";

export function TalentCard({
  member,
  showAskButton = false,
  priority = false,
}: {
  member: TeamMember;
  /** Show the "Ask About This Professional" CTA (Our Talent page). */
  showAskButton?: boolean;
  priority?: boolean;
}) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-[var(--shadow-lift)]">
      <Link
        href={`/our-talent/${member.slug}`}
        className="block"
        onClick={() =>
          trackEvent("talent_profile_viewed", { member: member.slug })
        }
        aria-label={`View ${member.name}'s profile`}
      >
        <TalentAvatar
          member={member}
          className="aspect-[4/3] w-full"
          priority={priority}
        />
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-medium tracking-tight">{member.name}</h3>
            <p className="mt-0.5 text-sm font-medium text-accent-strong">
              {member.role}
            </p>
          </div>
        </div>

        <Badge variant="sage" className="mt-3 w-fit">
          {member.experience}
        </Badge>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {member.shortBio}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {member.skills.slice(0, 4).map((skill) => (
            <Badge key={skill} variant="outline" size="sm">
              {skill}
            </Badge>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          <Button asChild variant="primary" size="sm" className="flex-1">
            <Link
              href={`/our-talent/${member.slug}`}
              onClick={() =>
                trackEvent("talent_profile_viewed", { member: member.slug })
              }
            >
              View Profile
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
          {showAskButton && (
            <Button asChild variant="outline" size="sm" className="flex-1">
              <Link href={`/contact?talent=${member.slug}#inquiry`}>
                Ask About {member.name}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
