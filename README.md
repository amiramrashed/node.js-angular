# 🏭 Full-Stack Inventory Management System (ITI Scholarship Project)

A **multi-tenant inventory management system** supporting both online/offline retail operations, developed during the ITI Scholarship program by Team

## 🌟 Key Features

### 👥 Multi-Role System
- **Admin Dashboard**: Full system control
- **Sales Clerk Portal**: Branch-specific management
- **Seller Dashboard**: Vendor product management
- **Cashier Interface**: In-store POS system
- **Customer Portal**: E-commerce experience

### 📦 Inventory Core
- Central inventory tracking
- Branch-level sub-inventories
- Stock transfer requests
- Low-stock alerts

### 💰 Sales & Analytics
- Branch performance comparison
- Best-selling product reports
- Online vs offline sales analytics

### 🛒 Order Processing
- Unified cart system (online/offline)
- Multi-branch fulfillment
- Order status pipeline
- Complaint management

## 🛠️ Tech Stack

| Layer          | Technologies |
|----------------|-------------|
| **Frontend**   | Angular 19, Material UI, PrimeNG |
| **Backend**    | Node.js, Express, JWT, Stripe API |
| **Database**   | MongoDB, Mongoose (ODM) |
| **Services**   | Nodemailer, ImageKit, bcryptjs |
| **DevOps**     | Docker, GitHub Actions |

## 🏗️ System Architecture
```plaintext
src/
├── client/                 # Angular Frontend
│   ├── admin/              # Admin module
│   ├── seller/             # Seller portal  
│   └── shared/             # Common components
├── server/                 # Node Backend
│   ├── controllers/        # Route handlers
│   ├── models/             # Mongoose schemas
│   └── services/           # Business logic
└── assets/                 # Images/design files
