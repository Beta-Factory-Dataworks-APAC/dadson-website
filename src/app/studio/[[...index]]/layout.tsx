export const metadata = {
  title: 'Dadson Logistics - Content Studio',
  description: 'Admin panel for managing blog content',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 