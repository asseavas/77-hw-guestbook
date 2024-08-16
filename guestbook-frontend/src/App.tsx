import AppToolbar from './UI/AppToolbar/AppToolbar';
import { Container } from '@mui/material';
import BookMessages from './features/bookMessages/BookMessages';

const App = () => {
  return (
    <>
      <header>
        <AppToolbar />
      </header>
      <Container component="main">
        <BookMessages />
      </Container>
    </>
  );
};

export default App;
