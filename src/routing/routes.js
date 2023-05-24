import React from 'react';
import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import 'i18n';

import store from '../store';

import {Routing} from './routes.config';

const Routes = () => (
  <Provider store={store}>
    <HashRouter>
      <Routing />
    </HashRouter>
  </Provider>
);

export default Routes;
