import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import store from './stores';
import App from './components/App/index';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider {...store}>
        <App />
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
