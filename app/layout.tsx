import './globals.css'

export const metadata = {
	title: 'Flogger app',
	description: 'Fetch blog posts from Medium'
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body>
				{children}
			</body>
		</html>
	)
}
