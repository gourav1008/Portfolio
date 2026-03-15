# 🖥️ DevOS v2.0 - Personal Cloud Operating System

[![Vercel Deployment](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://gouravgupta.vercel.app/)
[![React Version](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> **A premium, high-performance web-based operating system built to showcase modern engineering paradigms.**

Welcome to **DevOS**, a web-based "Desktop environment" that simulates a production OS experience directly in the browser. This project is more than just a portfolio—it's an interactive lab demonstrating real-time systems, complex state management, and fluid UI/UX design.

🔗 **Live Experience:** [https://gouravgupta.vercel.app/](https://gouravgupta.vercel.app/)

---

## 🌟 Key Features

DevOS comes packed with a suite of integrated "Applications" that demonstrate different facets of full-stack engineering:

- 📊 **Real-time Dashboard**: Live performance metrics and system stats using React Context and Recharts.
- 🐚 **Integrated Terminal**: Fully functional shell simulation (powered by xterm.js) with custom command handling.
- 📐 **Architecture Viewer**: Interactive visualization of the MERN stack flow using ReactFlow.
- 🧪 **DevLab**: A sandbox for WebSocket-based real-time chat and advanced Framer Motion physics simulations.
- 📑 **API Documentation**: A Postman-style interface for exploring the backend REST ecosystem.
- 📱 **Fully Responsive**: Optimized for every screen size, featuring a "Forced Maximized" mobile mode for smaller viewports.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) (Vite)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: React Context API & Custom Hooks
- **Visuals**: Lucide React Icons, Google Fonts (Inter, JetBrains Mono)

### Backend (Lab/API)
- **Runtime**: [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose)
- **Real-time**: [Socket.io](https://socket.io/)
- **Deployment**: [Vercel](https://vercel.com/) (Client) & [Render](https://render.com/) (Server)

---

## 🚀 Getting Started

To run this project locally and explore the code:

### 1. Clone the Repository
```bash
git clone https://github.com/gourav-gupta/personal-portfolio.git
cd personal-portfolio
```

### 2. Install Dependencies
```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 3. Environment Variables
Create a `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:5000
```

### 4. Start the Dev Servers
```bash
# In the client directory
npm run dev

# In the server directory (separate terminal)
npm run dev
```

---

## 👨‍💻 Author

**Gourav Gupta**  
*Full Stack Software Engineer*

- **GitHub**: [@gourav-gupta](https://github.com/gourav-gupta)
- **Website**: [gouravgupta.vercel.app](https://gouravgupta.vercel.app/)

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*Handcrafted with ❤️ and a lot of JavaScript.*
