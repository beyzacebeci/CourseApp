export default {
  common: {
    welcome: "Welcome",
    hello: "Hello",
    login: "Sign In",
    register: "Sign Up",
    logout: "Logout",
    back: "Go Back"
  },
  nav: {
    home: "Home",
    about: "About",
    contact: "Contact",
    educator: "Educator",
    courses: "My Courses",
    profile: "My Profile"
  },
  orders: {
    title: "My Orders",
    orderId: "Order Number",
    purchasedCourses: "Purchased Courses",
    totalPrice: "Total Price",
    createdTime: "Created Time"
  },
  password: {
    title: "Change Password",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmPassword: "Confirm New Password",
    updateButton: "Update Password",
    cancelButton: "Cancel",
    changeButton: "Change Password",
    mismatchError: "New passwords do not match"
  },
  course: {
    details: "View Details",
    price: "{{price}} TL"
  },
  courseForm: {
    addNew: "Add New Course",
    update: "Update Course",
    name: "Course Name",
    description: "Description",
    price: "Price",
    category: "Category",
    selectImage: "Select Image",
    add: "Add",
    updateButton: "Update",
    success: {
      add: "Course added successfully",
      update: "Course updated successfully"
    },
    error: {
      add: "Error adding course",
      update: "Error updating course",
      general: "An error occurred",
      duplicateName: "The same course name already exists in the database."
    }
  },
  courseList: {
    categories: "Categories",
    searchPlaceholder: "Search courses...",
    clearFilters: "Clear Filters"
  },
  educator: {
    allCourses: "All Courses",
    addNewCourse: "Add New Course",
    deleteDialog: {
      title: "Delete Course",
      confirmMessage: 'Are you sure you want to delete "{{courseName}}"?',
      cancelButton: "Cancel",
      deleteButton: "Delete"
    },
    notifications: {
      deleteSuccess: "Course deleted successfully",
      deleteError: "Failed to delete course",
      categoryAddSuccess: "Category added successfully",
      categoryAddError: "Error adding category",
      categoryUpdateSuccess: "Category updated successfully",
      categoryUpdateError: "Error updating category",
      categoryDeleteSuccess: "Category deleted successfully",
      categoryDeleteError: "Error deleting category"
    },
    addNewCategory: "Add New Category",
    addCategory: {
      title: "Category Management",
      name: "Category Name",
      add: "Add",
      cancel: "Cancel"
    }
  },
  home: {
    welcome: "Welcome, {{username}}!",
    carousel: {
      slide1: {
        title: "Make 2025 Your Career Year",
        description: "Get the skills you need with CourseLab!"
      },
      slide2: {
        title: "Certifications: The Ideal Career Step",
        description: "Prepare for COMPTIA, AWS Cloud and many more certification exams."
      }
    },
    viewCourses: "Browse Courses",
    infoSection: {
      title: "Knowledge Center Shaping Your Future",
      description: "From artificial intelligence to digital marketing, from software to personal development start your unlimited learning journey with CourseLab. Achieve your career goals with expert instructors suitable for all levels."
    }
  },
  payment: {
    title: "Payment Information",
    cardName: "Name on Card",
    cardNumber: "Card Number",
    expirationDate: "Expiration Date",
    cvv: "CVV",
    address: "Delivery Address",
    completePayment: "Complete Payment",
    success: "Your payment has been completed successfully!",
    error: "An error occurred during payment.",
  },
  courseDetail: {
    loginRequired: "Please login to add to basket",
    addToBasket: "Add to Basket",
    price: "Price:{{price}} TL",
    category: "Category: {{categoryName}}"
  },
  signIn: {
    title: "Sign In",
    username: "Username",
    password: "Password",
    submit: "Sign In",
    noAccount: "Don't have an account? Sign Up",
    error: "An error occurred during login",
    success: "Login successful",
    invalid: "Invalid username or password"
  },
  signUp: {
    title: "Sign Up",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    username: "Username",
    password: "Password",
    submit: "Sign Up",
    haveAccount: "Already have an account? Sign in",
    error: {
      requiredFields: "All fields are required."
    }
  },
  profile: {
    title: "Profile Information",
    name: "First Name",
    surname: "Last Name",
    email: "Email",
    username: "Username",
    cancel: "Cancel",
    save: "Save",
    fullName: "Full Name"
  },
  validation: {
    required: "This field is required",
    email: "Please enter a valid email",
    minLength: "Must be at least {{length}} characters",
    maxLength: "Must be less than {{length}} characters",
    passwordMatch: "Passwords must match",
    fillAllFields: "Please fill in all fields"
  },
  basket: {
    title: "Shopping Cart",
    itemCount: "{{count}} Courses in Cart",
    empty: "Your cart is empty",
    total: "Total",
    proceedToPayment: "Payment Details",
    deleteDialog: {
      title: "Delete Item",
      message: "Are you sure you want to remove this item from your cart?",
      confirm: "Yes, Delete"
    }
  },
  auth: {
    userCreatedSuccessfully: "User created successfully",
    errorOccurred: "An error occurred",
    profileUpdateSuccess: "Profile updated successfully",
    profileUpdateError: "Error updating profile",
    passwordUpdateSuccess: "Password updated successfully",
    passwordUpdateError: "Error updating password"
  }
}

