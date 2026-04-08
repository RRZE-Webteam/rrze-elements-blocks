import { PanelBody, ColorPalette } from "@wordpress/components";
import { ContrastChecker } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import { InfoCardAttributes } from "../types";

interface BackgroundColorPanelProps {
  backgroundColor: string;
  desktopCustomTextColor: string;
  palette: { name: string; color: string }[];
  setAttributes: (attrs: Partial<InfoCardAttributes>) => void;
}

const BackgroundColorPanel = ({ backgroundColor, desktopCustomTextColor, palette, setAttributes }: BackgroundColorPanelProps) => (
  <PanelBody title={__("Background Color", "rrze-elements-blocks")} initialOpen={false}>
    <ContrastChecker backgroundColor={backgroundColor} textColor={desktopCustomTextColor}/>
    <ColorPalette
      colors={palette}
      value={backgroundColor}
      onChange={(color) => setAttributes({backgroundColor: color || '#04316a'})}
      clearable={true}
    />
  </PanelBody>
);

export default BackgroundColorPanel;
