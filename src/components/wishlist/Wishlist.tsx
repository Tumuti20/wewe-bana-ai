import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Trash2, ShoppingCart, AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
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
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
  discount?: number;
}

const Wishlist = () => {
  // Mock wishlist items
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: "prod-001",
      name: "Premium Wireless Headphones",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      inStock: true,
      discount: 15,
    },
    {
      id: "prod-003",
      name: "Smart Fitness Watch",
      price: 199.99,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      inStock: true,
      discount: 10,
    },
    {
      id: "prod-007",
      name: "Leather Wallet",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      inStock: false,
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const removeItem = (id: string) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    setIsDialogOpen(false);
  };

  const handleAddToCart = (id: string) => {
    console.log(`Added product ${id} to cart`);
    // In a real app, this would dispatch to a cart state or API
  };

  const calculateDiscountedPrice = (price: number, discount?: number) => {
    if (!discount) return price;
    return price * (1 - discount / 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <p className="text-gray-600 mt-1">
            {wishlistItems.length === 0
              ? "Your wishlist is empty"
              : `You have ${wishlistItems.length} item(s) in your wishlist`}
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <Heart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Items added to your wishlist will be saved here
            </p>
            <Button asChild>
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Wishlist Items */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Wishlist Items</h2>
                    <AlertDialog
                      open={isDialogOpen}
                      onOpenChange={setIsDialogOpen}
                    >
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                        >
                          Clear Wishlist
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Clear Wishlist</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to remove all items from your
                            wishlist? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={clearWishlist}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            Clear Wishlist
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>

                  <div className="space-y-6">
                    {wishlistItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col sm:flex-row gap-4 py-4 border-b last:border-b-0"
                      >
                        <div className="w-full sm:w-32 h-32 bg-gray-100 rounded overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <h3 className="font-semibold text-lg">
                              <Link
                                to={`/product/${item.id}`}
                                className="hover:text-primary transition-colors"
                              >
                                {item.name}
                              </Link>
                            </h3>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-gray-500 hover:text-red-500"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </div>

                          <div className="flex items-center mt-2">
                            {item.discount ? (
                              <div className="flex items-center">
                                <span className="text-gray-500 line-through mr-2">
                                  ${item.price.toFixed(2)}
                                </span>
                                <span className="font-semibold">
                                  $
                                  {calculateDiscountedPrice(
                                    item.price,
                                    item.discount,
                                  ).toFixed(2)}
                                </span>
                                <span className="ml-2 bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-medium">
                                  {item.discount}% OFF
                                </span>
                              </div>
                            ) : (
                              <span className="font-semibold">
                                ${item.price.toFixed(2)}
                              </span>
                            )}
                          </div>

                          {!item.inStock && (
                            <div className="flex items-center mt-2 text-red-600">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              <span className="text-sm">Out of stock</span>
                            </div>
                          )}

                          <div className="mt-4">
                            <Button
                              onClick={() => handleAddToCart(item.id)}
                              disabled={!item.inStock}
                              className="w-full sm:w-auto"
                            >
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Summary */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Summary</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Items</span>
                      <span>{wishlistItems.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">In Stock</span>
                      <span>
                        {wishlistItems.filter((item) => item.inStock).length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Out of Stock</span>
                      <span>
                        {wishlistItems.filter((item) => !item.inStock).length}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total Value</span>
                      <span>
                        $
                        {wishlistItems
                          .reduce(
                            (total, item) =>
                              total +
                              calculateDiscountedPrice(
                                item.price,
                                item.discount,
                              ),
                            0,
                          )
                          .toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <Button
                      className="w-full"
                      onClick={() => {
                        wishlistItems
                          .filter((item) => item.inStock)
                          .forEach((item) => handleAddToCart(item.id));
                      }}
                      disabled={!wishlistItems.some((item) => item.inStock)}
                    >
                      Add All to Cart
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/products">Continue Shopping</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Wishlist;
