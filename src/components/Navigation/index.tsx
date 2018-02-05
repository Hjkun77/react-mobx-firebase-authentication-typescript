import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';

import SignOutButton from '../SignOut';
import * as routes from '../../constants/routes';
import SessionStore from '../../stores/sessionStore';

interface Props {
    sessionStore: SessionStore;
}

const NavigationAuth: React.StatelessComponent = () =>
(
  <ul>
    <li><Link to={routes.LANDING}>Landing</Link></li>
    <li><Link to={routes.HOME}>Home</Link></li>
    <li><Link to={routes.ACCOUNT}>Account</Link></li>
    <li><SignOutButton /></li>
  </ul>
);

const NavigationNonAuth: React.StatelessComponent = () => (
<ul>
  <li><Link to={routes.LANDING}>Landing</Link></li>
  <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
</ul>
);

const Navigation: React.StatelessComponent<Props> = ({ sessionStore }) =>
(
  <div>
    { sessionStore.authUser
        ? <NavigationAuth />
        : <NavigationNonAuth />
    }
  </div>
);

export default compose(
    inject('sessionStore'),
    observer
)(Navigation);