import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

import { IconPicker } from "../../components/IconPicker";
import { TitleInspectorControls } from "./TitleSettings";

/**
 * EditProps interface for CustomInspectorControls component.
 *
 * @interface EditProps
 * @property {Object} attributes - The attributes for the block.
 * @property {string} [attributes.svgString] - The SVG string for the icon.
 * @property {string} [attributes.icon] - The icon name.
 * @property {string} [attributes.title] - The title.
 * @property {Function} setAttributes - The function to set new attributes.
 */
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
 *
 * @component
 * @param {EditProps} props - The properties.
 * @returns {JSX.Element} The `CustomInspectorControls` component.
 */
const CustomInspectorControls = ({
    attributes,
    setAttributes,
    }: EditProps): JSX.Element => {
    
    return (
        <>
        <InspectorControls>
        <TitleInspectorControls attributes={{title: attributes.title}} setAttributes={setAttributes} />
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
}

export { CustomInspectorControls };