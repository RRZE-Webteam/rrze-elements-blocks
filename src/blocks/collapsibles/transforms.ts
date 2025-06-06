import { createBlock, BlockInstance } from "@wordpress/blocks";
import iconJson from "../../components/assets/fontawesome/fontawesomeIconNames.json";
import { __ } from "@wordpress/i18n";
import { sanitizeTitleToJumpName as sanitizeJumpName } from "../../utility/utils";

interface CollapseBlockAttributes {
  title: string;
}

interface CollapsiblesBlockAttributes {
  // Define the attributes for rrze-elements/collapsibles if needed
}

/**
 * Helper Functions
 */
function flattenBlockToHeadingsAndInnerBlocks(block: BlockInstance): BlockInstance[] {
  const output: BlockInstance[] = [];
  const { name, attributes, innerBlocks } = block;

  if (name === 'rrze-elements/collapse') {
    const { title } = attributes as { title?: string };
    if (title) {
      output.push(
        createBlock('core/heading', { content: title })
      );
    }
      innerBlocks.forEach((child) => {
      output.push(...flattenBlockToHeadingsAndInnerBlocks(child));
    });

    return output;
  }

  if (name === 'rrze-elements/accordions') {
    innerBlocks.forEach((accordionBlock) => {
      output.push(...flattenBlockToHeadingsAndInnerBlocks(accordionBlock));
    });
    return output;
  }

  if (name === 'rrze-elements/accordion') {
    const { title } = attributes as { title?: string };
    if (title) {
      output.push(
        createBlock('core/heading', { content: title })
      );
    }
    innerBlocks.forEach((child) => {
      output.push(...flattenBlockToHeadingsAndInnerBlocks(child));
    });

    return output;
  }

  if (innerBlocks?.length) {
    const flattenedChildren: BlockInstance[] = [];
    innerBlocks.forEach((child) => {
      flattenedChildren.push(...flattenBlockToHeadingsAndInnerBlocks(child));
    });
    output.push(createBlock(
      name,
      attributes,
      flattenedChildren
    ));
  } else {
    output.push(block);
  }

  return output;
}

function validateIcon(iconStr: string) {
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

function sanitizeTitle(title: string) {
  // Removes all html tags
  let sanitized = title.replace(/<\/?[^>]+(>|$)/g, "");

  sanitized = sanitized.replace(/&nbsp;/g, " ");
  sanitized = sanitized.replace(/&amp;/g, "&");

  return sanitized;
}

const transforms = {
  from: [
    {
      type: 'block' as const,
      isMultiBlock: true,
      blocks: ['*'],
      isMatch: (_attributes: any, blocks: any) => {
        return !blocks.some((block: any) => block.name === 'rrze-elements/collapsibles');
      },

      __experimentalConvert: (blocks: BlockInstance[]) => {
        const collapses: BlockInstance[] = [];

        let currentCollapseBlocks: BlockInstance[] = [];
        let currentTitle = __("Untitled Collapse", "rrze-elements-blocks");

        blocks.forEach((block, index) => {
          if (block.name === 'core/heading') {
            if (currentCollapseBlocks.length) {
              collapses.push(
                createBlock<CollapseBlockAttributes>(
                  'rrze-elements/collapse',
                  { title: currentTitle },
                  currentCollapseBlocks
                )
              );
              currentCollapseBlocks = [];
            }
            currentTitle = (block.attributes as any).content || `Collapse #${index + 1}`;
          } else {
            currentCollapseBlocks.push(
              createBlock(
                block.name,
                block.attributes,
                block.innerBlocks
              )
            );
          }
        });

        if (currentCollapseBlocks.length) {
          collapses.push(
            createBlock<CollapseBlockAttributes>(
              'rrze-elements/collapse',
              { title: currentTitle },
              currentCollapseBlocks
            )
          );
        }

        return createBlock<CollapsiblesBlockAttributes>(
          'rrze-elements/collapsibles',
          {},
          collapses
        );
      },
    },
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
              if (splitContent.trim()) {
                collapseInnerBlocks.push(
                  createBlock("core/freeform", {
                    content: splitContent.trim(),
                  })
                );
              }
            } else {
              const accordionItemsRegex =
                /\[accordion-item(?=\s)((?:\s+\w+=(?:'[^']*'|"[^"]*"|“[^”]*”))*)\]([\s\S]*?)\[\/accordion-item\]/g;
              const accordionItemMatches = [
                ...splitContent.matchAll(accordionItemsRegex),
              ];

              let innerAccordionBlocks: any = [];

              accordionItemMatches.forEach((accordionItem) => {
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
                  accordionAttributes[key] = actualValue;
                });

                accordionTitles.push(
                  {
                    title: sanitizeTitle(accordionAttributes.title || "No title detected"),
                    type: "accordion",
                    level: 2
                  }
                );

                innerAccordionBlocks.push(
                  createBlock(
                    "rrze-elements/accordion",
                    { title: sanitizeTitle(accordionAttributes.title || "Enter a title")},
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
            title: sanitizeTitle(collapseAttributes.title || `Collapse #${collapseIndex + 1}`),
            type: "collapse",
            level: 1,
            items: accordionTitles,
          });

          globalInnerBlocks.push(
            createBlock(
              "rrze-elements/collapse",
              {
                title: sanitizeTitle(collapseAttributes.title || "Enter a title"),
                color: colorChoice(collapseAttributes.color),
                jumpName: sanitizeJumpName(collapseAttributes.name || ""),
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

        const formatTitles = (items: any[], level = 0): string =>
          items
            .map((item) => `${'  '.repeat(level)}• ${item.title}\n${item.items ? formatTitles(item.items, level + 1) : ''}`)
            .join("");

        const titleList: string = formatTitles(titleStore);

        // Ask user if they want to proceed and show the array of titles as bullet points
        const proceed: boolean = confirm(
          `Wichtiger Hinweis\n\nBitte überprüfen Sie Ihre Akkordeonstruktur, um sicherzustellen, dass alle Elemente vorhanden sind.\n\n${titleList}\n\nBestätigen Sie mit Ok, damit die Umwandlung in einen Block durchgeführt wird.`
        );

        if (!proceed) {
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
  to: [
    {
      type: 'block' as const,
      blocks: ['core/paragraph'], // or '*' if you prefer
      transform: (
        collapsiblesAttributes: CollapsiblesBlockAttributes,
        collapsiblesInnerBlocks: BlockInstance[]
      ): BlockInstance[] => {
        const output: BlockInstance[] = [];

        // For each collapse/accordion child inside collapsibles, flatten
        for (const childBlock of collapsiblesInnerBlocks) {
          const flattened = flattenBlockToHeadingsAndInnerBlocks(childBlock);
          output.push(...flattened);
        }

        return output;
      },
    },
  ],
} as any;

export default transforms;
