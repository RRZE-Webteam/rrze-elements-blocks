import {
  useBlockProps,
  InnerBlocks,
} from "@wordpress/block-editor";

const Edit = () => {
  const props = useBlockProps();

  return (
    <div {...props}>
      <div className="media-and-accordion">
        <InnerBlocks
          allowedBlocks={["rrze-elements/collapsibles"]}
          template={[
            ["rrze-elements/collapsibles", {}],
          ]}
        />
      </div>
    </div>
  );
};

export default Edit;
