import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Package,
  CreditCard,
} from "lucide-react";

interface CustomerDetailsProps {
  userId: string;
  onBack: () => void;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({
  userId,
  onBack,
}) => {
  // Mock customer data
  const customer = {
    id: userId,
    name: "John Doe",
    email: "john@example.com",
    phone: "(123) 456-7890",
    joinDate: "January 15, 2023",
    lastLogin: "June 15, 2023",
    totalOrders: 5,
    totalSpent: 789.45,
    addresses: [
      {
        id: "addr-1",
        type: "Shipping",
        name: "John Doe",
        street: "123 Main St, Apt 4B",
        city: "New York",
        state: "NY",
        zip: "10001",
        country: "United States",
        isDefault: true,
      },
      {
        id: "addr-2",
        type: "Billing",
        name: "John Doe",
        street: "456 Park Ave",
        city: "New York",
        state: "NY",
        zip: "10022",
        country: "United States",
        isDefault: true,
      },
    ],
    orders: [
      {
        id: "ORD-123456",
        date: "June 15, 2023",
        total: 379.97,
        status: "Delivered",
        items: 2,
      },
      {
        id: "ORD-789012",
        date: "May 28, 2023",
        total: 149.99,
        status: "Processing",
        items: 1,
      },
      {
        id: "ORD-345678",
        date: "April 10, 2023",
        total: 89.95,
        status: "Delivered",
        items: 3,
      },
    ],
    paymentMethods: [
      {
        id: "pm-1",
        type: "Credit Card",
        cardType: "Visa",
        lastFour: "4242",
        expiry: "05/25",
        isDefault: true,
      },
      {
        id: "pm-2",
        type: "Credit Card",
        cardType: "Mastercard",
        lastFour: "8888",
        expiry: "12/24",
        isDefault: false,
      },
    ],
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
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Customer Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Info */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 flex items-center justify-center text-gray-500 text-2xl font-bold">
                  {customer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h2 className="text-xl font-semibold">{customer.name}</h2>
                <p className="text-gray-500">
                  Customer since {customer.joinDate}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p>{customer.email}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p>{customer.phone}</p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Total Orders
                    </p>
                    <p className="text-xl font-semibold">
                      {customer.totalOrders}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Total Spent
                    </p>
                    <p className="text-xl font-semibold">
                      ${customer.totalSpent.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Last Login
                  </p>
                  <p>{customer.lastLogin}</p>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <Button className="w-full">
                  <Mail className="mr-2 h-4 w-4" /> Email Customer
                </Button>
                <Button variant="outline" className="w-full">
                  Edit Customer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Orders, Addresses, etc. */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="orders">
            <TabsList className="w-full">
              <TabsTrigger value="orders" className="flex-1">
                Orders
              </TabsTrigger>
              <TabsTrigger value="addresses" className="flex-1">
                Addresses
              </TabsTrigger>
              <TabsTrigger value="payment" className="flex-1">
                Payment Methods
              </TabsTrigger>
            </TabsList>

            <TabsContent value="orders" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                </CardHeader>
                <CardContent>
                  {customer.orders.length > 0 ? (
                    <div className="space-y-4">
                      {customer.orders.map((order) => (
                        <div
                          key={order.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="mb-2 sm:mb-0">
                            <p className="font-medium">{order.id}</p>
                            <p className="text-sm text-gray-500">
                              {order.date}
                            </p>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                            <div className="mb-2 sm:mb-0 text-right sm:text-left">
                              <p className="font-medium">
                                ${order.total.toFixed(2)}
                              </p>
                              <p className="text-sm text-gray-500">
                                {order.items} items
                              </p>
                            </div>
                            <div className="flex items-center justify-between sm:justify-end space-x-2">
                              <span
                                className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}
                              >
                                {order.status}
                              </span>
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium mb-2">
                        No orders yet
                      </h3>
                      <p className="text-gray-500">
                        This customer hasn't placed any orders yet.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="addresses" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Saved Addresses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {customer.addresses.map((address) => (
                      <div
                        key={address.id}
                        className="border rounded-lg p-4 relative hover:border-primary transition-colors"
                      >
                        {address.isDefault && (
                          <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                            Default {address.type}
                          </span>
                        )}
                        <div className="flex items-start mb-2">
                          <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                          <div>
                            <h3 className="font-medium">
                              {address.type} Address
                            </h3>
                          </div>
                        </div>
                        <p>{address.name}</p>
                        <p>{address.street}</p>
                        <p>
                          {address.city}, {address.state} {address.zip}
                        </p>
                        <p>{address.country}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payment" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {customer.paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className="border rounded-lg p-4 relative hover:border-primary transition-colors"
                      >
                        {method.isDefault && (
                          <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                            Default
                          </span>
                        )}
                        <div className="flex items-center mb-2">
                          <CreditCard className="h-5 w-5 text-gray-500 mr-2" />
                          <h3 className="font-medium">
                            {method.cardType} ending in {method.lastFour}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-500">
                          Expires {method.expiry}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
