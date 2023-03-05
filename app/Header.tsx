export default function Header() {
	return (
		<nav className='flex items-center justify-between flex-wrap bg-gray-100 p-6'>
			<div className='flex items-center flex-shrink-0 text-gray-700 mr-6'>
				<svg
					className='fill-current h-8 w-8 mr-2'
					width='54'
					height='54'
					viewBox='0 0 54 54'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path d='M27 0C12.088 0 0 12.088 0 27s12.088 27 27 27 27-12.088 27-27S41.912 0 27 0zm0 51C13.745 51 3 40.255 3 27S13.745 3 27 3s24 10.745 24 24-10.745 24-24 24z' />
					<path d='M27 18c-5.514 0-10 4.486-10 10s4.486 10 10 10 10-4.486 10-10-4.486-10-10-10zm0 18c-3.866 0-7-3.134-7-7s3.134-7 7-7 7 3.134 7 7-3.134 7-7 7z' />
					<circle cx='27' cy='27' r='3' />
				</svg>
				<span className='font-semibold text-xl tracking-tight'></span>
			</div>
		</nav>
	)
}
