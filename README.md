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
