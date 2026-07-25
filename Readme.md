# Online Laundry System

A simple, professional web application for managing laundry services with a React frontend and a Node.js/Express backend.

## Overview

This repository contains a full-stack Online Laundry System with separated `Frontend` and `Backend` folders. The project provides product browsing, cart management, ordering, payment integration, and user profiles.

## Key Features

- User authentication and profiles
- Product and store listings
- Shopping cart and order management
- Reviews and ratings
- Payment processing integration

## Tech Stack

- Frontend: React, Vite
- Backend: Node.js, Express
- Database: MongoDB (configurable via environment variable)
- File uploads: Cloudinary (optional)

## Quick Start

Prerequisites: Node.js (16+), npm or yarn, MongoDB (or a hosted MongoDB URI).

1. Backend

```bash
cd Backend
npm install
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

