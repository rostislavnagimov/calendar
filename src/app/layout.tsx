import type {Metadata} from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Calendar',
  description: 'Brief demo for the Calendar app',
  icons: {
    icon: '/favicon.svg'
  }
}

const  RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}

export default RootLayout
