import { SiteShell, sectionFromSlug } from "../site-shell";

export default async function ArchivePage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const archivePath = `/${slug.map(decodeURIComponent).join("/")}/`;
  return <SiteShell section={sectionFromSlug(slug)} archivePath={archivePath} />;
}
