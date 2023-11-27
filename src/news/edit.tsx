// Imports from WordPress libraries
import {
  useBlockProps,
  InnerBlocks,
  BlockControls,
  InspectorControls,
} from "@wordpress/block-editor";

import ServerSideRender from "@wordpress/server-side-render";

import {
  PanelBody,
  TextControl,
  RangeControl,
  SelectControl,
} from "@wordpress/components";

import { __ } from "@wordpress/i18n";
import { useState, useEffect } from "@wordpress/element";
import { symbol } from "@wordpress/icons";
import { CategorySelectorControl } from "../components/TaxonomySelector";
import { CustomQueryControls } from "../components/QueryControls";

/**
 * Interface representing the properties for the Edit component.
 *
 * @interface EditProps
 * @property {Object} attributes - The block attributes.
 */
interface EditProps {
  blockProps: string[];
  attributes: {
    title: string;
    num: number;
    columns: number;
    type: string;
    cat: string;
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

  const title = attributes.title || "";

  return (
    <div {...props}>
      <InspectorControls>
        <PanelBody title={__("Settings", "rrze-elements")} initialOpen={true}>
          <TextControl
            label="Title"
            value={title}
            onChange={(value) => setAttributes({ title: value })}
          />
          <CustomQueryControls
            attributes={{
              cat: attributes.cat,
              num: attributes.num,
            }}
            setAttributes={setAttributes}
          />
        </PanelBody>
      </InspectorControls>
      <ServerSideRender
        block="rrze-elements/block-blueprint"
        attributes={{
          title: title,
          num: attributes.num,
          cat: attributes.cat,
          columns: 3,
          type: "cols_3-1",
        }}
      />
    </div>
  );
}
