import { Container, IconButton } from '@material-ui/core';
import { TaskHandler } from '../../components/TaskHandler';
import { SocketContextProvider } from '../../contexts/SocketContext';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import classes from './Main.module.scss';

const Main = () => {
  return (
    <SocketContextProvider>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes['text']}>
            Shared TODO list
          </Typography>
          <div className={classes['logout']}>
            <a href={`${process.env.REACT_APP_API_URL}/api/auth/logout`}>
              <IconButton
                aria-label="delete"
                className={classes['button']}
                onClick={() => {}}
              >
                <ExitToAppIcon />
              </IconButton>
            </a>
          </div>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" className={classes['container']}>
        <TaskHandler />
      </Container>
    </SocketContextProvider>
  );
};

export { Main };
