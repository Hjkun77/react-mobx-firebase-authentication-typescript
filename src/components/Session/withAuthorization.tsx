import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import { firebase } from '../../firebase';
import * as routes from '../../constants/routes';
import { User } from 'firebase';
import SessionStore from '../../stores/sessionStore';

interface Con {
    (authUser: User | null): boolean;
}

interface Props {
    sessionStore: SessionStore;
}

const withAuthorization = (condition: Con) => (Component: any) => {
    class WithAuthorization extends React.Component<RouteComponentProps<any> & Props , {}> {
        constructor(props: RouteComponentProps<any> & Props) {
            super(props);
        }

        componentDidMount() {
            firebase.auth.onAuthStateChanged(authUser => {
                if (!condition(authUser)) {
                    this.props.history.push(routes.SIGN_IN);
                }
            });
        }

        render() {
            return this.props.sessionStore.authUser ? <Component /> : null;
        }
    }

    return compose(
        withRouter,
        inject('sessionStore'),
        observer
    )(WithAuthorization);
};

export default withAuthorization;