import {
  useBlockProps,
  InnerBlocks,
  store as blockEditorStore,
} from "@wordpress/block-editor";
import { useDispatch } from "@wordpress/data";

type SaveProps = {
  attributes: {
    expandAllLink: boolean;
    sameBlockCount: number;
    previousBlockIds: string[];
    hstart: number;
    childrenCount: number;
    message: string;
    previousBlockClients: string[];
  };
  setAttributes: (newAttributes: {
    expandAllLink?: boolean;
    sameBlockCount?: number;
    previousBlockIds?: string[];
    hstart?: number;
    childrenCount?: number;
    message?: string;
    previousBlockClients?: string[];
  }) => void;
  clientId?: string;
};

type WPBlock = {
  innerBlocks: WPBlock[];
  name?: string;
  attributes?: {
    childrenCount?: number;
  };
  clientId?: string;
};

const Edit: React.FC<SaveProps> = ({
  attributes,
  setAttributes,
  ...ownProps
}) => {
  const props = useBlockProps();
  const { __unstableMarkNextChangeAsNotPersistent } =
    useDispatch(blockEditorStore);

  return (
    <div {...props}>
      <div className="accordion" id={`accordion-`}>
        <InnerBlocks
          allowedBlocks={["rrze-elements/accordion"]}
          template={[
            ["rrze-elements/accordion", {}],
            ["rrze-elements/accordion", {}],
          ]}
        />
      </div>
    </div>
  );
};

export default Edit;
