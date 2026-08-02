import Image from "next/image";
import Link from "next/link";
import archivePages from "./archive-pages.json";

type Section = "home" | "grandparents" | "travels" | "photos" | "video" | "new-video" | "guestbook";

const nav: { id: Section; href: string; label: string }[] = [
  { id: "home", href: "/", label: "Я — Шурик" },
  { id: "grandparents", href: "/мои-бабушка-и-дедушка/", label: "Мои бабушка и дедушка" },
  { id: "travels", href: "/мои-передвижения/", label: "Мои передвижения" },
  { id: "photos", href: "/фотографии/", label: "Фотографии" },
  { id: "video", href: "/видео/", label: "Видео" },
  { id: "new-video", href: "/новое-видео/", label: "Новое видео" },
  { id: "guestbook", href: "/гостевая-книга/", label: "Гостевая книга" },
];

const archivedImages: Record<string, string> = {
  i2b435cf11737b191: "1357093063/std/image.jpg",
  i3876c56a122c4732: "1279204101/std/image.jpg",
  i829ef2f03b999565: "1356604371/std/image.jpg",
  ib33df5046e37d65d: "1332065072/std/image.jpg",
  id748f89b59d6d175: "1323297832/std/image.jpg",
  ic2841c938976868b: "1279204079/std/%D0%BC%D0%BD%D0%B5-1-5-%D0%BC%D0%B5%D1%81%D1%8F%D1%86%D0%B0.jpg",
  i1330f50d35b2dc38: "1279357494/std/%D1%8F-%D0%B4%D0%BE%D0%BC%D0%B0-%D1%8F-%D1%80%D0%BE%D0%B4%D0%B8%D0%BB%D1%81%D1%8F.jpg",
  i67b6064ad72ec0de: "1279357494/std/%D0%BC%D0%BE%D0%B9-%D0%B4%D0%B5%D0%B4%D1%83%D1%88%D0%BA%D0%B0.jpg",
  i2e7f62044bc0aa08: "1279357494/std/%D0%BC%D0%BE%D1%8F-%D0%B1%D0%B0%D0%B1%D1%83%D1%88%D0%BA%D0%B0.jpg",
  i574931dff18655ce: "1279357494/std/%D1%81-%D0%BC%D0%B0%D0%BC%D0%BE%D0%B9.jpg",
  ic1b36ece71960851: "1279357494/std/%D1%81-%D0%BF%D0%B0%D0%BF%D0%BE%D0%B9.jpg",
  i5d01ab942939c90e: "1279357495/std/%D1%8F-%D0%BE%D1%82%D0%B4%D1%8B%D1%85%D0%B0%D1%8E-%D0%BF%D0%BE%D1%81%D0%BB%D0%B5-%D0%B4%D0%BE%D1%80%D0%BE%D0%B3%D0%B8-%D0%B0-%D0%B1%D0%B0%D0%B1%D1%83%D1%88%D0%BA%D0%B0-%D1%81-%D0%B4%D0%B5%D0%B4%D1%83%D1%88%D0%BA%D0%BE%D0%B9-%D0%BD%D0%B5-%D1%81%D0%BF%D1%83%D1%81%D0%BA%D0%B0%D1%8E%D1%82-%D1%81-%D0%BC%D0%B5%D0%BD%D1%8F-%D0%B3%D0%BB%D0%B0%D0%B7.jpg",
  idbd1c7b3745c1b71: "1279326874/std/image.jpg",
  ife44449681dd552a: "1357057542/std/%D0%BC%D1%8B-%D1%82%D0%BE%D0%BB%D1%8C%D0%BA%D0%BE-%D0%B2%D0%BE%D1%88%D0%BB%D0%B8-%D0%B2-%D0%BB%D0%B5%D1%81.jpg",
  id014c5f72dfc6647: "1357057542/std/%D1%82%D0%B8%D1%85%D0%BE-%D0%B8-%D0%BA%D1%80%D0%B0%D1%81%D0%B8%D0%B2%D0%BE-%D1%81%D0%BD%D0%B5%D0%B3-%D1%87%D0%B8%D1%81%D1%82%D0%B8%D1%82%D1%81%D1%8F-%D1%82%D1%80%D0%B0%D0%BA%D1%82%D0%BE%D1%80%D0%BE%D0%BC.jpg",
  ic97fd67fbdb7d5c7: "1357057542/std/image.jpg",
  i6720d45205bad27c: "1357057542/std/%D0%BC%D0%B5%D1%89%D0%B5%D1%80%D1%81%D0%BA%D0%BE%D0%B5-%D0%BE%D0%B7%D0%B5%D1%80%D0%BE-%D1%81%D0%B5%D0%B9%D1%87%D0%B0%D1%81-%D0%BF%D0%BE%D0%BA%D1%80%D1%8B%D1%82%D0%BE-%D0%BB%D1%8C%D0%B4%D0%BE%D0%BC-%D0%B8-%D1%81%D0%BD%D0%B5%D0%B3%D0%BE%D0%BC.jpg",
  ic12bcd765ac78e59: "1357057542/std/%D0%BC%D0%B0%D0%BC%D0%B0-%D0%BC%D0%BE%D1%8F.jpg",
  i46cbec267996df01: "1357057542/std/%D0%B7%D0%B0%D0%BC%D0%BE%D1%80%D0%B8%D0%BB%D0%B8-%D1%87%D0%B5%D1%80%D0%B2%D1%8F%D1%87%D0%BA%D0%B0-%D1%81-%D0%BF%D0%B0%D0%BF%D0%BE%D0%B9.jpg",
  i70634e612edb51db: "1357057542/std/%D1%82%D0%B5%D0%BF%D0%BB%D1%8B%D0%B9-%D0%B7%D0%B8%D0%BC%D0%BD%D0%B8%D0%B9-%D0%BA%D0%BE%D1%81%D1%82%D0%B5%D1%80-%D1%83-%D0%BD%D0%B0%D1%81.jpg",
  i24efaf165d348b06: "1357057542/std/%D0%BF%D0%BE%D0%B3%D1%80%D0%B5%D0%BB%D0%B8%D1%81%D1%8C-%D0%BC%D1%8B-%D1%82%D0%B5%D0%BF%D0%B5%D1%80%D1%8C-%D0%BD%D0%B0%D0%B4%D0%BE-%D0%BF%D0%BE%D1%82%D1%83%D1%88%D0%B8%D1%82%D1%8C-%D0%BA%D0%BE%D1%81%D1%82%D0%B5%D1%80.jpg",
  i6fb50f7c371f7df6: "1357057542/std/%D1%81-%D0%BB%D1%8E%D0%B1%D0%B8%D0%BC%D1%8B%D0%BC%D0%B8-%D0%BF%D0%BE%D0%B4%D0%B0%D1%80%D0%BA%D0%B0%D0%BC%D0%B8.jpg",
  i415cc780d03bd053: "1342382939/std/%D1%80%D0%BE%D0%B4%D0%B8%D1%82%D0%B5%D0%BB%D0%B8-%D0%BF%D0%BE%D0%B4%D0%BA%D0%B0%D1%80%D0%BC%D0%BB%D0%B8%D0%B2%D0%B0%D1%8E%D1%82-%D0%BC%D0%B5%D0%BD%D1%8F-%D0%BB%D0%B5%D1%81%D0%BD%D1%8B%D0%BC%D0%B8-%D1%8F%D0%B3%D0%BE%D0%B4%D0%B0%D0%BC%D0%B8.jpg",
  i881b8b0fb0f53543: "1342382939/std/%D1%8D%D1%82%D0%BE-%D0%BC%D0%BE%D0%B8-%D0%BB%D0%B8%D1%87%D0%BD%D1%8B%D0%B5-%D0%B3%D1%80%D0%B0%D0%B1%D0%BB%D0%B8.jpg",
  i188f2907e350488d: "1342382356/std/%D1%8F-%D0%B1%D0%B5%D1%80%D1%83%D1%81%D1%8C-%D0%B7%D0%B0-%D0%BB%D1%8E%D0%B1%D1%83%D1%8E-%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%83.jpg",
  iacd7b2c28a0fb538: "1342382356/std/%D0%BB%D1%8E%D0%B1%D0%BB%D1%8E-%D0%B2%D1%80%D0%B5%D0%BC%D1%8F-%D0%BA%D0%BE%D0%B3%D0%B4%D0%B0-%D1%83%D1%87%D0%B0%D1%81%D1%82%D0%BE%D0%BA-%D0%B7%D0%B0%D1%80%D0%B0%D1%81%D1%82%D0%B0%D0%B5%D1%82-%D1%82%D1%80%D0%B0%D0%B2%D0%BE%D0%B9-%D1%82%D0%BE%D0%B3%D0%B4%D0%B0-%D0%BC%D1%8B-%D0%BA%D0%BE%D1%81%D0%B8%D0%BC.jpg",
  i5c830cedb97c103d: "1342382356/std/%D1%83-%D0%BD%D0%B0%D1%81-%D0%BD%D0%B0-%D0%B4%D0%B0%D1%87%D0%B5-%D0%BF%D0%BE%D1%81%D0%B5%D0%BB%D0%B8%D0%BB%D0%B0%D1%81%D1%8C-%D0%B1%D0%B5%D0%BB%D0%BA%D0%B0.jpg",
  ia41f655c28bd9cc4: "1342382939/std/%D0%B2-%D0%BF%D0%B0%D1%80%D0%BA%D0%B5-%D0%B2-%D0%BE%D1%82%D1%80%D0%B0%D0%B4%D0%BD%D0%BE%D0%BC.jpg",
};

