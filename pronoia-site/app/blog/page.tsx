import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
    title: "Blog - Pronoia",
    description: "Articles on philosophy, attention, engineering, and the practice of building coherent lives.",
};

export default function BlogPage() {
    const articles = getAllPosts();

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <header className="mb-16">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        Blog
                    </h1>
                    <p className="text-xl text-secondary">
                        Thoughts on philosophy, attention, engineering, and the practice of building coherent lives.
                    </p>
                </header>

                {articles.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-secondary text-lg">No articles yet. Check back soon!</p>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {articles.map((article) => (
                            <Link
                                key={article.slug}
                                href={`/blog/${article.slug}`}
                                className="block group"
                            >
                                <article className="border-b border-border pb-12 last:border-0">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 text-sm text-secondary">
                                            <time>{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                                            <span>•</span>
                                            <span>{article.readTime}</span>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-bold group-hover:opacity-60 transition-opacity">
                                            {article.title}
                                        </h2>
                                        <p className="text-lg text-secondary leading-relaxed">
                                            {article.excerpt}
                                        </p>
                                        <div className="pt-2">
                                            <span className="text-primary font-medium group-hover:underline">
                                                Read article →
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
