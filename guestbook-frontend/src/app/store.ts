import { configureStore } from '@reduxjs/toolkit';
import { bookMessagesReducer } from '../features/bookMessages/bookMessagesSlice';

export const store = configureStore({
  reducer: {
    bookMessages: bookMessagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
