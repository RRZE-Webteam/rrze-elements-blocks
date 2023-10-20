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
    }[];
  };
}

export default function save({ attributes }: SaveProps) {
  const blockProps = useBlockProps.save();

  const ariaSelected: any = (index: number) => {
    if (attributes.innerClientIds[index] === undefined) {
      return true;
    }
    if (
      attributes.innerClientIds[index].clientId === attributes.active ||
      attributes.active === ""
    ) {
      return true;
    }
    return false;
  };
  
  const uid= attributes.blockId;

  return (
    <div {...blockProps}>
      {" "}
      <>
        <div className={`rrze-elements-tabs primary ${attributes.color}`} id={`tabs-${uid}`}>
          <div role="tablist" className="manual">
          {attributes.innerClientIds.map((innerClientId, index) => {
            const innerUid = innerClientId["clientId"].slice(0, 10);
            return (
              <button
                key={index}
                id={innerUid}
                type="button"
                role="tab"
                aria-selected={ariaSelected(index)}
                aria-controls={`tab-${uid}_tabpanel_tab-label-${innerUid}`}
              >
                <span className="focus" tabIndex={-1}>
                  {innerClientId["title"]}
                </span>
              </button>
            );
          })}
          </div>
         <InnerBlocks.Content />
        </div>
      </>
    </div>
  );
}
