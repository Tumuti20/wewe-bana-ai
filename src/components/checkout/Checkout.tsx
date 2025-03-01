import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CreditCard, Truck, Shield, Check } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Checkbox } from "../ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color?: string;
  size?: string;
}

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [saveInfo, setSaveInfo] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock cart items
  const cartItems: CartItem[] = [
    {
      id: "prod-001",
      name: "Premium Wireless Headphones",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      quantity: 1,
      color: "Black",
    },
    {
      id: "prod-002",
      name: "Ergonomic Office Chair",
      price: 249.99,
      image:
        "https://images.unsplash.com/photo-1505740106531-4243f3831c78?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      quantity: 2,
      color: "Gray",
    },
  ];

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // Calculate shipping cost based on method
  const getShippingCost = () => {
    switch (shippingMethod) {
      case "express":
        return 15.99;
      case "next-day":
        return 24.99;
      case "standard":
      default:
        return subtotal > 100 ? 0 : 7.99;
    }
  };

  const shipping = getShippingCost();

  // Calculate tax (8.5%)
  const tax = subtotal * 0.085;

  // Calculate total
  const total = subtotal + shipping + tax;

  const handleContinue = () => {
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
    } else {
      // Process payment
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setActiveStep(4); // Success step
      }, 2000);
    }
  };

  const handleBack = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar
        cartItemCount={cartItems.reduce(
          (count, item) => count + item.quantity,
          0,
        )}
      />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="text-gray-600 mt-1">
            Complete your purchase by providing your information
          </p>
        </div>

        {/* Checkout Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${activeStep >= 1 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"}`}
              >
                {activeStep > 1 ? <Check className="h-5 w-5" /> : 1}
              </div>
              <div className="ml-2">
                <p
                  className={`font-medium ${activeStep >= 1 ? "text-gray-900" : "text-gray-500"}`}
                >
                  Shipping
                </p>
              </div>
            </div>
            <div className="w-16 h-1 bg-gray-200 mx-2">
              <div
                className={`h-full ${activeStep >= 2 ? "bg-primary" : "bg-gray-200"}`}
              ></div>
            </div>
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${activeStep >= 2 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"}`}
              >
                {activeStep > 2 ? <Check className="h-5 w-5" /> : 2}
              </div>
              <div className="ml-2">
                <p
                  className={`font-medium ${activeStep >= 2 ? "text-gray-900" : "text-gray-500"}`}
                >
                  Payment
                </p>
              </div>
            </div>
            <div className="w-16 h-1 bg-gray-200 mx-2">
              <div
                className={`h-full ${activeStep >= 3 ? "bg-primary" : "bg-gray-200"}`}
              ></div>
            </div>
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${activeStep >= 3 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"}`}
              >
                {activeStep > 3 ? <Check className="h-5 w-5" /> : 3}
              </div>
              <div className="ml-2">
                <p
                  className={`font-medium ${activeStep >= 3 ? "text-gray-900" : "text-gray-500"}`}
                >
                  Review
                </p>
              </div>
            </div>
          </div>
        </div>

        {activeStep === 4 ? (
          // Order Success
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">
              Order Placed Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. Your order has been placed and will
              be processed soon.
            </p>
            <p className="text-gray-800 font-medium mb-6">
              Order Number:{" "}
              <span className="font-bold">
                ORD-{Math.floor(100000 + Math.random() * 900000)}
              </span>
            </p>
            <p className="text-gray-600 mb-8">
              We've sent a confirmation email to your email address with all the
              details.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild variant="outline">
                <Link to="/account/orders">Track Order</Link>
              </Button>
              <Button asChild>
                <Link to="/">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  {activeStep === 1 && (
                    // Shipping Information
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold">
                        Shipping Information
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" placeholder="John" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" placeholder="Doe" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john.doe@example.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" placeholder="(123) 456-7890" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input id="address" placeholder="123 Main St" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="apartment">
                          Apartment, suite, etc. (optional)
                        </Label>
                        <Input id="apartment" placeholder="Apt 4B" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input id="city" placeholder="New York" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State/Province</Label>
                          <Select>
                            <SelectTrigger id="state">
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ny">New York</SelectItem>
                              <SelectItem value="ca">California</SelectItem>
                              <SelectItem value="tx">Texas</SelectItem>
                              <SelectItem value="fl">Florida</SelectItem>
                              <SelectItem value="il">Illinois</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">ZIP / Postal Code</Label>
                          <Input id="zipCode" placeholder="10001" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Select defaultValue="us">
                          <SelectTrigger id="country">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="au">Australia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Shipping Method</h3>
                        <RadioGroup
                          value={shippingMethod}
                          onValueChange={setShippingMethod}
                        >
                          <div className="flex items-start space-x-3 space-y-0 border rounded-md p-4 cursor-pointer hover:bg-gray-50">
                            <RadioGroupItem
                              value="standard"
                              id="standard"
                              className="mt-1"
                            />
                            <div className="grid gap-1.5 leading-none">
                              <Label
                                htmlFor="standard"
                                className="text-base font-medium cursor-pointer"
                              >
                                Standard Shipping
                              </Label>
                              <p className="text-sm text-gray-500">
                                {subtotal > 100 ? "Free" : "$7.99"} - Estimated
                                delivery in 5-7 business days
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3 space-y-0 border rounded-md p-4 cursor-pointer hover:bg-gray-50">
                            <RadioGroupItem
                              value="express"
                              id="express"
                              className="mt-1"
                            />
                            <div className="grid gap-1.5 leading-none">
                              <Label
                                htmlFor="express"
                                className="text-base font-medium cursor-pointer"
                              >
                                Express Shipping
                              </Label>
                              <p className="text-sm text-gray-500">
                                $15.99 - Estimated delivery in 2-3 business days
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3 space-y-0 border rounded-md p-4 cursor-pointer hover:bg-gray-50">
                            <RadioGroupItem
                              value="next-day"
                              id="next-day"
                              className="mt-1"
                            />
                            <div className="grid gap-1.5 leading-none">
                              <Label
                                htmlFor="next-day"
                                className="text-base font-medium cursor-pointer"
                              >
                                Next Day Delivery
                              </Label>
                              <p className="text-sm text-gray-500">
                                $24.99 - Order before 2pm for delivery tomorrow
                              </p>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="save-info"
                          checked={saveInfo}
                          onCheckedChange={(checked) =>
                            setSaveInfo(checked as boolean)
                          }
                        />
                        <Label
                          htmlFor="save-info"
                          className="text-sm font-normal cursor-pointer"
                        >
                          Save this information for next time
                        </Label>
                      </div>
                    </div>
                  )}

                  {activeStep === 2 && (
                    // Payment Information
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold">
                        Payment Information
                      </h2>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Payment Method</h3>
                        <RadioGroup
                          value={paymentMethod}
                          onValueChange={setPaymentMethod}
                        >
                          <div className="flex items-start space-x-3 space-y-0 border rounded-md p-4 cursor-pointer hover:bg-gray-50">
                            <RadioGroupItem
                              value="credit-card"
                              id="credit-card"
                              className="mt-1"
                            />
                            <div className="grid gap-1.5 leading-none">
                              <Label
                                htmlFor="credit-card"
                                className="text-base font-medium cursor-pointer"
                              >
                                Credit Card
                              </Label>
                              <p className="text-sm text-gray-500">
                                Pay with Visa, Mastercard, or American Express
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3 space-y-0 border rounded-md p-4 cursor-pointer hover:bg-gray-50">
                            <RadioGroupItem
                              value="paypal"
                              id="paypal"
                              className="mt-1"
                            />
                            <div className="grid gap-1.5 leading-none">
                              <Label
                                htmlFor="paypal"
                                className="text-base font-medium cursor-pointer"
                              >
                                PayPal
                              </Label>
                              <p className="text-sm text-gray-500">
                                Pay with your PayPal account
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3 space-y-0 border rounded-md p-4 cursor-pointer hover:bg-gray-50">
                            <RadioGroupItem
                              value="apple-pay"
                              id="apple-pay"
                              className="mt-1"
                            />
                            <div className="grid gap-1.5 leading-none">
                              <Label
                                htmlFor="apple-pay"
                                className="text-base font-medium cursor-pointer"
                              >
                                Apple Pay
                              </Label>
                              <p className="text-sm text-gray-500">
                                Pay with Apple Pay
                              </p>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>

                      {paymentMethod === "credit-card" && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="cardName">Name on Card</Label>
                            <Input id="cardName" placeholder="John Doe" />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input
                              id="cardNumber"
                              placeholder="1234 5678 9012 3456"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiration">
                                Expiration Date
                              </Label>
                              <Input id="expiration" placeholder="MM/YY" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvv">CVV</Label>
                              <Input id="cvv" placeholder="123" />
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center space-x-2">
                        <Checkbox id="save-payment" />
                        <Label
                          htmlFor="save-payment"
                          className="text-sm font-normal cursor-pointer"
                        >
                          Save this payment method for future purchases
                        </Label>
                      </div>
                    </div>
                  )}

                  {activeStep === 3 && (
                    // Review Order
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold">
                        Review Your Order
                      </h2>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Items</h3>
                        <div className="space-y-4">
                          {cartItems.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center space-x-4"
                            >
                              <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-grow">
                                <h4 className="font-medium">{item.name}</h4>
                                {item.color && (
                                  <p className="text-sm text-gray-500">
                                    Color: {item.color}
                                  </p>
                                )}
                                {item.size && (
                                  <p className="text-sm text-gray-500">
                                    Size: {item.size}
                                  </p>
                                )}
                                <p className="text-sm text-gray-500">
                                  Qty: {item.quantity}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">
                          Shipping Address
                        </h3>
                        <div className="bg-gray-50 p-4 rounded">
                          <p>John Doe</p>
                          <p>123 Main St, Apt 4B</p>
                          <p>New York, NY 10001</p>
                          <p>United States</p>
                          <p className="text-sm text-gray-500 mt-2">
                            Phone: (123) 456-7890
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Payment Method</h3>
                        <div className="bg-gray-50 p-4 rounded flex items-center">
                          <CreditCard className="h-5 w-5 mr-2 text-gray-500" />
                          <div>
                            <p>Credit Card ending in 3456</p>
                            <p className="text-sm text-gray-500">
                              Expires 12/25
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Shipping Method</h3>
                        <div className="bg-gray-50 p-4 rounded">
                          {shippingMethod === "standard" && (
                            <p>Standard Shipping (5-7 business days)</p>
                          )}
                          {shippingMethod === "express" && (
                            <p>Express Shipping (2-3 business days)</p>
                          )}
                          {shippingMethod === "next-day" && (
                            <p>Next Day Delivery</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between mt-8">
                    {activeStep > 1 ? (
                      <Button variant="outline" onClick={handleBack}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                    ) : (
                      <Button variant="outline" asChild>
                        <Link to="/cart">
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Back to Cart
                        </Link>
                      </Button>
                    )}
                    <Button onClick={handleContinue} disabled={isProcessing}>
                      {isProcessing
                        ? "Processing..."
                        : activeStep === 3
                          ? "Place Order"
                          : "Continue"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span>
                        {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax (8.5%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Truck className="h-4 w-4" />
                      <span>Free shipping on orders over $100</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Shield className="h-4 w-4" />
                      <span>Secure payment processing</span>
                    </div>
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

export default Checkout;
