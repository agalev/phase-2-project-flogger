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
	link
}) {
	const userData = useContext(UserContext)
	const [favorite, setFavorite] = useState(null)
	const [liked, setLiked] = useState(null)

	useEffect(() => {
		fetch('http://localhost:3001/favorites')
			.then((res) => res.json())
			.then((data) => {
				const found = data.find((item) => item.id === published)
				if (
					found &&
					found.likedBy.find((likeEntry) => likeEntry === userData.state.user)
				) {
					setFavorite(true)
				} else {
					setFavorite(false)
				}
				setLiked(found.likedBy.length)
			})
	}, [userData.state.user, published, liked])

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
		fetch('http://localhost:3001/favorites')
			.then((res) => res.json())
			.then((data) => {
				const found = data.find((item) => item.id === published)
				if (
					found &&
					found.likedBy.find((likeEntry) => likeEntry === userData.state.user)
				) {
					// console.log('found and liked')
					fetch(`http://localhost:3001/favorites/${id}`, {
						method: 'PATCH',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							likedBy: found.likedBy.filter(
								(likeEntry) => likeEntry !== userData.state.user
							)
						})
					})
					setFavorite(!favorite)
				} else if (
					found &&
					!found.likedBy.find((likeEntry) => likeEntry === userData.state.user)
				) {
					// console.log('found and not liked')
					fetch(`http://localhost:3001/favorites/${id}`, {
						method: 'PATCH',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							likedBy: [...found.likedBy, userData.state.user]
						})
					})
					setFavorite(!favorite)
				} else if (!found) {
					// console.log('not found')
					fetch('http://localhost:3001/favorites', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							likedBy: [userData.state.user],
							id: published,
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
			})
	}

	return (
		<article className='flex max-w-3xl flex-col items-start justify-between border border-4 rounded border-teal-400  m-4 p-2 hover:shadow-2xl'>
			<div className='flex items-center border-b-2 border-r-2 border-teal-400 pb-1 pr-1 text-xs'>
				<button onClick={handleFavorite}>
					{userData.state.isLoggedIn ? favorite ? <FullStar /> : <Star /> : null}
				</button>
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
					as={`http://localhost:3000/feed/${id}`}
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
			{liked > 0 ? (
				<p>
					This article has been liked by {liked}{' '}
					{liked === 1 ? 'user!' : 'users!'}
				</p>
			) : (
				<p>Be the first one to like this article!</p>
			)}
		</article>
	)
}
