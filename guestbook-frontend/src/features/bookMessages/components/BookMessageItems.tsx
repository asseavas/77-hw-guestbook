import React from 'react';
import { BookMessage } from '../../../types';
import BookMessageItem from './BookMessageItem';
import { Grid, Typography } from '@mui/material';

interface Props {
  bookMessages: BookMessage[];
}

const BookMessageItems: React.FC<Props> = ({ bookMessages }) => {
  return (
    <Grid container sx={{ mt: 1 }} spacing={3}>
      {bookMessages.length !== 0 ? (
        bookMessages
          .slice()
          .reverse()
          .map((bookMessage) => (
            <BookMessageItem key={bookMessage.id} bookMessage={bookMessage} />
          ))
      ) : (
        <Typography
          variant="h6"
          color="text.secondary"
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '15%',
          }}
        >
          No messages
        </Typography>
      )}
    </Grid>
  );
};

export default BookMessageItems;
