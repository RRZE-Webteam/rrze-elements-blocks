import { PanelBody, RangeControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

interface Props {
  isVisible: boolean;
  cardHeight: number;
  onChange: (value: number) => void;
}

/**
 * Exposes height for independent cards; containers own inherited heights.
 *
 * @param props - Visibility, current height and update callback.
 * @returns The height control when the card controls its own layout.
 */
const CardSettingsPanel = ({ isVisible, cardHeight, onChange }: Props) => {
  if (!isVisible) {
    return null;
  }

  return (
    <PanelBody title={__("Card Settings", "rrze-elements-blocks")}>
      <RangeControl
        label={__("Card Height (px)", "rrze-elements-blocks")}
        value={cardHeight}
        onChange={(value?: number) => {
          if (typeof value === 'number') {
            onChange(value);
          }
        }}
        min={350}
        max={680}
      />
    </PanelBody>
  );
};

export default CardSettingsPanel;
