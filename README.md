# campusHub - Full-Stack Event Booking Platform

**campusHub — connecting students with opportunities.** campusHub is a full-stack MERN application that allows users to seamlessly browse, register, and pay natively without any third-party tools. It features an administrative dashboard for event organizers to create and manage free and paid events. All bookings can be managed manually by an admin to handle payments directly.

## Features
* **User Authentication**: Secure login & registration with JWT and bcrypt.
* **2FA OTP Verification**: 
  * Mandatory Email OTP to activate your account upon Registration (or delayed login attempts).
  * Mandatory Email OTP to finalize and secure event ticket booking.
* **Role-Based Access**: 
  * **Admin**: Create, edit, and delete events. Confirm and reject all incoming booking requests, mark them as 'Paid' or 'Not Paid'. Access is strictly locked to database-flagged users only.
  * **User**: Browse events, submit ticket booking requests via OTP, view personal dashboard pending status, and cancel bookings.
* **Event Management**: Create free and paid events with detailed descriptions, external image URLs, dates, categories, and seating capacity.
* **Smart Booking System**:
  * Mandatory 2FA OTP to authorize a booking request.
  * All booking requests (both free and paid) enter a secure 'Pending' queue for Admin verification.
  * Seat availability accurately updates and securely validates against overbooking logic.
* **Admin Analytics Dashboard**: Track live data such as Pending Requests, Total Revenue, and Total Confirmed Paid Clients directly from the admin panel.
* **Email Notifications**: Automated email delivery upon successful booking confirmation using Nodemailer.
* **Sleek UI/UX**: Built entirely with React, Tailwind CSS, and polished with micro-interactions.

---

## 🚀 Setup Instructions

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.
You will also need a MongoDB database (e.g., [MongoDB Atlas Free Tier](https://www.mongodb.com/cloud/atlas/register)).

### 1. Environment Variables Configuration
Navigate to `server/.env` and fill in the necessary keys:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=supersecretjwtkey_campushub
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
PORT=5000

```

> **Note**: For `EMAIL_PASS`, you need to generate an "App Password" from your Google Account settings; standard passwords won't work due to 2FA.

### 2. Run from Outer Folder (Single Terminal)

You can now manage both backend and frontend from the project root:

```bash
# from campusHub root
npm install
npm run install:all
npm run dev

```

* `npm run dev` starts both `server` and `client` together using `concurrently`.
* `npm run dev:all` installs dependencies (server + client) and starts both in one command.
* `npm run start` runs backend `start` + frontend `preview` together.

### 3. Install Dependencies (Manual)

Open two separate terminals for the backend and frontend.

**Backend Terminal:**

```bash
cd server
npm install --legacy-peer-deps

```

**Frontend Terminal:**

```bash
cd client
npm install

```

### 4. Run the Application Local Servers

**Run Backend:**

```bash
cd server
npm run dev

```

*(Server will run on `http://localhost:5000`)*

**Run Frontend:**

```bash
cd client
npm run dev

```

*(Client will run on a local port provided by Vite, typically `http://localhost:5173`)*

```

---

### 2. `architecture.md`
```md
# 🏗️ Architecture Overview — campusHub

## High-Level Architecture

```text
┌─────────────────────────────────────────────────────┐
│                    CLIENT (React)                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐   │
│  │ User UI  │  │ Admin UI │  │ Tailwind CSS     │   │
│  └──────────┘  └──────────┘  └──────────────────┘   │
│  ┌──────────┐  ┌──────────┐                         │
│  │ Context  │  │ Axios    │                         │
│  │ (State)  │  │ (HTTP)   │                         │
│  └──────────┘  └──────────┘                         │
└───────────────────────┬─────────────────────────────┘
                        │ REST API (JSON) + JWT Auth
                        │ Port 5173 → Proxy → 5000
┌───────────────────────┴─────────────────────────────┐
│                   SERVER (Express)                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐   │
│  │ Routes   │→ │Controller│→ │ Booking Logic    │   │
│  └──────────┘  └──────────┘  └────────┬─────────┘   │
│  ┌──────────┐  ┌──────────┐           │             │
│  │ Auth/JWT │  │ Nodemailer│◀─────────┘             │
│  └──────────┘  └─────┬────┘                         │
│                      │                              │
│              ┌───────┴───────────┐                  │
│              │   MongoDB Atlas   │                  │
│              │  (Users/Events)   │                  │
│              └───────────────────┘                  │
└─────────────────────────────────────────────────────┘

```

---

## Tech Stack

| Layer | Technology | Purpose |
| --- | --- | --- |
| Frontend | React (Vite) | UI rendering & User Dashboard |
| Styling | Tailwind CSS | Utility-first responsive CSS |
| State | React Context / Hooks | State management |
| HTTP Client | Axios | API communication |
| Backend | Node.js + Express.js | REST API server |
| Database | MongoDB (Mongoose) | NoSQL Data storage |
| Authentication | JWT + bcrypt | Secure stateless auth |
| Email Service | Nodemailer | SMTP OTP and Confirmations |
| Architecture | MVC (Model-View-Controller) | Clean separation of concerns |

---

## Data Flow & Booking Logic

The booking system operates on a strict 3-phase flow to ensure security and prevent overbooking:

### 1. OTP Flow

1. **User** requests a booking OTP.
2. **Server** verifies the User via JWT, generates an OTP, and saves it (5 min TTL).
3. **Nodemailer** dispatches the OTP to the user's registered email via Gmail SMTP.

### 2. Booking Flow (Pending State)

1. **User** submits the Event ID alongside the received OTP.
2. **Server** validates the user, OTP, and checks for existing duplicate bookings.
3. A pending booking is created in MongoDB, and the used OTP is deleted.

### 3. Admin Flow (Confirmation)

1. **Admin** reviews the pending queue and triggers confirmation (marking it as paid if applicable).
2. **Server** updates the booking status and decrements `availableSeats` on the Event model.
3. **Nodemailer** sends a final Confirmation Email to the user.

```
