import {
  useBlockProps,
  InnerBlocks,
  InspectorControls,
  BlockControls,
  store as blockEditorStore,
} from "@wordpress/block-editor";
import { PanelBody } from "@wordpress/components";
import { useDispatch } from "@wordpress/data";
import { __ } from "@wordpress/i18n";
import {
  HeadingSelector,
  HeadingSelectorInspector,
} from "../components/HeadingSelector";

type SaveProps = {
  attributes: {
    title: string;
    hstart: number;
  };
  setAttributes: (newAttributes: {
    title: string;
    hstart: number;
  }) => void;
  clientId?: string;
};

export default function Edit({
  attributes,
  setAttributes,
  ...ownProps
}: SaveProps) {
  const props = useBlockProps();
  const { __unstableMarkNextChangeAsNotPersistent } =
    useDispatch(blockEditorStore);

  return (
    <li {...props}>
      <div className="tooltip">
        <div className="tooltip-arrow"></div>
        <InnerBlocks
          template={[
            [
              "core/heading",
              { placeholder: __("Add a label", "rrze-elements-blocks") },
            ],
            [
              "core/paragraph",
              { placeholder: __("Add a description…", "rrze-elements-blocks") },
            ],
          ]}
          allowedBlocks={["core/paragraph", "core/heading"]}
          templateLock={false}
        />
      </div>
    </li>
  );
}
