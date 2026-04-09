import { PanelBody, RangeControl, AlignmentMatrixControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

interface LayoutPanelProps {
  desktopContentWidth: number;
  onChange: (value: number) => void;
  showAlignmentControl?: boolean;
  alignmentValue?: string;
  onAlignmentChange?: (value: string) => void;
}

const LayoutPanel = ({ desktopContentWidth, onChange, showAlignmentControl, alignmentValue = 'center left', onAlignmentChange }: LayoutPanelProps) => (
  <PanelBody title={__("Layout", "rrze-elements-blocks")} initialOpen={false}>
    <RangeControl
      label={__("Desktop card width (px)", "rrze-elements-blocks")}
      value={desktopContentWidth}
      onChange={(value?: number) => {
        if (typeof value !== 'number') {
          onChange(320);
          return;
        }
        onChange(value);
      }}
      min={320}
      max={520}
      step={2}
      help={__("Desktop cards can only be wider than the default. Tablet and mobile widths stay fixed.", "rrze-elements-blocks")}
    />
    {showAlignmentControl && onAlignmentChange && (
      <AlignmentMatrixControl
        label={__("Card text alignment", "rrze-elements-blocks")}
        value={alignmentValue as any}
        onChange={(value) => onAlignmentChange(value || 'center left')}
      />
    )}
  </PanelBody>
);

export default LayoutPanel;
