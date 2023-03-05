'use client'
import { useState } from 'react'

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

	return (
		<>
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
				{data &&
					data.items.map((item) => (
						<div
							key={item.id}
							dangerouslySetInnerHTML={{ __html: item.content }}
						/>
					))}
			</main>
		</>
	)
}
