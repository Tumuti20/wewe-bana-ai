import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowRight, ShoppingBag } from "lucide-react";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  primaryCta?: string;
  secondaryCta?: string;
  backgroundImage?: string;
  featuredProductImage?: string;
  featuredProductName?: string;
  featuredProductPrice?: number;
  featuredProductId?: string;
  onPrimaryCtaClick?: () => void;
  onSecondaryCtaClick?: () => void;
}

const HeroSection = ({
  title = "Summer Collection 2023",
  subtitle = "Discover our latest arrivals with premium quality and stunning designs. Limited time offers available now.",
  primaryCta = "Shop Now",
  secondaryCta = "Explore Collections",
  backgroundImage = "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  featuredProductImage = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  featuredProductName = "Limited Edition Sneakers",
  featuredProductPrice = 149.99,
  featuredProductId = "prod-001",
  onPrimaryCtaClick = () => {},
  onSecondaryCtaClick = () => {},
}: HeroSectionProps) => {
  return (
    <section className="w-full h-[500px] relative overflow-hidden bg-gray-100">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="container mx-auto h-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between h-full py-12 relative z-10">
          {/* Left Content - Text and CTAs */}
          <div className="md:w-1/2 text-white mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {title}
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-md opacity-90">
              {subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100"
                onClick={onPrimaryCtaClick}
                asChild
              >
                <Link to="/products">
                  {primaryCta}
                  <ShoppingBag className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/20"
                onClick={onSecondaryCtaClick}
                asChild
              >
                <Link to="/category/electronics">
                  {secondaryCta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Content - Featured Product */}
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <Link to={`/product/${featuredProductId}`} className="block">
                <div className="relative w-64 h-64 overflow-hidden rounded-md mb-4">
                  <img
                    src={featuredProductImage}
                    alt={featuredProductName}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {featuredProductName}
                </h3>
                <p className="text-2xl font-bold text-gray-900">
                  ${featuredProductPrice.toFixed(2)}
                </p>
              </Link>
              <Button className="w-full mt-4" asChild>
                <Link to={`/product/${featuredProductId}`}>
                  View Product
                  <ShoppingBag className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black/20 to-transparent"></div>
    </section>
  );
};

export default HeroSection;
