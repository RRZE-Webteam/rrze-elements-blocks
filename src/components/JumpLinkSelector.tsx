import { __ } from "@wordpress/i18n";
import "../stores/jumpNameStore";
import {
	Button,
	PanelBody,
	BaseControl,
	__experimentalText as Text,
	__experimentalSpacer as Spacer,
	Icon,
} from "@wordpress/components";
import { link } from "@wordpress/icons";
import { useState } from "@wordpress/element";
import { FormEvent, ChangeEvent } from "react";
import { useSelect, useDispatch } from "@wordpress/data";

interface JumpNameEntry {
	jumpName: string;
	clientId: string;
}

interface RrzeElementsBlocksSelectors {
	jumpNameExists(jumpName: string): boolean;
	getJumpNames(): JumpNameEntry[];
}

interface RrzeElementsBlocksActions {
	addJumpName(jumpName: string, clientId: string): { type: string; jumpName: string; clientId: string; };
	removeJumpName(jumpName: string): { type: string; jumpName: string; };
}

interface JumpLinkSelectorProps {
	attributes: {
		jumpName: string;
		isCustomJumpname?: boolean;
	};
	setAttributes: <Partial>(attributes: Partial) => void;
	clientId: string;
}

const JumpLinkSelector = ({
	attributes,
	setAttributes,
	clientId,
}: JumpLinkSelectorProps) => {
	const [inputURL, setInputURL] = useState(attributes.jumpName);
	const [disabled, setDisabled] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Dispatch
	const { addJumpName, removeJumpName } = useDispatch('rrze/elements-blocks') as unknown as RrzeElementsBlocksActions;

	// Select
	const store = useSelect((select) => {
		// Cast the returned store to your selectors interface
		return select('rrze/elements-blocks') as unknown as RrzeElementsBlocksSelectors;
	}, []);

	/**
	 * Sanitizes the input string for use in an href attribute.
	 * @param input - The user input string
	 * @returns Sanitized string
	 */
	const sanitizeInput = (input: string): string => {
		return input
			.trim()
			.toLowerCase()
			.replace(/\s+/g, "-")
			.replace(/[^a-z0-9-]/g, "");
	};

	const handleToggleSubmit = (event: FormEvent) => {
		event.preventDefault();

		const oldName = attributes.jumpName;
		const newName = sanitizeInput(inputURL);

		// If no change, do nothing
		if (newName === oldName) {
			return;
		}

		// Check if newName already exists and is not the oldName
		if (newName && store.jumpNameExists(newName) && newName !== oldName) {
			setError(__("This jump link name is already taken.", "rrze-elements-blocks"));
			return;
		}

		setError(null);

		if (oldName && oldName !== "" && oldName !== newName) {
			removeJumpName(oldName);
		}

		if (newName && newName !== "") {
			addJumpName(newName, clientId);
			setAttributes({ jumpName: newName, isCustomJumpname: true });
		}

		setDisabled(true);
	};

	const onChangeURL = (event: ChangeEvent<HTMLInputElement>) => {
		const url = event.target.value;
		setInputURL(url);
		const sanitized = sanitizeInput(url);
		const isSameAsCurrent = sanitized === sanitizeInput(attributes.jumpName);
		setDisabled(isSameAsCurrent);

		if (!isSameAsCurrent) {
			setError(null);
		}
	};

	return (
		<PanelBody
			title={__("Jump Link Settings", "rrze-elements-blocks")}
			initialOpen={false}
			icon={<Icon icon={link} />}
		>
			<Spacer>
				<Text>
					{__(
						"Jump Links allow your users to jump to this collapse by adding /#jumplinkname to the end of the URL.",
						"rrze-elements-blocks",
					)}
				</Text>
			</Spacer>

			<form onSubmit={handleToggleSubmit}>
				<BaseControl
					label={__("Jump Link Name", "rrze-elements-blocks")}
					id="rrze-elements"
				>
					<input
						className="rrze-element-input-field"
						type="text"
						value={inputURL}
						onChange={onChangeURL}
						placeholder={__("Update the Jump Link", "rrze-elements-blocks")}
						style={{ width: "100%" }}
					/>
				</BaseControl>
				{error && (
					<p style={{ color: "red" }}>{error}</p>
				)}
				<Button variant="primary" type="submit" disabled={disabled}>
					{__("Set Jump Link", "rrze-elements-blocks")}
				</Button>
			</form>
		</PanelBody>
	);
};

export default JumpLinkSelector;
