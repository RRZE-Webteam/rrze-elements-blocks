import {
  PanelBody,
  CheckboxControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";

type AdvancedSettingsProps = {
  attributes: {
    loadOpen: boolean;
  };
  setAttributes: (newAttributes: { loadOpen: boolean }) => void;
}

/**
 * Handles the Expand All Link selection inside the InspectorControls
 * @param attributes - The attributes of the block
 * @param setAttributes - The function to set the attributes of the block
 * @returns JSX element
 * @see edit.js
 */
const AdvancedSettings = ({ attributes, setAttributes }: AdvancedSettingsProps) => {
  const updateloadOpen = () => {
    setAttributes({ loadOpen: !attributes.loadOpen });
  };

  return (
    <PanelBody title={__("Advanced Settings", "rrze-elements-blocks")}>
      <CheckboxControl
        label={__("Open collapse on Page load", "rrze-elements-blocks")}
        checked={attributes.loadOpen}
        onChange={() => updateloadOpen()}
        __nextHasNoMarginBottom
      />
    </PanelBody>
  );
};

export default AdvancedSettings;
