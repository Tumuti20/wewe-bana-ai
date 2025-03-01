import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  PackageSearch,
} from "lucide-react";
import ProductCard from "./ProductCard";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  discount: number;
  isNew: boolean;
  category: string;
}

interface FeaturedProductsProps {
  title?: string;
  subtitle?: string;
  products?: Product[];
  onAddToCart?: (id: string) => void;
}

const FeaturedProducts = ({
  title = "Featured Products",
  subtitle = "Discover our most popular items handpicked for you",
  products = [
    {
      id: "prod-001",
      name: "Premium Wireless Headphones",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      rating: 4.5,
      discount: 15,
      isNew: true,
      category: "electronics",
    },
    {
      id: "prod-002",
      name: "Ergonomic Office Chair",
      price: 249.99,
      image:
        "https://images.unsplash.com/photo-1505740106531-4243f3831c78?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      rating: 4.2,
      discount: 0,
      isNew: false,
      category: "furniture",
    },
    {
      id: "prod-003",
      name: "Smart Fitness Watch",
      price: 199.99,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      rating: 4.7,
      discount: 10,
      isNew: true,
      category: "electronics",
    },
    {
      id: "prod-004",
      name: "Organic Cotton T-Shirt",
      price: 34.99,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      rating: 4.0,
      discount: 5,
      isNew: false,
      category: "clothing",
    },
    {
      id: "prod-005",
      name: "Stainless Steel Water Bottle",
      price: 24.99,
      image:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      rating: 4.8,
      discount: 0,
      isNew: false,
      category: "accessories",
    },
    {
      id: "prod-006",
      name: "Bluetooth Portable Speaker",
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      rating: 4.3,
      discount: 20,
      isNew: true,
      category: "electronics",
    },
    {
      id: "prod-007",
      name: "Leather Wallet",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      rating: 4.1,
      discount: 0,
      isNew: false,
      category: "accessories",
    },
    {
      id: "prod-008",
      name: "Ceramic Coffee Mug Set",
      price: 29.99,
      image:
        "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      rating: 4.4,
      discount: 0,
      isNew: false,
      category: "home",
    },
  ],
  onAddToCart = () => {},
}: FeaturedProductsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("featured");
  const [activeCategory, setActiveCategory] = useState("all");

  const productsPerPage = 4;

  // Filter products by category
  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.category === activeCategory);

  // Sort products based on selection
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default: // featured or any other case
        return 0; // maintain original order
    }
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  // Get unique categories from products
  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <section className="w-full py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <Tabs defaultValue="all" className="w-full md:w-auto mb-4 md:mb-0">
            <TabsList className="grid grid-cols-2 sm:grid-cols-4 md:flex">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  onClick={() => setActiveCategory(category)}
                  className="capitalize"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <SlidersHorizontal className="mr-2 h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700 mr-2">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {currentProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                rating={product.rating}
                discount={product.discount}
                isNew={product.isNew}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg shadow-sm">
            <PackageSearch className="h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">
              No products match your current selection.
            </p>
            <Button
              onClick={() => {
                setActiveCategory("all");
                setSortBy("featured");
                setCurrentPage(1);
              }}
            >
              View All Products
            </Button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-10 space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              size="icon"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
