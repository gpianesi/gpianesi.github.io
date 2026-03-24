import { Button } from "./ui/button";
import { ShoppingCart, Mail } from "lucide-react";

interface CTASectionProps {
  onAddToCart?: () => void;
}

export function CTASection({ onAddToCart }: CTASectionProps) {
  const handlePreOrder = () => {
    if (onAddToCart) {
      onAddToCart();
    }
    // Scroll to product selection
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl mb-6">
          Ready to Transform Your Beach Experience?
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Limited quantities available for our first production run.  
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-black text-white hover:bg-gray-800 text-lg px-8 py-6"
            onClick={handlePreOrder}
          >
            <ShoppingCart className="mr-2 size-5" />
            Pre-Order Now - $49
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-black text-black hover:bg-gray-50 text-lg px-8 py-6"
          >
            <Mail className="mr-2 size-5" />
            Get Updates
          </Button>
        </div>

        <p className="text-sm text-gray-500 mt-8">
          Free shipping on all pre-orders • 30-day money-back guarantee
        </p>
      </div>
    </section>
  );
}