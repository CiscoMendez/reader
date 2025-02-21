import { createTaleService } from '@/lib/services/createTaleService';
import Image from 'next/image';

export default async function Home() {
  const taleService = createTaleService();
  const tales = await taleService.getTales();

  if (!tales) {
    return <div>Tale not found</div>;
  }
  return (
    <article>
      {tales.map((tale, i) => (
        <div key={i}>
          <Image
            src={tale.content.cover.url}
            alt=""
            width={400}
            height={220}
            placeholder="blur"
            blurDataURL={tale.content.cover.blurdataurl}
            priority
            // style={{ height: 'auto', width: 'auto' }}
          />
          <a href={`/tale/${tale.slug}`}>{tale.title}</a>
          <p>{tale.content.description}</p>
        </div>
      ))}
    </article>
  );
}
