import { __ } from "@wordpress/i18n";
import {
	ColorPalette,
	PanelBody,
	ToolbarDropdownMenu,
	ToolbarItem,
	ToolbarGroup,
	ColorPicker,
} from "@wordpress/components";
import { color as colorIcon } from "@wordpress/icons";
//@ts-ignore
import { useSettings } from "@wordpress/block-editor";
import Color from "color";

type ColorSwitcherProps = {
	attributes: {
		color: string;
		borderColor?: string;
		style?: string;
	};
	setAttributes: (newAttributes: {
		color?: string;
		style?: string;
		textColor?: string;
		borderColor?: string;
	}) => void;
	colorData?: { color: string; slug: string; name: string }[];
	hex?: boolean;
	useStyle?: boolean;
	customColor?: boolean;
	useTextColor?: boolean;
	overwriteThemeColors?: boolean;
	clearButton?: boolean;
};

/**
 * Updates color attributes based on color contrast.
 *
 * @param bgColor - Background color.
 * @param setAttributes - Function to set attributes.
 */
const updateColorAttributes = (
	bgColor: string,
	setAttributes: ColorSwitcherProps["setAttributes"],
): void => {
	try {
		if (bgColor) {
			const parsedColor = Color(bgColor).isDark();

			const whiteColor = "#ffffff";

			// Determine text color based on the luminosity of the background color
			const newFontColor = parsedColor ? whiteColor : "";

			// Update text color attribute
			setAttributes({ textColor: newFontColor });
		}
	} catch (error) {
		//eslint-disable-next-line
		console.error(
			"Invalid color string provided to updateColorAttributes:",
			error,
		);
	}
};

/**
 * Handles changes in color selection.
 *
 * @param colorData - Array of color data.
 * @param newColor - New color value.
 * @param setAttributes - Function to set attributes.
 * @param outputHex - Outputs hex value if true. Defaults to `false`.
 * @param useStyle - Uses style attributes if true. Defaults to `false`.
 * @param useTextColor - Uses text color based on selected color if true. Defaults to `false`.
 */
const handleColorChange = (
	colorData: { color: string; slug: string; name: string }[],
	newColor: string,
	setAttributes: (newAttributes: { color?: string; style?: string }) => void,
	outputHex: boolean = false,
	useStyle: boolean = false,
	useTextColor: boolean = false,
) => {
	const colorEntry = colorData.find((entry) => entry.color === newColor);
	if (colorEntry && outputHex) {
		setAttributes({ color: colorEntry.color });
		updateColorAttributes(newColor, setAttributes);
		if (useStyle) {
			setAttributes({ style: colorEntry.slug });
			updateColorAttributes(newColor, setAttributes);
		}
	} else if (colorEntry) {
		setAttributes({ color: colorEntry.slug });
	} else {
		if (useStyle) {
			setAttributes({ color: newColor, style: "" });
			if (useTextColor) {
				updateColorAttributes(newColor, setAttributes);
			}
		}
	}
};

/**
 * ColorSwitcher component.
 * Provides a UI for color selection in block editor.
 *
 * @param props - Component properties.
 * @returns Rendered ColorSwitcher component.
 */
const ColorSwitcher = ({
	attributes,
	setAttributes,
	hex,
	useStyle,
	customColor = false,
	useTextColor = false,
	overwriteThemeColors = false,
	clearButton = false,
}: ColorSwitcherProps) => {
	// if the theme colorPalette is not empty, use it instead of the passed values!
	// Example entry from colorPalette [Log] [{slug: "primary", color: "#005177", name: "Primary"}, {slug: "accent", color: "#f2a900", name: "Accent"}] (2)
	// const colorPalette = useSetting( 'color.palette' );
	// console.log(colorPalette);
	const themeColorPalette = !overwriteThemeColors
		? (useSettings("color.palette")[0] as {
				color: string;
				slug: string;
				name: string;
			}[])
		: null;
	const colorData = themeColorPalette || standardColorData;

	const value = hex
		? attributes.color
		: colorData.find((entry) => entry.slug === attributes.color)?.color;

	return (
		<PanelBody title={__("Color Settings", "rrze-elements-blocks")}>
			<ColorPalette
				colors={colorData}
				value={value}
				onChange={(newColor: string) =>
					handleColorChange(
						colorData,
						newColor,
						setAttributes,
						hex,
						useStyle,
						useTextColor,
					)
				}
				disableCustomColors={!customColor}
				clearable={clearButton}
			/>
		</PanelBody>
	);
};

