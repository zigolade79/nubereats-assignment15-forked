/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: myPodcasts
// ====================================================

export interface myPodcasts_myPodcasts_podcasts_host {
  __typename: "User";
  id: number;
  email: string;
}

export interface myPodcasts_myPodcasts_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  thumbnail: string | null;
  description: string | null;
  rating: number;
  host: myPodcasts_myPodcasts_podcasts_host;
  isOnSubscribe: boolean | null;
  numSubscriber: number | null;
}

export interface myPodcasts_myPodcasts {
  __typename: "MyPodcastsOutput";
  ok: boolean;
  error: string | null;
  podcasts: myPodcasts_myPodcasts_podcasts[] | null;
}

export interface myPodcasts {
  myPodcasts: myPodcasts_myPodcasts;
}
