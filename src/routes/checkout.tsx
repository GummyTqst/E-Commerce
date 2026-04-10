import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useCart } from "../Components/context/cart-context"
import { useState } from "react"

export const Route = createFileRoute("/checkout")({
    component: CheckoutPage,
})

function formatPrice(cents: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(cents)
}

interface FormData {
    name: string
    email: string
    phone: string
    address: string
    zip: string
    city: string
    country: string
    eMoneyNumber: string
    eMoneyPin: string
}

interface FormErrors {
    name?: string
    email?: string
    phone?: string
    address?: string
    zip?: string
    city?: string
    country?: string
    eMoneyNumber?: string
    eMoneyPin?: string
}

export default function CheckoutPage() {
    const navigate = useNavigate()
    const { items, subtotal, shipping, vat, total, clearCart } = useCart()
    const [paymentMethod, setPaymentMethod] = useState<"eMoney" | "cash">("eMoney")
    const [errors, setErrors] = useState<FormErrors>({})
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        address: "",
        zip: "",
        city: "",
        country: "",
        eMoneyNumber: "",
        eMoneyPin: "",
    })

    const validate = (): boolean => {
        const newErrors: FormErrors = {}

        if (!formData.name.trim()) newErrors.name = "Required"
        if (!formData.email.trim()) {
            newErrors.email = "Required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email"
        }
        if (!formData.phone.trim()) newErrors.phone = "Required"
        if (!formData.address.trim()) newErrors.address = "Required"
        if (!formData.zip.trim()) newErrors.zip = "Required"
        if (!formData.city.trim()) newErrors.city = "Required"
        if (!formData.country.trim()) newErrors.country = "Required"

        if (paymentMethod === "eMoney") {
            if (!formData.eMoneyNumber.trim()) newErrors.eMoneyNumber = "Required"
            else if (!/^\d{9}$/.test(formData.eMoneyNumber.replace(/\s/g, ""))) {
                newErrors.eMoneyNumber = "Must be 9 digits"
            }
            if (!formData.eMoneyPin.trim()) newErrors.eMoneyPin = "Required"
            else if (!/^\d{4}$/.test(formData.eMoneyPin)) {
                newErrors.eMoneyPin = "Must be 4 digits"
            }
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!validate()) return
        clearCart()
        setShowConfirmation(true)
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }))
        }
    }

    if (items.length === 0 && !showConfirmation) {
        return (
            <main className="max-w-7xl mx-auto px-6 py-16">
                <div className="text-center">
                    <h1 className="text-text-primary text-2xl font-bold mb-4">
                        Your cart is empty
                    </h1>
                    <p className="text-text-primary/60 mb-8">
                        Add some products to your cart before checking out.
                    </p>
                </div>
            </main>
        )
    }

    if (showConfirmation) {
        return (
            <main className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
                <div className="bg-background max-w-lg w-full p-8 rounded-lg">
                    <img
                        src="./assets/checkout/icon-order-confirmation.svg"
                        alt=""
                        className="w-16 h-16 mb-6"
                    />
                    <h1 className="text-text-primary text-2xl font-bold mb-4">
                        Thank you for your order!
                    </h1>
                    <p className="text-text-primary/60 mb-6">
                        Your order has been received and is being processed. You
                        will receive an email confirmation shortly.
                    </p>
                    <div className="bg-surface-muted p-6 rounded-lg mb-6">
                        <p className="text-text-primary/60 text-sm mb-2">
                            Order Total
                        </p>
                        <p className="text-text-primary text-2xl font-bold">
                            {formatPrice(total)}
                        </p>
                    </div>
                    <button
                        onClick={() => navigate({ to: "/" })}
                        className="w-full bg-primary hover:bg-primary-light text-text-primary py-4 text-sm font-semibold tracking-widest uppercase transition-colors duration-200"
                    >
                        Back to Home
                    </button>
                </div>
            </main>
        )
    }

    return (
        <main className="max-w-7xl mx-auto px-6 py-16">
            <h1 className="text-text-primary text-3xl font-bold mb-8">Checkout</h1>

            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-16">
                <div className="order-2 md:order-1">
                    <h2 className="text-text-primary text-lg font-bold tracking-widest uppercase mb-6">
                        Billing Details
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <label className="block text-text-primary text-sm font-bold mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full p-4 bg-surface-muted text-text-primary border ${
                                    errors.name ? "border-red-500" : "border-transparent"
                                } rounded-lg focus:outline-none focus:border-primary`}
                                placeholder="Alexei Ward"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.name}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-text-primary text-sm font-bold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full p-4 bg-surface-muted text-text-primary border ${
                                    errors.email ? "border-red-500" : "border-transparent"
                                } rounded-lg focus:outline-none focus:border-primary`}
                                placeholder="alexei@example.com"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.email}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-text-primary text-sm font-bold mb-2">
                                Phone
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className={`w-full p-4 bg-surface-muted text-text-primary border ${
                                    errors.phone ? "border-red-500" : "border-transparent"
                                } rounded-lg focus:outline-none focus:border-primary`}
                                placeholder="+1 (555) 123-4567"
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.phone}
                                </p>
                            )}
                        </div>
                    </div>

                    <h2 className="text-text-primary text-lg font-bold tracking-widest uppercase mb-6 mt-8">
                        Shipping Info
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="md:col-span-2">
                            <label className="block text-text-primary text-sm font-bold mb-2">
                                Address
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className={`w-full p-4 bg-surface-muted text-text-primary border ${
                                    errors.address ? "border-red-500" : "border-transparent"
                                } rounded-lg focus:outline-none focus:border-primary`}
                                placeholder="123 Main Street"
                            />
                            {errors.address && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.address}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-text-primary text-sm font-bold mb-2">
                                ZIP Code
                            </label>
                            <input
                                type="text"
                                name="zip"
                                value={formData.zip}
                                onChange={handleChange}
                                className={`w-full p-4 bg-surface-muted text-text-primary border ${
                                    errors.zip ? "border-red-500" : "border-transparent"
                                } rounded-lg focus:outline-none focus:border-primary`}
                                placeholder="10001"
                            />
                            {errors.zip && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.zip}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-text-primary text-sm font-bold mb-2">
                                City
                            </label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className={`w-full p-4 bg-surface-muted text-text-primary border ${
                                    errors.city ? "border-red-500" : "border-transparent"
                                } rounded-lg focus:outline-none focus:border-primary`}
                                placeholder="New York"
                            />
                            {errors.city && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.city}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-text-primary text-sm font-bold mb-2">
                                Country
                            </label>
                            <input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                className={`w-full p-4 bg-surface-muted text-text-primary border ${
                                    errors.country ? "border-red-500" : "border-transparent"
                                } rounded-lg focus:outline-none focus:border-primary`}
                                placeholder="United States"
                            />
                            {errors.country && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.country}
                                </p>
                            )}
                        </div>
                    </div>

                    <h2 className="text-text-primary text-lg font-bold tracking-widest uppercase mb-6 mt-8">
                        Payment
                    </h2>

                    <div className="flex gap-4 mb-6">
                        <button
                            type="button"
                            onClick={() => setPaymentMethod("eMoney")}
                            className={`flex-1 p-4 text-sm font-bold tracking-widest uppercase rounded-lg border ${
                                paymentMethod === "eMoney"
                                    ? "bg-surface-muted border-primary text-text-primary"
                                    : "bg-transparent border-border text-text-primary/60"
                            }`}
                        >
                            e-Money
                        </button>
                        <button
                            type="button"
                            onClick={() => setPaymentMethod("cash")}
                            className={`flex-1 p-4 text-sm font-bold tracking-widest uppercase rounded-lg border ${
                                paymentMethod === "cash"
                                    ? "bg-surface-muted border-primary text-text-primary"
                                    : "bg-transparent border-border text-text-primary/60"
                            }`}
                        >
                            Cash on Delivery
                        </button>
                    </div>

                    {paymentMethod === "eMoney" && (
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-text-primary text-sm font-bold mb-2">
                                    e-Money Number
                                </label>
                                <input
                                    type="text"
                                    name="eMoneyNumber"
                                    value={formData.eMoneyNumber}
                                    onChange={handleChange}
                                    className={`w-full p-4 bg-surface-muted text-text-primary border ${
                                        errors.eMoneyNumber
                                            ? "border-red-500"
                                            : "border-transparent"
                                    } rounded-lg focus:outline-none focus:border-primary`}
                                    placeholder="238221993"
                                />
                                {errors.eMoneyNumber && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.eMoneyNumber}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-text-primary text-sm font-bold mb-2">
                                    e-Money PIN
                                </label>
                                <input
                                    type="text"
                                    name="eMoneyPin"
                                    value={formData.eMoneyPin}
                                    onChange={handleChange}
                                    className={`w-full p-4 bg-surface-muted text-text-primary border ${
                                        errors.eMoneyPin
                                            ? "border-red-500"
                                            : "border-transparent"
                                    } rounded-lg focus:outline-none focus:border-primary`}
                                    placeholder="1234"
                                />
                                {errors.eMoneyPin && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.eMoneyPin}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {paymentMethod === "cash" && (
                        <div className="flex items-start gap-4 p-4 bg-surface-muted rounded-lg">
                            <img
                                src="./assets/checkout/icon-cash-on-delivery.svg"
                                alt=""
                                className="w-8 h-8"
                            />
                            <p className="text-text-primary/60 text-sm">
                                The 'Cash on Delivery' option enables you to pay
                                in cash when our courier delivery agent arrives
                                at your home.
                            </p>
                        </div>
                    )}
                </div>

                <div className="order-1 md:order-2">
                    <div className="bg-surface-muted p-6 rounded-lg sticky top-24">
                        <h2 className="text-text-primary text-lg font-bold tracking-widest uppercase mb-6">
                            Summary
                        </h2>

                        <div className="space-y-4 mb-6">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex gap-4"
                                >
                                    <div className="w-16 h-16 bg-surface rounded-lg overflow-hidden">
                                        <img
                                            src={"/" + item.image.desktop.replace("./", "")}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-text-primary font-bold">
                                            {item.name}
                                        </h3>
                                        <p className="text-text-primary/60 text-sm">
                                            {formatPrice(item.price)}
                                        </p>
                                    </div>
                                    <span className="text-text-primary/60">
                                        x{item.quantity}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-border pt-4 space-y-2">
                            <div className="flex justify-between">
                                <span className="text-text-primary/60">
                                    Subtotal
                                </span>
                                <span className="text-text-primary font-bold">
                                    {formatPrice(subtotal)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-text-primary/60">
                                    Shipping
                                </span>
                                <span className="text-text-primary font-bold">
                                    {formatPrice(shipping)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-text-primary/60">
                                    VAT (20%)
                                </span>
                                <span className="text-text-primary font-bold">
                                    {formatPrice(vat)}
                                </span>
                            </div>
                        </div>

                        <div className="border-t border-border pt-4 mt-4">
                            <div className="flex justify-between">
                                <span className="text-text-primary font-bold">
                                    Total
                                </span>
                                <span className="text-text-primary text-xl font-bold">
                                    {formatPrice(total)}
                                </span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary-light text-text-primary py-4 text-sm font-semibold tracking-widest uppercase transition-colors duration-200 mt-6"
                        >
                            Continue & Pay
                        </button>
                    </div>
                </div>
            </form>
        </main>
    )
}