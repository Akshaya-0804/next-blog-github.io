# 📝 Next Blog

A modern blogging platform built with **Next.js 13+**, **TypeScript**, **Tailwind CSS**, and a modular architecture that embraces the App Router.

---

## 📌 Project Overview

This project serves as a full-featured blog web application using the latest features in the Next.js ecosystem. It is designed for scalability, flexibility, and ease of maintenance. The structure supports dynamic routing, Markdown-based posts, and server-side rendering for optimal SEO.

---

## 📁 Folder Structure

```
next_blog/
│
├── app/                    # Routing and pages (App Router)
├── src/                    # Application components and logic
├── public/                 # Static assets (images, favicon, etc.)
├── .vscode/                # VSCode settings
├── node_modules/           # Installed packages
├── .next/                  # Build output (auto-generated)
├── .git/                   # Git repo metadata
│
├── package.json            # Project metadata and dependencies
├── next.config.ts          # Next.js custom config
├── tailwind.config.js      # Tailwind customization
├── tsconfig.json           # TypeScript config
├── postcss.config.js       # PostCSS setup for Tailwind
├── README.md               # Project documentation
```

---

## ⚙️ Technologies Used

- **Next.js 13+**
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **PostCSS**
- **ESLint & Prettier**
- **Vercel Deployment Support**

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/next_blog.git
cd next_blog
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

### 4. Build for Production

```bash
npm run build
```

### 5. Start the Production Server

```bash
npm start
```

---

## 🔧 Available Scripts

- `npm run dev` – Starts the development server.
- `npm run build` – Builds the app for production.
- `npm run start` – Starts the production server.
- `npm run lint` – Lints the codebase using ESLint.

---

## 📦 Dependencies

From `package.json`:

```json
"dependencies": {
  "next": "^13.x",
  "react": "^18.x",
  "react-dom": "^18.x"
},
"devDependencies": {
  "tailwindcss": "^3.x",
  "postcss": "^8.x",
  "autoprefixer": "^10.x",
  "typescript": "^5.x",
  "eslint": "^8.x"
}
```

---

## 🧩 Backend Login for src/actions/
### 1. `app/(auth)/register/page.js`

- **Imports:**
  - `useActionState` from React for managing form state.
  - `register` function from `./actions/auth` to handle registration.
  - `Link` from Next.js for navigation.

- **Functionality:**
  - Uses `useActionState` to handle form submission.
  - Renders a form for user registration.
  - Displays server-side validation errors.
  - Includes link to login page.
 
![Register page] (images/register.png)

---

### 2. `components/BlogForm.jsx`

- **Props:**
  - `handler`: Function to handle form submission.
  - `post`: Optional post data for edit functionality.

- **Functionality:**
  - Uses `useActionState` to manage form state.
  - Renders fields for title and content.
  - Handles both create and edit use cases.

---

### 3. `components/Footer.jsx`

- Renders the footer with:
  - Current year.
  - Attribution link with SVG icon.

---

### 4. `components/Navigation.jsx`

- **Imports:**
  - `getAuthUser`: Checks if user is authenticated.
  - `NavLink`: Custom active-aware link component.
  - `logout`: Function to handle logout.

- **Functionality:**
  - Conditionally renders navigation items based on authentication.
  - Displays logout button if authenticated.

---

### 5. `components/NavLink.jsx`

- Uses `usePathname` to determine the current route.
- Applies active class styling to the current route.

---

### 6. `components/PostCard.jsx`

- **Props:**
  - `post`: Post object to render.

- **Functionality:**
  - Shows post creation date.
  - Links to full post.
  - Displays snippet of content.

---

### 7. `app/dashboard/page.jsx`

- Fetches posts for the authenticated user.
- Renders `PostCard` components for each post.

---

### 8. `app/posts/create/edit/[id]/page.jsx`

- Retrieves post by ID from the URL.
- Ensures current user is the post's owner.
- Renders `BlogForm` with existing post data.

---

### 9. `app/globals.css`

- Global styles using Tailwind CSS.
- Includes base element styling and utility classes.

---

### 10. `app/layout.jsx`

- Application root layout.
- Renders `Navigation` and `Footer`.
- Applies global styles and layout structure.

---

### 11. `app/loading.jsx`

