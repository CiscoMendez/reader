export interface WpTaleAcf {
  description: string;
  cover: {
    url: string,
    blurdataurl:string
    width: number,
    height: number
  }
  logo: string;
  pages: Array<{
    title: string;
    number: number;
    audio: {
      story_teller: string;
      ambient?: string;
    };
    scene: {
      bg_color: string;
      back: string;
      mid: string;
      front: string;
      animation: {
        top: number;
        left: number;
        url: {
          chrome: string;
          safari: string;
        };
      };
    };
    subs: {
      url: string | null;
      text_color: string;
      border_color: string;
      high_light_color: string;
      top?: string;
      bottom?: string;
      left?: string;
      right?: string;
    };
  }> | null;
};

export interface WpTale {
  id: string;
  slug: string;
  status: string;
  title: {
    rendered: string;
  };
  acf: WpTaleAcf
}