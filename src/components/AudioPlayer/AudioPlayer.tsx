import React, { useState } from 'react';
import Button from '@/components/UI/Button';

import { useAudioPlayerContext } from '@/contexts/audioplayer-context';
interface AudioPlayerProps {
  audioSrc: string;
}
const AudioPlayer = ({ audioSrc }: AudioPlayerProps) => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const audio = useAudioPlayerContext();

  return (
    <div className="flex gap-3">
      <audio
        ref={audio.ref}
        src={audioSrc}
        className="hidden"
        preload="metadata"
        onLoadedMetadata={() => {
          setIsReady(true);
        }}
      />
      <Button
        className="px-5"
        onClick={audio.togglePlayPause}
        disabled={!isReady}
        aria-label={
          audio.states.isPlaying ? 'Pausar audio' : 'Reproducir audio'
        }
      >
        {audio.states.isPlaying ? 'pause' : 'play'}
      </Button>

      <div className="flex flex-col gap-1 w-full py-1.5 px-3">
        <span>Volumen</span>
        <div className="flex gap-2 justify-between items-center">
          <Button
            variant="secondary"
            className="!shadow-none !p-2 !text-lg"
            onClick={audio.toggleMuted}
          >
            {audio.states.muted ? 'muted' : 'activo'}
          </Button>
          <input
            className="volumen-range"
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={audio.states.volume}
            onChange={(e) => audio.setVolume(parseFloat(e.target.value))}
            style={{
              background: `linear-gradient(to right, #E54056 ${
                audio.states.volume * 100
              }%, #e7e5e4 ${audio.states.volume * 100}%)`,
            }}
          />
          <span className="w-6 text-center">
            {Math.round(audio.states.volume * 100)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
