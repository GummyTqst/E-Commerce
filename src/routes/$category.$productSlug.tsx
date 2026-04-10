import { Link, createFileRoute } from "@tanstack/react-router"
import rawData from "../assets/data/data.json"
import { Product } from "../types/product"
import { useCart } from "../Components/context/cart-context"
import { useState } from "react"

const data = rawData as Product[]

export const Route = createFileRoute("/$category/$productSlug")({
    loader: ({ params }) => {
        const product = data.find(
            (item) =>
                item.slug === params.productSlug &&
                item.category === params.category
        )

        if (!product) {
            throw new Error("Product not found")
        }

        return { product }
    },
    component: ProductPage,
})

function formatPrice(cents: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(cents)
}

function fixPath(path: string) {
    return "/" + path.replace("./", "")
}

function ProductPage() {
    const { product } = Route.useLoaderData()
    const { addItem } = useCart()
    const [quantity, setQuantity] = useState(1)

    return (
        <main>
            <div className="max-w-7xl mx-auto px-6 py-8">
                <Link
                    to={`/${product.category}`}
                    className="text-text-primary/50 text-sm hover:text-primary transition-colors duration-200 inline-flex items-center gap-2 mb-8"
                >
                    ← Back
                </Link>

                <div className="flex flex-col md:flex-row gap-8 md:gap-24">
                    <div className="flex-1">
                        <img
                            src={fixPath(product.image.desktop)}
                            alt={product.name}
                            className="w-full rounded-lg"
                        />
                    </div>

                    <div className="flex-1">
                        {product.new && (
                            <p className="text-primary text-sm tracking-widest font-semibold mb-4">
                                NEW PRODUCT
                            </p>
                        )}
                        <h1 className="text-text-primary text-3xl md:text-4xl font-bold mb-6 leading-tight">
                            {product.name}
                        </h1>
                        <p className="text-text-primary/60 mb-8 leading-relaxed">
                            {product.description}
                        </p>
                        <p className="text-text-primary text-2xl font-bold mb-8">
                            {formatPrice(product.price)}
                        </p>

                        <div className="flex gap-4">
                            <div className="flex items-center bg-surface-muted">
                                <button
                                    onClick={() =>
                                        setQuantity((q) => Math.max(1, q - 1))
                                    }
                                    className="px-4 py-4 text-text-primary hover:text-primary transition-colors duration-200"
                                >
                                    -
                                </button>
                                <span className="px-4 text-text-primary font-bold">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity((q) => q + 1)}
                                    className="px-4 py-4 text-text-primary hover:text-primary transition-colors duration-200"
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={() => {
                                    for (let i = 0; i < quantity; i++) {
                                        addItem(product)
                                    }
                                }}
                                className="bg-primary hover:bg-primary-light text-text-primary px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-colors duration-200"
                            >
                                ADD TO CART
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex flex-col md:flex-row gap-16">
                    <div className="flex-1">
                        <h2 className="text-text-primary text-2xl font-bold mb-6">
                            Features
                        </h2>
                        <div className="text-text-primary/60 leading-relaxed whitespace-pre-line">
                            {product.features}
                        </div>
                    </div>

                    <div className="flex-1 md:w-80">
                        <h2 className="text-text-primary text-2xl font-bold mb-6">
                            In the box
                        </h2>
                        <ul className="space-y-2">
                            {product.includes.map((item, index) => (
                                <li
                                    key={index}
                                    className="flex gap-4 text-text-primary/60"
                                >
                                    <span className="text-primary font-bold">
                                        {item.quantity}x
                                    </span>
                                    <span>{item.item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pb-16">
                <h2 className="text-text-primary text-2xl font-bold mb-8 text-center">
                    You may also like
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {product.others.map((other) => (
                        <div key={other.slug}>
                            <div className="bg-surface-muted rounded-lg p-8 mb-4">
                                <img
                                    src={fixPath(other.image.desktop)}
                                    alt={other.name}
                                    className="w-full"
                                />
                            </div>
                            <h3 className="text-text-primary text-lg font-bold text-center mb-4">
                                {other.name}
                            </h3>
                            <Link
                                to={`/${product.category}/${other.slug}`}
                                className="block text-center bg-primary hover:bg-primary-light text-text-primary py-3 text-sm font-semibold tracking-widest uppercase transition-colors duration-200"
                            >
                                See Product
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}