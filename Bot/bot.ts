// bot.ts
import { Bot } from "grammy";
import dotenv from "dotenv";

dotenv.config();

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!); // your bot token in .env

bot.command("start", (ctx) => {
  ctx.reply("Welcome to SnapView!", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Open SnapView Mini App",
            web_app: {
              url: process.env.MINI_APP_URL!, // Update this to your Next.js mini app URL
            },
          },
        ],
      ],
    },
  });
});

export default bot;
