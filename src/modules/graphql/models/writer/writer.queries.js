import * as WritersServices from '../../../../core/services/writers.services';

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

const Queries = {
    getAllWriters,
    getWriterById
};

export {
    Queries
};