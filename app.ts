// app.ts
import express from "express";
import ytdl from "ytdl-core";
import { exec } from "child_process";
import { existsSync, mkdirSync } from "fs";

const ffmpegPath = "/usr/bin/ffmpeg";

const app = express();
const port = 3000;

// Create the 'downloads' directory if it doesn't exist
const downloadsDir = "./downloads";
if (!existsSync(downloadsDir)) {
  mkdirSync(downloadsDir);
}

app.use(express.json());

app.post("/download", async (req, res) => {
  try {
    const { videoUrl } = req.body;

    if (!videoUrl) {
      return res.status(400).json({ error: "Video URL is required" });
    }

    const outputPath = await downloadAndConvertAudio(videoUrl);
    res
      .status(200)
      .json({ message: "Audio downloaded successfully", outputPath });
  } catch (error) {
    console.error("Error downloading audio:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route for downloading music from YouTube shorts videos
app.post("/shorts-music", async (req, res) => {
  try {
    const { videoUrl } = req.body;

    if (!videoUrl) {
      return res.status(400).json({ error: "Video URL is required" });
    }

    const outputPath = await downloadAndConvertAudio(videoUrl);
    res
      .status(200)
      .json({ message: "Audio downloaded successfully", outputPath });
  } catch (error) {
    console.error("Error downloading audio:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

async function downloadAndConvertAudio(videoUrl: string): Promise<string> {
  // Download YouTube video
  const videoInfo = await ytdl.getInfo(videoUrl);
  const videoFormat = ytdl.chooseFormat(videoInfo.formats, {
    filter: "audioonly",
  });

  // Convert video to audio using ffmpeg
  const outputPath = `${downloadsDir}/${videoInfo.videoDetails.title.replace(
    /[^a-zA-Z0-9]/g,
    "_"
  )}.mp3`;
  const ffmpegCommand = `"${ffmpegPath}" -i "${videoFormat.url}" -vn -ar 44100 -ac 2 -b:a 192k "${outputPath}"`;

  return new Promise((resolve, reject) => {
    exec(ffmpegCommand, (error) => {
      if (error) {
        console.error("Error converting video to audio:", error);
        reject("Internal Server Error");
      }

      console.log("Audio conversion successful");
      resolve(outputPath);
    });
  });
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
