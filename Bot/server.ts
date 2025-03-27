// server.ts
import express from "express";
import dotenv from "dotenv";
import bot from "./bot";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Optional: webhook support
app.post("/bot", async (req, res) => {
  try {
    await bot.handleUpdate(req.body);
    res.sendStatus(200);
  } catch (error) {
    console.error("Telegram bot error:", error);
    res.sendStatus(500);
  }
});

// Start with long polling
bot.start();

app.listen(PORT, () => {
  console.log(`Bot server running on http://localhost:${PORT}`);
});

// Graceful shutdown
const stopRunner = async () => {
  console.log("Stopping the bot...");
  await bot.stop();
  process.exit(0);
};

process.once("SIGINT", stopRunner); // Ctrl+C or manual kill
process.once("SIGTERM", stopRunner); // Cloud platform shutdown
