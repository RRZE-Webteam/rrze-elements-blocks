import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

interface SaveProps {
  attributes: {
    stagger: number;
    startValue: number;
    columns: number;
  };
}

export default function save({ attributes }: SaveProps) {
  const dynamicClass = `rrze-elements-column-${attributes.columns}`;
  const blockProps = useBlockProps.save({
    className: dynamicClass,
  });

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
