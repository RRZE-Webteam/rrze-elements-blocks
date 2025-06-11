import { registerBlockType } from "@wordpress/blocks";
import "./editor.scss";
import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";
import deprecated from "./deprecated";
import transforms from "./transforms";
import {InnerBlocks} from "@wordpress/block-editor";

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
          <g opacity=".5">
            <rect
              x="75.86"
              y="131.85"
              width="360.29"
              height="142.31"
              fillRule="evenodd"
              strokeWidth="0"
            />
          </g>
          <path
            d="m81.59,109.83h348.82c3.16,0,5.73,2.57,5.73,5.73v25.16H75.86v-25.16c0-3.16,2.57-5.73,5.73-5.73Z"
            fillRule="evenodd"
            strokeWidth="0"
          />
          <rect
            x="75.86"
            y="298.32"
            width="360.28"
            height="39.9"
            rx="5.73"
            ry="5.73"
            fillRule="evenodd"
            strokeWidth="0"
          />
          <rect
            x="75.86"
            y="362.27"
            width="360.28"
            height="39.9"
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
    deprecated,
    transforms,
  } as any,
);
