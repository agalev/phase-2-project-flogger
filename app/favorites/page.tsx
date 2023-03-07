'use client'

import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../user-provider'
import Card from '../Card'

export default function Favorites() {
	const [data, setData] = useState(null)
	const userData = useContext(UserContext)

	useEffect(() => {
		fetch('http://localhost:3001/favorites')
			.then((res) => res.json())
			.then((data) => {
				const filtered = data.filter((item) =>
					item.likedBy.includes(userData.state.user.email)
				)
				setData(filtered)
			})
	}, [userData.state.user.email])

	return (
		<main className='flex flex-col flex-grow min-h-screen items-center container max-w-screen-lg m-auto px-5 md:px-12 lg:px-24'>
			<h1 className='text-2xl font-semibold m-2'>
				Check out the latest posts from our community!
			</h1>
			{data
				? data.map((item) => (
						<Card
							image={item.image}
							id={item.id}
							key={item.id}
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
