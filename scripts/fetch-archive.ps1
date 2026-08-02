$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$cacheRoot = Join-Path $projectRoot ".archive-cache\pages"
$publicRoot = Join-Path $projectRoot "public\archive"
New-Item -ItemType Directory -Force $cacheRoot, $publicRoot | Out-Null

$pages = @(
  @{ key="home"; encoded="/"; timestamp="20130413013219" },
  @{ key="grandparents"; encoded="/%D0%BC%D0%BE%D0%B8-%D0%B1%D0%B0%D0%B1%D1%83%D1%88%D0%BA%D0%B0-%D0%B8-%D0%B4%D0%B5%D0%B4%D1%83%D1%88%D0%BA%D0%B0/"; timestamp="20130413011419" },
  @{ key="travels"; encoded="/%D0%BC%D0%BE%D0%B8-%D0%BF%D0%B5%D1%80%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F/"; timestamp="20130413011341" },
  @{ key="photos"; encoded="/%D1%84%D0%BE%D1%82%D0%BE%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D0%B8/"; timestamp="20130413012302" },
  @{ key="video"; encoded="/%D0%B2%D0%B8%D0%B4%D0%B5%D0%BE/"; timestamp="20130413014634" },
  @{ key="new-video"; encoded="/%D0%BD%D0%BE%D0%B2%D0%BE%D0%B5-%D0%B2%D0%B8%D0%B4%D0%B5%D0%BE/"; timestamp="20130413015458" },
  @{ key="guestbook"; encoded="/%D0%B3%D0%BE%D1%81%D1%82%D0%B5%D0%B2%D0%B0%D1%8F-%D0%BA%D0%BD%D0%B8%D0%B3%D0%B0/"; timestamp="20130413013313" },
  @{ key="newborn-walk"; encoded="/%D0%BC%D0%BE%D0%B8-%D0%BF%D0%B5%D1%80%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F/%D0%BD%D0%B0-%D0%BF%D1%80%D0%BE%D0%B3%D1%83%D0%BB%D0%BA%D0%B5-%D0%BD%D0%B5%D0%B4%D0%B0%D0%B2%D0%BD%D0%BE-%D1%80%D0%BE%D0%B4%D0%B8%D0%BB%D1%81%D1%8F/"; timestamp="20120913054756" },
  @{ key="dacha-2-months"; encoded="/%D0%BC%D0%BE%D0%B8-%D0%BF%D0%B5%D1%80%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F/%D0%BD%D0%B0-%D0%B4%D0%B0%D1%87%D0%B5-%D0%BC%D0%BD%D0%B5-2-%D0%BC%D0%B5%D1%81/"; timestamp="20120913054805" },
  @{ key="dacha-3-5-months"; encoded="/%D0%BC%D0%BE%D0%B8-%D0%BF%D0%B5%D1%80%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F/%D0%BD%D0%B0-%D0%B4%D0%B0%D1%87%D0%B5-%D0%BC%D0%BD%D0%B5-3-5-%D0%BC%D0%B5%D1%81/"; timestamp="20120913054809" },
  @{ key="dacha-4-5-months"; encoded="/%D0%BC%D0%BE%D0%B8-%D0%BF%D0%B5%D1%80%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F/%D0%BD%D0%B0-%D0%B4%D0%B0%D1%87%D0%B5-%D0%BC%D0%BD%D0%B5-4-5-%D0%BC%D0%B5%D1%81/"; timestamp="20120913054814" },
  @{ key="grandmothers-flowers"; encoded="/%D0%BC%D0%BE%D0%B8-%D0%BF%D0%B5%D1%80%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F/%D0%B1%D0%B0%D0%B1%D1%83%D1%88%D0%BA%D0%B8%D0%BD%D0%B0-%D1%84%D0%BB%D0%BE%D1%80%D0%B0-%D0%BD%D0%B0-%D0%B4%D0%B0%D1%87%D0%B5/"; timestamp="20130413012318" },
  @{ key="lada-birthday"; encoded="/%D0%BC%D0%BE%D0%B8-%D0%BF%D0%B5%D1%80%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F/%D0%B4%D0%B5%D0%BD%D1%8C-%D1%80%D0%BE%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F-%D0%BB%D0%B0%D0%B4%D1%8B-15-%D0%B0%D0%BF%D1%80%D0%B5%D0%BB%D1%8F-2011/"; timestamp="20120913054733" },
  @{ key="dacha-2-years"; encoded="/%D0%BC%D0%BE%D0%B8-%D0%BF%D0%B5%D1%80%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F/%D0%BD%D0%B0-%D0%B4%D0%B0%D1%87%D0%B5-%D0%BC%D0%BD%D0%B5-%D1%83%D0%B6%D0%B5-2-%D0%B3%D0%BE%D0%B4%D0%B0/"; timestamp="20120913054724" },
  @{ key="meshchersky-pond"; encoded="/%D0%BC%D0%BE%D0%B8-%D0%BF%D0%B5%D1%80%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F/%D0%BD%D0%B0-%D0%BC%D0%B5%D1%89%D0%B5%D1%80%D1%81%D0%BA%D0%BE%D0%BC-%D0%BF%D1%80%D1%83%D0%B4%D1%83-8-%D0%BE%D0%BA%D1%82%D1%8F%D0%B1%D1%80%D1%8F-2011/"; timestamp="20120913054823" },
  @{ key="new-year-2012"; encoded="/%D0%BC%D0%BE%D0%B8-%D0%BF%D0%B5%D1%80%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F/%D0%B2%D1%81%D1%82%D1%80%D0%B5%D1%87%D0%B0-%D0%BD%D0%BE%D0%B2%D0%BE%D0%B3%D0%BE-%D0%B3%D0%BE%D0%B4%D0%B0-2012-%D0%B2-%D0%B3%D0%BD%D0%BE%D0%BC%D0%B5/"; timestamp="20130413012456" },
  @{ key="dacha-3-years"; encoded="/%D0%BC%D0%BE%D0%B8-%D0%BF%D0%B5%D1%80%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F/%D0%BD%D0%B0-%D0%B4%D0%B0%D1%87%D0%B5-%D0%BC%D0%BD%D0%B5-%D1%83%D0%B6%D0%B5-3-%D0%B3%D0%BE%D0%B4%D0%B0-%D0%BC%D0%B0%D0%B9-2012/"; timestamp="20130413013556" },
  @{ key="new-year-2013"; encoded="/%D0%BC%D0%BE%D0%B8-%D0%BF%D0%B5%D1%80%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F/%D0%B2%D1%81%D1%82%D1%80%D0%B5%D1%87%D0%B0-%D0%BD%D0%BE%D0%B2%D0%BE%D0%B3%D0%BE-2013-%D0%B3%D0%BE%D0%B4%D0%B0/"; timestamp="20130413014830" },
  @{ key="apartment-renovation"; encoded="/%D0%BC%D0%BE%D0%B8-%D0%BF%D0%B5%D1%80%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F/%D1%84%D0%BE%D1%82%D0%BE-%D0%BD%D0%BE%D0%B2%D0%BE%D0%B9-%D0%BA%D0%B2%D0%B0%D1%80%D1%82%D0%B8%D1%80%D1%8B-%D1%80%D0%B5%D0%BC%D0%BE%D0%BD%D1%82/"; timestamp="20130413000000" }
)

