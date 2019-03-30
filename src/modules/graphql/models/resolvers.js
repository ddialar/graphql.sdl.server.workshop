import * as actor    from './actor';
import * as director from './director';
import * as genre    from './genre';
import * as writer   from './writer';
import * as movie    from './movie';

const { ActorType } = actor;
const { DirectorType } = director;
const { GenreType } = genre;
const { WriterType } = writer;
const { MovieType } = movie;

const Query = Object.assign(
    actor.Queries,
    director.Queries,
    genre.Queries,
    writer.Queries,
    movie.Queries
);

export {
    Query,
    ActorType,
    DirectorType,
    GenreType,
    WriterType,
    MovieType
};