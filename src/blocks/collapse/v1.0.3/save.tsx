import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { BlockSaveProps } from "@wordpress/blocks";
import HeadingComponent from "../../../components/HeadingComponent";
import {AttributesV1_0_19} from "../v1.0.19/attributes";

const Save = ({ attributes }: BlockSaveProps<AttributesV1_0_19>) => {
  const blockProps = useBlockProps.save();
  const { sameBlockCount, totalChildrenCount, color, title, jumpName, svgString, loadOpen, hstart } = attributes;


  let output = '';
  if (jumpName === ''){
      output = `panel_${sameBlockCount + totalChildrenCount}`;
  } else {
      output = `${jumpName}`;
  }

  let loadOnPageLoad = '';
  let activeOnPageLoad = '';

  if ( loadOpen ) {
    loadOnPageLoad = 'open';
    activeOnPageLoad = 'active';
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
              {(svgString &&
                <span className={svgString}></span>
              )}
              {title || "…"}
            </button>
          </HeadingComponent>
          <div
            id={`panel_${sameBlockCount + totalChildrenCount}`}
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
}

export default Save;
