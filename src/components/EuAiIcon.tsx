import type {SVGProps} from "react";
import Ai from "../_shared/icons/symbols/eu-ai.svg";
import AiGenerated from "../_shared/icons/symbols/eu-ai-generated.svg";
import AiModified from "../_shared/icons/symbols/eu-ai-modified.svg";

const ICONS = {
  "eu-ai": Ai,
  "eu-ai-generated": AiGenerated,
  "eu-ai-modified": AiModified,
};

export const EU_AI_ICON_NAMES = Object.keys(ICONS);

/**
 * Finds EU labels only when an explicit AI/KI term or canonical icon name is searched.
 *
 * @param query - Search text entered in the shared icon picker.
 * @returns Matching canonical icon names, in their display order.
 */
export function searchEuAiIcons(query: string): string[] {
  const normalized = query.toLowerCase().trim();
  if (!/(?:^|[\s-])(?:ai|ki)(?:$|[\s-])/.test(normalized)) return [];
  const keywords = "eu ai ki artificial intelligence künstliche intelligenz kennzeichnung label";
  return EU_AI_ICON_NAMES.filter((name) =>
    `${name} ${keywords} ${name === "eu-ai-modified" ? "modifiziert bearbeitet" : "generiert"}`.includes(normalized)
  );
}

/**
 * Renders an official EU label at its original aspect ratio, or nothing for other icons.
 *
 * @param props - Canonical name and SVG presentation attributes.
 * @returns A decorative SVG; the surrounding control or text supplies its accessible name.
 */
export function EuAiIcon({name, style, className = "", ...props}: SVGProps<SVGSVGElement> & {name: string}) {
  if (!Object.prototype.hasOwnProperty.call(ICONS, name)) return null;
  const Icon = ICONS[name as keyof typeof ICONS];
  // SVGO can remove explicit black fills; keep the default fill independent of button/theme colors.
  return <Icon {...props} className={`rrze-eu-ai-icon ${className}`.trim()} aria-hidden="true" focusable="false"
    style={{height: "1em", width: "auto", ...style, fill: "#000", maxWidth: "none", maxHeight: "none"}} />;
}
