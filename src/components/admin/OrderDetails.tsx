import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Package, Truck, CheckCircle, Clock, ArrowLeft } from "lucide-react";

interface OrderDetailsProps {
  orderId: string;
  onBack: () => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ orderId, onBack }) => {
  // Mock order data
  const orderDetails = {
    id: orderId,
    customer: "John Doe",
    email: "john@example.com",
    phone: "(123) 456-7890",
    date: "June 15, 2023",
    total: 379.97,
    subtotal: 349.97,
    tax: 30.0,
    shipping: 0,
    status: "Shipped",
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    items: [
      {
        id: "prod-001",
        name: "Premium Wireless Headphones",
        price: 129.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      },
      {
        id: "prod-002",
        name: "Ergonomic Office Chair",
        price: 249.98,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1505740106531-4243f3831c78?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
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
    billingAddress: {
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
        status: "Processing",
        date: "June 15, 2023 - 10:30 AM",
        description: "Order confirmed and payment received",
      },
      {
        status: "Shipped",
        date: "June 16, 2023 - 2:15 PM",
        description: "Package has been shipped",
        location: "Warehouse, Los Angeles, CA",
      },
    ],
  };

  const [currentStatus, setCurrentStatus] = useState(orderDetails.status);
  const [trackingNumber, setTrackingNumber] = useState(
    orderDetails.trackingNumber || "",
  );
  const [carrier, setCarrier] = useState(orderDetails.carrier || "");

  const handleStatusUpdate = () => {
    // In a real app, this would call an API to update the order status
    console.log("Updating order status to:", currentStatus);
    console.log("Tracking info:", { trackingNumber, carrier });
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "processing":
        return <Clock className="h-6 w-6 text-blue-500" />;
      case "shipped":
        return <Package className="h-6 w-6 text-orange-500" />;
      case "out for delivery":
      case "out-for-delivery":
        return <Truck className="h-6 w-6 text-purple-500" />;
      case "delivered":
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      default:
        return <Clock className="h-6 w-6 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "out for delivery":
      case "out-for-delivery":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Order Details</h1>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className={`px-3 py-1 rounded-full text-sm ${getStatusColor(orderDetails.status)}`}
          >
            {orderDetails.status}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-sm ${orderDetails.paymentStatus === "Paid" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
          >
            {orderDetails.paymentStatus}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Summary */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    ORDER ID
                  </h3>
                  <p className="font-medium">{orderDetails.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    DATE PLACED
                  </h3>
                  <p>{orderDetails.date}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    CUSTOMER
                  </h3>
                  <p>{orderDetails.customer}</p>
                  <p className="text-sm text-gray-500">{orderDetails.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">CONTACT</h3>
                  <p>{orderDetails.phone}</p>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    SHIPPING ADDRESS
                  </h3>
                  <div className="bg-gray-50 p-3 rounded">
                    <p>{orderDetails.shippingAddress.name}</p>
                    <p>{orderDetails.shippingAddress.street}</p>
                    <p>
                      {orderDetails.shippingAddress.city},{" "}
                      {orderDetails.shippingAddress.state}{" "}
                      {orderDetails.shippingAddress.zip}
                    </p>
                    <p>{orderDetails.shippingAddress.country}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    BILLING ADDRESS
                  </h3>
                  <div className="bg-gray-50 p-3 rounded">
                    <p>{orderDetails.billingAddress.name}</p>
                    <p>{orderDetails.billingAddress.street}</p>
                    <p>
                      {orderDetails.billingAddress.city},{" "}
                      {orderDetails.billingAddress.state}{" "}
                      {orderDetails.billingAddress.zip}
                    </p>
                    <p>{orderDetails.billingAddress.country}</p>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-4">
                  ORDER ITEMS
                </h3>
                <div className="space-y-4">
                  {orderDetails.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
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
                        <p className="font-medium">${item.price.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderDetails.statusHistory.map((status, index) => (
                  <div key={index} className="flex">
                    <div className="mr-4">{getStatusIcon(status.status)}</div>
                    <div>
                      <h4 className="font-medium">{status.status}</h4>
                      <p className="text-sm text-gray-600">{status.date}</p>
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
            </CardContent>
          </Card>
        </div>

        {/* Order Actions and Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Update Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={currentStatus}
                    onValueChange={setCurrentStatus}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Processing">Processing</SelectItem>
                      <SelectItem value="Shipped">Shipped</SelectItem>
                      <SelectItem value="Out for Delivery">
                        Out for Delivery
                      </SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="carrier">Shipping Carrier</Label>
                  <Select value={carrier} onValueChange={setCarrier}>
                    <SelectTrigger id="carrier">
                      <SelectValue placeholder="Select carrier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FedEx">FedEx</SelectItem>
                      <SelectItem value="UPS">UPS</SelectItem>
                      <SelectItem value="USPS">USPS</SelectItem>
                      <SelectItem value="DHL">DHL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tracking">Tracking Number</Label>
                  <Input
                    id="tracking"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Enter tracking number"
                  />
                </div>

                <Button className="w-full" onClick={handleStatusUpdate}>
                  Update Status
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${orderDetails.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>
                    {orderDetails.shipping === 0
                      ? "Free"
                      : `$${orderDetails.shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${orderDetails.tax.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${orderDetails.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Payment Method</span>
                  <span>{orderDetails.paymentMethod}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex space-x-4">
            <Button variant="outline" className="flex-1">
              Print Invoice
            </Button>
            <Button variant="outline" className="flex-1">
              Email Customer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
