# 🚗 Uber Clone — Full Stack Ride Booking Platform

This repository presents a **full-stack Uber clone** that replicates the core functionalities of the popular ride-hailing service.  
It features a **React + Vite** frontend integrated with **OpenStreetMap** and a **Node.js + Express.js** backend with **MongoDB**, enabling both **users and captains (drivers)** to experience real-time ride booking, tracking, and authentication workflows.

---

## 🎯 Project Objectives

The primary goal of this project is to create a scalable, real-world simulation of a ride-booking system that enables:

- 🧍‍♀️ **Users** to book, track, and manage rides in real time  
- 🚖 **Captains (Drivers)** to accept or reject rides and manage trips  
- 🗺️ **Live location mapping** powered by OpenStreetMap  
- 🔐 **Secure authentication** for both user and captain dashboards  
- ⚡ **Modular backend APIs** designed for future expansion and microservices  

Through this open-source initiative, we aim to:

- Understand and replicate end-to-end ride-hailing workflows  
- Implement map-based UI and real-time location systems  
- Build a developer-friendly, extensible codebase for contributions  
- Encourage collaboration through **Commit & Conquer Open Source Event**  

---

## 🧱 System Architecture Overview

The project follows a **client–server architecture**:

- **Frontend (React + Vite)** — Provides user and captain interfaces with real-time map rendering  
- **Backend (Node.js + Express)** — Manages authentication, ride logic, and data persistence  
- **Database (MongoDB)** — Stores user, captain, and vehicle data  
- **Map Integration (OpenStreetMap + React Leaflet)** — Powers geolocation and route visualization  

---

## 📁 Project Structure
<img width="888" height="584" alt="Screenshot 2025-10-21 195513" src="https://github.com/user-attachments/assets/21b7509b-1f2e-4cc9-9227-713ae30abb25" />

  
---

## 🧠 Core Features

### 👤 User Functionalities
- Register/Login via JWT-based authentication  
- Search and book rides using pickup & destination  
- Track ride status in real time  
- Access ride history and profile info  

### 🚗 Captain (Driver) Functionalities
- Authentication with separate login/signup  
- Accept or reject ride requests  
- Navigate to pickup and drop locations  
- Track ride history and total earnings  

### 🗺️ Map & Real-Time Features
- Integrated with **OpenStreetMap**  
- Dynamic **route visualization** using Leaflet  
- **Address autocomplete** for pickup/destination  
- Real-time **location tracking and markers**  

---

## ⚙️ How to Run the Project

### 🖥️ Frontend Setup
1. Navigate to frontend folder  
   ```bash
   cd frontend
2. Install dependencies
    ```bash
   npm install
3. Create .env file
    ```bash
    VITE_BASE_URL=http://localhost:4000
4. Run development server
    ```bash
    npm run dev
    
### ⚙️ Backend Setup

1. Navigate to backend folder
   ```bash
   cd Backend
2. Install dependencies   
   ```bash
   npm install
3. Create .env file
   ```bash
   PORT=4000
   DB_CONNECT=mongodb://0.0.0.0/uber-clone
   JWT_SECRET=user-clone-secret
4. Start the backend server using nodemon
   ```bash
   npx nodemon
  The server will automatically restart on code changes.
  
---  

📘 API Overview
---
<img width="828" height="350" alt="Screenshot 2025-10-21 195855" src="https://github.com/user-attachments/assets/ca204667-ae3e-4064-950e-1b8bf6b7694c" />


---
<img width="857" height="356" alt="Screenshot 2025-10-21 195948" src="https://github.com/user-attachments/assets/f118d5de-4cb9-4fc3-bd4d-56374936b16a" />

---
## 🧩 Tech Stack
- **Frontend:**	React 19.1.0, Vite, Tailwind CSS, React Router, Axios
- **Backend:**	Node.js, Express.js, MongoDB, Mongoose
- **Auth:**	JWT (JSON Web Tokens)
- **Mapping:**	OpenStreetMap, React Leaflet
- **State Management:** React Context API
- **Styling:**	Tailwind CSS
  
---  

## 📈 Future Roadmap
### 🚀 Upcoming Improvements
 - 🌐 Deploy frontend on Vercel and backend on Render/Heroku
 - 🔔 Add real-time ride updates using Socket.io
 - 💳 Implement fare estimation and payment gateway
 - 📱 Create Admin Dashboard for analytics
 - 🌍 Add multilingual support and responsive UI
 - 🤝 Open Source Contribution Guide

---

## 📌 Real-World Insights

Our implementation highlights:
 - Seamless frontend-backend integration using REST APIs
 - Efficient state management with React Context API
 - Clear separation of concerns for scalability
 - Real-time map functionality using open-source mapping tools

This system demonstrates a realistic ride-hailing experience and can serve as a foundation for further innovations in mobility tech.

---
## 📜 License

This project is licensed under the MIT License.
Please review the LICENSE file for details.

---
## 📬 Contact

For contributions, queries, or collaborations related to open-source initiatives, reach out via:

GitHub: @Kajal09kumari

---

## 💎 Acknowledgments

- OpenStreetMap for providing real-time geodata
- React Leaflet for interactive mapping
- Tailwind CSS for modern UI design
- Express.js + MongoDB for robust backend architecture
 

