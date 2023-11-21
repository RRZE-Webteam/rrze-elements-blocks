import { registerBlockType } from "@wordpress/blocks";
import "./editor.scss";
import { __, sprintf } from "@wordpress/i18n";

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
registerBlockType(metadata.name, {
  edit: Edit,
  save,
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
  __experimentalLabel: (attributes, { context }) => {
    const { title, hstart } = attributes;

    // In the list view, use the block's title as the label.
    // If the title is empty, fall back to the default label.
    if (context === "list-view" && title) {
      return title;
    }

    if (context === "accessibility") {
      return !title || title.length === 0
        ? sprintf(
            /* translators: accessibility text. %s: heading level. */
            __("Level %s. Empty."),
            hstart
          )
        : sprintf(
            /* translators: accessibility text. 1: heading level. 2: heading title. */
            __("Level %1$s. %2$s"),
            hstart,
            title
          );
    }
  },
});
