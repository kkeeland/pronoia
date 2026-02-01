import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Projects - Pronoia",
    description: "Things I've built — from peptide research platforms to beverage brands.",
};

const projects = [
    {
        name: "Peptok.ai",
        tagline: "Your Science-Backed Guide to Peptides",
        description:
            "Research-grade peptide profiles, dosage calculators, and vendor comparisons backed by peer-reviewed studies. Built to cut through the noise and give people real, evidence-based peptide information.",
        role: "Founder & Developer",
        url: "https://peptok.ai",
        tags: ["Next.js", "Supabase", "AI", "Health"],
    },
    {
        name: "EmbodyPeptides.com",
        tagline: "The World's Purest Peptides",
        description:
            "A research peptide vendor built from the ground up — from brand identity to e-commerce infrastructure. Focused on purity, transparency, and trust in a space that desperately needs it.",
        role: "Founder & Developer",
        url: "https://embodypeptides.com",
        tags: ["E-Commerce", "Branding", "Health"],
    },
    {
        name: "Adaptaphoria.com",
        tagline: "Hemp-Derived Delta-9 Beverages",
        description:
            "THC-infused beverage brand bringing legal, hemp-derived Delta-9 drinks to market. Built the digital presence and e-commerce platform for this emerging consumer brand.",
        role: "Contractor / Developer",
        url: "https://adaptaphoria.com",
        tags: ["Shopify", "Branding", "Cannabis"],
    },
];

export default function ProjectsPage() {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <header className="mb-16">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        Projects
                    </h1>
                    <p className="text-xl text-secondary max-w-2xl">
                        Things I&apos;ve built. From research platforms to consumer brands —
                        I like working at the edges where code meets real-world impact.
                    </p>
                </header>

                <div className="space-y-8">
                    {projects.map((project) => (
                        <a
                            key={project.name}
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block group"
                        >
                            <article className="bg-surface rounded-xl p-8 md:p-10 border border-border hover:shadow-md transition-shadow">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                                    <h2 className="text-2xl md:text-3xl font-bold group-hover:opacity-60 transition-opacity">
                                        {project.name}
                                    </h2>
                                    <span className="text-sm text-secondary bg-white border border-border rounded-full px-3 py-1 whitespace-nowrap self-start">
                                        {project.role}
                                    </span>
                                </div>
                                <p className="text-lg font-medium text-primary/80 mb-4">
                                    {project.tagline}
                                </p>
                                <p className="text-secondary leading-relaxed mb-6">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap items-center gap-2">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-xs text-secondary bg-white border border-border rounded-md px-2 py-1"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                    <span className="ml-auto text-primary font-medium group-hover:underline text-sm">
                                        Visit site →
                                    </span>
                                </div>
                            </article>
                        </a>
                    ))}
                </div>

                {/* GitHub CTA */}
                <div className="mt-16 text-center">
                    <p className="text-secondary mb-4">More code lives on GitHub.</p>
                    <a
                        href="https://github.com/kevinkeeland"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-surface transition-colors font-medium"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                fillRule="evenodd"
                                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                clipRule="evenodd"
                            />
                        </svg>
                        View GitHub Profile
                    </a>
                </div>
            </div>
        </div>
    );
}
