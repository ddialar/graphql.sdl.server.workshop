import * as actor    from './actor';
import * as director from './director';
import * as genre    from './genre';
import * as writer   from './writer';
import * as movie    from './movie';

const { ActorType } = actor;
const { DirectorType } = director;
const { MovieType } = movie;
const { GenreType } = genre;
const { WriterType } = writer;

const Query = Object.assign(
    actor.Queries,
    director.Queries,
    genre.Queries,
    writer.Queries,
    movie.Queries,
);
const Mutation = Object.assign(
    actor.Mutations,
    director.Mutations,
    genre.Mutations,
    writer.Mutations,
    movie.Mutations,
);

export {
    Query,
    Mutation,
    ActorType,
    DirectorType,
    MovieType,
    GenreType,
    WriterType
};