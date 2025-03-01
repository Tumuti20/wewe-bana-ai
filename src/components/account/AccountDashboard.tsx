import React from "react";
import { Link } from "react-router-dom";
import {
  User,
  Package,
  Heart,
  CreditCard,
  MapPin,
  LogOut,
  Settings,
  ChevronRight,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

const AccountDashboard = () => {
  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    joinDate: "January 15, 2023",
  };

  // Mock recent orders
  const recentOrders = [
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
  ];

  // Mock addresses
  const addresses = [
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
  ];

  // Mock payment methods
  const paymentMethods = [
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
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar isLoggedIn={true} userName={user.name} />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Account</h1>
          <p className="text-gray-600 mt-1">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg">{user.name}</h2>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>

                <Separator className="my-4" />

                <nav className="space-y-1">
                  <Link
                    to="/account"
                    className="flex items-center space-x-2 p-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    <User className="h-5 w-5" />
                    <span>Account Overview</span>
                  </Link>
                  <Link
                    to="/account/orders"
                    className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <Package className="h-5 w-5" />
                    <span>Orders</span>
                  </Link>
                  <Link
                    to="/wishlist"
                    className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <Heart className="h-5 w-5" />
                    <span>Wishlist</span>
                  </Link>
                  <Link
                    to="/account/addresses"
                    className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <MapPin className="h-5 w-5" />
                    <span>Addresses</span>
                  </Link>
                  <Link
                    to="/account/payment-methods"
                    className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <CreditCard className="h-5 w-5" />
                    <span>Payment Methods</span>
                  </Link>
                  <Link
                    to="/account/settings"
                    className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <Settings className="h-5 w-5" />
                    <span>Account Settings</span>
                  </Link>
                  <Link
                    to="/logout"
                    className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors text-red-600 hover:text-red-700"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="overview">
              <TabsList className="w-full justify-start border-b mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="addresses">Addresses</TabsTrigger>
                <TabsTrigger value="payment">Payment Methods</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">
                          Personal Information
                        </h3>
                        <div className="bg-gray-50 p-4 rounded">
                          <p className="font-medium">{user.name}</p>
                          <p>{user.email}</p>
                          <p className="text-sm text-gray-500 mt-2">
                            Member since {user.joinDate}
                          </p>
                          <Button
                            variant="link"
                            className="p-0 h-auto mt-2 text-primary"
                            asChild
                          >
                            <Link to="/account/settings">Edit Profile</Link>
                          </Button>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">
                          Default Shipping Address
                        </h3>
                        {addresses.find((addr) => addr.type === "Shipping") ? (
                          <div className="bg-gray-50 p-4 rounded">
                            <p className="font-medium">
                              {
                                addresses.find(
                                  (addr) => addr.type === "Shipping",
                                )?.name
                              }
                            </p>
                            <p>
                              {
                                addresses.find(
                                  (addr) => addr.type === "Shipping",
                                )?.street
                              }
                            </p>
                            <p>
                              {
                                addresses.find(
                                  (addr) => addr.type === "Shipping",
                                )?.city
                              }
                              ,{" "}
                              {
                                addresses.find(
                                  (addr) => addr.type === "Shipping",
                                )?.state
                              }{" "}
                              {
                                addresses.find(
                                  (addr) => addr.type === "Shipping",
                                )?.zip
                              }
                            </p>
                            <p>
                              {
                                addresses.find(
                                  (addr) => addr.type === "Shipping",
                                )?.country
                              }
                            </p>
                            <Button
                              variant="link"
                              className="p-0 h-auto mt-2 text-primary"
                              asChild
                            >
                              <Link to="/account/addresses">
                                Manage Addresses
                              </Link>
                            </Button>
                          </div>
                        ) : (
                          <div className="bg-gray-50 p-4 rounded">
                            <p className="text-gray-500">No address saved</p>
                            <Button
                              variant="link"
                              className="p-0 h-auto mt-2 text-primary"
                              asChild
                            >
                              <Link to="/account/addresses">Add Address</Link>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Recent Orders</CardTitle>
                      <Button variant="outline" size="sm" asChild>
                        <Link to="/account/orders">View All Orders</Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {recentOrders.length > 0 ? (
                      <div className="space-y-4">
                        {recentOrders.map((order) => (
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
                                  className={`px-2 py-1 text-xs rounded-full ${order.status === "Delivered" ? "bg-green-100 text-green-800" : order.status === "Processing" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"}`}
                                >
                                  {order.status}
                                </span>
                                <Button variant="ghost" size="sm" asChild>
                                  <Link to={`/account/orders/${order.id}`}>
                                    <span className="sr-only">
                                      View order {order.id}
                                    </span>
                                    <ChevronRight className="h-5 w-5" />
                                  </Link>
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
                        <p className="text-gray-500 mb-4">
                          You haven't placed any orders yet.
                        </p>
                        <Button asChild>
                          <Link to="/products">Start Shopping</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {recentOrders.length > 0 ? (
                      <div className="space-y-4">
                        {recentOrders.map((order) => (
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
                                  className={`px-2 py-1 text-xs rounded-full ${order.status === "Delivered" ? "bg-green-100 text-green-800" : order.status === "Processing" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"}`}
                                >
                                  {order.status}
                                </span>
                                <Button variant="outline" size="sm" asChild>
                                  <Link to={`/track-order?order=${order.id}`}>
                                    Track Order
                                  </Link>
                                </Button>
                                <Button variant="ghost" size="sm" asChild>
                                  <Link to={`/account/orders/${order.id}`}>
                                    <span className="sr-only">
                                      View order {order.id}
                                    </span>
                                    <ChevronRight className="h-5 w-5" />
                                  </Link>
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
                        <p className="text-gray-500 mb-4">
                          You haven't placed any orders yet.
                        </p>
                        <Button asChild>
                          <Link to="/products">Start Shopping</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="addresses" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Saved Addresses</CardTitle>
                      <Button size="sm">Add New Address</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {addresses.map((address) => (
                        <div
                          key={address.id}
                          className="border rounded-lg p-4 relative hover:border-primary transition-colors"
                        >
                          {address.isDefault && (
                            <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                              Default {address.type}
                            </span>
                          )}
                          <h3 className="font-medium mb-2">
                            {address.type} Address
                          </h3>
                          <p>{address.name}</p>
                          <p>{address.street}</p>
                          <p>
                            {address.city}, {address.state} {address.zip}
                          </p>
                          <p>{address.country}</p>
                          <div className="flex space-x-2 mt-4">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            {!address.isDefault && (
                              <Button variant="outline" size="sm">
                                Set as Default
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payment" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Payment Methods</CardTitle>
                      <Button size="sm">Add Payment Method</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {paymentMethods.map((method) => (
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
                            <CreditCard className="h-5 w-5 mr-2 text-gray-500" />
                            <h3 className="font-medium">
                              {method.cardType} ending in {method.lastFour}
                            </h3>
                          </div>
                          <p className="text-sm text-gray-500">
                            Expires {method.expiry}
                          </p>
                          <div className="flex space-x-2 mt-4">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            {!method.isDefault && (
                              <Button variant="outline" size="sm">
                                Set as Default
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AccountDashboard;
