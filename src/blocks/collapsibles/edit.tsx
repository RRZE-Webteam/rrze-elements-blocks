import {
  useBlockProps,
  InnerBlocks,
  InspectorControls,
  BlockControls,
  store as blockEditorStore,
} from "@wordpress/block-editor";
import { PanelBody, ToolbarButton, ToolbarGroup, ToggleControl } from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";
import ExpandAllLink from "../../components/ExpandAllLink";
import {
  HeadingSelector,
  HeadingSelectorInspector,
} from "../../components/HeadingSelector";
import { useEffect } from "@wordpress/element";
import PersonRaisedHand from "../../_shared/icons/symbols/person_raised_hand.svg";

type EditProps = {
  attributes: {
    faqSchema: boolean;
    expandAllLink: boolean;
    hstart: number;
    expandLabel: string;
  };
  setAttributes: (newAttributes: {
    faqSchema?: boolean;
    expandAllLink?: boolean;
    hstart?: number;
    expandLabel?: string;
  }) => void;
  clientId: string;
};

/**
 * Edits accordion settings and shares the FAQ state between toolbar and inspector.
 *
 * @param props - The block attributes, update callback and editor client ID.
 * @returns The accordion editor and its controls.
 */
export default function Edit({
  attributes,
  setAttributes,
  clientId,
}: EditProps) {
  const props = useBlockProps();
  const faqSchema = attributes.faqSchema === true;

  /**
   * Stores an explicit boolean for both FAQ controls.
   *
   * @param enabled - Whether the accordion should emit FAQ microdata.
   */
  const updateFaqSchema = (enabled: boolean) => {
    setAttributes({faqSchema: enabled});
  };

  /** Toggles the parent's FAQ mode without changing individual items. */
  const toggleFaqSchema = () => updateFaqSchema(!faqSchema);

  const isMediaAccordionChild = useSelect((select) => {
    const {getBlockName, getBlockRootClientId} = select(blockEditorStore);
    const parentClientId = getBlockRootClientId(clientId);

    return parentClientId
      ? getBlockName(parentClientId) === "rrze-elements/media-accordion"
      : false;
  }, [clientId]);

  const expandLabel = __("Expand All", "rrze-elements-blocks");
  useEffect(() => {
    if (attributes.expandLabel !== expandLabel) {
      setAttributes({expandLabel});
    }
  }, [attributes.expandLabel, expandLabel, setAttributes]);

  return (
    <div {...props}>
      <BlockControls>
        <HeadingSelector
          attributes={attributes}
          setAttributes={setAttributes}
        />
        <ToolbarGroup>
          <ToolbarButton
            icon={<PersonRaisedHand aria-hidden="true" focusable="false" />}
            label={__("Mark as FAQ", "rrze-elements-blocks")}
            isPressed={faqSchema}
            onClick={toggleFaqSchema}
          />
        </ToolbarGroup>
      </BlockControls>
      <InspectorControls>
        <PanelBody
          title={__("Heading Settings", "rrze-elements-blocks")}
          initialOpen={true}
        >
          <HeadingSelectorInspector
            attributes={attributes}
            setAttributes={setAttributes}
          />
        </PanelBody>
        <PanelBody
          title={__("Collapsibles Settings", "rrze-elements-blocks")}
          initialOpen={true}
        >
          <ExpandAllLink
            attributes={attributes}
            setAttributes={setAttributes}
          />
          <ToggleControl
            label={__("Mark as FAQ", "rrze-elements-blocks")}
            help={__("Item headings are marked as questions and their contents as answers using Schema.org.", "rrze-elements-blocks")}
            checked={faqSchema}
            onChange={updateFaqSchema}
            __nextHasNoMarginBottom
          />
        </PanelBody>
      </InspectorControls>
      <div className="accordion">
        {attributes.expandAllLink && (
          <div className="button-container-right">
            <button
              className="expand-all standard-btn primary-btn xsmall-btn"
              data-status="closed"
            >
              {__("Expand All", "rrze-elements-blocks")}
            </button>
          </div>
        )}
        <InnerBlocks
          allowedBlocks={["rrze-elements/collapse"]}
          templateLock={isMediaAccordionChild ? false : undefined}
          template={[
            ["rrze-elements/collapse", {}],
            ["rrze-elements/collapse", {}],
          ]}
        />
      </div>
    </div>
  );
}
