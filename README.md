npm run dev
npm run build
npm run start

i dont have a backend so i am going to put all api in api/file.ts
these api will have api calls that are then frwded as server-client calls - idk what that means but thats the language vineet understand

its build on next.js and i am using vercel rn to deploy it in real time

#Structure
app/
├── layout.tsx <-- Global layout, very light
├── page.tsx <-- Homepage (3D Greek God thing)
├── about/
│ └── page.tsx <-- Secondary Page (About Me maybe)
├── projects/
│ └── page.tsx <-- Secondary Page (Project Showcase)
├── styles/ <-- Optional: custom scss/tailwind/colors
├── components/ <-- Reusable things (cursor, nav, scroll to top)
│ ├── Navbar.tsx
│ ├── CustomCursor.tsx
│ ├── ScrollToTop.tsx
│ └── ThemeChanger.tsx
├── components/ ← Shared UI elements like Navbar, Footer, etc.
│ └── Navbar.tsx
public/
└── greek-god.glb <-- For when you get the model

#layout.tsx — The Mostly Global Stuff
Put here:

<html lang="en" />, <head>, etc.

Global styles like fonts

Maybe dark mode provider if you want theme across pages

Optional: Custom cursor, navbar if you want it to appear site-wide

#to add
Theme switch by section Wrap sections in a data-theme="light" or dark and use IntersectionObserver
Scroll to top on nav click Put <ScrollToTop /> in layout or use useEffect in each page
3D stuff Use @react-three/fiber and load .glb with useGLTF
Per-page styles Use app/about/page.module.css or Tailwind scoped utility classes
