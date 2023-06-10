import { IMovieDB } from '@/interfaces';
import { Schema, model, models, Model } from 'mongoose';

const movieSchema = new Schema<IMovieDB>({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  genre: {
    type: String,
    require: true,
  },
  thumbnailUrl: {
    type: String,
    require: true,
  },
  duration: {
    type: String,
    require: true,
  },
});

export const Movies: Model<IMovieDB> =
  models.Movies || model('Movies', movieSchema);
