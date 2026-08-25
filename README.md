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
| **Frontend** | React, Vite, Tailwind CSS   |
| **Backend** | Node.js, Express   |
| **Database** | PostgreSQL (or MongoDB)   |
| **Deployment** | Render / Railway / Vercel   |

---

## Architecture & File Structure

```text
support-crm/
├── backend/
│   ├── src/
│   ├── schema.sql           # Database schema  
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
| `POST` | `/api/tickets` | Create a new ticket   | Body: `{ customer_name, customer_email, subject, description }`   |
| `GET` | `/api/tickets` | Retrieve tickets list   | Query: `?status=Open&search=query`   |
| `GET` | `/api/tickets/:ticket_id` | Fetch ticket details & associated notes   | Params: `ticket_id`   |
| `PUT` | `/api/tickets/:ticket_id` | Update status & attach internal notes   | Body: `{ status, notes }`   |

---

## Local Setup & Development

### 1. Database Setup
Create your database and run the schema initialization script  :
```bash
createdb crm_db
psql -d crm_db -f backend/schema.sql
```

### 2. Backend Configuration
Navigate to the backend directory, install dependencies, and configure environment variables  :
```bash
cd backend
npm install
```

Create a `backend/.env` file  :
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