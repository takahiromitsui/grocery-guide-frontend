import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { Wheat } from 'lucide-react';

export default function Navbar() {
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
				<Link className={buttonVariants()} href='/login'>
					Login
				</Link>
			</div>
		</nav>
	);
}
