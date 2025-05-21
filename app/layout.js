import './globals.css'

export const metadata = {
  title: 'AI Research Assistant',
  description: 'Generate comprehensive research documents with AI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}