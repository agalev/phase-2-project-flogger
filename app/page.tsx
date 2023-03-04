'use client'
import { useState } from 'react'

import Header from './Header'
import Card from './Card'

export default function Home() {
	const [data, setData] = useState(null)
	const [username, setUsername] = useState('')

	const handleChange = (e) => {
		setUsername(e.target.value)
	}

	const fetchData = (e) => {
		e.preventDefault()
		fetch(`./api/accountData/${username}`)
			.then((res) => res.json())
			.then((data) => setData(data))
	}
	// const htmlRegexG = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g
	// const htmlRegex = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/ // without g

	return (
		<>
			<Header />
			<main className='flex flex-col flex-grow min-h-screen items-center container max-w-screen-lg m-auto px-5 md:px-12 lg:px-24'>
				<form className='flex m-2' onSubmit={fetchData}>
					<span className='inline-flex items-center px-3 text-2xl text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md'>
						@
					</span>
					<input
						type='text'
						className='bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 w-72 text-lg border-gray-300 p-2.5'
						value={username}
						placeholder='Type your Medium username'
						onChange={handleChange}
					/>
					<button
						type='submit'
						className='p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
					>
						<svg
							aria-hidden='true'
							className='w-5 h-5'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
							></path>
						</svg>
					</button>
				</form>
				{data ? (
					data.items.map((item) => (
						<div
							key={item.id}
							dangerouslySetInnerHTML={{ __html: item.content }}
						/>
					))
				) : (
					<Card />
				)}
				<div className='flex flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700'>
					<form
						className='flex flex-col bg-white rounded shadow-lg p-12 mt-12'
						action=''
					>
						<label className='font-semibold text-xs' htmlFor='usernameField'>
							Username or Email
						</label>
						<input
							className='flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2'
							type='text'
						/>
						<label
							className='font-semibold text-xs mt-3'
							htmlFor='passwordField'
						>
							Password
						</label>
						<input
							className='flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2'
							type='password'
						/>
						<button className='flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700'>
							Login
						</button>
						<div className='flex mt-6 justify-center text-xs'>
							<a className='text-blue-400 hover:text-blue-500' href='#'>
								Forgot Password
							</a>
							<span className='mx-2 text-gray-300'>/</span>
							<a className='text-blue-400 hover:text-blue-500' href='#'>
								Sign Up
							</a>
						</div>
					</form>
				</div>
			</main>
		</>
	)
}
