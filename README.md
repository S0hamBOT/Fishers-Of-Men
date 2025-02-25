# Fishers Of Men

## Overview

"Fishers Of Men" is a web application designed to help juniors at MMCOE develop strong Data Structures and Algorithms (DSA) skills. It provides a centralized platform for practice problems, resources, community interaction, and event tracking. This project leverages Firebase for backend data management and Cloudflare Pages for hosting.

## Features

* **Practice:**
    * A curated list of DSA problems with detailed descriptions.
    * Problem solving interface.
* **Community:**
    * A space for students to connect, discuss problems, and share resources.
* **Resources:**
    * A collection of useful DSA learning materials.
* **Calendar:**
    * An event calendar to track upcoming DSA-related events and workshops.
* **Dashboard:**
    * Shows recent activity and stats.
* **Authentication:**
    * Secure user authentication using Firebase.

## Technologies Used

* **Frontend:**
    * React (TypeScript)
    * Tailwind CSS
    * Vite
* **Backend:**
    * Firebase (Authentication, Database)
* **Hosting:**
    * Cloudflare Pages

## Project Structure

├── .bolt                  # Bolt configuration (if applicable)
├── dist                   # Production build output
│   └── assets
│       └── index.html
├── node_modules           # Project dependencies
├── src                    # Source code
│   ├── components         # Reusable UI components
│   │   ├── AuthRequired.tsx    # Component to protect routes
│   │   ├── DashboardStats.tsx  # Component to show dashboard stats
│   │   ├── RecentActivity.tsx  # Component to show recent activity
│   │   ├── Sidebar.tsx         # Sidebar component
│   │   ├── UpcomingEvents.tsx  # Component to show upcoming events
│   │   └── practice
│   │       ├── ProblemDetail.tsx # Details of a problem
│   │       ├── ProblemList.tsx   # List of problems
│   ├── contexts           # React context providers
│   │   └── AuthContext.tsx   # Authentication context
│   ├── data               # Static data
│   │   └── problems.tsx      # Problem data
│   ├── icons              # Icon assets
│   ├── lib                # Utility libraries
│   │   └── firebase.ts       # Firebase initialization
│   ├── pages              # Application pages
│   │   ├── Calendar.tsx      # Calendar page
│   │   ├── Community.tsx     # Community page
│   │   ├── Login.tsx         # Login page
│   │   ├── Practice.tsx      # Practice page
│   │   ├── Quiz.tsx          # Quiz page
│   │   ├── Resources.tsx     # Resources page
│   ├── photos             # Image assets
│   ├── types              # TypeScript type definitions
│   │   └── index.ts
│   ├── App.tsx            # Root application component
│   ├── index.css          # Global CSS styles
│   ├── main.tsx           # Entry point
│   ├── vite-env.d.ts      # TypeScript environment definitions
├── .env                   # Environment variables
├── .gitignore             # Git ignore file
├── eslint.config.js      # Eslint configuration.
├── index.html             # HTML entry point
├── package.json           # Project dependencies and scripts
├── package-lock.json      # Dependency lock file
├── postcss.config.js      # PostCSS configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── tsconfig.app.json      # Typescript App configuration.
├── tsconfig.node.json     # Typescript Node configuration.
├── vite.config.ts        # Vite configuration

## Getting Started

### Prerequisites

* Node.js and npm (or yarn) installed.
* Firebase project setup.
* Cloudflare account.

### Installation

1.  Clone the repository:

    ```bash
    git clone [repository URL]
    cd fishers-of-men
    ```

2.  Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3.  Configure Firebase:

    * Create a `.env` file in the project root.
    * Add your Firebase configuration details:

        ```
        VITE_FIREBASE_API_KEY=your_api_key
        VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
        VITE_FIREBASE_PROJECT_ID=your_project_id
        VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
        VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
        VITE_FIREBASE_APP_ID=your_app_id
        ```

4.  Run the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    The application will be available at `http://localhost:5173`.

### Building for Production

1.  Build the application:

    ```bash
    npm run build
    # or
    yarn build
    ```

2.  Deploy to Cloudflare Pages:

    * Connect your repository to Cloudflare Pages.
    * Configure the build settings to use the `dist` folder.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues.
