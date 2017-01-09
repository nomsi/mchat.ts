import * as blessed from "blessed";
import * as util from "util";

import ChatGui from "../gui/Gui";
declare let require: any; // for some reason typescript isn"t recognizing my types.

const mc = require("minecraft-protocol");
const color = require("ansi-color").set;
const states = mc.states;

export default class Minecraft {
    private server: string;
    private port: number;
    private username: string;
    private password: string;
    private box: blessed.log;
    private client: any;

    constructor(box: blessed.log, server: string, port: number, username: string, password: string) {
      this.box = box;
      this.server = server;
      this.port = port;
      this.username = username;
      this.password = password;

      this.client = mc.createClient({
        version: "1.10",
        host: this.server,
        port: this.port,
        username: this.username,
        password: this.password
      });
    }

    public init(): void {
      this.client.on("connect", () => {
        this.box.log(`connected to: ${this.server}:${this.port}!`);
      });

      this.client.on("disconnect", (packet: any) => {
        this.box.log(`disconnected from ${this.server} - ${packet.reason}`);
      });

      this.client.on("chat", (packet: any) => {
        this.parseChat(this.box, packet);
      });
    }
    public writeToChat(input: string) {
      this.client.write("chat", {message: input});
    }

    private renderUserlist(scren: blessed.screen) {
      // TODO: render userlist.
    }

    private parseChat(box: blessed.log, chatObj): void {
      if (chatObj !== "\"\"") {
        let out: string = "";
        let {extra = [], text = ""}: any = JSON.parse(chatObj.message);
        extra.forEach((text: any) => {
          if (text.hasOwnProperty("text")) out += text.text;
          else out += text.replace(/\u00A7[0-9A-FK-OR]/ig, "");
        });
        box.log(out.replace(/\u00A7[0-9A-FK-OR]/ig, "") + text.replace(/\u00A7[0-9A-FK-OR]/ig, ""));
      }
    }
}
