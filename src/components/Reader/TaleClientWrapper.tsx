'use client'; // Marca este componente como de cliente

import { useTaleContentContext } from '@/contexts/talecontent-context';
import { usePrefetchResources } from '@/hooks/usePrefetchResources';
import LoaderScreen from './LoaderScreen';

interface TaleClientWrapperProps {
  children: React.ReactNode;
}

export default function TaleClientWrapper({
  children,
}: TaleClientWrapperProps) {
  const { pages, cover, logo } = useTaleContentContext();
  const status = usePrefetchResources(pages);

  return (
    <>
      {!status.isLoaded && (
        <LoaderScreen
          cover={cover}
          logo={logo}
          progressPercent={status.progress}
        />
      )}
      {status.isLoaded && children}
    </>
  );
}
