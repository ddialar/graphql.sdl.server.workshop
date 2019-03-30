import axios from 'axios';

import log4js from '../common/logger';
var logger = log4js.getLogger('directors.services');

import { serverConf }  from '../config';
import * as utils  from '../shared/utils';

const { API_REST } = serverConf;
const API_REST_URL = `${API_REST.URL}:${API_REST.PORT}/directors`;

// ###############################################################
// ##########           CREATING OPERATIONS             ##########
// ###############################################################

const addDirector = async (directorData) => {
    try {
        return (await axios.post(`${API_REST_URL}`, directorData)).data;
    } catch (error) {
        logger.error(`(addDirector) - ${error.message}`);
        return {};
    }
};

// ###############################################################
// ##########            READING OPERATIONS             ##########
// ###############################################################

const getDirectorsDataFromMovieRelationships = async (relationships) => {
    let directorIds = [];
    let queryParams = [];

    directorIds = _getDirectorIdsFromMovieRelationships(relationships);

    queryParams = utils.createQueryParamsString(directorIds, 'id');

    return await getDirectorsData(queryParams);
};

const _getDirectorIdsFromMovieRelationships = (relationships) => {
    return relationships.map((directorRelationship) => {
        return directorRelationship.directorId;
    });
};

const getDirectorsData = async (queryParams) => {
    try {
        return (await axios.get(`${API_REST_URL}/${(queryParams) ? queryParams : ''}`)).data;
    } catch (error) {
        logger.error(`(getDirectorsData) - ${error.message}`);
        return [];
    }
};

const getDirectorById = async (directorId) => {
    try {
        let queryParams = utils.createQueryParamsString([directorId], 'id');
        return (await getDirectorsData(queryParams))[0];
    } catch (error) {
        logger.error(`(getDirectorById) - ${error.message}`);
        return [];
    }
};

// ###############################################################
// ##########           UPDATING OPERATIONS             ##########
// ###############################################################

const updateDirector = async (directorId, directorData) => {
    try {
        return (await axios.patch(`${API_REST_URL}/${directorId}`, directorData)).data;
    } catch (error) {
        logger.error(`(updateDirector) - ${error.message}`);
        return [];
    }
};

// ###############################################################
// ##########           DELETING OPERATIONS             ##########
// ###############################################################

const deleteDirector = async (directorId) => {
    try {
        return (await axios.delete(`${API_REST_URL}/${directorId}`)).data;
    } catch (error) {
        logger.error(`(deleteDirector) - ${error.message}`);
        return {};
    }
};

export {
    addDirector,
    getDirectorsDataFromMovieRelationships,
    getDirectorsData,
    getDirectorById,
    updateDirector,
    deleteDirector
};