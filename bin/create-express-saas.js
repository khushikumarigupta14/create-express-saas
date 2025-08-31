#!/usr/bin/env node

import { Command } from "commander";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import fse from "fs-extra";
import chalk from "chalk";
import ora from "ora";

const program = new Command();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMPLATE_DIR = path.resolve(__dirname, "../template");

function replaceInFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, "utf8");
  for (const [pattern, value] of Object.entries(replacements)) {
    content = content.replaceAll(pattern, value);
  }
  fs.writeFileSync(filePath, content, "utf8");
}

async function copyTemplate(targetDir, projectName) {
  await fse.copy(TEMPLATE_DIR, targetDir, {
    overwrite: true,
    errorOnExist: false,
  });
  // Rename _package.json to package.json and inject project name
  const pkgSrc = path.join(targetDir, "_package.json");
  const pkgDest = path.join(targetDir, "package.json");
  await fse.move(pkgSrc, pkgDest, { overwrite: true });
  replaceInFile(pkgDest, {
    __APP_NAME__: projectName,
  });
}

program
  .name("create-express-saas")
  .argument("<target-directory>", "Directory to create your project in")
  .description("Scaffold a Node.js + Express boilerplate")
  .option("-f, --force", "Overwrite target directory if it exists", false)
  .action(async (targetDirectory, options) => {
    const spinner = ora("Scaffolding project...").start();
    try {
      const targetDir = path.resolve(process.cwd(), targetDirectory);
      const projectName = path.basename(targetDir);

      if (fs.existsSync(targetDir)) {
        const files = await fs.promises.readdir(targetDir);
        if (files.length > 0 && !options.force) {
          spinner.fail(
            `Target directory ${chalk.yellow(
              targetDir
            )} is not empty. Use --force to overwrite.`
          );
          process.exit(1);
        }
      } else {
        await fs.promises.mkdir(targetDir, { recursive: true });
      }

      await copyTemplate(targetDir, projectName);

      spinner.succeed("Project scaffolded successfully!");
      console.log();
      console.log(chalk.green("Next steps:"));
      console.log(`  1. cd ${projectName}`);
      console.log("  2. npm install");
      console.log("  3. Set environment variables in .env");
      console.log("  4. npm run dev");
      console.log();
    } catch (err) {
      spinner.fail("Failed to scaffold project");
      console.error(err);
      process.exit(1);
    }
  });

program.parse(process.argv);
