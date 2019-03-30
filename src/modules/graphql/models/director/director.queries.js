import * as DirectorsServices       from '../../../../core/services/directors.services';

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

const Queries = {
    getAllDirectors,
    getDirectorById
};

export {
    Queries
};