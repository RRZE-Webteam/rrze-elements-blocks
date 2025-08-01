import {
  useBlockProps,
  InnerBlocks, BlockControls,
} from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";
import type { ComponentType } from "@wordpress/element";
import { useRef } from "@wordpress/element";

type WPBlock = {
  clientId: string;
  innerBlocks: WPBlock[];
};

interface EditProps {
  clientId: string;
  attributes: Record<string, unknown>;
  setAttributes: (a: Record<string, unknown>) => void;
}

const MAX_CHILDREN = 4;

export default function Edit({ clientId }: EditProps) {
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
    <ul className={"facts"}>
      <InnerBlocks
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
