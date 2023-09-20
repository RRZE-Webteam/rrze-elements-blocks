import { useEffect } from "@wordpress/element";
import { useBlockProps, InnerBlocks, InspectorControls } from "@wordpress/block-editor";
import { isEqual } from 'lodash';
import { withSelect, useDispatch, useSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";
import ExpandAllLink from "./InspectorControls/ExpandAllLink";
import {
  PanelBody,
  BaseControl,
  __experimentalText as Text,
  __experimentalDivider as Divider,
  __experimentalHeading as Heading,
  __experimentalSpacer as Spacer,
} from "@wordpress/components";

export default function Edit({ attributes, setAttributes, ...ownProps }) {
  const props = useBlockProps();
  const { sameBlockCount, previousBlockIds } = attributes;

  const {
    selectedBlock,
    numberChildren,
    blockIndex,
    previousBlockClients
  } = useSelect((select) => {
    const { getBlock, getBlocks, getBlockIndex } = select("core/block-editor");
    const selectedBlockClientId = ownProps.clientId;
    let numberChildren = getBlocks(selectedBlockClientId).length;
    getBlocks(selectedBlockClientId).forEach((block) => {
      if (block?.innerBlocks.length !== 0 )
      block?.innerBlocks.forEach((innerBlock) => {
      //console.log(innerBlock);
        if (innerBlock?.name === 'rrze-elements/accordions') {
          numberChildren = numberChildren + innerBlock.attributes.childrenCount;
        }})
      // console.log("block", block.innerBlocks);
    });

    const blockIndex = getBlockIndex(selectedBlockClientId);
    const allBlocks = getBlocks();

    const CollapsiblesBlockClientIds = allBlocks
      .filter(block => block.name === 'rrze-elements/collapsibles')
      .map(block => block.clientId);
  
    const currentBlockIndex = CollapsiblesBlockClientIds.indexOf(selectedBlockClientId);
    const previousBlockClients = CollapsiblesBlockClientIds.slice(0, currentBlockIndex);
  
    return {
      selectedBlock: getBlock(selectedBlockClientId),
      numberChildren,
      blockIndex,
      previousBlockClients
    };
  }, [ownProps.clientId]);

  useEffect(() => {
    if(attributes.childrenCount !== numberChildren) {
        setAttributes({ childrenCount: numberChildren });
    }
  }, [numberChildren, setAttributes, attributes.childrenCount]);

  useEffect(() => {
    if(!isEqual(attributes.previousBlockIds, previousBlockClients)) {
      setAttributes({ previousBlockIds: previousBlockClients });
    }
  }, [previousBlockClients, setAttributes, attributes.previousBlockClients]);

  return (
    <>
      <div {...props}>
      <InspectorControls>
        <PanelBody
          title={__("Collapsibles Settings", "rrze-elements-b")}
          initialOpen={true}
        >
          <ExpandAllLink attributes={attributes} setAttributes={setAttributes} />
          </PanelBody>  
      </InspectorControls>
        <div className="accordion" id={`accordion-`}>
        {attributes.expandAllLink && (
          <div className="button-container-right">
            <button className="expand-all standard-btn primary-btn xsmall-btn" data-status="closed">{__("Expand All", "rrze-elements-b")}</button>
          </div>
          )}
          <InnerBlocks 
            allowedBlocks={['rrze-elements/collapse']}
            template={[
              ['rrze-elements/collapse', {}],
              ['rrze-elements/collapse', {}]
            ]} />
        </div>
      </div>
    </>
  );
}
