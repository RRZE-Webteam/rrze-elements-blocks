import {useBlockProps} from "@wordpress/block-editor";
import {BlockSaveProps} from "@wordpress/blocks";
import {AttributesV1_0_19} from "./attributes";

const Save = ({attributes}: BlockSaveProps<AttributesV1_0_19>) => {
  const blockProps = useBlockProps.save();
  return (
    <>
      {attributes.title && attributes.description && attributes.svgString && (
        <div {...blockProps}>
          <div className="rrze--iconbox-element-container">
            <div className="rrze-iconbox-icon">
              <span className={attributes.svgString}></span>
            </div>
            <div className="rrze-iconbox-content">
              <dl className="rrze-elements-iconbox">
                <dt>
                  <span
                    className={`fau-iconbox-data rrze-iconbox-${attributes.fontSize || "large"} `}
                    data-duration={attributes.duration}
                    data-stagger={attributes.stagger}
                  >
                    {attributes.title}
                  </span>
                </dt>
                <dd>
                  {attributes.description}
                  <br />
                  {attributes.buttonUrl &&
                    attributes.buttonText &&
                    attributes.description && (
                      <a
                        className="standard-btn ghost-btn"
                        href={attributes.buttonUrl}
                        data-wpel-link="internal"
                      >
                        {attributes.buttonText}
                      </a>
                    )}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Save;
