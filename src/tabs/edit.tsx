import {
  useBlockProps,
  RichText,
  InnerBlocks,
  InspectorControls,
} from "@wordpress/block-editor";
import { isEqual } from "lodash";
// import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { useState, useEffect } from "@wordpress/element";
import { useSelect } from "@wordpress/data";

interface EditProps {
  attributes: {
    style?: string;
    color?: string;
    title?: string;
    childrenCount?: number;
    previousBlockIds?: string[];
    previousBlockClients?: string[];
  };
  setAttributes: (newAttributes: {
    style?: string;
    color?: string;
    title?: string;
    childrenCount?: number;
    previousBlockIds?: string[];
    previousBlockClients?: string[];
  }) => void;
  clientId: string;
  context: { [key: string]: any }; 
  blockProps: any;
  selectedBlock: any;
  blockParents: any;
}

type WPBlock = {
  innerBlocks: WPBlock[];
  name?: string;
  attributes?: {
    childrenCount?: number;
  },
  clientId?: string;
};

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

export default function Edit({
  blockProps,
  attributes,
  setAttributes,
  clientId,
  context,
}: EditProps) {
  const props = useBlockProps();
  const { title } = attributes;

  const { selectedBlock, numberChildren, blockIndex, previousBlockClients } =
    /**
     * Get relevant data from the block editor to assist with the numbering
     * of the collapsibles.
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
        let numberChildren = getBlocks(selectedBlockClientId).length;
        // getBlocks(selectedBlockClientId).forEach((block: WPBlock) => {
        //   // if (block?.innerBlocks.length !== 0)
        //     // block?.innerBlocks.forEach((innerBlock) => {
        //     //   //console.log(innerBlock);
        //     //   // if (innerBlock?.name === "rrze-elements/accordions") {
        //     //   //   numberChildren =
        //     //   //     numberChildren + innerBlock.attributes.childrenCount;
        //     //   // }
        //     // });
        //   // console.log("block", block.innerBlocks);
        // });

        const blockIndex = getBlockIndex(selectedBlockClientId);
        const topLevelBlocks = getBlocks();
        const allBlocks = getAllBlocksRecursively(topLevelBlocks);
        //  console.log(allBlocks);

        const CollapsiblesBlockClientIds = allBlocks
          .filter((block: WPBlock) => block.name === "rrze-elements/tabs")
          .map((block: WPBlock) => block.clientId);

        const currentBlockIndex = CollapsiblesBlockClientIds.indexOf(
          selectedBlockClientId
        );
        const previousBlockClients = CollapsiblesBlockClientIds.slice(
          0,
          currentBlockIndex
        );

        // console.log("selectedBlockClientId", selectedBlockClientId);
        // console.log("numberChildren", numberChildren);
        // console.log("blockIndex", blockIndex);        

        return {
          selectedBlock: getBlock(selectedBlockClientId),
          numberChildren,
          blockIndex,
          previousBlockClients,
        };
      },
      [clientId]
    );

    useEffect(() => {
      if (attributes.childrenCount !== numberChildren) {
        setAttributes({ childrenCount: numberChildren });
        console.log( "attributes.childrenCount", attributes.childrenCount);
      }
    }, [numberChildren, setAttributes, attributes.childrenCount]);
  
    useEffect(() => {
      if (!isEqual(attributes.previousBlockIds, previousBlockClients)) {
        setAttributes({ previousBlockIds: previousBlockClients });
        console.log( "attributes.previousBlockClients", attributes.previousBlockIds);
      };
    }, [previousBlockClients, setAttributes, attributes.previousBlockIds]);


  // Function to handle the change of the title attribute.
  const onChangeTitle = (newText: string) => {
    if (newText === "") {
      setAttributes({ title: " " });
    } else {
      setAttributes({ title: newText });
    }
  };

  return (
    <>
      <div className="rrze-elements-tabs primary" id="tabs-1">
        // For each tab, add a button and a tabpanel.
        <div role="tablist" className="manual">
          <button
            id="tab-1_reiter-1"
            type="button"
            role="tab"
            aria-selected="true"
            aria-controls="tab-1_tabpanel_reiter-1"
          >
            <span className="focus" tabIndex={-1}>
              <RichText
                identifier="title"
                value={title}
                onChange={onChangeTitle}
                placeholder={__("Tab Title")}
                multiline={false}
                allowedFormats={[]}
              />
            </span>
          </button>
          <button
            id="tab-1_reiter-2"
            type="button"
            role="tab"
            aria-selected="false"
            aria-controls="tab-1_tabpanel_reiter-2"
            tabIndex={-1}
          >
            <span className="focus" tabIndex={-1}>
              Reiter 2
            </span>
          </button>
          <button
            id="tab-1_reiter-3"
            type="button"
            role="tab"
            aria-selected="false"
            aria-controls="tab-1_tabpanel_reiter-3"
            tabIndex={-1}
          >
            <span className="focus" tabIndex={-1}>
              Reiter 3
            </span>
          </button>
        </div>
        <InnerBlocks 
          allowedBlocks={["rrze-elements/tab"]}
          template={[
            ["rrze-elements/tab"],
            ["rrze-elements/tab"],
            ["rrze-elements/tab"],
          ]}
        />
        
        {/* <div
          id="tab-1_tabpanel_reiter-1"
          role="tabpanel"
          aria-labelledby="tab-1_reiter-1"
          className=""
        >
          <h2 className="print-only">Reiter 1</h2>
          <p>Text 1</p>
        </div>
        <div
          id="tab-1_tabpanel_reiter-2"
          role="tabpanel"
          aria-labelledby="tab-1_reiter-2"
          className="is-hidden"
        >
          <h2 className="print-only">Reiter 2</h2>
          <p>Text 2</p>
        </div>
        <div
          id="tab-1_tabpanel_reiter-3"
          role="tabpanel"
          aria-labelledby="tab-1_reiter-3"
          className="is-hidden"
        >
          <h2 className="print-only">Reiter 3</h2>
          <p>Text 3</p>
        </div> */}
      </div>
    </>
  );
}
