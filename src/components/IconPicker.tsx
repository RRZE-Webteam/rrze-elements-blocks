import { __ } from "@wordpress/i18n";
import {
	ComboboxControl,
	Button,
	SearchControl,
	__experimentalGrid as Grid,
	__experimentalHeading as Heading,
	__experimentalSpacer as Spacer,
	__experimentalDivider as Divider,
} from "@wordpress/components";
import {
	useState,
	useEffect,
	useRef,
	memo,
	Fragment,
} from "@wordpress/element";
import fontawesomeIconNames from "./assets/fontawesome/fontawesomeIconNames.json";
import { speak } from "@wordpress/a11y";
import type { KeyboardEvent } from "react";

// You probably already include the core styles
// @import "../<components/assets/fontawesome/scss/fontawesome.scss";

import "./assets/fontawesome/scss/fontawesome.scss";
import "./assets/fontawesome/scss/solid.scss";
import "./assets/fontawesome/scss/brands.scss";
import "./assets/fontawesome/scss/regular.scss";

interface BlockAttributes {
	icon: string;
	svgString: string;
}

type SetAttributesFunction = (attributes: Partial<BlockAttributes>) => void;

/**
 * Fetch and set the SVG string attribute based on the provided type and iconName.
 *
 * @param type - The type of the FontAwesome icon (e.g., solid, regular, brands).
 * @param iconName - The name of the icon.
 * @param attributes - The current block attributes.
 * @param setAttributes - Function to set new attributes for the block.
 */
const fetchSvgIcon = (
	type: string,
	iconName: string,
	attributes: BlockAttributes,
	setAttributes: SetAttributesFunction,
): void => {
	let svgFaClass = "";
	//check if iconName and type are set
	if (iconName && type) {
		svgFaClass = `fa-${type} fa-${iconName}`;
		setAttributes({ svgString: svgFaClass });
	}
};

interface IconPickerProps {
	attributes: BlockAttributes;
	setAttributes: SetAttributesFunction;
}

/**
 * A component for picking icons.
 *
 * @param props - The properties.
 * @returns     - The `IconPicker` component.
 */
const IconPicker = memo(({ attributes, setAttributes }: IconPickerProps) => {
	const [allIconsOptions, setAllIconsOptions] = useState([]);
	const [type, iconName] = attributes.icon.split(" ");

	useEffect(() => {
		const createIconOptions = (icons: string[], label: string) =>
			icons.map((icon) => ({
				value: `${label} ${icon}`,
				label: `${icon} (${label})`,
			}));

		setAllIconsOptions([
			...createIconOptions(fontawesomeIconNames.solid, "solid"),
			...createIconOptions(fontawesomeIconNames.regular, "regular"),
			...createIconOptions(fontawesomeIconNames.brands, "brands"),
		]);
	}, []);

	useEffect(() => {
		fetchSvgIcon(type, iconName, attributes, setAttributes);
	}, [type, iconName, attributes, setAttributes]);

	return (
		<>
			<ComboboxControl
				label={__("Select an icon", "rrze-elements-blocks")}
				onChange={(newIcon) => setAttributes({ icon: newIcon })}
				value={attributes.icon}
				options={allIconsOptions}
				allowReset={false}
			/>
			{attributes.icon !== "" && (
				<Fragment key="iconFragment">
					<span
						key={attributes.icon}
						className={`elements-blocks-icon-selector-display ${attributes.svgString}`}
					></span>
					<Button
						key="removeButton"
						variant="secondary"
						onClick={() => setAttributes({ icon: "", svgString: "" })}
					>
						{__("Remove Icon", "rrze-elements-blocks")}
					</Button>
				</Fragment>
			)}
		</>
	);
});

/**
 * A component for picking icons inside a large modal.
 *
 * @param props - The properties.
 * @returns     - The `IconPicker` component.
 */
