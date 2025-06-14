# ConciseURL

ConciseURL is a modern, full-stack URL shortener that transforms long, unwieldy links into concise, shareable URLs. Built with **React**, **Node.js**, and **MongoDB**, it features a beautiful UI, real-time analytics, and a seamless user experience.

![ConciseURL Screenshot](frontend/public/vite.svg)

## ✨ Features

- **Instant URL Shortening**: Paste your long URL and get a short link in seconds.
- **Analytics Dashboard**: Track clicks and manage all your shortened URLs.
- **Copy to Clipboard**: One-click copy for easy sharing.
- **Responsive Design**: Works great on desktop and mobile.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/conciseurl.git
cd conciseurl
```

### 2. Backend Setup

```sh
cd backend
npm install
```

- Create a `.env` file in `backend/` with:
  ```
  MONGO_URI=your_mongodb_connection_string
  PORT=3000
  ```

- Start the backend server:
  ```sh
  node index.js
  # or for development with auto-reload:
  npx nodemon index.js
  ```

### 3. Frontend Setup

```sh
cd ../frontend
npm install
npm run dev
```

- Visit [http://localhost:5173](http://localhost:5173) in your browser.

## 🛠️ Project Structure

```
backend/
  index.js        # Express API & URL logic
  db.js           # Mongoose models & MongoDB connection
frontend/
  src/
    components/   # React components (UrlShortener, UrlList)
    App.jsx       # Main app
    main.jsx      # Entry point
```

## 📦 Tech Stack

- **Frontend**: React, Tailwind CSS, Vite
- **Backend**: Node.js, Express, Mongoose, nanoid
- **Database**: MongoDB

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

[MIT](LICENSE)

---

Made with ❤️ by [Your Name]
