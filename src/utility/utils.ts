/**
 * Utility function to create JumpName out of title attributes
 */
export function sanitizeTitleToJumpName(title: string): string {
    if (!title) return "";
    let sanitized = title.toLowerCase();

    sanitized = sanitized
        .replace(/ö/g, 'oe')
        .replace(/ä/g, 'ae')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss');

    sanitized = sanitized
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');

    return sanitized;
}