import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Filter, SlidersHorizontal, ChevronDown, X } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "../ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  discount: number;
  isNew: boolean;
  category: string;
  brand: string;
  colors: string[];
}

const ProductList = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Mock products data
  const products: Product[] = [
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
      brand: "AudioTech",
      colors: ["black", "silver", "blue"],
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
      brand: "ComfortPlus",
      colors: ["black", "gray", "blue"],
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
      brand: "TechFit",
      colors: ["black", "white", "red"],
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
      brand: "EcoWear",
      colors: ["white", "black", "gray", "blue"],
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
      brand: "HydroLife",
      colors: ["silver", "black", "blue", "red"],
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
      brand: "AudioTech",
      colors: ["black", "blue", "red"],
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
      brand: "LuxeLeather",
      colors: ["brown", "black"],
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
      brand: "HomeEssentials",
      colors: ["white", "black", "blue", "red"],
    },
    {
      id: "prod-009",
      name: "Wireless Charging Pad",
      price: 39.99,
      image:
        "https://images.unsplash.com/photo-1585338069466-5e852b0df1a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      rating: 4.2,
      discount: 0,
      isNew: true,
      category: "electronics",
      brand: "PowerTech",
      colors: ["black", "white"],
    },
    {
      id: "prod-010",
      name: "Bamboo Cutting Board",
      price: 19.99,
      image:
        "https://images.unsplash.com/photo-1594385208974-2e75f8d7bb1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      rating: 4.6,
      discount: 0,
      isNew: false,
      category: "home",
      brand: "HomeEssentials",
      colors: ["brown"],
    },
    {
      id: "prod-011",
      name: "Yoga Mat",
      price: 29.99,
      image:
        "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      rating: 4.3,
      discount: 5,
      isNew: false,
      category: "fitness",
      brand: "FitLife",
      colors: ["purple", "blue", "black", "pink"],
    },
    {
      id: "prod-012",
      name: "Mechanical Keyboard",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      rating: 4.7,
      discount: 0,
      isNew: true,
      category: "electronics",
      brand: "TechGear",
      colors: ["black", "white", "rgb"],
    },
  ];

  // Filter products by category if categoryId is provided
  const filteredProducts = categoryId
    ? products.filter((product) => product.category === categoryId)
    : products;

  // Apply brand filter
  const brandFilteredProducts =
    selectedBrands.length > 0
      ? filteredProducts.filter((product) =>
          selectedBrands.includes(product.brand),
        )
      : filteredProducts;

  // Apply color filter
  const colorFilteredProducts =
    selectedColors.length > 0
      ? brandFilteredProducts.filter((product) =>
          product.colors.some((color) => selectedColors.includes(color)),
        )
      : brandFilteredProducts;

  // Apply price range filter
  const priceFilteredProducts = colorFilteredProducts.filter(
    (product) =>
      product.price >= priceRange[0] && product.price <= priceRange[1],
  );

  // Sort products based on selection
  const sortedProducts = [...priceFilteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return a.isNew ? -1 : b.isNew ? 1 : 0;
      default: // featured or any other case
        return 0; // maintain original order
    }
  });

  // Get unique brands from products
  const brands = Array.from(new Set(products.map((product) => product.brand)));

  // Get unique colors from products
  const colors = Array.from(
    new Set(products.flatMap((product) => product.colors)),
  );

  // Toggle brand selection
  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
  };

  // Toggle color selection
  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color],
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedColors([]);
    setPriceRange([0, 500]);
    setSortBy("featured");
  };

  // Handle adding to cart
  const handleAddToCart = (productId: string) => {
    console.log(`Added product ${productId} to cart`);
  };

  // Get color display name and background color
  const getColorInfo = (color: string) => {
    const colorMap: Record<string, { name: string; bg: string }> = {
      black: { name: "Black", bg: "#000000" },
      white: { name: "White", bg: "#FFFFFF" },
      gray: { name: "Gray", bg: "#808080" },
      silver: { name: "Silver", bg: "#C0C0C0" },
      red: { name: "Red", bg: "#FF0000" },
      blue: { name: "Blue", bg: "#0000FF" },
      green: { name: "Green", bg: "#008000" },
      yellow: { name: "Yellow", bg: "#FFFF00" },
      purple: { name: "Purple", bg: "#800080" },
      pink: { name: "Pink", bg: "#FFC0CB" },
      brown: { name: "Brown", bg: "#A52A2A" },
      orange: { name: "Orange", bg: "#FFA500" },
      rgb: { name: "RGB", bg: "linear-gradient(to right, red, green, blue)" },
    };

    return colorMap[color] || { name: color, bg: "#CCCCCC" };
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            {categoryId
              ? `${categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}`
              : "All Products"}
          </h1>
          <p className="text-gray-600 mt-2">
            {sortedProducts.length} products found
          </p>
        </div>

        {/* Mobile Filters */}
        <div className="lg:hidden flex justify-between items-center mb-6">
          <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px]">
              <SheetHeader>
                <SheetTitle className="flex justify-between items-center">
                  <span>Filters</span>
                  <Button variant="ghost" size="sm" onClick={resetFilters}>
                    Reset All
                  </Button>
                </SheetTitle>
              </SheetHeader>
              <div className="py-6 space-y-6">
                {/* Price Range */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Price Range</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={priceRange}
                      min={0}
                      max={500}
                      step={10}
                      onValueChange={(value) =>
                        setPriceRange(value as [number, number])
                      }
                      className="mb-6"
                    />
                    <div className="flex justify-between items-center">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Brands */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Brands</h3>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center">
                        <Checkbox
                          id={`brand-${brand}`}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => toggleBrand(brand)}
                        />
                        <Label
                          htmlFor={`brand-${brand}`}
                          className="ml-2 text-sm font-normal cursor-pointer"
                        >
                          {brand}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Colors */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Colors</h3>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color) => {
                      const colorInfo = getColorInfo(color);
                      return (
                        <div
                          key={color}
                          className={`w-8 h-8 rounded-full cursor-pointer flex items-center justify-center ${selectedColors.includes(color) ? "ring-2 ring-primary ring-offset-2" : "ring-1 ring-gray-300"}`}
                          onClick={() => toggleColor(color)}
                          title={colorInfo.name}
                        >
                          <span
                            className="w-6 h-6 rounded-full"
                            style={{ background: colorInfo.bg }}
                          ></span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
                <div className="flex space-x-2">
                  <SheetClose asChild>
                    <Button variant="outline" className="flex-1">
                      Cancel
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      className="flex-1"
                      onClick={() => setFiltersOpen(false)}
                    >
                      Apply Filters
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Filters</h2>
                <Button variant="ghost" size="sm" onClick={resetFilters}>
                  Reset All
                </Button>
              </div>

              <Accordion
                type="multiple"
                defaultValue={["price", "brand", "color"]}
                className="space-y-4"
              >
                {/* Price Range */}
                <AccordionItem value="price" className="border-b-0">
                  <AccordionTrigger className="py-2 hover:no-underline">
                    <span className="text-base font-medium">Price Range</span>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4">
                    <div className="px-2">
                      <Slider
                        defaultValue={priceRange}
                        min={0}
                        max={500}
                        step={10}
                        onValueChange={(value) =>
                          setPriceRange(value as [number, number])
                        }
                        className="mb-6"
                      />
                      <div className="flex justify-between items-center">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Brands */}
                <AccordionItem value="brand" className="border-b-0">
                  <AccordionTrigger className="py-2 hover:no-underline">
                    <span className="text-base font-medium">Brands</span>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4">
                    <div className="space-y-2">
                      {brands.map((brand) => (
                        <div key={brand} className="flex items-center">
                          <Checkbox
                            id={`desktop-brand-${brand}`}
                            checked={selectedBrands.includes(brand)}
                            onCheckedChange={() => toggleBrand(brand)}
                          />
                          <Label
                            htmlFor={`desktop-brand-${brand}`}
                            className="ml-2 text-sm font-normal cursor-pointer"
                          >
                            {brand}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Colors */}
                <AccordionItem value="color" className="border-b-0">
                  <AccordionTrigger className="py-2 hover:no-underline">
                    <span className="text-base font-medium">Colors</span>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4">
                    <div className="flex flex-wrap gap-2">
                      {colors.map((color) => {
                        const colorInfo = getColorInfo(color);
                        return (
                          <div
                            key={color}
                            className={`w-8 h-8 rounded-full cursor-pointer flex items-center justify-center ${selectedColors.includes(color) ? "ring-2 ring-primary ring-offset-2" : "ring-1 ring-gray-300"}`}
                            onClick={() => toggleColor(color)}
                            title={colorInfo.name}
                          >
                            <span
                              className="w-6 h-6 rounded-full"
                              style={{ background: colorInfo.bg }}
                            ></span>
                          </div>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-grow">
            {/* Desktop Sort */}
            <div className="hidden lg:flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2">
                {selectedBrands.length > 0 ||
                selectedColors.length > 0 ||
                priceRange[0] > 0 ||
                priceRange[1] < 500 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedBrands.map((brand) => (
                      <div
                        key={brand}
                        className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm"
                      >
                        <span>{brand}</span>
                        <button
                          onClick={() => toggleBrand(brand)}
                          className="ml-1"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                    {selectedColors.map((color) => {
                      const colorInfo = getColorInfo(color);
                      return (
                        <div
                          key={color}
                          className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm"
                        >
                          <span
                            className="w-3 h-3 rounded-full mr-1"
                            style={{ background: colorInfo.bg }}
                          ></span>
                          <span>{colorInfo.name}</span>
                          <button
                            onClick={() => toggleColor(color)}
                            className="ml-1"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      );
                    })}
                    {(priceRange[0] > 0 || priceRange[1] < 500) && (
                      <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                        <span>
                          ${priceRange[0]} - ${priceRange[1]}
                        </span>
                        <button
                          onClick={() => setPriceRange([0, 500])}
                          className="ml-1"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetFilters}
                      className="text-sm"
                    >
                      Clear All
                    </Button>
                  </div>
                ) : (
                  <span className="text-gray-500">
                    Showing all {sortedProducts.length} products
                  </span>
                )}
              </div>
              <div className="flex items-center">
                <SlidersHorizontal className="mr-2 h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700 mr-2">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products */}
            {sortedProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-2">
                  No products found
                </h2>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters to find what you're looking for.
                </p>
                <Button onClick={resetFilters}>Reset Filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    rating={product.rating}
                    discount={product.discount}
                    isNew={product.isNew}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductList;
