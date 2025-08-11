import {
  useBlockProps,
  InnerBlocks, BlockControls, RichText,
} from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";
import type { ComponentType } from "@wordpress/element";
import { useRef } from "@wordpress/element";
import {__} from "@wordpress/i18n";
// @ts-ignore
import {HeadingLevelDropdown} from "@wordpress/block-editor";

type WPBlock = {
  clientId: string;
  innerBlocks: WPBlock[];
};

interface EditProps {
  clientId: string;
  attributes: {
    title: string;
    headingLevel: number;
  };
  setAttributes: (a: Record<string, unknown>) => void;
}

const MAX_CHILDREN = 4;

export default function Edit({attributes, setAttributes, clientId }: EditProps) {
  const blockProps   = useBlockProps();
  const containerRef = useRef<HTMLDivElement>(null);

  const childCount = useSelect(
    (select) => {
      const { getBlock } = select("core/block-editor") as {
        getBlock: (id: string) => WPBlock | undefined;
      };
      return getBlock(clientId)?.innerBlocks.length ?? 0;
    },
    [clientId]
  );

  const ConditionalAppender: ComponentType = (props) =>
    childCount < MAX_CHILDREN ? (
      <InnerBlocks.ButtonBlockAppender {...props} />
    ) : null;

  return (
    <div {...blockProps}>
      <BlockControls>
        <HeadingLevelDropdown
          onChange={(headingLevel: number) => {setAttributes({ headingLevel })}}
          options={[
            2,
            3,
            4,
            5,
            6
          ]}
          value={attributes.headingLevel}
        />
      </BlockControls>
      <div className={"wp-block-fau-elemental-fau-meta-headline"}>
        <RichText
          tagName="span"
          value={attributes.title}
          onChange={(title) => setAttributes({title})}
          allowedFormats={[]}
          placeholder={__("Section Heading", "rrze-elements-blocks")}
        />
      </div>
    <ul className={"facts"}>
      <InnerBlocks
        orientation="horizontal"
        template={[
          ["rrze-elements/fact"],
          ["rrze-elements/fact"],
          ["rrze-elements/fact"],
          ["rrze-elements/fact"],
        ]}
        allowedBlocks={["rrze-elements/fact"]}
        renderAppender={ConditionalAppender}
      />
    </ul>
    </div>
  );
}
