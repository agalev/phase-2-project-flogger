'use client'
import { useState, useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { UserContext } from '../user-provider'

export default function Signup() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		medium_username: ''
	})

	const userData = useContext(UserContext)

	let router = useRouter()
	function redirect() {
		router.push('/')
	}


	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(formData)
		fetch('http://localhost:3001/users/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
		})
			.then((res) => res.json())
			.then(userData.dispatch({
				type: 'LOGIN',
				payload: {
					user: {
						email: formData.email,
						medium_username: formData.medium_username,
					}
				}
			}))
			.then(redirect)
	}

	return (
		<section className='grid justify-center'>
			<form
				className='border border-2 rounded border-teal-400 grid items-center justify-center m-4 p-2'
				onSubmit={handleSubmit}
			>
				<label>Name:</label>
				<input
					id='name'
					name='name'
					type='text'
					value={formData.name}
					onChange={handleChange}
					required
					className='relative block w-72 border-0 py-1.5 mb-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
					placeholder='Email address'
				/>
				<label>Email:</label>
				<input
					id='email'
					name='email'
					type='email'
					value={formData.email}
					onChange={handleChange}
					required
					className='relative block w-72 border-0 py-1.5 mb-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
					placeholder='Email address'
				/>
				<label>Password:</label>
				<input
					id='password'
					name='password'
					type='password'
					value={formData.password}
					onChange={handleChange}
					required
					className='relative block border-0 py-1.5 mb-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
					placeholder='Password'
				/>
				<label>Medium Username:</label>
				<div className='inline-flex mb-3'>
					<span className='items-center px-2 text-xl text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md'>
						@
					</span>
					<input
						id='medium_username'
						name='medium_username'
						type='text'
						value={formData.medium_username}
						onChange={handleChange}
						required
						className='py-1.5 w-full text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
						placeholder='Type your Medium username'
					/>
				</div>
				<button className='relative flex w-full justify-center rounded-md bg-teal-400 py-2 px-3 text-sm font-semibold text-white hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
					Sign up
				</button>
				<span>
					Already have an account?
					<Link
						className='relative inline-flex px-1 justify-center rounded-md bg-teal-400 mt-2 text-sm font-semibold text-white hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
						href='/login'
					>
						Log in
					</Link>
				</span>
			</form>
		</section>
	)
}
