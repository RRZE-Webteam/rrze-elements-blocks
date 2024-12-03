// src/stores/jumpNames.ts

import { createReduxStore, register } from '@wordpress/data';

// Define the state interface
interface JumpNamesState {
  jumpNames: string[];
}

// Initial state
const DEFAULT_STATE: JumpNamesState = {
  jumpNames: [],
};

// Define action types
const ADD_JUMP_NAME = 'ADD_JUMP_NAME';

// Define action interfaces
interface AddJumpNameAction {
  type: typeof ADD_JUMP_NAME;
  jumpName: string;
}

// Union type for all actions
type JumpNamesAction = AddJumpNameAction;

// Action creators
const actions = {
  addJumpName(jumpName: string): AddJumpNameAction {
    return {
      type: ADD_JUMP_NAME,
      jumpName,
    };
  },
};

// Reducer function
const reducer = (
  state: JumpNamesState = DEFAULT_STATE,
  action: JumpNamesAction
): JumpNamesState => {
  switch (action.type) {
    case ADD_JUMP_NAME:
      return {
        ...state,
        jumpNames: [...state.jumpNames, action.jumpName],
      };
    default:
      return state;
  }
};

// Selectors
const selectors = {
  jumpNameExists(state: JumpNamesState, jumpName: string): boolean {
    return state.jumpNames.includes(jumpName);
  },
};

// Register the store with type parameters and correct usage
const store = createReduxStore<JumpNamesState, typeof actions, typeof selectors>(
  'rrze-elements-blocks/jumpNames',
  {
    reducer,
    actions,
    selectors,
  }
);

// Register the store so it's available to use
register(store);
