/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PodcastSearchInput, GetEpisodesInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getEpisodes
// ====================================================

export interface getEpisodes_getPodcast_podcast_host {
  __typename: "User";
  id: number;
  email: string;
}

export interface getEpisodes_getPodcast_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  thumbnail: string | null;
  description: string | null;
  rating: number;
  host: getEpisodes_getPodcast_podcast_host;
  isOnSubscribe: boolean | null;
}

export interface getEpisodes_getPodcast {
  __typename: "PodcastOutput";
  ok: boolean;
  error: string | null;
  podcast: getEpisodes_getPodcast_podcast | null;
}

export interface getEpisodes_getEpisodes_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  description: string | null;
  category: string;
  fileUrl: string | null;
}

export interface getEpisodes_getEpisodes {
  __typename: "EpisodesOutput";
  ok: boolean;
  error: string | null;
  episodes: getEpisodes_getEpisodes_episodes[] | null;
}

export interface getEpisodes {
  getPodcast: getEpisodes_getPodcast;
  getEpisodes: getEpisodes_getEpisodes;
}

export interface getEpisodesVariables {
  podcastSearchInput: PodcastSearchInput;
  getEpisodesInput: GetEpisodesInput;
}
