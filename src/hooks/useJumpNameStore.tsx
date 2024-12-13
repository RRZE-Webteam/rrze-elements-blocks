import { useEffect, useRef } from "@wordpress/element";
import { useSelect, useDispatch } from "@wordpress/data";
import { JumpNameEntry } from "../stores/jumpNameStore";
/**
 * Use this hook to manage the jump names in the store.
 * On mount, it will add the jump name to the store if it doesn't exist.
 * On unmount, it will remove the jump name from the store.
 *
 *  const \{ jumpNames, jumpNameExists \} = useJumpNameStore(\{
 *  clientId,
 *  jumpName,
 *  setAttributes: (attrs) =\> setAttributes(attrs)
 *  \});
 */

interface RrzeElementsBlocksSelectors {
    getJumpNames(): JumpNameEntry[];
    jumpNameExists(jumpName: string): boolean;
}

interface UseJumpNameStoreParams {
	clientId: string;
	jumpName: string | undefined;
	setAttributes: (attributes: { jumpName: string }) => void;
}

export function useJumpNameStore({
	clientId,
	jumpName,
	setAttributes,
}: UseJumpNameStoreParams) {
	const { addJumpName, removeJumpNameByClientId } = useDispatch(
		"rrze/elements-blocks",
	);

	const jumpNames = useSelect((select) => {
		const store = select("rrze/elements-blocks") as RrzeElementsBlocksSelectors;
		return store.getJumpNames();
	}, []);	

	const jumpNameExists = useSelect(
		(select) => {
			const store = select(
				"rrze/elements-blocks",
			) as RrzeElementsBlocksSelectors;
			return jumpName ? store.jumpNameExists(jumpName) : false;
		},
		[jumpName],
	);

	const lastJumpNameRef = useRef(jumpName);

    useEffect(() => {
        lastJumpNameRef.current = jumpName;
        if (!jumpName || jumpName === "") {
            const defaultName = `panel_${clientId?.slice(-8)}`;
            setAttributes({ jumpName: defaultName });
            if (clientId && !jumpNameExists) {
                addJumpName(defaultName, clientId);
            }
        } else if (jumpName && clientId && !jumpNameExists) {
            addJumpName(jumpName, clientId);
        }
    }, [clientId, jumpName, jumpNameExists, addJumpName, setAttributes]);

    useEffect(() => {
        return () => {
            const finalJumpName = lastJumpNameRef.current;
            if (finalJumpName) {
                removeJumpNameByClientId(clientId);
            }
        };
    }, [clientId, removeJumpNameByClientId]);

    return {
        jumpNames,
        jumpNameExists,
    };
}
