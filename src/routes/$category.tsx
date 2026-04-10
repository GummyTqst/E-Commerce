import { Link, createFileRoute } from "@tanstack/react-router"
import rawData from "../assets/data/data.json"
import { Product } from "../types/product"

const data = rawData as Product[]

export const Route = createFileRoute("/$category")({
    loader: ({ params }) => {
        const categoryProducts = data
            .filter((item) => item.category === params.category)
            .sort((a, b) => (b.new ? 1 : -1))

        if (categoryProducts.length === 0) {
            throw new Error(`Category not found`)
        }

        return {
            products: categoryProducts,
            categoryName: params.category,
        }
    },
    component: CategoryPage,
})

function formatPrice(cents: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(cents)
}

function CategoryPage() {
    const { products, categoryName } = Route.useLoaderData()

    return (
        <main>
            <header className="bg-surface text-text-inverse py-16 text-center uppercase tracking-widest text-4xl font-bold">
                {categoryName}
            </header>

            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex flex-col gap-16">
                    {products.map((product, index) => (
                        <div
                            key={product.id}
                            className={`flex flex-col ${
                                index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
                            } gap-8 md:gap-24 items-center`}
                        >
                            <div className="flex-1 w-full">
                                <img
                                    src={"/" + product.categoryImage.desktop.replace("./", "")}
                                    alt={product.name}
                                    className="w-full rounded-lg"
                                />
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                {product.new && (
                                    <p className="text-primary text-sm tracking-widest font-semibold mb-4">
                                        NEW PRODUCT
                                    </p>
                                )}
                                <h2 className="text-text-primary text-3xl md:text-4xl font-bold mb-6 leading-tight">
                                    {product.name}
                                </h2>
                                <p className="text-text-primary/60 mb-8 leading-relaxed">
                                    {product.description}
                                </p>
                                <Link
                                    to="/$category/$productSlug"
                                    params={{ category: product.category, productSlug: product.slug }}
                                    className="inline-block bg-primary hover:bg-primary-light text-text-primary px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-colors duration-200"
                                >
                                    See Product
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}