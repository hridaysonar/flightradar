# ✈️ Flight Tur – A Complete Flight Booking Platform for the Modern Traveler

Welcome to **Flight Tur**, an advanced and visually compelling flight booking platform that reimagines how users discover and manage air travel. With an intuitive UI, responsive design, and seamless user experience, Flight Tur allows users to browse, book, and manage flights with confidence and ease.

Built with the power of **React**, styled with **Tailwind CSS**, and backed by **Firebase**, this platform offers a secure and elegant solution for flight reservations and admin management—all while delivering a lightning-fast and responsive web experience.

---

## 🌍 Live Demo

Experience the application live:

🔗 **[Visit the Live Site →]
https://splendid-dodol-a4cb94.netlify.app/

---

## 🧭 Table of Contents

- [Overview](#-project-overview)
- [Features](#-key-features)
- [Technologies Used](#-technologies-used)
- [Project Structure](#-project-structure)
- [Environment Setup](#-environment-variables)
- [Installation & Setup](#-getting-started)
- [Contact](#-contact)
- [License](#-license)

---

## 📘 Project Overview

**Flight Tur** is a full-stack, single-page application (SPA) designed to serve as a dynamic flight booking system with admin-level management, user authentication, real-time messaging, and beautiful animated UI interactions. This application prioritizes user trust, system scalability, and performance.

### 🎯 Objectives
- Simplify the flight booking process.
- Provide a personalized dashboard for both users and admins.
- Implement secure, role-based access controls.
- Maintain performance, responsiveness, and accessibility across all devices.

---

## ✨ Key Features

### 👥 User Authentication & Roles
- 🔐 **Firebase Authentication** using Email/Password & Google OAuth.
- 🎭 Role-based access: Admin and General User have different permissions and dashboards.
- 🔄 Profile management including avatar, name, and role display.
- 🧑‍💻 Secure login/logout, signup, and password reset flows.

### 🛫 Booking & Flight Management
- 📌 Search and explore available flights by location, date, or airline.
- 📝 Real-time flight booking with confirmation.
- ❌ Ability to cancel a booking from user dashboard.
- 🗂️ Admin dashboard to view, manage, and delete any flight or booking.

### 💬 User Interaction & Feedback
- ✅ Real-time toast feedback using `react-toastify`.
- 🚨 Interactive modal confirmations with `sweetalert2`.
- 📬 In-app messaging and alert systems.
- 📞 Contact form for direct communication.

### 🎨 Modern UI & Accessibility
- 🌗 Toggle-friendly **Dark Mode** support.
- 🔄 On-scroll reveal animations using `react-intersection-observer`.
- 🖼️ Rich Lottie animations to enhance empty states, loading states, and transitions.
- 📱 Fully responsive on mobile, tablet, and desktop.

### 🔍 SEO & Navigation
- 🌐 Dynamic page titles with `react-helmet` to boost SEO.
- 🔐 Protected routes using role-based access control.
- 🚫 Custom 404 error page with redirect options.

---

## 🧰 Technologies Used

### ⚛️ Core Stack

| Technology    | Purpose                                     |
|---------------|---------------------------------------------|
| **React 19**  | Frontend UI library for building components |
| **Vite**      | Fast and modern build tool for development  |
| **Firebase**  | Backend services: Auth, Firestore, Hosting  |
| **Tailwind CSS** | Styling with utility-first approach       |

### 🖼️ UI Enhancements
- `daisyUI`: Pre-built Tailwind components
- `@headlessui/react`: Accessible modal & menu components
- `@stianlarsen/border-beam`: Animated border glow effects
- `lucide-react`, `react-icons`: Icon sets

### 📽️ Animations & Effects
- `lottie-react`: Animated JSON illustrations
- `react-intersection-observer`: Trigger animations on scroll
- `swiper`: Flight carousel/slider
- `react-fast-marquee`: Ticker-style announcements

### 🔧 Utilities & Tools
- `axios`: Promise-based HTTP client
- `sweetalert2`: Stylish alert dialogs
- `react-toastify`: Toast notifications
- `react-router v7`: SPA routing
- `react-helmet`: SEO control via metadata

### 🧪 Development Tools
- `eslint`, `@eslint/js`: Linting and code style
- `vite-plugin-react`: React support for Vite
- `@types/react`, `@types/react-dom`: TypeScript type definitions
- `globals`: Environment variable helper

---

## 📂 Project Structure

