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

test("keeps photographs local and restores a nested archive page", async () => {
  const home = await (await render()).text();
  assert.match(home, /\/archive\/i829ef2f03b999565\.jpg/);
  assert.doesNotMatch(home, /web\.archive\.org/);

  const nested = await render("/%D0%BC%D0%BE%D0%B8-%D0%BF%D0%B5%D1%80%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F/%D0%B1%D0%B0%D0%B1%D1%83%D1%88%D0%BA%D0%B8%D0%BD%D0%B0-%D1%84%D0%BB%D0%BE%D1%80%D0%B0-%D0%BD%D0%B0-%D0%B4%D0%B0%D1%87%D0%B5/");
  assert.equal(nested.status, 200);
  const nestedHtml = await nested.text();
  assert.match(nestedHtml, /Как я уже говорил, моя бабушка любит и ценит красивые растения/);
  assert.match(nestedHtml, /Все фотоистории/);
});

test("restores the original newborn walk page instead of a stub", async () => {
  const response = await render("/%D0%BC%D0%BE%D0%B8-%D0%BF%D0%B5%D1%80%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F/%D0%BD%D0%B0-%D0%BF%D1%80%D0%BE%D0%B3%D1%83%D0%BB%D0%BA%D0%B5-%D0%BD%D0%B5%D0%B4%D0%B0%D0%B2%D0%BD%D0%BE-%D1%80%D0%BE%D0%B4%D0%B8%D0%BB%D1%81%D1%8F/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /На прогулке/);
  assert.match(html, /апрель - май 2009 года/);
  assert.match(html, /На этой странице было фотографий:.*2/);
});
