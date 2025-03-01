import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star,
  Heart,
  Share2,
  ShoppingCart,
  ChevronRight,
  Truck,
  RotateCcw,
  Shield,
} from "lucide-react";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import FeaturedProducts from "./FeaturedProducts";

interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

interface ProductReview {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState("m");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock product data - in a real app, this would come from an API call
  const product = {
    id: id || "prod-001",
    name: "Premium Wireless Headphones",
    price: 129.99,
    discount: 15,
    rating: 4.5,
    reviewCount: 127,
    description:
      "Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design for extended listening sessions.",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Bluetooth 5.0 connectivity",
      "Built-in microphone for calls",
      "Foldable design for easy storage",
      "Premium memory foam ear cushions",
    ],
    colors: [
      { id: "black", name: "Black", hex: "#000000" },
      { id: "silver", name: "Silver", hex: "#C0C0C0" },
      { id: "blue", name: "Blue", hex: "#0000FF" },
    ],
    sizes: [
      { id: "s", name: "Small" },
      { id: "m", name: "Medium" },
      { id: "l", name: "Large" },
    ],
    stock: 15,
    sku: "WH-PRO-100",
    brand: "AudioTech",
    category: "Electronics",
    images: [
      {
        id: "img1",
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        alt: "Black wireless headphones front view",
      },
      {
        id: "img2",
        url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        alt: "Black wireless headphones side view",
      },
      {
        id: "img3",
        url: "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        alt: "Black wireless headphones being worn",
      },
      {
        id: "img4",
        url: "https://images.unsplash.com/photo-1545127398-14699f92334b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        alt: "Black wireless headphones with case",
      },
    ],
    reviews: [
      {
        id: "rev1",
        user: "John D.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        rating: 5,
        date: "2023-05-15",
        comment:
          "These headphones are amazing! The sound quality is exceptional and the noise cancellation works perfectly. Battery life is as advertised.",
      },
      {
        id: "rev2",
        user: "Sarah M.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        rating: 4,
        date: "2023-04-22",
        comment:
          "Very comfortable for long listening sessions. Sound quality is great, though bass could be a bit stronger. Overall very satisfied with my purchase.",
      },
      {
        id: "rev3",
        user: "Michael T.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
        rating: 5,
        date: "2023-03-10",
        comment:
          "Best headphones I've ever owned! The noise cancellation is perfect for my daily commute on the subway. Highly recommend!",
      },
    ],
  };

  const discountedPrice =
    product.discount > 0
      ? product.price * (1 - product.discount / 100)
      : product.price;

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    console.log("Added to cart:", {
      productId: product.id,
      name: product.name,
      price: discountedPrice,
      color: selectedColor,
      size: selectedSize,
      quantity,
    });
    // In a real app, this would dispatch to a cart state or API
  };

  const handleAddToWishlist = () => {
    console.log("Added to wishlist:", product.id);
    // In a real app, this would dispatch to a wishlist state or API
  };

  // Generate stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />,
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star
            key={i}
            className="h-5 w-5 fill-yellow-400 text-yellow-400 fill-half"
          />,
        );
      } else {
        stars.push(<Star key={i} className="h-5 w-5 text-gray-300" />);
      }
    }

    return stars;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center text-sm text-gray-600">
              <Link to="/" className="hover:text-primary">
                Home
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <Link to="/products" className="hover:text-primary">
                Products
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <Link
                to={`/category/${product.category.toLowerCase()}`}
                className="hover:text-primary"
              >
                {product.category}
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span className="text-gray-900 font-medium">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Images */}
              <div className="space-y-4">
                <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={product.images[selectedImage].url}
                    alt={product.images[selectedImage].alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <div
                      key={image.id}
                      className={`aspect-square overflow-hidden rounded-md cursor-pointer border-2 ${selectedImage === index ? "border-primary" : "border-transparent"}`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold">{product.name}</h1>
                  <div className="flex items-center mt-2">
                    <div className="flex mr-2">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviewCount} reviews)
                    </span>
                  </div>
                </div>

                <div className="flex items-baseline">
                  {product.discount > 0 && (
                    <span className="text-lg text-gray-500 line-through mr-2">
                      ${product.price.toFixed(2)}
                    </span>
                  )}
                  <span className="text-3xl font-bold text-gray-900">
                    ${discountedPrice.toFixed(2)}
                  </span>
                  {product.discount > 0 && (
                    <span className="ml-2 bg-red-100 text-red-700 px-2 py-0.5 rounded text-sm font-medium">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>

                <p className="text-gray-700">{product.description}</p>

                <div className="space-y-4">
                  {/* Color Selection */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">
                      Color
                    </h3>
                    <div className="flex space-x-2">
                      {product.colors.map((color) => (
                        <div
                          key={color.id}
                          className={`w-10 h-10 rounded-full cursor-pointer flex items-center justify-center ${selectedColor === color.id ? "ring-2 ring-primary ring-offset-2" : ""}`}
                          onClick={() => setSelectedColor(color.id)}
                          title={color.name}
                        >
                          <span
                            className="w-8 h-8 rounded-full border border-gray-300"
                            style={{ backgroundColor: color.hex }}
                          ></span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Size Selection */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-medium text-gray-900">
                        Size
                      </h3>
                      <Button variant="link" size="sm" className="p-0 h-auto">
                        Size Guide
                      </Button>
                    </div>
                    <RadioGroup
                      value={selectedSize}
                      onValueChange={setSelectedSize}
                      className="flex space-x-2"
                    >
                      {product.sizes.map((size) => (
                        <div key={size.id} className="flex items-center">
                          <RadioGroupItem
                            value={size.id}
                            id={`size-${size.id}`}
                            className="sr-only"
                          />
                          <Label
                            htmlFor={`size-${size.id}`}
                            className={`px-4 py-2 rounded border cursor-pointer ${selectedSize === size.id ? "bg-primary text-white border-primary" : "border-gray-300 hover:border-gray-400"}`}
                          >
                            {size.name}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Quantity */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">
                      Quantity
                    </h3>
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={decrementQuantity}
                        disabled={quantity <= 1}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">{quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={incrementQuantity}
                        disabled={quantity >= product.stock}
                      >
                        +
                      </Button>
                      <span className="text-sm text-gray-500 ml-4">
                        {product.stock} items available
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <Button className="flex-1" onClick={handleAddToCart}>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={handleAddToWishlist}
                  >
                    <Heart className="mr-2 h-5 w-5" />
                    Add to Wishlist
                  </Button>
                </div>

                {/* Product Meta */}
                <div className="pt-4 border-t border-gray-200 space-y-2 text-sm">
                  <div className="flex">
                    <span className="text-gray-500 w-24">SKU:</span>
                    <span>{product.sku}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-24">Brand:</span>
                    <span>{product.brand}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-24">Category:</span>
                    <Link
                      to={`/category/${product.category.toLowerCase()}`}
                      className="text-primary hover:underline"
                    >
                      {product.category}
                    </Link>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 w-24">Share:</span>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Shipping & Returns */}
                <div className="pt-4 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Truck className="h-5 w-5 text-gray-400" />
                    <span className="text-sm">Free shipping over $100</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RotateCcw className="h-5 w-5 text-gray-400" />
                    <span className="text-sm">30-day returns</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-gray-400" />
                    <span className="text-sm">2-year warranty</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Tabs */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full justify-start border-b mb-8">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="reviews">
                  Reviews ({product.reviews.length})
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="space-y-4">
                <h2 className="text-2xl font-semibold">Product Description</h2>
                <p className="text-gray-700">{product.description}</p>
                <p className="text-gray-700">
                  Our Premium Wireless Headphones deliver an exceptional audio
                  experience with deep bass and crystal-clear highs. The active
                  noise cancellation technology blocks out ambient noise,
                  allowing you to focus on your music or calls.
                </p>
                <p className="text-gray-700">
                  With a comfortable over-ear design and premium memory foam ear
                  cushions, these headphones are perfect for extended listening
                  sessions. The foldable design makes them easy to carry in the
                  included travel case.
                </p>
                <p className="text-gray-700">
                  The built-in microphone ensures clear calls, while the
                  intuitive controls let you manage your music and calls with
                  ease. With 30 hours of battery life, you can enjoy your
                  favorite content all day long.
                </p>
              </TabsContent>
              <TabsContent value="features" className="space-y-4">
                <h2 className="text-2xl font-semibold">Key Features</h2>
                <ul className="list-disc pl-5 space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-gray-700">
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Technical Specifications
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-medium mb-2">Audio</h4>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span className="text-gray-600">Driver Size</span>
                          <span>40mm</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600">
                            Frequency Response
                          </span>
                          <span>20Hz - 20kHz</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600">Impedance</span>
                          <span>32 Ohm</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600">Sensitivity</span>
                          <span>105dB</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-medium mb-2">Connectivity</h4>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span className="text-gray-600">
                            Bluetooth Version
                          </span>
                          <span>5.0</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600">Wireless Range</span>
                          <span>10m (33ft)</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600">Battery Life</span>
                          <span>30 hours</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600">Charging Time</span>
                          <span>2 hours</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">Customer Reviews</h2>
                  <Button>Write a Review</Button>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                  {/* Review Summary */}
                  <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-sm">
                    <div className="text-center">
                      <div className="text-5xl font-bold mb-2">
                        {product.rating}
                      </div>
                      <div className="flex justify-center mb-2">
                        {renderStars(product.rating)}
                      </div>
                      <p className="text-gray-600">
                        {product.reviewCount} reviews
                      </p>
                    </div>

                    <Separator className="my-6" />

                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="w-16 text-sm">5 stars</span>
                        <div className="flex-grow h-2 mx-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="bg-yellow-400 h-full rounded-full"
                            style={{ width: "70%" }}
                          ></div>
                        </div>
                        <span className="w-12 text-right text-sm">70%</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-16 text-sm">4 stars</span>
                        <div className="flex-grow h-2 mx-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="bg-yellow-400 h-full rounded-full"
                            style={{ width: "20%" }}
                          ></div>
                        </div>
                        <span className="w-12 text-right text-sm">20%</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-16 text-sm">3 stars</span>
                        <div className="flex-grow h-2 mx-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="bg-yellow-400 h-full rounded-full"
                            style={{ width: "5%" }}
                          ></div>
                        </div>
                        <span className="w-12 text-right text-sm">5%</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-16 text-sm">2 stars</span>
                        <div className="flex-grow h-2 mx-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="bg-yellow-400 h-full rounded-full"
                            style={{ width: "3%" }}
                          ></div>
                        </div>
                        <span className="w-12 text-right text-sm">3%</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-16 text-sm">1 star</span>
                        <div className="flex-grow h-2 mx-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="bg-yellow-400 h-full rounded-full"
                            style={{ width: "2%" }}
                          ></div>
                        </div>
                        <span className="w-12 text-right text-sm">2%</span>
                      </div>
                    </div>
                  </div>

                  {/* Review List */}
                  <div className="md:w-2/3 space-y-6">
                    {product.reviews.map((review) => (
                      <div
                        key={review.id}
                        className="bg-white p-6 rounded-lg shadow-sm"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            <img
                              src={review.avatar}
                              alt={review.user}
                              className="w-10 h-10 rounded-full mr-3"
                            />
                            <div>
                              <h4 className="font-medium">{review.user}</h4>
                              <div className="flex items-center">
                                <div className="flex mr-2">
                                  {renderStars(review.rating)}
                                </div>
                                <span className="text-sm text-gray-500">
                                  {new Date(review.date).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="mt-4 text-gray-700">{review.comment}</p>
                      </div>
                    ))}

                    <Button variant="outline" className="w-full">
                      Load More Reviews
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Related Products */}
        <FeaturedProducts
          title="Related Products"
          subtitle="You might also like these products"
        />
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;
