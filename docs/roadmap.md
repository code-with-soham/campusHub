# 🗺️ Development Roadmap — campusHub

## Vision
Build a centralized hub for university students to discover, book, and attend campus events safely and securely. campusHub bridges the gap between event organizers and students natively, removing the need for third-party ticketing platforms.

---

## Phase 1 — Project Foundation & Auth ✅

> **Goal**: Set up the full-stack MERN project with secure, OTP-based authentication.

* [x] Express.js server with MVC architecture
* [x] MongoDB database connection & schemas (Users, Events, Bookings)
* [x] JWT + bcrypt authentication flow
* [x] Nodemailer integration for SMTP emails
* [x] 2FA OTP generation for account registration
* [x] Vite + React scaffold with Tailwind CSS styling

---

## Phase 2 — Event Management Core 🔲

> **Goal**: Build complete CRUD capabilities for events with role-based access.

* [ ] Event Schema (`title`, `description`, `date`, `totalSeats`, `ticketPrice`)
* [ ] Admin middleware to protect event creation routes
* [ ] Frontend Event Dashboard (Grid layout for browsing)
* [ ] Event Details page with rich media support
* [ ] Admin UI for creating/editing events

---

## Phase 3 — Smart Booking Engine 🔲

> **Goal**: Implement the secure, 3-step booking flow to prevent overbooking and fraud.

* [ ] Booking OTP generation route (`/api/bookings/send-otp`)
* [ ] Ticket request validation (checking duplicates, capacity limits)
* [ ] Pending Booking queue system
* [ ] Admin confirmation endpoint (`/api/bookings/:id/confirm`)
* [ ] Concurrency handling for seat availability decrementing
* [ ] Automated email dispatches for OTP and Booking Confirmations

---

## Phase 4 — Admin & User Dashboards 🔲

> **Goal**: Provide detailed, data-rich interfaces for both organizers and attendees.

* [ ] **User Dashboard**: View pending, confirmed, and past event bookings.
* [ ] **Admin Analytics**: Live stats (Total Revenue, Pending Requests, Confirmed Clients).
* [ ] Admin interface to quickly Accept/Reject pending bookings.
* [ ] UI Polish (Loading skeletons, error toasts, empty states).

---

## Phase 5 — Polish & Deploy 🔲

> **Goal**: Production-ready deployment with optimizations.

* [ ] SEO meta tags for public event pages
* [ ] Environment variable lockdown (Production MongoDB/SMTP credentials)
* [ ] Deploy frontend (Vercel/Netlify)
* [ ] Deploy backend (Render/Railway)
* [ ] Cross-browser and responsive mobile testing