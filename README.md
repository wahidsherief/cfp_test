# CFP ENERGY TEST: CRUD APP

## Overview

* Web application with 3 main screens: Home, Add User, and Update User.
* Home screen displays a table listing all users.
* Add User screen allows adding new users with a form.
* Edit existing user information through the Update User screen.
* Delete user records permanently from the system.
* **Dockerized Development:** This application is designed for development and deployment using Docker containers.

## Backend

### Technologies Used
- Laravel 10
- PHP 8.1
- MySQL

### Contributions
- **RESTful API Development:** Wrote UserController.
  
- **Efficient Database Queries:** Used Eloquent query for optimized database interactions.
  
- **Request Validation:** Implemented Laravel's Form Request Validation class to write validation rules and message for data validation.
  
- **Controller Method Design:** Utilized guard clauses (early returns) and private methods that ensures single responsibility principle.
  
- **Unit Testing:** Integrated unit tests for UserController methods.

### Installation and Usage (Locally)

1. Clone the repository.
2. Navigate to the backend directory.
3. Install dependencies: `composer install`
4. Set up environment variables: Copy `.env.example` to `.env` and configure.
   - **Docker Compatibility:** For Docker compatibility, update `DB_HOST=database` in the `.env` file.
5. Run migrations: `php artisan migrate`
6. Start the server: `php artisan serve`

## Frontend

### Technologies Used
- React
- Material-UI
- Axios
- Vite

### Contributions
- **Interactive UI:** Developed with React for an intuitive user experience.
  
- **Material Design Components:** Utilized Material-UI for consistent & responsive design.
  
- **Asynchronous Data Fetching:** Used Axios.
  
- **Context API for State Management:** Implemented for efficient centralize data management.
  
- **Enhanced UX:** Incorporated loading indicators, alerts, and snackbars for feedback from Material-UI.

### Installation and Usage

1. Navigate to the frontend directory.
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Docker Compose Guide

**Run the application:**
   
   `docker-compose up -d`
   
   This will build and start the backend and frontend containers, making the application accessible through the specified ports (8081 for backend and 5173 for frontend).

**Stop the application:**
   
   `docker-compose down`