const availableImageIds = new Set([
  "i15e2221b7acbae3a", "i2b435cf11737b191", "i3876c56a122c4732",
  "i79f6c393e3455d52", "i829ef2f03b999565", "ib33df5046e37d65d",
  "ic2841c938976868b", "ic879d980b3b9f081", "id748f89b59d6d175",
  "ida599b8afc67ff9e",
]);

const archiveImage = (id: string) => availableImageIds.has(id)
  ? `/archive/${id}.jpg`
  : "/archive/unavailable.svg";

export function sectionFromSlug(parts: string[]): Section {
  const slug = decodeURIComponent(parts.join("/"));
  if (slug.startsWith("мои-бабушка-и-дедушка")) return "grandparents";
  if (slug.startsWith("мои-передвижения")) return "travels";
  if (slug.startsWith("фотографии")) return "photos";
  if (slug.startsWith("новое-видео")) return "new-video";
  if (slug.startsWith("видео")) return "video";
  if (slug.startsWith("гостевая-книга")) return "guestbook";
  return "home";
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="archive-stamp"><span>Сайт восстановлен</span><strong>2009—2013</strong><small>по материалам веб-архива</small></div>
      <h3>Самое интересное и новое обо мне:</h3>
      <Image className="sidebar-image" src={archiveImage("i2b435cf11737b191")} alt="Цирк Деда Мороза" width={180} height={133} unoptimized />
      <p className="hot"><Link href="/мои-передвижения/">Новый 2013 год</Link><br />Я в Цирке Деда Мороза и Бериляки — было необыкновенно весело!</p>
      <p className="hot">Весной и летом 2012 я на даче. Отчёт — в фотографиях.</p>
      <p className="green">И ещё представлена галерея моей бабушки — очень красиво!</p>
      <Image className="sidebar-image portrait" src={archiveImage("i3876c56a122c4732")} alt="С бабушкой, мне полгодика" width={180} height={252} unoptimized />
      <p className="caption">Это — моя бабушка. Мне полгодика.</p>
    </aside>
  );
}

