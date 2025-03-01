import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  Search,
  ArrowLeft,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

interface OrderStatus {
  status: "processing" | "shipped" | "out-for-delivery" | "delivered";
  date: string;
  description: string;
  location?: string;
}

interface OrderDetails {
  id: string;
  date: string;
  total: number;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: string;
  statusHistory: OrderStatus[];
}

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [orderFound, setOrderFound] = useState(true);

  // Mock order data
  const orderDetails: OrderDetails = {
    id: "ORD-123456",
    date: "June 15, 2023",
    total: 379.97,
    items: [
      {
        id: "prod-001",
        name: "Premium Wireless Headphones",
        price: 129.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      },
      {
        id: "prod-002",
        name: "Ergonomic Office Chair",
        price: 249.98,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1505740106531-4243f3831c78?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      },
    ],
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St, Apt 4B",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
    },
    trackingNumber: "TRK9876543210",
    carrier: "FedEx",
    estimatedDelivery: "June 20, 2023",
    statusHistory: [
      {
        status: "processing",
        date: "June 15, 2023 - 10:30 AM",
        description: "Order confirmed and payment received",
      },
      {
        status: "shipped",
        date: "June 16, 2023 - 2:15 PM",
        description: "Package has been shipped",
        location: "Warehouse, Los Angeles, CA",
      },
      {
        status: "out-for-delivery",
        date: "June 19, 2023 - 8:45 AM",
        description: "Package is out for delivery",
        location: "Distribution Center, New York, NY",
      },
    ],
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);

    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      setOrderFound(orderNumber === "ORD-123456" || orderNumber === "123456");
    }, 1000);
  };

  const getStatusIcon = (status: OrderStatus["status"]) => {
    switch (status) {
      case "processing":
        return <Clock className="h-6 w-6 text-blue-500" />;
      case "shipped":
        return <Package className="h-6 w-6 text-orange-500" />;
      case "out-for-delivery":
        return <Truck className="h-6 w-6 text-purple-500" />;
      case "delivered":
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      default:
        return <Clock className="h-6 w-6 text-gray-500" />;
    }
  };

  const getCurrentStatus = () => {
    const lastStatus =
      orderDetails.statusHistory[orderDetails.statusHistory.length - 1];
    return lastStatus.status;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Track Your Order</h1>
          <p className="text-gray-600 mt-1">
            Enter your order details to track the status of your shipment
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Search Form */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="orderNumber">Order Number</Label>
                    <Input
                      id="orderNumber"
                      placeholder="e.g. ORD-123456"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address (optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSearching}
                  >
                    {isSearching ? "Searching..." : "Track Order"}
                    {!isSearching && <Search className="ml-2 h-4 w-4" />}
                  </Button>
                </form>

                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-500 uppercase">
                    Need Help?
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    If you need assistance with tracking your order, please
                    contact our customer support team at support@example.com or
                    call us at (123) 456-7890.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Details */}
          <div className="lg:col-span-2">
            {!orderFound ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="h-8 w-8 text-red-500" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">
                    Order Not Found
                  </h2>
                  <p className="text-gray-600 mb-6">
                    We couldn't find an order with the number "{orderNumber}".
                    Please check the order number and try again.
                  </p>
                  <p className="text-gray-600 mb-6">
                    If you continue to experience issues, please contact our
                    customer support team.
                  </p>
                </CardContent>
              </Card>
            ) : orderNumber ? (
              <div className="space-y-6">
                {/* Order Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">
                          ORDER NUMBER
                        </h3>
                        <p className="font-medium">{orderDetails.id}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">
                          ORDER DATE
                        </h3>
                        <p>{orderDetails.date}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">
                          SHIPPING ADDRESS
                        </h3>
                        <p>{orderDetails.shippingAddress.name}</p>
                        <p>{orderDetails.shippingAddress.street}</p>
                        <p>
                          {orderDetails.shippingAddress.city},{" "}
                          {orderDetails.shippingAddress.state}{" "}
                          {orderDetails.shippingAddress.zip}
                        </p>
                        <p>{orderDetails.shippingAddress.country}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">
                          SHIPPING METHOD
                        </h3>
                        <p>{orderDetails.carrier}</p>
                        <p className="text-sm text-gray-600">
                          Tracking: {orderDetails.trackingNumber}
                        </p>
                        <p className="text-sm text-gray-600">
                          Estimated Delivery: {orderDetails.estimatedDelivery}
                        </p>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    <div className="space-y-4">
                      <h3 className="font-medium">Items in Order</h3>
                      {orderDetails.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center space-x-4"
                        >
                          <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-gray-500">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Tracking Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tracking Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <div className="flex items-center space-x-2 mb-2">
                        {getStatusIcon(getCurrentStatus())}
                        <h3 className="text-lg font-medium capitalize">
                          {getCurrentStatus().replace(/-/g, " ")}
                        </h3>
                      </div>
                      <p className="text-gray-600">
                        {getCurrentStatus() === "out-for-delivery"
                          ? "Your package is out for delivery and should arrive today."
                          : getCurrentStatus() === "shipped"
                            ? "Your package has been shipped and is on its way."
                            : "Your order is being processed and will be shipped soon."}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative mb-8">
                      <div className="flex justify-between mb-2">
                        <div className="text-center">
                          <div
                            className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center ${getCurrentStatus() === "processing" || getCurrentStatus() === "shipped" || getCurrentStatus() === "out-for-delivery" || getCurrentStatus() === "delivered" ? "bg-primary text-white" : "bg-gray-200"}`}
                          >
                            <Clock className="h-3 w-3" />
                          </div>
                          <p className="text-xs mt-1">Processing</p>
                        </div>
                        <div className="text-center">
                          <div
                            className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center ${getCurrentStatus() === "shipped" || getCurrentStatus() === "out-for-delivery" || getCurrentStatus() === "delivered" ? "bg-primary text-white" : "bg-gray-200"}`}
                          >
                            <Package className="h-3 w-3" />
                          </div>
                          <p className="text-xs mt-1">Shipped</p>
                        </div>
                        <div className="text-center">
                          <div
                            className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center ${getCurrentStatus() === "out-for-delivery" || getCurrentStatus() === "delivered" ? "bg-primary text-white" : "bg-gray-200"}`}
                          >
                            <Truck className="h-3 w-3" />
                          </div>
                          <p className="text-xs mt-1">Out for Delivery</p>
                        </div>
                        <div className="text-center">
                          <div
                            className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center ${getCurrentStatus() === "delivered" ? "bg-primary text-white" : "bg-gray-200"}`}
                          >
                            <CheckCircle className="h-3 w-3" />
                          </div>
                          <p className="text-xs mt-1">Delivered</p>
                        </div>
                      </div>
                      <div className="h-1 w-full bg-gray-200 absolute top-3 -z-10">
                        <div
                          className="h-full bg-primary"
                          style={{
                            width:
                              getCurrentStatus() === "processing"
                                ? "0%"
                                : getCurrentStatus() === "shipped"
                                  ? "33%"
                                  : getCurrentStatus() === "out-for-delivery"
                                    ? "66%"
                                    : "100%",
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Status Timeline */}
                    <div className="space-y-6">
                      <h3 className="font-medium">Status Updates</h3>
                      <div className="space-y-4">
                        {orderDetails.statusHistory.map((status, index) => (
                          <div key={index} className="flex">
                            <div className="mr-4">
                              {getStatusIcon(status.status)}
                            </div>
                            <div>
                              <h4 className="font-medium capitalize">
                                {status.status.replace(/-/g, " ")}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {status.date}
                              </p>
                              <p className="text-sm">{status.description}</p>
                              {status.location && (
                                <p className="text-sm text-gray-500">
                                  {status.location}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link to="/">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Home
                    </Link>
                  </Button>
                  <Button asChild>
                    <a
                      href={`https://www.fedex.com/tracking?tracknumbers=${orderDetails.trackingNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on {orderDetails.carrier} Website
                    </a>
                  </Button>
                </div>
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="h-8 w-8 text-gray-500" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">
                    Track Your Shipment
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Enter your order number to see the current status and
                    estimated delivery date of your package.
                  </p>
                  <p className="text-gray-600">
                    For a quick test, try using order number:{" "}
                    <span className="font-medium">ORD-123456</span>
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TrackOrder;
