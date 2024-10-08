import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { BookMessage } from '../../../types';

interface Props {
  bookMessage: BookMessage;
}

const BookMessageItem: React.FC<Props> = ({ bookMessage }) => {
  let cardImage = 'No image';

  if (bookMessage.image) {
    cardImage = `http://localhost:8000/${bookMessage.image}`;
  }

  return (
    <Grid item xs={3}>
      <Card sx={{ height: '100%' }}>
        {bookMessage.image && (
          <CardMedia
            image={cardImage}
            sx={{ height: 0, paddingTop: '56.25%' }}
          />
        )}
        {bookMessage.author ? (
          <CardHeader title={bookMessage.author} sx={{ pb: 0 }} />
        ) : (
          <CardHeader title="Anonymous" sx={{ pb: 0 }} />
        )}
        <CardContent>
          <Typography>{bookMessage.message}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default BookMessageItem;
