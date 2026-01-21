import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "The Pronoia Manifesto - Pronoia",
    description: "Pronoia is not blind optimism. It is recognizing that reality conspires for you.",
};

export default function ManifestoPage() {
    return (
        <div className="min-h-screen bg-white">
            <article className="max-w-prose mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                        The Pronoia Manifesto
                    </h1>
                </header>


                {/* Manifesto Diagram */}
                <div className="mb-12 flex justify-center">
                    <Image
                        src="/pronoia-manifesto-diagram.jpg"
                        alt="The Pronoia Manifesto - A visual diagram showing the lens of experience, core mechanism of internal distance, and the practice of recognition"
                        width={1200}
                        height={630}
                        className="rounded-lg shadow-lg w-full max-w-4xl h-auto"
                        priority
                    />
                </div>

                <div className="prose prose-lg max-w-none space-y-8 text-lg leading-relaxed">
                    <p className="text-xl md:text-2xl font-medium text-center">
                        Pronoia is not blind optimism.<br />
                        It is recognizing that reality conspires for you.
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
                        Pronoia is the practice of placing attention where it reveals support rather than obscures it.
                    </p>

                    <p>
                        We call attention <em>invested</em> when it helps us recognize what's already working:
                    </p>

                    <ul className="list-none pl-0 space-y-2">
                        <li>the support already present</li>
                        <li>the patterns already conspiring for us</li>
                    </ul>

                    <p>
                        We call attention <em>spent</em> when it blinds us to that support.
                    </p>

                    <p>
                        Suffering is not pain.<br />
                        Suffering is misalignment with what reality is already offering.
                    </p>

                    <p>
                        Happiness is not pleasure or achievement.<br />
                        Happiness is the absence of internal distance—<br />
                        when who we are, what we are doing, and what reality is showing us are no longer in conflict.
                    </p>

                    <p>
                        Pronoia does not mean avoiding discomfort.<br />
                        It means recognizing that discomfort is often reality conspiring to teach you.
                    </p>

                    <p>
                        Pronoia is not thinking positive thoughts.<br />
                        It is choosing to notice what's already working.
                    </p>

                    <p>
                        What we repeatedly attend to becomes our inner environment.<br />
                        What we practice internally becomes our external life.
                    </p>

                    <p className="text-xl md:text-2xl font-medium text-center pt-8">
                        Pronoia is how we align with reality—<br />
                        again and again—<br />
                        by choosing to see what's already conspiring for us.
                    </p>
                </div>
            </article>
        </div>
    );
}
