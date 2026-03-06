import { useLocation } from "@tanstack/react-router"
import { useState } from "react"

const links = [
    { label: "Home", to: "/" },
    { label: "Headphones", to: "/headphones" },
    { label: "Speakers", to: "/speakers" },
    { label: "Earphones", to: "/earphones" },
]

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const { pathname } = useLocation()
}