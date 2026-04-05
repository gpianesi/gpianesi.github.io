import { useState } from "react";
import { useCart } from "../context/cart-context";
import { CartItem } from "../context/cart-context";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ArrowLeft, CreditCard, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface CheckoutPageProps {
  onBack: () => void;
  onComplete: (orderData: OrderData) => void;
}

export interface OrderData {
  orderId: string;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    address: string;
    city: string;
    zipCode: string;
    country: string;
  };
  items: CartItem[];
  total: number;
  orderDate: string;
}

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

function validate(formData: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!formData.firstName.trim())
    errors.firstName = "First name is required";

  if (!formData.lastName.trim())
    errors.lastName = "Last name is required";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
    errors.email = "Enter a valid email address";

  if (formData.phone.replace(/\D/g, "").length < 7)
    errors.phone = "Enter a valid phone number";

  if (!formData.address.trim())
    errors.address = "Address is required";

  if (!formData.city.trim())
    errors.city = "City is required";

  if (!formData.zipCode.trim())
    errors.zipCode = "ZIP code is required";

  if (!formData.country.trim())
    errors.country = "Country is required";

  if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, "")))
    errors.cardNumber = "Enter a valid 16-digit card number";

  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.cardExpiry))
    errors.cardExpiry = "Enter expiry as MM/YY";

  if (!/^\d{3,4}$/.test(formData.cardCvc))
    errors.cardCvc = "Enter a valid CVC (3–4 digits)";

  return errors;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-sm text-red-600 mt-1">{message}</p>;
}

export function CheckoutPage({ onBack, onComplete }: CheckoutPageProps) {
  const { items, totalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    country: "United States",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formatted = value;

    if (name === "cardNumber") {
      const digits = value.replace(/\D/g, "").slice(0, 16);
      formatted = digits.replace(/(.{4})/g, "$1 ").trim();
    }

    if (name === "cardExpiry") {
      const digits = value.replace(/\D/g, "").slice(0, 4);
      formatted =
        digits.length > 2
          ? `${digits.slice(0, 2)}/${digits.slice(2)}`
          : digits;
    }

    if (name === "cardCvc") {
      formatted = value.replace(/\D/g, "").slice(0, 4);
    }

    setFormData((prev) => ({ ...prev, [name]: formatted }));

    // Clear the error for this field as the user types
    if (formErrors[name as keyof FormData]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validate(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      const firstErrorField = Object.keys(errors)[0];
      document
        .getElementById(firstErrorField)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const orderData: OrderData = {
      orderId: `ORD-${Date.now()}`,
      customerInfo: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
      },
      shippingAddress: {
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode,
        country: formData.country,
      },
      items: items,
      total: totalPrice,
      orderDate: new Date().toISOString(),
    };

    clearCart();
    onComplete(orderData);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-8"
          disabled={isProcessing}
        >
          <ArrowLeft className="mr-2 size-4" />
          Back to Store
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div>
            <h1 className="text-3xl mb-8">Checkout</h1>

            <form onSubmit={handleSubmit} noValidate className="space-y-8">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={
                          formErrors.firstName
                            ? "border-red-500 focus-visible:ring-red-500"
                            : ""
                        }
                      />
                      <FieldError message={formErrors.firstName} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={
                          formErrors.lastName
                            ? "border-red-500 focus-visible:ring-red-500"
                            : ""
                        }
                      />
                      <FieldError message={formErrors.lastName} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={
                        formErrors.email
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }
                    />
                    <FieldError message={formErrors.email} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={
                        formErrors.phone
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }
                    />
                    <FieldError message={formErrors.phone} />
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={
                        formErrors.address
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }
                    />
                    <FieldError message={formErrors.address} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={
                          formErrors.city
                            ? "border-red-500 focus-visible:ring-red-500"
                            : ""
                        }
                      />
                      <FieldError message={formErrors.city} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className={
                          formErrors.zipCode
                            ? "border-red-500 focus-visible:ring-red-500"
                            : ""
                        }
                      />
                      <FieldError message={formErrors.zipCode} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className={
                        formErrors.country
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }
                    />
                    <FieldError message={formErrors.country} />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="mr-2 size-5" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className={
                        formErrors.cardNumber
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }
                    />
                    <FieldError message={formErrors.cardNumber} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardExpiry">Expiry (MM/YY)</Label>
                      <Input
                        id="cardExpiry"
                        name="cardExpiry"
                        placeholder="12/26"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        className={
                          formErrors.cardExpiry
                            ? "border-red-500 focus-visible:ring-red-500"
                            : ""
                        }
                      />
                      <FieldError message={formErrors.cardExpiry} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardCvc">CVC</Label>
                      <Input
                        id="cardCvc"
                        name="cardCvc"
                        placeholder="123"
                        value={formData.cardCvc}
                        onChange={handleInputChange}
                        className={
                          formErrors.cardCvc
                            ? "border-red-500 focus-visible:ring-red-500"
                            : ""
                        }
                      />
                      <FieldError message={formErrors.cardCvc} />
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mt-4">
                    <Lock className="size-4 mr-2" />
                    <span>Your payment information is secure and encrypted</span>
                  </div>
                </CardContent>
              </Card>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-black text-white hover:bg-gray-800 text-lg py-6"
                disabled={isProcessing}
              >
                {isProcessing
                  ? "Processing..."
                  : `Complete Order - $${totalPrice.toFixed(2)}`}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm">{item.name}</h4>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p>${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold border-t pt-2">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