$pendingLines = @()
foreach ($page in $pages) {
  $encodedPath = $page.encoded
  $decodedPath = [uri]::UnescapeDataString($page.encoded)
  $archiveUrl = "https://web.archive.org/web/$($page.timestamp)id_/http://sashulya.jimdo.com$encodedPath"
  $proxyUrl = "https://api.allorigins.win/raw?url=$([uri]::EscapeDataString($archiveUrl))"
  $destination = Join-Path $cacheRoot "$($page.key).html"
  $legacyCache = Join-Path (Split-Path $cacheRoot -Parent) "$($page.key).html"
  if ((Test-Path -LiteralPath $destination) -and (Get-Item -LiteralPath $destination).Length -gt 1000) {
    Write-Host "Reusing $decodedPath"
  } elseif ((Test-Path -LiteralPath $legacyCache) -and (Get-Item -LiteralPath $legacyCache).Length -gt 1000) {
    Copy-Item -LiteralPath $legacyCache -Destination $destination
    Write-Host "Reusing $decodedPath"
  } else {
    Write-Host "Queued $decodedPath"
    $pendingLines += "url = `"$proxyUrl`""
    $pendingLines += "output = `"$destination`""
  }
}

if ($pendingLines.Count -gt 0) {
  $pagesConfig = Join-Path (Split-Path $cacheRoot -Parent) "pages.curl"
  $pendingLines | Set-Content -LiteralPath $pagesConfig -Encoding Ascii
  & curl.exe -L -f -sS --retry 1 --retry-delay 1 --max-time 60 --parallel --parallel-max 4 --config $pagesConfig
}

$manifest = @()
foreach ($page in $pages) {
  $destination = Join-Path $cacheRoot "$($page.key).html"
  $decodedPath = [uri]::UnescapeDataString($page.encoded)
  $pageReady = (Test-Path -LiteralPath $destination) -and (Get-Item -LiteralPath $destination).Length -gt 1000
  if ($pageReady) {
    $manifest += [pscustomobject]@{ key=$page.key; path=$decodedPath; timestamp=$page.timestamp; file=$destination }
  } else {
    Write-Warning "Archive page was not available: $decodedPath"
  }
}

$manifestPath = Join-Path (Split-Path $cacheRoot -Parent) "pages-manifest.json"
$manifest | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath $manifestPath -Encoding UTF8

& python (Join-Path $PSScriptRoot "build_archive_content.py") $projectRoot
if ($LASTEXITCODE -ne 0) { throw "Archive content extraction failed" }

$imageSourcesPath = Join-Path (Split-Path $cacheRoot -Parent) "image-sources.json"
$imageSources = Get-Content -Raw -LiteralPath $imageSourcesPath | ConvertFrom-Json
$curlConfigPath = Join-Path (Split-Path $cacheRoot -Parent) "images-weserv.curl"
$curlLines = @()
foreach ($image in $imageSources) {
  $source = $image.source -replace '^https://', 'http://'
  $waybackPath = "web.archive.org/web/$($image.timestamp)id_/$source"
  $proxy = "https://images.weserv.nl/?url=$([uri]::EscapeDataString($waybackPath))&w=1200&output=jpg&q=88"
  $curlLines += "url = `"$proxy`""
  $curlLines += "output = `"public/archive/$($image.id).jpg`""
}
$curlLines | Set-Content -LiteralPath $curlConfigPath -Encoding Ascii

Write-Host "Downloading $($imageSources.Count) archived images"
Push-Location $projectRoot
try {
  & curl.exe -L -f -sS --retry 2 --retry-delay 1 --max-time 90 --parallel --parallel-max 6 --config $curlConfigPath
} finally {
  Pop-Location
}

$downloaded = Get-ChildItem -LiteralPath $publicRoot -Filter "i*.jpg" -File | Where-Object { $_.Length -gt 1000 }
Write-Host "Downloaded $($downloaded.Count) image files"
