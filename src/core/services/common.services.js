import axios from 'axios';

import log4js from '../common/logger';
var logger = log4js.getLogger('common.services');

import { serverConf }  from '../config';

const { API_REST } = serverConf;
const API_REST_URL = `${API_REST.URL}:${API_REST.PORT}`;

// ###############################################################
// ##########            READING OPERATIONS             ##########
// ###############################################################

const generateAsyncPostRequests = (entity, dataSetToBePosted) => {
    return dataSetToBePosted.map((dataToBePosted) => {
        return axios.post(`${API_REST_URL}/${entity}`, dataToBePosted);
    });
};

const generateAsyncDeleteRequests = (entity, dataSetToBeDeleted) => {
    return dataSetToBeDeleted.map((dataToBeDeleteted) => {
        return axios.delete(`${API_REST_URL}/${entity}/${dataToBeDeleteted}`);
    });
};

// ###############################################################
// ##########             UTILS OPERATIONS              ##########
// ###############################################################

const runAllAsyncRequests = async (asyncRequests, errorMessage) => {
    try {
        let results = await Promise.all(asyncRequests);
        return results.map((operationResult) => operationResult.data);
    } catch (error) {
        logger.error(`(runAllAsyncRequests) - ${errorMessage} - ${error.message}`);
        return [];
    }
};

export {
    generateAsyncPostRequests,
    generateAsyncDeleteRequests,
    runAllAsyncRequests
};