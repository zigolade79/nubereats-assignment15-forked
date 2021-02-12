/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PodcastSearchInput, GetEpisodesInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getMyEpisodes
// ====================================================

export interface getMyEpisodes_getPodcast_podcast_host {
  __typename: "User";
  id: number;
  email: string;
}

export interface getMyEpisodes_getPodcast_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  thumbnail: string | null;
  description: string | null;
  rating: number;
  host: getMyEpisodes_getPodcast_podcast_host;
  isOnSubscribe: boolean | null;
  numSubscriber: number | null;
}

export interface getMyEpisodes_getPodcast {
  __typename: "PodcastOutput";
  ok: boolean;
  error: string | null;
  podcast: getMyEpisodes_getPodcast_podcast | null;
}

export interface getMyEpisodes_getEpisodes_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  description: string | null;
  category: string;
}

export interface getMyEpisodes_getEpisodes {
  __typename: "EpisodesOutput";
  ok: boolean;
  error: string | null;
  episodes: getMyEpisodes_getEpisodes_episodes[] | null;
}

export interface getMyEpisodes {
  getPodcast: getMyEpisodes_getPodcast;
  getEpisodes: getMyEpisodes_getEpisodes;
}

export interface getMyEpisodesVariables {
  podcastSearchInput: PodcastSearchInput;
  getEpisodesInput: GetEpisodesInput;
}
