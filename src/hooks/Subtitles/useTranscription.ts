import { useEffect, useState, useMemo, useCallback } from 'react';
import srtParser2 from 'srt-parser-2';
import type { TranscriptionItem, Paragraph } from '@/types';
import { groupIntoParagraphs } from '@/lib/utils/subtitles';

const useTranscription = (mediaItemUrl: string | null) => {
  const [data, setData] = useState<string | null>(null);
  const getParser = useCallback(() => new srtParser2(), []);

  useEffect(() => {
    if (mediaItemUrl) {
      // Cargar el archivo SRT
      fetch(mediaItemUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error fetching SRT: ${response.statusText}`);
          }
          return response.text();
        })
        .then((text) => setData(text))
        .catch((error) => console.error('Error loading SRT:', error));
    }
  }, [mediaItemUrl]);

  const transcription: TranscriptionItem[] = useMemo(() => {
    const parser = getParser();
    if (!data) return [];
    try {
      return parser.fromSrt(data);
    } catch (e) {
      console.error('Error parsing SRT:', e);
      return [];
    }
  }, [data, getParser]);
  const paragraphs = useMemo(() => {
    const threshold = 0.8;
    const paragraphs: Paragraph[] = groupIntoParagraphs(
      transcription,
      threshold
    );
    if (!transcription) return [];
    try {
      return paragraphs;
    } catch (e) {
      console.error('Error parsing SRT:', e);
      return [];
    }
  }, [transcription]);
  return {
    transcription,
    paragraphs,
  };
};

export default useTranscription;
