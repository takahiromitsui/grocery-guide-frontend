'use client';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { Wheat } from 'lucide-react';
import { logout } from '@/api/auth';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

type Props = {
	deleteSession: () => void;
};

export default function Navbar({ deleteSession }: Props) {
	const logoutMutation = useMutation({
		mutationFn: logout,
		onError: error => {
			console.log(error);
		},
		onSuccess: () => {
			router.push('/login');
		},
	});
	const router = useRouter();
	const isUsersPage = usePathname().startsWith('/users');
	return (
		<nav className='bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0'>
			<div
				className='container 
      flex items-center justify-between
      '
			>
				<Link href='/'>
					<Wheat />
				</Link>
				{isUsersPage ? (
					<Button
						onClick={() => {
							logoutMutation.mutate();
							deleteSession();
						}}
					>
						Logout
					</Button>
				) : (
					<Link className={buttonVariants()} href='/login'>
						Login
					</Link>
				)}
			</div>
		</nav>
	);
}
