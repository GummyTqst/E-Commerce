import { createFileRoute, Link } from "@tanstack/react-router"
import rawData from "../assets/data/data.json"
import { Product } from "../types/product"

export const Route = createFileRoute("/")({
    component: HomePage,
})

const data = rawData as Product[]

const categories = [
    {
        name: "Headphones",
        slug: "headphones",
        image: "./assets/shared/desktop/image-category-thumbnail-headphones.png",
    },
    {
        name: "Speakers",
        slug: "speakers",
        image: "./assets/shared/desktop/image-category-thumbnail-speakers.png",
    },
    {
        name: "Earphones",
        slug: "earphones",
        image: "./assets/shared/desktop/image-category-thumbnail-earphones.png",
    },
]

const newProducts = data.filter((p) => p.new)
const ZX9Speaker = data.find((p) => p.slug === "zx9-speaker")

function formatPrice(cents: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(cents)
}

export default function HomePage() {
    return (
        <main>
            {/* Hero Section */}
            <section className="bg-surface min-h-[80vh] flex items-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img
                        src="/assets/shared/mobile/image-zx9-speaker.jpg"
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="max-w-7xl mx-auto px-6 py-20 w-full relative z-10">
                    <div className="max-w-xl">
                        <p className="text-primary text-sm tracking-widest font-semibold mb-4">
                            NEW PRODUCT
                        </p>
                        <h1 className="text-text-inverse text-4xl md:text-6xl font-bold leading-tight mb-6">
                            {ZX9Speaker?.name}
                        </h1>
                        <p className="text-text-inverse/60 text-lg mb-8 leading-relaxed">
                            Experience natural, lifelike audio and exceptional
                            build quality made for the passionate music enthusiast.
                        </p>
                        <Link
                            to="/speakers/zx9-speaker"
                            className="inline-block bg-primary hover:bg-primary-light text-text-primary px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-colors duration-200"
                        >
                            See Product
                        </Link>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid md:grid-cols-3 gap-8">
                    {categories.map((cat) => (
                        <div
                            key={cat.slug}
                            className="bg-surface-muted rounded-lg p-8 flex flex-col items-center text-center"
                        >
                            <img
                                src={"/" + cat.image.replace("./", "")}
                                alt={cat.name}
                                className="w-32 h-32 object-contain mb-6"
                            />
                            <h2 className="text-text-primary text-lg font-bold tracking-widest uppercase mb-4">
                                {cat.name}
                            </h2>
                            <Link
                                to={`/${cat.slug}`}
                                className="text-text-primary/50 text-sm tracking-widest font-semibold hover:text-primary transition-colors duration-200 flex items-center gap-2"
                            >
                                SHOP
                                <img
                                    src="/assets/shared/desktop/icon-arrow-right.svg"
                                    alt=""
                                    className="w-3 h-3"
                                />
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* ZX9 Speaker */}
            <section className="max-w-7xl mx-auto px-6 pb-24">
                <div className="bg-surface rounded-lg overflow-hidden flex flex-col md:flex-row">
                    <div className="md:w-1/2 p-12 flex items-center justify-center">
                        <img
                            src="/assets/shared/desktop/image-zx9-speaker.jpg"
                            alt="ZX9 Speaker"
                            className="max-w-xs w-full"
                        />
                    </div>
                    <div className="md:w-1/2 p-12 flex items-center">
                        <div className="max-w-md">
                            <h2 className="text-text-primary text-3xl md:text-4xl font-bold mb-6 leading-tight">
                                ZX9 Speaker
                            </h2>
                            <p className="text-text-primary/60 mb-8 leading-relaxed">
                                Upgrade to a premium, home audio experience with the
                                ZX9 Speaker. Made with the highest quality
                                materials and features that will bring out the best
                                in your music.
                            </p>
                            <Link
                                to="/speakers/zx9-speaker"
                                className="inline-block bg-primary hover:bg-primary-light text-text-primary px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-colors duration-200"
                            >
                                See Product
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* XX99 Mark II */}
            <section className="max-w-7xl mx-auto px-6 pb-24">
                <div className="bg-surface rounded-lg overflow-hidden flex flex-col md:flex-row-reverse">
                    <div className="md:w-1/2 p-12 flex items-center justify-center">
                        <img
                            src="/assets/shared/desktop/image-xx99-mark-two-headphones.jpg"
                            alt="XX99 Mark II"
                            className="max-w-xs w-full"
                        />
                    </div>
                    <div className="md:w-1/2 p-12 flex items-center">
                        <div className="max-w-md">
                            <h2 className="text-text-primary text-3xl md:text-4xl font-bold mb-6 leading-tight">
                                XX99 Mark II
                            </h2>
                            <p className="text-text-primary/60 mb-8 leading-relaxed">
                                The new XX99 Mark II headphones is the pinnacle
                                of pristine audio. It redefines your premium
                                headphone experience by reproducing the
                                balanced depth and precision of studio-quality
                                sound.
                            </p>
                            <Link
                                to="/headphones/xx99-mark-two-headphones"
                                className="inline-block bg-primary hover:bg-primary-light text-text-primary px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-colors duration-200"
                            >
                                See Product
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* YX1 Earphones */}
            <section className="max-w-7xl mx-auto px-6 pb-24">
                <div className="bg-surface-muted rounded-lg overflow-hidden flex flex-col md:flex-row">
                    <div className="md:w-1/2 p-12 flex items-center justify-center">
                        <img
                            src="/assets/shared/desktop/image-xx59-headphones.jpg"
                            alt="XX59 Headphones"
                            className="max-w-xs w-full"
                        />
                    </div>
                    <div className="md:w-1/2 p-12 flex items-center">
                        <div className="max-w-md">
                            <h2 className="text-text-primary text-3xl md:text-4xl font-bold mb-6 leading-tight">
                                XX59 Headphones
                            </h2>
                            <p className="text-text-primary/60 mb-8 leading-relaxed">
                                Enjoy your audio almost anywhere and customize
                                it to your specific tastes with the XX59
                                headphones. The stylish yet durable versatile
                                wireless headset is a brilliant companion.
                            </p>
                            <Link
                                to="/headphones/xx59-headphones"
                                className="inline-block bg-primary hover:bg-primary-light text-text-primary px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-colors duration-200"
                            >
                                See Product
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Best Gear */}
            <section className="max-w-7xl mx-auto px-6 pb-24">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-text-primary text-3xl md:text-4xl font-bold mb-6">
                        Bringing you the <span className="text-primary">best</span> audio gear
                    </h2>
                    <p className="text-text-primary/50 leading-relaxed">
                        Located at the heart of New York City, Audiophile is the premier
                        store for high-end headphones, portable audio players, earphones,
                        speakers, and accessories. Visit us for a unique experience or
                        order online. We bring you the best audio equipment globally.
                    </p>
                </div>
            </section>
        </main>
    )
}