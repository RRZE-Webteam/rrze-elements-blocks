import apiFetch from "@wordpress/api-fetch";
import { createReduxStore, register } from "@wordpress/data";

/**
 * Why do we need this store?
 * 
 * The JumpNameStore is used across Elements Blocks blocks to prevent duplicate jump names.
 * s. also hooks/useJumpNameStore.tsx
 */

export interface JumpNameEntry {
    jumpName: string;
    clientId: string;
}

interface State {
    jumpNames: JumpNameEntry[];
}

const DEFAULT_STATE: State = {
    jumpNames: []
};

const actions = {
    getJumpNames() {
        return {
            type: "GET_JUMP_NAMES" as const
        };
    },
    addJumpName(jumpName: string, clientId: string) {
        return {
            type: "ADD_JUMP_NAME" as const,
            jumpName,
            clientId
        };
    },
    removeJumpName(jumpName: string) {
        return {
            type: "REMOVE_JUMP_NAME" as const,
            jumpName
        };
    },
    removeJumpNameByClientId(clientId: string) {
        return {
            type: "REMOVE_JUMP_NAME_BY_CLIENT_ID" as const,
            clientId
        };
    },
    setJumpNames(jumpNames: JumpNameEntry[]) {
        return {
            type: "SET_JUMP_NAMES" as const,
            jumpNames
        };
    }
};

type Action = ReturnType<typeof actions[keyof typeof actions]>;

const selectors = {
    jumpNameExists(state: State, jumpName: string) {
        return state.jumpNames.some(entry => entry.jumpName === jumpName);
    },
    getJumpNames(state: State) {
        return state.jumpNames;
    }
};

const resolvers = {
    *getJumpNames(): Generator<any, void, any> {
        try {
            const response = yield apiFetch({ path: '/rrze-elements-blocks/v1/jump-names' });
            const jumpNamesArray: JumpNameEntry[] = Array.isArray(response)
                ? response.filter((entry) => entry && entry.jumpName && entry.clientId)
                : [];
            yield actions.setJumpNames(jumpNamesArray);
        } catch (error) {
            console.error('Error fetching jump names:', error);
            yield actions.setJumpNames([]); // Reset state to empty on error
        }
    }
};

const store = createReduxStore<State, typeof actions, typeof selectors>("rrze/elements-blocks", {
    reducer(state = DEFAULT_STATE, action: Action): State {
        switch (action.type) {
            case 'ADD_JUMP_NAME':
                if (!action.jumpName || !action.clientId) {
                    console.warn('Invalid jumpName or clientId:', action);
                    return state;
                }
                if (state.jumpNames.some((entry: JumpNameEntry) => entry.jumpName === action.jumpName)) {
                    console.log('Duplicate jumpName detected:', action.jumpName);
                    return state;
                }
                return {
                    ...state,
                    jumpNames: [...state.jumpNames, { jumpName: action.jumpName, clientId: action.clientId }]
                };
            case 'REMOVE_JUMP_NAME':
                return {
                    ...state,
                    jumpNames: state.jumpNames.filter((entry: JumpNameEntry) => entry.jumpName !== action.jumpName)
                };
                case 'REMOVE_JUMP_NAME_BY_CLIENT_ID':
                    return {
                        ...state,
                        jumpNames: state.jumpNames.filter((entry: JumpNameEntry) => entry.clientId !== action.clientId)
                    };
            case 'SET_JUMP_NAMES':
                if (action.jumpNames.length === 0 && state.jumpNames.length > 0) {
                    console.warn('Attempted to overwrite with empty jumpNames array');
                    return state;
                }
                return {
                    ...state,
                    jumpNames: action.jumpNames
                }
            default:
                return state;
        }
    },
    actions,
    selectors,
    resolvers
});

register(store);
