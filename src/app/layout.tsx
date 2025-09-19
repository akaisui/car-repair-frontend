import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import { SocketProvider } from '@/contexts/SocketContext'
import { NotificationProvider } from '@/contexts/NotificationContext'

const inter = Inter({ subsets: ['latin', 'vietnamese'] })

export const metadata: Metadata = {
  title: 'Tiệm Sửa Xe Máy - Dịch Vụ Sửa Chữa Chuyên Nghiệp',
  description: 'Dịch vụ sửa chữa xe máy chuyên nghiệp, uy tín, giá cả hợp lý. Đặt lịch online nhanh chóng.',
  keywords: 'sửa xe máy, bảo dưỡng xe máy, thay nhớt, sửa chữa động cơ',
  icons: {
    icon: '/images/logo/logo.png',
    shortcut: '/images/logo/logo.png',
    apple: '/images/logo/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <AuthProvider>
          <SocketProvider>
            <NotificationProvider>
              {children}
            </NotificationProvider>
          </SocketProvider>
        </AuthProvider>
      </body>
    </html>
  )
}