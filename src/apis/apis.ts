import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

// Create an instance of Axios
const Api: AxiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 5000, // Set the timeout for API requests
});

// Add a request interceptor
Api.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    config.headers['Content-Type'] = 'application/json';
    config.headers['Accept'] = 'application/json';
    config.headers['Authorization'] =
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMWYwMjExNmIzNzNiNzlhYjQ4ZTExMzlmY2NlNDQ4ZCIsInN1YiI6IjYyMDUyZTBlODdmM2YyMDBkODIwYzk4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wYu-1ojEFjM1Vn7HRYsd_ndnAPCZKothfeC_twhycWo';
    console.log('-------------------------------------');
    console.log('Request:', config.headers);
    console.log('-------------------------------------');

    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

// Add a response interceptor
Api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('-------------------------------------');
    console.log('Response:', response.data);
    console.log('-------------------------------------');

    return response.data;
  },
  (error: any) => {
    console.log('-------------------------------------');
    console.log('Error:', error);
    console.log('-------------------------------------');
    return Promise.reject(error);
  },
);

export default Api;
