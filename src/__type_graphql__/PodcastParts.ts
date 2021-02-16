/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PodcastParts
// ====================================================

export interface PodcastParts_host {
  __typename: "User";
  id: number;
  email: string;
}

export interface PodcastParts {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  thumbnail: string | null;
  description: string | null;
  rating: number;
  host: PodcastParts_host;
  isOnSubscribe: boolean | null;
}
