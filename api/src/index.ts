import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { StoryModel, StoryDocument } from './models/Story';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI!;
if (!MONGO_URI) {
  console.error('Missing MONGO_URI');
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('🗄️ MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('API error:', err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Error' });
});

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.post('/stories/seed', async (_req, res) => {
  try {
    const sample: Partial<StoryDocument> = {
      title: 'Mythic Origins',
      author: 'Litha',
      genre: ['fantasy', 'magic'],
      synopsis: 'A hidden world behind glowing panels.',
      coverImage: 'https://picsum.photos/id/1005/600/900',
      chapters: [
        {
          title: 'Chapter 1: Awakening',
          images: [
            'https://picsum.photos/seed/panel1/800/1200',
            'https://picsum.photos/seed/panel2/800/1200',
            'https://picsum.photos/seed/panel3/800/1200',
          ],
          audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        },
        {
          title: 'Chapter 2: Echoes',
          images: [
            'https://picsum.photos/seed/panel4/800/1200',
            'https://picsum.photos/seed/panel5/800/1200',
          ],
        },
      ],
    };
    const story = await StoryModel.create(sample);
    res.status(201).json(story);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/stories', async (_req, res) => {
  const stories = await StoryModel.find({}, 'title coverImage author genre');
  res.json(stories);
});

app.get('/stories/:id', async (req, res, next) => {
  try {
    const story = await StoryModel.findById(req.params.id);
    if (!story) return res.status(404).json({ error: 'Not found' });
    res.json(story);
  } catch (err) {
    next(err);
  }
});

app.post('/stories', async (req, res, next) => {
  try {
    const created = await StoryModel.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

app.put('/stories/:id', async (req, res, next) => {
  try {
    const updated = await StoryModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

app.delete('/stories/:id', async (req, res, next) => {
  try {
    await StoryModel.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 API running on http://localhost:${PORT}`);
});