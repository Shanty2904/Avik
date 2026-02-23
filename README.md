# Avik Portfolio — React + Vite + Tailwind

## Stack
- **React 18** — UI
- **Vite** — Dev server & bundler
- **React Router v6** — Nested routing
- **Tailwind CSS v3** — Styling
- **EmailJS** — Contact form (no backend needed)

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start the dev server
```bash
npm run dev
```

### 3. Build for production
```bash
npm run build
```

---

## Project Structure

```
src/
├── context/
│   └── ThemeContext.jsx        # Dark mode state + localStorage
├── components/
│   ├── Layout.jsx              # Wraps all pages (Navbar + Footer + FABs)
│   ├── Navbar.jsx              # Fixed nav with icon swaps + mobile menu
│   ├── NavIcon.jsx             # Handles light/dark/hover image swaps
│   ├── Footer.jsx              # Social links + copyright
│   ├── FloatingButtons.jsx     # Contact FAB + scroll-to-top
│   └── ThemeToggle.jsx         # Fixed bottom-left theme toggle button
├── pages/
│   ├── Home.jsx                # All homepage sections (Hero, Film, About, Projects, Services, Contact)
│   ├── Work.jsx                # Placeholder
│   ├── Illustrations.jsx       # Placeholder
│   ├── About.jsx               # Placeholder
│   ├── Services.jsx            # Placeholder
│   ├── Contact.jsx             # Full EmailJS contact form ⭐
│   ├── illustrations/
│   │   ├── WeepingWillow.jsx
│   │   ├── FloralFaces.jsx
│   │   ├── WinterCabin.jsx
│   │   └── TideMural.jsx
│   └── projects/
│       ├── Project1.jsx
│       ├── Project2.jsx
│       ├── Project3.jsx
│       └── Project4.jsx
├── App.jsx                     # All route definitions
├── main.jsx                    # Entry point
└── index.css                   # Tailwind directives + custom CSS (cursors, film animation, etc.)
```

---

## Assets

Copy your entire `Assets/` folder into the `public/` directory:
```
public/
└── Assets/
    ├── Home.png
    ├── Home_hover.png
    ├── Home_dark.png
    ├── Home_dark_hover.png
    ├── ... (all your other assets)
```

Vite serves everything in `public/` at the root, so `/Assets/Home.png` will resolve correctly.

---

## EmailJS Setup (Contact Form)

1. Go to [emailjs.com](https://www.emailjs.com/) and create a **free account**
2. Add an **Email Service** (Gmail, Outlook, etc.) → note your **Service ID**
3. Create an **Email Template** with these variables:
   - `{{name}}` — sender's name
   - `{{email}}` — sender's email
   - `{{message}}` — message body
4. Copy your **Template ID** and **Public Key** (from Account > API Keys)
5. Open `src/pages/Contact.jsx` and replace:
   ```js
   const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'
   const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
   const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'
   ```

That's it — no backend required!

---

## Dark Mode

Dark mode is handled via a React Context (`ThemeContext`) and Tailwind's `darkMode: 'class'` strategy.
- Preference is saved to `localStorage`
- The `dark` class is toggled on `<html>` 
- Use `dark:` Tailwind variants anywhere in components

---

## Routes

| Path | Page |
|---|---|
| `/` | Home (all sections) |
| `/work` | Work (placeholder) |
| `/illustrations` | Illustrations (placeholder) |
| `/about` | About (placeholder) |
| `/services` | Services (placeholder) |
| `/contact` | Contact (EmailJS form) |
| `/illustrations/weeping-willow` | Sub-page |
| `/illustrations/floral-faces` | Sub-page |
| `/illustrations/winter-cabin` | Sub-page |
| `/illustrations/tide-mural` | Sub-page |
| `/projects/project-1` through `/project-4` | Sub-pages |
