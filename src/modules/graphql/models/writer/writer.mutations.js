import * as WritersServices       from '../../../../core/services/writers.services';
import * as MoviesWritersServices from '../../../../core/services/movies-writers.services';

const addWriter = async (parentValues, args, context, astData) => {
    try {
        let persistedWriterData = await WritersServices.addWriter(args.data);

        return persistedWriterData;
    } catch (error) {
        throw error;
    }
};

const addMoviesToWriter = async (parentValues, args, context, astData) => {
    try {
        let persistedWriterMoviesData = await MoviesWritersServices.addMoviesToWriter(args.id, args.movies);

        if (persistedWriterMoviesData) {
            return await WritersServices.getWritersData(args.id);
        } else {
            return [];
        }
    } catch (error) {
        throw error;
    }
};

const updateWriter = async (parentValues, args, context, astData) => {
    try {
        return await WritersServices.updateWriter(args.id, args.data);
    } catch (error) {
        throw error;
    }
};

const deleteWriter = async (parentValues, args, context, astData) => {
    try {
        // return await WritersServices.deleteWriter(args.id);
        await WritersServices.deleteWriter(args.id);
        await MoviesWritersServices.deleteWriterMovies(args.id);
        return { code: 200 };
    } catch (error) {
        throw error;
    }
};

const deleteWriterMovies = async (parentValues, args, context, astData) => {
    try {
        await WritersServices.getWritersData(args.id);
        return { code: 200 };
    } catch (error) {
        throw error;
    }
};

export {
    addWriter,
    // addMoviesToWriter,
    updateWriter,
    deleteWriter,
    // deleteWriterMovies
};