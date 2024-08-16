import React, { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import { BookMessageMutation } from '../../../types';
import FileInput from '../../../UI/FileInput/FileInput';

interface Props {
  onSubmit: (message: BookMessageMutation) => void;
  isLoading: boolean;
}

const emptyState: BookMessageMutation = {
  message: '',
  image: null,
  author: null,
};

const BookMessageForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [state, setState] = useState<BookMessageMutation>(emptyState);
  const [error, setError] = useState<string | null>(null);

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (!state.message.trim()) {
      setError('Message cannot be empty or just whitespace.');
      return;
    }
    setError(null);
    onSubmit({ ...state });
    setState(emptyState);
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const fileInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Grid
      container
      spacing={2}
      component="form"
      justifyContent="space-between"
      alignItems="center"
      onSubmit={submitFormHandler}
    >
      <Grid item xs={3}>
        <TextField
          label="Author"
          id="author"
          name="author"
          value={state.author}
          onChange={inputChangeHandler}
          error={!!error}
          helperText={error}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          required
          multiline
          label="Message"
          id="message"
          name="message"
          value={state.message}
          onChange={inputChangeHandler}
          error={!!error}
          helperText={error}
        />
      </Grid>
      <Grid item xs={4}>
        <FileInput
          label="Image"
          name="image"
          onChange={fileInputChangeHandler}
        />
      </Grid>
      <Grid item xs={1}>
        <LoadingButton
          sx={{
            width: '100%',
            height: '55px',
            backgroundColor: error ? 'red' : 'primary.main',
            '&:hover': {
              backgroundColor: error ? 'darkred' : 'primary.dark',
            },
          }}
          type="submit"
          loading={isLoading}
          endIcon={<SendIcon />}
          variant="contained"
        />
      </Grid>
    </Grid>
  );
};

export default BookMessageForm;
