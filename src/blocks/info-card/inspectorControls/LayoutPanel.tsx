import { PanelBody, RangeControl, AlignmentMatrixControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

interface LayoutPanelProps {
  showWidthControl: boolean;
  desktopContentWidth: number;
  onChange: (value: number) => void;
  showAlignmentControl?: boolean;
  alignmentValue?: string;
  onAlignmentChange?: (value: string) => void;
}

/**
 * Offers fixed widths for list cards and text alignment for marketing cards.
 *
 * @param props - Available layout controls, saved values and update callbacks.
 * @returns The applicable controls, or nothing when the card has no layout options.
 */
const LayoutPanel = ({ showWidthControl, desktopContentWidth, onChange, showAlignmentControl, alignmentValue = 'center left', onAlignmentChange }: LayoutPanelProps) => {
  if (!showWidthControl && !(showAlignmentControl && onAlignmentChange)) {
    return null;
  }

  return (
    <PanelBody title={__("Layout", "rrze-elements-blocks")} initialOpen={false}>
      {showWidthControl && <RangeControl
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
      />}
      {showAlignmentControl && onAlignmentChange && (
        <AlignmentMatrixControl
          label={__("Card text alignment", "rrze-elements-blocks")}
          value={alignmentValue as any}
          onChange={(value) => onAlignmentChange(value || 'center left')}
        />
      )}
    </PanelBody>
  );
};

export default LayoutPanel;
