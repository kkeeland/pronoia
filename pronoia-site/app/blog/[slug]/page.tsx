import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return {
            title: "Post Not Found - Pronoia",
        };
    }

    return {
        title: `${post.title} - Pronoia`,
        description: post.excerpt,
    };
}

export default async function ArticlePage({ params }: PageProps) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white">
            <article className="max-w-prose mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                {/* Article Header */}
                <header className="mb-12">
                    <div className="flex items-center gap-3 text-sm text-secondary mb-6">
                        <time>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                        <span>•</span>
                        <span>{post.readTime}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                        {post.title}
                    </h1>
                </header>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none space-y-6 text-lg leading-relaxed">
                    <MDXRemote source={post.content} />
                </div>

                {/* Article Footer */}
                <footer className="mt-16 pt-8 border-t border-border">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                    >
                        ← Back to all articles
                    </Link>
                </footer>
            </article>
        </div>
    );
}
