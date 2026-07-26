import {
  Workflow,
  ClipboardList,
  Megaphone,
  Share2,
  Folder,
  Layers,
  Code2,
  type LucideIcon,
} from "lucide-react";
import type { Service } from "@/content/services";
import { cn } from "@/lib/utils";

const iconMap: Record<Service["icon"], LucideIcon> = {
  workflow: Workflow,
  clipboard: ClipboardList,
  megaphone: Megaphone,
  share: Share2,
  folder: Folder,
  layers: Layers,
  code: Code2,
};

export function ServiceIcon({
  name,
  className,
}: {
  name: Service["icon"];
  className?: string;
}) {
  const Icon = iconMap[name];
  return <Icon className={cn("size-6", className)} aria-hidden="true" />;
}

/** Icon in a rounded tinted tile — used on service cards. */
export function ServiceIconTile({ name }: { name: Service["icon"] }) {
  return (
    <span className="inline-flex size-12 items-center justify-center rounded-xl bg-sage-soft text-primary">
      <ServiceIcon name={name} />
    </span>
  );
}
