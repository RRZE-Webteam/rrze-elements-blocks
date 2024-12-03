import {
  useBlockProps,
  InnerBlocks,
} from "@wordpress/block-editor";

const Edit = () => {
  const props = useBlockProps();
  
  return (
    <div {...props}>
      <div className="accordion" id={`accordion-`}>
        <InnerBlocks
          allowedBlocks={["rrze-elements/accordion"]}
          template={[
            ["rrze-elements/accordion", {}],
            ["rrze-elements/accordion", {}],
          ]}
        />
      </div>
    </div>
  );
};

export default Edit;
