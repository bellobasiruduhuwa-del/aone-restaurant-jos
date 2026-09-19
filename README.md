# AONE Restaurant — Website App

A complete restaurant ordering website for **AONE RESTAURANT** (Jos, Plateau
State), built with React + Vite, Firebase (Firestore, Auth, Storage), and
ready to deploy to Netlify.

Customers can browse the menu, search and filter, build a cart, and check
out via WhatsApp. You manage everything — products, prices, images, orders,
delivery fees, restaurant info — from a secure Admin Dashboard, with no code
editing required after setup.

---

## 1. What's included

- **Customer site:** Home, About, Menu (search/filter/sort), product pages,
  cart, checkout with WhatsApp handoff, contact page.
- **Admin dashboard:** Dashboard overview, Products (add/edit/delete, quick
  price editing, image upload), Categories, Orders (status workflow,
  search, print), Customers, Sales Reports, Delivery Settings, Restaurant
  Settings, Admin Users, Profile.
- **Firebase backend:** Firestore database, Firebase Authentication (admin
  login), Firebase Storage (images), with security rules included.
- **PWA:** installable on Android/desktop, with an offline fallback screen
  (ordering itself still needs an internet connection).
- **Netlify-ready:** `netlify.toml` configured for the correct build command
  and SPA routing.

## 2. What you need to do yourself

I can't create your Firebase project or deploy to Netlify for you — those
need your own accounts. Everything below is written for a complete
beginner; it should take about 30–45 minutes the first time.

---

## 3. Run the project locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`). The
site will load, but the menu will stay empty and admin login won't work
until you connect Firebase (next section).

---

## 4. Create your Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com) and sign in with a Google account.
2. Click **Add project**, name it (e.g. `aone-restaurant`), and finish the wizard (Google Analytics is optional).
3. In the left sidebar, click **Build > Authentication > Get started**. Under "Sign-in method", enable **Email/Password**.
4. Click **Build > Firestore Database > Create database**. Choose **Production mode** and pick a location close to Nigeria (e.g. `eur3` or `nam5` — either works fine).
5. Click **Build > Storage > Get started**. Accept the defaults.
6. Click the gear icon (⚙) next to "Project Overview" > **Project settings**. Scroll to "Your apps", click the **</>** (web) icon, register an app (nickname: "AONE Web"), and copy the `firebaseConfig` values shown.

## 5. Connect the app to Firebase

1. Copy `.env.example` to a new file named `.env`.
2. Paste in the values from step 6 above:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

3. Restart `npm run dev` if it's running.

These values are safe to have in your deployed site's code — they just tell
the browser which Firebase project to talk to. What actually protects your
data is the security rules in the next step.

## 6. Configure Firestore & Storage security rules

1. In Firebase Console > **Firestore Database > Rules**, delete everything and paste in the contents of `firestore.rules` from this project. Click **Publish**.
2. In Firebase Console > **Storage > Rules**, delete everything and paste in the contents of `storage.rules` from this project. Click **Publish**.

These rules let customers view the menu and place orders, but only an admin
can change products, prices, images, or order status.

## 7. Create your first admin login

Admin accounts are created in two steps, on purpose — this stops the
website itself from ever being able to grant admin access to anyone:

1. Firebase Console > **Authentication > Users > Add user**. Enter your
   email and a password. Click **Add user**, then copy the "User UID"
   shown next to it.
2. Firebase Console > **Firestore Database > Start collection**. Collection
   ID: `admins`. Document ID: paste the User UID from step 1. Add two
   fields: `email` (string, your email) and `role` (string, `admin`). Save.

You can now log in at `/admin/login` on your site with that email and
password.

## 8. Load your starter menu (optional but recommended)

The 19 starter products and 9 categories from the brief can be loaded in
one go instead of typing them by hand:

1. Firebase Console > Project Settings > **Service accounts** > "Generate
   new private key". Save the downloaded file as `serviceAccountKey.json`
   in this project's root folder (next to `package.json`). **Never share
   or commit this file** — it's already in `.gitignore`.
2. `npm install firebase-admin --save-dev`
3. `npm run seed`

This writes all 19 products, the 9 categories, and default restaurant
settings into Firestore. You can then edit, delete, or add to them freely
from the Admin Dashboard — nothing is locked.

If you'd rather add everything by hand instead, use **Admin > Categories**
to add the 9 categories, then **Admin > Products** to add each dish.

## 9. Add real food photos

Once logged in to `/admin`, go to **Products**, click **Edit** on any item,
and upload a real photo — it replaces the placeholder immediately on the
live menu.

## 10. Build and deploy to Netlify

```bash
npm run build
```

This creates a `dist` folder — that's your finished website.

**Option A — drag and drop (fastest):**
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag the `dist` folder onto the page. Netlify gives you a live URL immediately.

**Option B — connect to Git (recommended for ongoing updates):**
1. Push this project to a GitHub repository.
2. In Netlify, click **Add new site > Import an existing project**, connect GitHub, and select the repo.
3. Build command: `npm run build`. Publish directory: `dist`. (Already set in `netlify.toml`.)
4. Add your six `VITE_FIREBASE_...` variables under **Site settings > Environment variables** (same values as your `.env`).
5. Click **Deploy site**.

With Option B, every time you push a code change to GitHub, Netlify rebuilds
and redeploys automatically — you'll rarely need to touch this again, since
day-to-day changes (prices, photos, orders) happen in the Admin Dashboard,
not in code.

## 11. Custom domain (later)

Netlify: **Site settings > Domain management > Add a custom domain**, then
follow the DNS instructions Netlify gives you for your domain registrar.

---

## 12. Project structure

```
aone-restaurant/
├── src/
│   ├── firebase/       Firestore/Auth/Storage functions (all real, no mocks)
│   ├── context/        Cart, Auth, Settings (shared app state)
│   ├── components/     Navbar, Footer, FoodCard, WhatsApp button, etc.
│   ├── pages/           Customer pages
│   └── pages/admin/    Admin dashboard pages
├── scripts/seedFirestore.mjs   One-time starter data loader
├── firestore.rules     Firestore security rules
├── storage.rules       Storage security rules
├── netlify.toml        Netlify build & SPA routing config
└── .env.example        Firebase config template
```

## 13. Known limitations (read this)

- **This sandbox couldn't create your live Firebase project or deploy to
  Netlify for you** — those steps need your own accounts, done above.
- **Offline mode** only shows a friendly "you're offline" shell — placing
  orders always requires an internet connection, since orders must reach
  Firestore and WhatsApp.
- **Customer accounts** (optional login/order history) have security rules
  ready (`customers/{uid}`) but no sign-up UI yet — guests can always order
  without one, as required. Ask if you'd like this added later.
- Sample review text on the homepage and "Our Story" text on About are
  placeholders — replace them with your real words whenever you're ready.

See `MANAGEMENT_GUIDE.md` for plain-English, day-to-day instructions (no
code) for running the restaurant on this site.
