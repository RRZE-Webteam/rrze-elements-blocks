import {
  useBlockProps,
  RichText,
  InnerBlocks,
  InspectorControls,
  BlockControls
} from "@wordpress/block-editor";
import {
  ToolbarItem,
  ToolbarGroup,
  ToolbarButton,
  Placeholder,
  TextControl
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
    active?: string;
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

  console.log("props", );

  useEffect(() => {
    if (context["rrze-elements/tabs-active"] === attributes.active) {
      setAttributes({ active: context["rrze-elements/tabs-active"] });
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
  let classNameValue = (attributes.active === blockId) ? "" : "is-hidden";
  classNameValue = "";

  return (
    <>
    <div {...props}>
    <BlockControls controls>
      <ToolbarGroup>
        <ToolbarButton
                    label={__("Collapse on page load", "rrze-elements-b")}
                    onClick = {() => {
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
        <Placeholder label={__("Tab", "rrze-elements-b")}>
          <TextControl 
            value={attributes.title}
            onChange={onChangeTitle}
            placeholder={__("Tab", "rrze-elements-b")}
          />
        </Placeholder>
        <InnerBlocks
          template={[
            [
              "core/paragraph",
              { placeholder: __("Add your content here", "rrze-blocksb") },
            ],
          ]}
        />
      </div>
      </div>
    </>
  );
}