'use client'
import Link from 'next/link'
import { useState, useContext } from 'react'
import { UserContext } from './user-provider'

export default function Header() {
	const [currentPage, setCurrentPage] = useState('dashboard')
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const userData = useContext(UserContext)

	const handleNav = (e) => {
		setCurrentPage(e.target.innerText.toLowerCase())
	}
	return (
		<nav className='bg-slate-700'>
			<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
				<div className='flex h-16 items-center justify-between'>
					<div className='flex items-center'>
						<div className='flex-shrink-0'>
							<span className='text-teal-400 text-2xl font-extrabold'>/ /</span>
							<span className='text-white text-2xl font-semibold ml-2'>
								Flogger
							</span>
						</div>
						<div className='hidden md:block'>
							<div className='ml-10 flex items-baseline space-x-4'>
								{/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
								<Link
									href='/'
									className={
										currentPage === 'dashboard'
											? 'bg-gray-900 text-white bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium'
											: 'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
									}
									onClick={handleNav}
								>
									Dashboard
								</Link>
								<Link
									href='/favorites'
									className={
										currentPage === 'favorites'
											? 'bg-gray-900 text-white bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium'
											: 'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
									}
									onClick={handleNav}
								>
									Favorites
								</Link>
								{/* {userData.state.name && <span>Hello, {userData.state.name}!</span>} */}
								<Link
									href='/login'
									className={
										currentPage === 'login'
											? 'absolute right-10 bg-gray-900 text-white bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium'
											: 'absolute right-10 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
									}
									onClick={handleNav}
								>
									Login
								</Link>
							</div>
						</div>
					</div>
					<div className='-mr-2 flex md:hidden'>
						{/* <!-- Mobile menu button --> */}
						<button
							type='button'
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className='inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
							aria-controls='mobile-menu'
							aria-expanded='false'
						>
							<span className='sr-only'>Open main menu</span>
							{/* <!-- Menu open: "hidden", Menu closed: "block" --> */}
							<svg
								className='block h-6 w-6'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth='1.5'
								stroke='currentColor'
								aria-hidden='true'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
								/>
							</svg>
							{/* <!-- Menu open: "block", Menu closed: "hidden" --> */}
							<svg
								className='hidden h-6 w-6'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth='1.5'
								stroke='currentColor'
								aria-hidden='true'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M6 18L18 6M6 6l12 12'
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>

			{/* <!-- Mobile menu, show/hide based on menu state. --> */}
			{isMenuOpen && (
				<div className='md:hidden' id='mobile-menu'>
					<div className='space-y-1 px-2 pt-2 pb-3 sm:px-3'>
						{/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
						<Link
							href='/'
							className={
								currentPage === 'dashboard'
									? 'bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium'
									: 'text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
							}
							onClick={handleNav}
						>
							Dashboard
						</Link>
						<Link
							href='/favorites'
							className={
								currentPage === 'favorites'
									? 'bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium'
									: 'text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
							}
							onClick={handleNav}
						>
							Favorites
						</Link>
						<Link
							href='/login'
							className={
								currentPage === 'login'
									? 'bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium'
									: 'text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
							}
							onClick={handleNav}
						>
							Login
						</Link>
					</div>
				</div>
			)}
		</nav>
	)
}
