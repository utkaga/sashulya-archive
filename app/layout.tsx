import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const image = `${protocol}://${host}/og.png`;

  return {
    title: "Сайт Сашули — восстановленная семейная страница",
    description: "Восстановленная версия семейного сайта Шурика, созданного в 2009 году.",
    openGraph: {
      title: "Сайт Шурика",
      description: "Восстановленная семейная страница • 2009—2013",
      type: "website",
      images: [{ url: image, width: 1730, height: 900, alt: "Сайт Шурика" }],
    },
    twitter: { card: "summary_large_image", images: [image] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
