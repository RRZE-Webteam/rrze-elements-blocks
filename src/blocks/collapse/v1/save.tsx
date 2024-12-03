import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { BlockSaveProps } from "@wordpress/blocks";
import HeadingComponent from "../../../components/HeadingComponent";

interface Attributes {
  sameBlockCount: number;
  totalChildrenCount: number;
  color: string;
  title: string;
  jumpName: string;
  loadOpen: boolean;
  hstart: number;
  svgString?: string;
}

interface SaveProps {
  attributes: Attributes;
}

const Save: React.FC<BlockSaveProps<Attributes>> = ({ attributes }) => {
  const blockProps = useBlockProps.save();
  const {
    sameBlockCount,
    totalChildrenCount,
    color,
    title,
    jumpName,
    svgString,
    loadOpen,
    hstart,
  } = attributes;

  let output = "";
  if (jumpName === "") {
    output = `collapse_${sameBlockCount + totalChildrenCount}`;
  } else {
    output = `${jumpName}`;
  }

  let loadOnPageLoad = "";
  let activeOnPageLoad = "";

  if (loadOpen) {
    loadOnPageLoad = "open";
    activeOnPageLoad = "active";
  }

  return (
    <div {...blockProps}>
      {" "}
      <>
        <div className={`accordion-group ${color}`}>
          <HeadingComponent level={hstart} className="accordion-heading">
            <span className="read-mode-only">{title}</span>
            <button
              className={`accordion-toggle ${activeOnPageLoad}`}
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
            id={`collapse_${sameBlockCount + totalChildrenCount}`}
            className={`accordion-body ${loadOnPageLoad}`}
            //@ts-ignore
            name={output}
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