function HomeContent() {
  return <>
    <h1>Основные записи моего сайта</h1>
    <article className="post">
      <p className="date red">10.03.2012 года</p>
      <h2>Бабушке, дедушке и всем, кому интересно )))</h2>
      <p>Родители начали ремонт в квартире, куда мы переедем вскоре. Отчёт — на фотографиях. Теперь у меня будет своя комната.</p>
    </article>
    <article className="post with-photo">
      <p className="date">27.12.2012 года</p>
      <Image src={archiveImage("i829ef2f03b999565")} alt="Новогодний утренник" width={150} height={200} unoptimized />
      <div><h2 className="red">С уже Наступившим Вас Новым 2013 Годом!</h2>
      <p className="maroon">Счастья и здоровья желаю, пусть непременно сбудутся Ваши мечты! Пусть вам родители купят все машинки и поезда в Детском Мире, все скорые помощи и мусоровозы.</p>
      <p className="violet">У меня 27 декабря был Новогодний утренник в саду. Видео можно посмотреть <Link href="/новое-видео/">здесь</Link>.</p></div>
    </article>
    <article className="post with-photo">
      <p className="date">18.03.2012 года</p>
      <Image src={archiveImage("ib33df5046e37d65d")} alt="Шурик весной 2012 года" width={150} height={266} unoptimized />
      <div><p className="green"><strong>Поступили жалобы на отсутствие обновлений на моём сайте ))). Действительно, я брал паузу в работе над отчётом своей жизни здесь. Скоро начнётся дачный сезон и скоро у меня будет День Рождения — 3 года!</strong></p>
      <p><Link href="/фотографии/">Вот несколько свежих фотографий.</Link></p></div>
    </article>
    <article className="post with-photo">
      <p className="date">08.12.2011</p>
      <Image src={archiveImage("id748f89b59d6d175")} alt="Мне 2 года 7,5 месяцев" width={210} height={140} unoptimized />
      <div><h2 className="brown">Я взрослый, потому что:</h2><ul><li>говорю всё подряд</li><li>вожу машину</li><li>всё делаю САМ</li></ul><p><strong>И не нужно думать, что я ещё маленький. Я — большой.</strong></p></div>
    </article>
    <article className="post with-photo">
      <p className="date">05.06.2009</p>
      <Image src={archiveImage("ic2841c938976868b")} alt="Мне 1,5 месяца" width={133} height={177} unoptimized />
      <div><h2>Здравствуйте!</h2><p className="navy"><strong>Меня зовут Саша. Родные называют Шуриком, Сашулей и т. д. А иногда и Александром Сергеевичем. Родился я 20 апреля 2009 года, ранним прохладным весенним утром, в Москве.</strong></p><p>Мы с мамой и папой стараемся постоянно обновлять коллекцию, чтобы Вам было интересно наблюдать за моим ростом и развитием.</p><p className="signature">Ваш Шурик.</p></div>
    </article>
  </>;
}

