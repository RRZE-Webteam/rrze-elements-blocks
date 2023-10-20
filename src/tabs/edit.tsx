import {
  useBlockProps,
  RichText,
  InnerBlocks,
  InspectorControls,
  BlockControls,
} from "@wordpress/block-editor";
import {
  TextControl,
  Button,
  Toolbar,
  ToolbarGroup,
  ToolbarButton,
  SVG,
  Path,
} from "@wordpress/components";
import { isEqual } from "lodash";
import { __ } from "@wordpress/i18n";
import { useState, useEffect } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import { unseen } from "@wordpress/icons";

import { XrayBar } from "./InspectorControls/Xray";
import { ColorSwitcher, ColorSwitcherToolbar } from "./InspectorControls/ColorSwitcher";

interface Tab {
  title?: string;
  index?: number;
  active?: string;
  clientId?: string;
}

interface EditProps {
  attributes: {
    style?: string;
    color?: string;
    tabs?: Tab[];
    childrenCount?: number;
    previousBlockIds?: string[];
    previousBlockClients?: string[];
    blockId?: string;
    innerClientIds?: {
      clientId: string;
      title: string;
      position: number;
    }[];
    active?: string;
    xray?: boolean;
  };
  setAttributes: (attributes: Partial<EditProps["attributes"]>) => void;
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
    title?: string;
  };
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

  blocks.forEach((block) => {
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
  const blockId = props["data-block"];
  const { tabs } = attributes;

  const {
    selectedBlock,
    numberChildren,
    blockIndex,
    previousBlockClients,
    innerClientIds,
  } =
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

        const blockIndex = getBlockIndex(selectedBlockClientId);
        const topLevelBlocks = getBlocks();
        const innerBlocks = getBlocks(selectedBlockClientId);
        let counter = 0;
        const innerClientIds = innerBlocks.map((block: WPBlock) => ({
          clientId: block.clientId,
          title: block.attributes?.title,
          position: counter++,
        }));
        const allBlocks = getAllBlocksRecursively(topLevelBlocks);

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

        return {
          selectedBlock: getBlock(selectedBlockClientId),
          numberChildren,
          blockIndex,
          previousBlockClients,
          innerClientIds,
        };
      },
      [clientId]
    );

  useEffect(() => {
    if (!isEqual(attributes.previousBlockIds, previousBlockClients)) {
      setAttributes({ previousBlockIds: previousBlockClients });
    }
  }, [previousBlockClients, setAttributes, attributes.previousBlockIds]);

  useEffect(() => {
    if (attributes.blockId !== blockId) {
      setAttributes({ blockId: blockId.slice(0, 10) });
    }
  }, [attributes.blockId, blockId]);

  useEffect(() => {
    if (innerClientIds.length === 0) {
      return;
    }

    if (!isEqual(attributes.innerClientIds, innerClientIds)) {
      setAttributes({ innerClientIds });
    }
  }, [innerClientIds, setAttributes]);

  // Function to handle the change of the title attribute.
  const onChangeTitle = (newText: string, index: number) => {
    let newTabs = [...tabs];

    if (!newTabs[index]) {
      newTabs[index] = {};
    }

    newTabs[index].title = newText;
    newTabs[index].clientId = innerClientIds[index];
    setAttributes({ tabs: newTabs });
  };

  useEffect(() => {
    if (
      attributes.active === "" &&
      innerClientIds &&
      innerClientIds.length > 0
    ) {
      setAttributes({ active: innerClientIds[0].clientId });
    }

    if (
      !innerClientIds ||
      !innerClientIds.find(
        (innerClientId: WPBlock) =>
          innerClientId["clientId"] === attributes.active
      )
    ) {
      if (innerClientIds && innerClientIds.length > 0) {
        setAttributes({ active: innerClientIds[0].clientId });
      }
    }
  }, [innerClientIds, attributes.active]);

  const onChangeActive = (
    index: number,
    innerClientIds: { clientId: string; position: number }[]
  ) => {
    if (innerClientIds[index]?.clientId !== undefined) {
      setAttributes({ active: innerClientIds[index].clientId });
    }
  };

  const ariaSelected: any = (index: number) => {
    if (innerClientIds[index] === undefined) {
      return true;
    }
    if (
      innerClientIds[index].clientId === attributes.active ||
      attributes.active === ""
    ) {
      return true;
    }
    return false;
  };

  return (
    <div {...props}>
      <BlockControls controls>
       <XrayBar attributes={{xray: attributes.xray}} setAttributes={setAttributes} />
       <ColorSwitcherToolbar attributes={{color: attributes.color}} setAttributes={setAttributes} />
      </BlockControls>
      <div className={`rrze-elements-tabs primary ${attributes.color}`} id="tabs-1">
        <div role="tablist" className="manual">
          {attributes.innerClientIds.map((innerClientId, index) => {
            return (
              <Button
                key={index}
                onClick={() => onChangeActive(index, innerClientIds)}
                id={innerClientId["clientId"]}
                type="button"
                role="tab"
                aria-selected={ariaSelected(index)}
                aria-controls={`${innerClientId["position"]}`}
              >
                <span className="focus" tabIndex={-1}>
                  {/* <TextControl
                    onChange={(text) => onChangeTitle(text, index)}
                    value={attributes.tabs[index]?.title}
                    placeholder={__("Tab Title", "rrze-elements")}
                    className="elements-blocks-input-following-icon"
                  /> */}
                  {innerClientId["title"]}
                </span>
              </Button>
            );
          })}
        </div>
        <InnerBlocks
        //@ts-ignore
        allowedBlocks={["rrze-elements/tab"]}
        template={[["rrze-elements/tab"], ["rrze-elements/tab"]]}
      />

      </div>
    </div>
  );
}
