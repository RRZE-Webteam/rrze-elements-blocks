import {
  useBlockProps,
  InnerBlocks,
  InspectorControls,
  BlockControls,
  store as blockEditorStore,
} from "@wordpress/block-editor";
import { PanelBody } from "@wordpress/components";
import { useDispatch } from "@wordpress/data";
import { __ } from "@wordpress/i18n";
import ExpandAllLink from "../components/ExpandAllLink";
import {
  HeadingSelector,
  HeadingSelectorInspector,
} from "../components/HeadingSelector";

/**
 * Retrieve all blocks, including nested ones.
 *
 * @param {Array} blocks - List of top-level blocks.
 * @returns {Array} - List of all blocks, including nested ones.
 */
const getAllBlocksRecursively = (blocks: WPBlock[]) => {
  let result = [...blocks];

  blocks.forEach((block) => {
    if (block.innerBlocks && block.innerBlocks.length > 0) {
      result = [...result, ...getAllBlocksRecursively(block.innerBlocks)];
    }
  });

  return result;
};

type SaveProps = {
  attributes: {
    expandAllLink: boolean;
    sameBlockCount: number;
    previousBlockIds: string[];
    hstart: number;
    childrenCount: number;
    message: string;
    previousBlockClients: string[];
  };
  setAttributes: (newAttributes: {
    expandAllLink?: boolean;
    sameBlockCount?: number;
    previousBlockIds?: string[];
    hstart?: number;
    childrenCount?: number;
    message?: string;
    previousBlockClients?: string[];
  }) => void;
  clientId?: string;
};

type WPBlock = {
  innerBlocks: WPBlock[];
  name?: string;
  attributes?: {
    childrenCount?: number;
  };
  clientId?: string;
};

export default function Edit({
  attributes,
  setAttributes,
  ...ownProps
}: SaveProps) {
  const props = useBlockProps();
  const { __unstableMarkNextChangeAsNotPersistent } =
    useDispatch(blockEditorStore);

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
          title={__("Heading Settings", "rrze-elements-b")}
          initialOpen={true}
        >
          <HeadingSelectorInspector
            attributes={attributes}
            setAttributes={setAttributes}
          />
        </PanelBody>
        <PanelBody
          title={__("Collapsibles Settings", "rrze-elements-b")}
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
              {__("Expand All", "rrze-elements-b")}
            </button>
          </div>
        )}
        <InnerBlocks
          allowedBlocks={["rrze-elements/collapse"]}
          template={[
            ["rrze-elements/collapse", {}],
            ["rrze-elements/collapse", {}],
          ]}
        />
      </div>
    </div>
  );
}
