import * as MoviesServices          from '../../../../../src/core/services/movies.services';
// import * as MoviesDirectorsServices from '../../../../../src/core/services/movies-directors.services';

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

// const directors = async (parentValues, args, context, astData) => {
//     try {
//         return await MoviesDirectorsServices.getDirectorsDataByMovieId(parentValues.id);
//     } catch (error) {
//         throw error;
//     }
// };

const Queries = {
    getAllMovies,
    getMovieById
};

// const MovieType = {
//     directors,
// };

export {
    Queries,
    // MovieType
};