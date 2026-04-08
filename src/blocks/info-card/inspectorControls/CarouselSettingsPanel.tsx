import { PanelBody, RangeControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

interface Props {
  isVisible: boolean;
  cardHeight: number;
  onChange: (value: number) => void;
}

const CarouselSettingsPanel = ({ isVisible, cardHeight, onChange }: Props) => {
  if (!isVisible) {
    return null;
  }

  return (
    <PanelBody title={__("Carousel Settings", "rrze-elements-blocks")}>
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

export default CarouselSettingsPanel;
