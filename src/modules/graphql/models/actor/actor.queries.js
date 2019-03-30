import * as ActorsServices       from '../../../../../src/core/services/actors.services';
import * as MoviesActorsServices from '../../../../../src/core/services/movies-actors.services';

// ###############################################################
// ##########            READING OPERATIONS             ##########
// ###############################################################

const getAllActors = async (parentValues, args, context, astData) => {
    try {
        return await ActorsServices.getActorsData();
    } catch (error) {
        throw error;
    }
};

const getActorById = async (parentValues, args, context, astData) => {
    try {
        return await ActorsServices.getActorById(args.id);
    } catch (error) {
        throw error;
    }
};

// ###############################################################
// ##########             FIELDS OPERATIONS             ##########
// ###############################################################

const movies = async (parentValues, args, context, astData) => {
    try {
        return await MoviesActorsServices.getMoviesDataByActorId(parentValues.id);
    } catch (error) {
        throw error;
    }
};

const Queries = {
    getAllActors,
    getActorById
};

const ActorType = {
    movies
};

export {
    Queries,
    ActorType
};