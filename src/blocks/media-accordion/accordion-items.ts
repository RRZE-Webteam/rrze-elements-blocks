import type {BlockInstance} from "@wordpress/blocks";
import {__} from "@wordpress/i18n";

const ACCORDION_ITEM_BLOCKS = [
  "rrze-elements/accordion",
  "rrze-elements/collapse",
];

export interface AccordionItemAttributes {
  title?: string;
  jumpName?: string;
  mediaAccordionImageId?: number;
  mediaAccordionImageUrl?: string;
  mediaAccordionImageAlt?: string;
  mediaAccordionImageCaption?: string;
}

export interface AccordionItem {
  clientId: string;
  depth: number;
  name: string;
  attributes: AccordionItemAttributes;
}

export interface SelectedMedia {
  id?: number | string;
  url?: string;
  alt?: string;
  alt_text?: string;
  caption?: string | {
    raw?: string;
    rendered?: string;
  };
}

export const getMediaCaption = (media: SelectedMedia) => {
  if (typeof media.caption === "string") {
    return media.caption;
  }

  return media.caption?.raw ?? media.caption?.rendered ?? "";
};

const isAccordionItem = (blockName: string) =>
  ACCORDION_ITEM_BLOCKS.includes(blockName);

export const collectAccordionItems = (
  blocks: BlockInstance[],
  depth = 0,
): AccordionItem[] => {
  const items: AccordionItem[] = [];

  blocks.forEach((block) => {
    const itemBlock = isAccordionItem(block.name);

    if (itemBlock) {
      items.push({
        clientId: block.clientId,
        depth,
        name: block.name,
        attributes: block.attributes as AccordionItemAttributes,
      });
    }

    items.push(
      ...collectAccordionItems(block.innerBlocks, itemBlock ? depth + 1 : depth),
    );
  });

  return items;
};

export const getItemTitle = (item: AccordionItem, index: number) => {
  const title = item.attributes.title?.trim();
  const jumpName = item.attributes.jumpName?.trim();

  if (title) {
    return title;
  }

  if (jumpName) {
    return jumpName;
  }

  return item.name === "rrze-elements/accordion"
    ? `${__("Nested accordion item", "rrze-elements-blocks")} ${index + 1}`
    : `${__("Accordion item", "rrze-elements-blocks")} ${index + 1}`;
};
