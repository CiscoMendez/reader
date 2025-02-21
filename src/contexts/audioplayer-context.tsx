'use client';
import { useAudioPlayer } from '@/hooks/AudioPlayer/useAudioPlayer';
import { useAudioPlayerProps } from '@/types';
import { useContext, createContext } from 'react';

interface AudioPlayerContextProps {
  children: React.ReactNode;
  config: useAudioPlayerProps;
}

type AudioPlayerContextType = ReturnType<typeof useAudioPlayer>;

export const AudioPlayerContext = createContext<AudioPlayerContextType | null>(
  null
);

export default function AudioPlayerContextProvider({
  children,
  config,
}: AudioPlayerContextProps) {
  const audioPlayer = useAudioPlayer(config);
  return (
    <AudioPlayerContext.Provider value={audioPlayer}>
      {children}
    </AudioPlayerContext.Provider>
  );
}

export const useAudioPlayerContext = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error(
      'useAudioPlayerContext must be used within an AudioPlayerContextProvider'
    );
  }
  return context;
};
