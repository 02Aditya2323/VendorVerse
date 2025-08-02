# 🌟 VendorVerse – Group-Based Product Selling Platform

**VendorVerse** is a role-based web platform where vendors can create and join product-selling groups, and sellers can claim active groups to manage and distribute items. Vendors can also list their expired or leftover products for sale, while sellers can individually post products without joining a group. The platform supports JWT authentication, secure role access, and dynamic product-group interactions.

## 🚀 Features

### 👥 User Management
- **JWT Authentication**: Secure token-based authentication system
- **Role-Based Authorization**: Two distinct user roles (Vendor & Seller)
- **User Registration**: Sign up with role selection
- **Secure Login/Logout**: Protected routes with middleware

### 🏢 Group Management (Vendors)
- **Create Groups**: Vendors can create product-selling groups
- **Join Groups**: Other vendors can join existing groups
- **Group Discovery**: Browse and search available groups
- **Automatic Cleanup**: Cron jobs handle expired group cleanup

### 🛒 Product Management
- **Vendor Products**: List expired/leftover products for sale
- **Seller Products**: Individual product posting without group joining
- **Product Categories**: Organized product listings
- **CRUD Operations**: Full product management capabilities

### 🎯 Seller Operations
- **Claim Groups**: Sellers can claim active vendor groups
- **Group Management**: Manage and distribute group items
- **Individual Sales**: Post products independently

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcrypt hashing
- **Task Scheduling**: node-cron for automated cleanup
- **CORS**: Cross-Origin Resource Sharing enabled
- **Environment**: dotenv for configuration

## 📁 Project Structure

```
VendorVerse/
├── controllers/
│   ├── User.js          # User authentication & management
│   ├── Groups.js        # Group CRUD operations
│   └── Product.js       # Product management
├── middlewares/
│   └── auth.js          # Authentication & authorization middleware
├── models/
│   ├── User.js          # User schema
│   ├── Group.js         # Group schema
│   └── Product.js       # Product schema
├── routers/
│   ├── User.js          # User routes
│   ├── Groups.js        # Group routes
│   └── Product.js       # Product routes
├── services/
│   ├── auth.js          # JWT service utilities
│   └── cronjobs.js      # Automated cleanup tasks
├── connection.js        # MongoDB connection setup
├── index.js            # Main application entry point
└── package.json        # Dependencies & scripts
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd VendorVerse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=your-port-number
   MONGO_LOCAL_URL=your-mongodb-connection-string
   KEY=your-jwt-secret-key
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system

5. **Run the application**
   ```bash
   npm start
   # or
   node index.js
   ```

6. **Server Status**
   The server will start on `http://localhost:8080`
   You should see:
   ```
   MONGODB CONNECTED, YAY
   🚀 Initializing cron jobs...
   ✅ Cron jobs initialized successfully
   server started
   ```

## 📚 API Documentation

### Authentication Endpoints

#### User Registration
```http
POST /user/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "role": "vendor" // or "seller"
}
```

#### User Login
```http
POST /user/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### User Logout
```http
POST /user/logout
Authorization: Bearer <jwt-token>
```

### Group Endpoints (Protected Routes)

#### Get All Groups
```http
GET /group/
Authorization: Bearer <jwt-token>
```

#### Get Group by ID
```http
GET /group/:id
Authorization: Bearer <jwt-token>
```

#### Create New Group (Vendors Only)
```http
POST /group/
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "name": "Electronics Group",
  "description": "Selling electronic items",
  "category": "electronics"
}
```

#### Join Group (Vendors Only)
```http
POST /group/join/:id
Authorization: Bearer <jwt-token>
```

#### Claim Group (Sellers Only)
```http
POST /group/claim/:id
Authorization: Bearer <jwt-token>
```

#### Delete Group (Vendors Only)
```http
DELETE /group/:id
Authorization: Bearer <jwt-token>
```

### Product Endpoints (Protected Routes)

#### Get All Products
```http
GET /product/
Authorization: Bearer <jwt-token>
```

#### Get Product by ID
```http
GET /product/:id
Authorization: Bearer <jwt-token>
```

#### Create Product
```http
POST /product/
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "category": "electronics"
}
```

#### Update Product
```http
PUT /product/:id
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

#### Delete Product
```http
DELETE /product/:id
Authorization: Bearer <jwt-token>
```

#### Buy Product
```http
POST /product/buy/:id
Authorization: Bearer <jwt-token>
```

## 🔐 Authentication & Authorization

### JWT Token Structure
- **Header**: Algorithm and token type
- **Payload**: User ID, role, and expiration
- **Signature**: Verification signature

### Role-Based Access Control
- **Vendors**: Can create/join groups, list products
- **Sellers**: Can claim groups, manage individual products
- **Protected Routes**: All group and product endpoints require authentication


## ⚙️ Automated Tasks

### Cron Jobs
- **Group Cleanup**: Automatically removes expired groups
- **Data Maintenance**: Periodic database cleanup
- **Scheduling**: Configurable intervals for different tasks

## 🔍 Error Handling

- **Global Error Handling**: Centralized error management
- **Validation**: Input validation for all endpoints
- **Status Codes**: Proper HTTP status code responses
- **Logging**: Comprehensive error logging

## 🚦 Development Guidelines

### Code Structure
- **MVC Pattern**: Models, Views (API), Controllers separation
- **Middleware**: Reusable authentication and authorization
- **Services**: Business logic separation
- **Routes**: Clean API endpoint organization

### Security Best Practices
- **Password Hashing**: bcrypt with salt rounds
- **JWT Secrets**: Environment variable storage
- **Input Sanitization**: Request validation
- **CORS Configuration**: Cross-origin request handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Aditya** - Full Stack Developer

## 🙏 Acknowledgments

- Express.js community for the robust framework
- MongoDB team for the flexible database solution
- JWT.io for authentication standards
- Node.js community for the runtime environment

---

**VendorVerse** - Connecting vendors and sellers in a seamless, secure platform! 🌟
