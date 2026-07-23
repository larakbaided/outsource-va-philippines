import "server-only";

/**
 * Verify a Cloudflare Turnstile token server-side.
 *
 * If TURNSTILE_SECRET_KEY is not configured, verification is skipped (returns
 * true) so the form works in development before spam protection is set up.
 * Once the secret is present, a missing/invalid token is rejected.
 */
export async function verifyTurnstile(
  token: string | undefined,
  remoteIp?: string,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured → skip

  if (!token) return false;

  try {
    const body = new URLSearchParams();
    body.append("secret", secret);
    body.append("response", token);
    if (remoteIp) body.append("remoteip", remoteIp);

    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      },
    );
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    // Fail closed on unexpected errors when protection is enabled.
    return false;
  }
}

/** Whether Turnstile is configured (used client-side to render the widget). */
export function isTurnstileEnabled(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
}
