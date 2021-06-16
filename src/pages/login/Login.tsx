import { Typography } from '@material-ui/core';
import { Container, Paper } from '@material-ui/core';
import classes from './Login.module.scss';

import Auth0Logo from '../../assets/Auth0.png';

const Login = () => {
  return (
    <Container maxWidth="sm" className={classes['container']}>
      <Paper elevation={1}>
        <div className={classes['header']}>
          <Typography className={classes['text']}>TODO Task list</Typography>
        </div>
        <div className={classes['content']}>
          <div className={classes['login-with']}>
            <div className={classes['text']}>Login with:</div>
            <div>
              <a href={`${process.env.REACT_APP_API_URL}/api/auth/login`}>
                <img src={Auth0Logo} className={classes['image']} />
              </a>
            </div>
          </div>
        </div>
      </Paper>
    </Container>
  );
};

export { Login };
