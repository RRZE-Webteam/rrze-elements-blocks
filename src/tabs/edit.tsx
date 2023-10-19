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
    innerClientIds?: {
      clientId: string;
      title: string;
      position: number;
    }[];
    active?: string;
    xray?: boolean;
  };
  setAttributes: (newAttributes: {
    style?: string;
    color?: string;
    tabs?: Tab[];
    childrenCount?: number;
    previousBlockIds?: string[];
    previousBlockClients?: string[];
    innerClientIds?: string[];
    active?: string;
    xray?: boolean;
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
    if (innerClientIds.length === 0) {
      return;
    }

    if (!isEqual(attributes.innerClientIds, innerClientIds)) {
      setAttributes({ innerClientIds });
    }
  }, [innerClientIds, setAttributes]);

  const syncTabsWithInnerBlocks = () => {
    const newTabsOrder = innerClientIds.map((clientId: string) => {
      const existingTab = tabs.find((tab) => tab.clientId === clientId);
      if (existingTab) {
        return existingTab;
      }
      return {
        title: "",
        clientId: clientId,
      };
    });

    // Only update if there's a change
    if (!isEqual(newTabsOrder, tabs)) {
      setAttributes({ tabs: newTabsOrder });
    }
  };

  useEffect(() => {
    if (attributes.tabs.length !== 0) {
      syncTabsWithInnerBlocks();
    }
  }, [innerClientIds, attributes.tabs]);

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

  const onClickXray = () => {
    setAttributes({ xray: !attributes.xray });
  }

  const xrayIcon = (
    <SVG xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
      {/* <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
      <Path d="M0 64C0 46.3 14.3 32 32 32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32V416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32V96C14.3 96 0 81.7 0 64zM256 96c-8.8 0-16 7.2-16 16v32H160c-8.8 0-16 7.2-16 16s7.2 16 16 16h80v48H128c-8.8 0-16 7.2-16 16s7.2 16 16 16H240v70.6L189.1 307c-5.2-2-10.6-3-16.2-3h-2.1c-23.6 0-42.8 19.2-42.8 42.8c0 9.6 3.2 18.9 9.1 26.4l18.2 23.2c9.7 12.4 24.6 19.6 40.3 19.6H316.4c15.7 0 30.6-7.2 40.3-19.6l18.2-23.2c5.9-7.5 9.1-16.8 9.1-26.4c0-23.6-19.2-42.8-42.8-42.8H339c-5.5 0-11 1-16.2 3L272 326.6V256H384c8.8 0 16-7.2 16-16s-7.2-16-16-16H272V176h80c8.8 0 16-7.2 16-16s-7.2-16-16-16H272V112c0-8.8-7.2-16-16-16zM208 352a16 16 0 1 1 0 32 16 16 0 1 1 0-32zm80 16a16 16 0 1 1 32 0 16 16 0 1 1 -32 0z" />
    </SVG>
  );

  const ActivexrayIcon = (
    <SVG xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
      {/* <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
      <Path d="M0 64C0 46.3 14.3 32 32 32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32V416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32V96C14.3 96 0 81.7 0 64zM256 96c-8.8 0-16 7.2-16 16v32H160c-8.8 0-16 7.2-16 16s7.2 16 16 16h80v48H128c-8.8 0-16 7.2-16 16s7.2 16 16 16H240v70.6L189.1 307c-5.2-2-10.6-3-16.2-3h-2.1c-23.6 0-42.8 19.2-42.8 42.8c0 9.6 3.2 18.9 9.1 26.4l18.2 23.2c9.7 12.4 24.6 19.6 40.3 19.6H316.4c15.7 0 30.6-7.2 40.3-19.6l18.2-23.2c5.9-7.5 9.1-16.8 9.1-26.4c0-23.6-19.2-42.8-42.8-42.8H339c-5.5 0-11 1-16.2 3L272 326.6V256H384c8.8 0 16-7.2 16-16s-7.2-16-16-16H272V176h80c8.8 0 16-7.2 16-16s-7.2-16-16-16H272V112c0-8.8-7.2-16-16-16zM208 352a16 16 0 1 1 0 32 16 16 0 1 1 0-32zm80 16a16 16 0 1 1 32 0 16 16 0 1 1 -32 0z" />
    </SVG>
  );


  return (
    <div {...props}>
      <BlockControls controls>
       <XrayBar attributes={{xray: attributes.xray}} setAttributes={setAttributes} />
      </BlockControls>
      <div className="rrze-elements-tabs primary" id="tabs-1">
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
          allowedBlocks={["rrze-elements/tab"]}
          template={[["rrze-elements/tab"], ["rrze-elements/tab"]]}
        />
      </div>
    </div>
  );
}
