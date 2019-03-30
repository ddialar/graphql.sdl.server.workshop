import log4js from './core/common/logger';
const logger = log4js.getLogger('server');

import * as path                   from 'path';
import { serverConf, environment } from './core/config';
import { ApolloServer }            from 'apollo-server';
import { importSchema }            from 'graphql-import';
import * as resolvers              from './modules/graphql/models/resolvers';

const { API_GQL } = serverConf;
const typeDefs = importSchema(path.join(__dirname, 'modules/graphql/schema.graphql'));

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: ((environment.match('development')) ? true : false),
    introspection: ((environment.match('development')) ? true : false)
});

server
    .listen({
        port: API_GQL.PORT
    })
    .then(({ url }) => {
        logger.info(`Server ready at ${url}`);
    })
    .catch((error) => {
        logger.error(`There was an error: ${error.message}`);
    });

