import { useState } from "react";
import { Button } from "./ui/button";
import { ShoppingCart, Mail } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";

interface CTASectionProps {
  onAddToCart?: () => void;
}

export function CTASection({ onAddToCart }: CTASectionProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handlePreOrder = () => {
    if (onAddToCart) {
      onAddToCart();
    }
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setEmail("");
      setSubmitted(false);
    }
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

          <Dialog.Root open={open} onOpenChange={handleOpenChange}>
            <Dialog.Trigger asChild>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-black text-black hover:bg-gray-50 text-lg px-8 py-6"
              >
                <Mail className="mr-2 size-5" />
                Get Updates
              </Button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
              <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
                <Dialog.Title className="text-2xl mb-2">Stay in the loop</Dialog.Title>
                <Dialog.Description className="text-gray-500 mb-6 text-sm">
                  Be the first to know about launch updates, restocks, and exclusive offers.
                </Dialog.Description>

                {submitted ? (
                  <div className="text-center py-6">
                    <p className="text-lg font-medium mb-1">You're on the list!</p>
                    <p className="text-gray-500 text-sm">We'll be in touch when the time comes.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <Button type="submit" className="bg-black text-white hover:bg-gray-800">
                      Notify me
                    </Button>
                  </form>
                )}

                <Dialog.Close className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl leading-none">
                  ✕
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>

        <p className="text-sm text-gray-500 mt-8">
          Free shipping on all pre-orders • 30-day money-back guarantee
        </p>
      </div>
    </section>
  );
}
