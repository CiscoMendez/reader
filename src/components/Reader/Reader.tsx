'use client';

import ReaderContent from '@/components/Reader/ReaderContent';
import { useTaleContentContext } from '@/contexts/talecontent-context';
import AudioPlayerContextProvider from '@/contexts/audioplayer-context';
import { usePagination } from '@/hooks/usePagination';

export function Reader() {
  const { pages } = useTaleContentContext();
  const { currentPage } = usePagination(pages.length);

  return (
    <AudioPlayerContextProvider
      config={{
        currentPage: currentPage,
        localStorageKey: 'narrator-player-volume',
      }}
    >
      <ReaderContent pages={pages} />
    </AudioPlayerContextProvider>
  );
}
