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
    year: string;
    month: string;
    day: string;
    hour: string;
    minute: string;
    second: string;
    title: string;
    hstart: number;
  };
  setAttributes: (newAttributes: {
    year: string;
    month: string;
    day: string;
    hour: string;
    minute: string;
    second: string;
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
    <div {...props}>
      <BlockControls>
        <HeadingSelector
          attributes={attributes}
          setAttributes={setAttributes}
        />
      </BlockControls>
      <InspectorControls>
        <PanelBody
          title={__("Heading Settings", "rrze-elements-blocks")}
          initialOpen={true}
        >
          <HeadingSelectorInspector
            attributes={attributes}
            setAttributes={setAttributes}
          />
        </PanelBody>
      </InspectorControls>
      <div className="timeline">
        <InnerBlocks
          allowedBlocks={["rrze-elements/collapse"]}
          template={[
            ["rrze-elements/collapse", {}],
            ["rrze-elements/collapse", {}],
          ]}
        />
      </div>
    </div>
  );
}
