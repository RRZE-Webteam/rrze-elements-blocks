import { regexp, next, attrs, ShortcodeMatch } from "@wordpress/shortcode";
import { createBlock } from "@wordpress/blocks";
import { BlockInstance } from "@wordpress/blocks";
import { parse } from "path";

/**
 * Utility function to strip wpAutop generated HTML tags.
 */
function stripHTML(html: string): string {
    let stripped = html.replace(/<\/?p>/g, "");
    stripped = stripped.replace(/<br\s*\/?>/g, "");

    return stripped.trim();
}

interface ShortcodeMatches {
    attributes: {
        named: {
            [key: string]: string | boolean | undefined;
        };
        numeric: number[];
    };
    content: string;
}

interface ParsedShortcode {
    attributes: {
        named: { [key: string]: string | boolean | undefined };
        numeric: number[];
    };
    content: string;
}

/**
 * Function to parse an array of ShortcodeMatch objects based on the provided shortcode tag.
 */
const parseShortcodeMatches = (shortcodeTag: string, content: string): ParsedShortcode[] => {
    const matchRegex: RegExp = regexp(shortcodeTag);
    const matches: string[] = content.match(matchRegex) || [];
    const parsedMatches: ParsedShortcode[] = [];

    matches.forEach((match) => {
        console.log("The match: ");
        console.log(match);

        const attrMatch = match.match(new RegExp(`${shortcodeTag}\\s+([^\\]]+)`));
        const contentMatch = match.match(new RegExp(`\\]([\\s\\S]*?)\\[\\/${shortcodeTag}\\]`)); // Dynamic closing tag

        const parsedAttributes = attrMatch && attrMatch[1]
            ? (attrs(attrMatch[1]) as unknown as ShortcodeMatches["attributes"]) 
            : { named: {}, numeric: [] };

        const numericAttributes = (parsedAttributes.numeric || []).map((value) => {
            if (typeof value === "string") {
                const numberValue = parseFloat(value);
                return isNaN(numberValue) ? 0 : numberValue;
            }
            return value;
        });

        const innerContent = contentMatch ? contentMatch[1] : "";

        parsedMatches.push({
            attributes: {
                named: parsedAttributes.named,
                numeric: numericAttributes,
            },
            content: innerContent,
        });
    });

    return parsedMatches;
};

const transforms = {
    from: [
        {
            type: "shortcode",
            tag: "collapsibles",
            attributes: {
                hstart: {
                    type: "integer",
                    shortcode: (attributes: { named: { hstart?: number } }) => {
                        return attributes.named.hstart || 2;
                    },
                },
            },
            priority: 1,
            transform: (attributes: any, data: any): BlockInstance[] => {
                console.log("attributes: ", attributes);
                console.log("data: ", data);
                console.log("content: ", data.shortcode.content);

                const exampleContent = data.shortcode.content || "";

                const collapseExample = parseShortcodeMatches("collapse", exampleContent);
                console.log("The collapse example: ");
                console.log(collapseExample);
                console.log("The value fed to parseShortcodeMatches: ");
                console.log(collapseExample[0].content);
                
                console.log("The parsed accordion : ");
                const accordionExample = parseShortcodeMatches("accordion", collapseExample[0].content);
                console.log(accordionExample);

                const exampleAccordion = `[accordion]
                    [accordion-item title="Beispiel 2"]
                    Etwas Text
                    [/accordion-item]
                    [accordion-item title="Beispiel 3"]
                    Etwas Text
                    [/accordion-item]
                    [/accordion]
                    `;

                console.log("The modified accordion parsed :")
                console.log(parseShortcodeMatches("accordion", exampleAccordion));

                return [];
            },
        },
    ],
} as any;

export default transforms;