// import * as React from 'react';
// import { createBrowserRouter, RouteObject } from 'react-router-dom';
// import { Router} from '@remix-run/router';

import { ApplicationRouterObjects } from '../@phnx-core';

// pages
import ExamplePage from '../pages/ExamplePage';

// type fn = (router: RouteObject[]) => Router;

// const createApplicationRouter: fn = (r) => {
//     return createBrowserRouter(router);
// };

export const router: ApplicationRouterObjects = [
    {
        path: '/',
        element: <ExamplePage />,
    },
];

// export default createApplicationRouter(router);
// export default createBrowserRouter(router);