import { useState } from "react";
import { CartProvider } from "./context/cart-context";
import { Header } from "./components/header";
import { HeroSection } from "./components/hero-section";
import { FeaturesSection } from "./components/features-section";
import { ProductShowcase } from "./components/product-showcase";
import { ProductSelection } from "./components/product-selection";
import { CTASection } from "./components/cta-section";
import { Footer } from "./components/footer";
import { CheckoutPage, OrderData } from "./components/checkout-page";
import { OrderConfirmation } from "./components/order-confirmation";
import { Toaster } from "./components/ui/sonner";

type Page = "home" | "checkout" | "confirmation";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleCTAClick = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOrderComplete = (data: OrderData) => {
    setOrderData(data);
    navigate("confirmation");
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        {currentPage === "home" && (
          <>
            <Header onCheckout={() => navigate("checkout")} />
            <main>
              <HeroSection onCTAClick={handleCTAClick} />
              <div id="features">
                <FeaturesSection />
              </div>
              <div id="product">
                <ProductShowcase />
              </div>
              <div id="shop">
                <ProductSelection />
              </div>
              <div id="order">
                <CTASection />
              </div>
            </main>
            <Footer />
          </>
        )}

        {currentPage === "checkout" && (
          <CheckoutPage
            onBack={() => navigate("home")}
            onComplete={handleOrderComplete}
          />
        )}

        {currentPage === "confirmation" && orderData && (
          <OrderConfirmation
            orderData={orderData}
            onBackToHome={() => navigate("home")}
          />
        )}

        <Toaster />
      </div>
    </CartProvider>
  );
}
