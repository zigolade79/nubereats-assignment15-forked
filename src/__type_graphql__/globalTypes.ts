/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserRole {
  Host = "Host",
  Listener = "Listener",
}

export interface CreateAccountInput {
  email?: string | null;
  password?: string | null;
  role?: UserRole | null;
}

export interface CreateEpisodeInput {
  title: string;
  category: string;
  podcastId: number;
}

export interface CreatePodcastInput {
  title: string;
  category: string;
  description?: string | null;
  thumbnail?: string | null;
}

export interface EpisodesSearchInput {
  podcastId: number;
  episodeId: number;
}

export interface GetAllPodcastsInput {
  page?: number | null;
  pageSize?: number | null;
}

export interface GetEpisodesInput {
  page?: number | null;
  pageSize?: number | null;
  podcastId: number;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface PodcastSearchInput {
  id: number;
}

export interface ToggleSubscriptionInput {
  podcastId: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
