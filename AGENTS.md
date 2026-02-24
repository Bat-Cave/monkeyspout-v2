# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

Monkey Spout is a Next.js 14 (T3 Stack) question/conversation starter web app. See `package.json` for scripts (`dev`, `build`, `lint`, `start`).

### Environment variables

A `.env.local` file is needed with these keys:
- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase (database)
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` — Clerk (auth)

Without valid Clerk keys, the app will 500 on every request because `authMiddleware` in `src/middleware.ts` validates the secret key, and `ClerkProvider` in the layout validates the publishable key format. The publishable key must follow the format `pk_test_<base64-encoded-string-ending-with-$>`. A dummy key like `pk_test_Y2xlcmsuZHVtbXkuZGV2JA==` passes format validation and allows the app to render, but Clerk auth features (sign-in, admin access) will not work.

The app has a local fallback dataset in `src/data/quesitons.ts` (1018 questions), so it partially works without Supabase connectivity.

### Running the dev server

```
npm run dev
```

First compilation after clearing `.next` cache can take 60–120 seconds. Subsequent requests are fast.

### Lint and build

```
npm run lint
npm run build
```

Both produce only warnings (Edge Runtime compatibility, outdated browserslist), no errors.

### Key caveats

- The `npm run build` command may emit "Compiler server unexpectedly exited" messages — these are benign and the build still succeeds.
- No automated test suite exists in this codebase (`npm test` is not configured).
- The `/admin` route is protected by Clerk auth and requires valid credentials to access.
