import * as MoviesServices          from '../../../../../src/core/services/movies.services';
import * as MoviesDirectorsServices from '../../../../../src/core/services/movies-directors.services';
import * as MoviesWritersServices   from '../../../../../src/core/services/movies-writers.services';
import * as MoviesActorsServices    from '../../../../../src/core/services/movies-actors.services';
import * as MoviesGenresServices    from '../../../../../src/core/services/movies-genres.services';

// ###############################################################
// ##########            READING OPERATIONS             ##########
// ###############################################################

const getAllMovies = async (parentValues, args, context, astData) => {
    try {
        return await MoviesServices.getMoviesData();
    } catch (error) {
        throw error;
    }
};

const getMovieById = async (parentValues, args, context, astData) => {
    try {
        return await MoviesServices.getMovieById(args.id);
    } catch (error) {
        throw error;
    }
};

// ###############################################################
// ##########             FIELDS OPERATIONS             ##########
// ###############################################################

const directors = async (parentValues, args, context, astData) => {
    try {
        return await MoviesDirectorsServices.getDirectorsDataByMovieId(parentValues.id);
    } catch (error) {
        throw error;
    }
};

const actors = async (parentValues, args, context, astData) => {
    try {
        return await MoviesActorsServices.getActorsDataByMovieId(parentValues.id);
    } catch (error) {
        throw error;
    }
};

const writers = async (parentValues, args, context, astData) => {
    try {
        return await MoviesWritersServices.getWritersDataByMovieId(parentValues.id);
    } catch (error) {
        throw error;
    }
};

const genres = async (parentValues, args, context, astData) => {
    try {
        return await MoviesGenresServices.getGenresDataByMovieId(parentValues.id);
    } catch (error) {
        throw error;
    }
};

const genresAsArray = async (parentValues, args, context, astData) => {
    try {
        let genres = await MoviesGenresServices.getGenresDataByMovieId(parentValues.id);
        return genres.map(genre => genre.name);
    } catch (error) {
        throw error;
    }
};

const Queries = {
    getAllMovies,
    getMovieById
};

const MovieType = {
    directors,
    actors,
    writers,
    genres,
    genresAsArray
};

export {
    Queries,
    MovieType
};