import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Minimal, server-safe `asChild` slot.
 *
 * We intentionally avoid @radix-ui/react-slot because it calls
 * React.createContext at module scope, which throws inside React Server
 * Components (createContext is unavailable there). This implementation merges
 * className, composes event handlers, and forwards the ref via cloneElement —
 * enough for `asChild` buttons/links — with no context and no "use client".
 */

type SlotProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
};

export const Slot = React.forwardRef<HTMLElement, SlotProps>(
  ({ children, className, ...slotProps }, ref) => {
    if (!React.isValidElement(children)) {
      return null;
    }

    const child = children as React.ReactElement<Record<string, unknown>>;
    const childProps = child.props ?? {};

    const merged: Record<string, unknown> = {
      ...slotProps,
      ...childProps,
      className: cn(className, childProps.className as string | undefined),
    };

    // Compose event handlers so both the slot's and the child's fire.
    for (const key of Object.keys(slotProps)) {
      if (/^on[A-Z]/.test(key)) {
        const slotHandler = (slotProps as Record<string, unknown>)[key];
        const childHandler = childProps[key];
        if (typeof slotHandler === "function") {
          merged[key] = (...args: unknown[]) => {
            (childHandler as ((...a: unknown[]) => void) | undefined)?.(...args);
            (slotHandler as (...a: unknown[]) => void)(...args);
          };
        }
      }
    }

    // Forward ref onto the child element.
    merged.ref = ref;

    return React.cloneElement(child, merged);
  },
);
Slot.displayName = "Slot";
