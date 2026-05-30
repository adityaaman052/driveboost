# 🚗 DriveBoost — Toyota Sales Incentive Management System

DriveBoost is a full-stack role-based sales incentive management platform built for managing Toyota vehicle sales, monthly incentive calculations, sales analytics, and administrative reporting.

The system enables Sales Officers to submit monthly sales data while allowing Admins to manage incentive slabs, car models, analytics, and reports through a secure dashboard.

---

# ✨ Features

## 🔐 Authentication & Role Management

* Clerk Authentication Integration
* Secure Login & Signup
* Role-Based Access Control (RBAC)
* Dynamic role selection (Admin / Sales Officer)
* Protected Admin & Sales routes

---

## 👨‍💼 Admin Features

* Admin Dashboard
* Sales Analytics Overview
* Monthly Reports
* Incentive Slab Management
* Car Model Management
* Performance Visualization Charts
* Persistent Database Storage

---

## 👨‍🔧 Sales Officer Features

* Monthly Sales Entry
* Automatic Incentive Calculation
* Incentive Slab Detection
* Sales History Tracking
* Month & Year Selection
* Persistent Monthly Data
* Editable Monthly Sales Records

---

## 📊 Analytics & Reporting

* Total Cars Sold
* Sales Entry Tracking
* Incentive Estimation
* Monthly Report Filtering
* Sales Trend Visualization
* Car-wise Sales Breakdown

---

# 🛠️ Tech Stack

## Frontend

* Next.js 16 (App Router)
* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* Recharts

## Backend

* Next.js Server Actions
* Prisma ORM
* PostgreSQL (Supabase)

## Authentication

* Clerk Authentication

## Deployment

* Vercel

---

# 🧠 System Workflow

## Admin Workflow

1. Login using Clerk Authentication
2. Select Admin role
3. Access Admin Dashboard
4. Manage car models
5. Configure incentive slabs
6. Monitor analytics & reports
7. Track sales performance

---

## Sales Officer Workflow

1. Login using Clerk Authentication
2. Select Sales Officer role
3. Choose month & year
4. Enter vehicle sales quantities
5. View automatic incentive calculations
6. Save monthly sales data
7. Access previous sales history

---

# 📁 Project Structure

```bash
src/
│
├── app/
│   ├── admin/
│   ├── sales/
│   ├── guide/
│   ├── api/
│   └── select-role/
│
├── components/
│   ├── admin/
│   ├── sales/
│   └── ui/
│
├── lib/
│   ├── prisma.ts
│   ├── getCurrentUser.ts
│   └── syncUser.ts
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
```

---

# 🗄️ Database Design

## User

Stores authenticated platform users.

| Field       | Description             |
| ----------- | ----------------------- |
| id          | Unique user ID          |
| clerkUserId | Clerk authentication ID |
| name        | User name               |
| email       | User email              |
| role        | ADMIN / SALES_OFFICER   |

---

## CarModel

Stores Toyota car models.

| Field      | Description      |
| ---------- | ---------------- |
| modelName  | Car model        |
| variant    | Variant name     |
| baseSuffix | Vehicle category |

---

## IncentiveSlab

Stores sales incentive rules.

| Field           | Description         |
| --------------- | ------------------- |
| minRange        | Minimum sales range |
| maxRange        | Maximum sales range |
| incentivePerCar | Incentive amount    |

---

## SalesEntry

Stores monthly sales records.

| Field      | Description   |
| ---------- | ------------- |
| quantity   | Cars sold     |
| month      | Sales month   |
| year       | Sales year    |
| userId     | Sales officer |
| carModelId | Car model     |

---

# 🔄 Monthly Sales Persistence

The system prevents duplicate monthly entries using:

* Prisma compound unique constraints
* Upsert-based database operations

This ensures:

* One record per user/car/month/year
* Editable monthly sales
* Persistent sales history

---

# 📈 Incentive Calculation Logic

The platform automatically:

1. Calculates total cars sold
2. Detects matching incentive slab
3. Calculates incentive per car
4. Computes total incentive amount

Example:

| Cars Sold | Incentive |
| --------- | --------- |
| 1–3       | ₹1000/car |
| 4–7       | ₹2500/car |
| 8+        | ₹5000/car |

---

# 🚀 Installation & Setup

## 1. Clone Repository

```bash
git clone <your-repository-url>
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create `.env` file:

```env
DATABASE_URL="YOUR_DATABASE_URL"

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="YOUR_CLERK_PUBLISHABLE_KEY"

CLERK_SECRET_KEY="YOUR_CLERK_SECRET_KEY"
```

---

## 4. Run Prisma Migration

```bash
npx prisma migrate dev
```

---

## 5. Seed Initial Data

```bash
npx tsx prisma/seed.ts
```

---

## 6. Start Development Server

```bash
npm run dev
```

---

# 🌐 Deployment

The project is deployed using:

* Vercel
* Supabase PostgreSQL
* Clerk Authentication

---

# 📖 User Guide

A dedicated in-app User Guide page is included to help:

* Admins understand dashboard workflows
* Sales Officers manage monthly sales
* Evaluators quickly understand system usage

---

# 🎯 Key Highlights

* Full-stack architecture
* Real authentication system
* Persistent monthly sales tracking
* Secure role-based access
* Relational database design
* Scalable backend structure
* Professional dashboard UI
* Real-world business workflow implementation

---

## 🚀 Live Demo

🔗 **[https://driveboost.vercel.app](https://driveboost.vercel.app)**

> Hosted on [Vercel](https://vercel.com) — zero-config deployments with automatic CI/CD on every push.

### 🧪 Testing the App

No pre-configured credentials needed — simply sign up and choose your role during registration.

#### Steps to Get Started

1. Go to [https://driveboost.vercel.app/sign-up](https://driveboost.vercel.app/sign-up)
2. Create a new account with any email.
3. During signup, **select your role** — either **Admin** or **Sales Officer**.
4. Log in and explore the platform based on your chosen role.

#### What you can do as an Admin
- Add and manage Toyota car models
- Configure incentive slabs based on sales ranges
- View all sales reports submitted by Sales Officers
- Analyze performance via charts and dashboard metrics

#### What you can do as a Sales Officer
- Select a month and year to log sales
- Enter quantities sold for different car models
- View auto-calculated incentives based on active slabs
- Track your full sales history

> ℹ️ Multiple users can sign up as Admin — there is no restriction on the number of admins.

# 👨‍💻 Author

Developed as a full-stack sales incentive management platform using modern web technologies.

Built with ❤️ using Next.js, Prisma, Clerk, PostgreSQL, and Tailwind CSS.
