import * as MoviesServices from '../../../../../src/core/services/movies.services';

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

const Queries = {
    getAllMovies,
    getMovieById
};

export {
    Queries
};