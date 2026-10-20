# Garden Booking Platform

> **Repository migration in progress:** The Angular and Express source files are being transferred. Binary assets from `frontend/src/assets/` and the complete demo database are not available in this snapshot yet; a fresh checkout is not ready to run. The original private project remains intact.


A full-stack university project for booking garden landscaping and maintenance services, developed for the Internet Applications Programming (PIA) course at the University of Belgrade, Faculty of Electrical Engineering.

## Features

- Registration, login, password updates, and user profiles
- Three user roles: garden owners, decorators, and administrators
- Landscaping company listings and service details
- Garden landscaping and maintenance reservations
- Booking management and decorator statistics
- Administrative review and management of user registration requests

## Technology stack

| Component | Technologies |
| --- | --- |
| Frontend | Angular 16, TypeScript, Angular Material, Bootstrap |
| Backend | Node.js, Express 4, TypeScript |
| Database | MongoDB, Mongoose |
| Other UI libraries | Chart.js, Angular Calendar |

## Project structure

```text
.
├── backend/
│   ├── src/               # API routes, controllers, models and server
│   ├── package.json
│   ├── package-lock.json
│   └── tsconfig.json
├── frontend/
│   ├── src/               # Angular application and assets
│   ├── angular.json
│   ├── package.json
│   ├── package-lock.json
│   └── tsconfig*.json
├── database/                  # MongoDB JSON exports for the course demonstration
├── .gitignore
└── README.md
```

## Running locally

### Prerequisites

- Node.js and npm (Angular 16; use a compatible Node.js release, such as Node.js 18)
- MongoDB Community Server, running locally
- Optional: MongoDB Database Tools to import sample data

The project uses a local MongoDB database at `mongodb://127.0.0.1:27017/garden`, an API at `http://localhost:4000`, and a frontend at `http://localhost:4200`.

### 1. Start MongoDB

Start the MongoDB server/service on your machine. The backend's database connection is configured in `backend/src/server.ts`.

### 2. Start the backend

In a terminal opened at the repository root:

```bash
cd backend
npm ci
npm run build
npm start
```

The build command compiles TypeScript into `backend/dist/`, and `npm start` runs the compiled Express server.

### 3. Start the frontend

In another terminal opened at the repository root:

```bash
cd frontend
npm ci
npm start
```

Open `http://localhost:4200` in a web browser.

### 4. Optional: load the demo data

The `database/` directory contains MongoDB exports for the academic demonstration. The database can be created by MongoDB on first use, but meaningful interaction with company lists, test accounts and reservations requires sample records.

The provided datasets use fictional demo accounts, test contact details and sample records. Import each collection with MongoDB Database Tools. For example, from the repository root:

```bash
mongoimport --db garden --collection users --file database/garden.users.json --jsonArray
mongoimport --db garden --collection firms --file database/garden.firms.json --jsonArray
```

Similarly named JSON files represent other collections. Review existing collections before importing to avoid duplicate records.

**Demo data:** The included accounts, contacts and card numbers are intentionally fictional. Use these records for local development only; never deploy the sample accounts or credentials to a production system.

## Tests and development

- Frontend development server: `npm start` from `frontend/`.
- Angular unit tests: `npm test` from `frontend/`.
- Backend TypeScript compilation: `npm run build` from `backend/`.
- Build artifacts, the Angular cache, and installed dependencies are excluded via `.gitignore`.

## Scope

This is an academic project, not a security-audited production system. Authentication, access control, input validation, and the handling of sensitive information need further review before a real-world deployment.

## Course

Internet Applications Programming (PIA), University of Belgrade, School of Electrical Engineering.
