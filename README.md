# 🚀 create-express-saas

A **zero-config CLI** to scaffold a production-ready **Node.js + Express + Mongoose SaaS boilerplate** in seconds.  
Includes **JWT authentication**, **role-based access control**, **centralized error handling**, **Swagger API docs**, and more — so you can focus on building features, not boilerplate.

![npm version](https://img.shields.io/npm/v/create-express-saas)
![npm downloads](https://img.shields.io/npm/dm/create-express-saas)
![license](https://img.shields.io/npm/l/create-express-saas)
![GitHub stars](https://img.shields.io/github/stars/khushikumarigupta14/create-express-saas?style=social)

---

## ✨ Features

- ⚡ **Zero config** – run one command and start coding
- 🔑 **JWT Auth** with refresh tokens
- 👥 **Role-based Access Control** (RBAC)
- ❌ **Centralized Error Handling**
- 📖 **Swagger (OpenAPI) Docs** out of the box
- 📦 **Mongoose Models** with best practices
- 🌍 **CORS, Helmet, dotenv** pre-configured
- 🧪 **Ready-to-use Project Structure**
- 🐳 Optional **Dockerfile** support (future-ready)

---

## 🚀 Quick Start

```bash
# Create a new project
npx create-express-saas my-project

cd my-project
npm install
npm run dev
```
- Visit your API docs at:
👉 http://localhost:5000/api-docs

```
my-project/
│── src/
│   ├── config/        # Env & DB config
│   ├── controllers/   # Route handlers
│   ├── middlewares/   # Auth & error middlewares
│   ├── models/        # Mongoose models
│   ├── routes/        # Express routes
│   ├── utils/         # Helpers
│   └── app.js         # App entry point
│── .env.example       # Sample environment file
│── package.json
```
## 🛠️ Local Development
```bash
# Clone locally for testing
git clone https://github.com/khushikumarigupta14/create-express-saas.git
cd create-express-saas

# Install & link
npm install
npm link

# Scaffold a new project
create-express-saas ../myProject

# Install deps and run
cd ../myProject
npm install
npm run dev

```
## 📚 Documentation

Express.js
Mongoose
Swagger

## 🤝 Contributing
- Contributions are welcome!
- Fork this repo
- Create a new branch (feature/my-feature)
- Commit your changes
- Open a Pull Request 🎉

## ⭐ Support & Community
- Star the repo on GitHub 🌟
- Share it with other developers
- Open issues / feature requests
