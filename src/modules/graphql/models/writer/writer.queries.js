import * as WritersServices       from '../../../../core/services/writers.services';
import * as MoviesWritersServices from '../../../../../src/core/services/movies-writers.services';

// ###############################################################
// ##########            READING OPERATIONS             ##########
// ###############################################################

const getAllWriters = async (parentValues, args, context, astData) => {
    try {
        return await WritersServices.getWritersData();
    } catch (error) {
        throw error;
    }
};

const getWriterById = async (parentValues, args, context, astData) => {
    try {
        return await WritersServices.getWriterById(args.id);
    } catch (error) {
        throw error;
    }
};

// ###############################################################
// ##########             FIELDS OPERATIONS             ##########
// ###############################################################

const movies = async (parentValues, args, context, astData) => {
    try {
        return await MoviesWritersServices.getMoviesDataByWriterId(parentValues.id);
    } catch (error) {
        throw error;
    }
};

const Queries = {
    getAllWriters,
    getWriterById
};

const WriterType = {
    movies
};

export {
    Queries,
    WriterType
};