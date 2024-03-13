import axios from 'axios';
import { BASE_URL } from '@/api/config';

export function signUp(data: any) {
	const url = BASE_URL + '/users';
	return axios.post(url, data).then(res => res);
}
