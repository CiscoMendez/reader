import { TranscriptionItem,Paragraph } from "@/types";

export const findActiveIndex = (transcription:{
  id: number;
  startSeconds: number;
  endSeconds: number;
}[], currentTime:number):number => {   
  
  const activeIndex = transcription.findIndex(
    (phrase, i) =>
      currentTime >= phrase.startSeconds &&
      (!transcription[i + 1] ||
        currentTime < transcription[i + 1].startSeconds)
  );
  return activeIndex;
};

export function groupIntoParagraphs(subtitles: TranscriptionItem[], threshold: number = 1): Paragraph[] {
  const paragraphs: Paragraph[] = [];
  let currentParagraph: Paragraph | null = null;
  
  for (let i = 0; i < subtitles.length; i++) {
    const word = subtitles[i];

    if (!currentParagraph) {
      currentParagraph = {
        startBlockId: Number(word.id),
        block: [word],
      };
    } else {
      const lastWord = currentParagraph.block[currentParagraph.block.length - 1];

      if ((word.startSeconds - lastWord.endSeconds) > threshold) {
        paragraphs.push(currentParagraph);
        currentParagraph = {
          startBlockId: Number(word.id),
          block: [word],
        };
      } else {
        currentParagraph.block.push(word);
      }
    }
  }

  if (currentParagraph) {
    paragraphs.push(currentParagraph);
  }

  return paragraphs;
}

export const getCurrentParagraph = (
  paragraphs: Paragraph[], 
  activePhraseIndex: number 
): {id: number, text: string}[] => {
  
  const currentParagraph = paragraphs.find(
    (paragraph, i) =>
      paragraph.startBlockId <= activePhraseIndex &&
      (paragraphs[i + 1]?.startBlockId === undefined || activePhraseIndex < paragraphs[i + 1].startBlockId)
  );
  
  if (!currentParagraph) {
    return [];
  }

  return currentParagraph.block.map((word) => ({ id: Number(word.id), text: word.text }));
};