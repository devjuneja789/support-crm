# Datastraw Support CRM System

A full-stack web application designed for customer support ticket management, built as part of the Datastraw AI + Tech Intern Assessment  

---

## Features

* **Ticket Creation**: Generates unique, formatted ticket identifiers (e.g., `TKT-0001`) with customer details and issue descriptions v
* **Ticket Dashboard**: Displays all support tickets with date stamps and real-time status badges (`Open`, `In Progress`, `Closed`)  
* **Instant Search & Filtering**: Filters tickets by status and performs multi-field queries across customer names, emails, subjects, IDs, and descriptions  
* **Detailed Ticket Management & Notes**: View individual tickets, update their progress status, and append timestamped internal activity notes  

---

## Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React, Vite, Tailwind CSS[cite: 1] |
| **Backend** | Node.js, Express[cite: 1] |
| **Database** | PostgreSQL (or MongoDB)[cite: 1] |
| **Deployment** | Render / Railway / Vercel[cite: 1] |

---

## Architecture & File Structure

```text
support-crm/
├── backend/
│   ├── src/
│   ├── schema.sql           # Database schema[cite: 1]
│   ├── server.js            # Application entry point
│   ├── Dockerfile           
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── Dockerfile           
│   ├── nginx.conf           
│   └── package.json
│
└── README.md
```

---

## REST API Specifications

| Method | Endpoint | Description | Payload / Query |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/tickets` | Create a new ticket[cite: 1] | Body: `{ customer_name, customer_email, subject, description }`[cite: 1] |
| `GET` | `/api/tickets` | Retrieve tickets list[cite: 1] | Query: `?status=Open&search=query`[cite: 1] |
| `GET` | `/api/tickets/:ticket_id` | Fetch ticket details & associated notes[cite: 1] | Params: `ticket_id`[cite: 1] |
| `PUT` | `/api/tickets/:ticket_id` | Update status & attach internal notes[cite: 1] | Body: `{ status, notes }`[cite: 1] |

---

## Local Setup & Development

### 1. Database Setup
Create your database and run the schema initialization script[cite: 1]:
```bash
createdb crm_db
psql -d crm_db -f backend/schema.sql
```

### 2. Backend Configuration
Navigate to the backend directory, install dependencies, and configure environment variables[cite: 1]:
```bash
cd backend
npm install
```

Create a `backend/.env` file[cite: 1]:
```env
PORT=5000
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/crm_db
NODE_ENV=development
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Configuration
Navigate to the frontend directory, install dependencies, and setup local environment references:
```bash
cd frontend
npm install
```

Create a `frontend/.env.local` file:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the Vite development web server:
```bash
npm run dev
```