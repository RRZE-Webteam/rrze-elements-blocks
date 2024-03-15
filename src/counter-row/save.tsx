import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

interface SaveProps {
  attributes: {
    stagger: number;
  };
}

export default function save({ attributes }: SaveProps) {
  const blockProps = useBlockProps.save();
  return (
      <>
          <div {...blockProps}
          >
            <section data-stagger={attributes.stagger} className="rrze--counter-element">
            <InnerBlocks.Content />
            </section>
          </div>
      </>
  );
}
