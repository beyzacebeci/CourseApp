# CourseLab - Online Education Platform

CourseLab is a modern education platform where users can purchase online courses, and instructors can create and manage courses.

## Technologies

### Frontend

- **React 18** - Modern JavaScript library for UI development
- **Vite** - Fast and optimized build tool and development server
- **Material-UI (MUI)** - React component library and design system
- **React Router** - Page routing and navigation management
- **i18next** - Multi-language support (Turkish/English)
- **Axios** - Promise-based HTTP client for HTTP requests

### State Management

- Context API - React's built-in state management solution
- Custom hooks - Customized hooks for state and business logic management

### Backend Integration

- RESTful API integration
- JWT-based authentication
- Token management with Axios interceptors

## Features

- 🔐 User Authentication (Login/Register)
- 🌐 Multi-language Support (TR/EN)
- 📚 Course Listing and Detail View
- 🛒 Cart Management
- 💳 Payment Processing
- 👤 User Profile Management
- 📝 Instructor Panel
- 🔍 Course Search and Filtering
- 📱 Responsive Design

## Project Structure

src/  
├── assets/ # Images and static files  
├── components/ # Reusable UI components  
├── context/ # Context API state management  
├── locales/ # Language files (TR/EN)  
├── pages/ # Page components  
└── services/ # API services

# CourseLab Installation Guide

## Requirements

The following software must be installed to run the project:

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- Git

## Installation Steps

# Steps to Start the Project

Follow these steps to run the project in your development environment.

### 1. Clone the Repository

```bash
git clone https://github.com/beyzacebeci/CourseApp.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

## Context Providers

The application uses the following context providers:

- `AuthProvider` - Authentication management
- `BasketProvider` - Cart operations
- `CategoryProvider` - Category management
- `CourseProvider` - Course operations
- `OrderProvider` - Order management
- `PaymentProvider` - Payment processing
- `TranslationProvider` - Language management
- `UserProvider` - User operations

## Style and Design

- Material-UI (MUI) component library
- Responsive design
- Custom theme and styling
- CSS-in-JS approach
