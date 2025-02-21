import React from 'react';

import { motion } from 'motion/react';
import { useAudioPlayerContext } from '@/contexts/audioplayer-context';

interface AudioProgressBarProps {
  barColor?: string;
  height?: string;
}

const TRANSITIONS = {
  width: { ease: 'linear', duration: 0.3 },
};

const AudioProgressBar: React.FC<AudioProgressBarProps> = ({
  barColor = '#FFFFFF',
  height = '8px',
}) => {
  const { states, seek } = useAudioPlayerContext();
  const progress = isNaN((states.currentTime * 100) / states.duration)
    ? 0
    : (states.currentTime * 100) / states.duration;

  return (
    <div className="absolute bottom-0 z-10 w-full">
      <div
        className="relative h-2 w-full bg-white/60 rounded-xl overflow-hidden"
        style={{ height: height }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={progress === 0 ? { width: 0 } : { width: `${progress}%` }}
          transition={progress === 0 ? { duration: 0 } : TRANSITIONS}
          className="absolute h-full rounded-xl"
          style={{ backgroundColor: states.ended ? 'red' : barColor }}
        />
        <input
          className="absolute -top-1 left-0 w-full opacity-0 cursor-pointer"
          type="range"
          name="progress"
          min={0}
          max={states.duration}
          value={states.currentTime}
          onChange={(e) => {
            seek(e.currentTarget.valueAsNumber);
          }}
        />
      </div>
    </div>
  );
};

export default AudioProgressBar;
