from __future__ import annotations

import html
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path


IMAGE_RE = re.compile(r"/img/(i[a-f0-9]+)/[^/]+/(?:thumb|std|orig)/", re.I)
YOUTUBE_RE = re.compile(r"(?:youtube(?:-nocookie)?\.com/(?:embed/|v/))([A-Za-z0-9_-]{6,})", re.I)


class ContentParser(HTMLParser):
    def __init__(self, timestamp: str):
        super().__init__(convert_charrefs=True)
        self.timestamp = timestamp
        self.in_content = False
        self.div_depth = 0
        self.skip_depth = 0
        self.capture_tag: str | None = None
        self.capture_parts: list[str] = []
        self.blocks: list[dict[str, str]] = []
        self.images: dict[str, str] = {}
        self.videos: set[str] = set()

    def handle_starttag(self, tag: str, attrs_list):
        attrs = dict(attrs_list)
        if not self.in_content:
            if tag == "div" and attrs.get("id") == "content_area":
                self.in_content = True
                self.div_depth = 1
            return

        if tag == "div":
            self.div_depth += 1
            if attrs.get("id") == "seolinx-tooltip" or "hidden" in attrs.get("class", "").split():
                self.skip_depth += 1
            return

        if tag in {"script", "style", "form", "object"}:
            self.skip_depth += 1
            return
        if self.skip_depth:
            return

        if tag in {"h1", "h2", "h3", "p", "li"} and self.capture_tag is None:
            self.capture_tag = tag
            self.capture_parts = []
        elif tag == "br" and self.capture_tag:
            self.capture_parts.append("\n")

        if tag == "img":
            src = attrs.get("src", "")
            match = IMAGE_RE.search(src)
            if match:
                image_id = match.group(1).lower()
                alt = attrs.get("alt") or attrs.get("title") or "Архивная фотография"
                self.images.setdefault(image_id, src)
                self.blocks.append({"type": "image", "id": image_id, "alt": " ".join(alt.split())})

        media_url = attrs.get("src", "") or attrs.get("value", "")
        match = YOUTUBE_RE.search(media_url)
        if match and match.group(1) not in self.videos:
            video_id = match.group(1)
            self.videos.add(video_id)
            self.blocks.append({"type": "video", "id": video_id})

    def handle_data(self, data: str):
        if self.in_content and not self.skip_depth and self.capture_tag:
            self.capture_parts.append(data)

    def handle_endtag(self, tag: str):
        if not self.in_content:
            return
        if tag in {"script", "style", "form", "object"} and self.skip_depth:
            self.skip_depth -= 1
            return
        if tag == "div":
            if self.skip_depth:
                self.skip_depth -= 1
            self.div_depth -= 1
            if self.div_depth == 0:
                self.in_content = False
            return
        if self.skip_depth:
            return
        if tag == self.capture_tag:
            text = " ".join("".join(self.capture_parts).replace("\xa0", " ").split())
            if text and not _is_noise(text):
                block_type = "p" if tag == "li" else tag
                self.blocks.append({"type": block_type, "text": text})
            self.capture_tag = None
            self.capture_parts = []


def _is_noise(text: str) -> bool:
    lowered = text.lower()
    return (
        "please install flashplayer" in lowered
        or "пожалуйста, инсталируй актуальную версию flashplayer" in lowered
        or lowered in {"pr: wait...", "i: wait...", "l: wait...", "ld: wait...", "rank: wait...", "traffic: wait...", "price: wait...", "c: wait..."}
    )


def main() -> None:
    project = Path(sys.argv[1]).resolve()
    cache = project / ".archive-cache"
    manifest = json.loads((cache / "pages-manifest.json").read_text(encoding="utf-8-sig"))
    recovered_extras = [
        {
            "key": "newborn-walk",
            "path": "/мои-передвижения/на-прогулке-недавно-родился/",
            "timestamp": "20120913054756",
            "file": str(cache / "pages" / "newborn-walk.html"),
        },
        {
            "key": "dacha-2-months",
            "path": "/мои-передвижения/на-даче-мне-2-мес/",
            "timestamp": "20120913054805",
            "file": str(cache / "pages" / "dacha-2-months.html"),
        },
        {
            "key": "dacha-3-5-months",
            "path": "/мои-передвижения/на-даче-мне-3-5-мес/",
            "timestamp": "20120913054809",
            "file": str(cache / "pages" / "dacha-3-5-months.html"),
        },
        {
            "key": "dacha-4-5-months",
            "path": "/мои-передвижения/на-даче-мне-4-5-мес/",
            "timestamp": "20120913054814",
            "file": str(cache / "pages" / "dacha-4-5-months.html"),
        },
        {
            "key": "lada-birthday",
            "path": "/мои-передвижения/день-рождения-лады-15-апреля-2011/",
            "timestamp": "20120913054733",
            "file": str(cache / "pages" / "lada-birthday.html"),
        },
        {
            "key": "dacha-2-years",
            "path": "/мои-передвижения/на-даче-мне-уже-2-года/",
            "timestamp": "20120913054724",
            "file": str(cache / "pages" / "dacha-2-years.html"),
        },
        {
            "key": "meshchersky-pond",
            "path": "/мои-передвижения/на-мещерском-пруду-8-октября-2011/",
            "timestamp": "20120913054823",
            "file": str(cache / "pages" / "meshchersky-pond.html"),
        },
        {
            "key": "new-year-2012",
            "path": "/мои-передвижения/встреча-нового-года-2012-в-гноме/",
            "timestamp": "20130413012456",
            "file": str(cache / "pages" / "new-year-2012.html"),
        },
        {
            "key": "dacha-3-years",
            "path": "/мои-передвижения/на-даче-мне-уже-3-года-май-2012/",
            "timestamp": "20130413013556",
            "file": str(cache / "pages" / "dacha-3-years.html"),
        },
        {
            "key": "grandmothers-flowers",
            "path": "/мои-передвижения/бабушкина-флора-на-даче/",
            "timestamp": "20130413012318",
            "file": str(cache / "pages" / "grandmothers-flowers.html"),
        },
    ]
    known_keys = {item["key"] for item in manifest}
    manifest.extend(
        item for item in recovered_extras
        if item["key"] not in known_keys and Path(item["file"]).stat().st_size > 1000
    )
    pages: list[dict] = []
    images: dict[str, dict[str, str]] = {}

    for item in manifest:
        source = Path(item["file"])
        markup = source.read_text(encoding="utf-8", errors="ignore")
        parser = ContentParser(item["timestamp"])
        parser.feed(markup)
        title_match = re.search(r"<title>(.*?)</title>", markup, re.I | re.S)
        title = html.unescape(title_match.group(1)).split(" - sashulyas page!")[0].strip() if title_match else item["key"]
        pages.append({
            "key": item["key"],
            "path": item["path"],
            "title": title,
            "blocks": parser.blocks,
        })
        for image_id, url in parser.images.items():
            images.setdefault(image_id, {"id": image_id, "source": url, "timestamp": item["timestamp"]})

    (project / "app" / "archive-pages.json").write_text(
        json.dumps(pages, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    (cache / "image-sources.json").write_text(
        json.dumps(list(images.values()), ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(f"Extracted {len(pages)} pages and {len(images)} unique images")


if __name__ == "__main__":
    main()
