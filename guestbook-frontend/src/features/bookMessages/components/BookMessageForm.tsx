import React, { useState } from 'react';
import { Button, Grid, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import { BookMessageMutation } from '../../../types';
import FileInput from '../../../UI/FileInput/FileInput';

interface Props {
  onSubmit: (message: BookMessageMutation) => void;
  isLoading: boolean;
  onClose: React.MouseEventHandler;
}

const emptyState: BookMessageMutation = {
  message: '',
  image: null,
  author: null,
};

const BookMessageForm: React.FC<Props> = ({ onSubmit, isLoading, onClose }) => {
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
    <Stack
      spacing={3}
      component="form"
      direction="column"
      alignItems="center"
      justifyContent="space-between"
      onSubmit={submitFormHandler}
    >
      <TextField
        label="Author"
        id="author"
        name="author"
        value={state.author}
        onChange={inputChangeHandler}
        error={!!error}
        helperText={error}
      />
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
      <FileInput label="Image" name="image" onChange={fileInputChangeHandler} />
      <Grid container alignItems="center" justifyContent="space-between" pt={3}>
        <Grid item>
          <Button variant="outlined" color="warning" onClick={onClose}>
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <LoadingButton
            sx={{
              width: '90px',
              height: '36px',
              backgroundColor: error ? 'red' : 'primary.main',
              '&:hover': {
                backgroundColor: error ? 'darkred' : 'primary.dark',
              },
            }}
            type="submit"
            loading={isLoading}
            endIcon={<SendIcon />}
            variant="contained"
          >
            Save
          </LoadingButton>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default BookMessageForm;
