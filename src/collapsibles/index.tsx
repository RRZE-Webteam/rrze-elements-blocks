/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from "@wordpress/blocks";
import { createBlock } from "@wordpress/blocks";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor. All other files
 * get applied to the editor only.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * Internal dependencies
 */
import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";
import iconJson from "../components/assets/fontawesome/fontawesomeIconNames.json";
import deprecated from "./deprecated";

/**
 * Helper Functions
 */
function validateIcon(iconStr: string) {
  // Splitting the string to see if it has a prefix.
  if (iconStr === undefined) return "";

  const parts = iconStr.split(" ");

  let prefix, iconName;

  if (parts.length === 1) {
    // If only icon name is provided, use "solid" as the default prefix.
    prefix = "solid";
    iconName = parts[0];
  } else if (parts.length === 2) {
    prefix = parts[0];
    iconName = parts[1];
  } else {
    // Invalid icon string format
    return null;
  }

  if (["brands", "regular", "solid"].includes(prefix)) {
    const key: keyof typeof iconJson = prefix as any;
    if (iconJson[key].includes(iconName)) {
      return `${prefix} ${iconName}`;
    }
  }

  return "";
}

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType(
  metadata.name as any,
  {
    /**
     * Used to construct a preview for the block to be shown in the block inserter.
     */
    icon: {
      src: (
        <svg
          id="Ebene_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g opacity=".5">
            <rect
              x="75.86"
              y="131.85"
              width="360.29"
              height="142.31"
              fillRule="evenodd"
              strokeWidth="0"
            />
          </g>
          <path
            d="m81.59,109.83h348.82c3.16,0,5.73,2.57,5.73,5.73v25.16H75.86v-25.16c0-3.16,2.57-5.73,5.73-5.73Z"
            fillRule="evenodd"
            strokeWidth="0"
          />
          <rect
            x="75.86"
            y="298.32"
            width="360.28"
            height="39.9"
            rx="5.73"
            ry="5.73"
            fillRule="evenodd"
            strokeWidth="0"
          />
          <rect
            x="75.86"
            y="362.27"
            width="360.28"
            height="39.9"
            rx="5.73"
            ry="5.73"
            fillRule="evenodd"
            strokeWidth="0"
          />
        </svg>
      ),
    },
    /**
     * @see ./edit.js
     */
    edit: Edit,

    /**
     * @see ./save.js
     */
    save,
    deprecated,
    transforms: {
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
          transform: (attributes: any, data: any) => {
            let blocks = [];
            const globalInnerBlocks: any[] = [];

            const cleanData = data.shortcode?.content.replace(/<\/?p>/g, "");
            const regexCollapse =
              /\[collapse(?=\s)((?:\s+\w+=(?:'[^']*'|"[^"]*"|“[^”]*”))*)\]([\s\S]*?)\[\/collapse\]/g;
            const matchesCollapseContent = [
              ...cleanData.matchAll(regexCollapse),
            ];
            let titleStore: { title: string; type: string; level: number; items?: any[] }[] = [];
            console.log(data);
            const originalContent = data?.content || "";

            matchesCollapseContent.forEach((match, collapseIndex) => {
              const collapseAttributesString = match[1];
              const attributesRegex = /(\w+)="([^"]*)"/g;
              let attributeMatches;
              let collapseAttributes: { [key: string]: string } = {};
              while (
                (attributeMatches = attributesRegex.exec(
                  collapseAttributesString
                )) !== null
              ) {
                const key = attributeMatches[1];
                const value = attributeMatches[2];
                collapseAttributes[key] = value;
              }

              const contentInsideCollapse = match[2].trim();

              let collapseInnerBlocks: any[] = [];
              let accordionTitles: { title: string; type: string; level: number }[] = [];

              const accordionRegex =
                /\[accordion(?=\s|\])(?:\s+\w+="[^"]*")*\]([\s\S]*?)\[\/accordion\]/g;
              const splitContents = contentInsideCollapse.split(accordionRegex);
              splitContents.forEach((splitContent: string, index: number) => {
                if (index % 2 === 0) {
                  // This should be freeform content outside of the accordions
                  if (splitContent.trim()) {
                    collapseInnerBlocks.push(
                      createBlock("core/freeform", {
                        content: splitContent.trim(),
                      })
                    );
                  }
                } else {
                  // This should be content inside an accordion
                  const accordionItemsRegex =
                    /\[accordion-item(?=\s)((?:\s+\w+=(?:'[^']*'|"[^"]*"|“[^”]*”))*)\]([\s\S]*?)\[\/accordion-item\]/g;
                  const accordionItemMatches = [
                    ...splitContent.matchAll(accordionItemsRegex),
                  ];

                  let innerAccordionBlocks: any = [];

                  accordionItemMatches.forEach((accordionItem, accordionIndex) => {
                    const accordionAttributesString = accordionItem[1];
                    const accordionContent = accordionItem[2].trim();

                    const accordionAttributeMatches =
                      accordionAttributesString.match(
                        /(\w+)=('[^']*'|"[^"]*"|“[^”]*”)/g
                      );
                    let accordionAttributes: { [key: string]: string } = {};

                    accordionAttributeMatches?.forEach((attr) => {
                      const [key, fullValue] = attr.split("=");
                      const actualValue = fullValue.slice(1, -1);
                      accordionAttributes[key] = actualValue; // <-- Populate the object correctly
                    });

                    accordionTitles.push(
                      {
                        title: accordionAttributes.title || "No title detected",
                        type: "accordion",
                        level: 2
                      }
                    );

                    innerAccordionBlocks.push(
                      createBlock(
                        "rrze-elements/accordion",
                        { title: accordionAttributes.title || "Enter a title" },
                        [
                          createBlock("core/freeform", {
                            content: accordionContent,
                          }),
                        ]
                      )
                    );
                  });

                  if (innerAccordionBlocks.length) {
                    collapseInnerBlocks.push(
                      createBlock(
                        "rrze-elements/accordions",
                        {},
                        innerAccordionBlocks
                      )
                    );
                  }
                }
              });

              const colorChoice = (color: string) => {
                switch (color) {
                  case "tf":
                    return "tf";
                  case "nat":
                    return "nat";
                  case "phil":
                    return "phil";
                  case "med":
                    return "med";
                  case "rw":
                    return "rw";
                  default:
                    return "";
                }
              };

              titleStore.push({
                title: collapseAttributes.title || `Collapse #${collapseIndex + 1}`,
                type: "collapse",
                level: 1,
                items: accordionTitles,
              });

              globalInnerBlocks.push(
                createBlock(
                  "rrze-elements/collapse",
                  {
                    title: collapseAttributes.title || "Enter a title",
                    color: colorChoice(collapseAttributes.color),
                    jumpName: collapseAttributes.name || "",
                    icon: validateIcon(collapseAttributes.icon) || "",
                  },
                  collapseInnerBlocks
                )
              );
            });

            const hstart = parseInt(attributes.named.hstart, 10) || 2;
            blocks.push(
              createBlock(
                "rrze-elements/collapsibles",
                { hstart: hstart },
                globalInnerBlocks
              )
            );

            // Create the list of titles with bullet points
            const formatTitles = (items: any[], level = 0): string =>
              items
                .map((item) => `${'  '.repeat(level)}• ${item.title}\n${item.items ? formatTitles(item.items, level + 1) : ''}`)
                .join("");

            const titleList: string = formatTitles(titleStore);

            // Ask user if they want to proceed and show the array of titles as bullet points
            const proceed: boolean = confirm(
              `Do you want to proceed with the following titles:\n\n${titleList}`
            );

            if (!proceed) {
              // else return it in a freeformblock
              // empty blocks
              blocks = [];
              blocks.push(
                createBlock("core/freeform", {
                  content: originalContent,
                })
              );
            }

            return blocks;
          },
        },
      ],
    },
  } as any
);
