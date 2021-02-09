import { Dispatch } from "react";

import {
  UPDATE_INPUT_VALUE,
  UPDATE_DROPDOWN_VALUE,
  HANDLE_FETCH_STARTED,
  HANDLE_FETCH_SUCCESS,
  HANDLE_FETCH_FAILURE,
} from "./actionTypes";
import { handleErrors } from "api/helpers";
import {
  ClearActionType,
  FetchActionType,
} from "actions/types";

export const updateInputValue = (value: string) => (
  dispatch: Dispatch<any>
) => {
  return dispatch({
    type: UPDATE_INPUT_VALUE,
    payload: value,
  });
};

export const updateDropdownValue = (value: string) => (
  dispatch: Dispatch<any>
) => {
  return dispatch({
    type: UPDATE_DROPDOWN_VALUE,
    payload: value,
  });
};

export const updateSearchEntityData = (
  fetchActionType: any,
  data: Dispatch<any>
) => {
  return {
    type: fetchActionType,
    payload: data,
  };
};

export const clearData = (clearActionType: ClearActionType) => (
  dispatch: Dispatch<any>
) => {
  return dispatch({
    type: clearActionType,
  });
};

export const handleFetchStarted = () => ({
  type: HANDLE_FETCH_STARTED,
});

export const handleFetchSuccess = () => ({
  type: HANDLE_FETCH_SUCCESS,
});

export const handleFetchFailure = (error: any) => ({
  type: HANDLE_FETCH_FAILURE,
  payload: error,
});

export const fetchData = (
  endpoint: string,
  fetchActionType: FetchActionType
) => async (dispatch: any) => {
  dispatch(handleFetchStarted());
  return fetch(endpoint)
    .then(handleErrors)
    .then((res) => res.json())
    .then((json) => dispatch(updateSearchEntityData(fetchActionType, json)))
    .then((json) => {
      dispatch(handleFetchSuccess());
      return json;
    })
    .catch((error) => dispatch(handleFetchFailure(error)));
};
