import axios from 'axios';

import log4js from '../common/logger';
var logger = log4js.getLogger('writers.services');

import { serverConf }  from '../config';
import * as utils  from '../shared/utils';

const { API_REST } = serverConf;
const API_REST_URL = `${API_REST.URL}:${API_REST.PORT}/writers`;

// ###############################################################
// ##########           CREATING OPERATIONS             ##########
// ###############################################################

const addWriter = async (writerData) => {
    try {
        return (await axios.post(`${API_REST_URL}`, writerData)).data;
    } catch (error) {
        logger.error(`(addWriter) - ${error.message}`);
        return {};
    }
};

// ###############################################################
// ##########            READING OPERATIONS             ##########
// ###############################################################

const getWritersDataFromMovieRelationships = async (relationships) => {
    let writerIds = [];
    let queryParams = [];

    writerIds = _getWriterIdsFromMovieRelationships(relationships);

    queryParams = utils.createQueryParamsString(writerIds, 'id');

    return await getWritersData(queryParams);
};

const _getWriterIdsFromMovieRelationships = (relationships) => {
    return relationships.map((writerRelationship) => {
        return writerRelationship.writerId;
    });
};

const getWritersData = async (queryParams) => {
    try {
        return (await axios.get(`${API_REST_URL}/${(queryParams) ? queryParams : ''}`)).data;
    } catch (error) {
        logger.error(`(getWritersData) - ${error.message}`);
        return [];
    }
};

const getWriterById = async (writerId) => {
    try {
        let queryParams = utils.createQueryParamsString([writerId], 'id');
        return (await getWritersData(queryParams))[0];
    } catch (error) {
        logger.error(`(getWriterById) - ${error.message}`);
        return [];
    }
};

// ###############################################################
// ##########           UPDATING OPERATIONS             ##########
// ###############################################################

const updateWriter = async (writerId, writerData) => {
    try {
        return (await axios.patch(`${API_REST_URL}/${writerId}`, writerData)).data;
    } catch (error) {
        logger.error(`(updateWriter) - ${error.message}`);
        return [];
    }
};

// ###############################################################
// ##########           DELETING OPERATIONS             ##########
// ###############################################################

const deleteWriter = async (writerId) => {
    try {
        return (await axios.delete(`${API_REST_URL}/${writerId}`)).data;
    } catch (error) {
        logger.error(`(deleteWriter) - ${error.message}`);
        return {};
    }
};

export {
    addWriter,
    getWritersDataFromMovieRelationships,
    getWritersData,
    getWriterById,
    updateWriter,
    deleteWriter
};