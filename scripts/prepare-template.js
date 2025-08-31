// scripts/prepare-template.js
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const boilerplateDir = path.resolve(__dirname, "../boilerplate"); 
const templateDir = path.resolve(__dirname, "../template");

// clean template
await fs.remove(templateDir);
await fs.copy(boilerplateDir, templateDir);

console.log("✅ Template prepared for npm publish");
