import React, { type ReactElement } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ROUTER_PATHS } from './constants';
import { Home, AcquisitionForm, SimulationsList } from './pages';

const Router = (): ReactElement => {
  const routes = createBrowserRouter([
    {
      path: ROUTER_PATHS.HOME,
      element: <Home />,
    },
    {
      path: ROUTER_PATHS.PERSON,
      element: <AcquisitionForm />,
    },
    {
      path: ROUTER_PATHS.COMPANY,
      element: <AcquisitionForm />,
    },
    {
      path: ROUTER_PATHS.SIMULATIONS_LIST,
      element: <SimulationsList />,
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default Router;
