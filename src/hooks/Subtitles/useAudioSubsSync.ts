import { useState, useMemo, useCallback } from 'react';
import { useAnimationFrame } from './useAnimationFrame';
import useTranscription from './useTranscription';
import { useAudioPlayerContext } from '@/contexts/audioplayer-context';
import { findActiveIndex, getCurrentParagraph } from '@/lib/utils/subtitles';
import { Subs } from '@/types';

export const useAudioSubsSync = (subtitles: Subs) => {
  const {
    getAudio,
    states: { isPlaying },
  } = useAudioPlayerContext();
  const playerRef = getAudio();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { transcription, paragraphs } = useTranscription(subtitles.url);

  const transcriptionTimes = useMemo(
    () =>
      transcription.map((item) => ({
        id: Number(item.id),
        startSeconds: item.startSeconds,
        endSeconds: item.endSeconds,
      })),
    [transcription]
  );

  const updateActivePhraseIndex = useCallback(() => {
    if (!playerRef || !transcriptionTimes.length) return;

    const currentTime = playerRef.currentTime;
    const newIndex = findActiveIndex(transcriptionTimes, currentTime);
    const newActiveIndex = Number(transcriptionTimes[newIndex]?.id);

    setActiveIndex((prevIndex) =>
      prevIndex !== newActiveIndex ? newActiveIndex : prevIndex
    );
  }, [playerRef, transcriptionTimes]);

  const currentParagraph = useMemo(
    () => getCurrentParagraph(paragraphs, activeIndex),
    [paragraphs, activeIndex]
  );

  useAnimationFrame(
    useCallback(() => updateActivePhraseIndex(), [updateActivePhraseIndex]),
    isPlaying
  );

  return {
    activeParagraph: currentParagraph,
    activeIndex,
  };
};
