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
} from "@wordpress/block-editor";

import { __ } from "@wordpress/i18n";
import { useDispatch } from "@wordpress/data";
import { store as blockEditorStore } from "@wordpress/block-editor";

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
  attributes,
  setAttributes,
}: EditProps) {
  const props = useBlockProps();

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
          allowedBlocks={["core/paragraph", "core/heading", "core/list", "core/buttons", "core/button", "rrze-faudir/block"]}
          templateLock={false}
        />
      </div>
    </div>
  );
}
