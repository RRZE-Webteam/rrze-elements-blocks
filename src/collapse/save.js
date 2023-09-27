import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import HeadingComponent from "./InspectorControls/HeadingComponent";

export default function save({ attributes }) {
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