const familyPhotos = [
  ["i3876c56a122c4732", "С бабушкой, мне полгодика"],
  ["i1330f50d35b2dc38", "Я дома! Я родился!"], ["i67b6064ad72ec0de", "Мой дедушка"],
  ["i2e7f62044bc0aa08", "Моя бабушка"], ["i574931dff18655ce", "С мамой"],
  ["ic1b36ece71960851", "С папой"], ["i5d01ab942939c90e", "После дороги — под присмотром бабушки и дедушки"],
];

function GrandparentsContent() {
  const preservedFamilyPhotos = familyPhotos.filter(([id]) => availableImageIds.has(id));
  return <><h1>Валентина Дмитриевна и Пётр Александрович</h1><p className="lead">Апрель 2011 года</p>
    <div className="family-grid">{preservedFamilyPhotos.map(([id, caption]) => <figure key={id}><a href={archiveImage(id)} target="_blank"><Image src={archiveImage(id)} alt={caption} width={240} height={180} unoptimized /></a><figcaption>{caption}</figcaption></figure>)}</div>
    <div className="recovery-note">Остальные семейные фотографии перечислены в архивном HTML, но их исходные JPEG-файлы Jimdo не сохранились.</div>
  </>;
}

const albums = [
  ["На прогулке — недавно родился", "Первые прогулки.", "на-прогулке-недавно-родился"],
  ["На даче — мне 2 месяца", "Первые дачные прогулки и отдых в коляске.", "на-даче-мне-2-мес"],
  ["На даче — мне 3,5 месяца", "Лето, цветы и первые маленькие открытия.", "на-даче-мне-3-5-мес"],
  ["На даче — мне 4,5 месяца", "Ещё один семейный фотоотчёт.", "на-даче-мне-4-5-мес"],
  ["День рождения Лады — 15 апреля 2011", "Поездка на день рождения.", "день-рождения-лады-15-апреля-2011"],
  ["На даче — мне уже 2 года", "Семейный дачный фотоотчёт.", "на-даче-мне-уже-2-года"],
  ["На Мещерском пруду — 8 октября 2011", "Осенняя прогулка всей семьёй.", "на-мещерском-пруду-8-октября-2011"],
  ["Встреча Нового года 2012 в «Гноме»", "Новогодний праздник.", "встреча-нового-года-2012-в-гноме"],
  ["На даче — мне уже 3 года, май 2012", "Весенний дачный сезон.", "на-даче-мне-уже-3-года-май-2012"],
  ["Бабушкина флора на даче", "Большая архивная галерея цветов.", "бабушкина-флора-на-даче"],
  ["Встреча Нового 2013 года", "Цирк Деда Мороза и Бериляки.", "встреча-нового-2013-года"],
  ["Фото новой квартиры — ремонт", "Фотографии ремонта перед переездом.", "фото-новой-квартиры-ремонт"],
];

