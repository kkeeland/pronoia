import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface Post {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    content: string;
    readTime: string;
    featured?: boolean;
}

export function getAllPosts(): Post[] {
    // Ensure directory exists
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allPosts = fileNames
        .filter((fileName) => fileName.endsWith(".mdx"))
        .map((fileName) => {
            const slug = fileName.replace(/\.mdx$/, "");
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, "utf8");
            const { data, content } = matter(fileContents);

            return {
                slug,
                title: data.title,
                date: data.date,
                excerpt: data.excerpt,
                content,
                readTime: readingTime(content).text,
                featured: data.featured || false,
            };
        });

    // Sort posts by date
    return allPosts.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getPostBySlug(slug: string): Post | null {
    try {
        const fullPath = path.join(postsDirectory, `${slug}.mdx`);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        return {
            slug,
            title: data.title,
            date: data.date,
            excerpt: data.excerpt,
            content,
            readTime: readingTime(content).text,
            featured: data.featured || false,
        };
    } catch {
        return null;
    }
}

export function getFeaturedPost(): Post | null {
    const posts = getAllPosts();
    return posts.find((post) => post.featured) || posts[0] || null;
}
