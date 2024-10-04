import {
  PanelBody,
  CheckboxControl,
  __experimentalText as Text,
  __experimentalDivider as Divider,
  __experimentalHeading as Heading,
  __experimentalSpacer as Spacer,
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
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
 * @param {*} attributes
 * @param {*} setAttributes
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
      />
    </PanelBody>
  );
};

export default AdvancedSettings;
