/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query SearchMovies($title: String!) {\n    searchMovies(query: $title) {\n      id\n      name\n      score\n      overview\n      releaseDate\n      genres {\n        ... on Genre {\n          id\n          name\n        }\n      }\n      img: poster {\n        url: custom(size: \"w185_and_h278_bestv2\")\n      }\n      similar(limit: 10) {\n        id\n        name\n        score\n        overview\n        releaseDate\n        genres {\n          ... on Genre {\n            id\n            name\n          }\n        }\n        img: poster {\n          url: custom(size: \"w185_and_h278_bestv2\")\n        }\n      }\n    }\n  }\n": types.SearchMoviesDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query SearchMovies($title: String!) {\n    searchMovies(query: $title) {\n      id\n      name\n      score\n      overview\n      releaseDate\n      genres {\n        ... on Genre {\n          id\n          name\n        }\n      }\n      img: poster {\n        url: custom(size: \"w185_and_h278_bestv2\")\n      }\n      similar(limit: 10) {\n        id\n        name\n        score\n        overview\n        releaseDate\n        genres {\n          ... on Genre {\n            id\n            name\n          }\n        }\n        img: poster {\n          url: custom(size: \"w185_and_h278_bestv2\")\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query SearchMovies($title: String!) {\n    searchMovies(query: $title) {\n      id\n      name\n      score\n      overview\n      releaseDate\n      genres {\n        ... on Genre {\n          id\n          name\n        }\n      }\n      img: poster {\n        url: custom(size: \"w185_and_h278_bestv2\")\n      }\n      similar(limit: 10) {\n        id\n        name\n        score\n        overview\n        releaseDate\n        genres {\n          ... on Genre {\n            id\n            name\n          }\n        }\n        img: poster {\n          url: custom(size: \"w185_and_h278_bestv2\")\n        }\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;