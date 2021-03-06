import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import withAuthorization from '../Session/withAuthorization';
import { db } from '../../firebase';
import UserStore from '../../stores/userStore';

interface Props {
    userStore: UserStore;
}

interface Users {
    users: {};
}

const UserList: React.StatelessComponent<Users> = ({ users }) =>
    (
        <div>
            <h2>List of Usernames of Users</h2>
            <p>(Saved on Sign Up in Firebase Database)</p>

            {Object.keys(users).map(key =>
                <div key={key}>{users[key].username}</div>
            )}
        </div>
    );

class HomePage extends React.Component<Props, any> {
    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        const { userStore } = this.props;
        db.onceGetUsers().then(snapshot =>
            userStore.setUsers(snapshot.val())
        );
    }

    render() {
        const {users} = this.props.userStore;

        return (
            <div>
                <h1>Home</h1>
                <p>The Home Page is accessible by every signed in user.</p>

                {!!users && <UserList users={users}/>}
            </div>
        );
    }
}

const authCondition = (authUser: firebase.User): boolean => !!authUser;

export default compose(
    withAuthorization(authCondition),
    inject('userStore'),
    observer
)(HomePage);