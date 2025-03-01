import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      statusHistory: [
        {
          status: "processing",
          description: "Order confirmed and payment received",
        },
      ],
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email",
  );

  if (order) {
    // Check if the order belongs to the user or if the user is an admin
    if (
      order.user._id.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      res.status(401);
      throw new Error("Not authorized to view this order");
    }
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status, description, location } = req.body;
  const order = await Order.findById(req.params.id);

  if (order) {
    order.status = status || order.status;

    // Add to status history
    order.statusHistory.push({
      status,
      description,
      location,
      date: Date.now(),
    });

    // Update tracking info if provided
    if (req.body.trackingNumber) {
      order.trackingNumber = req.body.trackingNumber;
    }
    if (req.body.carrier) {
      order.carrier = req.body.carrier;
    }
    if (req.body.estimatedDelivery) {
      order.estimatedDelivery = req.body.estimatedDelivery;
    }

    // If status is delivered, update isDelivered
    if (status === "delivered") {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  // Filter options
  const status = req.query.status ? { status: req.query.status } : {};
  const isPaid =
    req.query.isPaid === "true"
      ? { isPaid: true }
      : req.query.isPaid === "false"
        ? { isPaid: false }
        : {};
  const isDelivered =
    req.query.isDelivered === "true"
      ? { isDelivered: true }
      : req.query.isDelivered === "false"
        ? { isDelivered: false }
        : {};

  // Date range filter
  const dateFilter = {};
  if (req.query.startDate) {
    dateFilter.createdAt = { $gte: new Date(req.query.startDate) };
  }
  if (req.query.endDate) {
    const endDate = new Date(req.query.endDate);
    endDate.setDate(endDate.getDate() + 1); // Include the end date
    dateFilter.createdAt = { ...dateFilter.createdAt, $lt: endDate };
  }

  // Combine all filters
  const filters = {
    ...status,
    ...isPaid,
    ...isDelivered,
    ...dateFilter,
  };

  const count = await Order.countDocuments(filters);
  const orders = await Order.find(filters)
    .populate("user", "id name")
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ orders, page, pages: Math.ceil(count / pageSize), total: count });
});

// @desc    Get order statistics
// @route   GET /api/orders/stats
// @access  Private/Admin
export const getOrderStats = asyncHandler(async (req, res) => {
  // Total orders
  const totalOrders = await Order.countDocuments();

  // Total sales
  const totalSales = await Order.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: "$totalPrice" },
      },
    },
  ]);

  // Orders by status
  const ordersByStatus = await Order.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  // Sales by date (last 7 days)
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  const salesByDate = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: sevenDaysAgo },
        isPaid: true,
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        sales: { $sum: "$totalPrice" },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  res.json({
    totalOrders,
    totalSales: totalSales.length > 0 ? totalSales[0].total : 0,
    ordersByStatus,
    salesByDate,
  });
});

// @desc    Track order by tracking number
// @route   GET /api/orders/track/:trackingNumber
// @access  Public
export const trackOrderByTrackingNumber = asyncHandler(async (req, res) => {
  const { trackingNumber } = req.params;
  const order = await Order.findOne({ trackingNumber }).select(
    "orderItems status statusHistory trackingNumber carrier estimatedDelivery",
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
