import Link from "next/link";
import { getAllPosts, getFeaturedPost } from "@/lib/posts";

export default function HomePage() {
  const featuredPost = getFeaturedPost();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center space-y-6">
          <div className="relative inline-block">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Engineered Happiness
            </h1>
            <span className="absolute -top-4 -right-12 md:-right-16 text-2xl md:text-3xl text-primary/70 rotate-12 font-caveat whitespace-nowrap">
              at scale
            </span>
          </div>
          <p className="text-xl md:text-2xl text-secondary max-w-2xl mx-auto">
            Your reality conspires for you when you invest your attention.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link
              href="/manifesto"
              className="px-8 py-3 bg-primary !text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Read the Manifesto
            </Link>
            <Link
              href="/blog"
              className="px-8 py-3 border-2 border-primary text-primary rounded-lg hover:bg-surface transition-colors font-medium"
            >
              Explore Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && (
        <section className="bg-surface py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Featured Article</h2>
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="block group"
            >
              <article className="bg-white rounded-xl p-8 md:p-12 shadow-sm hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-secondary">
                    <time>{new Date(featuredPost.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                    <span>•</span>
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold group-hover:opacity-60 transition-opacity">
                    {featuredPost.title}
                  </h3>
                  <p className="text-lg text-secondary leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="pt-4">
                    <span className="text-primary font-medium group-hover:underline">
                      Read full article →
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          </div>
        </section>
      )}

      {/* About Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">About Pronoia</h2>
          <p className="text-lg text-secondary leading-relaxed mb-6">
            This is a space for exploring the intersection of engineering, philosophy, and human experience.
            Here, I share thoughts on attention, happiness, and the practice of building coherent lives through
            intentional choices.
          </p>
          <p className="text-lg text-secondary leading-relaxed">
            As a coder at heart, I approach life's questions with the same rigor I bring to building software:
            breaking down complex problems, testing assumptions, and iterating toward better solutions.
            This blog is where those explorations live.
          </p>
        </div>
      </section>

      {/* Projects Teaser */}
      <section className="bg-surface py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Things I&apos;ve Built</h2>
          <p className="text-lg text-secondary mb-10 max-w-2xl">
            From peptide research platforms to THC beverage brands — I build at the intersection of code and real-world impact.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {[
              { name: "Peptok.ai", desc: "Science-backed peptide research platform", url: "https://peptok.ai" },
              { name: "EmbodyPeptides.com", desc: "Research peptide vendor", url: "https://embodypeptides.com" },
              { name: "Adaptaphoria.com", desc: "Hemp-derived Delta-9 beverages", url: "https://adaptaphoria.com" },
            ].map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white rounded-xl p-6 border border-border hover:shadow-md transition-shadow group"
              >
                <h3 className="font-bold text-lg mb-2 group-hover:opacity-60 transition-opacity">{p.name}</h3>
                <p className="text-secondary text-sm">{p.desc}</p>
              </a>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/projects"
              className="inline-block px-8 py-3 border-2 border-primary text-primary rounded-lg hover:bg-white transition-colors font-medium"
            >
              View All Projects →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 !text-white">
            Start with the Manifesto
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Understand the core philosophy behind Pronoia and attentional responsibility.
          </p>
          <Link
            href="/manifesto"
            className="inline-block px-8 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Read the Manifesto
          </Link>
        </div>
      </section>
    </div>
  );
}
