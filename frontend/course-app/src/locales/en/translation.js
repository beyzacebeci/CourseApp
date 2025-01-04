export default {
  common: {
    welcome: "Welcome",
    hello: "Hello",
    login: "Sign In",
    register: "Sign Up",
    logout: "Logout"
  },
  nav: {
    home: "Home",
    about: "About",
    contact: "Contact",
    educator: "Educator",
    courses: "Courses",
    profile: "My Profile"
  },
  orders: {
    title: "My Orders",
    orderId: "Order ID",
    purchasedCourses: "Purchased Courses",
    totalPrice: "Total Price"
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
      general: "An error occurred"
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
      deleteError: "Failed to delete course"
    }
  },
  home: {
    welcome: "Welcome, {{username}}!"
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
    error: "An error occurred during login"
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
  }
}

