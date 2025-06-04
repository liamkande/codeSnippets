# Code Snippets Manager

🚀 **A modern code snippets management application built with Next.js 15**

Code Snippets Manager is a full-stack web application that allows developers to create, store, edit, and organize their code snippets. The app features a dual-environment architecture: using a SQLite database with Prisma in development and React Context for state management in production (for demo purposes).

---

## Features

- **CRUD Operations**:
    - Create new code snippets with title and code content
    - View all snippets in an organized list
    - Edit existing snippets with live syntax highlighting
    - Delete snippets with confirmation

- **Advanced Code Editor**:
    - Monaco Editor integration (VS Code editor in the browser)
    - Syntax highlighting for JavaScript
    - Dark theme for better coding experience
    - Real-time code editing

- **Dual Environment Architecture**:
    - **Development**: SQLite database with Prisma ORM and Server Actions
    - **Production**: React Context for state management (demo mode)

- **Responsive Design**:
    - Mobile-friendly interface built with Tailwind CSS
    - Clean and intuitive user experience
    - Modern UI components

- **Performance Optimized**:
    - Next.js 15 with App Router
    - Server-side rendering in development
    - Client-side state management in production

---

## Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **UI Styling**: Tailwind CSS
- **Code Editor**: Monaco Editor (VS Code editor)
- **State Management**: React Context (production) / Server Actions (development)

### Backend
- **Database**: SQLite (development)
- **ORM**: Prisma
- **API**: Next.js API Routes (development)

### Development Tools
- **TypeScript**: Full type safety
- **ESLint**: Code linting and quality
- **Prettier**: Code formatting

---

## Installation

### Prerequisites
- Node.js >= 18.x
- npm, yarn, pnpm, or bun

### Steps

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd snippets
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up the database** (for development):
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open the application**:
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Architecture

### Development Environment
- **Database**: SQLite with Prisma ORM
- **Data Operations**: Server Actions and API routes
- **Benefits**: Persistent data storage, real database operations, full CRUD with validation

### Production Environment
- **State Management**: React Context
- **Data Operations**: In-memory state management
- **Benefits**: Demo-friendly, no database setup required, instant deployment

The application automatically detects the environment using `process.env.NODE_ENV` and switches between the two modes seamlessly.

---

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes (development)
│   │   └── snippets/
│   │       ├── route.ts          # Get all snippets
│   │       └── [id]/route.ts     # Get single snippet
│   ├── snippets/                 # Snippet pages
│   │   ├── new/                  # Create snippet
│   │   └── [id]/                 # View/Edit snippet
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── actions/                      # Server actions (development)
├── components/                   # Reusable components
│   └── snippet-edit-form.tsx     # Edit form component
├── lib/
│   └── context/
│       └── SnippetContext.tsx    # React Context (production)
├── db/                          # Database configuration
└── prisma/                      # Prisma schema and migrations
```

---

## Available Scripts

- **Start development server**:
  ```bash
  npm run dev
  ```

- **Build for production**:
  ```bash
  npm run build
  ```

- **Start production server**:
  ```bash
  npm run start
  ```

- **Lint code**:
  ```bash
  npm run lint
  ```

- **Generate Prisma client**:
  ```bash
  npx prisma generate
  ```

- **Push database schema**:
  ```bash
  npx prisma db push
  ```

---

## Database Schema

The application uses a simple schema for storing code snippets:

```prisma
model Snippet {
  id    Int    @id @default(autoincrement())
  title String
  code  String
}
```

### Database Operations (Development)
- **Create**: Add new snippets to SQLite database
- **Read**: Fetch snippets with Prisma queries
- **Update**: Modify existing snippets
- **Delete**: Remove snippets from database

---

## Context State Management (Production)

The production environment uses React Context for demo purposes:

```typescript
interface SnippetContextType {
  snippets: Snippet[]
  addSnippet: (title: string, code: string) => void
  deleteSnippet: (id: number) => void
  updateSnippet: (id: number, title: string, code: string) => void
}
```

### Context Operations (Production)
- **Create**: Add snippets to in-memory state
- **Read**: Access snippets from context
- **Update**: Modify snippets in state
- **Delete**: Remove snippets from state

---

## Key Components

### Monaco Editor Integration
- Full-featured code editor with syntax highlighting
- VS Code-like editing experience
- Configurable themes and language support
- Real-time code editing with change detection

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Clean and intuitive user interface
- Consistent spacing and typography
- Accessible form controls and navigation

---

## Deployment

### Development Deployment
1. Set up a SQLite database
2. Run Prisma migrations
3. Deploy to any Node.js hosting platform

### Production Deployment (Demo Mode)
1. Build the application: `npm run build`
2. Deploy to Vercel, Netlify, or any static hosting
3. No database setup required - uses in-memory state

### Vercel Deployment (Recommended)
The easiest way to deploy this Next.js app:

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy
4. For production builds, the app will run in demo mode using React Context

---

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**:
   ```bash
   git checkout -b feature-name
   ```
3. **Make your changes and commit**:
   ```bash
   git commit -m "Add new feature"
   ```
4. **Push to your branch**:
   ```bash
   git push origin feature-name
   ```
5. **Open a pull request**

---

## Future Enhancements

- [ ] User authentication and personal snippet collections
- [ ] Syntax highlighting for multiple programming languages
- [ ] Snippet categories and tags
- [ ] Search and filter functionality
- [ ] Export snippets to various formats
- [ ] Snippet sharing and collaboration features
- [ ] Integration with external code repositories

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Support

If you encounter any issues or have questions, please:
1. Check the existing issues on GitHub
2. Create a new issue with a detailed description
3. Include steps to reproduce any bugs

**Happy coding! 🎉**