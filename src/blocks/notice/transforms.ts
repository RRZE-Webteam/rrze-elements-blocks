import {createBlock, BlockInstance} from "@wordpress/blocks";
import metadata from "./block.json";

interface ShortcodeAttributes {
  named: {
    style?: string;
    title?: string;
    hstart?: string;
    content?: string;
  };
  content: string;
  numeric: any[];
}

interface ShortcodeTransformAttributes {
  named: {
    style?: string;
    title?: string;
    hstart?: string;
  };
  style: string;
  hstart?: string;
  title?: string;
  content: string;
}

const transforms = {
  from: [
    {
      type: "shortcode",
      tag: ["notice-attention",
        "notice-hinweis",
        "notice-baustelle",
        "notice-question",
        "notice-minus",
        "notice-plus",
        "notice-tipp",
        "notice-download",
        "notice-faubox",
        "notice-audio",
        "notice-video",
        "notice-thumbs-up",
        "notice-thumbs-down"
      ],
      attributes: {
        style: {
          type: "string",
        },
        title: {
          type: "string",
          shortcode: (attrs: ShortcodeAttributes) => {
            return attrs.named.title || "";
          },
        },
        hstart: {
          type: "string",
          shortcode: (attrs: ShortcodeAttributes) => {
            return attrs.named.hstart || "2";
          },
        },
        content: {
          type: "string",
          shortcode: (
            attrs: ShortcodeAttributes,
            {content}: { content: string },
          ) => {
            return content;
          },
        },
      },
      transform: (attributes: ShortcodeTransformAttributes, data: any) => {

        const rawContent = data.shortcode?.content || "";
        const cleanedContent = rawContent
          // <p> und </p>
          .replace(/<\/?p>/gi, '')
          // <div> und </div>
          .replace(/<\/?div>/gi, '')
          // Remove leading and trailing line breaks
          .trim();

        const paragraphBlock = createBlock("core/paragraph", {
          content: cleanedContent,
        });

        const rawTitle = data?.shortcode.attrs.named?.title || "";
        const rawHstart = data?.shortcode.attrs.named?.hstart || "2";
        const levelMatch = rawHstart.match(/\d+/);
        const headingLevel = levelMatch ? parseInt(levelMatch[0], 10) : 2;

        let headingBlock;
        if (rawTitle.trim() !== "") {
          headingBlock = createBlock("core/heading", {
            content: rawTitle,
            level: headingLevel,
          });
        }

        const innerBlocks = [];
        if (headingBlock) {
          innerBlocks.push(headingBlock);
        }
        innerBlocks.push(paragraphBlock);

        const tag = data?.shortcode?.tag ?? "notice-hinweis";
        let finalTag;
        if (tag === "notice-tipp") {
          finalTag = "notice-idea";
        } else {
          finalTag = tag;
        }

        return createBlock(
          metadata.name,
          {
            style: finalTag,
          },
          innerBlocks
        )
      }
    },
    {
      type: 'block' as const,
      isMultiBlock: true,
      blocks: ["core/paragraph"],
      isMatch: (_attributes: any, blocks: any) => {
        return !blocks.some((block: any) => block.name === 'rrze-elements/notice');
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
          'rrze-elements/notice',
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