- Displays a loading spinner while pages load.

---

### 12. `app/page.jsx`

- Home page of the blog.
- Displays a list of all posts using `PostCard`.

---
## 🧩 Backend Login for src/actions

### 1. App Directory Structure

Next.js uses the `app/` directory for defining routes. Each folder represents a route. Special files like `page.jsx`, `layout.jsx`, and `loading.jsx` define content, layout, and loading behavior.

---

### 2. Server vs Client Components

- **Server Components**: Default for components in `app/`. Rendered on server, more performant.
- **Client Components**: Must be marked with `"use client"` when using hooks like `useState`, `useEffect`, or event listeners.

---

### 3. `useActionState` Hook

Used for form state management in React Server Components. Provides a way to handle state and errors returned from server actions.

---

### 4. Routing and Dynamic Routes

Dynamic routes are declared using brackets, e.g., `[id].jsx`. This allows route parameters to be passed via URL.

---

### 5. API Routes and Server Actions

Server actions are defined in `src/actions/`. These are functions that perform server-side logic like authentication or database CRUD operations.

---

### 6. Authentication

- `getAuthUser`: Returns logged-in user's session info.
- `logout`: Clears session and logs out user.
- Conditional rendering is based on user auth state.

---

### 7. Styling with Tailwind CSS

- Utility-first CSS framework.
- Enables rapid UI development with predefined utility classes.
- Defined in `globals.css`. 

---

## 📂 Database Connection - `src/actions/lib/db.js`

### Purpose

This file manages the MongoDB client connection, ensuring a single reusable instance. It provides helper functions to get a database and collections from MongoDB.

### Key Components:

 - MongoClient Setup:
```
  import { MongoClient, ServerApiVersion } from "mongodb";
const client = new MongoClient(process.env.DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
```

- Connects to MongoDB using the connection string from environment variable DB_URI.
    
- Uses MongoDB Server API v1 with strict and deprecation error checking enabled.

- Error Handling:

    Throws an error immediately if DB_URI is missing to prevent runtime failures.

- getDB(dbName) (async function):

- Connects the MongoDB client.

- Returns the database instance for the given database name.

- Logs a connection success message or logs errors.

- 'getCollection(collectionName)' (async function):

- Retrieves the 'next_blog_db' database.

- Returns a collection object for the specified collection name or null if DB retrieval fails.

---

### User Authentication - 'src/actions/auth.js'

### Purpose

Handles user registration, login, and logout functionality on the server side.

### Functions:

-  `register(state, formData)`
  
   - Validates form input using RegisterFormSchema.
   
   - Checks if the email already exists in the users collection.
   
   - Hashes the password with bcrypt.
   
   - Inserts the new user in the DB.
   
   - Creates a session cookie.
   
   - Redirects to /dashboard on success.
   
   - Returns validation or server errors if any.

- `login(state, formData)`

  -Validates input via LoginFormSchema.
  
    - Checks if the user exists.
    
    - Verifies password using bcrypt.
    
    - Creates session cookie.
    
    - Redirects to /dashboard on success.
    
    - Returns errors on validation failure or invalid credentials.

- `login()`
  
 - Deletes the session cookie.
   
 - Redirects to the home page (/).

---

### Validation Rules - `src/actions/lib/rules.js`

### Purpose

Defines data validation schemas for login, registration, and blog posts using Zod.

### Schemas:

  - `LoginFormSchema`

    - Requires a valid email.

    - Requires a non-empty password.

  - `RegisterFormSchema`

    - Requires valid email.

    - Password must be at least 5 characters, contain at least one letter, one number, and one special character.

    - confirmPassword must match password.

    - Custom error messages defined for each rule.

  - `BlogPostSchema`

    - Title: Required, 1-100 characters max.

    - Content: Required, non-empty.

    - Includes custom error messages.

---

### Session Management - `src/actions/lib/sessions.js`

### Purpose

Handles creation and verification of JWT-based sessions stored in HTTP-only cookies.

### Key Components:

- `encrypt(payload)`

  - Signs a JWT token with HS256 algorithm.

  - Sets issued at and expiration time of 7 days.

  - Uses a secret key from environment variable SESSION_SECRET.

