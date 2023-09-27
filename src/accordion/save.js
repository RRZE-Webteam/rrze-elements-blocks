import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import HeadingComponent from "../collapse/InspectorControls/HeadingComponent";

export default function save({ attributes }) {
  const blockProps = useBlockProps.save();
  const { sameBlockCount, totalChildrenCount, color, title, ancestorCount, hstart } = attributes;

  return (
    <div {...blockProps}>
      {" "}
      <>
        <div className={`accordion-group ${attributes.color}`}>
          <HeadingComponent level={hstart + 1} className="accordion-heading">
            <span className="read-mode-only">Test </span>
            <button
              className="accordion-toggle"
              data-toggle="collapse"
              href={`#collapse_${sameBlockCount + totalChildrenCount + ancestorCount}`}
            >
              {title}
            </button>
          </HeadingComponent>
          <div
            id={`collapse_${sameBlockCount + totalChildrenCount + ancestorCount}`}
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
}
