import { __ } from "@wordpress/i18n";
import {
	PanelBody,
	ToolbarGroup,
	ToolbarButton,
	SVG,
	Path,
	Placeholder,
	Button,
	TextControl,
	Modal,
	__experimentalSpacer as Spacer,
	__experimentalText as Text,
} from "@wordpress/components";
import { store as blockEditorStore } from "@wordpress/block-editor";

import { useDispatch } from "@wordpress/data";
import { useState } from "@wordpress/element";
import { IconMarkComponent } from "../../../components/IconPicker";

type TitleSettingsProps = {
	attributes: {
		xray?: boolean;
		labelSettings?: boolean;
		icon?: string;
		title?: string;
		svgString?: string;
	};
	setAttributes: (newAttributes: {
		xray?: boolean;
		labelSettings?: boolean;
		title?: string;
		icon?: string;
	}) => void;
};

const labelIcon = (
	<SVG xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
		{/* { <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->} */}
		<Path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
	</SVG>
);

/**
 * A toolbar component to manage title settings.
 *
 * @param props - Properties passed to the component
 * @returns     - JSX element
 */
const TitleToolbar = ({ attributes, setAttributes }: TitleSettingsProps) => {
	const onChangeLabelHint = () => {
		setAttributes({ labelSettings: !attributes.labelSettings });
	};

	return (
		<ToolbarGroup>
			<ToolbarButton
				label={__("Show / Hide Label Settings", "rrze-elements-blocks")}
				onClick={onChangeLabelHint}
				icon={labelIcon}
			/>
		</ToolbarGroup>
	);
};

/**
 * A modal component to manage title settings.
 *
 * @param props - Properties passed to the component
 * @returns     - JSX element
 */

const TitleModal = ({ attributes, setAttributes }: TitleSettingsProps) => {
	const { __unstableMarkNextChangeAsNotPersistent } =
		useDispatch(blockEditorStore);

	const [isOpen, setOpen] = useState(false);
	// Functions to handle the opening and closing of the icon picker modal.
	const openModal = () => setOpen(true);
	const closeModal = () => setOpen(false);

	// Function to handle the change of the title attribute.
	const onChangeTitle = (newText: string) => {
		if (newText === "") {
			__unstableMarkNextChangeAsNotPersistent();
			setAttributes({ title: " " });
		} else {
			__unstableMarkNextChangeAsNotPersistent();
			setAttributes({ title: newText });
		}
	};

	const [iconType, iconName] = attributes.icon?.split(" ") || [];

	return (
		<>
			<ToolbarButton
				icon={labelIcon}
				label={
					attributes.title === ""
						? __("Add an Label", "rrze-elements-blocks")
						: __("Change the Label", "rrze-elements-blocks")
				}
				onClick={openModal}
			/>
			{isOpen && (
				<Modal
					title={__("Change the Tab Label", "rrze-elements-blocks")}
					onRequestClose={closeModal}
				>
					<div>
						{attributes.icon && (
							<IconMarkComponent
								type={iconType}
								iconName={iconName}
								attributes={{
									icon: attributes.icon,
									svgString: attributes.svgString,
								}}
								setAttributes={setAttributes}
							/>
						)}
						<TextControl
							value={attributes.title}
							onChange={onChangeTitle}
							placeholder={__("Enter your Tab Label", "rrze-elements-blocks")}
							className="elements-blocks-input-following-icon"
						/>

						<Button variant="primary" onClick={closeModal}>
							{__("Close", "rrze-elements-blocks")}
						</Button>
					</div>
				</Modal>
			)}
		</>
	);
};

/**
 * A placeholder component for title settings.
 *
 * @param props - Properties passed to the component
 * @returns     - JSX element
 */
const TitlePlaceholder = ({
	attributes,
	setAttributes,
}: TitleSettingsProps) => {
	const { __unstableMarkNextChangeAsNotPersistent } =
		useDispatch(blockEditorStore);
	const [iconType, iconName] = attributes.icon?.split(" ") || [];

	const onChangeLabelHint = () => {
		setAttributes({ labelSettings: !attributes.labelSettings });
	};

	// Function to handle the change of the title attribute.
	const onChangeTitle = (newText: string) => {
		if (newText === "") {
			__unstableMarkNextChangeAsNotPersistent();
			setAttributes({ title: " " });
		} else {
			__unstableMarkNextChangeAsNotPersistent();
			setAttributes({ title: newText });
		}
	};

	return (
		<Placeholder
			icon={labelIcon}
			instructions={__(
				"Enter your Tab title. You can change it later through the block settings inside the Toolbar.",
				"rrze-elements-blocks",
			)}
			label={__("Tab Label Settings", "rrze-elements-blocks")}
		>
			<div className="rrze-elements-tabs-modal-container">
				{attributes.icon && (
					<IconMarkComponent
						type={iconType}
						iconName={iconName}
						attributes={{
							icon: attributes.icon,
							svgString: attributes.svgString,
						}}
						defaultClass="elements-tabs-icon-modal"
						setAttributes={setAttributes}
					/>
				)}
				<TextControl
					value={attributes.title}
					onChange={onChangeTitle}
					placeholder={__("Enter your Tab Label", "rrze-elements-blocks")}
					className="elements-tabs-icon-modal-input"
				/>
				<Button variant="primary" onClick={onChangeLabelHint}>
					{__("Hide Label settings", "rrze-elements-blocks")}
				</Button>
			</div>
		</Placeholder>
	);
};

/**
 * Inspector controls for title settings.
 *
 * @param props - Properties passed to the component
 * @returns     - JSX element
 */
const TitleInspectorControls = ({
	attributes,
	setAttributes,
}: TitleSettingsProps) => {
	const { __unstableMarkNextChangeAsNotPersistent } =
		useDispatch(blockEditorStore);
	const onChangeTitle = (newText: string) => {
		if (newText === "") {
			__unstableMarkNextChangeAsNotPersistent();
			setAttributes({ title: " " });
		} else {
			__unstableMarkNextChangeAsNotPersistent();
			setAttributes({ title: newText });
		}
	};

	return (
		<PanelBody
			title={__("Label settings", "rrze-elements-blocks")}
			initialOpen={true}
		>
			<Spacer>
				<Text>{__("Enter your Tab Label.", "rrze-elements-blocks")}</Text>
			</Spacer>

			<TextControl
				value={attributes.title}
				onChange={onChangeTitle}
				placeholder={__("Enter your Tab Label", "rrze-elements-blocks")}
				className="elements-blocks-input-following-icon"
			/>
		</PanelBody>
	);
};

export { TitleModal, TitleToolbar, TitlePlaceholder, TitleInspectorControls };
