import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

interface SaveProps {
  attributes: {
    color: string;
    active: string;
    blockId: string;
    innerClientIds: {
      clientId: string;
      title: string;
      position: number;
      svgString: string;
    }[];
  };
}

/**
 * Save Component for the Tabs WordPress block.
 *
 * This component serves as the Save function for the Tabs WordPress block.
 * It controls the block's display inside the frontend using data stored as attributes.
 */
export default function save({ attributes }: SaveProps) {
  const blockProps = useBlockProps.save();
  const uid = attributes.blockId;
  
  return (
    <div {...blockProps}>
      <div className={`rrze-elements-tabs primary ${attributes.color}`} id={`tabs-${uid}`}>
        <div role="tablist" className="manual">
          {attributes.innerClientIds.map((innerClientId, index) => {
            const innerUid = innerClientId.clientId.slice(0, 10);
            const isSelected = innerClientId.clientId === attributes.active || attributes.active === "";
            
            return (
              <button
                key={index}
                id={innerUid}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls={`tab-${uid}_tabpanel_tab-label-${innerUid}`}
                dangerouslySetInnerHTML={{
                  __html: `<span class="focus" tabIndex=-1>
                  ${innerClientId.svgString} ${innerClientId.title}</span>`,
                }}
              >
                <span className="focus" tabIndex={-1}>
                  {innerClientId.title}
                </span>
              </button>
            );
          })}
        </div>
        <InnerBlocks.Content />
      </div>
    </div>
  );
}
