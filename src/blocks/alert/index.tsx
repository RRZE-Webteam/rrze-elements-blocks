import { registerBlockType } from "@wordpress/blocks";
import { InnerBlocks } from "@wordpress/block-editor";

import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";
import deprecated from "./deprecated";
import transforms from "./transforms";
import "./editor.scss";


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
          <rect
            x="75.86"
            y="231.31"
            width="360.28"
            height="49.39"
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
    save: () => <InnerBlocks.Content />,
    transforms,
    deprecated
  } as any,
);
