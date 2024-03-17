import axios from '@/api/config';

export function findOneUsers() {
	const url = '/users';
	return axios.get(url).then(res => res);
}

