'use client'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from './user-provider'

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
