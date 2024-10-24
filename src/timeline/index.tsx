/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from "@wordpress/blocks";
import { createBlock } from "@wordpress/blocks";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor. All other files
 * get applied to the editor only.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * Internal dependencies
 */
import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
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
            x="199.53"
            y="-23.79"
            width="112.94"
            height="280.62"
            rx="5.73"
            ry="5.73"
            transform="translate(372.52 -139.48) rotate(90)"
            fill-rule="evenodd"
          />
          <rect
            x="199.53"
            y="115.69"
            width="112.94"
            height="280.62"
            rx="5.73"
            ry="5.73"
            transform="translate(512) rotate(90)"
            fill-rule="evenodd"
          />
          <rect
            x="199.53"
            y="255.17"
            width="112.94"
            height="280.62"
            rx="5.73"
            ry="5.73"
            transform="translate(651.48 139.48) rotate(90)"
            fill-rule="evenodd"
          />
          <line
            x1="80.6"
            y1="62.76"
            x2="80.6"
            y2="451.28"
            fill="none"
            stroke="black"
            stroke-linecap="round"
            stroke-miterlimit="10"
            stroke-width="8"
          />
          <rect
            x="66.87"
            y="73.88"
            width="27.46"
            height="27.46"
            rx="11.29"
            ry="11.29"
            fill-rule="evenodd"
          />
          <rect
            x="66.87"
            y="214.88"
            width="27.46"
            height="27.46"
            rx="11.29"
            ry="11.29"
            fill-rule="evenodd"
          />
          <rect
            x="66.87"
            y="352.85"
            width="27.46"
            height="27.46"
            rx="11.29"
            ry="11.29"
            fill-rule="evenodd"
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
    save,
  } as any
);
