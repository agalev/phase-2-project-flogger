'use client'

import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../user-provider'
import Card from '../Card'

export default function Feed() {
	const [data, setData] = useState(null)
	const userData = useContext(UserContext)

	useEffect(() => {
		fetch('http://localhost:3001/feed')
			.then((res) => res.json())
			.then((data) => setData(data))
	}, [])

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
	console.log(categories)

	return (
		<main className='flex flex-col flex-grow min-h-screen items-center container max-w-screen-lg m-auto px-5 md:px-12 lg:px-24'>
			<h1 className='text-2xl font-semibold mt-2'>
				Check out the latest posts from our community!
			</h1>
			<section className='flex flex-wrap'>
				Our users are mostly active in:
				{Object.keys(categories).map((category) => (
					<span
						key={category}
						className='text-gray-100 text-sm ml-1 bg-teal-700 border border-transparent rounded-xl px-1 mb-1'
					>
						{category} ({categories[category]})
					</span>
				))}
			</section>
			{data && data.length > 0
				? data.map((item) => (
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
