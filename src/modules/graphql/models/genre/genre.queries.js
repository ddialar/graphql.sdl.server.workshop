import * as GenresServices       from '../../../../../src/core/services/genres.services';
import * as MoviesGenresServices from '../../../../../src/core/services/movies-genres.services';

// ###############################################################
// ##########            READING OPERATIONS             ##########
// ###############################################################

const getAllGenres = async (parentValues, args, context, astData) => {
    try {
        return await GenresServices.getGenresData();
    } catch (error) {
        throw error;
    }
};

const getGenreById = async (parentValues, args, context, astData) => {
    try {
        return await GenresServices.getGenreById(args.id);
    } catch (error) {
        throw error;
    }
};

// ###############################################################
// ##########             FIELDS OPERATIONS             ##########
// ###############################################################

const movies = async (parentValues, args, context, astData) => {
    try {
        return await MoviesGenresServices.getMoviesDataByGenreId(parentValues.id);
    } catch (error) {
        throw error;
    }
};

const Queries = {
    getAllGenres,
    getGenreById
};

const GenreType = {
    movies
};

export {
    Queries,
    GenreType
};