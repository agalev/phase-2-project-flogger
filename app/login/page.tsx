'use client'
import { useState } from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default function Login() {
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	})

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		fetch('http://localhost:3001/users')
			.then((res) => res.json())
			.then((data) =>
				data.find((user) => {
					if (
						user.email === formData.email &&
						user.password === formData.password
					) {
						redirect('https://localhost:3000/')
					} else {
						return alert('Incorrect email or password')
					}
				})
			)
	}

	return (
		<section className='grid justify-center'>
			<form
				className='border border-2 rounded border-teal-400 grid items-center justify-center m-4 p-2'
				onSubmit={handleSubmit}
			>
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
				<button className='relative flex w-full justify-center rounded-md bg-teal-400 py-2 px-3 text-sm font-semibold text-white hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
					Log in
				</button>
				<span>
					Don&apos;t have an account?
					<Link
						className='relative inline-flex px-1 justify-center rounded-md bg-teal-400 mt-2 text-sm font-semibold text-white hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
						href='/signup'
					>
						Sign up
					</Link>
				</span>
			</form>
		</section>
	)
}
