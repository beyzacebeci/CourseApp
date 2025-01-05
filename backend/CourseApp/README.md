# Course App API

A robust .NET-based API for managing an online course platform. This application provides functionality for course management, user authentication, shopping cart operations, and payment processing.

## 🚀 Features

- **Authentication & Authorization**

  - JWT-based authentication
  - Role-based access control (User/Educator roles)
  - User registration and login
  - Password change functionality
  - Token refresh mechanism

- **Course Management**

  - CRUD operations for courses
  - Category-based course organization
  - Course pricing management
  - Course image handling (Base64)
  - Pagination support

- **Shopping Features**

  - Shopping cart functionality
  - Order processing
  - Payment integration
  - Order history

- **Category Management**
  - CRUD operations for categories
  - Category-course relationships

## 🛠 Technical Stack

- **.NET 9.0**
- **Entity Framework Core**
- **SQL Server**
- **AutoMapper**
- **FluentValidation**
- **JWT Authentication**
- **Swagger/OpenAPI**

## 🏗 Architecture

The project follows Clean Architecture principles with these main layers:

- **CourseApp/**
  - **Core/**
    - **CourseApp.Domain** — Entities, Value Objects
    - **CourseApp.Application** — Business Logic, Interfaces
  - **Infrastructure/**
    - **CourseApp.Persistence** — Data Access, Migrations
  - **Presentation/**
    - **CourseApp.API** — API Controllers, Filters

## 🔧 Setup

## 1. Clone Repository

```bash
git clone https://github.com/beyzacebeci/CourseApp.git
```

## 2. Update the connection string in `appsettings.Development.json`

```bash
"ConnectionStrings": {
"SqlServer": "Your-Connection-String"
}
```

## 3. Database Migration

### Using Package Manager Console (Visual Studio)

```bash
# Select CourseApp.Persistence as Default Project in PMC
Add-Migration InitialCreate
Update-Database
```

### Using .NET CLI

```bash
# Navigate to Infrastructure/CourseApp.Persistence
cd Infrastructure/CourseApp.Persistence

# Create migration
dotnet ef migrations add InitialCreate

# Apply migration
dotnet ef database update
```

## 4. Build and Run

### Visual Studio

1. Open CourseApp.sln
2. Set CourseApp.API as startup project
3. Press F5 or click Start Debugging

### Using .NET CLI

```bash
# Navigate to API project
cd Presentation/CourseApp.API

# Restore dependencies
dotnet restore

# Build project
dotnet build

# Run application
dotnet run
```

## 🔑 Authentication

The API uses JWT Bearer authentication. To access protected endpoints:

1. Register a user using `/api/Authentication/register`
2. Login using `/api/Authentication/login` to get a token
3. Use the token in the Authorization header: `Bearer {your-token}`

## 🔐 Authorization

Two main roles are available:

- **User**: Basic access to courses and shopping features
- **Educator**: Additional access to course management features

### Default Users

The system comes with two pre-configured users:

| Role     | Username | Password     |
| -------- | -------- | ------------ |
| Educator | educator | Educator123. |
| User     | user     | User123.     |

## 📝 API Documentation

When running in development mode, access the Swagger documentation at:

```bash
https://localhost:7146/swagger
```

## ⚡ Key Endpoints

### 🔐 Authentication

POST `/api/Authentication/register`

- Creates a new user account
- Body: UserForRegistrationDto (name, surname, username, email, password, roles)
- Public endpoint

POST `/api/Authentication/login`

- Authenticates a user and returns a JWT token
- Body: UserForAuthenticationDto (username, password)
- Public endpoint

POST `/api/Authentication/refresh`

- Refreshes the access token
- Body: TokenDto (accessToken, refreshToken)
- Public endpoint

### 👥 Users Controller

GET `/api/Users`

- Lists all users
- Accessible only by Educator role
- Authorization: Bearer token required

GET `/api/Users/{id}`

- Retrieves details of a specific user
- Authorization: Bearer token required

PUT `/api/Users/{id}`

- Updates user information
- Body: UserForUpdateDto
- Authorization: Bearer token required

PUT `/api/Users/{id}/change-password`

- Changes user password
- Body: ChangePasswordDto (currentPassword, newPassword, confirmNewPassword)
- Authorization: Bearer token required

### 📚 Courses

GET `/api/Courses`

- Lists all courses
- Public endpoint

GET `/api/Courses/paged`

- Returns a paginated course list
- Query Parameters: pageNumber, pageSize
- Public endpoint

GET `/api/Courses/paged-by-category`

- Returns paginated course list filtered by category
- Query Parameters: pageNumber, pageSize, categoryIds
- Public endpoint

GET `/api/Courses/{id}`

- Retrieves details of a specific course
- Public endpoint

POST `/api/Courses`

- Creates a new course
- Body: CreateCourseRequest (name, description, price, base64Image, categoryId)
- Accessible only by Educator role
- Authorization: Bearer token required

PUT `/api/Courses/{id}`

- Updates course information
- Body: UpdateCourseRequest
- Accessible only by Educator role
- Authorization: Bearer token required

PATCH `/api/Courses/price`

- Updates course price
- Body: UpdateCoursePriceRequest (courseId, quantity)
- Accessible only by Educator role
- Authorization: Bearer token required

DELETE `/api/Courses/{id}`

- Deletes a course
- Accessible only by Educator role
- Authorization: Bearer token required

### 🏷️ Categories

GET `/api/Categories`

- Lists all categories
- Public endpoint

GET `/api/Categories/{id}`

- Retrieves details of a specific category
- Public endpoint

GET `/api/Categories/{id}/with-courses`

- Retrieves category details with courses
- Public endpoint

GET `/api/Categories/with-courses`

- Lists all categories with courses
- Public endpoint

POST `/api/Categories`

- Creates a new category
- Body: CreateCategoryRequest (name)
- Accessible only by Educator role
- Authorization: Bearer token required

PUT `/api/Categories/{id}`

- Updates category information
- Body: UpdateCategoryRequest (name)
- Accessible only by Educator role
- Authorization: Bearer token required

DELETE `/api/Categories/{id}`

- Deletes a category
- Accessible only by Educator role
- Authorization: Bearer token required

### 🛒 BasketItems Controller

GET `/api/BasketItems`

- Lists items in the user's basket
- Authorization: Bearer token required

GET `/api/BasketItems/{id}`

- Retrieves details of a specific item in the basket
- Authorization: Bearer token required

POST `/api/BasketItems`

- Adds an item to the basket
- Body: CreateBasketItemRequest (userId, courseId)
- Authorization: Bearer token required

PUT `/api/BasketItems/{id}`

- Updates an item in the basket
- Body: UpdateBasketRequest (userId, courseId)
- Authorization: Bearer token required

DELETE `/api/BasketItems/{id}`

- Deletes an item from the basket
- Authorization: Bearer token required

DELETE `/api/BasketItems/delete-all`

- Deletes all items from the basket
- Authorization: Bearer token required

### 📦 Orders Controller

GET `/api/Orders`

- Lists user orders
- Authorization: Bearer token required

POST `/api/Orders`

- Creates a new order
- Body: CreateOrderRequest (userId, paymentId, totalPrice, courseIds)
- Authorization: Bearer token required

### 💳 Payments Controller

POST `/api/Payments`

- Creates a new payment record
- Body: CreatePaymentRequest (userId, address, cardNameSurname, cardNumber, expirationDate, cvc)
- Authorization: Bearer token required

## 🛡 Security Features

- Password hashing using ASP.NET Core Identity
- JWT token authentication
- Role-based authorization
- Input validation using FluentValidation
- Global exception handling

## 📦 Dependencies

Key NuGet packages:

- Microsoft.AspNetCore.Identity.EntityFrameworkCore
- Microsoft.EntityFrameworkCore.SqlServer
- AutoMapper
- FluentValidation
- System.IdentityModel.Tokens.Jwt

  ## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
