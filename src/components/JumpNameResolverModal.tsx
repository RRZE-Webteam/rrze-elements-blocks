import { __ } from "@wordpress/i18n";
import {
    Modal,
    Button,
    TextControl,
    ToggleControl,
    Icon,
} from "@wordpress/components";
import { useSelect, useDispatch, select } from "@wordpress/data";
import { useJumpNameStore } from "../hooks/useJumpNameStore";
import { JumpNameEntry } from "../stores/jumpNameStore";
import { store as blockEditorStore } from "@wordpress/block-editor";
import type { Block } from '@wordpress/blocks';
import { useState, useEffect, createPortal } from "@wordpress/element";
import { replace, check } from "@wordpress/icons";

interface JumpNameResolverModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

interface BlockInfoProps {
    clientId: string;
}

export const BlockInfo = ({ clientId }: BlockInfoProps) => {
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

const JumpNameResolverModal = ({ isOpen, onRequestClose }: JumpNameResolverModalProps) => {
    const { jumpNames, doesJumpNameExist, sanitizeTitleToJumpName } = useJumpNameStore({
        clientId: "",
        jumpName: undefined,
        setAttributes: () => {},
    });

    const [selectedEntry, setSelectedEntry] = useState<JumpNameEntry | null>(null);
    const [blockStates, setBlockStates] = useState<{ clientId: string; jumpName: string; isCustomJumpname: boolean; error?: string }[]>([]);
    const { updateBlockAttributes } = useDispatch('core/block-editor');
    const { removeJumpNameByClientId } = useDispatch('rrze/elements-blocks');

    useEffect(() => {
        if (selectedEntry) {
            const initialStates = selectedEntry.clientIds.map(clientId => {
                const block = select(blockEditorStore).getBlock(clientId);
                return {
                    clientId,
                    jumpName: selectedEntry.jumpName,
                    isCustomJumpname: (block?.attributes as { isCustomJumpname?: boolean }).isCustomJumpname || false,
                };
            });
            setBlockStates(initialStates);
        }
    }, [selectedEntry]);

    const handleJumpNameChange = (clientId: string, newJumpName: string) => {
        const sanitized = sanitizeTitleToJumpName(newJumpName);
        const isDuplicateInStore = doesJumpNameExist(sanitized) && sanitized !== selectedEntry?.jumpName;

        setBlockStates(blockStates.map(state =>
            state.clientId === clientId ? { ...state, jumpName: newJumpName, error: isDuplicateInStore ? __("This jump name is already in use elsewhere.", "rrze-elements-blocks") : undefined } : state
        ));
    };

    const handleJumpNameBlur = (clientId: string) => {
        const blockState = blockStates.find(state => state.clientId === clientId);
        if (blockState) {
            const sanitized = sanitizeTitleToJumpName(blockState.jumpName);
            const isDuplicateInStore = doesJumpNameExist(sanitized) && sanitized !== selectedEntry?.jumpName;
            setBlockStates(blockStates.map(state =>
                state.clientId === clientId
                    ? { ...state, jumpName: sanitized, error: isDuplicateInStore ? __("This jump name is already in use elsewhere.", "rrze-elements-blocks") : undefined }
                    : state
            ));
        }
    };

    const handleLockChange = (clientId: string, isLocked: boolean) => {
        setBlockStates(blockStates.map(state =>
            state.clientId === clientId ? { ...state, isCustomJumpname: isLocked } : state
        ));
    };

    const generateNewJumpName = (clientId: string) => {
        const newJumpName = `panel_${clientId.slice(-8)}`;
        handleJumpNameChange(clientId, newJumpName);
    };

    const generateJumpNameFromTitle = (clientId: string) => {
        const block = select(blockEditorStore).getBlock(clientId);
        const title = (block.attributes as { title?: string }).title;
        if (title) {
            const newJumpName = sanitizeTitleToJumpName(title);
            handleJumpNameChange(clientId, newJumpName);
        }
    }

    const handleResolveConflict = () => {
        const hasErrors = blockStates.some(state => state.error);
        if (hasErrors || remainingConflicts > 0) {
            return;
        }

        blockStates.forEach(state => {
            const sanitized = sanitizeTitleToJumpName(state.jumpName);
            if (selectedEntry && sanitized !== selectedEntry.jumpName) {
                removeJumpNameByClientId(state.clientId);
                updateBlockAttributes(state.clientId, {
                    jumpName: sanitized,
                    isCustomJumpname: state.isCustomJumpname,
                });
            }
        });
        setSelectedEntry(null);
    };

    const handleAutoResolve = () => {
        if (!selectedEntry) return;

        const [firstClientId, ...remainingClientIds] = selectedEntry.clientIds;
        remainingClientIds.forEach(clientId => {
            const newJumpName = `panel_${clientId.slice(-8)}`;
            removeJumpNameByClientId(clientId);
            updateBlockAttributes(clientId, {
                jumpName: newJumpName,
                isCustomJumpname: false,
            });
        });
        setSelectedEntry(null);
    };

    const jumpNameCounts = blockStates.reduce((acc, state) => {
        acc[state.jumpName] = (acc[state.jumpName] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const remainingConflicts = Object.values(jumpNameCounts).reduce((acc, count) => {
        if (count > 1) {
            return acc + (count - 1);
        }
        return acc;
    }, 0);

    const renderSelectionView = () => (
        <>
            <p>{__("A conflict was detected for the jump name:", "rrze-elements-blocks")} <code>{selectedEntry?.jumpName}</code></p>
            <p>{__("Please resolve the conflict by assigning new jump names to the blocks below.", "rrze-elements-blocks")}</p>

            <table className="wp-list-table widefat fixed striped">
                <thead>
                    <tr>
                        <th>{__("Block", "rrze-elements-blocks")}</th>
                        <th>{__("Jump Name", "rrze-elements-blocks")}</th>
                        <th>{__("Lock Jump Name", "rrze-elements-blocks")}</th>
                        <th>{__("Generation options", "rrze-elements-blocks")}</th>
                    </tr>
                </thead>
                <tbody>
                    {blockStates.map(({ clientId, jumpName, isCustomJumpname, error }) => {
                        const isDuplicateInView = jumpNameCounts[jumpName] > 1;
                        const helpText = error || (isDuplicateInView ? __("This jump name is a duplicate.", "rrze-elements-blocks") : undefined);
                        const hasError = !!error || isDuplicateInView;

                        return (
                            <tr key={clientId}>
                                <td>
                                    <BlockInfo clientId={clientId} />
                                </td>
                                <td>
                                    <div style={{ position: 'relative' }}>
                                        <TextControl
                                            value={jumpName}
                                            onChange={(newJumpName) => handleJumpNameChange(clientId, newJumpName)}
                                            onBlur={() => handleJumpNameBlur(clientId)}
                                            help={helpText}
                                        />
                                        {!hasError && jumpName !== selectedEntry?.jumpName && (
                                            <Icon icon={check} style={{ position: 'absolute', top: '8px', right: '8px', color: 'green' }} />
                                        )}
                                    </div>
                                </td>
                                <td>
                                    <ToggleControl
                                        label={__("Lock Jump Name", "rrze-elements-blocks")}
                                        checked={isCustomJumpname}
                                        help={__("If enabled, the jump link will not be overwritten automatically any longer. ", "rrze-elements-blocks")}
                                        onChange={(isChecked) => handleLockChange(clientId, isChecked)}
                                    />
                                </td>
                                <td>
                                    <Button
                                        icon={<Icon icon={replace} />}
                                        label={__("Generate new jump name", "rrze-elements-blocks")}
                                        onClick={() => generateNewJumpName(clientId)}
                                    >
                                      {__("Generate default jump name", "rrze-elements-blocks")}
                                    </Button>
                                    <Button
                                        icon={<Icon icon={replace} />}
                                        label={__("Generate jump name from title", "rrze-elements-blocks")}
                                        onClick={() => generateJumpNameFromTitle(clientId)}
                                    >
                                      {__("Generate jump name from title", "rrze-elements-blocks")}
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div style={{ marginTop: "20px", display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <div>
                    <Button variant="secondary" onClick={() => setSelectedEntry(null)} style={{ marginRight: '10px' }}>
                        {__("Back", "rrze-elements-blocks")}
                    </Button>
                </div>
                <div>
                  {remainingConflicts > 0 && (
                    <span style={{paddingRight: "1rem"}}>{`${remainingConflicts} ${__("Jump name duplications remaining", "rrze-elements-blocks")}`}</span>
                  )}
                    <Button variant="secondary" onClick={handleAutoResolve} style={{ marginRight: '10px' }}>
                        {__("Resolve automatically", "rrze-elements-blocks")}
                    </Button>
                    <Button variant="primary" onClick={handleResolveConflict} disabled={remainingConflicts > 0 || blockStates.some(state => state.error)}>
                        {__("Resolve Conflict", "rrze-elements-blocks")}
                    </Button>
                </div>
            </div>
        </>
    );

    const renderListView = () => (
        <>
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
                                            onClick={() => setSelectedEntry(entry)}
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
        </>
    );

    if (!isOpen) {
        return null;
    }

    return createPortal(
        <Modal
            title={selectedEntry ? __("Resolve Jump Name Conflict", "rrze-elements-blocks") : __("Jump Name Manager", "rrze-elements-blocks")}
            onRequestClose={onRequestClose}
            isFullScreen={true}
        >
            {selectedEntry ? renderSelectionView() : renderListView()}
        </Modal>,
        document.body
    );
};

export default JumpNameResolverModal;
