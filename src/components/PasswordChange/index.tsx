import * as React from 'react';
import { auth } from '../../firebase';

import { updateByPropertyName } from '../../utils/helpers';

interface State {
  passwordOne: string;
  passwordTwo: string;
  error: { message: string } | null;
}

const INITIAL_STATE: State = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends React.Component<{ }, State> {
  constructor(props: {}) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const { passwordOne } = this.state;

    auth.doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={passwordOne}
          onChange={event => this.setState(updateByPropertyName('passwordOne', event.target.value))}
          type="password"
          placeholder="New Password"
        />
        <input
          value={passwordTwo}
          onChange={event => this.setState(updateByPropertyName('passwordTwo', event.target.value))}
          type="password"
          placeholder="Confirm New Password"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default PasswordChangeForm;