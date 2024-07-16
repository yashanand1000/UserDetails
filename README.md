# User Details Application

This project is a simple web application to collect and store user details like name, email, age, and place. The application consists of a frontend built with React and a backend built with Node.js and Express, connected to a MongoDB database.

## Table of Contents

- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Project Structure


## Installation

### Prerequisites

- Node.js
- npm or yarn
- MongoDB

### Backend Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/yashanand1000/UserDetails.git
    ```

2. Navigate to the `backend` directory:
    ```sh
    cd UserDetails/backend
    ```

3. Install the dependencies:
    ```sh
    npm install
    ```

4. Setup a Mongo DB in the local host machine

5. Start the backend server:
    ```sh
    npm start
    ```

### Frontend Setup

1. Navigate to the `frontend` directory:
    ```sh
    cd ../frontend
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Start the frontend development server:
    ```sh
    npm start
    ```

The application will be running on `http://localhost:3000` and the backend server on `http://localhost:5000`.

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Fill in the user details and submit the form.
3. The details will be saved to the MongoDB database. If the email already exists, the existing user details will be updated.

## API Endpoints

### POST /api/users

Creates a new user or updates an existing user based on the email.

- **URL:** `/api/users`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "name": "Yash",
    "email": "yash@example.com",
    "age": 30,
    "place": "Dhanbad"
  }
