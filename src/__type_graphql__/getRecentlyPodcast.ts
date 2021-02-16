/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetRecentlyPodcastInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getRecentlyPodcast
// ====================================================

export interface getRecentlyPodcast_getRecentlyPodcast_podcasts_host {
  __typename: "User";
  id: number;
  email: string;
}

export interface getRecentlyPodcast_getRecentlyPodcast_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  thumbnail: string | null;
  description: string | null;
  rating: number;
  host: getRecentlyPodcast_getRecentlyPodcast_podcasts_host;
  isOnSubscribe: boolean | null;
}

export interface getRecentlyPodcast_getRecentlyPodcast {
  __typename: "GetRecentlyPodcastOutput";
  ok: boolean;
  error: string | null;
  podcasts: getRecentlyPodcast_getRecentlyPodcast_podcasts[] | null;
}

export interface getRecentlyPodcast {
  getRecentlyPodcast: getRecentlyPodcast_getRecentlyPodcast;
}

export interface getRecentlyPodcastVariables {
  input: GetRecentlyPodcastInput;
}