function TravelsContent() {
  return <><h1>Мои передвижения</h1><div className="intro-card"><Image src={archiveImage("i15e2221b7acbae3a")} alt="На даче" width={240} height={180} unoptimized /><div><h2>На даче</h2><p className="date">17.06—21.06.2009</p><p>Я впервые на даче. Погода была хорошая, но не солнечная. В основном меня запечатлевали в домике или в коляске, чтобы я ни в коем случае не простудился.</p></div></div>
  <h2 className="album-heading">Архивные фотоистории</h2><div className="album-list">{albums.map(([title, text, slug], i) => <article key={title}><span>{String(i + 1).padStart(2, "0")}</span><div><h3><Link href={`/мои-передвижения/${slug}/`}>{title}</Link></h3><p>{text}</p></div></article>)}</div></>;
}

const featuredGallery = ["ife44449681dd552a", "id014c5f72dfc6647", "ic97fd67fbdb7d5c7", "i6720d45205bad27c", "ic12bcd765ac78e59", "i46cbec267996df01", "i70634e612edb51db", "i24efaf165d348b06", "i6fb50f7c371f7df6", "i415cc780d03bd053", "i881b8b0fb0f53543", "i188f2907e350488d", "iacd7b2c28a0fb538", "i5c830cedb97c103d", "ia41f655c28bd9cc4"];

function PhotosContent() {
  const recovered = [...availableImageIds].filter((id) => !["i79f6c393e3455d52", "ida599b8afc67ff9e"].includes(id));
  return <><h1>Фотогалерея</h1><p className="lead">Щёлкните по фотографии, чтобы открыть её крупнее. Все показанные файлы теперь находятся внутри восстановленного сайта и не зависят от Jimdo или Wayback Machine.</p><div className="photo-grid">{recovered.map((id, index) => <a key={id} href={archiveImage(id)} target="_blank" aria-label={`Открыть фотографию ${index + 1}`}><Image src={archiveImage(id)} alt={`Сохранившаяся архивная фотография ${index + 1}`} width={220} height={165} unoptimized /></a>)}</div><div className="recovery-note"><strong>В публичном веб-архиве сохранились 8 фотографий и 2 декоративных изображения.</strong><br />В HTML оригинала перечислены ещё сотни фотографий, но сами JPEG-файлы Jimdo не были заархивированы. Их места и подписи сохранены в архивных данных проекта; пустые внешние картинки больше не выводятся.</div></>;
}

const oldVideos = [
  ["6o9tkWvLegI", "30 октября 2009 — учусь говорить самое главное слово"],
  ["2C9Io0QfN8I", "23 июля 2009"], ["6dojibdY6EA", "20 июня 2009"], ["eGm3X5FPggM", "2 мая 2009"],
];
const newerVideos = [
  ["KksqpgXfcq8", "Поздравление мам и бабушек в детском саду № 50"],
  ["mSvAgESDWJA", "Разговариваю по телефону в позе лёжа — как папа"],
  ["3MUG-tYS7P4", "Разговор по Skype с дедушкой и бабушкой"],
  ["ebpwfqYEUwQ", "Ем яблоко в автобусе, еду за молоком с мамой"],
  ["Apb1A-0wpVk", "Новогодний утренник в детском саду"],
  ["A-Crf2CbEsY", "Праздник осени в детском саду"],
];

function VideosContent({ newer = false }: { newer?: boolean }) {
  const videos = newer ? newerVideos : oldVideos;
  return <><h1>{newer ? "Новое видео" : "Видео"}</h1><p className="lead">Архивные ролики снова открываются через оригинальные записи на YouTube.</p><div className="video-list">{videos.map(([id, title]) => <article key={id}><h2>{title}</h2><div className="video-frame"><iframe src={`https://www.youtube-nocookie.com/embed/${id}`} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div></article>)}</div></>;
}

