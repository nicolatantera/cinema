import cors from "cors";
import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;
const api_key = process.env.API_KEY;

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.json("working");
});

app.get("/api/now-playing", async (req, res) => {
  const { language, region } = req.query;

  if (!language || !region) {
    return res.status(400).json({ error: "language and region code required" });
  }

  try {
    const url = `https://api.themoviedb.org/3/movie/now_playing?language=${language}&region=${region}&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${api_key}`,
      },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP Error!\n status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching the latest movies:", error);
  }
});

app.listen(port, () => console.log(`Server running on port: ${port}`));
