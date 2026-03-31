import {useEffect, useRef} from "@wordpress/element";
import {useSelect, useDispatch, select} from "@wordpress/data";
import {JumpNameEntry} from "../stores/jumpNameStore";
import { sanitizeTitleToJumpName } from "../utility/sanitize";

interface RrzeElementsBlocksSelectors {
  getJumpNames(): JumpNameEntry[];

  jumpNameExists(jumpName: string): boolean;
  jumpNameDuplicateIDs(jumpName: string): string[];
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
  const {addJumpName, removeJumpNameByClientId} = useDispatch(
    "rrze/elements-blocks",
  );

  const jumpNames = useSelect((select) => {
    const store = select("rrze/elements-blocks") as unknown as RrzeElementsBlocksSelectors;
    return store.getJumpNames();
  }, []);

  const doesJumpNameExist = (name: string): boolean => {
    const store = select("rrze/elements-blocks") as unknown as RrzeElementsBlocksSelectors;
    return store.jumpNameExists(name);
  }

  const areDuplicateJumpNamesPresent = (name: string): boolean => {
    const store = select("rrze/elements-blocks") as unknown as RrzeElementsBlocksSelectors;
    return store.jumpNameDuplicateIDs(name).length > 1;
  }

  const lastJumpNameRef = useRef(jumpName);

  useEffect(() => {
    if (!clientId) {
      return;
    }

    const previousJumpName = lastJumpNameRef.current;
    if (previousJumpName && previousJumpName !== jumpName) {
      removeJumpNameByClientId(clientId);
    }

    if (!jumpName || jumpName === "") {
      const defaultName = `panel_${clientId?.slice(-8)}`;
      setAttributes({jumpName: defaultName});
      addJumpName(defaultName, clientId);
      lastJumpNameRef.current = defaultName;
      return;
    }

    addJumpName(jumpName, clientId);
    lastJumpNameRef.current = jumpName;
  }, [clientId, jumpName, addJumpName, removeJumpNameByClientId, setAttributes]);

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
    doesJumpNameExist,
    areDuplicateJumpNamesPresent,
    sanitizeTitleToJumpName,
  };
}
