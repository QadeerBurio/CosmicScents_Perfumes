import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    loading: false,
    messages: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllMessagesRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getAllMessagesSuccess(state, action) {
      state.messages = action.payload;
      state.loading = false;
      state.error = null;
    },
    getAllMessagesFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteMessageRequest(state) {
      state.loading = true;
      state.error = null;
    },
    deleteMessageSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    deleteMessageFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    resetMessageSlice(state) {
      state.error = null;
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state) {
      state.error = null;
    },
  },
});

export const getAllMessages = () => async (dispatch) => {
  dispatch(messageSlice.actions.getAllMessagesRequest());
  try {
    const { data } = await axios.get("http://localhost:8000/api/message/admin/messages", {
      withCredentials: true,
    });
    dispatch(messageSlice.actions.getAllMessagesSuccess(data.messages));
  } catch (err) {
    dispatch(
      messageSlice.actions.getAllMessagesFailed(
        err?.response?.data?.message || "Something went wrong"
      )
    );
  }
};

export const deleteMessage = (id) => async (dispatch) => {
  dispatch(messageSlice.actions.deleteMessageRequest());
  try {
    const { data } = await axios.delete(`http://localhost:8000/api/message/admin/delete/${id}`, {
      withCredentials: true,
    });
    dispatch(messageSlice.actions.deleteMessageSuccess(data.message));
  } catch (err) {
    dispatch(
      messageSlice.actions.deleteMessageFailed(
        err?.response?.data?.message || "Something went wrong"
      )
    );
  }
};

export const clearAllMessageErrors = () => (dispatch) => {
  dispatch(messageSlice.actions.clearAllErrors());
};

export const resetMessagesSlice = () => (dispatch) => {
  dispatch(messageSlice.actions.resetMessageSlice());
};

export default messageSlice.reducer;
