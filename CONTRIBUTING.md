# Contributing to Coach Jake

Thank you for contributing to Coach Jake! This document outlines the process and expectations for development.

## Prerequisites

- **Node.js** 18.17+ (verify with `node -v`)
- **npm** 9+ (verify with `npm -v`)
- **Git**
- A Supabase account (free tier available at https://supabase.com)

## Setup for Development

### 1. Clone and Install

```bash
git clone https://github.com/Nitheesh0217/coach-jake-app.git
cd coach-jake-app
npm install
```

### 2. Environment Configuration

Copy `.env.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

Then update `.env.local` with your actual Supabase URL and anon key from [Supabase Dashboard](https://app.supabase.com).

### 3. Database Setup (First Time Only)

Run the SQL migrations in your Supabase SQL Editor:

```bash
# Copy contents of supabase-setup.sql to Supabase SQL Editor
# Copy contents of supabase-migrations-player-card.sql to Supabase SQL Editor
```

## Development Workflow

### Running Commands

```bash
# Start development server (localhost:3000)
npm run dev

# Run linting checks
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

### Code Standards

- **TypeScript** - All `.ts` and `.tsx` files must be typed
- **ESLint** - Configured with Next.js rules, auto-run on save
- **Prettier** - Code formatting enabled on save
- **No //@ts-ignore** - Avoid TypeScript ignores; fix type issues instead
- **Strict Mode** - `tsconfig.json` enforces `strict: true`

### File Organization

```
src/
├── app/              # Next.js App Router
│   ├── (auth)/      # Public auth pages
│   ├── (app)/       # Protected app pages
│   └── (public)/    # Marketing pages
├── components/       # Reusable React components
├── lib/             # Utilities and helpers
└── types/           # TypeScript definitions
```

### Before Committing

1. Run linting: `npm run lint`
2. Check for TypeScript errors: `npm run build`
3. Test in dev browser: `npm run dev`
4. Ensure no console errors

## Testing Credentials

After running database migrations, use:

- **Coach**: `coach@example.com` / `password123`
- **Athlete**: `player@example.com` / `password123`

## VS Code Setup (Recommended)

The project includes ESLint and Prettier configurations. For the best experience:

1. Install ESLint extension: `dbaeumer.vscode-eslint`
2. Install Prettier extension: `esbenp.prettier-vscode`
3. Extensions will auto-format on save (configured in `.vscode/settings.json`)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Questions or Issues?

Create a GitHub issue with:

- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Environment details (Node version, OS, browser)

---

**Happy coding! 🚀**
