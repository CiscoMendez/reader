export interface Subs {
  url: string | null;
  text_color: string;
  border_color: string;
  high_light_color: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;

}

export interface Animation{
  top: number;
  left: number;
  url: {
    chrome: string,
    safari: string,
  };
}

export interface Scenes {
  bg_color: string;
  back: string;
  mid: string;
  front: string;
  animation: Animation;
};

export interface Audio{
  story_teller: string,
  ambient?: string;
}
export interface PageContent{
  title: string;
  pageNumb: number;
    audio: Audio,
    scene: Scenes,
    subs:  Subs ;
}

export interface TaleContent {
  description: string,
  cover: {
    url: string,
    blurdataurl:string
    width: number,
    height: number
  },
  logo: string,
  pages: PageContent[] 
}

export interface Tale {
  id: string,
  slug: string,
  status: string,
  title: string,
  content: TaleContent;
};



