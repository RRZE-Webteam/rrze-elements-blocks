import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import HeadingComponent from "./InspectorControls/HeadingComponent";

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

const Save: React.FC<SaveProps> = ({ attributes }) => {
  const blockProps = useBlockProps.save();
  const { sameBlockCount, totalChildrenCount, color, title, jumpName, loadOpen, hstart } = attributes;


  let output = '';
  if (jumpName === ''){
      output = `collapse_${sameBlockCount + totalChildrenCount}`;
  } else { 
      output = `${jumpName}`;
  }

  let loadOnPageLoad = '';
  let aciveOnPageLoad = '';

  if ( loadOpen ) {
    loadOnPageLoad = 'open';
    aciveOnPageLoad = 'active';
  } 

  return (
    <div {...blockProps}>
      {" "}
      <>
        <div className={`accordion-group ${color}`}>
          <HeadingComponent level={hstart} className="accordion-heading">
            <span className="read-mode-only">Test </span>
            <button
              className={`accordion-toggle ${aciveOnPageLoad}`}
              data-toggle="collapse"
              data-name={output}
              // @ts-ignore
              href={`#collapse_${sameBlockCount + totalChildrenCount}`}
              dangerouslySetInnerHTML={{
                __html: `${attributes.svgString}${title}`,
              }}
            >
              
            </button>
          </HeadingComponent>
          <div
            id={`collapse_${sameBlockCount + totalChildrenCount}`}
            className={`accordion-body ${loadOnPageLoad}`}
            // @ts-ignore
            name={output} 
            style={loadOpen ? {} : { display: "none" }}
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

export default Save;
