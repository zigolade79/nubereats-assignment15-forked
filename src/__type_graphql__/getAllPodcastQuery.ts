/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetAllPodcastsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getAllPodcastQuery
// ====================================================

export interface getAllPodcastQuery_getAllPodcasts_podcasts_host {
  __typename: "User";
  id: number;
  email: string;
}

export interface getAllPodcastQuery_getAllPodcasts_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  thumbnail: string | null;
  description: string | null;
  rating: number;
  host: getAllPodcastQuery_getAllPodcasts_podcasts_host;
  isOnSubscribe: boolean | null;
}

export interface getAllPodcastQuery_getAllPodcasts {
  __typename: "GetAllPodcastsOutput";
  ok: boolean;
  error: string | null;
  podcasts: getAllPodcastQuery_getAllPodcasts_podcasts[] | null;
}

export interface getAllPodcastQuery {
  getAllPodcasts: getAllPodcastQuery_getAllPodcasts;
}

export interface getAllPodcastQueryVariables {
  input: GetAllPodcastsInput;
}
