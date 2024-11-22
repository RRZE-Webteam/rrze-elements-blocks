import { regexp, next, attrs, ShortcodeMatch } from "@wordpress/shortcode";
import { createBlock } from "@wordpress/blocks";
import { BlockInstance } from "@wordpress/blocks";
import { parse } from "path";

/**
 * Utility function to strip wpAutop generated HTML tags.
 */
function stripHTML(html: string): string {
    // Remove <p> and </p> tags
    let stripped = html.replace(/<\/?p>/g, "");

    // Remove <br> tags (self-closing and non-self-closing)
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
        const attrMatch = match.match(new RegExp(`${shortcodeTag}\\s+([^\\]]+)`));
        const contentMatch = match.match(/\]([\s\S]*?)\[\/collapse\]/);

        if (attrMatch && attrMatch[1]) {
            const attributeString = attrMatch[1];
            const parsedAttributes = attrs(attributeString) as unknown as ShortcodeMatches["attributes"]; // Safe cast with `unknown`

            // Safely convert numeric strings to numbers
            const numericAttributes = (parsedAttributes.numeric || []).map((value) => {
                if (typeof value === "string") {
                    const numberValue = parseFloat(value);
                    return isNaN(numberValue) ? 0 : numberValue; // Fallback to 0 if conversion fails
                }
                return value;
            });
            
            //Strip HTML tags from the inner content
            const innerContent = contentMatch ? stripHTML(contentMatch[1]) : "";

            parsedMatches.push({
                attributes: {
                    named: parsedAttributes.named,
                    numeric: numericAttributes,
                },
                content: innerContent,
            });
        }
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
                
                console.log("The parsed accordion : ");
                const accordionExample = parseShortcodeMatches("accordion", collapseExample[0].content);
                console.log(accordionExample);

                return [];
            },
        },
    ],
} as any;

export default transforms;