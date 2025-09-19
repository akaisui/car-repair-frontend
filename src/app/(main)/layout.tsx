import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ChatButton from '@/components/chat/ChatButton'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
      <ChatButton />
    </>
  )
}