import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { action } from "commander";

// actions
const SET_PREVIEW = "SET_PREVIEW";

// action creators
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));

const initialState = {
  preview: null,
};

// reducer
export default handleActions(
  {
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),
  },
  initialState
);

const actionCreators = {
  setPreview,
};

export { actionCreators };
