# YC Directory

A comprehensive directory application built with Next.js 15, React 19, and Sanity CMS. This project allows users to browse, search, and manage startup information.

## Features

- Modern UI with Tailwind CSS
- Content management with Sanity CMS
- Authentication with NextAuth
- Error tracking with Sentry
- Responsive design
- Markdown support for rich content

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **CMS**: Sanity
- **Authentication**: NextAuth
- **Monitoring**: Sentry
- **Styling**: Tailwind CSS, Radix UI components

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm 10+

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Sanity Studio

This project includes Sanity Studio for content management. To access the studio:

1. Run the development server
2. Navigate to `/studio` route

## Project Structure

- `/app` - Next.js app router pages and layouts
- `/components` - Reusable UI components
- `/lib` - Utility functions and shared code
- `/public` - Static assets
- `/sanity` - Sanity CMS configuration and schemas

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=

# NextAuth
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Sentry (optional)
SENTRY_DSN=
```

## Deployment

This project can be deployed on Vercel or any other hosting platform that supports Next.js applications.

```bash
npm run build
npm run start
```
