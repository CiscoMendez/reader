import { AUDIO_ACTIONS } from "@/constants/audioActions";
import { AudioAction, AudioState } from "@/types";

export const audioReducer = (state: AudioState, action: AudioAction): AudioState => {
  switch (action.type) {
    case AUDIO_ACTIONS.LOAD:
      return {
        ...state,
        volume: action.volume,
        muted: action.muted,
      };
    case AUDIO_ACTIONS.PLAY:
      return { ...state, isPlaying: true, ended: state.ended && false };
    case AUDIO_ACTIONS.PAUSE:
      return { ...state, isPlaying: false };
    case AUDIO_ACTIONS.STOP:
      return { ...state, isPlaying: false, ended: false, currentTime: 0 };
    case AUDIO_ACTIONS.SEEK:
      return { ...state, currentTime: action.time };
    case AUDIO_ACTIONS.ENDED:
      return { ...state, isPlaying: false, ended: true };
    case AUDIO_ACTIONS.SET_VOLUME:
      return { ...state, volume: action.volume };
    case AUDIO_ACTIONS.MUTED:
      return { ...state, muted: !state.muted };
    case AUDIO_ACTIONS.UPDATE_TIME:
      return { ...state, currentTime: action.time, duration: action.duration };
    default:
      return state;
  }
};