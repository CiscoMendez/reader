'use client';
import { useAudioPlayerProps, StoredVolumeConfig } from '@/types';
import { useCallback, useRef, useReducer, useEffect } from 'react';
import { useLocalStorage } from '../useLocalStorage';
import { audioReducer } from '@/reducers/audioReducer';
import { AUDIO_ACTIONS } from '@/constants/audioActions';

export const useAudioPlayer = ({
  currentPage,
  localStorageKey,
  initialVolume = 0.5,
  initialMuted = false,
}: useAudioPlayerProps) => {
  const ref = useRef<HTMLAudioElement | null>(null);

  const getAudio = useCallback(() => ref.current, []);

  const defaultVolumeConfig = {
    volume: initialVolume,
    muted: initialMuted,
  };

  const [storedVolumeConfig, setStoredVolumeConfig] =
    useLocalStorage<StoredVolumeConfig>(localStorageKey, defaultVolumeConfig);

  const [states, dispatch] = useReducer(audioReducer, {
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: storedVolumeConfig.volume,
    muted: storedVolumeConfig.muted,
    ended: false,
  });

  const load = useCallback(() => {
    const audio = getAudio();
    if (audio && currentPage) {
      const { volume, muted } = storedVolumeConfig;
      audio.volume = volume;
      audio.muted = muted;
      dispatch({ type: AUDIO_ACTIONS.LOAD, volume: volume, muted: muted });
    }
  }, [getAudio, storedVolumeConfig, currentPage]);

  const play = useCallback(() => {
    const audio = getAudio();
    if (audio) {
      audio.play();
      dispatch({ type: AUDIO_ACTIONS.PLAY });
    }
  }, [getAudio]);

  const pause = useCallback(() => {
    const audio = getAudio();
    if (audio) {
      audio.pause();
      dispatch({ type: AUDIO_ACTIONS.PAUSE });
    }
  }, [getAudio]);

  const togglePlayPause = useCallback(() => {
    if (states.isPlaying) {
      pause();
    } else {
      play();
    }
  }, [states.isPlaying, play, pause]);

  const seek = useCallback(
    (time: number) => {
      const audio = getAudio();
      if (audio) {
        audio.currentTime = time;
        dispatch({ type: AUDIO_ACTIONS.SEEK, time });
      }
    },
    [getAudio]
  );

  const toggleMuted = useCallback(() => {
    const audio = getAudio();
    if (audio) {
      audio.muted = !audio.muted;
      dispatch({ type: AUDIO_ACTIONS.MUTED });
      setStoredVolumeConfig((prev) => ({
        ...prev,
        muted: audio.muted || false,
      }));
    }
  }, [getAudio, setStoredVolumeConfig]);

  const setVolume = useCallback(
    (volume: number) => {
      const audio = getAudio();
      if (audio) {
        audio.volume = volume;
        dispatch({ type: AUDIO_ACTIONS.SET_VOLUME, volume });
        setStoredVolumeConfig((prev) => ({ ...prev, volume }));
      }
    },
    [getAudio, setStoredVolumeConfig]
  );

  const reset = useCallback(() => {
    const audio = getAudio();
    if (audio) {
      audio.pause();
      audio.currentTime = 0;

      dispatch({
        type: AUDIO_ACTIONS.STOP,
      });
    }
  }, [getAudio]);

  const handleEnded = useCallback(() => {
    dispatch({ type: AUDIO_ACTIONS.ENDED });
  }, []);

  const updateTime = useCallback(() => {
    const audio = getAudio();
    if (audio && currentPage) {
      dispatch({
        type: AUDIO_ACTIONS.UPDATE_TIME,
        time: audio.currentTime || 0,
        duration: audio.duration || 0,
      });
    }
  }, [getAudio, currentPage]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const audio = getAudio();

    if (audio) {
      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [updateTime, handleEnded, getAudio]);

  useEffect(() => {
    return () => {
      if (currentPage) {
        reset();
      }
    };
  }, [currentPage, reset]);

  return {
    states,
    ref,
    play,
    togglePlayPause,
    pause,
    seek,
    toggleMuted,
    setVolume,
  };
};