/**
 * ColorSwitcherToolbar component.
 * Provides a toolbar for color selection.
 *
 * @param props - Component properties.
 * @returns Rendered ColorSwitcherToolbar component.
 */
const ColorSwitcherToolbar = ({
	attributes,
	setAttributes,
	colorData = standardColorData,
	useStyle = false,
	hex = false,
	overwriteThemeColors = false,
}: ColorSwitcherProps) => {
	const themeColorPalette = !overwriteThemeColors
		? (useSettings("color.palette")[0] as {
				color: string;
				slug: string;
				name: string;
			}[])
		: null;

	const effectiveColorData = themeColorPalette || colorData;

	let classLabel = `rrzeElementsBFakColorSelector`;
	if (attributes.color) {
		classLabel = hex
			? `rrzeElementsBFakColorSelector ${attributes.color.slice(1)}`
			: `rrzeElementsBFakColorSelector ${attributes.color}`;
	}

	return (
		<ToolbarGroup>
			<ToolbarItem>
				{() => (
					<ToolbarDropdownMenu
						icon={colorIcon}
						className={classLabel}
						label={__("Select a Color", "rrze-elements-blocks")}
						controls={effectiveColorData.map((entry) => ({
							key: entry.slug,
							title: entry.name,
							icon: colorIcon,
							onClick: () =>
								setAttributes({
									color: hex ? entry.color : entry.slug,
									style: useStyle ? entry.slug : "",
								}),
						}))}
					/>
				)}
			</ToolbarItem>
		</ToolbarGroup>
	);
};

/**
 * BorderColorPicker component.
 * Provides a UI for border color selection in block editor.
 *
 * @param props - Component properties.
 * @returns Rendered BorderColorPicker component.
 */
const BorderColorPicker = ({
	attributes,
	setAttributes,
}: ColorSwitcherProps) => {
	/**
	 * Handle color change.
	 *
	 * @param newColor - The new selected color.
	 */
	const onChangeColor = (newColor: string) => {
		setAttributes({ borderColor: newColor });
	};

	// Render ColorSwitcher component
	return (
		<PanelBody
			title={__("Border Settings", "rrze-elements-blocks")}
			initialOpen={false}
		>
			<ColorPicker color={attributes.borderColor} onChange={onChangeColor} />
		</PanelBody>
	);
};

// Default color data
const standardColorData = [
	{
		color: "#04316A",
		slug: "",
		name: __("Central institution", "rrze-elements-blocks"),
	},
	{
		color: "#C50F3C",
		slug: "rw",
		name: __("Faculty of Business, Economics, and Law", "rrze-elements-blocks"),
	},
	{
		color: "#7bb725",
		slug: "nat",
		name: __("Faculty of Sciences", "rrze-elements-blocks"),
	},
	{
		color: "#18B4F1",
		slug: "med",
		name: __("Faculty of Medicine", "rrze-elements-blocks"),
	},
	{
		color: "#FDB735",
		slug: "phil",
		name: __(
			"Faculty of Humanities, Social Sciences, and Theology",
			"rrze-elements-blocks",
		),
	},
	{
		color: "#8C9FB1",
		slug: "tf",
		name: __("Faculty of Engineering", "rrze-elements-blocks"),
	},
];

const extendedColorData: { color: string; slug: string; name: string }[] = [
	{
		color: "#fff",
		slug: "inherit",
		name: __("Inherit color", "rrze-elements-blocks"),
	},
	...standardColorData,
];

// Export components using different colorData
export const StandardColorSwitcher = (props: ColorSwitcherProps) => (
	<ColorSwitcher {...props} />
);
export const StandardColorSwitcherToolbar = (props: ColorSwitcherProps) => (
	<ColorSwitcherToolbar {...props} />
);

export const ExtendedColorSwitcher = (props: ColorSwitcherProps) => (
	<ColorSwitcher {...props} colorData={extendedColorData} />
);
export const ExtendedColorSwitcherToolbar = (props: ColorSwitcherProps) => (
	<ColorSwitcherToolbar {...props} colorData={extendedColorData} />
);

export { BorderColorPicker };
