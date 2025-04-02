import express from 'express';
import { YoutubeTranscript } from 'youtube-transcript';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Route to get the transcript of a YouTube video based on its ID
app.get('/transcript/:id', async (req, res) => {
  try {
    const videoId = req.params.id; // Get video ID from URL parameter
    if (!videoId) {
      return res
        .status(400)
        .json({ error: 'Please provide a valid video ID.' });
    }

    // Construct YouTube URL using the video ID
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

    // Fetch transcript
    const transcript = await YoutubeTranscript.fetchTranscript(videoUrl);
    const text = transcript
      .map((item) => item.text)
      .join(' ')
      .replace(/&amp;#39;/g, "'");

    // Send the transcript text as the response
    res.json({ transcript: text });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the transcript.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
