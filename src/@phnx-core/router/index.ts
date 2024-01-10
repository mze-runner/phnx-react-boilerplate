import { createBrowserRouter } from 'react-router-dom';
import type { ApplicationRouter, ApplicationRouterObject } from './types';


export { RouterProvider } from 'react-router-dom';
export * from './types.ts';

type fn = (router: ApplicationRouterObject[]) => ApplicationRouter;

export const createApplicationRouter: fn = (r) => createBrowserRouter(r);