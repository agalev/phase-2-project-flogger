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

	const fetchData = () => {
		fetch(`./api/accountData/${username}`)
			.then((res) => res.json())
			.then((data) => setData(data))
	}
	console.log(data)
	return (
		<>
			<Header />
			<main className='flex flex-col min-h-screen container flex-grow max-w-screen-lg m-auto px-5 md:px-12 lg:px-24'>
				<h1>My RSS Feed</h1>
				<input
					type='text'
					value={username}
					placeholder='Type your Medium username'
					onChange={handleChange}
				/>
				<button onClick={fetchData}>Fetch</button>
				{data ? (
					data.items.map((item) => <p key={item.link}>{item.title}</p>)
				) : (
					<Card />
				)}
			</main>
		</>
	)
}
