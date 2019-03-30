import axios from 'axios';

import log4js from '../common/logger';
var logger = log4js.getLogger('movies.genres.services');

import { serverConf }  from '../config';

import * as MoviesService from './movies.services';
import * as GenresService from './genres.services';
import * as CommonService from './common.services';

const { API_REST } = serverConf;
const API_REST_URL = `${API_REST.URL}:${API_REST.PORT}/movies_genres`;

// ###############################################################
// ##########           CREATING OPERATIONS             ##########
// ###############################################################

const addMoviesToGenre = async (genreId, newMoviesIds) => {
    try {
        let persistedMovieIds;
        let moviesIdsToBePersisted;
        let relationships;
        let relationshipsToBePersisted;

        relationships = await _getMovieGenreRelationshipsByGenreId(genreId);

        if (relationships.length > 0) {
            persistedMovieIds = relationships.map((movieGenrePair) => {
                return movieGenrePair.movieId;
            });

            moviesIdsToBePersisted = newMoviesIds.filter((newMovieId) => {
                return (persistedMovieIds.indexOf(newMovieId) < 0);
            });
        } else {
            moviesIdsToBePersisted = newMoviesIds;
        }

        relationshipsToBePersisted = moviesIdsToBePersisted.map((movieId) => {
            return { genreId: genreId, movieId: movieId };
        });

        return await _persistNewMovieGenreRelationships(relationshipsToBePersisted);
    } catch (error) {
        logger.error(`(addMoviesToGenre) - ${error.message}`);
        return [];
    }
};

const addGenresToMovie = async (movieId, newGenresIds) => {
    try {
        let persistedGenreIds;
        let genresIdsToBePersisted;
        let relationships;
        let relationshipsToBePersisted;

        relationships = _getMovieGenreRelationshipsByMovieId(movieId);

        if (relationships.length > 0) {
            persistedGenreIds = relationships.map((movieGenrePair) => {
                return movieGenrePair.genreId;
            });

            genresIdsToBePersisted = newGenresIds.filter((newGenreId) => {
                return (persistedGenreIds.indexOf(newGenreId) < 0);
            });
        } else {
            genresIdsToBePersisted = newGenresIds;
        }

        relationshipsToBePersisted = genresIdsToBePersisted.map((genreId) => {
            return { genreId: genreId, movieId: movieId };
        });

        return await _persistNewMovieGenreRelationships(relationshipsToBePersisted);
    } catch (error) {
        logger.error(`(addGenresToMovie) - ${error.message}`);
        return [];
    }
};

const _persistNewMovieGenreRelationships = async (relationshipsToBePersisted) => {
    let asyncRequests = await CommonService.generateAsyncPostRequests('movies_genres', relationshipsToBePersisted);
    return await CommonService.runAllAsyncRequests(asyncRequests, 'Persisting movie-genre relationships');
};

// ###############################################################
// ##########            READING OPERATIONS             ##########
// ###############################################################

const getMoviesDataByGenreId = async (genreId) => {
    try {
        let relationships = await _getMovieGenreRelationshipsByGenreId(genreId);
        return await MoviesService.getRelatedMovies(relationships);
    } catch (error) {
        logger.error(`(getMoviesDataByGenreId) - ${error.message}`);
        return [];
    }
};

const getGenresDataByMovieId = async (movieId) => {
    try {
        let relationships = await _getMovieGenreRelationshipsByMovieId(movieId);
        return await GenresService.getGenresDataFromMovieRelationships(relationships);
    } catch (error) {
        logger.error(`(getGenresDataByMovieId) - ${error.message}`);
        return [];
    }
};

const _getMovieGenreRelationshipsByMovieId = async (movieId) => {
    try {
        return (await axios.get(`${API_REST_URL}?movieId=${movieId}`)).data;
    } catch (error) {
        logger.error(`(_getMovieGenreRelationshipsByMovieId) - ${error.message}`);
        return [];
    }
};

const _getMovieGenreRelationshipsByGenreId = async (genreId) => {
    try {
        return (await axios.get(`${API_REST_URL}?genreId=${genreId}`)).data;
    } catch (error) {
        logger.error(`(_getMovieGenreRelationshipsByGenreId) - ${error.message}`);
        return [];
    }
};

// ###############################################################
// ##########           DELETING OPERATIONS             ##########
// ###############################################################

const deleteGenreMovies = async (genreId, moviesIds) => {
    try {
        let relationshipIdsToBeDeleted;
        let relationships;

        relationships = await _getMovieGenreRelationshipsByGenreId(genreId);

        if (moviesIds) {
            relationshipIdsToBeDeleted = relationships
                .filter((movieGenrePair) => {
                    return (moviesIds.indexOf(movieGenrePair.movieId) >= 0);
                });
        }
        
        if (relationshipIdsToBeDeleted) {
            relationshipIdsToBeDeleted = relationshipIdsToBeDeleted.map((movieGenrePairToBeDeleted) => {
                return movieGenrePairToBeDeleted.id;
            });

            return await _deleteMovieGenreRelationships(relationshipIdsToBeDeleted);
        } else {
            logger.warn(`(deleteGenreMovies) - No movie-genre relationships are going to be deleted for the genre with id ${genreId}`); 
            return [];
        }
    } catch (error) {
        logger.error(`(deleteGenreMovies) - ${error.message}`);
        return [];
    }
};

const _deleteMovieGenreRelationships = async (relationshipIdsToBeDeleted) => {
    let asyncRequests = await CommonService.generateAsyncDeleteRequests('movies_genres', relationshipIdsToBeDeleted);
    return await CommonService.runAllAsyncRequests(asyncRequests, 'Deleting movie-genre relationships');
};

export {
    addMoviesToGenre,
    addGenresToMovie,
    deleteGenreMovies,
    getMoviesDataByGenreId,
    getGenresDataByMovieId
};