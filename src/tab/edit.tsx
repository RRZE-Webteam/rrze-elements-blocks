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

interface EditProps {
  attributes: {
    style?: string;
    color?: string;
    title?: string;
    sameBlockCount?: number;
    totalChildrenCount?: number;
    icon: string;
    svgString?: string;
    order?: number;
    active?: boolean;
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
    if (context["rrze-elements/tabs-active"] === "") {
      setAttributes({ active: true });
    } else if (context["rrze-elements/tabs-active"] !== blockId) {
      setAttributes({ active: false });
    } else {
      setAttributes({ active: true });
    }
  }, [attributes.active, context["rrze-elements/tabs-active"]]);

  // Function to handle the change of the title attribute.
  const onChangeTitle = (newText: string) => {
    if (newText === "") {
      setAttributes({ title: " " });
    } else {
      setAttributes({ title: newText });
    }
  };

  const { sameBlockCount, color, icon } = attributes;
  let classNameValue = attributes.active ? "" : "is-hidden";
  // classNameValue = "";

  return (
    <div {...props}>
      <BlockControls controls>
        <ToolbarGroup>
          <ToolbarButton
            label={__("Collapse on page load", "rrze-elements-b")}
            onClick={() => {
              console.log("clicked");
            }}
          />
        </ToolbarGroup>
      </BlockControls>
      <div
        id={blockId}
        role="tabpanel"
        aria-labelledby={blockId}
        className={classNameValue}
      >
        <h2 className="print-only">{attributes.title}</h2>
        <Placeholder
          icon={
            <SVG
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
            >
              {/* <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
              <Path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
            </SVG>
          }
          instructions="Enter your Tab title. You can change it later through the block settings inside the Toolbar."
          label={__("Tab Label", "rrze-elements-b")}
        >
          <div>
            <TextControl
              value={attributes.title}
              onChange={onChangeTitle}
              placeholder={__("Enter your Tab Label", "rrze-elements-b")}
            />
            <Button variant="primary" onClick={() => console.log("clicked")}>
              {__("Update title", "rrze-elements-b")}
            </Button>
          </div>
        </Placeholder>
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
