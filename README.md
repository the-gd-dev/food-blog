# 🍽️ Food Blog

A beautiful, responsive **Food Blog** built with **Next.js**, where you can explore delicious recipes, upload food images, and learn more about your favorite dishes. This project is part of my journey learning modern web development with **Next.js App Router**, **TypeScript**, and more!

---

## 🔥 Features

- ✅ Built with **Next.js 14 (App Router)**
- 🍱 Upload and share food images
- 📖 Dynamic routing for individual recipe pages
- 🎨 TailwindCSS for modern, responsive UI
- ☁️ File upload using `formData` and API Routes
- 💡 Server Components + Client Components
- 🧠 Dynamic metadata for SEO

---

## 🚀 Tech Stack

| Technology         | Purpose                   |
| ------------------ | ------------------------- |
| Next.js            | React framework & SSR/SSG |
| TypeScript         | Static typing             |
| Tailwind CSS       | Utility-first CSS styling |
| Zustand (optional) | Lightweight global state  |
| API Routes         | Backend file handling     |
---

## 📷 Screenshots

Coming soon... 👨‍🍳📸

---

## 🛠️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/food-blog.git
cd food-blog
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

### 4. Open in browser

```
http://localhost:3000
```

---

## 📁 Project Structure (App Router)

```
app/
│
├── page.tsx                # Home page
├── recipes/[slug]/page.tsx # Dynamic recipe pages
├── upload/page.tsx         # File upload page
├── layout.tsx              # Root layout
├── api/upload/route.ts     # API route for file uploads
```

---

## 💡 Learnings

This project helped me learn:

- How to structure an app with the new **App Router**
- How to use **dynamic metadata** for SEO
- File uploads using `formData` and `API Routes`
- Component-level state management with **Zustand**
- Clean and responsive design with **Tailwind CSS**

---

## 📌 Todo

- [ ] Add user authentication (NextAuth or Clerk)
- [ ] Store uploaded files in cloud (S3/Cloudinary)
- [ ] Add recipe creation form
- [ ] Save and fetch recipes from a database (Prisma + PostgreSQL)
- [ ] Responsive design tweaks for mobile

---

## 📄 License

MIT License — feel free to fork and build your own food app!

---

## 🙌 Acknowledgements

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Zustand](https://github.com/pmndrs/zustand)

---

## ✨ Made with love and curiosity
