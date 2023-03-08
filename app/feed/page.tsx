'use client'

import { useState, useEffect } from 'react'
import Card from '../Card'

export default function Feed() {
	const [carbonCopy, setCarbonCopy] = useState(null)
	const [data, setData] = useState(null)
	const [query, setQuery] = useState('')

	useEffect(() => {
		fetch('http://localhost:3001/feed')
			.then((res) => res.json())
			.then((data) => {setData(data)
				 setCarbonCopy(data)})
	}, [])
	// const carbonCopy = data && [...data]
	console.log(carbonCopy)
	console.log(data)
	const handleCategory = (e) => {
		const category = e.target.id
		const filtered = carbonCopy.filter((item) =>
			item.category.includes(category)
		)
		setData(filtered)
	}

	const handleSearch = (e) => {
		setQuery(e.target.value)
	}

	const searchQuery =
		data &&
		data.filter((item) =>
			item.title.toLowerCase().includes(query.toLowerCase())
		)

	const displayData = query.length > 0 ? searchQuery : data

	const categories = {}
	data &&
		data.forEach((item) =>
			item.category.forEach((category) => {
				if (categories[category]) {
					categories[category] += 1
				} else {
					categories[category] = 1
				}
			})
		)

	return (
		<main className='flex flex-col flex-grow min-h-screen items-center container max-w-screen-lg m-auto px-5 md:px-12 lg:px-24'>
			<h1 className='text-2xl font-semibold mt-2'>
				Check out the latest posts from our community!
			</h1>
			<section className='flex flex-wrap'>
				Our users are mostly active in:
				{Object.keys(categories).map((category) => (
					<span
						onClick={handleCategory}
						key={category}
						id={category}
						className='text-gray-100 text-sm ml-1 bg-teal-700 border border-transparent rounded-xl px-1 mb-1 cursor-pointer hover:bg-teal-500'
					>
						{category} ({categories[category]})
					</span>
				))}
				<span onClick={() => setData(carbonCopy)} className='text-gray-100 text-sm ml-1 bg-teal-700 border border-transparent rounded-xl px-1 mb-1 cursor-pointer hover:bg-teal-500'>
					SHOW ALL ({data && carbonCopy.length})
				</span>
			</section>
			<div className='inline-flex mt-3 w-72'>
				<span className='items-center px-2 text-xl text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-5 h-5'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
						/>
					</svg>
				</span>
				<input
					type='text'
					placeholder=' Search for a topic . . .'
					value={query}
					onChange={handleSearch}
					className='w-full text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
				/>
			</div>
			{data && data.length > 0
				? displayData.map((item) => (
						<Card
							image={item.image}
							id={item.published}
							key={item.published}
							title={item.title}
							author={item.author}
							category={item.category}
							content={item.content}
							published={item.published}
							link={item.link}
						/>
				  ))
				: null}
		</main>
	)
}
