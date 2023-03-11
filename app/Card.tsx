import { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'

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
	link,
	likedBy
}) {
	const userData = useContext(UserContext)
	const [favorite, setFavorite] = useState(null)
	const [likes, setLikes] = useState(likedBy.length)

	useEffect(() => {
		likedBy && likedBy.find((likeEntry) => likeEntry === userData.state.user)
			? setFavorite(true)
			: setFavorite(false)
	}, [likedBy, userData.state.user])

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
		fetch(`http://localhost:3001/feed/${id}`)
			.then((res) => res.json())
			.then((blogData) => {
				if (
					blogData.likedBy.find(
						(likeEntry) => likeEntry === userData.state.user
					)
				) {
					fetch(`http://localhost:3001/feed/${id}`, {
						method: 'PATCH',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							likedBy: blogData.likedBy.filter(
								(likeEntry) => likeEntry !== userData.state.user
							)
						})
					}).then(() => {
						setFavorite(false)
						setLikes((likes) => likes - 1)
					})
				} else {
					fetch(`http://localhost:3001/feed/${id}`, {
						method: 'PATCH',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							likedBy: [...blogData.likedBy, userData.state.user]
						})
					}).then(() => {
						setFavorite(true)
						setLikes((likes) => likes + 1)
					})
				}
			})
	}

	const displayStar = () => {
		if (userData.state.isLoggedIn && favorite)
			return (
				<button onClick={handleFavorite}>
					<FullStar />
				</button>
			)
		else if (userData.state.isLoggedIn && !favorite)
			return (
				<button onClick={handleFavorite}>
					<Star />
				</button>
			)
	}

	return (
		<article className='flex max-w-3xl flex-col items-start justify-between border border-4 rounded border-teal-400  m-4 p-2 hover:shadow-2xl'>
			<div className='flex items-center border-b-2 border-r-2 border-teal-400 pb-1 pr-1 text-xs'>
				{displayStar()}
				<time className='text-teal-600 font-semibold'>{date}</time>
				<span className='text-teal-600'>•</span>
				{category.map((category, index) => {
					return (
						<span
							key={index}
							className='text-gray-100 text-xs ml-1 bg-teal-700 border border-transparent rounded-xl px-1'
						>
							#{category}
						</span>
					)
				})}
			</div>
			<div className='group relative'>
				<Link
					href='/feed/[id]'
					as={`/feed/${id}`}
					className='text-lg font-semibold leading-6 text-teal-700 hover:text-teal-900 hover:font-bold'
				>
					{title}
				</Link>
				<p className='mt-5 text-sm leading-6 text-gray-600 line-clamp-3'>
					{truncatedContent}
				</p>
			</div>
			<div className='relative mt-8 flex items-center gap-x-4'>
				<Image
					loader={({ src }) => src}
					unoptimized={true}
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
			{likes > 0 ? (
				<p>
					This article has been liked by{' '}
					{likes > 1 ? `${likes} users` : `${likes} user`}!
				</p>
			) : (
				<p>Be the first one to like this article!</p>
			)}
		</article>
	)
}
