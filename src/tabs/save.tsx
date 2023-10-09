import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

interface SaveProps {
  attributes: {
    color: string;
  };
}

export default function save({ attributes }: SaveProps) {
  const blockProps = useBlockProps.save();

  return (
    <div {...blockProps}>
      {" "}
      <>
        <div className="rrze-elements-tabs primary" id="tabs-1">
          // For each tab, add a button and a tabpanel.
          <div role="tablist" className="manual">
            <button
              id="tab-1_reiter-1"
              type="button"
              role="tab"
              aria-selected="true"
              aria-controls="tab-1_tabpanel_reiter-1"
            >
              <span className="focus" tabIndex={-1}>
                Reiter 1
              </span>
            </button>
            <button
              id="tab-1_reiter-2"
              type="button"
              role="tab"
              aria-selected="false"
              aria-controls="tab-1_tabpanel_reiter-2"
              tabIndex={-1}
            >
              <span className="focus" tabIndex={-1}>
                Reiter 2
              </span>
            </button>
            <button
              id="tab-1_reiter-3"
              type="button"
              role="tab"
              aria-selected="false"
              aria-controls="tab-1_tabpanel_reiter-3"
              tabIndex={-1}
            >
              <span className="focus" tabIndex={-1}>
                Reiter 3
              </span>
            </button>
          </div>
          <div
            id="tab-1_tabpanel_reiter-1"
            role="tabpanel"
            aria-labelledby="tab-1_reiter-1"
            className=""
          >
            <h2 className="print-only">Reiter 1</h2>
            <p>Text 1</p>
          </div>
          <div
            id="tab-1_tabpanel_reiter-2"
            role="tabpanel"
            aria-labelledby="tab-1_reiter-2"
            className="is-hidden"
          >
            <h2 className="print-only">Reiter 2</h2>
            <p>Text 2</p>
          </div>
          <div
            id="tab-1_tabpanel_reiter-3"
            role="tabpanel"
            aria-labelledby="tab-1_reiter-3"
            className="is-hidden"
          >
            <h2 className="print-only">Reiter 3</h2>
            <p>Text 3</p>
          </div>
        </div>
      </>
    </div>
  );
}
