import * as blessed from "blessed";
import * as moment from "moment";
import * as colors from "colors";

import Minecraft from "../chat/Minecraft";
import Emojis from "./Emoji";

const config = require("../../../config.json");


declare var process: any; // don't do this. this is dirty.
declare var require: any;

export default class ChatGui {

  private screen: blessed.screen;
  private emoji: Emojis = new Emojis();
  private chat: Minecraft;

  public constructor(screen) {
    this.screen = screen;
  }

  private chatBox: blessed.box = blessed.box({
    label: "console",
    width: "100%",
    height: "100%-3",
    border: { type: "line" }
  });

  private consoleLog: blessed.log = blessed.log({
    parent: this.chatBox,
    tags: true,
    scrollable: true,
    label: "",
    alwaysScroll: true,
    scrollbar: {
      ch: "", inverse: true
    },
    mouse: true
  });

  private userBox: blessed.box = blessed.box({
    // TODO: figure out a way...
  });

  private input: blessed.textbox = blessed.textbox({
    bottom: 0,
    width: "100%",
    height: 3,
    border: { type: "line" },
    inputOnFocus: true
  });


  private drawHeader(): void {
    this.print(`Hello! Chat is loaded. :] ${this.emoji.getEmoji("heart")}`);
  }

  public print(text: string) {
    const message = `${moment().format("LTS")} [${colors.green("chat")}] ${text}`;
    this.consoleLog.log(message);
  }

  public init(): void {
    this.input.key("enter", () => {
      const text = this.input.getValue();
      this.chat.writeToChat(text);
      this.input.clearValue();
      this.input.focus();
      this.screen.render();
    });

    this.input.key(["C-c", "escape"], () => process.exit(0));
    this.screen.append(this.chatBox);
    this.screen.append(this.input);
    this.screen.render();
    this.drawHeader();

    this.chat = new Minecraft(this.consoleLog, config.server, config.port, config.username, config.password);
    this.chat.init();

    this.input.focus();
  }
}
