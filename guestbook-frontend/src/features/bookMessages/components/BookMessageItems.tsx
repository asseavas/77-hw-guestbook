import React from 'react';
import { BookMessage } from '../../../types';
import BookMessageItem from './BookMessageItem';
import { Grid } from '@mui/material';

interface Props {
  bookMessages: BookMessage[];
}

const BookMessageItems: React.FC<Props> = ({ bookMessages }) => {
  return (
    <Grid container sx={{ mt: 1 }} spacing={3}>
      {bookMessages.map((bookMessage) => (
        <BookMessageItem key={bookMessage.id} bookMessage={bookMessage} />
      ))}
    </Grid>
  );
};

export default BookMessageItems;
