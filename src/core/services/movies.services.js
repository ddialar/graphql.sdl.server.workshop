import axios from 'axios';

import log4js from '../common/logger';
var logger = log4js.getLogger('movies.services');

import { serverConf }  from '../config';
import * as utils  from '../shared/utils';

const { API_REST } = serverConf;
const API_REST_URL = `${API_REST.URL}:${API_REST.PORT}/movies`;

// ###############################################################
// ##########           CREATING OPERATIONS             ##########
// ###############################################################

const addMovie = async (movieData) => {
    try {
        return (await axios.post(`${API_REST_URL}`, movieData)).data;
    } catch (error) {
        logger.error(`(addMovie) - ${error.message}`);
        return {};
    }
};

// ###############################################################
// ##########            READING OPERATIONS             ##########
// ###############################################################

const getRelatedMovies = async (relationships) => {
    let moviesIds = [];
    let queryParams = [];

    moviesIds = _getMovieIds(relationships);

    queryParams = utils.createQueryParamsString(moviesIds, 'id');

    return await getMoviesData(queryParams);
};

const _getMovieIds = (relationships) => {
    return relationships.map((movieRelationship) => {
        return movieRelationship.movieId;
    });
};

const getMoviesData = async (queryParams) => {
    try {
        return (await axios.get(`${API_REST_URL}/${(queryParams) ? queryParams : ''}`)).data;
    } catch (error) {
        logger.error(`(getMoviesData) - ${error.message}`);
        return [];
    }
};

const getMovieById = async (movieId) => {
    try {
        let queryParams = utils.createQueryParamsString([movieId], 'id');
        return (await getMoviesData(queryParams))[0];
    } catch (error) {
        logger.error(`(getMovieById) - ${error.message}`);
        return [];
    }
};

// ###############################################################
// ##########           UPDATING OPERATIONS             ##########
// ###############################################################

const updateMovie = async (movieId, movieData) => {
    try {
        return (await axios.patch(`${API_REST_URL}/${movieId}`, movieData)).data;
    } catch (error) {
        logger.error(`(updateMovie) - ${error.message}`);
        return [];
    }
};

// ###############################################################
// ##########           DELETING OPERATIONS             ##########
// ###############################################################

const deleteMovie = async (movieId) => {
    try {
        return (await axios.delete(`${API_REST_URL}/${movieId}`)).data;
    } catch (error) {
        logger.error(`(deleteMovie) - ${error.message}`);
        return {};
    }
};

export {
    addMovie,
    getRelatedMovies,
    getMoviesData,
    getMovieById,
    updateMovie,
    deleteMovie
};