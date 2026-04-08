import { PanelBody, ToggleControl, BaseControl, GradientPicker } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { InfoCardAttributes } from "../types";

interface EffectsPanelProps {
  backgroundOverlayEnabled: boolean;
  backgroundOverlayGradient?: string;
  overlayGradient: string;
  overlayGradientOptions: { name: string; gradient: string; slug: string }[];
  textShadowEnabled: boolean;
  setAttributes: (attrs: Partial<InfoCardAttributes>) => void;
}

const EffectsPanel = ({
  backgroundOverlayEnabled,
  backgroundOverlayGradient,
  overlayGradient,
  overlayGradientOptions,
  textShadowEnabled,
  setAttributes,
}: EffectsPanelProps) => (
  <PanelBody title={__("Effects", "rrze-elements-blocks")} initialOpen={false}>
    <ToggleControl
      label={__("Show background overlay", "rrze-elements-blocks")}
      help={__("Adds a gradient overlay on top of the background media to improve text contrast.", "rrze-elements-blocks")}
      checked={backgroundOverlayEnabled}
      onChange={(value: boolean) => setAttributes({backgroundOverlayEnabled: value})}
    />
    {backgroundOverlayEnabled && (
      <BaseControl label={__("Overlay gradient", "rrze-elements-blocks")}>
        <GradientPicker
          value={backgroundOverlayGradient || overlayGradient}
          onChange={(gradientValue?: string) => setAttributes({backgroundOverlayGradient: gradientValue || ''})}
          gradients={overlayGradientOptions}
        />
      </BaseControl>
    )}
    <ToggleControl
      label={__("Enable text shadow", "rrze-elements-blocks")}
      checked={textShadowEnabled}
      onChange={(value: boolean) => setAttributes({textShadowEnabled: value})}
    />
  </PanelBody>
);

export default EffectsPanel;
