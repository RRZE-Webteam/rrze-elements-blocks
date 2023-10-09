import { useEffect } from "@wordpress/element";
import {
  useBlockProps,
  InnerBlocks,
  InspectorControls,
  BlockControls,
} from "@wordpress/block-editor";
import { PanelBody, Toolbar, ToolbarDropdownMenu } from "@wordpress/components";
import { isEqual } from "lodash";
import { useSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";
import {
  headingLevel2,
  headingLevel3,
  headingLevel4,
  headingLevel5,
  headingLevel6,
} from "@wordpress/icons";
import ExpandAllLink from "./InspectorControls/ExpandAllLink";
import {
  HeadingSelector,
  HeadingSelectorInspector,
} from "./InspectorControls/HeadingSelector";

/**
 * Retrieve all blocks, including nested ones.
 * 
 * @param {Array} blocks - List of top-level blocks.
 * @returns {Array} - List of all blocks, including nested ones.
 */
const getAllBlocksRecursively = (blocks: WPBlock[]) => {
  let result = [...blocks];

  blocks.forEach(block => {
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
  },
  clientId?: string;
};

export default function Edit({
  attributes,
  setAttributes,
  ...ownProps
}: SaveProps) {
  const props = useBlockProps();
  const { sameBlockCount, previousBlockIds, hstart } = attributes;

  const { selectedBlock, numberChildren, blockIndex, previousBlockClients } =
    useSelect(
      (select) => {
        const { getBlock, getBlocks, getBlockIndex } = select(
          "core/block-editor"
        ) as {
          getBlock: Function;
          getBlocks: Function;
          getBlockIndex: Function;
        };
        const selectedBlockClientId = ownProps.clientId;
        let numberChildren = getBlocks(selectedBlockClientId).length;
        getBlocks(selectedBlockClientId).forEach((block: WPBlock) => {
          if (block?.innerBlocks.length !== 0)
            block?.innerBlocks.forEach((innerBlock) => {
              //console.log(innerBlock);
              if (innerBlock?.name === "rrze-elements/accordions") {
                numberChildren =
                  numberChildren + innerBlock.attributes.childrenCount;
              }
            });
          // console.log("block", block.innerBlocks);
        });

        const blockIndex = getBlockIndex(selectedBlockClientId);
        const topLevelBlocks = getBlocks();
        const allBlocks = getAllBlocksRecursively(topLevelBlocks);
        //  console.log(allBlocks);

        const CollapsiblesBlockClientIds = allBlocks
          .filter((block: WPBlock) => block.name === "rrze-elements/collapsibles")
          .map((block: WPBlock) => block.clientId);

        const currentBlockIndex = CollapsiblesBlockClientIds.indexOf(
          selectedBlockClientId
        );
        const previousBlockClients = CollapsiblesBlockClientIds.slice(
          0,
          currentBlockIndex
        );

        return {
          selectedBlock: getBlock(selectedBlockClientId),
          numberChildren,
          blockIndex,
          previousBlockClients,
        };
      },
      [ownProps.clientId]
    );

  useEffect(() => {
    if (attributes.childrenCount !== numberChildren) {
      setAttributes({ childrenCount: numberChildren });
    }
  }, [numberChildren, setAttributes, attributes.childrenCount]);

  useEffect(() => {
    if (!isEqual(attributes.previousBlockIds, previousBlockClients)) {
      setAttributes({ previousBlockIds: previousBlockClients });
    }
  }, [previousBlockClients, setAttributes, attributes.previousBlockClients]);

  return (
    <>
      <div {...props}>
        <BlockControls controls>
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
        <div className="accordion" id={`accordion-`}>
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
          {attributes.message && (
            //create a classic gutenberg block and insert the message inside it's content area
            <></>
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
    </>
  );
}
