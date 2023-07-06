import 'server-only'
import { Metadata } from 'next'
import './globals.css'

//import { Inter } from 'next/font/google'

import { Header } from '@/components/header/header'
import { Footer } from '@/components/footer/footer'
import { Icon } from '@/components/UI/icon/Icon';
import { ClientProvider } from '@/redux/ClientProvider';
import { FilesManagerOverlay } from '@/components/files/files-manager-overlay/FilesManagerOverlay'

//const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body>
				<ClientProvider>
					<div className="App">
						{/* @ts-expect-error Server Component */}
						<Header/>
						<main>
							{children}
						</main>
						<Footer/>
						<FilesManagerOverlay/>
					</div>
					<div className="background-cloud">
						<Icon name="cloud"/>
					</div>
				</ClientProvider>
			</body>
		</html>
  	)
}

export default RootLayout;