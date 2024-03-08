// Imports from WordPress libraries
import {
  useBlockProps,
  InnerBlocks,
  BlockControls,
  RichText
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
  attributes: {
    title: number;
    description: string;
    buttonText: string;
  };
  setAttributes: (attributes: Partial<EditProps["attributes"]>) => void;
}

/**
 * Edit component for the Blueprint block.
 *
 * Provides controls for customizing the Blueprint-block and renders the block inside the editor.
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

  const onChangeTitle = (title: string) => {
    setAttributes({ title: parseInt(title) });
  };

  return (
    <div {...props}>
      <div className="fauCustomResearchHighlightBox">
        <dl className="rrze-elements-counter">
          <dt>
              <RichText tagName="span" value={attributes.title.toString()} onChange={onChangeTitle} allowedFormats={[]} className="fau-counter-data" />
          </dt>
          <dd>
          <RichText tagName="span" value={attributes.description} onChange={(description) => setAttributes({ description })} allowedFormats={[]} className="fau-counter-data" />
            <br />
            <a
              className="standard-btn ghost-btn"
            >
              <RichText tagName="span" value={attributes.buttonText} onChange={(buttonText) => setAttributes({ buttonText })} allowedFormats={[]} className="fau-counter-data" />
            </a>
          </dd>
        </dl>
      </div>
    </div>
  );
}
