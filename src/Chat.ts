import * as blessed from "blessed";
import ChatGui from "./components/gui/Gui";
export default class Chat {
  private server: string;
  private screen: blessed.screen = blessed.screen({
    smartCSR: true,
    title: "🚀 Minecraft Chat"
  });
  public init(): void {
    const startGui = new ChatGui(this.screen);
    startGui.init();
  }
}
const chat = new Chat();
chat.init();
