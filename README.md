# Naomi Wordle

A Wordle clone built with Next.js for learning and practicing spelling words.

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up your database connection in your environment variables

3. Run Prisma migrations:
```bash
npx prisma migrate dev
```

4. Generate Prisma client:
```bash
npx prisma generate
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

