import './globals.css'
import Header from './Header'
import Footer from './Footer'
import { UserProvider } from './user-provider'

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body>
				<UserProvider>
					<Header />
					{children}
					<Footer />
				</UserProvider>
			</body>
		</html>
	)
}
