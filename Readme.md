# Online Laundry System

A modern full-stack web application for managing laundry services online. Users can browse stores and products, add items to a cart, place orders, make secure payments, schedule dropoff, and leave reviews.

## What's New: Scheduled Drop-off

Users can now **choose their preferred drop-off date and time slot** right from the cart — pick a day, select a window that works for you (Morning, Afternoon, or Evening), and check out. The store gets the exact schedule with the order, so your clean laundry arrives back exactly when you expect it.

It's a small addition that makes the whole experience feel less like an online order and more like booking an actual appointment — because knowing exactly when your laundry is coming back matters just as much as knowing it was picked up.

## Features

- User registration, login, logout, and profile management
- Store and product browsing
- Cart and order management
- Scheduled drop-off — choose a preferred delivery date and time slot at checkout
- Secure payment integration with Razorpay
- Review and rating system

## Tech Stack

- Frontend: React, Vite
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose
- File Uploads: Cloudinary
- Email Services: Nodemailer
- Payments: Razorpay

## Project Structure

- Backend/ - Express server, APIs, database models, and middleware
- Frontend/ - React application and UI components

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd Online_Laundary_System
```

### 2. Install dependencies

```bash
cd Backend
npm install

cd ../Frontend
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the Backend folder and add the required values for:

- `MONGODB_URI`
- `PORT`
- `ACCESS_TOKEN_SECRET`
- `REFRESH_TOKEN_SECRET`
- `ACCESS_TOKEN_EXPIRY`
- `REFRESH_TOKEN_EXPIRY`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `SMTP_USER`
- `SMTP_PASS`
- `RAZORPAY_API_KEY`
- `RAZORPAY_SECRET_KEY`
- `RAZORPAY_WEBHOOK_SECRET`

### 4. Run the application

Start the backend:

```bash
cd Backend
npm run dev
```

Start the frontend:

```bash
cd Frontend
npm run dev
```

Open your browser and visit:

```text
http://localhost:5173
```

## License

This project is open for educational and personal use.