import * as GenresServices from '../../../../../src/core/services/genres.services';

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

const Queries = {
    getAllGenres,
    getGenreById
};

export {
    Queries
};