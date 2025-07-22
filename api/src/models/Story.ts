import mongoose, { Document, Schema } from 'mongoose';

export interface Chapter {
  title: string;
  images: string[];
  audio?: string;
  releaseDate?: Date;
}

export interface StoryDocument extends Document {
  title: string;
  author: string;
  genre: string[];
  synopsis: string;
  coverImage: string;
  chapters: Chapter[];
  createdAt: Date;
  updatedAt: Date;
}

const ChapterSchema = new Schema<Chapter>(
  {
    title: { type: String, required: true },
    images: { type: [String], default: [] },
    audio: String,
    releaseDate: Date,
  },
  { _id: false }
);

const StorySchema = new Schema<StoryDocument>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: [String], default: [] },
    synopsis: String,
    coverImage: String,
    chapters: { type: [ChapterSchema], default: [] },
  },
  { timestamps: true }
);

export const StoryModel = mongoose.model<StoryDocument>(
  'Story',
  StorySchema
);