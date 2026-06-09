# VVDigiStore

A full-stack luxury ecommerce platform built with Next.js, MongoDB, NextAuth, Razorpay, Cloudinary, and Tailwind CSS.

---

# Features

## Customer Features

* User Registration
* User Login
* Secure Authentication
* Product Browsing
* Product Search
* Product Filtering
* Product Details Page
* Related Products
* Wishlist
* Shopping Cart
* Coupon System
* Checkout
* Cash On Delivery
* Razorpay Online Payment
* Order History
* Order Tracking Timeline
* Mobile Responsive Design

---

## Admin Features

* Admin Authentication

* Product Management

  * Add Product
  * Edit Product
  * Delete Product

* Inventory Management

  * Stock Tracking
  * Low Stock Detection
  * Out Of Stock Protection

* Order Management

  * View Orders
  * Update Status
  * Track Customer Orders

* Coupon Management

  * Create Coupons
  * Disable Coupons
  * Delete Coupons
  * Usage Limits
  * Expiry Dates
  * Coupon Placement Control

---

# Tech Stack

## Frontend

* Next.js 16
* React
* TypeScript
* Tailwind CSS

## Backend

* Next.js API Routes

## Database

* MongoDB

## Authentication

* NextAuth

## Payments

* Razorpay

## Media Storage

* Cloudinary

## Deployment

* Vercel

---

# Installation

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# Environment Variables

Create:

```text
.env.local
```

Add:

```env
MONGODB_URI=

NEXTAUTH_SECRET=
NEXTAUTH_URL=

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
NEXT_PUBLIC_RAZORPAY_KEY_ID=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=

ADMIN_EMAIL=

GMAIL_USER=
GMAIL_APP_PASSWORD=
```

---

# Database Setup

Create MongoDB collections:

```text
products
orders
users
coupons
couponUsage
newsletter
gallery
blog
```

---

# Admin Access

Admin email must match:

```env
ADMIN_EMAIL=
```

Admin users can access:

```text
/admin
/admin/products
/admin/orders
/admin/coupons
```

Non-admin users are redirected to:

```text
/unauthorized
```

---

# Payment Gateway

Razorpay is integrated.

Supported methods:

* UPI
* Credit Card
* Debit Card
* Net Banking
* Wallets

---

# Inventory System

Inventory automatically updates after successful order placement.

Features:

* Stock deduction
* Out-of-stock protection
* Low stock warning

---

# Coupon System

Features:

* Percentage Discounts
* Fixed Discounts
* Usage Limits
* Expiry Dates
* Minimum Order Amount
* One User One Use Restriction
* Homepage Coupon Banners

---

# Deployment

Push code:

```bash
git add .
git commit -m "update"
git push origin main
```

Deploy using Vercel.

Required environment variables must be configured inside Vercel Project Settings.

---

# Folder Structure

```text
app/
components/
context/
lib/
public/

app/api/
app/admin/
app/products/
app/cart/
app/checkout/
app/accounts/
```

---

# Future Roadmap

* Email Notifications
* Product Reviews
* Product Ratings
* Save For Later
* Analytics Dashboard
* User Management
* Returns & Refunds
* Address Book
* SEO Enhancements

---

# License

Private Project

Copyright © VVDigiStore
