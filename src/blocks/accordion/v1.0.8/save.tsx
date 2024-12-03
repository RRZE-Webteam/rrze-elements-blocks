import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { BlockSaveProps } from "@wordpress/blocks";
import HeadingComponent from "../../../components/HeadingComponent";
import { AttributesV1_0_8 } from "./attributes";

interface Attributes {
  totalChildrenCount?: number;
  sameBlockCount?: number;
  title: string;
  color: string;
  loadOpen: boolean;
  icon: string;
  hstart?: number;
  jumpName?: string;
  svgString?: string;
  ancestorCount?: number;
}

interface SaveProps {
  attributes: Attributes;
}
const Save: React.FC<BlockSaveProps<AttributesV1_0_8>> = ({ attributes }) => {
  const blockProps = useBlockProps.save();
  const {
    sameBlockCount,
    totalChildrenCount,
    color,
    title,
    svgString,
    ancestorCount,
    hstart,
    jumpName
  } = attributes;

  let output = '';
  if (jumpName === ''){
      output = `#panel_${sameBlockCount + totalChildrenCount + ancestorCount}`;
  } else { 
      output = `${jumpName}`;
  }

  return (
    <div {...blockProps}>
        <div className={`accordion-group ${attributes.color}`}>
          <HeadingComponent level={hstart + 1} className="accordion-heading">
            <span className="read-mode-only">{title}</span>
            <button
              className="accordion-toggle"
              data-toggle="collapse"
              data-name={output}
              //@ts-ignore
              href={`#${output}`}
            >
              {svgString && <span className={svgString}></span>}
              {title || "…"}
            </button>
          </HeadingComponent>
          <div
            id={output}
            className="accordion-body"
            style={{ display: "none" }}
          >
            <div className="accordion-inner clearfix">
              <InnerBlocks.Content />
            </div>
          </div>
        </div>
    </div>
  );
};

export default Save;