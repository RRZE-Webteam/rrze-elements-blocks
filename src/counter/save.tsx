import { useBlockProps } from "@wordpress/block-editor";

interface SaveProps {
  attributes: {
    color: string;
    tabsUid: string;
    blockId: string;
    title: string;
  };
}

export default function save({ attributes }: SaveProps) {
  const blockProps = useBlockProps.save();
  return (
    <>
      <div {...blockProps}>
        <div>Animation</div>
        <div className="fau-counter-data" data-start="0" data-duration="4" data-ease="power1.in" data-stagger="1.0">1900000</div>
        <div className="fau-counter-data" data-start="1" data-duration="2" data-ease="power1.in" data-stagger="1.0">1000000000</div>
        <div className="data">1000</div>
        <div>End result</div>
        <div className="">1,900,000</div>
        <div className="">1,000,000,000</div>
        <div className="">1,000</div>
      </div>
    </>
  );
}
