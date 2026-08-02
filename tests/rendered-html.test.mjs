import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}

test("renders the restored home page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Сайт Сашули/);
  assert.match(html, /Основные записи моего сайта/);
  assert.match(html, /Меня зовут Саша/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/);
});

test("renders an archived section", async () => {
  const response = await render("/%D1%84%D0%BE%D1%82%D0%BE%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D0%B8/");
  assert.equal(response.status, 200);
  assert.match(await response.text(), /Фотогалерея/);
});
