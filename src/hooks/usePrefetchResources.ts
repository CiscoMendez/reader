import { useEffect, useState } from 'react';
import type { PageContent } from '@/types';
interface PrefetchStatus {
  isLoaded: boolean;
  progress: number;
  error: Error | null;
}

export const usePrefetchResources = (resources: PageContent[] | undefined) => {
  const [status, setStatus] = useState<PrefetchStatus>({
    isLoaded: false,
    progress: 0,
    error: null,
  });

  useEffect(() => {
    if (!resources) return;

    const allAssets = resources.flatMap((page) => {
      const { back, mid, animation } = page.scene;
      return [back, mid, animation.url.chrome, animation.url.safari];
    });

    const prefetchResource = (url: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);

        xhr.onprogress = (event) => {
          if (event.lengthComputable) {
            const progress = (event.loaded / event.total) * 100;
            setStatus((prev) => ({
              ...prev,
              progress: Math.min(
                100,
                prev.progress + progress / allAssets.length
              ),
            }));
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve();
          } else {
            reject(new Error(`Failed to load ${url}: ${xhr.statusText}`));
          }
        };

        xhr.onerror = () => {
          reject(new Error(`Network error while loading ${url}`));
        };

        xhr.send();
      });
    };

    const loadAll = async () => {
      try {
        setStatus({ isLoaded: false, progress: 0, error: null });

        await Promise.all(allAssets.map(prefetchResource));

        setStatus((prev) => ({
          ...prev,
          isLoaded: true,
          progress: 100,
        }));
      } catch (error) {
        setStatus((prev) => ({
          ...prev,
          error: error instanceof Error ? error : new Error('Unknown error'),
        }));
      }
    };

    loadAll();

    return () => {
      // Cleanup if needed
    };
  }, [resources]);

  return status;
};
