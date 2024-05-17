// Imports from WordPress libraries
import {
  useBlockProps,
  InnerBlocks,
  BlockControls,
} from "@wordpress/block-editor";

import { __ } from "@wordpress/i18n";
import { useState, useEffect } from "@wordpress/element";
import { symbol } from "@wordpress/icons";
import { useSelect, useDispatch } from "@wordpress/data";

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
  clientId: string;
}

type WPBlock = {
  innerBlocks: WPBlock[];
  name?: string;
  attributes?: {
    icon: any;
    svgString: any;
    childrenCount?: number;
    title?: string;
  };
  clientId?: string;
};

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
  clientId,
}: EditProps) {
  const props = useBlockProps();

  // useEffects for syncing component state and attributes
  const { innerClientIds } =
    // retrieve the inner client ids of the current block
    /**
     * Example: [Log] [{clientId: "37afef0b-dae8-4dd8-9d65-85b3e591616b", position: 0}, {clientId: "11d208de-c4fd-4b8d-84f2-80a2ca3fc7d5", position: 1}, {clientId: "14320e50-38cc-4713-a4e2-7af4fd9b9ec3", position: 2}] (3)
     */
    useSelect(
      (select) => {
        const { getBlock, getBlocks, getBlockIndex } = select(
          "core/block-editor"
        ) as {
          getBlock: Function;
          getBlocks: Function;
          getBlockIndex: Function;
        };
        const selectedBlockClientId = clientId;
        const innerBlocks = getBlocks(selectedBlockClientId);
        let counter = 0;
        const innerClientIds = innerBlocks.map((block: WPBlock) => ({
          clientId: block?.clientId,
          position: counter++,
        }));

        return {
          innerClientIds,
        };
      },
      [clientId]
    );

  return (
    <div {...props}>
      <section className="slider-wrapper">
        <button className="slide-arrow" id="slide-arrow-prev">
          &#8249;
        </button>
        <button className="slide-arrow" id="slide-arrow-next">
          &#8250;
        </button>
        <ul className="slides-container" id="slides-container">
          <InnerBlocks
            template={[
              ["rrze-elements/textslideritem"],
              ["rrze-elements/textslideritem"],
              ["rrze-elements/textslideritem"],
            ]}
            allowedBlocks={["rrze-elements/textslideritem"]}
          />
        </ul>
      </section>
    </div>
  );
}
