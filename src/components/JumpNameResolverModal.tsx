import { __ } from "@wordpress/i18n";
import {
	Modal,
	Button,
} from "@wordpress/components";
import { useDispatch, useSelect } from "@wordpress/data";
import { useJumpNameStore } from "../hooks/useJumpNameStore";
import { JumpNameEntry } from "../stores/jumpNameStore";
import { store as blockEditorStore } from "@wordpress/block-editor";
import type { Block } from '@wordpress/blocks';

interface JumpNameResolverModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
}

interface BlockInfoProps {
	clientId: string;
}

const BlockInfo = ({ clientId }: BlockInfoProps) => {
    const block = useSelect(
        (select): Block | null => {
            const editorSelect = select(blockEditorStore);
            return editorSelect ? editorSelect.getBlock(clientId) : null;
        },
        [clientId]
    );

    if (!block) {
        return <small>{clientId}</small>;
    }

    const title = (block.attributes as { title?: string }).title;

    return (
        <div style={{ marginBottom: '5px' }}>
            <small>
                <strong>{block.name}</strong> - {clientId}
                {title && ` (Title: ${title})`}
            </small>
        </div>
    );
};

const JumpNameResolverModal = ({
	isOpen,
	onRequestClose,
}: JumpNameResolverModalProps) => {
	const { jumpNames } = useJumpNameStore({
		clientId: "", // Not specific to one block
		jumpName: undefined,
		setAttributes: () => {},
	});

	const { updateBlockAttributes } = useDispatch('core/block-editor');

	if (!isOpen) {
		return null;
	}

	const handleResolveConflict = (entry: JumpNameEntry) => {
        entry.clientIds.forEach((clientId) => {
            const newJumpName = `panel_${clientId.slice(-8)}`;
            updateBlockAttributes(clientId, { jumpName: newJumpName, isCustomJumpname: false });
        });
        onRequestClose();
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
							<th>{__("Used by", "rrze-elements-blocks")}</th>
							<th>{__("Actions", "rrze-elements-blocks")}</th>
						</tr>
					</thead>
					<tbody>
						{jumpNames.map((entry) => (
							<tr key={entry.jumpName}>
								<td>
									<code>{entry.jumpName}</code>
								</td>
								<td>
									{entry.clientIds.map(id => <BlockInfo key={id} clientId={id} />)}
									{entry.clientIds.length > 1 && (
										<div style={{ color: "red", fontWeight: "bold" }}>
											{__("Conflict detected!", "rrze-elements-blocks")}
										</div>
									)}
								</td>
								<td>
									{entry.clientIds.length > 1 ? (
										<Button
											variant="primary"
											onClick={() => handleResolveConflict(entry)}
										>
											{__("Resolve conflict", "rrze-elements-blocks")}
										</Button>
									) : (
                                        <Button
                                            variant="secondary"
                                            disabled={true}
                                        >
                                            {__("No conflict", "rrze-elements-blocks")}
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
