import Image from "next/image";
import type { TeamMember } from "@/content/team";
import { cn } from "@/lib/utils";

/**
 * Renders a team member's photo when a real, approved image is present
 * (imageIsPlaceholder === false). Otherwise renders an elegant initials
 * avatar on the member's gradient — never implying it is a real photo.
 *
 * TO USE REAL PHOTOS: add the .webp to /public/team/ and set
 * imageIsPlaceholder: false for that member in src/content/team.ts.
 */
export function TalentAvatar({
  member,
  className,
  sizes = "(max-width: 640px) 95vw, (max-width: 1024px) 47vw, 420px",
  priority = false,
}: {
  member: TeamMember;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const initial = member.name.charAt(0).toUpperCase();

  if (!member.imageIsPlaceholder) {
    return (
      <div className={cn("relative overflow-hidden bg-surface-muted", className)}>
        <Image
          src={member.image}
          alt={`${member.name}, ${member.role} at Outsource VA Philippines`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br",
        member.avatarGradient,
        className,
      )}
      role="img"
      aria-label={`${member.name} — temporary avatar`}
    >
      <span className="font-serif text-6xl font-medium text-white/95">
        {initial}
      </span>
      {/* Subtle decorative ring */}
      <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/15" />
    </div>
  );
}
