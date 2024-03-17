import ProductForm from '@/components/form/ProductForm';

export default async function Users() {
	return (
		<>
			<h1 className='text-4xl'>Add a Product</h1>
			<div className='bg-slate-200 p-10 rounded-md w-8/12'>
				<ProductForm />
			</div>
		</>
	);
}
