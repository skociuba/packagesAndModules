import React, {lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import RouteNotFound from 'routing/components/RouteNotFound';

import Application from '../pages/Application/Application';
import {shared} from '../sharedConstants';

const MainPage = lazy(() => import('../pages/MainPage/MainPage'));
const TestPage = lazy(() => import('../pages/Test/Test'));
const SubRoutes = lazy(() => import('../pages/SubPages/SubRoutes'));
const SecondPage = lazy(() => import('../pages/SubPages/SecondPage'));
const Landing = lazy(() => import('../pages/SubPages/Landing'));
const paths = {...shared.routes};

let routes = [
  {
    path: paths.root,
    element: MainPage,
    exact: true,
  },
  {
    path: paths.mainPage.root,
    element: MainPage,
    exact: true,
  },
  {
    path: paths.testPage.root,
    element: TestPage,
    exact: true,
  },
  {
    path: paths.subRoutes.root,
    element: SubRoutes,
    children: [
      {
        path: paths.subRoutes.landing,
        element: Landing,
      },
      {
        path: paths.subRoutes.secondPages,
        element: SecondPage,
      },
    ],
  },
  {
    path: '*',
    element: MainPage,
    exact: true,
  },
];

export const Routing = () => (
  <Routes>
    {routes.map((route, i) => (
      <Route
        path={route.path}
        key={i}
        element={
          <RouteNotFound path={route.path} redirectTo={paths.mainPage.root}>
            <Application>
              <route.element />
            </Application>
          </RouteNotFound>
        }>
        {route.children
          ? route.children.map((subRoute, e) => (
              <Route path={subRoute.path} key={e} element={<subRoute.element />} />
            ))
          : null}
      </Route>
    ))}
  </Routes>
);

export default Routing;
