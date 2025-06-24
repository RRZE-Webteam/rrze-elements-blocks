var he = require('he');

export function sanitizeTitleToJumpName(title: string): string {
  if (!title) return "";

  let cleaned = he.decode(title);

  cleaned = cleaned
    .replace(/ö/gi, "oe")
    .replace(/ä/gi, "ae")
    .replace(/ü/gi, "ue")
    .replace(/ß/gi, "ss");

  return cleaned
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
