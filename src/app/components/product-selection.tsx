import { useState } from "react";
import { Button } from "./ui/button";
import { Check } from "lucide-react";
import { useCart, Product } from "../context/cart-context";
import { toast } from "sonner";

const products: (Product & { hex: string })[] = [
  {
    id: "trabbrella-blue",
    name: "Trabbrella - Ocean Blue",
    price: 49,
    color: "Blue",
    hex: "#5B8DB8",
    image: "/imgs/blue.jpg",
  },
  {
    id: "trabbrella-coral",
    name: "Trabbrella - Coral Reef",
    price: 49,
    color: "Coral",
    hex: "#E07660",
    image: "/imgs/coral.jpg",
  },
  {
    id: "trabbrella-sand",
    name: "Trabbrella - Sandy Beige",
    price: 49,
    color: "Beige",
    hex: "#C8A97E",
    image: "/imgs/beige.jpg",
  },
];

export function ProductSelection() {
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(selectedProduct);
    toast.success("Added to cart!", {
      description: `${selectedProduct.name} has been added to your cart.`,
    });
  };

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">Choose Your Color</h2>
          <p className="text-lg text-gray-600">
            Available in three elegant colors
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img
              key={selectedProduct.id}
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-full object-cover animate-fade-in"
            />
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-3xl mb-2">{selectedProduct.name}</h3>
              <p className="text-4xl">${selectedProduct.price}</p>
            </div>

            <div>
              <h4 className="text-lg mb-4">Color</h4>
              <div className="flex gap-3">
                {products.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    aria-pressed={selectedProduct.id === product.id}
                    className={`relative flex items-center gap-2 px-5 py-3 border-2 rounded-lg transition-all ${
                      selectedProduct.id === product.id
                        ? "border-black bg-black text-white"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-gray-300 flex-shrink-0"
                      style={{ backgroundColor: product.hex }}
                    />
                    {product.color}
                    {selectedProduct.id === product.id && (
                      <Check className="size-4" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg">Features:</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <Check className="size-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Diameter: 1.8m optimal coverage</span>
                </li>
                <li className="flex items-start">
                  <Check className="size-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Weight: 1.5kg ultra-lightweight</span>
                </li>
                <li className="flex items-start">
                  <Check className="size-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>UPF 50+ UV protection</span>
                </li>
                <li className="flex items-start">
                  <Check className="size-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Water-resistant fabric</span>
                </li>
                <li className="flex items-start">
                  <Check className="size-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Includes pyramid base and travel bag</span>
                </li>
              </ul>
            </div>

            <Button
              size="lg"
              onClick={handleAddToCart}
              className="w-full bg-black text-white hover:bg-gray-800 text-lg py-6"
            >
              Add to Cart - ${selectedProduct.price}
            </Button>

            <div className="text-sm text-gray-500 space-y-1">
              <p>✓ Free shipping</p>
              <p>✓ 30-day money-back guarantee</p>
              <p>✓ 2-year manufacturer warranty</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}