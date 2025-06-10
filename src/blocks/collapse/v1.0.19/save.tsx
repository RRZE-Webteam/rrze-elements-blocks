import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { BlockSaveProps } from "@wordpress/blocks";
import HeadingComponent from "../../../components/HeadingComponent";
import {AttributesV1_0_19} from "./attributes";

interface Attributes {
  message: string;
  expandAllLink: boolean;
  register: boolean;
  isCustomJumpname: boolean;
  sameBlockCount: number;
  totalChildrenCount: number;
  color: string;
  title: string;
  jumpName: string;
  loadOpen: boolean;
  hstart: number;
  svgString?: string;
}

const Save = ({ attributes }: BlockSaveProps<AttributesV1_0_19>) => {
  const blockProps = useBlockProps.save();
  const { color, title, jumpName, svgString, loadOpen, hstart } = attributes;

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
            <button
              className={`accordion-toggle ${activeOnPageLoad}`}
              data-toggle="collapse"
              data-name={jumpName}
              data-href={`#${jumpName}`}
              type="button"
              aria-expanded={loadOpen ? 'true' : 'false'}
              aria-controls={`${jumpName}-section`}
              id={jumpName}
            >
              {(svgString &&
                <span className={svgString}></span>
              )}
              {title || "…"}
            </button>
          </HeadingComponent>
          <div
            id={`${jumpName}-section`}
            className={`accordion-body ${loadOnPageLoad}`}
            aria-labelledby={jumpName}
            role="region"
            //@ts-ignore
            name={jumpName}
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
