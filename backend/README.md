# E-commerce Backend API

This is the backend API for the E-commerce platform, built with Node.js, Express, and MongoDB.

## Features

- User authentication and authorization
- Product management
- Order processing
- Payment integration (Stripe and M-Pesa)
- Admin dashboard functionality
- File uploads

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   MPESA_CONSUMER_KEY=your_mpesa_consumer_key
   MPESA_CONSUMER_SECRET=your_mpesa_consumer_secret
   MPESA_PASSKEY=your_mpesa_passkey
   MPESA_SHORTCODE=your_mpesa_shortcode
   NODE_ENV=development
   ```

### Running the Server

```
npm run dev
```

### Seeding the Database

To seed the database with sample data:

```
node src/utils/seeder.js
```

To destroy all data:

```
node src/utils/seeder.js -d
```

## API Endpoints

### Users

- `POST /api/users` - Register a new user
- `POST /api/users/login` - Authenticate user & get token
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users` - Get all users (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)
- `GET /api/users/:id` - Get user by ID (admin only)
- `PUT /api/users/:id` - Update user (admin only)

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create a product (admin only)
- `PUT /api/products/:id` - Update a product (admin only)
- `DELETE /api/products/:id` - Delete a product (admin only)
- `POST /api/products/:id/reviews` - Create product review
- `GET /api/products/top` - Get top rated products
- `GET /api/products/featured` - Get featured products
- `GET /api/products/new` - Get new products
- `GET /api/products/categories` - Get product categories
- `GET /api/products/brands` - Get product brands

### Orders

- `POST /api/orders` - Create new order
- `GET /api/orders/myorders` - Get logged in user orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/pay` - Update order to paid
- `PUT /api/orders/:id/status` - Update order status (admin only)
- `GET /api/orders` - Get all orders (admin only)
- `GET /api/orders/stats` - Get order statistics (admin only)
- `GET /api/orders/track/:trackingNumber` - Track order by tracking number

### Payments

- `POST /api/payments/stripe` - Process Stripe payment
- `GET /api/payments/stripe/config` - Get Stripe config
- `POST /api/payments/mpesa` - Process M-Pesa payment
- `POST /api/payments/mpesa/callback` - M-Pesa callback

### Uploads

- `POST /api/upload` - Upload an image (admin only)

## License

MIT
