import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/content/blog-posts';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export const metadata = {
    title: 'Tax Strategy Blog | Bonus Depreciation & OBBBA 2026',
    description: 'Expert analysis on the One Big Beautiful Bill Act (OBBBA), Section 179 limits, and industry-specific tax strategies for 2026.',
    alternates: {
        canonical: 'https://bonusdepreciationcalculator.com/blog',
    },
    openGraph: {
        title: 'Tax Strategy Blog | Bonus Depreciation & OBBBA 2026',
        description: 'Read the latest guides on maximizing your tax savings with the new 2026 OBBBA rules.',
        url: 'https://bonusdepreciationcalculator.com/blog',
        type: 'website',
    },
};

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-slate-50 py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Tax Savings Insights</h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Stay ahead of the curve with expert analysis on OBBBA 2026, industry-specific write-offs, and asset management strategies.
                    </p>
                </div>

                {/* Latest Articles */}
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-8">Latest Articles</h2>
                    <div className="space-y-6">
                        {BLOG_POSTS.map((post) => (
                            <div key={post.slug} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8 items-start hover:border-blue-200 transition-colors">
                                <div className="w-full md:w-1/3 relative aspect-video rounded-xl overflow-hidden bg-slate-100 shrink-0">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">{post.category}</span>
                                        <span className="text-slate-400 text-sm">{post.date}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{post.title}</h3>
                                    <p className="text-slate-600 mb-4">{post.excerpt}</p>
                                    <Link href={`/blog/${post.slug}`} className="text-slate-900 font-bold hover:text-blue-600 transition-colors flex items-center gap-1">
                                        Read Article <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
