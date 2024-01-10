import { useQuery, UndefinedInitialDataOptions, UseQueryResult } from '@tanstack/react-query';

interface QueryOptions<TData=unknown> extends UndefinedInitialDataOptions<TData> {
}

export const useApplicationQuery = <TData=unknown>(opt: QueryOptions<TData>): UseQueryResult<TData> => {
    const queryResult = useQuery<TData>(opt);
    return queryResult;
};

// Create a client
// const queryClient = new QueryClient()

// export default useApplicationQuery;

// interface QueryOptions2<TData=unknown, TError = AxiosError> extends Omit<UndefinedInitialDataOptions<TData, TError>, 'queryKey' | 'queryFunction'> {
// }

// types
// type QueryKey = ReadonlyArray<unknown>;
// QueryKey, QueryFunction, UseQueryOptions,

// export const useApplicationQuery = <TData, TError = AxiosError>(
//     queryKey: QueryKey,
//     queryFunction: QueryFunction<TData>,
//     options: UseQueryOptions<TData, TError>
// ): UseQueryResult<TData, TError>  => {};