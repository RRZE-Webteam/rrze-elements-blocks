import {
  useBlockProps,
  InnerBlocks,
} from "@wordpress/block-editor";

import { RichText } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import HeadingComponent from "../../components/HeadingComponent";
import { useEffect } from "@wordpress/element";

type SaveProps = {
  attributes: {
    title: string;
    hstart: number;
  };
  setAttributes: (attributes: Partial<SaveProps["attributes"]>) => void;
  clientId?: string;
  context: { [key: string]: any };
};

export default function Edit({
  attributes,
  setAttributes,
  context,
}: SaveProps) {
  const props = useBlockProps();
  const title = attributes.title;

  /**
   * Set the heading level attribute based on the global setting.
   */
  useEffect(() => {
    setAttributes({
      hstart: context["rrze-elements/timeline-hstart"],
    });
  }),
    [context["rrze-elements/timeline-hstart"]];

  // Function to handle the change of the title attribute.
  const onChangeTitle = (newText: string) => {
    if (newText === "") {
      setAttributes({ title: "" });
    } else {
      setAttributes({ title: newText });
    }
  };

  return (
    <li {...props}>
      <div className="tooltip">
        <div className="tooltip-arrow"></div>
        <HeadingComponent level={attributes.hstart} className="timeline-label">
          <RichText
            tagName="p"
            value={title}
            onChange={onChangeTitle}
            placeholder={__("Enter a Date or Label", "rrze-elements-blocks")}
            allowedFormats={[]}
            className="elements-blocks-input-following-icon"
          />
        </HeadingComponent>
        <InnerBlocks
          template={[
            [
              "core/paragraph",
              { placeholder: __("Add a description…", "rrze-elements-blocks") },
            ],
          ]}
          allowedBlocks={["core/paragraph"]}
          templateLock={false}
        />
      </div>
    </li>
  );
}
