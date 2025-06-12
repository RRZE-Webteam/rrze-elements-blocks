import { registerBlockType } from "@wordpress/blocks";

import Edit from "./edit";
import metadata from "./block.json";
import "./editor.scss";
import transforms from "./transforms";
import deprecated from "./deprecated";
import { InnerBlocks } from "@wordpress/block-editor";

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
          <path
            d="m443.28,267.16v86.6c0,3.17-2.56,5.73-5.73,5.73H74.45c-3.16,0-5.73-2.56-5.73-5.73v-195.51c0-3.16,2.57-5.73,5.73-5.73h193.33v108.92c0,3.16,2.56,5.72,5.73,5.72h169.77Z"
            fillRule="evenodd"
            strokeWidth="0"
          />
          <rect
            x="280.49"
            y="153.81"
            width="161"
            height="100.64"
            rx="5.73"
            ry="5.73"
            fillRule="evenodd"
            opacity=".2"
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
    //* @see ./edit.js
    edit: Edit,

    // @see ./save.js
    save: () => <InnerBlocks.Content />,
    transforms,
    deprecated
  } as any,
);
