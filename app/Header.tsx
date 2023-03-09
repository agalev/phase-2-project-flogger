'use client'
import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { UserContext } from './user-provider'

export default function Header() {
	const userData = useContext(UserContext)
	const [currentPage, setCurrentPage] = useState('dashboard')
	const [message, setMessage] = useState('Hello stranger! Please login ->')
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	useEffect(() => {
		userData.state.isLoggedIn ? setMessage(`Hello ${userData.state.name}!`) : setMessage('Hello stranger! Please login ->')
		
		}, [userData.state.isLoggedIn, userData.state.name])

	const handleNav = (e) => {
		setCurrentPage(e.target.innerText.toLowerCase())
		setIsMenuOpen(false)
	}

	const router = useRouter()
	const redirect = () => {
		router.push('/feed')
	}

	return (
		<nav className='bg-slate-700'>
			<div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
				<div className='flex h-16 items-center justify-between'>
					<div className='flex items-center'>
						<div className='flex-shrink-0 rainbow px-1'>
							<span className='text-teal-400 text-2xl font-extrabold'>/ /</span>
							<span className='text-white text-2xl font-semibold ml-2'>
								Flogger
							</span>
						</div>
						<div className='hidden md:block'>
							{userData.state.isLoggedIn && (
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
										href='/feed'
										className={
											currentPage === 'feed'
												? 'bg-gray-900 text-white bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium'
												: 'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
										}
										onClick={handleNav}
									>
										Feed
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
								</div>
							)}
							<div className='absolute right-5 top-5'>
								<span className='bg-slate-300 border border-transparent rounded-xl px-2 mr-2'>
									{message}
								</span>
								{userData.state.isLoggedIn ? (
									<button
										className='bg-gray-900 text-white bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium'
										onClick={() => {
											userData.dispatch({
												type: 'LOGOUT'
											})
											setMessage('Hello stranger! Please login ->')
											redirect()
										}}
									>
										Logout
									</button>
								) : (
									<Link
										href='/login'
										className={
											currentPage === 'login'
												? 'bg-gray-900 text-white bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium'
												: 'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
										}
										onClick={handleNav}
									>
										Login
									</Link>
								)}
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
							Feed
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
