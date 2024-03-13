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
import Link from 'next/link';

const SignUpFormSchema = z
	.object({
		username: z
			.string({
				required_error: 'Username is required',
			})
			.min(2, { message: 'Username must be at least 2 characters long' }),
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
		confirm: z.string({
			required_error: 'Password confirmation is required',
		}),
	})
	.refine(data => data.password === data.confirm, {
		message: "Passwords don't match",
		path: ['confirm'],
	});

export default function SignUpForm() {
	const form = useForm<z.infer<typeof SignUpFormSchema>>({
		resolver: zodResolver(SignUpFormSchema),
		defaultValues: {
			email: '',
		},
	});

	function onSubmit(data: z.infer<typeof SignUpFormSchema>) {
		console.log('submitted');
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
				<div className='space-y-2'>
					<FormField
						control={form.control}
						name='username'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input placeholder='janedoe' {...field} />
								</FormControl>
								<FormDescription>This is your display name.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
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
					<FormField
						control={form.control}
						name='confirm'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Re-Enter your password</FormLabel>
								<FormControl>
									<Input
										type='password'
										placeholder='Re-Enter your password'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button className='w-full mt-4' type='submit'>
					Sign Up
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
					If you already have an account, please&nbsp;
					<Link className='text-blue-500 hover:underline' href='/login'>
						Login
					</Link>
				</p>
			</form>
		</Form>
	);
}
