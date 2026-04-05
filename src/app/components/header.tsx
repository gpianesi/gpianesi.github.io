import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { CartSidebar } from "./cart-sidebar";

interface HeaderProps {
  onCheckout: () => void;
}

export function Header({ onCheckout }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl tracking-tight">Trabbrella</h1>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Features
          </a>
          <a
            href="#product"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Product
          </a>
          <a
            href="#shop"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Order
          </a>
        </nav>

        <CartSidebar onCheckout={onCheckout} />
      </div>
    </header>
  );
}