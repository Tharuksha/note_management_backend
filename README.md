# Personal  Notes App Backend

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E=14-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v4.4-blue.svg)](https://www.mongodb.com/)

A robust backend API for a Personal Knowledge Base / Notes App built with **Node.js**, **Express**, and **MongoDB (Mongoose)**. It supports full CRUD for notes, folders (notebooks), and tags, enhanced with secure authentication, real-time updates with Socket.IO, input validation, error handling, export functionality, and more!

---

## Table of Contents

1. [Features](#features)
2. [Project Structure](#project-structure)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Usage](#usage)
7. [API Documentation](#api-documentation)
8. [Security Enhancements](#security-enhancements)
9. [Contributing](#contributing)
10. [License](#license)
11. [Contact](#contact)

---

## Features

- **User Authentication:**  
  - Secure signup and login with JWT-based authentication.
  - Password hashing and token management.

- **Notes Management:**  
  - Create, read, update, and delete notes.
  - Automatic timestamps (`createdAt` and `updatedAt`).
  - Version history for notes, allowing rollback if necessary.
  - Export notes as Markdown (PDF export stub available for future expansion).
  - Real-time updates with Socket.IO events on note changes.

- **Folder & Tag Organization:**  
  - Organize notes with folders (notebooks) and tags.
  - Endpoints for folder and tag management.
  - Input validation and sanitization to prevent NoSQL injection attacks.

- **Search & Filtering:**  
  - Fuzzy search over note titles and content.
  - Filter notes by tags and folders.

- **Enhanced Security:**  
  - Secure HTTP headers via Helmet.
  - Rate limiting via express-rate-limit.
  - Input validation and sanitization with express-validator and express-mongo-sanitize.

- **Scalable & Modular Design:**  
  - Clear separation of concerns: controllers, models, routes, middlewares, and sockets.
  - Easily extendable architecture for future features like collaboration and file attachments.

---

## Project Structure

```
project/
├── app.js                  # Entry point (Express & Socket.IO integration)
├── config.js               # Configuration (env variables, JWT secret, etc.)
├── package.json            # Project dependencies & scripts
├── models/                 # Mongoose models
│   ├── Note.js
│   ├── Folder.js
│   ├── Tag.js
│   └── User.js
├── controllers/            # Controllers containing business logic
│   ├── notesController.js
│   ├── foldersController.js
│   ├── tagsController.js
│   └── authController.js
├── routes/                 # Route declarations for API endpoints
│   ├── notes.js
│   ├── folders.js
│   ├── tags.js
│   └── auth.js
├── middlewares/            # Custom middleware (authentication, logging, error handling)
│   ├── auth.js
│   ├── errorHandler.js
│   └── activityLogger.js
└── sockets/                # Socket.IO integration for real-time updates
    └── index.js
```

---

## Technologies Used

- **Node.js** – JavaScript runtime.
- **Express** – Web framework for Node.js.
- **MongoDB** – NoSQL database.
- **Mongoose** – ODM for MongoDB.
- **Socket.IO** – Real-time communication.
- **JWT** – JSON Web Token for secure authentication.
- **Helmet, CORS, Rate Limiting** – Security middleware.
- **express-validator & express-mongo-sanitize** – Input validation and sanitization.

---

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/notes-backend.git
   cd notes-backend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**

   Create a `.env` file in the root directory with the following variables:

   ```ini
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/notesapp
   JWT_SECRET=yourSecretKey
   NODE_ENV=development
   ```

4. **Run the Application:**

   - For development with live reloading using nodemon:

     ```bash
     npm run dev
     ```

   - Or start normally:

     ```bash
     npm start
     ```

---

## Configuration

The application uses a configuration file (`config.js`) that loads settings from environment variables using [dotenv](https://www.npmjs.com/package/dotenv). Update these values as necessary to suit your environment.

---

## Usage

- **Local Testing:**  
  The server will be available at `http://localhost:3000`. -Default Port is 3000

- **Socket.IO:**  
  Real-time updates will be available on the same port. Connect with a Socket.IO client to `ws://localhost:3000`. -Default Port is 3000

- **Postman:**  
  Use the API documentation below to test each endpoint. Be sure to pass the JWT token in the Authorization header as follows:

  ```
  Authorization: Bearer <YOUR_TOKEN>
  ```

---

## API Documentation

The backend exposes endpoints for authentication, notes, folders, and tags.

### Authentication
- **POST** `/api/auth/signup` – Register a new user.
- **POST** `/api/auth/login` – Authenticate a user and obtain a JWT.

### Notes
- **GET** `/api/notes` – Retrieve all notes.
- **GET** `/api/notes/:id` – Retrieve a specific note by its ID.
- **POST** `/api/notes` – Create a new note.
- **PUT** `/api/notes/:id` – Update an existing note.
- **DELETE** `/api/notes/:id` – Delete a note.
- **GET** `/api/notes/:id/export` – Export a note as Markdown (PDF export stub available).

### Folders
- **GET** `/api/folders` – Retrieve all folders.
- **GET** `/api/folders/:id` – Retrieve a specific folder.
- **POST** `/api/folders` – Create a new folder.
- **PUT** `/api/folders/:id` – Update an existing folder.
- **DELETE** `/api/folders/:id` – Delete a folder.

### Tags
- **GET** `/api/tags` – Retrieve all tags.
- **GET** `/api/tags/:id` – Retrieve a specific tag.
- **POST** `/api/tags` – Create a new tag.
- **PUT** `/api/tags/:id` – Update an existing tag.
- **DELETE** `/api/tags/:id` – Delete a tag.

_For detailed request payloads and responses, please refer to the inline documentation in the code or your Postman collection._

---

## Security Enhancements

This application integrates several security best practices:

- **Input Sanitization:**  
  Uses [express-mongo-sanitize](https://www.npmjs.com/package/express-mongo-sanitize) to prevent NoSQL injection attacks.

- **Secure HTTP Headers:**  
  Configured via [Helmet](https://www.npmjs.com/package/helmet) to set secure HTTP headers.

- **Rate Limiting:**  
  Implemented using [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) to mitigate brute-force and DoS attacks.

- **Input Validation:**  
  All endpoints enforce input validations using [express-validator](https://www.npmjs.com/package/express-validator).

---

## Contributing

Contributions, bug fixes, and feature requests are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create your feature branch:  
   `git checkout -b feature/my-feature`
3. Commit your changes:  
   `git commit -am 'Add some feature'`
4. Push to the branch:  
   `git push origin feature/my-feature`
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

**Your Name**  
Email: your.email@example.com  
GitHub: [@yourusername](https://github.com/Tharuksha)

---

*Happy coding and enjoy building your Personal Notes App!*
