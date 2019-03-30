// import * as ActorsServices from '../../../../core/services/actors.services';
// import * as MoviesActorsServices from '../../../../core/services/movies-actors.services';

// const addActor = async (parentValues, args, context, astData) => {
//     try {
//         let persistedActorData = await ActorsServices.addActor(args.data);

//         return persistedActorData;
//     } catch (error) {
//         throw error;
//     }
// };

// const updateActor = async (parentValues, args, context, astData) => {
//     try {
//         return await ActorsServices.updateActor(args.id, args.data);
//     } catch (error) {
//         throw error;
//     }
// };

// // COMMENTS: After executing this methos, introduce the ResultType.
// const deleteActor = async (parentValues, args, context, astData) => {
//     try {
//         // return await ActorsServices.deleteActor(args.id);
//         await ActorsServices.deleteActor(args.id);
//         await MoviesActorsServices.deleteActorMovies(args.id);
//         return { code: 200 };
//     } catch (error) {
//         throw error;
//     }
// };

// export {
//     addActor,
//     // updateActor,
//     // deleteActor
// };