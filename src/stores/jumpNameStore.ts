import apiFetch from "@wordpress/api-fetch";
import { createReduxStore, register } from "@wordpress/data";

interface State {
    jumpNames: string[];
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
    addJumpName(jumpName: string) {
        return {
            type: "ADD_JUMP_NAME" as const,
            jumpName
        };
    },
    removeJumpName(jumpName: string) {
        return {
            type: "REMOVE_JUMP_NAME" as const,
            jumpName
        };
    },
    setJumpNames(jumpNames: string[]) {
        return {
            type: "SET_JUMP_NAMES" as const,
            jumpNames
        };
    }
};

type Action = ReturnType<typeof actions[keyof typeof actions]>;

const selectors = {
    jumpNameExists(state: State, jumpName: string) {
        return state.jumpNames.includes(jumpName);
    },
    getJumpNames(state: State) {
        return state.jumpNames;
    }
};

const resolvers = {
    *getJumpNames(): Generator<any, void, any> {
        try {
            const response = yield apiFetch({ path: '/rrze-elements-blocks/v1/jump-names' });
            const jumpNamesArray = Array.isArray(response) ? response : [];
            yield actions.setJumpNames(jumpNamesArray); // Ensure state update happens here
        } catch (error) {
            console.error('Error fetching jump names:', error);
            yield actions.setJumpNames([]); // Avoid resetting state unnecessarily
        }
    }
};


const store = createReduxStore<State, typeof actions, typeof selectors>("rrze/elements-blocks", {
    reducer(state = DEFAULT_STATE, action: Action): State {
        switch (action.type) {
            case 'ADD_JUMP_NAME':
                if (state.jumpNames.includes(action.jumpName)) {
                    console.log('Duplicate jumpName detected:', action.jumpName); // Debug duplicates
                    return state;
                }
                return {
                    ...state,
                    jumpNames: [...state.jumpNames, action.jumpName]
                };
            case 'REMOVE_JUMP_NAME':
                return {
                    ...state,
                    jumpNames: state.jumpNames.filter((name: string) => name !== action.jumpName)
                };

            case 'SET_JUMP_NAMES':
                if (action.jumpNames.length === 0 && state.jumpNames.length > 0) {
                    console.warn('Attempted to overwrite with empty jumpNames array');
                    return state; // Skip state update if jumpNames is empty
                }
                return {
                    ...state,
                    jumpNames: action.jumpNames
                };

            default:
                return state;
        }
    },
    actions,
    selectors,
    resolvers
});

register(store);
