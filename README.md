BookKeeper 📚
=============

**BookKeeper** is a modern web application that allows users to manage their personal book collection. Users can add, update, and view details about their books, including series information, author details, genre, rating, and more. This app is built with React (using Vite for faster development) on the front end and Node.js with Express and MongoDB on the back end.

🚀 Getting Started
------------------

### Prerequisites

Before you begin, ensure you have the following installed:

-   [Node.js](https://nodejs.org/) (version 14.x or later)
-   [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation

1.  **Clone the repository:**

    bash

    Copy code

    `git clone https://github.com/your-username/bookkeeper.git
    cd bookkeeper`

2.  **Install dependencies for the front end:**

    Navigate to the root directory and run:

    bash

    Copy code

    `npm install`

3.  **Install dependencies for the back end:**

    Navigate to the `backend` directory and run:

    bash

    Copy code

    `cd backend
    npm install`

### Starting the Development Servers

1.  **Run the front-end development server:**

    From the root directory, run:

    bash

    Copy code

    `npm run dev`

    This will start the Vite development server. You can view the app in your browser at `http://localhost:5173`.

2.  **Run the back-end server using Nodemon:**

    In a separate terminal, navigate to the `backend` directory and run:

    bash

    Copy code

    `cd backend
    nodemon server.js`

    The back-end server will start, and you can view the API endpoints at `http://localhost:5000`.

📝 Description
--------------

**BookKeeper** is designed to make managing your book collection a breeze. With this app, you can:

-   Add books to your collection with details such as title, author, genre, and cover image.
-   Mark books as part of a series, and indicate your favorites.
-   Update book information, including status (Wishlist, Not Started, Reading, Completed) and rating.
-   View your entire collection at a glance with cover images and key details.

This project is perfect for book lovers who want a digital library to track their reading journey.

🛠️ Technologies Used
---------------------

-   **Front End:**

    -   [React](https://reactjs.org/) with [Vite](https://vitejs.dev/)
    -   [Material-UI](https://mui.com/) for styling
    -   [Axios](https://axios-http.com/) for API requests
-   **Back End:**

    -   [Node.js](https://nodejs.org/)
    -   [Express.js](https://expressjs.com/)
    -   [MongoDB](https://www.mongodb.com/) for database
    -   [Nodemon](https://nodemon.io/) for development

👨‍💻 Developer
---------------

-   **Hritik Pawar**
    -   [GitHub](https://github.com/hritikpawar)
    -   [LinkedIn](https://www.linkedin.com/in/hritikpawar/)

🤝 Contributing
---------------

We welcome contributions from the community! Feel free to fork this repository, submit a pull request, or open an issue if you find any bugs or have suggestions for new features. Let's make **BookKeeper** even better together!

### How to Contribute

1.  Fork the project.
2.  Create your feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add some amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

📄 License
----------

This project is open-source and available under the MIT License.
