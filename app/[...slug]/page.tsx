import { SiteShell, sectionFromSlug } from "../site-shell";

export default async function ArchivePage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  return <SiteShell section={sectionFromSlug(slug)} />;
}
