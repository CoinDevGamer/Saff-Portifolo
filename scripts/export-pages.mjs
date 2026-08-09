import { copyFile, writeFile } from "node:fs/promises";

import server from "../dist/server/server.js";

const basePath = process.env.VITE_BASE_PATH || "/";
const response = await server.fetch(new Request(`http://localhost${basePath}`), {}, {});

if (!response.ok) {
  throw new Error(`Static homepage render failed with status ${response.status}`);
}

const html = await response.text();

if (!html.includes("<!DOCTYPE html>") && !html.includes("<!doctype html>")) {
  throw new Error("Static homepage render did not return a complete HTML document");
}

await writeFile("dist/client/index.html", html);
await copyFile("dist/client/index.html", "dist/client/404.html");
await writeFile("dist/client/.nojekyll", "");

console.log("Static GitHub Pages site exported to dist/client");
