import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

interface SaveProps {
  attributes: {
    stagger: number;
    startValue: number;
  };
}

export default function save({ attributes }: SaveProps) {
  const blockProps = useBlockProps.save();
  return (
      <>
          <div {...blockProps}
          >
            <section data-startValue={attributes.startValue} data-stagger={attributes.stagger} className="rrze--counter-element">
            <InnerBlocks.Content />
            </section>
          </div>
      </>
  );
}
