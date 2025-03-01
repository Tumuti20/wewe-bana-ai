import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X, Heart } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "../ui/sheet";
import { Badge } from "../ui/badge";

interface NavbarProps {
  cartItemCount?: number;
  categories?: Array<{ id: string; name: string }>;
  isLoggedIn?: boolean;
  onSearch?: (query: string) => void;
  userName?: string;
}

const Navbar = ({
  cartItemCount = 3,
  categories = [
    { id: "cat1", name: "Electronics" },
    { id: "cat2", name: "Clothing" },
    { id: "cat3", name: "Home & Kitchen" },
    { id: "cat4", name: "Books" },
    { id: "cat5", name: "Beauty" },
  ],
  isLoggedIn = false,
  onSearch = () => {},
  userName = "Guest",
}: NavbarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <nav className="sticky top-0 z-50 w-full h-20 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-primary">ShopEase</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {categories.slice(0, 5).map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </div>

        {/* Search Bar */}
        <div className="hidden md:block flex-grow max-w-md mx-4">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Search products..."
              className="w-full pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full"
            >
              <Search className="h-5 w-5" />
            </Button>
          </form>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4">
          {/* Wishlist - Desktop */}
          <Link to="/wishlist" className="hidden md:flex items-center">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge
                  className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-primary text-white rounded-full"
                  variant="default"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </Link>

          {/* User Account */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {isLoggedIn ? (
                <>
                  <div className="px-2 py-1.5 text-sm font-medium">
                    Welcome, {userName}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/account" className="w-full cursor-pointer">
                      My Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders" className="w-full cursor-pointer">
                      My Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/wishlist" className="w-full cursor-pointer">
                      Wishlist
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/logout" className="w-full cursor-pointer">
                      Logout
                    </Link>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/login" className="w-full cursor-pointer">
                      Login
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/register" className="w-full cursor-pointer">
                      Register
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
                <SheetClose className="absolute right-4 top-4">
                  <X className="h-5 w-5" />
                </SheetClose>
              </SheetHeader>
              <div className="py-6">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="relative mb-6">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pr-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                </form>

                {/* Mobile Categories */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-500 uppercase">
                    Categories
                  </h3>
                  <div className="flex flex-col space-y-2">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        to={`/category/${category.id}`}
                        className="text-gray-600 hover:text-primary transition-colors py-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Mobile Account Links */}
                <div className="mt-6 space-y-4">
                  <h3 className="text-sm font-medium text-gray-500 uppercase">
                    Account
                  </h3>
                  <div className="flex flex-col space-y-2">
                    {isLoggedIn ? (
                      <>
                        <Link
                          to="/account"
                          className="text-gray-600 hover:text-primary transition-colors py-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          My Account
                        </Link>
                        <Link
                          to="/orders"
                          className="text-gray-600 hover:text-primary transition-colors py-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          My Orders
                        </Link>
                        <Link
                          to="/wishlist"
                          className="text-gray-600 hover:text-primary transition-colors py-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Wishlist
                        </Link>
                        <Link
                          to="/logout"
                          className="text-gray-600 hover:text-primary transition-colors py-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Logout
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="text-gray-600 hover:text-primary transition-colors py-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Login
                        </Link>
                        <Link
                          to="/register"
                          className="text-gray-600 hover:text-primary transition-colors py-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Register
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
