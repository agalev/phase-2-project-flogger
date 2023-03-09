'use client'

import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import { UserContext } from '../user-provider'
import Card from '../Card'

export default function Favorites() {
	const [data, setData] = useState(null)
	const userData = useContext(UserContext)

	useEffect(() => {
		fetch('http://localhost:3001/feed')
			.then((res) => res.json())
			.then((data) => {
				const filtered = data.filter((item) =>
					item.likedBy.includes(userData.state.user)
				)
				setData(filtered)
			})
	}, [userData.state.user])
	//need to refresh after unlike
	return (
		<main className='flex flex-col flex-grow min-h-screen items-center container max-w-screen-lg m-auto px-5 md:px-12 lg:px-24'>
			<h1 className='text-2xl font-semibold m-2'>
				Check out the latest posts from our community!
			</h1>
			{data && data.length > 0 ? (
				data.map((item) => (
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
						likedBy={item.likedBy}
					/>
				))
			) : (
				<h2>
					You haven&apos;t marked any articles as favorite.
					<Link href='/feed' className='text-teal-600'>
						{' '}
						Add some?
					</Link>
				</h2>
			)}
		</main>
	)
}
