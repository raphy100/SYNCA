# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

**Firebase setup**

- **Step 1 - Create a Firebase web app**: In the Firebase console create a web app and copy the config values.
- **Step 2 - Add env vars**: Create a file named `.env.local` at the project root and add the following variables (replace the placeholders with your values):

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:abcdef123456
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

- **Step 3 - Restart dev server**: After adding env vars restart `npm run dev` so Next.js picks up the new variables.

The app reads these vars from `src/firebase/config.ts`. If the `NEXT_PUBLIC_FIREBASE_API_KEY` is missing the app will throw a clear error telling you to add the variable.
