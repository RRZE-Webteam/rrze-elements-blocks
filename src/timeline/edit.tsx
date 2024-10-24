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
    hstart: number;
  };
  setAttributes: (newAttributes: {
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
    <div {...props}>
      <ol className="timeline">
        <InnerBlocks
          allowedBlocks={["rrze-elements/timeline-item"]}
          template={[
            ["rrze-elements/timeline-item", {}],
            ["rrze-elements/timeline-item", {}],
          ]}
        />
      </ol>
    </div>
  );
}
