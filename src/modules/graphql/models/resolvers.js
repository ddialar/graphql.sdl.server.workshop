import * as actor from './actor';
// 1. Import all implementation from the 'genre' model.

const Query = Object.assign(
    actor.Queries
    // 2. Include the imported object Queries into the 'Query' object.
);

// const Mutation = Object.assign(
// );

export {
    Query,
    // Mutation
};