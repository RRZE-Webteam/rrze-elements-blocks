import {
	ToolbarButton,
	ToolbarGroup,
	ToolbarItem,
	Modal,
	Button,
	PanelBody,
} from "@wordpress/components";
import {
	useBlockProps,
	BlockControls,
	InnerBlocks,
	InspectorControls,
	RichText,
} from "@wordpress/block-editor";
import { useState, useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { symbol } from "@wordpress/icons";
import {
	ExtendedColorSwitcher,
	ExtendedColorSwitcherToolbar,
} from "../../components/CustomColorSwitcher";
import HeadingComponent from "../../components/HeadingComponent";
import {
	IconPicker,
	IconMarkComponent,
	IconPickerModalInset,
} from "../../components/IconPicker";
import { speak } from "@wordpress/a11y";

import { useJumpNameStore } from "../../hooks/useJumpNameStore";
import { JumpNameEntry } from "../../stores/jumpNameStore";
import { sanitizeTitleToJumpName } from "../../utility/utils";
import JumpLinkSelector from "../../components/JumpLinkSelector";

interface EditProps {
	attributes: {
		totalChildrenCount?: number;
		sameBlockCount?: number;
		title: string;
		color: string;
		loadOpen: boolean;
		icon: string;
		hstart?: number;
		jumpName?: string;
		svgString?: string;
		isCustomJumpname?: boolean;
	};
	setAttributes: (attributes: Partial<EditProps["attributes"]>) => void;
	clientId: string;
	context: { [key: string]: any }; // You might want to further specify the shape of context if known
}

const Edit = ({ attributes, setAttributes, clientId, context }: EditProps) => {
	/////////// Use Selects ///////////

	const props = useBlockProps();
	const { loadOpen, icon, jumpName } = attributes;
	const title = attributes.title;
	const [isActive, setIsActive] = useState(false);
	const [iconType, iconName] = icon?.split(" ") || [];
	const [isOpen, setOpen] = useState(false);

	/// Helper ///
	const doesJumpNameExist = (name: string): boolean => {
		return jumpNames.some((entry: JumpNameEntry) => entry.jumpName === name);
	};

	let computedDefaultJumpName = jumpName;
	if (!jumpName || jumpName === "") {
		computedDefaultJumpName = `panel_${clientId?.slice(-8)}`;
		setAttributes({ jumpName: computedDefaultJumpName });
	}

	const { jumpNames }: { jumpNames: JumpNameEntry[] } = useJumpNameStore({
		clientId,
		jumpName: computedDefaultJumpName,
		setAttributes: (attrs) => setAttributes(attrs),
	});

	//////////////// Use Effects ////////////////

	useEffect(() => {
		if (jumpName === "") {
			setAttributes({
				jumpName: `panel_${clientId?.slice(-8)}`,
			});
		}
	}, [clientId]);

	useEffect(() => {
		let color = context["rrze-elements/collapseColor"];

		if (color !== attributes.color) {
			color = attributes.color;
		}

		setAttributes({
			color: color,
		});
	}, [context["rrze-elements/collapseColor"], attributes.color]);

	useEffect(() => {
		setAttributes({
			hstart: context["rrze-elements/accordion-hstart"],
		});
	}),
		[context["rrze-elements/accordion-hstart"]];

	/////////////////////// Event Handler / OnClick Handler //////////
	const openModal = () => setOpen(true);
	const closeModal = () => setOpen(false);

	const toggleActive = () => {
		setIsActive(!isActive);
		if (isActive) {
			speak(__("reduced. Button.", "rrze-elements-blocks"));
		} else if (!isActive) {
			speak(__("extended. Button.", "rrze-elements-blocks"));
		}
	};

	const onChangeTitle = (newText: string) => {
		setAttributes({ title: newText });
	};

	const onChangeTitleFocus = () => {
		const newJumpName = sanitizeTitleToJumpName(title);
		console.log(newJumpName);
		console.log(doesJumpNameExist(newJumpName));
		console.log(jumpNames);
		if (
			newJumpName &&
			newJumpName !== jumpName &&
			!doesJumpNameExist(newJumpName)
		) {
			setAttributes({ jumpName: newJumpName });
		} else {
			console.log("JumpName already exists or is empty");
		}
	};

	let finalColor =
		attributes.color === "inherit"
			? context["rrze-elements/collapseColor"]
			: attributes.color;

	return (
		<div {...props}>
			<BlockControls>
				<ExtendedColorSwitcherToolbar
					attributes={attributes}
					setAttributes={setAttributes}
				/>
				<ToolbarGroup>
					{/* {isTextInString("Title", attributes.show) && (
            <HeadingSelector attributes={attributes} setAttributes={setAttributes} />
          )} */}
					<ToolbarItem>
						{() => (
							<>
								<ToolbarButton
									icon={symbol}
									label={
										icon === ""
											? __("Add an icon", "rrze-elements-blocks")
											: __("Change the icon", "rrze-elements-blocks")
									}
									onClick={openModal}
								/>
								{isOpen && (
									<Modal
										title={__("Select an Icon", "rrze-elements-blocks")}
										onRequestClose={closeModal}
										size="large"
									>
										<IconPickerModalInset
											attributes={{
												icon: attributes.icon,
												svgString: attributes.svgString,
											}}
											setAttributes={setAttributes}
										/>
										<Button variant="primary" onClick={closeModal}>
											{__("Close", "rrze-elements-blocks")}
										</Button>
									</Modal>
								)}
							</>
						)}
					</ToolbarItem>
				</ToolbarGroup>
			</BlockControls>
			<InspectorControls>
				<JumpLinkSelector
					attributes={{
						jumpName: attributes.jumpName,
					}}
					setAttributes={setAttributes}
					clientId={clientId}
				/>
				<ExtendedColorSwitcher
					attributes={attributes}
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
			<div className={`accordion-group ${finalColor} `}>
				<HeadingComponent
					level={attributes.hstart + 1}
					className="accordion-heading"
					onClick={toggleActive}
				>
					<div
						className={`accordion-toggle ${
							isActive || loadOpen ? "active" : ""
						}`}
					>
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
						<RichText
							tagName="p"
							value={title}
							onChange={onChangeTitle}
							placeholder={__("Enter your Title…", "rrze-elements-blocks")}
							allowedFormats={[]}
							className="elements-blocks-input-following-icon"
							onBlur={onChangeTitleFocus}
						/>
					</div>
				</HeadingComponent>
				<div className={`accordion-body ${isActive ? "active" : ""}`}>
					<div className="accordion-inner clearfix">
						<InnerBlocks
							allowedBlocks={[
								"rrze/rrze-video",
								"core/paragraph",
								"core/heading",
								"core/list",
								"core/image",
								"core/quote",
								"core/file",
								"core/audio",
								"core/cover",
								"core/table",
								"core/freeform",
								"core/preformatted",
								"core/pullquote",
								"core/verse",
								"core/code",
								"core/separator",
								"core/spacer",
								"core/shortcode",
								"core/calendar",
								"core/rss",
								"rrze-elements/alert",
								"rrze-elements/notice",
							]}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Edit;
