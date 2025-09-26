import { CheckboxControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

type SaveProps = {
	attributes: {
		expandAllLink: boolean;
	};
	setAttributes: (newAttributes: { expandAllLink: boolean }) => void;
};

/**
 * Handles the Expand All Link selection inside the InspectorControls
 * @param attributes - The attributes of the block
 * @param setAttributes - The function to set the attributes of the block
 * @returns JSX element
 * @see edit.js
 */
const ExpandAllLinkSelector = ({ attributes, setAttributes }: SaveProps) => {
	const updateExpandAllLink = () => {
		setAttributes({ expandAllLink: !attributes.expandAllLink });
	};

	return (
		<CheckboxControl
			label={__("Show Expand-All-Link", "rrze-elements-blocks")}
			checked={attributes.expandAllLink}
			onChange={updateExpandAllLink}
      __nextHasNoMarginBottom
		/>
	);
};

export default ExpandAllLinkSelector;
