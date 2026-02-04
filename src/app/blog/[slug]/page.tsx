import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/content/blog-posts';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, User, Tag, Clock } from 'lucide-react';
import { Metadata } from 'next';
import { AuthorBio } from '@/components/blog/AuthorBio';
import Image from 'next/image';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = BLOG_POSTS.find(p => p.slug === slug);

    if (!post) {
        return {
            title: 'Article Not Found',
        };
    }

    return {
        title: `${post.title} | Tax Strategy Blog`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: new Date(post.date).toISOString(),
            authors: ['BonusCalc Team'],
            images: [
                {
                    url: post.image,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                }
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [post.image],
        },
        alternates: {
            canonical: `https://bonusdepreciationcalculator.com/blog/${slug}`,
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = BLOG_POSTS.find(p => p.slug === slug);

    if (!post) notFound();

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': post.title,
        'image': [`https://bonusdepreciationcalculator.com${post.image}`],
        'datePublished': new Date(post.date).toISOString(),
        'dateModified': new Date(post.date).toISOString(),
        'author': [{
            '@type': 'Organization',
            'name': 'BonusCalc Team',
            'url': 'https://bonusdepreciationcalculator.com'
        }],
        'description': post.excerpt,
        'mainEntityOfPage': {
            '@type': 'WebPage',
            '@id': `https://bonusdepreciationcalculator.com/blog/${slug}`
        }
    };

    return (
        <main className="min-h-screen bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <article className="max-w-3xl mx-auto py-16 px-4">
                <Link href="/blog" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
                </Link>

                <header className="mb-12">
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8 shadow-lg">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold uppercase tracking-wide text-xs">
                            {post.category}
                        </span>
                        <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" /> {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" /> {post.readTime}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
                        {post.title}
                    </h1>
                </header>

                <div
                    className="prose prose-lg prose-slate max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <AuthorBio />

                <hr className="my-12 border-slate-200" />

                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Ready to calculate your savings?</h3>
                    <p className="text-slate-600 mb-6">See exactly how the numbers work for your business.</p>
                    <Link
                        href="/calculator"
                        className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                    >
                        Launch Calculator
                    </Link>
                </div>
            </article>
        </main>
    );
}
