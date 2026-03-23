import { Button } from "./ui/button";
import { CheckCircle2, Download, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { OrderData } from "./checkout-page";

interface OrderConfirmationProps {
  orderData: OrderData;
  onBackToHome: () => void;
}

export function OrderConfirmation({
  orderData,
  onBackToHome,
}: OrderConfirmationProps) {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
            <CheckCircle2 className="size-10 text-green-600" />
          </div>
          <h1 className="text-4xl mb-4">Order Confirmed!</h1>
          <p className="text-lg text-gray-600">
            Thank you for your purchase. You'll receive a confirmation email
            shortly.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Order Number</p>
              <p className="text-lg font-mono">{orderData.orderId}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Order Date</p>
              <p className="text-lg">
                {new Date(orderData.orderDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            <div className="border-t pt-4">
              <p className="text-sm text-gray-600 mb-3">Ordered Items</p>
              <div className="space-y-3">
                {orderData.items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p>{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${orderData.total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              {orderData.customerInfo.firstName}{" "}
              {orderData.customerInfo.lastName}
            </p>
            <p>{orderData.shippingAddress.address}</p>
            <p>
              {orderData.shippingAddress.city},{" "}
              {orderData.shippingAddress.zipCode}
            </p>
            <p>{orderData.shippingAddress.country}</p>
            <p className="text-sm text-gray-600 mt-4">
              Email: {orderData.customerInfo.email}
            </p>
            <p className="text-sm text-gray-600">
              Phone: {orderData.customerInfo.phone}
            </p>
          </CardContent>
        </Card>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-3">
            <Mail className="size-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">Confirmation Email Sent</h3>
              <p className="text-sm text-gray-700">
                We've sent an order confirmation to{" "}
                <span className="font-semibold">
                  {orderData.customerInfo.email}
                </span>
                . Please check your spam folder if you don't see it.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            size="lg"
            className="flex-1 bg-black text-white hover:bg-gray-800"
            onClick={onBackToHome}
          >
            Back to Home
          </Button>
          <Button size="lg" variant="outline" className="flex-1">
            <Download className="mr-2 size-5" />
            Download Receipt
          </Button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            Your Trabbrella will ship within 2-3 business days.
            <br />
            Estimated delivery: 5-7 business days.
          </p>
        </div>
      </div>
    </main>
  );
}
