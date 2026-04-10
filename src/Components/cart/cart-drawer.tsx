import { Link } from "@tanstack/react-router"
import { X, Minus, Plus, Trash2 } from "lucide-react"
import { useCart } from "../context/cart-context"

interface CartDrawerProps {
    open: boolean
    onClose: () => void
}

function formatPrice(cents: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(cents)
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
    const { items, removeItem, updateQuantity, subtotal, shipping, vat, total } = useCart()

    if (!open) return null

    return (
        <div className="fixed inset-0 z-50">
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />
            <div className="absolute right-0 top-0 h-full w-full max-w-md bg-background shadow-xl overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-text-primary text-lg font-bold tracking-widest uppercase">
                            Cart ({items.length})
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-text-primary/50 hover:text-primary transition-colors duration-200"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {items.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-text-primary/50 mb-6">
                                Your cart is empty
                            </p>
                            <button
                                onClick={onClose}
                                className="text-primary text-sm tracking-widest font-semibold hover:underline"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="space-y-6">
                                {items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex gap-4"
                                    >
                                        <div className="w-20 h-20 bg-surface-muted rounded-lg overflow-hidden">
                                            <img
                                                src={"/" + item.image.desktop.replace("./", "")}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-text-primary font-bold">
                                                    {item.name}
                                                </h3>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-text-primary/30 hover:text-red-500 transition-colors duration-200"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            <p className="text-text-primary/60 text-sm mb-2">
                                                {formatPrice(item.price)}
                                            </p>
                                            <div className="flex items-center bg-surface-muted w-fit">
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.id,
                                                            item.quantity - 1
                                                        )
                                                    }
                                                    className="p-2 text-text-primary hover:text-primary transition-colors duration-200"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="px-3 text-text-primary text-sm font-bold">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.id,
                                                            item.quantity + 1
                                                        )
                                                    }
                                                    className="p-2 text-text-primary hover:text-primary transition-colors duration-200"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-border">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-text-primary/60">Subtotal</span>
                                    <span className="text-text-primary font-bold">
                                        {formatPrice(subtotal)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-text-primary/60">Shipping</span>
                                    <span className="text-text-primary font-bold">
                                        {formatPrice(shipping)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-text-primary/60">VAT (20%)</span>
                                    <span className="text-text-primary font-bold">
                                        {formatPrice(vat)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t border-border">
                                    <span className="text-text-primary font-bold">
                                        Total
                                    </span>
                                    <span className="text-text-primary text-xl font-bold">
                                        {formatPrice(total)}
                                    </span>
                                </div>
                            </div>

                            <Link
                                to="/checkout"
                                onClick={onClose}
                                className="block w-full bg-primary hover:bg-primary-light text-text-primary py-4 text-center text-sm font-semibold tracking-widest uppercase transition-colors duration-200 mt-6"
                            >
                                Checkout
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}