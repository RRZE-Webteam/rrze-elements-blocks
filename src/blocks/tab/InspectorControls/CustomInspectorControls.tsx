import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

import { IconPicker } from "../../../components/IconPicker";
import { TitleInspectorControls } from "./TitleSettings";

interface EditProps {
	attributes: {
		svgString?: string;
		icon?: string;
		title?: string;
	};

	setAttributes: (attributes: Partial<EditProps["attributes"]>) => void;
}

/**
 * CustomInspectorControls component to display additional settings in the block inspector.
 * @param props - The properties.
 * @returns     - The `CustomInspectorControls` component.
 */
const CustomInspectorControls = ({ attributes, setAttributes }: EditProps) => {
	return (
		<>
			<InspectorControls>
				<TitleInspectorControls
					attributes={{ title: attributes.title }}
					setAttributes={setAttributes}
				/>
				<PanelBody title={__("Icon Settings", "rrze-elements-blocks")}>
					<IconPicker
						attributes={{
							icon: attributes.icon,
							svgString: attributes.svgString,
						}}
						setAttributes={setAttributes}
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
};

export { CustomInspectorControls };
