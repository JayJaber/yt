import express from 'express';
import { YoutubeTranscript } from 'youtube-transcript';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/transcript/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const transcript = await YoutubeTranscript.fetchTranscript(id);
    const text = transcript
      .map((item) => item.text)
      .join(' ')
      .replace(/&amp;#39;/g, "'");

    res.json({ transcript: text });
  } catch (error) {
    console.error('Error fetching transcript:', error);
    res.status(500).json({ error: 'Failed to fetch transcript' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
