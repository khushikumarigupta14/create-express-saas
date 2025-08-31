# create-express-saas

A zero-config CLI that scaffolds a clean Node.js + Express + Mongoose boilerplate with JWT auth,
role-based access, central error handling, Swagger docs, and more.

## Usage

```bash
npx create-express-saas myProject
# or, after local link:
create-express-saas myProject
```

## Local development & test

```bash
# unzip this package, cd into it, then:
npm install
npm link

# Now scaffold a new project into ../myProject
create-express-saas ../myProject

# install deps and run
cd ../myProject
npm install
npm run dev
```
