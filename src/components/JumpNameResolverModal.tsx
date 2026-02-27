import { __ } from "@wordpress/i18n";
import {
	Modal,
	Button,
	TextControl,
} from "@wordpress/components";
import { useState } from "@wordpress/element";
import { useDispatch } from "@wordpress/data";
import { useJumpNameStore } from "../hooks/useJumpNameStore";
import { JumpNameEntry } from "../stores/jumpNameStore";
import { sanitizeTitleToJumpName } from "../utility/utils";

interface JumpNameResolverModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
}

const JumpNameResolverModal = ({
	isOpen,
	onRequestClose,
}: JumpNameResolverModalProps) => {
	const { jumpNames } = useJumpNameStore({
		clientId: "", // Not specific to one block
		jumpName: undefined,
		setAttributes: () => {},
	});

	const { addJumpName, removeJumpName } = useDispatch("rrze/elements-blocks");
	const [editingJumpName, setEditingJumpName] = useState<string | null>(null);
	const [tempValue, setTempValue] = useState("");

	if (!isOpen) {
		return null;
	}

	const handleEdit = (entry: JumpNameEntry) => {
		setEditingJumpName(entry.jumpName);
		setTempValue(entry.jumpName);
	};

	const handleSave = (oldName: string) => {
		const sanitized = sanitizeTitleToJumpName(tempValue);
		if (!sanitized || sanitized === oldName) {
			setEditingJumpName(null);
			return;
		}

		// Find the entry to get the client IDs
		const entry = jumpNames.find((e) => e.jumpName === oldName);
		if (entry) {
			removeJumpName(oldName);
			entry.clientIds.forEach((id) => {
				addJumpName(sanitized, id);
			});
		}
		setEditingJumpName(null);
	};

	return (
		<Modal
			title={__("Jump Name Manager", "rrze-elements-blocks")}
			onRequestClose={onRequestClose}
			size="large"
		>
			<div className="jump-name-resolver-container">
				<p>
					{__(
						"Manage and resolve conflicts for jump names used in the editor.",
						"rrze-elements-blocks",
					)}
				</p>
				<table className="wp-list-table widefat fixed striped">
					<thead>
						<tr>
							<th>{__("Jump Name", "rrze-elements-blocks")}</th>
							<th>{__("Used by (Client IDs)", "rrze-elements-blocks")}</th>
							<th>{__("Actions", "rrze-elements-blocks")}</th>
						</tr>
					</thead>
					<tbody>
						{jumpNames.map((entry) => (
							<tr key={entry.jumpName}>
								<td>
									{editingJumpName === entry.jumpName ? (
										<TextControl
											value={tempValue}
											onChange={setTempValue}
											__nextHasNoMarginBottom
										/>
									) : (
										<code>{entry.jumpName}</code>
									)}
								</td>
								<td>
									<small>{entry.clientIds.join(", ")}</small>
									{entry.clientIds.length > 1 && (
										<div style={{ color: "red", fontWeight: "bold" }}>
											{__("Conflict detected!", "rrze-elements-blocks")}
										</div>
									)}
								</td>
								<td>
									{editingJumpName === entry.jumpName ? (
										<>
											<Button
												variant="primary"
												onClick={() => handleSave(entry.jumpName)}
												style={{ marginRight: "5px" }}
											>
												{__("Save", "rrze-elements-blocks")}
											</Button>
											<Button
												variant="tertiary"
												onClick={() => setEditingJumpName(null)}
											>
												{__("Cancel", "rrze-elements-blocks")}
											</Button>
										</>
									) : (
										<Button
											variant="secondary"
											onClick={() => handleEdit(entry)}
										>
											{__("Edit", "rrze-elements-blocks")}
										</Button>
									)}
								</td>
							</tr>
						))}
						{jumpNames.length === 0 && (
							<tr>
								<td colSpan={3}>
									{__("No jump names registered.", "rrze-elements-blocks")}
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
			<div style={{ marginTop: "20px", textAlign: "right" }}>
				<Button variant="primary" onClick={onRequestClose}>
					{__("Close", "rrze-elements-blocks")}
				</Button>
			</div>
		</Modal>
	);
};

export default JumpNameResolverModal;
