import { IMovieDB } from '@/interfaces';
import { Schema, model, models } from 'mongoose';

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

export const Movie = models.Movie || model('Movie', movieSchema);
