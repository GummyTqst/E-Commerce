import { Link } from "@tanstack/react-router";
import { SiFacebook, SiX, SiInstagram } from "react-icons/si";
import Logo from "../../assets/shared/desktop/logo.svg"

const links = [
    { label: "Home", href: "/" },
    { label: "Headphones", href: "/headphones" },
    { label: "Speakers", href: "/speakers" },
    { label: "Earphones", href: "/earphones" },
]


export default function Footer() {
    return (
        <footer className="bg-surface">
            <div className="max-w-7xl mx-auto px-6 py-16">
                {/* Top row - logo */}
                <div className="flex flex-col gap-12 md:flex-row md:justify-between md:items-start">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="text-text-inverse font-bold text-lg tracking-tight"
                    >
                        <img src={Logo} alt="Audiophile Logo" className="h-6 w-auto" />
                    </Link>

                    <ul className="flex flex-col gap-4 md:flex-row md:gap-8">
                        {links.map(({ label, href }) => (
                            <li key={href}>
                                <Link
                                    to={href}
                                    className="text-xs font-semibold tracking-widest text-text-inverse hover:text-primary transition-colors duration-200"
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-12 flex flex-col gap-12 md:flex-row md:justify-between md:items-start">
                    <div className="max-w-md">
                        <p className="text-text-inverse/50 text-sm leading-relaxed">
                            Audiophile is an all in one stop to fulfill your audio needs.
                            We're a small team of music lovers and sound specialists who are
                            devoted to helping you get the most out of a personal audio.
                            Come and visit out demo facility - we're open 7 days a week.
                        </p>
                        <p className="mt-8 text-text-inverse/50 text-sm">
                            Copyright {new Date().getFullYear()}. All Rights Reserved
                        </p>
                    </div>

                    <div className="flex items-center gap-4"> 
                        <a href="#" aria-label="Facebook" className="text-text-inverse hover:text-primary transition-colors duration-200">
                            <SiFacebook size={20} />
                        </a>
                        <a href="#" aria-label="Twitter" className="text-text-inverse hover:text-primary transition-colors duration-200">
                            <SiX size={20} />
                        </a>
                        <a href="#" aria-label="Instagram" className="text-text-inverse hover:text-primary transition-colors duration-200">
                            <SiInstagram size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}