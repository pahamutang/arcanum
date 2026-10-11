/* ═══════════════════════════════════════════
   API CONFIG
   Single source of truth for the backend URL.
   Set VITE_API_URL in your .env (and in your
   host's environment variables for production)
   so this never hard-fails on deploy again.
═══════════════════════════════════════════ */
export const API_BASE = import.meta.env?.VITE_API_URL ?? (import.meta.env?.DEV ? 'http://localhost:3001' : '');

/**
 * Shared enquiry submission used by every contact/enquiry form on the site.
 * Centralizing this means there's exactly one place to fix if the payload
 * shape, endpoint, or error handling ever needs to change.
 *
 * Honeypot spam guard: pass the value of a hidden field that real visitors
 * never see or fill in (bots that auto-fill every field will). If it's
 * non-empty we silently pretend success — no network request, no tip-off
 * to the bot that it was caught — instead of letting spam reach your inbox.
 */
export async function submitEnquiry(payload, honeypot = '') {
  if (honeypot) return { success: true };
  try {
    const res = await fetch(`${API_BASE}/api/enquire`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (data.success) return { success: true };
    return { success: false, error: data.error || 'Something went wrong. Please try again.' };
  } catch {
    return { success: false, error: 'Could not reach the server. Please try again in a moment.' };
  }
}
