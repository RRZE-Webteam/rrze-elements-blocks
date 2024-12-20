import { createBlock, BlockInstance } from "@wordpress/blocks";
import metadata from "./block.json";
interface ShortcodeAttributes {
  named: {
    style?: string;
    title?: string;
    color?: string;
  };
  content: string;
  numeric: any[];
}

interface ShortcodeTransformAttributes {
  named: {
    style?: string;
    title?: string;
  };
  style: string;
  content: string;
}

const transforms = {
  from: [
    {
      type: "shortcode",
      tag: "alert",
      attributes: {
        style: {
          type: "string",
          shortcode: (attrs: ShortcodeAttributes) => {
            if (
              ["success", "danger", "default", "info", "warning"].includes(
                attrs.named.style,
              )
            ) {
              return attrs.named.style;
            } else {
              return "info";
            }
          },
        },
        content: {
          type: "string",
          shortcode: (
            attrs: ShortcodeAttributes,
            { content }: { content: string },
          ) => {
            return content;
          },
        },
      },
      transform: (attributes: ShortcodeTransformAttributes, data: any) => {
        let cleanData = data.shortcode?.content;
        const styleChoice = (style: string) => {
          switch (style) {
            case "success":
              return "success";
            case "danger":
              return "danger";
            case "default":
              return "default";
            case "info":
              return "info";
            case "warning":
              return "warning";
            case "example":
              return "example";
            default:
              return "";
          }
        };
        // console.log('cleaned data:', cleanData);
        const blockContent = createBlock("core/freeform", {
          content: cleanData,
        });
        return createBlock(
          metadata.name,
          {
            style: styleChoice(attributes.named.style),
            title: attributes.named.title,
          },
          [blockContent],
        );
      },
    },
    {
      type: 'block' as const,
      isMultiBlock: true,
      blocks: ["core/paragraph"],
      isMatch: (_attributes: any, blocks: any) => {
        return !blocks.some((block: any) => block.name === 'rrze-elements/alert');
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
          'rrze-elements/alert',
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
