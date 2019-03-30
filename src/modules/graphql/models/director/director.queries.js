import * as DirectorsServices       from '../../../../core/services/directors.services';
import * as MoviesDirectorsServices from '../../../../../src/core/services/movies-directors.services';

// ###############################################################
// ##########            READING OPERATIONS             ##########
// ###############################################################

const getAllDirectors = async (parentValues, args, context, astData) => {
    try {
        return await DirectorsServices.getDirectorsData();
    } catch (error) {
        throw error;
    }
};

const getDirectorById = async (parentValues, args, context, astData) => {
    try {
        return await DirectorsServices.getDirectorById(args.id);
    } catch (error) {
        throw error;
    }
};

// ###############################################################
// ##########             FIELDS OPERATIONS             ##########
// ###############################################################

const movies = async (parentValues, args, context, astData) => {
    try {
        return await MoviesDirectorsServices.getMoviesDataByDirectorId(parentValues.id);
    } catch (error) {
        throw error;
    }
};

const Queries = {
    getAllDirectors,
    getDirectorById
};

const DirectorType = {
    movies
};

export {
    Queries,
    DirectorType
};