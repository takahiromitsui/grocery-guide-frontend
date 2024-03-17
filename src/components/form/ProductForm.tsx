'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import { createProduct } from '@/api/products';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { ToastAction } from '@/components/ui/toast';

const ProductFormSchema = z.object({
	productName: z
		.string({
			required_error: 'Product name is required',
		})
		.min(2, { message: 'Product name must be at least 2 characters long' }),
	imageURL: z.string().url({ message: 'Invalid URL' }),
});

export default function ProductForm() {
	const { toast } = useToast();
	const form = useForm<z.infer<typeof ProductFormSchema>>({
		resolver: zodResolver(ProductFormSchema),
		defaultValues: {
			productName: '',
		},
	});
	const createProductMutation = useMutation({
		mutationFn: createProduct,
		onError: error => {
			toast({
				variant: 'destructive',
				title: 'Uh oh! Something went wrong.',
				description: 'Product name already exists.',
				action: <ToastAction altText='Try again'>Try again</ToastAction>,
			});
		},
		onSuccess: () => {
			toast({
				description: 'Your product has been created.',
			});
		},
	});

	function onSubmit(data: z.infer<typeof ProductFormSchema>) {
		const { productName, imageURL } = data;
		createProductMutation.mutate({ name: productName, imageURL });
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
				<div className='space-y-2'>
					<FormField
						control={form.control}
						name='productName'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Product Name</FormLabel>
								<FormControl>
									<Input placeholder='cheese' {...field} />
								</FormControl>
								<FormDescription>
									This is product or ingredient name.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='imageURL'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Image URL</FormLabel>
								<FormControl>
									<Input
										placeholder='https://github.com/colinhacks/zod'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button className='w-full mt-4' type='submit'>
					Save
				</Button>
			</form>
			<Toaster />
		</Form>
	);
}
