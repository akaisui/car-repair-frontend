'use client';

import BlogHero from '@/components/blog/BlogHero';
import BlogList from '@/components/blog/BlogList';
import BlogSidebar from '@/components/blog/BlogSidebar';

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <BlogHero />

      <section className="section bg-gray-50 p-6">
        <div className="container-7xl">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <BlogList />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
