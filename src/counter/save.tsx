import { useBlockProps } from "@wordpress/block-editor";

interface SaveProps {
  attributes: {
    color: string;
    tabsUid: string;
    blockId: string;
    title: string;
    description: string;
    buttonText: string;
    duration: number;
    stagger: number;
    fontSize: string;
    buttonUrl: string;
  };
}

export default function save({ attributes }: SaveProps) {
  const blockProps = useBlockProps.save();
  return (
    <div {...blockProps}>
      <div className="rrze--counter-element-container">
        <dl className="rrze-elements-counter">
          <dt>
            <span
              className={`fau-counter-data rrze-counter-${attributes.fontSize || "large"} `}
              data-duration={attributes.duration}
              data-stagger={attributes.stagger}
            >
              {attributes.title}
            </span>
          </dt>
          <dd>
            {attributes.description}
            <br />
            {attributes.buttonUrl && (
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
  );
}
