import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "The Self-luv Manifesto - self-luv",
    description: "Self-luv is not self-indulgence. It is attentional responsibility.",
};

export default function ManifestoPage() {
    return (
        <div className="min-h-screen bg-white">
            <article className="max-w-prose mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                        The Self-luv Manifesto
                    </h1>
                </header>

                {/* Manifesto Diagram */}
                <div className="mb-12 flex justify-center">
                    <Image
                        src="/self-luv-manifesto-diagram.jpg"
                        alt="The Self-luv Manifesto - A visual diagram showing the lens of experience, core mechanism of internal distance, and the practice of return"
                        width={1200}
                        height={630}
                        className="rounded-lg shadow-lg w-full max-w-4xl h-auto"
                        priority
                    />
                </div>

                <div className="prose prose-lg max-w-none space-y-8 text-lg leading-relaxed">
                    <p className="text-xl md:text-2xl font-medium text-center">
                        Self-luv is not self-indulgence.<br />
                        It is attentional responsibility.
                    </p>

                    <p>
                        We do not experience life as it is.<br />
                        We experience life as we attend to it.
                    </p>

                    <p>
                        Attention is the most valuable resource we have, because it shapes:
                    </p>

                    <ul className="list-none pl-0 space-y-2">
                        <li>how time is felt</li>
                        <li>how meaning is formed</li>
                        <li>who we become</li>
                    </ul>

                    <p>
                        Time passes regardless.<br />
                        Attention decides what stays.
                    </p>

                    <p>
                        At every moment, we are training ourselves—<br />
                        through what we give our attention to<br />
                        and what we repeatedly ignore.
                    </p>

                    <p className="font-medium">
                        Self-luv is the practice of placing attention where it reduces internal distance rather than increases it.
                    </p>

                    <p>
                        We call attention <em>invested</em> when it closes the gap between:
                    </p>

                    <ul className="list-none pl-0 space-y-2">
                        <li>our current state</li>
                        <li>and our honest expectations</li>
                    </ul>

                    <p>
                        We call attention <em>spent</em> when it widens that gap.
                    </p>

                    <p>
                        Suffering is not pain.<br />
                        Suffering is misaligned attention.
                    </p>

                    <p>
                        Happiness is not pleasure or achievement.<br />
                        Happiness is the absence of internal distance—<br />
                        when who we are, what we are doing, and what we expect of ourselves are no longer in conflict.
                    </p>

                    <p>
                        Self-luv does not mean avoiding discomfort.<br />
                        It means choosing the discomfort that leads to coherence.
                    </p>

                    <p>
                        Self-luv is not thinking kinder thoughts.<br />
                        It is choosing better objects of attention.
                    </p>

                    <p>
                        What we repeatedly attend to becomes our inner environment.<br />
                        What we practice internally becomes our external life.
                    </p>

                    <p className="text-xl md:text-2xl font-medium text-center pt-8">
                        Self-luv is how we return to ourselves—<br />
                        again and again—<br />
                        by choosing where our attention belongs.
                    </p>
                </div>
            </article>
        </div>
    );
}
