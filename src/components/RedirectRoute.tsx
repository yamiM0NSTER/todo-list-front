import { useCookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';

const SESSION_COOKIE = 'connect.sid';

function RedirectRoute() {
  const [cookies] = useCookies([SESSION_COOKIE]);

  if (!cookies[SESSION_COOKIE]) {
    return <Redirect to={{ pathname: '/login' }} />;
  }

  return null;
}

export default RedirectRoute;
