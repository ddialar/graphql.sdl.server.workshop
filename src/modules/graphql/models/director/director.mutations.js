import * as DirectorsServices       from '../../../../core/services/directors.services';
import * as MoviesDirectorsServices from '../../../../core/services/movies-directors.services';

const addDirector = async (parentValues, args, context, astData) => {
    try {
        let persistedDirectorData = await DirectorsServices.addDirector(args.data);

        return persistedDirectorData;
    } catch (error) {
        throw error;
    }
};

const addMoviesToDirector = async (parentValues, args, context, astData) => {
    try {
        let persistedDirectorMoviesData = await MoviesDirectorsServices.addMoviesToDirector(args.id, args.movies);

        if (persistedDirectorMoviesData) {
            return await DirectorsServices.getDirectorsData(args.id);
        } else {
            return [];
        }
    } catch (error) {
        throw error;
    }
};

const updateDirector = async (parentValues, args, context, astData) => {
    try {
        return await DirectorsServices.updateDirector(args.id, args.data);
    } catch (error) {
        throw error;
    }
};

const deleteDirector = async (parentValues, args, context, astData) => {
    try {
        // return await DirectorsServices.deleteDirector(args.id);
        await DirectorsServices.deleteDirector(args.id);
        await MoviesDirectorsServices.deleteDirectorMovies(args.id);
        return { code: 200 };
    } catch (error) {
        throw error;
    }
};

const deleteDirectorMovies = async (parentValues, args, context, astData) => {
    try {
        await DirectorsServices.getDirectorsData(args.id);
        return { code: 200 };
    } catch (error) {
        throw error;
    }
};

export {
    addDirector,
    // addMoviesToDirector,
    updateDirector,
    deleteDirector,
    // deleteDirectorMovies
};