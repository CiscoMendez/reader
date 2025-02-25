import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useAudioSubsSync } from '@/hooks/Subtitles/useAudioSubsSync';
import { Subs } from '@/types';

interface SubtitlesProps {
  subtitles: Subs;
}

const Subtitles = ({ subtitles }: SubtitlesProps) => {
  const { border_color, high_light_color, text_color } = subtitles;
  const { activeParagraph, activeIndex } = useAudioSubsSync(subtitles);

  const textShadow = `-0.875px -1px 0 ${border_color}, 0.875px -0.875px 0 ${border_color}, -0.875px 0.875px 0 ${border_color}, 0.875px 0.875px 0 ${border_color}`;
  const classes = clsx(
    'text-center  text-xl -z-0 md:text-2xl 2xl:text-3xl font-quicksand w-full md:max-w-md 2xl:max-w-xl leading-relaxed '
  );

  return (
    <span
      className={classes}
      style={{
        position: 'absolute',
        bottom: '5%',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      {/* <span
        className="resaltador absolute top-0 left-0 w-auto h-auto rounded-xl transition-all duration-75 ease-out"
        style={{
          backgroundColor: high_light_color,
        }}
      /> */}
      {activeParagraph.map((word, i) => {
        const isActive = word.id === activeIndex;
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="relative inline-block px-1 2xl:px-2 2xl:py-1 transition-all duration-300 ease-out rounded-lg font-medium"
          >
            <span
              className="absolute top-0 left-0 w-full h-full rounded-xl"
              style={{
                transform: isActive ? 'scale(1.2)' : 'scale(1)',
                transition: 'transform 0.3s ease-in-out',
                background: isActive ? high_light_color : 'transparent',
              }}
            />
            <span
              className="relative z-10"
              style={{
                color: isActive ? '#FAFAFA' : text_color,
                transition: 'transform 0.3s ease-in-out',
                textShadow: isActive ? 'none' : textShadow,
              }}
            >
              {word.text.replace('*', '')}
            </span>
          </motion.span>
        );
      })}
    </span>
  );
};

export default Subtitles;