function GuestbookContent() {
  return <><h1>Гостевая книга</h1><div className="guestbook"><p>Дорогой гость сайта, если у Вас есть желание, напишите письмо — и мои родители обязательно Вам ответят.</p><a className="mail-button" href="mailto:utka-go@bk.ru?subject=Гостевая книга сайта Шурика">Написать в гостевую книгу</a><p className="small-note">Оригинальная форма Jimdo больше не работает, поэтому в восстановленной версии используется обычное письмо.</p></div></>;
}

type ArchiveBlock = { type: "h1" | "h2" | "h3" | "p" | "image" | "video"; text?: string; id?: string; alt?: string };
type ArchivePageRecord = { path: string; blocks: ArchiveBlock[] };

function ArchivePageContent({ path }: { path: string }) {
  const normalized = decodeURIComponent(path).replace(/\/+/g, "/").replace(/\/?$/, "/");
  const page = (archivePages as ArchivePageRecord[]).find((item) => item.path === normalized);
  const album = albums.find((item) => normalized.endsWith(`/${item[2]}/`));
  const blocks = page?.blocks ?? [];
  const renderable = blocks.filter((block) => block.type !== "image" || (block.id && availableImageIds.has(block.id)));

  return <>
    <Link className="back-link" href="/мои-передвижения/">← Все фотоистории</Link>
    {renderable.length > 0 ? renderable.map((block, index) => {
      const key = `${block.type}-${index}`;
      if (block.type === "h1") return <h1 key={key}>{block.text}</h1>;
      if (block.type === "h2") return <h2 key={key}>{block.text}</h2>;
      if (block.type === "h3") return <h3 key={key}>{block.text}</h3>;
      if (block.type === "p") return <p key={key}>{block.text}</p>;
      if (block.type === "image" && block.id) return <a className="archive-single-photo" key={key} href={archiveImage(block.id)} target="_blank"><Image src={archiveImage(block.id)} alt={block.alt || "Архивная фотография"} width={720} height={540} unoptimized /></a>;
      if (block.type === "video" && block.id && /^[\w-]{6,}$/.test(block.id)) return <div className="video-frame" key={key}><iframe src={`https://www.youtube-nocookie.com/embed/${block.id}`} title="Архивное видео" allowFullScreen /></div>;
      return null;
    }) : <><h1>{album?.[0] || "Архивная страница"}</h1><p>{album?.[1] || "Страница найдена в структуре исходного сайта."}</p></>}
    <div className="recovery-note"><strong>Страница восстановлена и снова открывается по исходному адресу.</strong><br />Текст, подписи и видео перенесены из сохранённой HTML-копии. Фотографии выводятся только там, где веб-архив сохранил сам файл, а не одну внешнюю ссылку Jimdo.</div>
  </>;
}

function Content({ section, archivePath }: { section: Section; archivePath?: string }) {
  if (section === "travels" && archivePath && archivePath !== "/мои-передвижения/") return <ArchivePageContent path={archivePath} />;
  if (section === "grandparents") return <GrandparentsContent />;
  if (section === "travels") return <TravelsContent />;
  if (section === "photos") return <PhotosContent />;
  if (section === "video") return <VideosContent />;
  if (section === "new-video") return <VideosContent newer />;
  if (section === "guestbook") return <GuestbookContent />;
  return <HomeContent />;
}

export function SiteShell({ section, archivePath }: { section: Section; archivePath?: string }) {
  return <div className="site-wrap">
    <header className="site-header"><div className="cloud cloud-one" /><div className="cloud cloud-two" /><Image src="/archive/header.jpg" alt="Сайт Шурика" width={452} height={75} priority unoptimized /></header>
    <nav className="main-nav" aria-label="Основная навигация">{nav.map((item) => <Link key={item.id} className={section === item.id ? "active" : ""} href={item.href}>{item.label}</Link>)}</nav>
    <div className="content-shell"><main className="main-content"><Content section={section} archivePath={archivePath} /></main><Sidebar /></div>
    <footer>© Александр Криков. Все права защищены. <span>Восстановлено по архивной версии 2013 года.</span></footer>
  </div>;
}
