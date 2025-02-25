

export interface TaleData {
  title: string,
  slug: string;
  animated: boolean,
  description: string,
  taleCover: string,
  taleLogo: string,
  logoPosition: string,
  bgColor: string,
  bgText: string,
  decLomo: string,
  imgBg: string,
  imgBgOpacity: number,
  imgBgBorderColor: string,
  imgBgBlendMode: string ,
  pdfUrl: string
}
export interface TaleEntry {
  id: string,
  body?: string
  collection: string | undefined;
  data: TaleData;
  filePath?: string;
  
};

export interface AnimationV{
  url: {
    chrome: string,
    safari: string,
  };
  top: number;
  left: number;
}

export interface Scene {
  bgColor: string;
  backScene: string;
  midScene: string;
  frontScene: string;
  animation: AnimationV;
};


export interface PageData{
  title: string;
    pageNumb: number;
    sounds: {
      storyTeller: {
        url: string;
        trackDuration: number;
      };
      ambientSound?: string;
    };
    scene: Scene,
    transcription:  Transcription ;
}
export interface PageEntry {
  id: string;
  body?: string;
  collection: string;
  data: PageData;
  filePath?: string;
} 


export interface Transcription {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  textColor: string;
  borderColor: string;
  highLightColor: string;
  url: string | null;
}
export interface TranscriptionItem {
  id: string;
  startTime: string;
  startSeconds: number;
  endTime: string;
  endSeconds: number;
  text: string;
}
export interface Paragraph {
  startBlockId: number;
  block: TranscriptionItem[];
}


export interface TutorialContent {
  img: string;
  title: string;
  text: string;
}


export interface Preload {
  as: string;
  href: string;
  type: string;
  rel?: 'preload' | 'prefetch';
  crossorigin?: string;
}

export interface VideoSource {
  url: {
    chrome: string;
    safari: string;
  };
}