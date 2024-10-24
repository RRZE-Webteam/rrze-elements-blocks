import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

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
          <InnerBlocks.Content />
          </div>
    </li>
  );
}
