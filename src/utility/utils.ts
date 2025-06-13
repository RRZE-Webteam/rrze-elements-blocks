/**
 * Utility function to create JumpName out of title attributes
 */
export function sanitizeTitleToJumpName(title: string): string {
  if (!title) return "";

  const decoded = new DOMParser()
    .parseFromString(title, "text/html")
    .documentElement.textContent || "";

  // removal of html tags
  let sanitized = decoded.replace(/<[^>]+>/g, "");

  // removal of common entities
  const entityMap: { [key: string]: string } = {
    '&amp;': '&',
    '&#38;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'"
  };

  Object.keys(entityMap).forEach(entity => {
    const regex = new RegExp(entity, "g");
    sanitized = sanitized.replace(regex, entityMap[entity]);
  });

  sanitized = sanitized.toLowerCase();

  sanitized = sanitized
    .toLowerCase()
    .replace(/ö/g, "oe")
    .replace(/ä/g, "ae")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return sanitized;
}
