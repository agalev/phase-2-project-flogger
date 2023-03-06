'use client'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from './user-provider'
import Card from './Card'

export default function Home() {
	const [data, setData] = useState(null)
	// const fetchData = () => {}
	const userData = useContext(UserContext)
	// userData.state.medium_username && fetchData()
	useEffect(() => {
		userData.state.medium_username &&
			fetch(`./api/accountData/${userData.state.medium_username}`)
				.then((res) => res.json())
				.then((data) => setData(data))
	}, [userData.state.medium_username])
	console.log(data)
	return (
		<>
			<main className='flex flex-col flex-grow min-h-screen items-center container max-w-screen-lg m-auto px-5 md:px-12 lg:px-24'>
				{data ? (
					<h1 className='text-2xl font-semibold m-2'>{data.title}</h1>
				) : (
					<h1 className='text-2xl font-semibold m-2'>
						Hello! Please log in to view your list of Medium publications.
					</h1>
				)}
				{data &&
					data.items.map((item) => (
						<Card
							image={data.image}
							id={item.id}
							key={item.id}
							title={item.title}
							author={item.author}
							category={item.category}
							content={item.content}
							published={item.published}
							link={item.link}
						/>
					))}
			</main>
		</>
	)
}
