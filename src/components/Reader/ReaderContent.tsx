'use client';
import { usePagination } from '@/hooks/usePagination';
import VideoCanvas from '../VideoCanvas';
import type { PageContent } from '@/types';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import AudioProgressBar from '../AudioPlayer/AudioProgressBar';
import Link from 'next/link';

const ReaderContent = ({ pages }: { pages: PageContent[] }) => {
  const { currentPage, nextPage, prevPage } = usePagination(pages.length);
  if (!pages) return;
  return (
    <div key={currentPage} className="relative h-dvh">
      <div
        className="absolute -z-10 w-full h-full bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${pages[currentPage - 1].scene.back})` }}
      />
      <VideoCanvas
        url={pages[currentPage - 1].scene.animation.url}
        top={pages[currentPage - 1].scene.animation.top}
        left={pages[currentPage - 1].scene.animation.left}
      />
      <div className="absolute top-0 flex w-full h-screen items-center justify-between px-4">
        <AudioPlayer audioSrc={pages[currentPage - 1].audio.story_teller} />
        <Link
          className="rounded-md bg-red-500 text-red-50 flex px-4 py-2 disabled:opacity-70"
          href={prevPage()}
          replace
        >
          atras
        </Link>
        <Link
          className="rounded-md bg-red-500 text-red-50 flex px-4 py-2 disabled:opacity-70"
          href={nextPage()}
          replace
        >
          siguiente
        </Link>
      </div>
      <AudioProgressBar barColor="#AAAA" />
    </div>
  );
};

export default ReaderContent;
