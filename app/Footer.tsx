export default function Footer() {
	return (
		<footer className='flex items-center place-content-center'>
			<span className='text-slate-900'>
				&copy; {new Date().getFullYear()} Flogger • Created by Alexander Galev
			</span>
		</footer>
	)
}
