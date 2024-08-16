import { BookMessage } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createBookMessage, fetchBookMessages } from './bookMessagesThunks';

export interface BookMessagesState {
  items: BookMessage[];
  itemsFetching: boolean;
  isCreating: boolean;
}

const initialState: BookMessagesState = {
  items: [],
  itemsFetching: false,
  isCreating: false,
};

export const bookMessagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookMessages.pending, (state) => {
        state.itemsFetching = true;
      })
      .addCase(fetchBookMessages.fulfilled, (state, { payload: messages }) => {
        state.itemsFetching = false;
        state.items = messages;
      })
      .addCase(fetchBookMessages.rejected, (state) => {
        state.itemsFetching = false;
      });

    builder
      .addCase(createBookMessage.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createBookMessage.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createBookMessage.rejected, (state) => {
        state.isCreating = false;
      });
  },
  selectors: {
    selectBookMessages: (state) => state.items,
    selectBookMessagesFetching: (state) => state.itemsFetching,
    selectBookMessageCreating: (state) => state.isCreating,
  },
});

export const bookMessagesReducer = bookMessagesSlice.reducer;

export const {
  selectBookMessages,
  selectBookMessagesFetching,
  selectBookMessageCreating,
} = bookMessagesSlice.selectors;
