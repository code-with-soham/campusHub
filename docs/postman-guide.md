# 📮 API Testing Guide — Postman

This guide walks you through testing the **campusHub** backend API using [Postman](https://www.postman.com/).

---

## Setup

### 1. Start the Backend Server
```bash
cd server
npm install
npm run dev

```

The server should start on `http://localhost:5000`.

### 2. Create a Postman Environment

Create a new environment in Postman with the following variables:

| Variable | Initial Value |
| --- | --- |
| `base_url` | `http://localhost:5000` |
| `token` | *(Leave blank)* |
| `event_id` | *(Leave blank)* |
| `booking_id` | *(Leave blank)* |

---

## API Endpoints

### 1. Authentication

**Register User**

* **POST** `{{base_url}}/api/auth/register`
* **Body**: `{"name": "Test User", "email": "test@example.com", "password": "password123"}`

**Verify Account OTP**

* **POST** `{{base_url}}/api/auth/verify-otp`
* **Body**: `{"email": "test@example.com", "otp": "123456"}`

**Login**

* **POST** `{{base_url}}/api/auth/login`
* **Body**: `{"email": "admin@campushub.com", "password": "password123"}`
* *Note: The token from the response should be saved to your `token` environment variable.*

---

### 2. Events

**Get All Events**

* **GET** `{{base_url}}/api/events`

**Create Event (Admin Only)**

* **POST** `{{base_url}}/api/events`
* **Headers**: `Authorization: Bearer {{token}}`
* **Body**:

```json
{
    "title": "Tech Conference 2026",
    "description": "A massive conference for students",
    "date": "2026-12-01",
    "location": "Campus Main Hall",
    "category": "Technology",
    "totalSeats": 100,
    "ticketPrice": 500
}

```

---

### 3. Bookings & OTP

**Send Booking OTP Request**

* **POST** `{{base_url}}/api/bookings/send-otp`
* **Headers**: `Authorization: Bearer {{token}}`

**Verify & Request Booking**

* **POST** `{{base_url}}/api/bookings`
* **Headers**: `Authorization: Bearer {{token}}`
* **Body**: `{"eventId": "{{event_id}}", "otp": "123456"}`

**Confirm Booking (Admin Only)**

* **PUT** `{{base_url}}/api/bookings/{{booking_id}}/confirm`
* **Headers**: `Authorization: Bearer {{token}}`
* **Body**: `{"paymentStatus": "paid"}`

```

---
