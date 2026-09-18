import './globals.css'

export const metadata = {
  title: 'Daymark | Task workspace',
  description: 'A focused workspace for keeping work moving.'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}