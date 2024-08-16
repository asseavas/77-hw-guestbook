import { CircularProgress, Grid } from '@mui/material';
import BookMessageForm from './components/BookMessageForm';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectBookMessageCreating,
  selectBookMessages,
  selectBookMessagesFetching,
} from './bookMessagesSlice';
import { useEffect } from 'react';
import { createBookMessage, fetchBookMessages } from './bookMessagesThunks';
import { BookMessageMutation } from '../../types';
import BookMessageItems from './components/BookMessageItems';

const BookMessages = () => {
  const dispatch = useAppDispatch();
  const bookMessages = useAppSelector(selectBookMessages);
  const isCreating = useAppSelector(selectBookMessageCreating);
  const isFetching = useAppSelector(selectBookMessagesFetching);

  const onFormSubmit = async (BookMessageMutation: BookMessageMutation) => {
    await dispatch(createBookMessage(BookMessageMutation));
    await dispatch(fetchBookMessages());
  };

  useEffect(() => {
    dispatch(fetchBookMessages());
  }, [dispatch]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid
        item
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 2 }}
      >
        <BookMessageForm onSubmit={onFormSubmit} isLoading={isCreating} />
      </Grid>
      <Grid item container spacing={1}>
        {isFetching ? (
          <Grid container item sx={{ justifyContent: 'center' }}>
            <CircularProgress />
          </Grid>
        ) : (
          <BookMessageItems bookMessages={bookMessages} />
        )}
      </Grid>
    </Grid>
  );
};

export default BookMessages;
