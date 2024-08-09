// Imports from WordPress libraries
import {
  useBlockProps,
  InnerBlocks,
  BlockControls,
} from "@wordpress/block-editor";
import {
  Placeholder
} from "@wordpress/components";

import { __ } from "@wordpress/i18n";
import { useState, useEffect } from "@wordpress/element";
import { symbol } from "@wordpress/icons";
import { AlignmentBar } from "../components/Alignment";

/**
 * Interface representing the properties for the Edit component.
 *
 * @interface EditProps
 * @property {Object} attributes - The block attributes.
 */
interface EditProps {
  blockProps: string[];
  attributes: {
    alignment: string;
  };
  setAttributes: (attributes: Partial<EditProps["attributes"]>) => void;
}

/**
 * Edit component for the Insertion block.
 *
 * Provides controls for customizing the Insertion-block and renders the block inside the editor.
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
  const alignment = attributes.alignment;

  return (
    <>
      <div {...props}>
        <BlockControls>
          <AlignmentBar
            attributes={{ alignment }}
            setAttributes={setAttributes}
          />
        </BlockControls>
        <aside className={`pull-${alignment} ${props?.className}`}>
          <InnerBlocks
            allowedBlocks={[
              "core/paragraph",
              "core/heading",
              "core/list",
              "core/image",
            ]}
            template={[
              [
                "core/paragraph",
                { placeholder: __("Insertion", "rrze-elements-b") },
              ],
            ]}
          />
        </aside>
      </div>
    </>
  );
}
