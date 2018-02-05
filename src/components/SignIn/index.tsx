import * as React from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';
import { updateByPropertyName } from '../../utils/helpers';

interface State {
    email: string;
    password: string;
    error: { message: string } | null;
}

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInForm extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {...INITIAL_STATE};
    }

    onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const {
            email,
            password,
        } = this.state;

        const {
            history,
        } = this.props;

        auth.doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState(() => ({...INITIAL_STATE}));
                history.push(routes.HOME);
            })
            .catch(error => {
                this.setState(updateByPropertyName('error', error));
            });

        event.preventDefault();
    }

    render() {
        const {
            email,
            password,
            error,
        } = this.state;

        const isInvalid =
            password === '' ||
            email === '';

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    value={email}
                    onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    value={password}
                    onChange={event => this.setState(updateByPropertyName('password', event.target.value))}
                    type="password"
                    placeholder="Password"
                />
                <button disabled={isInvalid} type="submit">
                    Sign In
                </button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const SignInPage: React.StatelessComponent<{}> = ({history}: any) =>
    (
        <div>
            <h1>SignIn</h1>
            <SignInForm history={history}/>
            <PasswordForgetLink/>
            <SignUpLink/>
        </div>
    );

export default withRouter(SignInPage);

export {SignInForm};
