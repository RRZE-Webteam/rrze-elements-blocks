import {
  useBlockProps,
  InnerBlocks,
  BlockControls,
} from "@wordpress/block-editor";

import { __ } from "@wordpress/i18n";
import { AlignmentBar } from "../../components/Alignment";

interface EditProps {
  blockProps: string[];
  attributes: {
    alignment: string;
  };
  setAttributes: (attributes: Partial<EditProps["attributes"]>) => void;
}

/**
 * Edit component for the Insertion block.
 *
 * Provides controls for customizing the Insertion-block and renders the block inside the editor.
 *
 * @param props - The properties passed to the component.
 * @returns     - The JSX representation of the component.
 */
export default function Edit({
  attributes,
  setAttributes,
}: EditProps) {
  const props = useBlockProps();
  const alignment = attributes.alignment;

  return (
    <>
      <div {...props}>
        <BlockControls>
          <AlignmentBar
            attributes={{ alignment }}
            setAttributes={setAttributes}
          />
        </BlockControls>
        <aside className={`pull-${alignment} ${props?.className}`}>
          <InnerBlocks
            allowedBlocks={[
              "core/paragraph",
              "core/heading",
              "core/list",
              "core/image",
              "rrze-faudir/block",
            ]}
            template={[
              [
                "core/paragraph",
                { placeholder: __("Insertion", "rrze-elements-blocks") },
              ],
            ]}
          />
        </aside>
      </div>
    </>
  );
}
