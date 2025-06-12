import {useBlockProps, InnerBlocks} from "@wordpress/block-editor";
import {BlockSaveProps} from "@wordpress/blocks";
import {AttributesV1_0_19} from "./attributes";

const Save = ({attributes}: BlockSaveProps<AttributesV1_0_19>) => {
  const dynamicClass = `rrze-elements-column-${attributes.columns}`;
  const blockProps = useBlockProps.save({
    className: dynamicClass,
  });

  return (
    <>
      <div {...blockProps}
      >
        <section data-startValue={attributes.startValue} data-stagger={attributes.stagger}
                 className="rrze--counter-element">
          <InnerBlocks.Content/>
        </section>
      </div>
    </>
  );
}

export default Save;
