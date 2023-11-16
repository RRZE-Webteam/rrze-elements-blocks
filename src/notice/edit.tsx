// import { TextControl } from "@wordpress/components";
import {
  useBlockProps,
  InnerBlocks,
  InspectorControls,
  BlockControls,
  __experimentalBlockVariationPicker as BlockVariationPicker,
  store as blockEditorStore,
} from "@wordpress/block-editor";
import { store as blocksStore } from "@wordpress/blocks";
import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { useSelect } from "@wordpress/data";
import {
  Placeholder,
  PanelBody,
  ToolbarItem,
  ToolbarGroup,
  ToolbarButton,
  Button,
  Modal,
} from "@wordpress/components";

import { symbol } from "@wordpress/icons";

import {
  StandardColorSwitcher,
  StandardColorSwitcherToolbar,
  BorderColorPicker,
} from "../components/CustomColorSwitcher";

// @ts-ignore
import variations from "./variations";

interface EditProps {
  attributes: {
    style?: string;
    color: string;
    textColor?: string;
    borderColor?: string;
    icon?: string;
    svgString?: string;
  };
  setAttributes: (attributes: Partial<EditProps["attributes"]>) => void;
  clientId: string;
  context: { [key: string]: any };
  blockProps: any;
}

export default function Edit({
  blockProps,
  attributes,
  setAttributes,
}: EditProps) {
  const props = useBlockProps();
  const { icon } = attributes;
  const [iconType, iconName] = icon?.split(" ") || [];

  // isOpen state is used to control the opening and closing of the icon picker modal
  const [isOpen, setOpen] = useState(false);

  const blockName = "rrze-elements/notice";

  const variations = useSelect(
    (select) => {
      const { getBlockVariations } = select(blocksStore) as any;
      return getBlockVariations(blockName, "block");
    },
    [blockName]
  );

  const matchedVariation = variations.find(
    (variation: any) => variation.name === attributes.style
  );

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <div {...props}>
      <InspectorControls>
        {attributes.style ? null : (
          <BorderColorPicker
            attributes={{ color: attributes.borderColor }}
            setAttributes={setAttributes}
          />
        )}
        <PanelBody
          title={__("Style Settings", "rrze-elements-b")}
          initialOpen={true}
        >
          <BlockVariationPicker
            variations={variations}
            onSelect={(variation) => {
              setAttributes({ style: variation?.name });
            }}
          />
        </PanelBody>
      </InspectorControls>
      <BlockControls controls>
        <ToolbarGroup>
          <ToolbarItem>
            {() => (
              <>
                <ToolbarButton
                  icon={symbol}
                  label={
                    icon === ""
                      ? __("Select a style", "rrze-elements-b")
                      : __("Change the style", "rrze-elements-b")
                  }
                  onClick={openModal}
                />
                {isOpen && (
                  <Modal
                    title={__("Select an Icon", "rrze-elements-b")}
                    onRequestClose={closeModal}
                  >
                    <BlockVariationPicker
                      variations={variations}
                      onSelect={(variation) => {
                        setAttributes({ style: variation?.name });
                      }}
                    />
                    <Button variant="primary" onClick={closeModal}>
                      {__("Save changes", "rrze-elements-b")}
                    </Button>
                  </Modal>
                )}
              </>
            )}
          </ToolbarItem>
        </ToolbarGroup>
      </BlockControls>

      {!attributes.style && (
        <Placeholder icon="admin-plugins" label={__("Notice", "rrze-elements")}>
          <BlockVariationPicker
            variations={variations}
            onSelect={(variation) => {
              setAttributes({ style: variation?.name });
            }}
          />
        </Placeholder>
      )}
      <div
        className={`notice notice-attention no-title ${
          attributes.style ? `alert-${attributes.style}` : ""
        }`}
        style={
          attributes.style
            ? {}
            : {
                backgroundColor: attributes.color,
                color: attributes.textColor,
                border: `1px solid ${attributes.borderColor}`,
              }
        }
      >
        <div>
          <div>
            {/* Render the icon if a matching variation is found */}
            {matchedVariation?.icon}
          </div>
        </div>
        {attributes.style && (
          <InnerBlocks
            template={[
              ["core/heading", { placeholder: __("Add a Headline") }],
              ["core/paragraph", { placeholder: __("Add a description…") }],
            ]}
            allowedBlocks={["core/heading", "core/paragraph"]}
            templateLock={false}
          />
        )}
      </div>
    </div>
  );
}
