import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App/App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'mobx-react';

import PhoneStore from './store/PhoneStore';

const phoneStore = new PhoneStore();

const component = (
    <Provider phones={phoneStore.phones}
              addPhone={phoneStore.addPhone}
              test={phoneStore.test}
              getPhone={phoneStore.getPhone}
              editPhone={phoneStore.editPhone}
              removePhone={phoneStore.removePhone}>
        <MuiThemeProvider>
            <App />
        </MuiThemeProvider>
    </Provider>
);

ReactDOM.render(component, document.getElementById('app'));
