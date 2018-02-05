import * as React from 'react';

import { auth } from '../../firebase';

const SignOutButton: React.StatelessComponent<{}> = () =>
    (
        <button
            type="button"
            onClick={auth.doSignOut}
        >
            Sign Out
        </button>
    );

export default SignOutButton;
