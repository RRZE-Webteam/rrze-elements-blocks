import {
  TextControl,
  PanelBody,
  __experimentalText as Text,
  __experimentalSpacer as Spacer,
} from "@wordpress/components";
import {
  useBlockProps,
  InnerBlocks,
  InspectorControls,
  BlockControls,
  ContrastChecker,
} from "@wordpress/block-editor";

import { __ } from "@wordpress/i18n";
import { useDispatch } from "@wordpress/data";
import { store as blockEditorStore } from "@wordpress/block-editor";
import {
  StandardColorSwitcher,
  StandardColorSwitcherToolbar,
  BorderColorPicker,
} from "../components/CustomColorSwitcher";

interface EditProps {
  attributes: {
    style?: string;
    color: string;
    textColor?: string;
    borderColor?: string;
    title?: string;
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

  // Data for color options
  const colorDataAlert = [
    {
      color: "#e9edf2",
      slug: "default",
      name: __("Default", "rrze-elements-blocks"),
    },
    {
      color: "#dff0d8",
      slug: "success",
      name: __("Success", "rrze-elements-blocks"),
    },
    {
      color: "#d9edf7",
      slug: "info",
      name: __("Info", "rrze-elements-blocks"),
    },
    {
      color: "#fcf8e3",
      slug: "warning",
      name: __("Warning", "rrze-elements-blocks"),
    },
    {
      color: "#f2dede",
      slug: "danger",
      name: __("Danger", "rrze-elements-blocks"),
    },
  ];

  let borderStyle = attributes.borderColor
    ? { border: `1px solid ${attributes.borderColor}` }
    : {};
  if (attributes.style === "example") {
    borderStyle = { border: `1px dashed var(--color-TextLight, #707070)` };
  }

  const { __unstableMarkNextChangeAsNotPersistent } =
    useDispatch(blockEditorStore);
  const onChangeTitle = (newText: string) => {
    if (newText === "") {
      __unstableMarkNextChangeAsNotPersistent();
      setAttributes({ title: "", style:"default" });
    } else {
      __unstableMarkNextChangeAsNotPersistent();
      setAttributes({ title: newText, style: "example"});
    }
  };

  return (
    <div {...props}>
      <InspectorControls>
        <StandardColorSwitcher
          attributes={{ color: attributes.color }}
          setAttributes={setAttributes}
          colorData={colorDataAlert}
          hex={true}
          useStyle={true}
          customColor={false}
          useTextColor={true}
        />
        <ContrastChecker
          textColor={attributes.textColor}
          backgroundColor={attributes.color}
        />

        {attributes.style ? null : (
          <BorderColorPicker
            attributes={{ color: attributes.borderColor }}
            setAttributes={setAttributes}
          />
        )}
        <PanelBody
          title={__("Label settings", "rrze-elements-blocks")}
          initialOpen={true}
        >
          <Spacer>
            <Text>{__("Add a Label for your Alert. This changes the style to example", "rrze-elements-blocks")}</Text>
          </Spacer>

          <TextControl
            value={attributes.title}
            onChange={onChangeTitle}
            placeholder={__("Add a Label", "rrze-elements-blocks")}
            className="elements-blocks-input-following-icon"
          />
        </PanelBody>
      </InspectorControls>
      <BlockControls>
        <StandardColorSwitcherToolbar
          attributes={{ color: attributes.color, style: attributes.style }}
          setAttributes={setAttributes}
          colorData={colorDataAlert}
          hex={true}
          useStyle={true}
        />
      </BlockControls>
      <div
        className={`alert clearfix clear ${
          attributes.style ? `alert-${attributes.style}` : ""
        }`}
        style={{
          ...(attributes.style
            ? {}
            : {
                backgroundColor: attributes.color,
                color: attributes.textColor,
              }),
          ...borderStyle,
        }}
        title={attributes.title}
      >
        <InnerBlocks
          template={[
            [
              "core/paragraph",
              { placeholder: __("Add a description…", "rrze-elements-blocks") },
            ],
          ]}
          allowedBlocks={["core/paragraph", "core/heading", "core/list"]}
          templateLock={false}
        />
      </div>
    </div>
  );
}