const IconPickerModalInset = memo(
	({ attributes, setAttributes }: IconPickerProps) => {
		const [solidIcons, setSolidIcons] = useState([]);
		const [regularIcons, setRegularIcons] = useState([]);
		const [brandIcons, setBrandIcons] = useState([]);
		const [allIcons, setAllIcons] = useState([]);
		const [filteredIcons, setFilteredIcons] = useState([]);
		const [searchQuery, setSearchQuery] = useState("");
		const [showSearchResults, setShowSearchResults] = useState(false);
    //eslint-disable-next-line
		const searchInputRef = useRef<HTMLInputElement>(null);

		const [type, iconName] = attributes.icon.split(" ");

		// const Icon = useDynamicSvgIcon(type, iconName, attributes, setAttributes);

		useEffect(() => {
			const createIconOptions = (icons: string[], label: string) =>
				icons.map((icon) => ({
					value: `${label} ${icon}`,
					label: `${icon} (${label})`,
				}));

			setSolidIcons(createIconOptions(fontawesomeIconNames.solid, "solid"));
			setRegularIcons(
				createIconOptions(fontawesomeIconNames.regular, "regular"),
			);
			setBrandIcons(createIconOptions(fontawesomeIconNames.brands, "brands"));
			setFilteredIcons([
				...createIconOptions(fontawesomeIconNames.solid, "solid"),
				...createIconOptions(fontawesomeIconNames.regular, "regular"),
				...createIconOptions(fontawesomeIconNames.brands, "brands"),
			]);
		}, []);

		useEffect(() => {
			const allIcons = [...solidIcons, ...regularIcons, ...brandIcons];
			setAllIcons(allIcons);
		}, [solidIcons, regularIcons, brandIcons]);

		useEffect(() => {
			fetchSvgIcon(type, iconName, attributes, setAttributes);
		}, [type, iconName, attributes, setAttributes]);

		const onClickIconButton = (iconValue: string) => {
			if (iconValue === attributes.icon) {
				setAttributes({ icon: "" });
			} else {
				setAttributes({ icon: iconValue });
			}
		};

		const handleSearchChange = (searchQuery: string) => {
			setSearchQuery(searchQuery);
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Enter") {
				handleSearch();
			}
		};

		const handleSearch = () => {
			const query = searchQuery.toLowerCase();
			const filteredIcons = allIcons.filter(({ value }) => {
				const [type, iconName] = value.split(" ");
				return type.includes(query) || iconName.includes(query);
			});
			setFilteredIcons(filteredIcons);
			setShowSearchResults(true);
			speak(__("The search results got updated.", "rrze-elements-blocks"));
		};

		return (
			<>
				<p>
					{__("Icons are provided by ", "rrze-elements-blocks")}
					<a
						href="https://fontawesome.com"
						target="_blank"
						rel="noopener noreferrer"
					>
						Font Awesome
					</a>
					{__(
						". You can search for an icon by typing its Font Awesome name in the search field below.",
						"rrze-elements-blocks",
					)}
				</p>
				<Spacer paddingTop="1rem" paddingBottom="1rem">
					<Spacer paddingTop="1rem" paddingBottom="1rem">
						<Heading>
							{__("Search for an Icon", "rrze-elements-blocks")}
						</Heading>
					</Spacer>
					<SearchControl
						label={__("Select an icon", "rrze-elements-blocks")}
						value={searchQuery}
						onChange={handleSearchChange}
						onKeyDown={handleKeyDown}
						ref={searchInputRef}
					/>

					<Button key="searchButton" variant="secondary" onClick={handleSearch}>
						{__("Search for Icons", "rrze-elements-blocks")}
					</Button>
					{attributes.icon !== "" && (
						<>
							<Spacer paddingBottom="1rem" paddingTop="1rem">
								<Divider />
							</Spacer>
							<Fragment key="iconFragment">
								<span
									key={attributes.icon}
									className={`elements-blocks-icon-selector-display ${attributes.svgString}`}
								></span>
								<Button
									key="removeButton"
									variant="secondary"
									onClick={() => setAttributes({ icon: "", svgString: "" })}
								>
									{__("Remove Icon", "rrze-elements-blocks")}
								</Button>
							</Fragment>
						</>
					)}
				</Spacer>
				{showSearchResults && (
					<>
						<Divider />
						<Spacer paddingTop="1rem" paddingBottom="1rem">
							<Heading>{__("Search Results", "rrze-elements-blocks")}</Heading>
							{filteredIcons.length > 0 ? (
								<Grid columns={12}>
									{filteredIcons.map((iconOption) => (
										<Button
											key={iconOption.value}
											isPressed={iconOption.value === attributes.icon}
											onClick={() => onClickIconButton(iconOption.value)}
											size="compact"
											className="elements-blocks-icon-Button"
											label={iconOption.value.split(" ")[1]}
											showTooltip={true}
										>
											<IconMarkComponent
												type={iconOption.value.split(" ")[0]}
												iconName={iconOption.value.split(" ")[1]}
												attributes={attributes}
												className="elements-blocks-icon-insideEditor elements-blocks-icon-insideEditorModal"
												iconValue={iconOption.value}
											/>
										</Button>
									))}
								</Grid>
							) : (
								<p>
									{__(
										"No icons found. Please try a different search term.",
										"rrze-elements-blocks",
									)}
								</p>
							)}
						</Spacer>
					</>
				)}
				<Divider />
				<Spacer paddingTop="1rem" paddingBottom="1rem">
					<Heading>{__("Solid Icons", "rrze-elements-blocks")}</Heading>
					<Grid columns={12}>
						{solidIcons.map((iconOption) => (
							<Button
								key={iconOption.value}
								isPressed={iconOption.value === attributes.icon}
								onClick={() => onClickIconButton(iconOption.value)}
								size="compact"
								className="elements-blocks-icon-Button"
								label={iconOption.value.split(" ")[1]}
								showTooltip={true}
							>
								<IconMarkComponent
									type={iconOption.value.split(" ")[0]}
									iconName={iconOption.value.split(" ")[1]}
									attributes={attributes}
									className="elements-blocks-icon-insideEditor elements-blocks-icon-insideEditorModal"
									iconValue={iconOption.value}
								/>
							</Button>
						))}
					</Grid>
				</Spacer>
				<Divider />
				<Spacer paddingTop="1rem" paddingBottom="1rem">
					<Heading>{__("Regular Icons", "rrze-elements-blocks")}</Heading>
					<Grid columns={12}>
						{regularIcons.map((iconOption) => (
							<Button
								key={iconOption.value}
								isPressed={iconOption.value === attributes.icon}
								onClick={() => onClickIconButton(iconOption.value)}
								size="compact"
								className="elements-blocks-icon-Button"
								label={iconOption.value.split(" ")[1]}
								showTooltip={true}
							>
								<IconMarkComponent
									type={iconOption.value.split(" ")[0]}
									iconName={iconOption.value.split(" ")[1]}
									attributes={attributes}
									className="elements-blocks-icon-insideEditor elements-blocks-icon-insideEditorModal"
									iconValue={iconOption.value}
								/>
							</Button>
						))}
					</Grid>
				</Spacer>
				<Divider />
				<Spacer paddingTop="1rem" paddingBottom="1rem">
					<Heading>{__("Brand Icons", "rrze-elements-blocks")}</Heading>
					<Grid columns={12}>
						{brandIcons.map((iconOption) => (
							<Button
								key={iconOption.value}
								isPressed={iconOption.value === attributes.icon}
								onClick={() => onClickIconButton(iconOption.value)}
								size="compact"
								className="elements-blocks-icon-Button"
								label={iconOption.value.split(" ")[1]}
								showTooltip={true}
							>
								<IconMarkComponent
									type={iconOption.value.split(" ")[0]}
									iconName={iconOption.value.split(" ")[1]}
									attributes={attributes}
									className="elements-blocks-icon-insideEditor elements-blocks-icon-insideEditorModal"
									iconValue={iconOption.value}
								/>
							</Button>
						))}
					</Grid>
				</Spacer>
				<Spacer paddingBottom="1rem">
					<Divider />
				</Spacer>
			</>
		);
	},
);
interface IconMarkComponentProps {
	type: string;
	iconName: string;
	attributes: BlockAttributes;
	defaultClass?: string;
	setAttributes?: SetAttributesFunction;
	className?: string;
	onClick?: () => void;
	iconValue?: string;
}

/**
 * A component for displaying icons in the editor.
 *
 * @param props - The properties.
 * @returns     - The loaded SVG icon or null.
 */
const IconMarkComponent = ({
	attributes,
	className = "",
	onClick,
	iconValue = "",
}: IconMarkComponentProps) => {
	const handleOnClick = () => {
		if (onClick) {
			onClick();
		}
	};

	//turn solid iconname into the right font-awesome class iconValue contains solid iconname
	const faType = iconValue.split(" ")[0] || "";
	const faIconName = iconValue.split(" ")[1] || "";

	if (iconValue === "") {
		return (
			<span
				className={`${attributes.svgString} ${className}`}
				onClick={handleOnClick}
			></span>
		);
	} else {
		return (
			<span
				className={`fa-${faType} fa-${faIconName} ${className}`}
				onClick={handleOnClick}
			></span>
		);
	}
};

export { IconPicker, IconMarkComponent, IconPickerModalInset };
