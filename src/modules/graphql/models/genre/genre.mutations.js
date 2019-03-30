import * as GenresServices from '../../../../core/services/genres.services';
import * as MoviesGenresServices from '../../../../core/services/movies-genres.services';

const addGenre = async (parentValues, args, context, astData) => {
    try {
        let persistedGenreData = await GenresServices.addGenre(args.data);

        return persistedGenreData;
    } catch (error) {
        throw error;
    }
};

const addMoviesToGenre = async (parentValues, args, context, astData) => {
    try {
        let persistedGenreMoviesData = await MoviesGenresServices.addMoviesToGenre(args.id, args.movies);

        if (persistedGenreMoviesData) {
            return await GenresServices.getGenresData(args.id);
        } else {
            return [];
        }
    } catch (error) {
        throw error;
    }
};

const updateGenre = async (parentValues, args, context, astData) => {
    try {
        return await GenresServices.updateGenre(args.id, args.data);
    } catch (error) {
        throw error;
    }
};

// COMMENTS: After executing this methos, introduce the ResultType.
const deleteGenre = async (parentValues, args, context, astData) => {
    try {
        // return await GenresServices.deleteGenre(args.id);
        await GenresServices.deleteGenre(args.id);
        await MoviesGenresServices.deleteGenreMovies(args.id);
        return { code: 200 };
    } catch (error) {
        throw error;
    }
};

const deleteGenreMovies = async (parentValues, args, context, astData) => {
    try {
        await MoviesGenresServices.deleteGenreMovies(args.id, args.movies);
        return await GenresServices.getGenresData(args.id);
    } catch (error) {
        throw error;
    }
};

export {
    addGenre,
    // addMoviesToGenre,
    updateGenre,
    deleteGenre,
    // deleteGenreMovies
};