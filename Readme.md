# Online Laundry System

<<<<<<< HEAD
A modern full-stack web application for managing laundry services online. Users can browse stores and products, add items to a cart, place orders, make secure payments, schedule deliveries, and leave reviews.

## What's New: Scheduled Drop-off

Users can now choose their preferred drop-off date and time slot right from the cart — pick a day, select a window that works for you (Morning, Afternoon, or Evening), and check out. The store gets the exact schedule with the order, so your clean laundry arrives back exactly when you expect it.

## Features

- User registration, login, logout, and profile management
- Store and product browsing
- Cart and order management
- Scheduled delivery options for convenient drop-off
- Payment integration with Razorpay
- Review and rating system
=======
A simple, professional web application for managing laundry services with a React frontend and a Node.js/Express backend.

## Overview

This repository contains a full-stack Online Laundry System with separated `Frontend` and `Backend` folders. The project provides product browsing, cart management, ordering, payment integration, and user profiles.

## Key Features

- User authentication and profiles
- Product and store listings
- Shopping cart and order management
- Reviews and ratings
- Payment processing integration
>>>>>>> d2596223d35650fb72937a9832fd0072a9a442cb

## Tech Stack

- Frontend: React, Vite
<<<<<<< HEAD
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
=======
- Backend: Node.js, Express
- Database: MongoDB (configurable via environment variable)
- File uploads: Cloudinary (optional)

## Quick Start

Prerequisites: Node.js (16+), npm or yarn, MongoDB (or a hosted MongoDB URI).

1. Backend
>>>>>>> d2596223d35650fb72937a9832fd0072a9a442cb

```bash
cd Backend
npm install
<<<<<<< HEAD

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
=======
# Create or update .env with required variables (see Environment below)
npm run dev
```

2. Frontend

```bash
cd Frontend
npm install
npm run dev
```

Open the frontend in your browser (Vite typically serves at http://localhost:5173).

## Environment Variables

The backend expects a few environment variables. Typical names include (but may vary):

- `MONGODB_URI` - MongoDB connection string
- `PORT` - Backend port
- `JWT_SECRET` - Secret for signing JWTs
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` - Cloudinary credentials (optional)
- `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` - Payment gateway keys (optional)
- SMTP credentials for email notifications (optional)

Create a `.env` file in the `Backend` folder before running.

## Scripts

- Backend: `npm run dev` (development)
- Frontend: `npm run dev` (Vite development server)

## Contributing

Contributions are welcome. Open an issue or submit a pull request with a clear description of changes and testing steps.

## License

This project is available under the MIT License unless otherwise specified.

## Contact

For questions or support, open an issue in this repository.

>>>>>>> d2596223d35650fb72937a9832fd0072a9a442cb
