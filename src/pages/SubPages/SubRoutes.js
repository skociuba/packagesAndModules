import React from 'react';
import {Link} from 'react-router-dom';
import {Outlet} from 'react-router-dom';
const SubRoutes = () => (
  <>
    <nav>
      <Link to="/sub-pages/landing">Landing</Link>
      <Link to="/sub-pages/secondPages">SecondPage</Link>
    </nav>
    <Outlet />
  </>
);

export default SubRoutes;
