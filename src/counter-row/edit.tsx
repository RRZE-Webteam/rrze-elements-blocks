// Imports from WordPress libraries
import {
  useBlockProps,
  InnerBlocks,
  BlockControls,
  InspectorControls
} from "@wordpress/block-editor";

import { PanelBody, RangeControl } from "@wordpress/components";

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
    stagger: number;
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

  const onChangeStagger = (stagger: number) => {
    setAttributes({ stagger });
  };

  return (
    <div {...props}>
      <section className="fauCustomResearchHighlights">
        <InspectorControls>
          <PanelBody title={__("Counter Row Settings")}>
            <RangeControl
              label="Automatic marks"
              marks
              max={0.5}
              min={0}
              onBlur={function noRefCheck() {}}
              onChange={onChangeStagger}
              onFocus={function noRefCheck() {}}
              onMouseLeave={function noRefCheck() {}}
              onMouseMove={function noRefCheck() {}}
              step={0.05}
            />
          </PanelBody>
        </InspectorControls>
        <InnerBlocks allowedBlocks={["rrze-elements/rrze-counter"]} />
      </section>
    </div>
  );
}
