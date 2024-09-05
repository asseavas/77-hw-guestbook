import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Modal,
  Typography,
} from '@mui/material';
import BookMessageForm from './components/BookMessageForm';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectBookMessageCreating,
  selectBookMessages,
  selectBookMessagesFetching,
} from './bookMessagesSlice';
import { useEffect, useState } from 'react';
import { createBookMessage, fetchBookMessages } from './bookMessagesThunks';
import { BookMessageMutation } from '../../types';
import BookMessageItems from './components/BookMessageItems';
import AddIcon from '@mui/icons-material/Add';

const style = {
  position: 'absolute' as 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const BookMessages = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const bookMessages = useAppSelector(selectBookMessages);
  const isCreating = useAppSelector(selectBookMessageCreating);
  const isFetching = useAppSelector(selectBookMessagesFetching);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onFormSubmit = async (BookMessageMutation: BookMessageMutation) => {
    await dispatch(createBookMessage(BookMessageMutation));
    await dispatch(fetchBookMessages());
    handleClose();
  };

  useEffect(() => {
    dispatch(fetchBookMessages());
  }, [dispatch]);

  return (
    <Grid container direction="column" spacing={2} sx={{ pb: 3 }}>
      <Grid
        item
        container
        justifyContent="end"
        alignItems="center"
        sx={{ mt: 2 }}
      >
        <Typography color="text.secondary" variant="h6" sx={{ mr: 2 }}>
          Add new message
        </Typography>
        <IconButton
          onClick={handleOpen}
          sx={{
            bgcolor: 'grey',
            color: 'white',
            width: '50px',
            height: '50px',
          }}
        >
          <AddIcon />
        </IconButton>
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add new message
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 3 }}>
                <BookMessageForm
                  onSubmit={onFormSubmit}
                  isLoading={isCreating}
                  onClose={handleClose}
                />
              </Typography>
            </Box>
          </Modal>
        </div>
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
