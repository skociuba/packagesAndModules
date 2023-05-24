import React from 'react';
import {createRoot} from 'react-dom/client';

import Routing from './routing/routes';

if (process.env.NODE_ENV !== 'production') {
  const whyDidyouRender = require('@welldone-software/why-did-you-render');
  whyDidyouRender(React);
}

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(<Routing />);
