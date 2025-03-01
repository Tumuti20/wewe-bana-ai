import React from "react";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface ProductCardProps {
  id?: string;
  name?: string;
  price?: number;
  image?: string;
  rating?: number;
  discount?: number;
  isNew?: boolean;
  onAddToCart?: (id: string) => void;
}

const ProductCard = ({
  id = "prod-001",
  name = "Premium Wireless Headphones",
  price = 129.99,
  image = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  rating = 4.5,
  discount = 0,
  isNew = false,
  onAddToCart = () => {},
}: ProductCardProps) => {
  const discountedPrice = discount > 0 ? price * (1 - discount / 100) : price;

  // Generate stars based on rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />,
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star
            key={i}
            className="h-4 w-4 fill-yellow-400 text-yellow-400 fill-half"
          />,
        );
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
      }
    }

    return stars;
  };

  return (
    <Card className="w-[300px] h-[400px] overflow-hidden flex flex-col bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {isNew && (
          <Badge className="absolute top-2 left-2 bg-blue-500 hover:bg-blue-600">
            New
          </Badge>
        )}
        {discount > 0 && (
          <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">
            {discount}% OFF
          </Badge>
        )}
      </div>

      <CardHeader className="p-4 pb-0">
        <h3 className="font-semibold text-lg line-clamp-1">{name}</h3>
        <div className="flex items-center mt-1">
          {renderStars()}
          <span className="text-sm text-gray-500 ml-1">({rating})</span>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-2 flex-grow">
        <div className="flex items-baseline mt-1">
          {discount > 0 && (
            <span className="text-sm text-gray-500 line-through mr-2">
              ${price.toFixed(2)}
            </span>
          )}
          <span className="text-xl font-bold text-gray-900">
            ${discountedPrice.toFixed(2)}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="w-full" onClick={() => onAddToCart(id)}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add {name} to your cart</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
