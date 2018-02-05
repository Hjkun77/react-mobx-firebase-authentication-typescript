import * as React from 'react';
import { User } from 'firebase';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import SessionStore from '../../stores/sessionStore';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import withAuthorization from '../Session/withAuthorization';

interface Props {
    sessionStore: SessionStore;
}

const AccountPage: React.StatelessComponent<Props> = ({ sessionStore }: Props) => (
    <div>
        <h1>Account: {sessionStore.authUser && sessionStore.authUser.email}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
    </div>
);

const authCondition = (authUser: User): boolean => !!authUser;

export default compose(
    withAuthorization(authCondition),
    inject('sessionStore'),
    observer
)(AccountPage);