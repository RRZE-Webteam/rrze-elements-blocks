import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

export default function save({ attributes }) {
  const blockProps = useBlockProps.save();
  const { sameBlockCount, color } = attributes;

  return (
    <div {...blockProps}>
      {" "}
      <>
        <div className={`accordion-group ${color}`}>
          <h2 className="accordion-heading">
            <span className="read-mode-only">Test </span>
            <button
              className="accordion-toggle"
              data-toggle="collapse"
              href={`#collapse_${sameBlockCount}`}
            >
              {" "}
              Test{" "}
            </button>
          </h2>
          <div
            id={`collapse_${sameBlockCount}`}
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
