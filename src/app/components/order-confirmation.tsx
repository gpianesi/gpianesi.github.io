import jsPDF from "jspdf";
import { Button } from "./ui/button";
import { CheckCircle2, Download, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { OrderData } from "./checkout-page";

interface OrderConfirmationProps {
  orderData: OrderData;
  onBackToHome: () => void;
}

function handleDownloadReceipt(orderData: OrderData) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const rightEdge = pageWidth - margin;
  let y = 22;

  const line = (yPos: number) => {
    doc.setDrawColor(220, 220, 220);
    doc.line(margin, yPos, rightEdge, yPos);
  };

  const orderDate = new Date(orderData.orderDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // ── Header ──────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.setTextColor(3, 2, 19);
  doc.text("TRABBRELLA", pageWidth / 2, y, { align: "center" });

  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(110, 110, 110);
  doc.text("Travel Beach Umbrella", pageWidth / 2, y, { align: "center" });

  y += 9;
  line(y);
  y += 8;

  // ── Receipt title ────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(3, 2, 19);
  doc.text("ORDER RECEIPT", pageWidth / 2, y, { align: "center" });

  y += 10;

  // ── Order meta ───────────────────────────────────────
  const labelX = margin;
  const valueX = margin + 38;

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(80, 80, 80);
  doc.text("Order Number:", labelX, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(30, 30, 30);
  doc.text(orderData.orderId, valueX, y);

  y += 6;
  doc.setFont("helvetica", "bold");
  doc.setTextColor(80, 80, 80);
  doc.text("Order Date:", labelX, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(30, 30, 30);
  doc.text(orderDate, valueX, y);

  y += 10;
  line(y);
  y += 8;

  // ── Items table header ───────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(3, 2, 19);
  doc.text("ITEMS", margin, y);

  y += 3;
  line(y);
  y += 6;

  doc.setFontSize(9);
  doc.setTextColor(130, 130, 130);
  doc.text("Product", margin, y);
  doc.text("Qty", margin + 110, y, { align: "right" });
  doc.text("Amount", rightEdge, y, { align: "right" });

  y += 4;
  line(y);
  y += 6;

  // ── Items rows ───────────────────────────────────────
  doc.setTextColor(30, 30, 30);
  for (const item of orderData.items) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(item.name, margin, y);
    doc.text(String(item.quantity), margin + 110, y, { align: "right" });
    doc.text(
      `$${(item.price * item.quantity).toFixed(2)}`,
      rightEdge,
      y,
      { align: "right" }
    );
    y += 7;
  }

  y += 2;
  line(y);
  y += 6;

  // ── Shipping row ─────────────────────────────────────
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text("Shipping", margin, y);
  doc.setTextColor(22, 163, 74); // green-600
  doc.text("FREE", rightEdge, y, { align: "right" });

  y += 10;

  // ── Total box ────────────────────────────────────────
  doc.setFillColor(245, 245, 247);
  doc.roundedRect(margin, y - 5, rightEdge - margin, 13, 2, 2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(3, 2, 19);
  doc.text("TOTAL", margin + 5, y + 4);
  doc.text(`$${orderData.total.toFixed(2)}`, rightEdge - 5, y + 4, {
    align: "right",
  });

  y += 22;
  line(y);
  y += 8;

  // ── Shipping address ─────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(3, 2, 19);
  doc.text("SHIPPING TO", margin, y);

  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(50, 50, 50);

  const addressLines = [
    `${orderData.customerInfo.firstName} ${orderData.customerInfo.lastName}`,
    orderData.shippingAddress.address,
    `${orderData.shippingAddress.city}, ${orderData.shippingAddress.zipCode}`,
    orderData.shippingAddress.country,
  ];
  for (const l of addressLines) {
    doc.text(l, margin, y);
    y += 5.5;
  }

  y += 2;
  doc.setTextColor(100, 100, 100);
  doc.text(`Email: ${orderData.customerInfo.email}`, margin, y);
  y += 5.5;
  doc.text(`Phone: ${orderData.customerInfo.phone}`, margin, y);

  y += 12;
  line(y);
  y += 8;

  // ── Footer ───────────────────────────────────────────
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  doc.setTextColor(130, 130, 130);
  doc.text(
    "Your Trabbrella will ship within 2–3 business days. Estimated delivery: 5–7 business days.",
    pageWidth / 2,
    y,
    { align: "center" }
  );
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(3, 2, 19);
  doc.text("Thank you for your purchase!", pageWidth / 2, y, {
    align: "center",
  });

  doc.save(`trabbrella-receipt-${orderData.orderId}.pdf`);
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
          <Button
            size="lg"
            variant="outline"
            className="flex-1"
            onClick={() => handleDownloadReceipt(orderData)}
          >
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
