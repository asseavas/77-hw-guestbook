import { createAsyncThunk } from '@reduxjs/toolkit';
import { BookMessage, BookMessageMutation } from '../../types';
import axiosApi from '../../axiosApi';

export const fetchBookMessages = createAsyncThunk<BookMessage[]>(
  'book-messages/fetchAll',
  async () => {
    const { data: bookMessages } =
      await axiosApi.get<BookMessage[]>('/book-messages');
    return bookMessages;
  },
);

export const createBookMessage = createAsyncThunk<void, BookMessageMutation>(
  'book-messages/create',
  async (bookMessageMutation) => {
    const formData = new FormData();
    formData.append('message', bookMessageMutation.message);

    if (bookMessageMutation.image) {
      formData.append('image', bookMessageMutation.image);
    }

    if (bookMessageMutation.author) {
      formData.append('author', bookMessageMutation.author);
    }

    await axiosApi.post('/book-messages', formData);
  },
);
