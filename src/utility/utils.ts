
//todo: remove old sanitization file. It is replaced with sanitize.ts in the future.
var he = require('he');

/**
 * Sanitizes a given string to be used as a valid HTML ID / Jump Name.
 * Handles European diacritics, expands specific ligatures/umlauts,
 * and formats the string safely for HTML attributes.
 * * @param title The raw string to sanitize
 * @returns A safe, URL-friendly string
 */
export const sanitizeTitleToJumpName = (title: string): string => {
  if (!title) {
    return "";
  }

  let sanitized = title.toLowerCase();

  // 1. Map characters that need to be expanded into multiple letters
  const charMap: { [key: string]: string } = {
    'ä': 'ae',
    'ö': 'oe',
    'ü': 'ue',
    'ß': 'ss',
    'æ': 'ae',
    'œ': 'oe',
  };

  sanitized = sanitized.replace(/[äöüßæœ]/g, (match) => charMap[match] || match);

  // 2. Normalize and strip remaining diacritics (accents)
  // .normalize('NFD') splits 'é' into 'e' + '´' (combining acute accent)
  // The regex /[\u0300-\u036f]/g targets those combining accent marks and deletes them.
  sanitized = sanitized.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // 3. Replace spaces, underscores, and common separators with hyphens
  sanitized = sanitized.replace(/[\s_&/]+/g, '-');

  // 4. Remove all characters that are not alphanumeric or hyphens
  sanitized = sanitized.replace(/[^a-z0-9-]/g, '');

  // 5. Remove multiple consecutive hyphens (e.g., "my---title" -> "my-title")
  sanitized = sanitized.replace(/-+/g, '-');

  // 6. Trim hyphens from the start and end of the string
  sanitized = sanitized.replace(/^-+|-+$/g, '');

  return sanitized;
};
