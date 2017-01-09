import * as emoji from "node-emoji";

export default class Emoji {

  public searchEmoji(input: string): string {
    return emoji.search(input);
  }

  public convert(input: string): string {
    return emoji.emojify(input);
  }

  public randomEmoji(input: string): string {
    return emoji.random();
  }

  public getEmoji(input: string): string {
    return emoji.get(input);
  }
}
