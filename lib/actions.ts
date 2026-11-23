import { schema } from "./form-schema";
import type { z } from "zod";

export type InquiryResult =
  | { ok: true; waUrl: string }
  | { ok: false; error: string };

const WA_NUMBER = "201002462821";

function buildWaUrl(d: z.infer<typeof schema>): string {
  const lines = [
    "Hello BLACK-MAK, I'd like to start a project. Here's a short brief:",
    `${d.name}${d.company ? ` (${d.company})` : ""} — ${d.type}`,
    d.email ? `Email: ${d.email}` : "",
    d.contact && d.contact !== d.email ? `Channel: ${d.contact}` : "",
    d.budget ? `Investment: ${d.budget}` : "",
    d.msg,
  ].filter(Boolean);
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export async function submitInquiry(fd: FormData): Promise<InquiryResult> {
  const raw: Record<string, string> = {};
  fd.forEach((v, k) => {
    if (typeof v === "string") raw[k] = v;
  });
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message || "Please check the form and try again.",
    };
  }
  const d = parsed.data;
  return { ok: true, waUrl: buildWaUrl(d) };
}
