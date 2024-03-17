import axios from '@/api/config';

export function createProduct(data: any) {
	const url = '/products';
	return axios.post(url, data).then(res => res);
}