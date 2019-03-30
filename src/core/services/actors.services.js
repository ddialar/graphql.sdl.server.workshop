import axios from 'axios';

import log4js from '../common/logger';
var logger = log4js.getLogger('actors.services');

import { serverConf }  from '../config';
import * as utils from '../shared/utils';

const { API_REST } = serverConf;
const API_REST_URL = `${API_REST.URL}:${API_REST.PORT}/actors`;

// ###############################################################
// ##########           CREATING OPERATIONS             ##########
// ###############################################################

const addActor = async (actorData) => {
    try {
        return (await axios.post(`${API_REST_URL}`, actorData)).data;
    } catch (error) {
        logger.error(`(addActor) - ${error.message}`);
        return {};
    }
};

// ###############################################################
// ##########            READING OPERATIONS             ##########
// ###############################################################

const getActorsDataFromMovieRelationships = async (relationships) => {
    let actorIds = [];
    let queryParams = [];

    actorIds = _getActorIdsFromMovieRelationships(relationships);

    queryParams = utils.createQueryParamsString(actorIds, 'id');

    return await getActorsData(queryParams);
};

const _getActorIdsFromMovieRelationships = (relationships) => {
    return relationships.map((movieRelationship) => {
        return movieRelationship.actorId;
    });
};

const getActorsData = async (queryParams) => {
    try {
        return (await axios.get(`${API_REST_URL}/${(queryParams) ? queryParams : ''}`)).data;
    } catch (error) {
        logger.error(`(getActorsData) - ${error.message}`);
        return [];
    }
};

const getActorById = async (actorId) => {
    try {
        let queryParams = utils.createQueryParamsString([actorId], 'id');
        return (await getActorsData(queryParams))[0];
    } catch (error) {
        logger.error(`(getActorById) - ${error.message}`);
        return [];
    }
};

// ###############################################################
// ##########           UPDATING OPERATIONS             ##########
// ###############################################################

const updateActor = async (actorId, actorData) => {
    try {
        return (await axios.patch(`${API_REST_URL}/${actorId}`, actorData)).data;
    } catch (error) {
        logger.error(`(updateActor) - ${error.message}`);
        return {};
    }
};

// ###############################################################
// ##########           DELETING OPERATIONS             ##########
// ###############################################################

// COMMENTS: After executing this methos, introduce the ResultType.
var deleteActor = async (actorId) => {
    try {
        return (await axios.delete(`${API_REST_URL}/${actorId}`)).data;
    } catch (error) {
        logger.error(`(deleteActor) - ${error.message}`);
        return {};
    }
};

export {
    addActor,
    getActorsDataFromMovieRelationships,
    getActorsData,
    getActorById,
    updateActor,
    deleteActor
};