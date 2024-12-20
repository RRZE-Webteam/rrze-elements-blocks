import { createBlock, BlockInstance } from "@wordpress/blocks";

const transforms = {
  from: [
    {
      type: 'block' as const,
      isMultiBlock: true,
      blocks: ["core/paragraph"],
      isMatch: (_attributes: any, blocks: any) => {
        return !blocks.some((block: any) => block.name === 'rrze-elements/insertion');
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
          'rrze-elements/insertion',
          {},
          columns
        );
      },
    },
  ],
  to: [
    {
      type: 'block' as const,
      blocks: ['core/paragraph'],
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
