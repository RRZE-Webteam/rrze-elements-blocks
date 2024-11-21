import { registerBlockType } from "@wordpress/blocks";
import { createBlock } from "@wordpress/blocks";

import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";
import "./editor.scss";

interface ShortcodeTransformAttributes {
  named: {
    number?: string;
    title?: string;
  };
  number: string;
  content: string;
}

registerBlockType(
  metadata.name as any,
  {
    icon: {
      src: (
        <svg
          id="Ebene_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <rect
            x="60.05"
            y="115.69"
            width="112.94"
            height="280.62"
            rx="5.73"
            ry="5.73"
            fill="evenodd"
            strokeWidth="0"
          />
          <rect
            x="199.53"
            y="115.69"
            width="112.94"
            height="280.62"
            rx="5.73"
            ry="5.73"
            fill="evenodd"
            strokeWidth="0"
          />
          <rect
            x="339.01"
            y="115.69"
            width="112.94"
            height="280.62"
            rx="5.73"
            ry="5.73"
            fill="evenodd"
            strokeWidth="0"
          />
        </svg>
      ),
    },
    __experimentalLabel: (attributes: any, { context }: any) => {
      const { title } = attributes;

      // In the list view, use the block's title as the label.
      // If the title is empty, fall back to the default label.
      if (context === "list-view" && title) {
        return title;
      }
    },
    /**
     * @see ./edit.js
     */
    edit: Edit,

    /**
     * @see ./save.js
     */
    save,
    transforms: {
      from: [
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
    },
  } as any
);
