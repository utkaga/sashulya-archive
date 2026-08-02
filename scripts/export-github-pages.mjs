import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = join(projectRoot, "pages-dist");
const basePath = "/sashulya-archive";
const siteUrl = "https://utkaga.github.io/sashulya-archive";

const pages = JSON.parse(
  await readFile(join(projectRoot, "app", "archive-pages.json"), "utf8"),
);

const workerUrl = pathToFileURL(join(projectRoot, "dist", "server", "index.js"));
workerUrl.searchParams.set("static-export", Date.now().toString());
const { default: worker } = await import(workerUrl.href);

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });
await cp(join(projectRoot, "dist", "client"), outputRoot, { recursive: true });

for (const entry of await readdir(join(outputRoot, "assets"))) {
  if (!entry.endsWith(".css")) continue;
  const cssPath = join(outputRoot, "assets", entry);
  const css = await readFile(cssPath, "utf8");
  await writeFile(cssPath, css.replaceAll("/archive/", `${basePath}/archive/`), "utf8");
}

function makeStatic(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<link\b[^>]*rel="modulepreload"[^>]*\/?\s*>/gi, "")
    .replace(/\b(href|src|srcSet)="\/(?!\/)/g, `$1="${basePath}/`)
    .replace(/(?<!sashulya-archive)\/archive\//g, `${basePath}/archive/`)
    .replace(/\.css"/g, '.css?archive-theme=2"')
    .replaceAll("http://localhost:3000/og.png", `${siteUrl}/og.png`)
    .replace("</head>", '<meta name="generator" content="GitHub Pages static archive"/></head>');
}

const uniquePaths = [...new Set(pages.map((page) => page.path))];
for (const route of uniquePaths) {
  const response = await worker.fetch(
    new Request(`http://localhost${encodeURI(route)}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  if (!response.ok) throw new Error(`Could not render ${route}: ${response.status}`);

  const destination = route === "/"
    ? join(outputRoot, "index.html")
    : join(outputRoot, ...route.split("/").filter(Boolean), "index.html");
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, makeStatic(await response.text()), "utf8");
}

await writeFile(join(outputRoot, ".nojekyll"), "", "utf8");
await cp(join(outputRoot, "index.html"), join(outputRoot, "404.html"));
console.log(`Exported ${uniquePaths.length} pages to ${outputRoot}`);
