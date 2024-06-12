import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { BlockSaveProps } from "@wordpress/blocks";
import HeadingComponent from "../../components/HeadingComponent";
import { AttributesV1 } from "../v1/attributes";

interface SaveProps {
  attributes: AttributesV1;
}
const Save: React.FC<BlockSaveProps<AttributesV1>> = ({ attributes }) => {
  const blockProps = useBlockProps.save();
  const {
    sameBlockCount,
    totalChildrenCount,
    color,
    title,
    svgString,
    ancestorCount,
    hstart,
  } = attributes;

  return (
    <div {...blockProps}>
      {" "}
      <>
        <div className={`accordion-group ${attributes.color}`}>
          <HeadingComponent level={hstart + 1} className="accordion-heading">
            <span className="read-mode-only">{title}</span>
            <button
              className="accordion-toggle"
              data-toggle="collapse"
              data-href={`#panel_${
                sameBlockCount + totalChildrenCount + ancestorCount
              }`}
            >
              {svgString && <span className={svgString}></span>}
              {title || "…"}
            </button>
          </HeadingComponent>
          <div
            id={`panel_${sameBlockCount + totalChildrenCount + ancestorCount}`}
            className="accordion-body"
            style={{ display: "none" }}
          >
            <div className="accordion-inner clearfix">
              <InnerBlocks.Content />
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Save;
