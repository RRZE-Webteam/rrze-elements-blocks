import { createBlock, BlockInstance } from "@wordpress/blocks";
import iconJson from "../../components/assets/fontawesome/fontawesomeIconNames.json";
import { __ } from "@wordpress/i18n";

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

  // Name of the block, e.g. 'rrze-elements/collapse' or 'rrze-elements/accordion'
  const { name, attributes, innerBlocks } = block;

  // If it's a collapse block, read `title` attribute and convert to a heading
  if (name === 'rrze-elements/collapse') {
    const { title } = attributes as { title?: string };
    if (title) {
      output.push(
        createBlock('core/heading', { content: title })
      );
    }
    // Recursively flatten all children
    innerBlocks.forEach((child) => {
      output.push(...flattenBlockToHeadingsAndInnerBlocks(child));
    });

    return output;
  }

  // If it's an accordions container
  if (name === 'rrze-elements/accordions') {
    // Usually rrze-elements/accordions has multiple accordion children
    innerBlocks.forEach((accordionBlock) => {
      output.push(...flattenBlockToHeadingsAndInnerBlocks(accordionBlock));
    });
    return output;
  }

  // If it's a single accordion block (similar to collapse)
  if (name === 'rrze-elements/accordion') {
    const { title } = attributes as { title?: string };
    if (title) {
      output.push(
        createBlock('core/heading', { content: title })
      );
    }
    // Flatten any inner blocks inside this accordion
    innerBlocks.forEach((child) => {
      output.push(...flattenBlockToHeadingsAndInnerBlocks(child));
    });

    return output;
  }

  // If it's some other generic block, we simply replicate it as-is
  // (or transform it further if desired).
  // If you want truly raw flattening, just push it to output.
  // But if that block also has inner blocks, you might want to flatten those too.
  // If you do NOT want recursion for normal blocks, just push it directly:
  //   output.push(block);
  // But here's a version that also recursively flattens their children:
  if (innerBlocks?.length) {
    // The block has children, so let's replicate it but flatten the children
    const flattenedChildren: BlockInstance[] = [];
    innerBlocks.forEach((child) => {
      flattenedChildren.push(...flattenBlockToHeadingsAndInnerBlocks(child));
    });

    // Return both the top-level block (minus children) and the flattened children,
    // or just the children. Up to your design. For a truly "flattened" approach,
    // we might skip the wrapper block entirely and push only children. But that
    // would lose the block's attributes. Alternatively, replicate the block with
    // the flattened children as `innerBlocks`.
    output.push(createBlock(
      name,
      attributes,
      flattenedChildren
    ));
  } else {
    // No innerBlocks, just push the block as is
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