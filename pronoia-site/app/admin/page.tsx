"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// This would normally come from an API route that reads the MDX files
// For now, we'll use a simple client-side implementation
const mockPosts = [
    {
        slug: "you-dont-need-more-time",
        title: "You Don't Need More Time. You Need Better Attention.",
        date: "2026-01-20",
        status: "Published",
        excerpt: "Most people believe time is the most valuable resource they have. It isn't. Time moves whether you care or not. Attention, on the other hand, is chosen—moment by moment.",
    },
];

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "123") {
            setIsAuthenticated(true);
            setError("");
        } else {
            setError("Incorrect password");
            setPassword("");
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setPassword("");
        router.push("/");
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center px-4">
                <div className="max-w-md w-full">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold mb-2">Admin Access</h1>
                        <p className="text-secondary">Enter password to continue</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                autoFocus
                            />
                            {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full px-4 py-3 bg-primary text-white rounded-lg hover:opacity-80 transition-opacity font-medium"
                        >
                            Login
                        </button>

                        <button
                            type="button"
                            onClick={() => router.push("/")}
                            className="w-full px-4 py-3 border border-primary text-primary rounded-lg hover:bg-surface transition-colors font-medium"
                        >
                            Back to Home
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header */}
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-4xl font-bold">Blog Admin</h1>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-surface transition-colors"
                    >
                        Logout
                    </button>
                </div>

                {/* Info Banner */}
                <div className="mb-8 p-4 bg-surface border border-border rounded-lg">
                    <p className="text-sm text-secondary">
                        <strong>MDX Content Location:</strong> <code className="bg-white px-2 py-1 rounded">content/posts/*.mdx</code>
                    </p>
                    <p className="text-sm text-secondary mt-2">
                        To add a new article, create a new <code className="bg-white px-2 py-1 rounded">.mdx</code> file in the content/posts directory with frontmatter (title, date, excerpt, featured).
                    </p>
                </div>

                {/* Blog List */}
                <div className="space-y-8">
                    {mockPosts.map((post) => (
                        <div key={post.slug} className="border border-border rounded-lg p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                                    <div className="flex items-center gap-3 text-sm text-secondary">
                                        <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                        <span>•</span>
                                        <span>{post.status}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            alert(`To edit this article, open:\ncontent/posts/${post.slug}.mdx`);
                                        }}
                                        className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-surface transition-colors"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => router.push(`/blog/${post.slug}`)}
                                        className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-80 transition-opacity"
                                    >
                                        View
                                    </button>
                                </div>
                            </div>
                            <p className="text-secondary">{post.excerpt}</p>
                        </div>
                    ))}

                    {/* Instructions for new articles */}
                    <div className="border border-dashed border-border rounded-lg p-12 text-center">
                        <h3 className="text-xl font-bold mb-4">Create New Article</h3>
                        <p className="text-secondary mb-6 max-w-2xl mx-auto">
                            Create a new <code className="bg-surface px-2 py-1 rounded">.mdx</code> file in{" "}
                            <code className="bg-surface px-2 py-1 rounded">content/posts/</code> with the following frontmatter:
                        </p>
                        <pre className="text-left bg-surface p-4 rounded-lg text-sm max-w-xl mx-auto overflow-x-auto">
                            {`---
title: "Your Article Title"
date: "2026-01-20"
excerpt: "Brief description..."
featured: false
---

Your article content here...`}
                        </pre>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="border border-border rounded-lg p-6">
                        <h3 className="text-sm font-medium text-secondary mb-2">Total Articles</h3>
                        <p className="text-3xl font-bold">{mockPosts.length}</p>
                    </div>
                    <div className="border border-border rounded-lg p-6">
                        <h3 className="text-sm font-medium text-secondary mb-2">Published</h3>
                        <p className="text-3xl font-bold">{mockPosts.filter(p => p.status === "Published").length}</p>
                    </div>
                    <div className="border border-border rounded-lg p-6">
                        <h3 className="text-sm font-medium text-secondary mb-2">Content Location</h3>
                        <p className="text-sm font-mono">content/posts/</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
