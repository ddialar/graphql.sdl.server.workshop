import axios from 'axios';

import log4js from '../common/logger';
var logger = log4js.getLogger('genres.services');

import { serverConf }  from '../config';
import * as utils  from '../shared/utils';

const { API_REST } = serverConf;
const API_REST_URL = `${API_REST.URL}:${API_REST.PORT}/genres`;

// ###############################################################
// ##########           CREATING OPERATIONS             ##########
// ###############################################################

const addGenre = async (genreData) => {
    try {
        return (await axios.post(`${API_REST_URL}`, genreData)).data;
    } catch (error) {
        logger.error(`(addGenre) - ${error.message}`);
        return {};
    }
};

// ###############################################################
// ##########            READING OPERATIONS             ##########
// ###############################################################

const getGenresDataFromMovieRelationships = async (relationships) => {
    let genreIds = [];
    let queryParams = [];

    genreIds = _getGenreIdsFromMovieRelationships(relationships);

    queryParams = utils.createQueryParamsString(genreIds, 'id');

    return await getGenresData(queryParams);
};

const _getGenreIdsFromMovieRelationships = (relationships) => {
    return relationships.map((genreRelationship) => {
        return genreRelationship.genreId;
    });
};

const getGenresData = async (queryParams) => {
    try {
        return (await axios.get(`${API_REST_URL}/${(queryParams) ? queryParams : ''}`)).data;
    } catch (error) {
        logger.error(`(getGenresData) - ${error.message}`);
        return [];
    }
};

const getGenreById = async (GenreId) => {
    try {
        let queryParams = utils.createQueryParamsString([GenreId], 'id');
        return (await getGenresData(queryParams))[0];
    } catch (error) {
        logger.error(`(getGenreById) - ${error.message}`);
        return [];
    }
};

// ###############################################################
// ##########           UPDATING OPERATIONS             ##########
// ###############################################################

const updateGenre = async (genreId, genreData) => {
    try {
        return (await axios.patch(`${API_REST_URL}/${genreId}`, genreData)).data;
    } catch (error) {
        logger.error(`(updateGenre) - ${error.message}`);
        return [];
    }
};

// ###############################################################
// ##########           DELETING OPERATIONS             ##########
// ###############################################################

const deleteGenre = async (genreId) => {
    try {
        return (await axios.delete(`${API_REST_URL}/${genreId}`)).data;
    } catch (error) {
        logger.error(`(deleteGenre) - ${error.message}`);
        return {};
    }
};

export {
    addGenre,
    getGenresDataFromMovieRelationships,
    getGenresData,
    getGenreById,
    updateGenre,
    deleteGenre
};