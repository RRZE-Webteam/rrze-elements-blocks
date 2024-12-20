import { createBlock, BlockInstance } from "@wordpress/blocks";
import metadata from "./block.json";

interface ShortcodeTransformAttributes {
  named: {
    number?: string;
    title?: string;
  };
  number: string;
  content: string;
}

const transforms = {
  from: [
    {
      type: 'block' as const,
      isMultiBlock: true,
      blocks: ["*"],
      isMatch: (_attributes: any, blocks: any) => {
        return !blocks.some((block: any) => block.name === 'rrze-elements/columns');
      },

      __experimentalConvert: (blocks: BlockInstance[]) => {
        const columns: BlockInstance[] = [];

        blocks.forEach((block) => {
          columns.push(
              createBlock(
                block.name,
                block.attributes,
                block.innerBlocks
              )
            );
        });

        return createBlock<any>(
          'rrze-elements/columns',
          {},
          columns
        );
      },
    },
    {
      type: "shortcode",
      tag: "text-columns",
      transform: (attributes: ShortcodeTransformAttributes, data: any) => {
        let cleanData = data.shortcode?.content;
        const numberChoice = (number: string) => {
          return parseInt(number);
        };
        const blockContent = createBlock("core/freeform", {
          content: cleanData,
        });
        return createBlock(
          metadata.name,
          {
            numberOfColumns: numberChoice(attributes.named.number) || 2,
          },
          [blockContent]
        );
      },
    },
  ],
  to: [
    {
      type: 'block' as const,
      blocks: [ 'core/paragraph' ],
      transform: (
        attributes: any,
        innerBlocks: BlockInstance[]
      ): BlockInstance[] => {
        return innerBlocks;
      },
    },
  ],
};

export default transforms;