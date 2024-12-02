import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import HeadingComponent from "../components/HeadingComponent";

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
const Save = ({ attributes }: SaveProps) => {
  const blockProps = useBlockProps.save();
  const {
    sameBlockCount,
    totalChildrenCount,
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
              data-href={`#${output}`}
              type="button"
              aria-expanded={'false'}
              aria-controls={output}
            >
              {svgString && <span className={svgString}></span>}
              {title || "…"}
            </button>
          </HeadingComponent>
          <div
            id={output}
            className="accordion-body"
            aria-labelledby={jumpName}
            role="region"
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
