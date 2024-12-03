import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import HeadingComponent from "../../components/HeadingComponent";

type SaveProps = {
  attributes: {
    year: string;
    month: string;
    day: string;
    hour: string;
    minute: string;
    second: string;
    title: string;
    hstart: number;
  };
};

export default function save({ attributes }: SaveProps) {
  const blockProps = useBlockProps.save();

  return (
    <li {...blockProps}>
      <div className="tooltip">
      <div className="tooltip-arrow"></div>
          <HeadingComponent level={attributes.hstart} className="timeline-label">
            {attributes.title}
          </HeadingComponent>
          <InnerBlocks.Content />
          </div>
    </li>
  );
}
