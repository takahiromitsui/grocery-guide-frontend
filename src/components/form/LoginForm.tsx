'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/api/auth';
import { useRouter } from 'next/navigation';

const LoginFormSchema = z.object({
	email: z
		.string({
			required_error: 'Email is required',
		})
		.email({ message: 'Invalid email address' }),
	password: z
		.string({
			required_error: 'Password is required',
		})
		.min(8, { message: 'Password must be at least 8 characters long' }),
});

export default function LoginForm() {
	const router = useRouter();
	const form = useForm<z.infer<typeof LoginFormSchema>>({
		resolver: zodResolver(LoginFormSchema),
		defaultValues: {
			email: '',
		},
	});

	// const router = useRouter()
	const loginMutation = useMutation({
		mutationFn: login,
		onError: error => {
			console.log(error);
		},
		onSuccess: () => {
			router.push('/users');
		},
	});

	function onSubmit(data: z.infer<typeof LoginFormSchema>) {
		loginMutation.mutate(data);
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
				<div className='space-y-2'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder='example@mail.com' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										type='password'
										placeholder='Enter your password'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button className='w-full mt-4' type='submit'>
					Login
				</Button>
				<div
					className='mx-auto
        my-4 flex w-full items-center justify-evenly
        before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400
        '
				>
					or
				</div>
				<p>
					If you don&apos;t have an account, please&nbsp;
					<Link className='text-blue-500 hover:underline' href='/sign-up'>
						Sign up
					</Link>
				</p>
			</form>
		</Form>
	);
}
