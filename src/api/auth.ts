import axios from '@/api/config';

export function signUp(data: any) {
	const url = '/users';
	return axios.post(url, data).then(res => res);
}

export function login(data: any) {
	const url = '/login';
	return axios.post(url, data).then(res => res);
}

export function logout() {
	const url = '/logout';
	return axios.post(url).then(res => res);
}
