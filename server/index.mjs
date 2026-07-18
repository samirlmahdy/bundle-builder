import express from "express";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const serverDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(serverDirectory, "..");
const catalogPath = path.join(
  projectRoot,
  "src/features/bundle-builder/data/products.json",
);
const distPath = path.join(projectRoot, "dist");
const port = Number(process.env.PORT) || 3001;

const app = express();

app.disable("x-powered-by");
app.use(express.json({ limit: "100kb" }));

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.get("/api/catalog", async (_request, response) => {
  const catalog = JSON.parse(await readFile(catalogPath, "utf8"));
  response.set("Cache-Control", "no-store");
  response.json(catalog);
});

if (existsSync(path.join(distPath, "index.html"))) {
  app.use(express.static(distPath));
  app.use((request, response, next) => {
    if (request.method !== "GET" || !request.accepts("html")) {
      next();
      return;
    }

    response.sendFile(path.join(distPath, "index.html"));
  });
}

app.use((request, response) => {
  response.status(404).json({
    error: "Resource not found",
    path: request.originalUrl,
  });
});

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({ error: "Internal server error" });
});

app.listen(port, () => {
  console.log(`Bundle Builder API listening on http://localhost:${port}`);
});
