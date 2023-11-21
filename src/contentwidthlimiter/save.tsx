import { useBlockProps } from "@wordpress/block-editor";
import { InnerBlocks } from "@wordpress/block-editor";

interface SaveProps {
  attributes: {
    title: string;
    width: number;
    alignment: string;
  };
}

export default function save({ attributes }: SaveProps) {
  const blockProps = useBlockProps.save();

  const width = attributes.width;
  let characterWidth = Math.round(width * 0.125);

  let alignment = attributes.alignment;
  let margin = "";
  if (alignment === "left") {
    margin = "margin-right: auto;";
  } else if (alignment === "right") {
    margin = "margin-left: auto;";
  } else {
    margin = "margin: 0 auto;";
  }


  return (
          <div 
            className={`limit-width ${blockProps?.className}`}
            style={{ maxWidth: `min(${characterWidth}ch, 100%)`, margin }}
          >
            <InnerBlocks.Content />
          </div>
  );
}

{/* <div class="limit-width" style="max-width: min(60ch, 100%); margin: 0 auto;"></div> */}
