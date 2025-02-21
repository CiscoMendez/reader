import { AUDIO_ACTIONS } from "@/constants/audioActions";

export type AudioAction =
  | { type: typeof AUDIO_ACTIONS.LOAD; volume: number; muted: boolean }
  | { type: typeof AUDIO_ACTIONS.PLAY }
  | { type: typeof AUDIO_ACTIONS.PAUSE }
  | { type: typeof AUDIO_ACTIONS.STOP }
  | { type: typeof AUDIO_ACTIONS.SEEK; time: number }
  | { type: typeof AUDIO_ACTIONS.ENDED }
  | { type: typeof AUDIO_ACTIONS.MUTED }
  | { type: typeof AUDIO_ACTIONS.SET_VOLUME; volume: number }
  | { type: typeof AUDIO_ACTIONS.UPDATE_TIME; time: number; duration: number };

export interface AudioState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  muted: boolean;
  ended: boolean;
}

export interface useAudioPlayerProps {
  currentPage: number,
  localStorageKey: string;
  initialVolume?: number;
  initialMuted?: boolean;
}

export interface StoredVolumeConfig {
  volume: number;
  muted: boolean;
}

export interface VolumeControlProps {
  label: string;
  states: {
    volume: number;
    muted: boolean;
  };
  controlFns: {
    setMuted: () => void;
    setVolume: (volume: number) => void;
  };
}

export interface VolumeMenuProps {
  nStates: {
    volume: number;
    muted: boolean;
  };
  aStates: {
    volume: number;
    muted: boolean;
  };
  controls: {
    setMuted: () => void;
    setVolume: (volume: number) => void;
    ambient: {
      setMuted: () => void;
      setVolume: (volume: number) => void;
    };
  };
}