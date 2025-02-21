import type { WpTale, WpTaleAcf, Tale, TaleContent, PageContent, Scenes, Animation, Subs, Audio } from "@/types";

export class WordPressAdapter {
  static toTale(wpTale: WpTale): Tale {
    return {
      id: wpTale.id,
      slug: wpTale.slug,
      status: wpTale.status,
      title: wpTale.title.rendered,
      content: this.extractTaleContent(wpTale)
    };
  }

  private static extractTaleContent(wpTale: WpTale): TaleContent {
    return {
      description: wpTale.acf.description,
      cover: wpTale.acf.cover,
      logo: wpTale.acf.logo,
      pages: this.extractPages(wpTale)
    };
  }

  private static extractPages(wpTale: WpTale): PageContent[] {
    if (!wpTale.acf.pages) return [];
    
    return wpTale.acf.pages.map(page => ({
      title: page.title,
      pageNumb: page.number,
      audio: this.extractAudio(page.audio),
      scene: this.extractScene(page.scene),
      subs: this.extractSubs(page.subs)
    }));
  }

  private static extractScene(wpScene: NonNullable<WpTaleAcf['pages']>[number]['scene']): Scenes {
    return {
      bg_color: wpScene.bg_color,
      back: wpScene.back,
      mid: wpScene.mid,
      front: wpScene.front,
      animation: this.extractAnimation(wpScene.animation)
    };
  }

  private static extractAnimation(wpAnimation: NonNullable<WpTaleAcf['pages']>[number]['scene']['animation']): Animation {
    return {
      top: wpAnimation.top,
      left: wpAnimation.left,
      url: {
        chrome: wpAnimation.url.chrome,
        safari: wpAnimation.url.safari
      }
    };
  }

  private static extractAudio(wpAudio: NonNullable<WpTaleAcf['pages']>[number]['audio']): Audio {
    return {
      story_teller: wpAudio.story_teller,
      ambient: wpAudio.ambient
    };
  }

  private static extractSubs(wpSubs: NonNullable<WpTaleAcf['pages']>[number]['subs']): Subs {
    return {
      url: wpSubs.url,
      text_color: wpSubs.text_color,
      border_color: wpSubs.border_color,
      high_light_color: wpSubs.high_light_color,
      top: wpSubs.top,
      bottom: wpSubs.bottom,
      left: wpSubs.left,
      right: wpSubs.right
    };
  }
}