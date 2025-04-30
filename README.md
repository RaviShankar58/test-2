
---

# 🚀 Rice Mill Logistics System – Backend

This project simulates the digital operations of a **rice mill logistics platform** involving three main roles: **Sellers**, **Buyers**, and **Lorry Operators**. It was developed in a **modular, phase-based approach** using Node.js, Express, MongoDB, and JWT-based authentication.

---

## 📂 Project Structure

```
backend/
├── config/              # DB config
├── controllers/         # Route handlers
├── middleware/          # Auth and role-based access
├── models/              # Mongoose schemas
├── routes/              # All API route handlers
├── .env                 # Environment variables
├── index.js             # Server entry point
└── README.md            # This file
```

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, bcryptjs
- **Testing**: Postman, RapidAPI
- **Others**: dotenv, nodemon

---

## 🔐 Authentication & Access Control

- **JWT Auth Middleware** for protecting routes
- **Role-Based Middleware** to restrict access (Seller, Buyer, Lorry)

---

## ✅ .env Configuration

```env
PORT=5000
MONGO_URI=paste your mongodb uri here 
JWT_SECRET=yourStrongSecretKey
```

---

# 📈 Development Phases

---

## 📦 PHASE 1: Setup & Authentication

- MongoDB connection (`db.js`)
- User registration/login APIs
- JWT token generation on login

```http
POST /api/register
POST /api/login
```

---

## 🔐 PHASE 2: Role-Based Access

- Middleware:
  - `authenticateUser`: Verifies JWT
  - `authorizeRoles`: Checks for allowed roles

---

## 📊 PHASE 3: Models & Core Logic

### 📌 Mongoose Models

- `User`: name, email/phone, password, role, GPS
- `Product`: type, pricePerTon, quantity, sellerId, isAvailable
- `Bid`: productId, buyerId, bidPrice, status
- `Order`: buyerId, sellerId, productId, price, status
- `LorryAssignment`: lorryId, orderId, OTP

---

## 🛍️ PHASE 4: APIs for Core Roles

### 🔸 Seller Routes

```http
POST   /api/products/add
PUT    /api/products/:id/edit
PUT    /api/products/:id/mark-available
GET    /api/sellers/dashboard
```

### 🔹 Buyer Routes

```http
GET    /api/products/search?type=X&qty=Y
POST   /api/bids
GET    /api/buyers/orders
```

### 🎯 Bid Logic

- Bid is auto-accepted if `bidPrice >= seller price`
- Creates a new order and notifies seller

---

## 🚚 PHASE 5: Logistics Flow (Lorry Module)

### 🔸 Lorry Routes

```http
POST   /api/lorry/register
POST   /api/lorry/login
POST   /api/lorry/accept-job
POST   /api/lorry/verify-otp
POST   /api/buyer/confirm-delivery
```

- Lorry accepts job
- Verifies OTP for delivery
- Buyer confirms delivery

---

## 🧪 PHASE 6: End-to-End Testing

### ✅ Test Scenarios via RapidAPI

1. **User Registration & Login** (Seller, Buyer, Lorry)
2. **Seller** adds product
3. **Buyer** searches products and places bid
4. **Bid is auto-accepted**, order is created
5. **Lorry** accepts order, verifies OTP
6. **Buyer** confirms delivery

---

## 🚀 Running the Project

### 1. Install dependencies

```bash
npm install
```


### 2. Start server

```bash
node index.js
```

---


---
