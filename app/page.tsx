'use client'
import { useState, useEffect, useContext } from 'react'
import { redirect } from 'next/navigation'
import { UserContext } from './user-provider'
import Card from './Card'

export default function Home() {
	const userData = useContext(UserContext)
	const [data, setData] = useState(null)

	useEffect(() => {
		fetch('http://localhost:3001/feed')
			.then((res) => res.json())
			.then((blogPosts) => {
				setData(
					blogPosts.filter(
						(blog) => blog.addedBy === userData.state.medium_username
					)
				)
			})
	}, [userData.state.medium_username])

	{
		!userData.state.isLoggedIn && redirect('/feed')
	}

	return (
		<main className='flex flex-col flex-grow min-h-screen items-center container max-w-screen-lg m-auto px-5 md:px-12 lg:px-24'>
			{data ? (
				<h1 className='text-2xl font-semibold m-2'>{data.title}</h1>
			) : (
				<h1 className='text-2xl font-semibold m-2'>
					Hello! Please log in to view your list of Medium publications.
				</h1>
			)}
			{data &&
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
				))}
		</main>
	)
}
