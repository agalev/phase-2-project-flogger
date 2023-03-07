import { useState, useContext } from 'react'
import Image from 'next/image'

import { UserContext } from './user-provider'

import { Star, FullStar } from './resources/icons'

export default function Card({
	image,
	id,
	title,
	author,
	category,
	content,
	published,
	link
}) {
	const [favorite, setFavorite] = useState(false)
	const userData = useContext(UserContext)

	const date = new Date(published).toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'short',
		year: 'numeric'
	})
	// regex for parsing html tags
	const regex = /(<([^>]+)>)/gi
	// remove html tags from content
	const truncatedContent = content
		.replace(regex, '')
		.slice(0, 300)
		.concat('...')

	const handleFavorite = () => {
		console.log('clicked', id)
		fetch('http://localhost:3001/favorites', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				likedBy: userData.state.user.email,
				id,
				image,
				title,
				author,
				category,
				content,
				published,
				link
			})
		})
		setFavorite(!favorite)
	}

	return (
		<article className='flex max-w-3xl flex-col items-start justify-between border border-4 rounded border-teal-400  m-4 p-2 hover:shadow-2xl'>
			<div className='flex items-center border-b-2 border-r-2 border-teal-400 pb-1 text-xs'>
				<button onClick={handleFavorite}>
					{favorite ? <FullStar /> : <Star />}
				</button>
				<time className='text-teal-600'>{date}</time>
				<span className='text-teal-600'>•</span>
				{category.map((category, index) => {
					return (
						<span
							key={index}
							className='text-gray-100 mx-1 bg-teal-800 border border-transparent rounded-xl px-1'
						>
							#{category}
						</span>
					)
				})}
			</div>
			<div className='group relative'>
				<h3 className='mt-3 text-lg font-semibold leading-6 text-teal-900'>
					{title}
				</h3>
				<p className='mt-5 text-sm leading-6 text-gray-600 line-clamp-3'>
					{truncatedContent}
				</p>
			</div>
			<div className='relative mt-8 flex items-center gap-x-4'>
				<Image
					loader={({ src }) => src}
					src={image}
					alt={author}
					height={60}
					width={60}
				/>
				<div className='text-sm leading-6'>
					<p className='font-semibold text-gray-900'>{author}</p>
					<a
						href={link}
						target='_blank'
						className='text-teal-600 hover:text-teal-800 hover:font-semibold'
					>
						Link to article on Medium
					</a>
				</div>
			</div>
		</article>
	)
}
