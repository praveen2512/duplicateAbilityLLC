import axios from 'axios';
import { getPersistedAuth } from '../auth';
import config from '../../config';

const apiInstance = axios.create({
	baseURL: config.API_URL
});

export const api = config => apiInstance(config).then(res => res.data);

apiInstance.interceptors.request.use(config => {
	// Do something before request is sent
	const auth = getPersistedAuth();
	if (auth) {
		config.headers.Authorization = `Bearer ${auth.token}`;
	}

	return config;
});

export const getRequestError = error => {
	if (error.response) {
		// The request was made and the server responded with a status code
		// that falls out of the range of 2xx
		const data = error.response.data || {
			message: 'An error occured while processing request'
		};

		return data.message;
	} else if (error.request) {
		// The request was made but no response was received
		// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
		// http.ClientRequest in node.js

		return 'Network error';
	} else {
		// Something happened in setting up the request that triggered an Error

		return error.message;
	}
};

export default api;
