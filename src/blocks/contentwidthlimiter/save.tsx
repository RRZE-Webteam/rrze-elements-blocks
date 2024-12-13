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
  let marginStyle = "";
  if (alignment === "left") {
    marginStyle = "margin-right: auto;";
  } else if (alignment === "right") {
    marginStyle = "margin-left: auto;";
  } else {
    marginStyle = "margin: 0 auto;";
  }

  // Helper function to convert CSS string to style object
  function cssStringToStyleObject(cssString: string) {
    const styles = cssString
      .split(";")
      .map((style) => style.split(":"))
      .reduce((styleObj, style) => {
        if (style.length === 2) {
          const key = style[0].trim();
          const value = style[1].trim();
          styleObj[key] = value;
        }
        return styleObj;
      }, {} as { [key: string]: string });
    return styles;
  }

  return (
    <div
      className={`limit-width ${blockProps?.className}`}
      style={{
        maxWidth: `min(${characterWidth}ch, 100%)`,
        ...cssStringToStyleObject(marginStyle),
      }}
    >
      <InnerBlocks.Content />
    </div>
  );
}

{
  /* <div class="limit-width" style="max-width: min(60ch, 100%); margin: 0 auto;"></div> */
}
