import {
  useBlockProps,
  InnerBlocks,
  store as blockEditorStore,
} from "@wordpress/block-editor";

import {RichText} from "@wordpress/block-editor";
import {__, sprintf} from "@wordpress/i18n";
import {useSelect} from "@wordpress/data";
import HeadingComponent from "../../components/HeadingComponent";
import {useEffect} from "@wordpress/element";

type SaveProps = {
  attributes: {
    title: string;
    hstart: number;
    stepLabel: string;
  };
  setAttributes: (attributes: Partial<SaveProps["attributes"]>) => void;
  clientId: string;
  context: { [key: string]: any };
};

export default function Edit({
                               attributes,
                               setAttributes,
                               clientId,
                               context,
                             }: SaveProps) {
  const props = useBlockProps();
  const {title, stepLabel} = attributes;
  const stepNumber = useSelect(
    (select) => {
      const blockEditor = select(blockEditorStore);
      const parentClientId = blockEditor.getBlockRootClientId(clientId);
      const siblingClientIds = parentClientId
        ? blockEditor.getBlockOrder(parentClientId)
        : [];
      const stepIndex = siblingClientIds.indexOf(clientId);

      return stepIndex >= 0 ? stepIndex + 1 : 1;
    },
    [clientId]
  );

  /**
   * Set the heading level attribute based on the global setting.
   */
  useEffect(() => {
    setAttributes({
      hstart: context["rrze-elements/timeline-hstart"],
    });
  }, [context["rrze-elements/timeline-hstart"]]);

  const onChangeTitle = (newText: string) => {
    if (newText === "") {
      setAttributes({title: ""});
    } else {
      setAttributes({title: newText});
    }
  };

  const onChangeStepLabel = (newLabel: string) => {
    setAttributes({stepLabel: newLabel});
  }

  return (
    <li {...props}>
      <div className="tooltip">
        <div className="step-label">
          <RichText
            tagName="p"
            value={stepLabel}
            onChange={onChangeStepLabel}
            placeholder={sprintf(
              /* translators: %d: position of the step within the process. */
              __("Step %d", "rrze-elements-blocks"),
              stepNumber
            )}
            allowedFormats={[]}
            className="rrze-elements-blocks-process-step-label"
          />
        </div>
        <div className="step-icon"></div>
        <div className="step-content">
          <HeadingComponent level={attributes.hstart} className="timeline-label">
            <RichText
              tagName="p"
              value={title}
              onChange={onChangeTitle}
              placeholder={__("Add a concise step title", "rrze-elements-blocks")}
              allowedFormats={[]}
              className="elements-blocks-input-following-icon"
            />
          </HeadingComponent>
          <InnerBlocks
            template={[
              [
                "core/paragraph",
                {placeholder: __("Provide the key information needed to complete this step.", "rrze-elements-blocks")},
              ],
            ]}
            allowedBlocks={["core/paragraph", "core/heading", "core/spacer", "core/image", "core/list", "core/buttons", "core/button", "core/quote", "core/quotes", "core/media-text"]}
            templateLock={false}
          />
        </div>
      </div>
    </li>
  );
}
