import {
  UPDATE_INPUT_VALUE,
  UPDATE_DROPDOWN_VALUE,
  FETCH_REPOS,
  FETCH_USERS,
  HANDLE_FETCH_STARTED,
  HANDLE_FETCH_SUCCESS,
  HANDLE_FETCH_FAILURE,
  CLEAR_USERS,
  CLEAR_REPOS,
} from "actions/actionTypes";

const initialState = {
  inputValue: "",
  dropdownValue: "",
  users: [],
  repositories: [],
  isLoading: false,
  error: null,
};

export type SearchStateType = {
  search: {
    inputValue: string;
    dropdownValue: string;
    users: any[];
    repositories: any[];
    isLoading: boolean;
    error: any;
  };
};

export const searchReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_INPUT_VALUE:
      return { ...state, inputValue: action.payload };
    case UPDATE_DROPDOWN_VALUE:
      return { ...state, dropdownValue: action.payload };
    case HANDLE_FETCH_STARTED:
      return { ...state, isLoading: true };
    case HANDLE_FETCH_SUCCESS:
      return { ...state, isLoading: false };
    case HANDLE_FETCH_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case FETCH_REPOS:
      return { ...state, repositories: action.payload.items };
    case FETCH_USERS:
      return { ...state, users: action.payload.items };
    case CLEAR_USERS:
      return { ...state, users: [] };
    case CLEAR_REPOS:
      return { ...state, repositories: [] };
    default:
      return state;
  }
};
