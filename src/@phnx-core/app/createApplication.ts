import '@tanstack/react-query';
import { ApplicationRouter, ApplicationRouterObjects, createApplicationRouter } from '../router';
import { QueryClient } from '../query';
import { FetchError} from '../http';

declare module '@tanstack/react-query' {
    interface Register {
        defaultError: FetchError
    }
}

interface CreateApplicationOpt {
    router: ApplicationRouterObjects
}

type CreateApplicationFn = (opt: CreateApplicationOpt) => {router:ApplicationRouter, queryClient: QueryClient };

//export function createApplication ({ router } : CreateApplication): {router:ApplicationRouter, queryClient: QueryClient  } {
export const createApplication:CreateApplicationFn =  ({ router }) => {

    const _r = createApplicationRouter(router);
    const queryClient = new QueryClient();

    return {
        router: _r,
        queryClient
    };
};