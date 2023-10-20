import {
  useBlockProps,
  RichText,
  InnerBlocks,
  InspectorControls,
  BlockControls,
} from "@wordpress/block-editor";
import {
  ToolbarItem,
  ToolbarGroup,
  ToolbarButton,
  Placeholder,
  TextControl,
  Button,
  SVG,
  Path,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { useState, useEffect } from "@wordpress/element";
import { useSelect } from "@wordpress/data";

import { TitleToolbar, TitlePlaceholder } from "./InspectorControls/TitleSettings";

interface EditProps {
  attributes: {
    style?: string;
    color?: string;
    title?: string;
    icon: string;
    svgString?: string;
    active?: boolean;
    xray?: boolean;
    labelSettings?: boolean;
    blockId?: string;
    tabsUid?: string;
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
  const { title } = attributes;

  useEffect(() => {
    if (attributes.tabsUid !== context["rrze-elements/tabs-uid"]) {
      setAttributes({ tabsUid: context["rrze-elements/tabs-uid"] });
    }
  }, [attributes.tabsUid, context["rrze-elements/tabs-uid"]]);

  useEffect(() => {
    if (attributes.blockId !== blockId) {
      setAttributes({ blockId: blockId });
    }
  }, [attributes.blockId, blockId]);

  useEffect(() => {
    if (context["rrze-elements/tabs-active"] === "") {
      setAttributes({ active: true });
    } else if (context["rrze-elements/tabs-active"] !== blockId) {
      setAttributes({ active: false });
    } else {
      setAttributes({ active: true });
    }
  }, [attributes.active, context["rrze-elements/tabs-active"]]);

  useEffect(() => {
    setAttributes({ xray: context["rrze-elements/tabs-xray"] });
  }, [attributes.active, context["rrze-elements/tabs-xray"]]);

  const { color, icon } = attributes;
  let classNameValue = attributes.active || attributes.xray ? "" : "is-hidden";

  console.log(attributes);

  return (
    <div {...props}>
      
      {/* @ts-ignore */}
      <BlockControls>
        <TitleToolbar attributes={{labelSettings: attributes.labelSettings}} setAttributes={setAttributes} />
      </BlockControls>
      <div
        id={blockId}
        role="tabpanel"
        aria-labelledby={blockId}
        className={classNameValue}
      >
        <h2 className="print-only">{attributes.title}</h2>
        {attributes.labelSettings && (
          <TitlePlaceholder attributes={{title: attributes.title, labelSettings: attributes.labelSettings}} setAttributes={setAttributes} />
        )}
        <InnerBlocks
          template={[
            [
              "core/paragraph",
              {
                placeholder: __(
                  "Click here and press / to enter content inside your Tab",
                  "rrze-blocks-b"
                ),
              },
            ],
          ]}
        />
      </div>
    </div>
  );
}
