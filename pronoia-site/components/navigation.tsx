"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();
    const clickCount = useRef(0);
    const clickTimer = useRef<NodeJS.Timeout | null>(null);

    const handleLogoClick = () => {
        clickCount.current += 1;

        if (clickCount.current === 3) {
            // Triple click detected - navigate to admin
            router.push("/admin");
            clickCount.current = 0;
            if (clickTimer.current) {
                clearTimeout(clickTimer.current);
            }
            return;
        }

        // Reset click count after 500ms
        if (clickTimer.current) {
            clearTimeout(clickTimer.current);
        }
        clickTimer.current = setTimeout(() => {
            clickCount.current = 0;
        }, 500);
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo with triple-click handler */}
                    <Link
                        href="/"
                        onClick={handleLogoClick}
                        className="text-2xl font-bold text-primary hover:opacity-60 transition-opacity cursor-pointer"
                    >
                        pronoia
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/blog" className="text-secondary hover:text-primary transition-colors">
                            Blog
                        </Link>
                        <Link href="/manifesto" className="text-secondary hover:text-primary transition-colors">
                            Manifesto
                        </Link>
                        <Link href="/projects" className="text-secondary hover:text-primary transition-colors">
                            Projects
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-md text-secondary hover:text-primary hover:bg-surface transition-colors"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 space-y-2">
                        <Link
                            href="/blog"
                            className="block px-4 py-2 text-secondary hover:text-primary hover:bg-surface rounded-md transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Blog
                        </Link>
                        <Link
                            href="/manifesto"
                            className="block px-4 py-2 text-secondary hover:text-primary hover:bg-surface rounded-md transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Manifesto
                        </Link>
                        <Link
                            href="/projects"
                            className="block px-4 py-2 text-secondary hover:text-primary hover:bg-surface rounded-md transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Projects
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
