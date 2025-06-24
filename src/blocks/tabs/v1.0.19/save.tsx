import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { BlockSaveProps } from "@wordpress/blocks";
import { AttributesV1_0_19 } from "./attributes";
import type { CSSProperties } from 'react';

const Save = ({ attributes }: BlockSaveProps<AttributesV1_0_19>) => {
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
              >
                <span className="focus" tabIndex={-1}>
                  <span className={`${innerClientId.svgString}`}></span>{` ${innerClientId.title}`}
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

export default Save;
