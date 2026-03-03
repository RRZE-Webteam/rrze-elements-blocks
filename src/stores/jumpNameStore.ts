import apiFetch from "@wordpress/api-fetch";
import {createReduxStore, register} from "@wordpress/data";

declare global {
  interface Window {
    __RRZE_ELEMENTS_BLOCKS_STORE_REGISTERED__?: boolean;
  }
}

export interface JumpNameEntry {
  isCustomJumpname: boolean;
  jumpName: string;
  clientIds: string[];
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
  jumpNameExists(state: State, jumpName: string): boolean {
    return state.jumpNames.some((entry: JumpNameEntry) => entry.jumpName === jumpName);
  },
  jumpNameDuplicateIDs(state: State, jumpName: string): string[] {
    const entry = state.jumpNames.find((entry: JumpNameEntry) => entry.jumpName === jumpName);
    return entry ? entry.clientIds : [];
  },
  getJumpNames(state: State) {
    return state.jumpNames;
  }
};

const resolvers = {
  * getJumpNames(): Generator<any, void, any> {
    try {
      const response = yield apiFetch({path: '/rrze-elements-blocks/v1/jump-names'});

      const jumpNamesArray: JumpNameEntry[] = Array.isArray(response)
        ? response.map((entry: any) => {
          if (entry.clientIds) return entry;
          if (entry.clientId) return {jumpName: entry.jumpName, clientIds: [entry.clientId]};
          return null;
        }).filter((entry): entry is JumpNameEntry => entry !== null && !!entry.jumpName && entry.clientIds.length > 0)
        : [];

      yield actions.setJumpNames(jumpNamesArray);
    } catch (error) {
      console.error('Error fetching jump names:', error);
      yield actions.setJumpNames([]);
    }
  }
};

const store = createReduxStore<State, typeof actions, typeof selectors>("rrze/elements-blocks", {
  reducer(state = DEFAULT_STATE, action: Action): State {
    switch (action.type) {
      case 'ADD_JUMP_NAME': {
        if (!action.jumpName || !action.clientId) {
          return state;
        }

        const existingIndex = state.jumpNames.findIndex((entry: JumpNameEntry) => entry.jumpName === action.jumpName);

        if (existingIndex >= 0) {
          const existingEntry = state.jumpNames[existingIndex];
          if (existingEntry.clientIds.includes(action.clientId)) {
            return state;
          }

          const updatedJumpNames = [...state.jumpNames];
          updatedJumpNames[existingIndex] = {
            ...existingEntry,
            clientIds: [...existingEntry.clientIds, action.clientId]
          };
          return {...state, jumpNames: updatedJumpNames};
        }

        return {
          ...state,
          jumpNames: [...state.jumpNames, {jumpName: action.jumpName, clientIds: [action.clientId]}]
        };
      }
      case 'REMOVE_JUMP_NAME':
        return {
          ...state,
          jumpNames: state.jumpNames.filter((entry: JumpNameEntry) => entry.jumpName !== action.jumpName)
        };
      case 'REMOVE_JUMP_NAME_BY_CLIENT_ID': {
        const updatedJumpNames = state.jumpNames
          .map((entry: JumpNameEntry) => ({
            ...entry,
            clientIds: entry.clientIds.filter((id: string) => id !== action.clientId)
          }))
          .filter((entry: JumpNameEntry) => entry.clientIds.length > 0);

        return {
          ...state,
          jumpNames: updatedJumpNames
        };
      }
      case 'SET_JUMP_NAMES':
        if (action.jumpNames.length === 0 && state.jumpNames.length > 0) {
          return state;
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

if (!window.__RRZE_ELEMENTS_BLOCKS_STORE_REGISTERED__) {
  register(store);
  window.__RRZE_ELEMENTS_BLOCKS_STORE_REGISTERED__ = true;
}
