import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingBag,
  DollarSign,
  BarChart3,
  Settings,
  LogOut,
  Plus,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [deleteType, setDeleteType] = useState<"product" | "user" | "order">(
    "product",
  );

  // Check if user is admin, if not redirect to home
  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate("/");
    }
  }, [user, navigate]);

  // Mock data for dashboard
  const dashboardStats = {
    totalSales: 15789.45,
    totalOrders: 124,
    totalCustomers: 87,
    totalProducts: 56,
    recentOrders: [
      {
        id: "ORD-123456",
        customer: "John Doe",
        date: "2023-06-15",
        total: 379.97,
        status: "Delivered",
      },
      {
        id: "ORD-789012",
        customer: "Sarah Johnson",
        date: "2023-06-14",
        total: 149.99,
        status: "Processing",
      },
      {
        id: "ORD-345678",
        customer: "Michael Chen",
        date: "2023-06-13",
        total: 89.95,
        status: "Shipped",
      },
      {
        id: "ORD-901234",
        customer: "Emily Rodriguez",
        date: "2023-06-12",
        total: 215.5,
        status: "Delivered",
      },
      {
        id: "ORD-567890",
        customer: "David Wilson",
        date: "2023-06-11",
        total: 67.25,
        status: "Processing",
      },
    ],
    salesByDate: [
      { date: "2023-06-10", amount: 1245.67 },
      { date: "2023-06-11", amount: 1567.89 },
      { date: "2023-06-12", amount: 1789.23 },
      { date: "2023-06-13", amount: 1432.56 },
      { date: "2023-06-14", amount: 1876.45 },
      { date: "2023-06-15", amount: 2134.78 },
      { date: "2023-06-16", amount: 1987.34 },
    ],
  };

  // Mock products data
  const products = [
    {
      id: "prod-001",
      name: "Premium Wireless Headphones",
      price: 129.99,
      category: "Electronics",
      stock: 10,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: "prod-002",
      name: "Ergonomic Office Chair",
      price: 249.99,
      category: "Furniture",
      stock: 7,
      image:
        "https://images.unsplash.com/photo-1505740106531-4243f3831c78?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: "prod-003",
      name: "Smart Fitness Watch",
      price: 199.99,
      category: "Electronics",
      stock: 5,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: "prod-004",
      name: "Organic Cotton T-Shirt",
      price: 34.99,
      category: "Clothing",
      stock: 20,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: "prod-005",
      name: "Stainless Steel Water Bottle",
      price: 24.99,
      category: "Accessories",
      stock: 15,
      image:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
  ];

  // Mock users data
  const users = [
    {
      id: "user-001",
      name: "John Doe",
      email: "john@example.com",
      role: "Customer",
      joinDate: "2023-01-15",
      orders: 5,
    },
    {
      id: "user-002",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "Customer",
      joinDate: "2023-02-20",
      orders: 3,
    },
    {
      id: "user-003",
      name: "Michael Chen",
      email: "michael@example.com",
      role: "Customer",
      joinDate: "2023-03-10",
      orders: 2,
    },
    {
      id: "user-004",
      name: "Emily Rodriguez",
      email: "emily@example.com",
      role: "Customer",
      joinDate: "2023-04-05",
      orders: 7,
    },
    {
      id: "user-005",
      name: "Admin User",
      email: "admin@example.com",
      role: "Admin",
      joinDate: "2023-01-01",
      orders: 0,
    },
  ];

  // Mock orders data
  const orders = [
    {
      id: "ORD-123456",
      customer: "John Doe",
      email: "john@example.com",
      date: "2023-06-15",
      total: 379.97,
      status: "Delivered",
      items: 2,
      paymentMethod: "Credit Card",
    },
    {
      id: "ORD-789012",
      customer: "Sarah Johnson",
      email: "sarah@example.com",
      date: "2023-06-14",
      total: 149.99,
      status: "Processing",
      items: 1,
      paymentMethod: "PayPal",
    },
    {
      id: "ORD-345678",
      customer: "Michael Chen",
      email: "michael@example.com",
      date: "2023-06-13",
      total: 89.95,
      status: "Shipped",
      items: 3,
      paymentMethod: "Credit Card",
    },
    {
      id: "ORD-901234",
      customer: "Emily Rodriguez",
      email: "emily@example.com",
      date: "2023-06-12",
      total: 215.5,
      status: "Delivered",
      items: 2,
      paymentMethod: "M-Pesa",
    },
    {
      id: "ORD-567890",
      customer: "David Wilson",
      email: "david@example.com",
      date: "2023-06-11",
      total: 67.25,
      status: "Processing",
      items: 1,
      paymentMethod: "Credit Card",
    },
  ];

  const handleDeleteClick = (
    id: string,
    type: "product" | "user" | "order",
  ) => {
    setItemToDelete(id);
    setDeleteType(type);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    // In a real app, this would call an API to delete the item
    console.log(`Deleting ${deleteType} with ID: ${itemToDelete}`);
    setIsDeleteDialogOpen(false);
    setItemToDelete(null);
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
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Admin Dashboard</h2>
        </div>
        <nav className="p-4 space-y-2">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center space-x-2 p-2 rounded-md ${activeTab === "dashboard" ? "bg-primary text-primary-foreground" : "hover:bg-gray-100"}`}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`w-full flex items-center space-x-2 p-2 rounded-md ${activeTab === "products" ? "bg-primary text-primary-foreground" : "hover:bg-gray-100"}`}
          >
            <ShoppingBag className="h-5 w-5" />
            <span>Products</span>
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full flex items-center space-x-2 p-2 rounded-md ${activeTab === "orders" ? "bg-primary text-primary-foreground" : "hover:bg-gray-100"}`}
          >
            <Package className="h-5 w-5" />
            <span>Orders</span>
          </button>
          <button
            onClick={() => setActiveTab("customers")}
            className={`w-full flex items-center space-x-2 p-2 rounded-md ${activeTab === "customers" ? "bg-primary text-primary-foreground" : "hover:bg-gray-100"}`}
          >
            <Users className="h-5 w-5" />
            <span>Customers</span>
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`w-full flex items-center space-x-2 p-2 rounded-md ${activeTab === "analytics" ? "bg-primary text-primary-foreground" : "hover:bg-gray-100"}`}
          >
            <BarChart3 className="h-5 w-5" />
            <span>Analytics</span>
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center space-x-2 p-2 rounded-md ${activeTab === "settings" ? "bg-primary text-primary-foreground" : "hover:bg-gray-100"}`}
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </button>
          <Separator className="my-4" />
          <button
            onClick={logout}
            className="w-full flex items-center space-x-2 p-2 rounded-md text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Dashboard Overview</h1>
              <div className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleDateString()}
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Total Sales
                      </p>
                      <h3 className="text-2xl font-bold">
                        ${dashboardStats.totalSales.toLocaleString()}
                      </h3>
                    </div>
                    <div className="p-3 bg-green-100 rounded-full">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Total Orders
                      </p>
                      <h3 className="text-2xl font-bold">
                        {dashboardStats.totalOrders}
                      </h3>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-full">
                      <Package className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Total Customers
                      </p>
                      <h3 className="text-2xl font-bold">
                        {dashboardStats.totalCustomers}
                      </h3>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-full">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Total Products
                      </p>
                      <h3 className="text-2xl font-bold">
                        {dashboardStats.totalProducts}
                      </h3>
                    </div>
                    <div className="p-3 bg-orange-100 rounded-full">
                      <ShoppingBag className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dashboardStats.recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">
                          {order.id}
                        </TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>${order.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}
                          >
                            {order.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setActiveTab("orders")}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Sales Chart (placeholder) */}
            <Card>
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">
                      Sales chart would be displayed here
                    </p>
                    <p className="text-sm text-gray-400">
                      Last 7 days: $
                      {dashboardStats.salesByDate
                        .reduce((sum, day) => sum + day.amount, 0)
                        .toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Products */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Products Management</h1>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Product
              </Button>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input placeholder="Search products..." className="pl-10" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" /> Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>All Products</DropdownMenuItem>
                  <DropdownMenuItem>In Stock</DropdownMenuItem>
                  <DropdownMenuItem>Out of Stock</DropdownMenuItem>
                  <DropdownMenuItem>On Sale</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <ChevronDown className="mr-2 h-4 w-4" /> Sort
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Name (A-Z)</DropdownMenuItem>
                  <DropdownMenuItem>Name (Z-A)</DropdownMenuItem>
                  <DropdownMenuItem>Price (Low to High)</DropdownMenuItem>
                  <DropdownMenuItem>Price (High to Low)</DropdownMenuItem>
                  <DropdownMenuItem>Stock (Low to High)</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Products Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="w-12 h-12 rounded overflow-hidden bg-gray-100">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {product.name}
                        </TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${product.stock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                          >
                            {product.stock > 0
                              ? `${product.stock} in stock`
                              : "Out of stock"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() =>
                                handleDeleteClick(product.id, "product")
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Orders */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Orders Management</h1>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" /> Filter Orders
              </Button>
            </div>

            {/* Orders Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">
                          {order.id}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p>{order.customer}</p>
                            <p className="text-sm text-gray-500">
                              {order.email}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>${order.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}
                          >
                            {order.status}
                          </span>
                        </TableCell>
                        <TableCell>{order.paymentMethod}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() =>
                                handleDeleteClick(order.id, "order")
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Customers */}
        {activeTab === "customers" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Customer Management</h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search customers..."
                  className="pl-10 w-64"
                />
              </div>
            </div>

            {/* Customers Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          {user.name}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${user.role === "Admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"}`}
                          >
                            {user.role}
                          </span>
                        </TableCell>
                        <TableCell>{user.joinDate}</TableCell>
                        <TableCell>{user.orders}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleDeleteClick(user.id, "user")}
                              disabled={user.role === "Admin"} // Prevent deleting admin users
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Analytics */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">Analytics & Reports</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sales Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Sales Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-500">
                        Sales chart would be displayed here
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Revenue by Category */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-500">
                        Category chart would be displayed here
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Products */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Selling Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {products.slice(0, 3).map((product, index) => (
                      <div
                        key={product.id}
                        className="flex items-center space-x-4"
                      >
                        <div className="font-bold text-lg text-gray-500">
                          {index + 1}
                        </div>
                        <div className="w-12 h-12 rounded overflow-hidden bg-gray-100">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium">{product.name}</h4>
                          <p className="text-sm text-gray-500">
                            {product.category}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            ${product.price.toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500">
                            {Math.floor(Math.random() * 100)} sold
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Customer Acquisition */}
              <Card>
                <CardHeader>
                  <CardTitle>Customer Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md">
                    <div className="text-center">
                      <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-500">
                        Customer growth chart would be displayed here
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Settings */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">Admin Settings</h1>

            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="adminName">Admin Name</Label>
                      <Input id="adminName" defaultValue="Admin User" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="adminEmail">Email Address</Label>
                      <Input id="adminEmail" defaultValue="admin@example.com" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">
                        Confirm New Password
                      </Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                  </div>

                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Store Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="storeName">Store Name</Label>
                      <Input
                        id="storeName"
                        defaultValue="My E-Commerce Store"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="storeEmail">Store Email</Label>
                      <Input
                        id="storeEmail"
                        defaultValue="contact@mystore.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="storeDescription">Store Description</Label>
                    <Textarea
                      id="storeDescription"
                      defaultValue="Your one-stop shop for all your needs."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select defaultValue="usd">
                        <SelectTrigger id="currency">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usd">USD ($)</SelectItem>
                          <SelectItem value="eur">EUR (€)</SelectItem>
                          <SelectItem value="gbp">GBP (£)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue="utc">
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="utc">UTC</SelectItem>
                          <SelectItem value="est">Eastern Time (ET)</SelectItem>
                          <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button>Save Store Settings</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the {deleteType}. This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDashboard;
