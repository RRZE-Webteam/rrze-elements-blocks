import {
  useBlockProps,
  InnerBlocks,
  InspectorControls,
  BlockControls,
  store as blockEditorStore,
} from "@wordpress/block-editor";
import { PanelBody } from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";
import ExpandAllLink from "../../components/ExpandAllLink";
import {
  HeadingSelector,
  HeadingSelectorInspector,
} from "../../components/HeadingSelector";
import { useEffect } from "@wordpress/element";

/**
 * Retrieve all blocks, including nested ones.
 *
 * @param blocks  - List of top-level blocks.
 * @returns       - List of all blocks, including nested ones.
 */

type SaveProps = {
  attributes: {
    expandAllLink: boolean;
    hstart: number;
    expandLabel: string;
  };
  setAttributes: (newAttributes: {
    expandAllLink?: boolean;
    hstart?: number;
    expandLabel?: string;
  }) => void;
  clientId: string;
};

export default function Edit({
  attributes,
  setAttributes,
  clientId,
}: SaveProps) {
  const props = useBlockProps();
  const isMediaAccordionChild = useSelect((select) => {
    const {getBlockName, getBlockRootClientId} = select(blockEditorStore);
    const parentClientId = getBlockRootClientId(clientId);

    return parentClientId
      ? getBlockName(parentClientId) === "rrze-elements/media-accordion"
      : false;
  }, [clientId]);

  useEffect(() => {
    setAttributes({
      expandLabel: __("Expand All", "rrze-elements-blocks"),
    })
  }, []);

  return (
    <div {...props}>
      <BlockControls>
        <HeadingSelector
          attributes={attributes}
          setAttributes={setAttributes}
        />
      </BlockControls>
      <InspectorControls>
        <PanelBody
          title={__("Heading Settings", "rrze-elements-blocks")}
          initialOpen={true}
        >
          <HeadingSelectorInspector
            attributes={attributes}
            setAttributes={setAttributes}
          />
        </PanelBody>
        <PanelBody
          title={__("Collapsibles Settings", "rrze-elements-blocks")}
          initialOpen={true}
        >
          <ExpandAllLink
            attributes={attributes}
            setAttributes={setAttributes}
          />
        </PanelBody>
      </InspectorControls>
      <div className="accordion">
        {attributes.expandAllLink && (
          <div className="button-container-right">
            <button
              className="expand-all standard-btn primary-btn xsmall-btn"
              data-status="closed"
            >
              {__("Expand All", "rrze-elements-blocks")}
            </button>
          </div>
        )}
        <InnerBlocks
          allowedBlocks={["rrze-elements/collapse"]}
          templateLock={isMediaAccordionChild ? false : undefined}
          template={[
            ["rrze-elements/collapse", {}],
            ["rrze-elements/collapse", {}],
          ]}
        />
      </div>
    </div>
  );
}
