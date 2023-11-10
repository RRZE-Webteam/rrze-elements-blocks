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
import iconJson from "../components/fontawesomeIconNames.json";

type SaveProps = {
  attributes: {
    hstart: number;
  };
};

/**
 * Helper Functions
 */
function validateIcon(iconStr: string) {
  // Splitting the string to see if it has a prefix.
  if (iconStr === undefined) return "";

  const parts = iconStr.split(" ");

  let prefix, iconName;

  if (parts.length === 1) {
    // If only icon name is provided, use "solid" as the default prefix.
    prefix = "solid";
    iconName = parts[0];
  } else if (parts.length === 2) {
    prefix = parts[0];
    iconName = parts[1];
  } else {
    // Invalid icon string format
    return null;
  }

  if (["brands", "regular", "solid"].includes(prefix)) {
    const key: keyof typeof iconJson = prefix as any;
    if (iconJson[key].includes(iconName)) {
      return `${prefix} ${iconName}`;
    }
  }

  return "";
}

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
      src: "align-center",
      background: "#00458c",
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
