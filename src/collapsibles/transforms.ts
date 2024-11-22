import { regexp, next, attrs, ShortcodeMatch } from "@wordpress/shortcode";
import { createBlock } from "@wordpress/blocks";
import { BlockInstance } from "@wordpress/blocks";

/**
 * Utility function to strip HTML tags from a string.
 * You can enhance this function as needed.
 */
function stripHTML(html: string): string {
	const div = document.createElement("div");
	div.innerHTML = html;
	return div.textContent || div.innerText || "";
}

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

                const collabsibleData: any = [];

                const exampleContent = data.shortcode.content || "";

                console.log("Parser started");
                const matchRegex: RegExp = regexp("collapse");
                console.log("matchRegex: ", matchRegex);

                const matches: RegExpExecArray = matchRegex.exec(exampleContent);
                console.log("matches: ", matches);

                const matchedMatches: string[] =
                    exampleContent.match(matchRegex) || [];
                console.log("matchedMatches: ");
                console.log(matchedMatches);

                // Iterate over each match to extract and log attributes
                matchedMatches.forEach((match, index) => {
                    console.log(`Processing match #${index + 1}:`, match);

                    // Extract the attributes string from the match
                    const attrMatch = match.match(/collapse\s+([^\]]+)/);
                    const contentMatch = match.match(/\]([\s\S]*?)\[\/collapse\]/);

                    if (attrMatch && attrMatch[1]) {
                        const attributeString = attrMatch[1];
                        console.log("Raw attribute string:", attributeString);

                        // Parse the attributes using `attrs()`
                        const parsedAttributes = attrs(attributeString);
                        console.log("Parsed attributes:", parsedAttributes);

                        const content = contentMatch ? contentMatch[1] : '';
                        console.log("Inner content:", content); // maybe remove p-tags...?

                        // Push extracted data into array
                        collabsibleData.push({
                            attributes: parsedAttributes,
                            content: content, // Optionally strip HTML
                        });
                    } else {
                        console.log(`No attributes found for match #${index + 1}`);
                    }
                });


                console.log("Extracted Collapsibles Data:", collabsibleData);

                return [];
            },
        },
    ],
} as any;

export default transforms;