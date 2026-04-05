import { useState } from "react";
import { Menu, X } from "lucide-react";
import { CartSidebar } from "./cart-sidebar";

interface HeaderProps {
  onCheckout: () => void;
}

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#product", label: "Product" },
  { href: "#shop", label: "Order" },
];

export function Header({ onCheckout }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl tracking-tight">Trabbrella</h1>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CartSidebar onCheckout={onCheckout} />

          {/* Hamburger button — mobile only */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isMenuOpen && (
        <nav className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm px-6 py-4 flex flex-col gap-4">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={closeMenu}
              className="text-gray-700 hover:text-gray-900 text-lg transition-colors py-1"
            >
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
