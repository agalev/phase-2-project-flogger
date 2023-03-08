'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Blog({ params }: { params: { blogID: string } }) {
	const [data, setData] = useState(null)

	useEffect(() => {
		fetch(`http://localhost:3001/feed/${params.blogID}`)
			.then((res) => res.json())
			.then((blogData) => {
				setData(blogData)
			})
	}, [params.blogID])

	return (
		<main className='flex flex-col flex-grow min-h-screen items-center container max-w-screen-lg m-auto'>
			<h1 className='text-3xl font-semibold'>{data && data.title}</h1>
			<span>Author: {data && data.author}</span>
			{data && (
				<article
					className='border border-4 rounded border-teal-400'
					dangerouslySetInnerHTML={{ __html: data.content }}
				></article>
			)}
			{data && (
				<Link
					href={data.link}
					as={data.link}
					target='_blank'
					className='text-teal-600 hover:text-teal-800 hover:font-semibold'
				>
					Link to original article
				</Link>
			)}
		</main>
	)
}
