import * as MoviesServices          from '../../../../core/services/movies.services';
import * as MoviesDirectorsServices from '../../../../core/services/movies-directors.services';
import * as MoviesActorsServices    from '../../../../core/services/movies-actors.services';
import * as MoviesWritersServices   from '../../../../core/services/movies-writers.services';
import * as MoviesGenresServices    from '../../../../core/services/movies-genres.services';

import * as CommonServices          from '../../../../core/services/common.services';

const COPLEX_MOVIE_FIELDS = [
    'directors',
    'writers',
    'actors',
    'genres'
];

const PROCESS_COMPLEX_MOVIE_FIELDS = {
    'directors': { persist: (movieId, directorsIds) => { return MoviesDirectorsServices.addDirectorsToMovie(movieId, directorsIds); } },
    'writers': { persist: (movieId, writersIds) => { return MoviesWritersServices.addWritersToMovie(movieId, writersIds); } },
    'actors': { persist: (movieId, actorsIds) => { return MoviesActorsServices.addActorsToMovie(movieId, actorsIds); } },
    'genres': { persist: (movieId, genresIds) => { return MoviesGenresServices.addGenresToMovie(movieId, genresIds); } }
};

// ###############################################################
// ##########           CREATING OPERATIONS             ##########
// ###############################################################

const addMovie = async (parentValues, args, context, astData) => {
    try {
        let movieBasicFieldsObject = _getMovieBasicFieldsAsObject(args.data);
        let movieComplexFields = _getMovieComplexFieldsAsObject(args.data);

        let persistedMovieData = await MoviesServices.addMovie(movieBasicFieldsObject);

        if (movieComplexFields) {
            let persistedComplexFields = await Object.keys(movieComplexFields).map(async (fieldName) => {
                return await PROCESS_COMPLEX_MOVIE_FIELDS[fieldName]
                    .persist(persistedMovieData.id, movieComplexFields[fieldName]);
            });

            await CommonServices.runAllAsyncRequests(persistedComplexFields, '(runAllAsyncRequests) - Persisting movie complex fields');
        } 

        return persistedMovieData;
    } catch (error) {
        throw error;
    }
};

var _getMovieBasicFieldsAsObject = (rawFields) => {
    let obtainedFiedlNames = Object.keys(rawFields).filter((fieldName) => {
        return COPLEX_MOVIE_FIELDS.indexOf(fieldName) < 0;
    });

    return _getFieldsContent(rawFields, obtainedFiedlNames);
};

var _getMovieComplexFieldsAsObject = (rawFields) => {
    let obtainedFiedlNames = Object.keys(rawFields).filter((fieldName) => {
        return COPLEX_MOVIE_FIELDS.indexOf(fieldName) >=0;
    });
    
    return _getFieldsContent(rawFields, obtainedFiedlNames);
};

var _getFieldsContent = (rawFields, selectedFields) => {
    return selectedFields.reduce((previousValue, currentValue) => {
        previousValue[currentValue] = rawFields[currentValue];
        return previousValue;
    }, {});
};

// ###############################################################
// ##########           UPDATING OPERATIONS             ##########
// ###############################################################

const updateMovie = async (parentValues, args, context, astData) => {
    try {
        return await MoviesServices.updateMovie(args.id, args.data);
    } catch (error) {
        throw error;
    }
};

// ###############################################################
// ##########           DELETING OPERATIONS             ##########
// ###############################################################

const deleteMovie = async (parentValues, args, context, astData) => {
    try {
        // return await MoviesServices.deleteMovie(args.id);
        await MoviesServices.deleteMovie(args.id);
        // TODO: Remove relationships between the movie and directors, actors, writers and genres.
        return { code: 200 };
    } catch (error) {
        throw error;
    }
};

export {
    addMovie,
    // addMoviesToMovie,
    updateMovie,
    deleteMovie,
    // deleteMovieMovies
};