import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đăng nhập - Sửa Xe Hồng Hậu',
  description: 'Đăng nhập vào hệ thống quản lý tiệm sửa xe máy',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
