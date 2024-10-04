// Imports from WordPress libraries
import {
  useBlockProps,
  InnerBlocks,
  BlockControls,
} from "@wordpress/block-editor";

import { __ } from "@wordpress/i18n";
import { useState, useEffect } from "@wordpress/element";
import { symbol } from "@wordpress/icons";

/**
 * Interface representing the properties for the Edit component.
 *
 * @interface EditProps
 * @property {Object} attributes - The block attributes.
 */
interface EditProps {
  blockProps: string[];
  attributes: {};
  setAttributes: (attributes: Partial<EditProps["attributes"]>) => void;
}

/**
 * Edit component for the Text-Slider block.
 *
 * Provides controls for customizing the Text-Slider-block and renders the block inside the editor.
 *
 * @param {EditProps} props - The properties passed to the component.
 * @returns {JSX.Element} The JSX representation of the component.
 */
export default function Edit({
  blockProps,
  attributes,
  setAttributes,
}: EditProps) {
  const props = useBlockProps();

  const extendedProps = {
    ...props,
    className: `slide ${props.className || ''}`
  };

  return (
   <li {...extendedProps}>
      <InnerBlocks
        template={[
          [
            "core/paragraph",
            {
              placeholder: __("Add text…", "rrze-elements-blocks"),
            },
          ],
        ]}
      />
    </li>
  );
}
