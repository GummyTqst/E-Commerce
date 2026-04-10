import { Link, useLocation } from "@tanstack/react-router"
import { useState } from "react"
import { ShoppingCart, Menu, X } from "lucide-react"
import Logo from "../../assets/shared/desktop/logo.svg"
import { useCart } from "../context/cart-context"
import CartDrawer from "../cart/cart-drawer"

const links = [
    { label: "Home", href: "/" },
    { label: "Headphones", href: "/headphones" },
    { label: "Speakers", href: "/speakers" },
    { label: "Earphones", href: "/earphones" },
]

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [cartOpen, setCartOpen] = useState(false)
    const { pathname } = useLocation()
    const { totalItems } = useCart()

    return (
        <>
            <header className="bg-surface border-b border-border sticky top-0 z-50">
                <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            className="md:hidden text-text-inverse"
                            onClick={() => setMobileOpen((prev) => !prev)}
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>

                        <Link
                            to="/"
                            className="text-text-inverse font-bold text-lg tracking-tight"
                        >
                            <img
                                src={Logo}
                                alt="Audiophile Logo"
                                className="h-6 w-auto"
                            />
                        </Link>
                    </div>

                    <ul className="hidden md:flex items-center justify-center gap-8 mx-auto">
                        {links.map(({ label, href }) => (
                            <li key={href}>
                                <Link
                                    to={href}
                                    className={`text-xs font-semibold tracking-widest transition-colors duration-200 ${
                                        pathname === href
                                            ? "text-primary"
                                            : "text-text-inverse hover:text-primary"
                                    }`}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="flex justify-end">
                        <button
                            aria-label="Cart"
                            className="text-text-inverse hover:text-primary transition-colors duration-200 relative"
                            onClick={() => setCartOpen(true)}
                        >
                            <ShoppingCart size={22} strokeWidth={1.8} />
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-primary text-text-primary text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </div>
                </nav>

                {mobileOpen && (
                    <div className="md:hidden bg-surface border-t border-surface-muted px-6 py-4">
                        <ul className="flex flex-col gap-4">
                            {links.map(({ label, href }) => (
                                <li key={href}>
                                    <Link
                                        to={href}
                                        onClick={() => setMobileOpen(false)}
                                        className={`block text-xs font-semibold tracking-widest transition-colors duration-200 ${
                                            pathname === href
                                                ? "text-primary"
                                                : "text-text-inverse hover:text-primary"
                                        }`}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </header>

            <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
        </>
    )
}