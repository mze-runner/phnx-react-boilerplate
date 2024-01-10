import type {
    AxiosError as FetchError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from 'axios';
import axios from 'axios';

const $axiosClient: AxiosInstance = axios.create({ withCredentials: true });

const request = async function <T>(reqOptions: AxiosRequestConfig) : Promise<T> {
    const onSuccess = function<T>(response: AxiosResponse<T>) {
        const { data } = response;
        return data;
    };
    return $axiosClient(reqOptions).then(onSuccess); //.catch(onError);
};

export default request;
export { FetchError };


// export default $axiosClient;