import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { Product } from '../types/product'
import rawData from '../assets/data/data.json'

const data = rawData as Product[]

export const Route = createFileRoute('/$category')({
    loader: ({ params }) => {
        const categoryProducts = data.filter((item) => item.category === params.category).sort((a, b) => (b.new ? 1 : -1))

        if (categoryProducts.length === 0) {
            throw new Error(`Category not found`)
        }

        return {
            products: categoryProducts,
            categoryName: params.category
        }
    },
    component: CategoryPage,
})

function CategoryPage() {
    const { products, categoryName } = Route.useLoaderData()

    return (
        <main>
            <header className="bg-surface text-text-inverse py-16 text-center uppercase tracking-widest text-4xl font-bold">
                {categoryName}
            </header>

            <div className='container mx-auto'>
                {products.map((product) => (
                    <div key={product.id}>
                        {product.name}
                    </div>
                ))}
            </div>
        </main>
    )
}
