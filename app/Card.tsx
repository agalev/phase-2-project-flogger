export default function Card() {
	return (
		<article className='pt-6 pb-12 bg-gray-300 container w-100 lg:w-4/5 mx-auto flex flex-col'>
			<div
				v-for='card in cards'
				className='flex flex-col md:flex-row overflow-hidden bg-white rounded-lg shadow-xl  mt-4 w-100 mx-2'
			>
				<div className='h-64 w-auto md:w-1/2'>
					<img
						className='inset-0 h-full w-full object-cover object-center'
						src=''
						alt=''
					/>
				</div>
				<div className='w-full py-4 px-6 text-gray-800 flex flex-col justify-between'>
					<h3 className='font-semibold text-lg leading-tight truncate'>
						title
					</h3>
					<p className='mt-2'>excerpt</p>
					<p className='text-sm text-gray-700 uppercase tracking-wide font-semibold mt-2'>
						author / date
					</p>
				</div>
			</div>
		</article>
	)
}
