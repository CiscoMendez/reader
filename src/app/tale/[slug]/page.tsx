import { createTaleService } from '@/lib/services/createTaleService';
import Image from 'next/image';
import Link from 'next/link';

interface PageParams {
  slug: string;
}

interface PageProps {
  params: Promise<PageParams>;
}

export default async function Page({ params }: PageProps) {
  const taleService = createTaleService();
  const { slug } = await Promise.resolve(params);
  const tale = await taleService.getTale(slug);

  if (!tale) {
    return <div>Tale not found</div>;
  }
  return (
    <article>
      <Image
        src={tale.content.cover.url}
        alt=""
        width={500}
        height={540}
        placeholder="blur"
        blurDataURL={tale.content.cover.blurdataurl}
        priority
        style={{ height: 'auto', width: 'auto' }}
      />
      <h1>{tale.title}</h1>
      <p>{tale.content.description}</p>
      {tale.content.pages.length > 0 && (
        <Link href={`./${slug}/reader`}>start reader</Link>
      )}
    </article>
  );
}
