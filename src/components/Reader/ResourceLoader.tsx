'use client';

import { useEffect } from 'react';
// const resources = [
//   'https://res.cloudinary.com/dndgpskjl/video/upload/v1739356506/01_animacion_chrome_aarnfh.mp4',
//   'https://res.cloudinary.com/dndgpskjl/video/upload/v1739356509/02_animacion_chrome_wz9fli.mp4',
// ];
function prefetchResources(resources: Array<string>) {
  for (let i = 0; i < resources.length; i++) {
    const xhrRequest = new XMLHttpRequest();
    xhrRequest.open('GET', resources[i], true);
    xhrRequest.send();
  }
}

export const ResourceLoader = ({
  resources,
  children,
}: {
  resources: string[];
  children: React.ReactNode;
}) => {
  useEffect(() => {
    prefetchResources(resources);
  }, [resources]);

  return <>{children}</>;
};
