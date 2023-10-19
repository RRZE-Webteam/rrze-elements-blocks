import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

interface SaveProps {
  attributes: {
    color: string;
    active: string;
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

  return (
    <div {...blockProps}>
      {" "}
      <>
        <div className={`rrze-elements-tabs primary ${attributes.color}`} id="tabs-1">
          <div role="tablist" className="manual">
          {attributes.innerClientIds.map((innerClientId, index) => {
            return (
              <button
                key={index}
                id={innerClientId["clientId"]}
                type="button"
                role="tab"
                aria-selected={ariaSelected(index)}
                aria-controls={`${innerClientId["position"]}`}
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
