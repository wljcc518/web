import { promises as fs } from "node:fs";
import path from "node:path";

const outputDirectory = path.resolve("dist/client");
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "/web";
const escapedBasePath = basePath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const textExtensions = new Set([".css", ".html", ".js", ".json", ".rsc", ".txt", ".xml"]);
const directoryPrefixes = [
  "assets",
  "asset-cards",
  "asset-showcase",
  "capability-card-bg",
  "career-cards",
  "evidence-card-bg",
  "media",
  "pdfs",
  "reference",
  "section",
];
const rootFiles = [
  "favicon.svg",
  "file.svg",
  "globe.svg",
  "og.png",
  "resume.pdf",
  "window.svg",
];

async function listFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? listFiles(entryPath) : [entryPath];
  }));
  return nested.flat();
}

function addBasePath(content) {
  let updated = content;
  for (const prefix of directoryPrefixes) {
    updated = updated.replace(
      new RegExp(`(?<![A-Za-z0-9_/-])/${prefix}/`, "g"),
      `${basePath}/${prefix}/`,
    );
  }
  for (const filename of rootFiles) {
    updated = updated.replace(
      new RegExp(`(?<![A-Za-z0-9_/-])/${filename.replace(".", "\\.")}`, "g"),
      `${basePath}/${filename}`,
    );
  }
  return updated;
}

const outputFiles = await listFiles(outputDirectory);

for (const filePath of outputFiles) {
  if (!textExtensions.has(path.extname(filePath))) continue;
  const content = await fs.readFile(filePath, "utf8");
  const updated = addBasePath(content);
  if (updated !== content) await fs.writeFile(filePath, updated);
}

await fs.writeFile(path.join(outputDirectory, ".nojekyll"), "");

const invalidRootPath = new RegExp(
  `(?<![A-Za-z0-9_/-])/(?:${directoryPrefixes.join("|")})/|(?<![A-Za-z0-9_/-])/(?:${rootFiles.map((name) => name.replace(".", "\\.")).join("|")})`,
);

for (const filePath of outputFiles) {
  if (!textExtensions.has(path.extname(filePath))) continue;
  const content = await fs.readFile(filePath, "utf8");
  if (content.includes(`${basePath}${basePath}/`)) {
    throw new Error(`Duplicate GitHub Pages base path in ${filePath}`);
  }
  if (invalidRootPath.test(content)) {
    throw new Error(`Unprefixed public URL remains in ${filePath}`);
  }
}

for (const requiredFile of [
  "index.html",
  "404.html",
  "section/core-thinking/index.html",
  "section/representative-projects/index.html",
  "media/chapter-01-profile.mp4",
  "pdfs/01-评测维度.pdf",
]) {
  await fs.access(path.join(outputDirectory, requiredFile));
}
