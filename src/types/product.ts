export interface ImageVariants {
    mobile: string
    tablet: string
    desktop: string
}

export interface AccessoryItem {
    item: string
    quantity: number
}

export interface OtherProduct {
    slug: string,
    name: string
    image: ImageVariants
}

export interface Product {
    id: number
    slug: string
    name: string
    image: ImageVariants
    category: "headphones" | "speakers" | "earphones"; // Explicit for type safety
    categoryImage: ImageVariants
    new: boolean
    price: number
    description: string
    features: string
    includes: AccessoryItem[]
    gallery: {
      first: ImageVariants
      second: ImageVariants
      third: ImageVariants
    };
    others: OtherProduct[]
}