- `decypt(session)`

  - Verifies the JWT token.

  - Returns the decoded payload if valid.

  - Logs error on verification failure.

- `createSession(userId)`

  - Creates a JWT session token with the userId and expiration date.

  - Sets a secure, HTTP-only cookie named "session" on the response with 7-day expiry.

---

### Get Authenticated User - `src/actions/lib/getAuthUser.js`

### Purpose

Retrieves and decrypts the currently authenticated user based on the "session" cookie.

### Function:

- `getAuthUser() (async)`

  - Reads the "session" cookie from the request headers.

  - Decrypts the JWT token to get the user info.

  - Returns the user payload or undefined if no valid session exists.
 
---

### Post Operations - `src/actions/posts.js`

  ### Purpose

  CRUD operations for blog posts, accessible only to authenticated users.

  ### Functions:

- `createPost(state, formData)`

  - Requires authenticated user.

  - Validates post title and content.

  - Inserts the post into the posts collection with reference to the user ID.

  - Redirects to /dashboard on success.

- `updatePost(state, formData)`

  - Requires authenticated user.

  - Validates updated title and content.

  - Checks if the post exists and belongs to the authenticated user.

  - Updates the post in the database.

  - Redirects to /dashboard.

- `deletePost(state, formData)`

  - Requires authenticated user.

  - Validates post ID.

  - Checks post ownership.

  - Deletes the post from the DB.

  - Triggers cache revalidation on /dashboard.

  - Redirects to /dashboard.

---

### Middleware - Route Protection -  `src/actions/middleware.js`

  ### Purpose

  Protects routes based on user authentication state.

  ### Logic:

- Defines protected routes: /dashboard, /post/create, /posts/edit/*

- Defines public routes: /login, /register

- If user tries to access a protected route without authentication, redirects to /login.

- If an authenticated user accesses a public route, redirects to /dashboard.

- Otherwise, allows the request to proceed.

- Uses    `getAuthUser()` to determine the current user from cookies.

- matcher config ensures the middleware applies to specified paths.

---

### Environment Variables - src/actions/env

### Purpose

Stores sensitive configuration variables.

```
DB_URI="mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
SESSION_SECRET="random_secret_key_for_jwt"
```

- DB_URI - MongoDB connection string.

- SESSION_SECRET - Secret key used for signing and verifying JWT sessions.

--- 
### 📂 `/public`

Static files such as:
- `favicon.ico`
- Blog images
- Any other publicly accessible files

---

## ⚙️ Configuration Files

- `next.config.ts`: Configures Next.js features like images, trailing slashes, etc.
- `tailwind.config.js`: Tailwind theme extensions, dark mode, etc.
- `tsconfig.json`: TypeScript paths, strictness, JSX setup.
- `.env`: Environment-specific variables (not committed for security).
- `postcss.config.js`: Required for Tailwind CSS support.

---

## 🧠 Functionality Overview

- Supports **Markdown** or MDX blog posts
- Uses **dynamic routing** for individual blog pages
- **Server-side rendering** for SEO optimization
- **Responsive design** with Tailwind
- Optimized for **Vercel deployment**

---



## 💡 My Understanding of Next.js

### What is Next.js?
Next.js is a React framework that enables functionalities like server-side rendering, static site generation, and client-side rendering all in one app. It offers a file-based routing system and supports API routes out of the box.

### Key Concepts I Learned:

- **App Router vs Pages Router**: In this project, I used the `App Router` which allows for improved modularity by organizing routes using folders and files like `layout.tsx` and `page.tsx`.
- **Server Components vs Client Components**: I understood how to mark components with `'use client'` when they require interactivity or state.
- **Dynamic Routing**: Learned to create pages for dynamic content using folder structures like `[slug]`.
- **Tailwind Integration**: Successfully used Tailwind CSS for responsive and fast styling without writing much custom CSS.
- **Deployment**: Understood the process of building and deploying the app using Vercel, taking advantage of automatic builds.
- **Environment Configuration**: Used `.env` files to securely handle environment-specific variables.

This experience strengthened my understanding of full-stack web development, component-based architecture, and performance optimization using frameworks like Next.js.

---

## ✍️ Author

Intern: Singu Akshaya  
Mentor: Akhil

---

## 📜 License

This project is licensed under the MIT License.
